const dotenv = require('dotenv');
dotenv.config();
const {connect, drop} = require('../helpers/mongoose');
const registrationsFixtures = require('../fixtures/registrations.json');
const providersFixtures = require('../fixtures/providers.json');
const Provider = require('../backend/models/provider');
const Registration = require('../backend/models/registration');

const setFixtures = async () => {
  try {
    await connect();
    await drop();

    const providers = await Provider.insertMany(providersFixtures);
    const providersByName = providers.reduce((h, p) => ({...h, [p.name]: p}), {});
    const registrations = await Registration.insertMany(
      registrationsFixtures.map(({provider, ...r}) => ({...r, provider: providersByName[provider].id}))
    );
    console.info(`${registrations.length} registrations by ${providers.length} providers loaded`);
  } catch (e) {
    console.error(e);
  }
  process.exit(0);
};

setFixtures();
