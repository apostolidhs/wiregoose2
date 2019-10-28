const path = require('path');
const {crawlString} = require('./index');

const registrations = {
  protothema: {
    filepath: path.resolve(__filename, '../../../fixtures/feeds/protothema.xml'),
    domain: 'https://www.protothema.gr'
  },
  skai: {
    filepath: path.resolve(__filename, '../../../fixtures/feeds/skai.xml'),
    domain: 'https://www.skai.gr'
  },
  madata: {
    filepath: path.resolve(__filename, '../../../fixtures/feeds/madata.xml'),
    domain: 'https://www.madata.gr'
  }
};

it('parses protothema', async () => {
  const registration = registrations.protothema;
  const feeds = await crawlString(registration);
  expect(feeds).toMatchSnapshot();
});

it('parses skai', async () => {
  const registration = registrations.skai;
  const feeds = await crawlString(registration);
  expect(feeds).toMatchSnapshot();
});

it('parses madata', async () => {
  const registration = registrations.madata;
  const feeds = await crawlString(registration);
  expect(feeds).toMatchSnapshot();
});
