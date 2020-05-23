if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config({path: '.env'});
}

const {connect} = require('../helpers/mongoose');
const crawl = require('./crawl');
connect().then(() => {
  crawl();
});

////////////////////////////////////////

// const fromUrl = require('./fromUrl');
// const {Types} = require('mongoose');

// const getRegistration = (name, link) => ({
//   _id: Types.ObjectId(),
//   category: 'world',
//   lang: 'gr',
//   link,
//   provider: {
//     _id: Types.ObjectId(),
//     icon: `${link}/icon.png`,
//     name,
//     link
//   },
//   addError: () => {}
// });

// connect().then(async () => {
//   const registration = getRegistration('newsit', 'https://www.sport24.gr/?widget=rssfeed&view=feed');
//   const [result, error] = await fromUrl(registration);
//   console.log(result, error);
// });
