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
  },
  newsit: {
    filepath: path.resolve(__filename, '../../../fixtures/feeds/newsit.xml'),
    domain: 'https://www.newsit.gr'
  },
  cnnCom: {
    filepath: path.resolve(__filename, '../../../fixtures/feeds/cnn-com.xml'),
    domain: 'https://www.cnn.com'
  },
  cnnGr: {
    filepath: path.resolve(__filename, '../../../fixtures/feeds/cnn-gr.xml'),
    domain: 'https://www.cnn.gr'
  },
  lifo: {
    filepath: path.resolve(__filename, '../../../fixtures/feeds/lifo.xml'),
    domain: 'https://www.lifo.gr'
  },
  altsantiri: {
    filepath: path.resolve(__filename, '../../../fixtures/feeds/altsantiri.xml'),
    domain: 'https://www.altsantiri.gr'
  },
  naftemporiki: {
    filepath: path.resolve(__filename, '../../../fixtures/feeds/naftemporiki.xml'),
    domain: 'https://www.naftemporiki.gr'
  },
  in: {
    filepath: path.resolve(__filename, '../../../fixtures/feeds/in.xml'),
    domain: 'https://www.in.gr'
  },
  kathimerini: {
    filepath: path.resolve(__filename, '../../../fixtures/feeds/kathimerini.xml'),
    domain: 'https://www.kathimerini.gr'
  },
  tovima: {
    filepath: path.resolve(__filename, '../../../fixtures/feeds/tovima.xml'),
    domain: 'https://www.tovima.gr'
  },
  news: {
    filepath: path.resolve(__filename, '../../../fixtures/feeds/news.xml'),
    domain: 'https://www.news.gr'
  },
  newsbeast: {
    filepath: path.resolve(__filename, '../../../fixtures/feeds/newsbeast.xml'),
    domain: 'https://www.newsbeast.gr'
  },
  tvxs: {
    filepath: path.resolve(__filename, '../../../fixtures/feeds/tvxs.xml'),
    domain: 'https://www.tvxs.gr'
  },
  bbc: {
    filepath: path.resolve(__filename, '../../../fixtures/feeds/bbc.xml'),
    domain: 'https://www.bbc.com'
  },
  newsbomb: {
    filepath: path.resolve(__filename, '../../../fixtures/feeds/newsbomb.xml'),
    domain: 'https://www.newsbomb.gr'
  }
};

Object.entries(registrations).forEach(([name, registration]) => {
  it(`parses ${name}`, async () => {
    const feeds = await crawlString(registration);
    expect(feeds).toMatchSnapshot();
  });
});
