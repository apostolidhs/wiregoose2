const {check} = require('express-validator');
const Registration = require('../models/registration');
const Provider = require('../models/provider');
const config = require('../../../src/config');
const validationMiddleware = require('../../helpers/validationMiddleware');
const flat = require('../../helpers/flatPromise');
const guard = require('../../helpers/middlewares/errorGuard');
const fromUrl = require('../../crawler/fromUrl');

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
    guard(async (req, res) => {
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
    })
  );

  app.get(
    '/registrations/crawl',
    check('link'),
    validationMiddleware({
      params: req => {
        const {link} = req.query;
        return {link};
      }
    }),
    guard(async (req, res) => {
      const {link} = res.locals.params;
      const registration = {
        _id: 'FFFFFFFFFFFFFFFFFFFFFFFF',
        category: 'country',
        link,
        lang: 'gr',
        provider: {name: 'mock', link, _id: '000000000000000000000000'}
      };
      const [result, error] = await fromUrl(registration);
      if (error) return res.status(400).json({error});

      const {feeds, total} = result;
      return res.json({
        feeds: feeds.map(f => f.toJsonSafe()),
        total
      });
    })
  );

  app.get(
    '/registrations',
    guard(async (req, res) => {
      const [registrations, error] = await flat(Registration.find());
      if (error) return res.status(500).json();
      res.json(registrations.map(r => r.toJsonSafe()));
    })
  );

  app.post(
    '/registrations',
    guard(async (req, res) => {
      const [registration, error] = await flat(Registration.create(req.body));
      if (error) return res.status(500).json(error);
      return res.json(registration.toJsonSafe());
    })
  );

  const checkParams = [
    check('id')
      .isMongoId()
      .escape(),
    validationMiddleware({
      params: req => {
        const {id} = req.params;
        return {id};
      }
    })
  ];

  app.delete(
    '/registrations/:id',
    checkParams,
    guard(async (req, res) => {
      const {id} = res.locals.params;
      const [registration, error] = await flat(Registration.findByIdAndRemove(id));
      if (error) return res.status(500).json();
      if (!registration) return res.status(404).json();
      return res.json();
    })
  );

  app.put(
    '/registrations/:id',
    checkParams,
    guard(async (req, res) => {
      const {id} = res.locals.params;
      const [registration, error] = await flat(Registration.findByIdAndUpdate(id, req.body, {new: true}));

      if (error) return res.status(500).json();
      if (!registration) return res.status(404).json();

      return res.json(registration.toJsonSafe());
    })
  );
};
