const dotenv = require('dotenv');
dotenv.config();
const {connect, drop} = require('../backend/mongoose');
const Provider = require('../backend/models/provider');
const Registration = require('../backend/models/registration');
const Feed = require('../backend/models/feed');

const setFixtures = async () => {
  await connect();
  await drop();

  const inProvider = await Provider.create({
    name: 'in.gr',
    link: 'https://www.in.gr',
    icon: 'https://www.in.gr/wp-content/themes/ingr/common/imgs/default/icon_in.png'
  });
  const newsbombProvider = await Provider.create({
    name: 'newsbomb.gr',
    link: 'https://www.newsbomb.gr',
    icon: 'https://nb.bbend.net/templates/newsbomb/images/device/favicon.ico'
  });

  await Registration.create({
    category: 'World',
    link: 'http://rss.in.gr/feed/news/world',
    lang: 'gr',
    provider: inProvider.id
  });

  await Registration.create({
    category: 'Country',
    link: 'http://rss.in.gr/feed/news/greece',
    lang: 'gr',
    provider: inProvider.id
  });

  await Registration.create({
    category: 'World',
    link: 'http://www.newsbomb.gr/kosmos?format=feed%26type=rss',
    lang: 'gr',
    provider: newsbombProvider.id
  });

  await Registration.create({
    category: 'Economy',
    link: 'http://www.newsbomb.gr/oikonomia?format=feed%26type=rss',
    lang: 'gr',
    provider: newsbombProvider.id
  });

  process.exit(0);
};

setFixtures();
