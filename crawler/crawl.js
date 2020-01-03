const Registration = require('../backend/models/registration');
const wait = require('../helpers/wait');
const logger = require('../helpers/logger');
const fromUrl = require('./fromUrl');

const crawl = async registration => {
  await registration.start();
  const stats = await fromUrl(registration);
  await registration.stop();
  return stats;
};

module.exports = async () => {
  let registration;

  while (true) {
    await wait(2000);

    try {
      registration = registration || (await Registration.getFirst());
      const started = Date.now();
      logger.verbose(`start crawling ${registration.provider.name}, ${registration.category}`);
      const stats = await crawl(registration);
      logger.verbose(`${stats.accepted}/${stats.total} parsed, ${stats.stored} stored in ${Date.now() - started}ms.`);
      registration = await Registration.getNext(registration._id);
    } catch (e) {
      debugger;
      logger.error(e);
    }
  }
};
