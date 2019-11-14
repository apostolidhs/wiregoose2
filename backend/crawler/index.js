const wait = require('../helpers/wait');
const Registration = require('../models/registration');
const logger = require('../helpers/logger');
const fromUrl = require('./fromUrl');

const crawl = async registration => {
  await registration.start();
  await fromUrl(registration);
  await registration.stop();
};

module.exports = async () => {
  let registration;

  while (true) {
    await wait(10000);

    try {
      registration = registration || (await Registration.getFirst());
      await crawl(registration);
      registration = await Registration.getNext(registration._id);
    } catch (e) {
      logger.error(e);
    }
  }
};
