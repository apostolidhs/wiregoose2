const Registration = require('../backend/models/registration');
const wait = require('../helpers/wait');
const logger = require('./logger');
const fromUrl = require('./fromUrl');

const crawl = async registration => {
  await registration.start();
  const [stats, error] = await fromUrl(registration);
  await registration.stop();
  return [stats, error];
};

module.exports = async () => {
  while (true) {
    try {
      const registration = await Registration.getNext();

      const started = Date.now();
      logger.verbose(`start crawling ${registration.provider.name}, ${registration.category}`);
      const [stats, error] = await crawl(registration);

      if (stats) {
        logger.verbose(`${stats.accepted}/${stats.total} parsed, ${stats.stored} stored in ${Date.now() - started}ms.`);
      } else {
        logger.verbose(`crawl failure: '${error + error.toString()}' in ${Date.now() - started}ms.`);
      }
    } catch (e) {
      logger.error(e.toString());
    }

    await wait(5000);
  }
};
