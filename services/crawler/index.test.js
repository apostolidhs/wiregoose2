const {Types} = require('mongoose');
const fs = require('fs');
const path = require('path');
const fromString = require('./fromString');

const getRegistration = (name, link) => ({
  _id: Types.ObjectId(),
  category: 'world',
  lang: 'gr',
  provider: {
    _id: Types.ObjectId(),
    icon: `${link}/icon.png`,
    name,
    link
  }
});

const registrations = {
  protothema: {
    filepath: path.resolve(__filename, '../../fixtures/feeds/protothema.xml'),
    ...getRegistration('Πρώτο Θέμα', 'https://www.protothema.gr')
  },
  skai: {
    filepath: path.resolve(__filename, '../../fixtures/feeds/skai.xml'),
    ...getRegistration('ΣΚΑΪ', 'https://www.skai.gr')
  },
  madata: {
    filepath: path.resolve(__filename, '../../fixtures/feeds/madata.xml'),
    ...getRegistration('Μadata', 'https://www.madata.gr')
  },
  newsit: {
    filepath: path.resolve(__filename, '../../fixtures/feeds/newsit.xml'),
    ...getRegistration('Νewsit', 'https://www.newsit.gr')
  },
  cnnCom: {
    filepath: path.resolve(__filename, '../../fixtures/feeds/cnn-com.xml'),
    ...getRegistration('CNN', 'https://www.cnn.com')
  },
  cnnGr: {
    filepath: path.resolve(__filename, '../../fixtures/feeds/cnn-gr.xml'),
    ...getRegistration('CNN', 'https://www.cnn.gr')
  },
  lifo: {
    filepath: path.resolve(__filename, '../../fixtures/feeds/lifo.xml'),
    ...getRegistration('LiFO', 'https://www.lifo.gr')
  },
  altsantiri: {
    filepath: path.resolve(__filename, '../../fixtures/feeds/altsantiri.xml'),
    ...getRegistration('Al Tsantiri', 'https://www.altsantiri.gr')
  },
  naftemporiki: {
    filepath: path.resolve(__filename, '../../fixtures/feeds/naftemporiki.xml'),
    ...getRegistration('Ναυτεμπορική', 'https://www.naftemporiki.gr')
  },
  in: {
    filepath: path.resolve(__filename, '../../fixtures/feeds/in.xml'),
    ...getRegistration('In', 'https://www.in.gr')
  },
  kathimerini: {
    filepath: path.resolve(__filename, '../../fixtures/feeds/kathimerini.xml'),
    ...getRegistration('Καθημερινή', 'https://www.kathimerini.gr')
  },
  tovima: {
    filepath: path.resolve(__filename, '../../fixtures/feeds/tovima.xml'),
    ...getRegistration('Το Βήμα', 'https://www.tovima.gr')
  },
  news: {
    filepath: path.resolve(__filename, '../../fixtures/feeds/news.xml'),
    ...getRegistration('News', 'https://www.news.gr')
  },
  newsbeast: {
    filepath: path.resolve(__filename, '../../fixtures/feeds/newsbeast.xml'),
    ...getRegistration('Newsbeast', 'https://www.newsbeast.gr')
  },
  tvxs: {
    filepath: path.resolve(__filename, '../../fixtures/feeds/tvxs.xml'),
    ...getRegistration('Tvxs', 'https://www.tvxs.gr')
  },
  bbc: {
    filepath: path.resolve(__filename, '../../fixtures/feeds/bbc.xml'),
    ...getRegistration('BBC', 'https://www.bbc.com')
  },
  newsbomb: {
    filepath: path.resolve(__filename, '../../fixtures/feeds/newsbomb.xml'),
    ...getRegistration('Newsbomb', 'https://www.newsbomb.gr')
  }
};

Object.entries(registrations).forEach(([name, registration]) => {
  it(`parses ${name}`, async () => {
    const file = fs.readFileSync(registration.filepath);
    const feeds = await fromString(registration, file);
    expect(
      feeds.map(feed => {
        const {title, image, description, published, link, author} = feed.toJSON();
        return {title, image, description, published, link, author};
      })
    ).toMatchSnapshot();
  });
});
