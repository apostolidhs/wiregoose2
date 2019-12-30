const {check, validationResult} = require('express-validator');
const Registration = require('../models/registration');
const Provider = require('../models/provider');
const config = require('../../src/config');

module.exports = app => {
  app.get(
    '/registrationsPerCategory',
    check('lang')
      .isIn(config.languages)
      .optional(),
    (req, res, next) => {
      const errors = validationResult(req).formatWith(e => e.msg);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.mapped()});
      }

      const {lang} = {lang: 'gr', ...req.query};
      res.locals.params = {lang};
      return next();
    },
    async (req, res) => {
      const {lang} = res.locals.params;
      const [registrations, providers] = await Promise.all([
        Registration.find({lang}),
        Provider.find().select({name: 1, icon: 1})
      ]);

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
          const {name, icon} = providersById[providerId];
          return {name, icon};
        })
      });
    }
  );
};
