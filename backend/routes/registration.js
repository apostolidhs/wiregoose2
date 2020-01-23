const {check} = require('express-validator');
const Registration = require('../models/registration');
const Provider = require('../models/provider');
const config = require('../../src/config');
const validationMiddleware = require('../../helpers/validationMiddleware');

module.exports = app => {
  app.get(
    '/registrationsPerCategory',
    check('lang')
      .isIn(config.languages)
      .optional(),
    validationMiddleware({
      params: req => {
        const {lang} = {lang: 'gr', ...req.query};
        return {lang};
      }
    }),
    async (req, res) => {
      const {lang} = res.locals.params;
      const [registrations, providers] = await Promise.all([Registration.find({lang}), Provider.find()]);

      const providersSet = new Set();

      const providersSetPerCategory = registrations.reduce((h, registration) => {
        const providerPerCategory = h[registration.category] || new Set();
        const providerId = registration.provider.toString();
        providerPerCategory.add(providerId);
        providersSet.add(providerId);
        h[registration.category] = providerPerCategory;
        return h;
      }, {});

      const providersBatch = [...providersSet];
      const providersById = providers.reduce((h, provider) => ({...h, [provider.id]: provider}), {});
      const providersIndexById = providersBatch.reduce((h, providerId, index) => ({...h, [providerId]: index}), {});

      const providerIndexesByCategoryIndex = config.categories.map(category =>
        [...(providersSetPerCategory[category] || [])].map(providerId => providersIndexById[providerId])
      );

      res.json({
        registrations: providerIndexesByCategoryIndex,
        providers: providersBatch.map(providerId => {
          const {name, icon, link} = providersById[providerId];
          return {name, icon, link};
        })
      });
    }
  );
};
