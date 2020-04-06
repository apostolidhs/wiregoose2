if (NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config({path: '.env'});
}

const {connect} = require('../helpers/mongoose');
const crawl = require('./crawl');
connect().then(() => {
  crawl();
});
