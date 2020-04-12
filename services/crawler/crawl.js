const Registration = require('../backend/models/registration');
const flat = require('../helpers/flatPromise');
const Feed = require('../backend/models/feed');
const wait = require('../helpers/wait');
const logger = require('./logger');
const fromUrl = require('./fromUrl');

const getStored = (docs, feeds, error) => {
  if (error && Array.isArray(error.writeErrors)) return feeds.length - error.writeErrors.length;
  return Array.isArray(docs) ? docs.length : 0;
};

const storeFeeds = async (registration, {feeds, total}) => {
  const [docs, feedsError] = await flat(Feed.saveFeeds(feeds));

  const stats = {
    stored: getStored(docs, feeds, feedsError),
    total,
    accepted: feeds.length
  };
  registration.addStats(stats);

  return stats;
};

const crawl = async registration => {
  await registration.start();
  const [result, error] = await fromUrl(registration);
  const stats = result && (await storeFeeds(registration, result));
  await registration.stop();
  return [stats, error];
};

module.exports = async () => {
  while (true) {
    try {
      const registration = await Registration.getNext();

      if (registration) {
        const started = Date.now();
        logger.verbose(`start crawling ${registration.provider.name}, ${registration.category}`);
        const [stats, error] = await crawl(registration);

        if (stats) {
          logger.verbose(
            `${stats.accepted}/${stats.total} parsed, ${stats.stored} stored in ${Date.now() - started}ms.`
          );
        } else {
          logger.verbose(`crawl failure: '${error + error.toString()}' in ${Date.now() - started}ms.`);
        }
      }
    } catch (e) {
      logger.error(e.toString());
    }

    await wait(30000);
  }
};
