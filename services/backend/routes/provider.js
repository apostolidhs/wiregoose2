const {check} = require('express-validator');
const Provider = require('../models/provider');
const Registration = require('../models/registration');
const validationMiddleware = require('../../helpers/validationMiddleware');
const guard = require('../../helpers/middlewares/errorGuard');
const flat = require('../../helpers/flatPromise');
const checkPermission = require('../../helpers/middlewares/checkPermission');

module.exports = app => {
  app.get('/api/providers', checkPermission, async (req, res) => {
    const [providers, error] = await flat(Provider.find());
    if (error) return res.status(500).json();
    res.json(providers.map(r => r.toJsonSafe()));
  });

  app.post('/api/providers', checkPermission, async (req, res) => {
    const [provider, error] = await flat(Provider.create(req.body));
    if (error) return res.status(400).json({error: error.toString()});
    return res.json(provider.toJsonSafe());
  });

  const checkParams = [
    check('id').isMongoId().escape(),
    validationMiddleware({
      params: req => {
        const {id} = req.params;
        return {id};
      }
    })
  ];

  app.delete(
    '/api/providers/:id',
    checkPermission,
    checkParams,
    guard(async (req, res) => {
      const {id} = res.locals.params;

      const [exists, existsError] = await flat(Registration.exists({_id: id}));
      if (existsError) return res.status(500).json();
      if (exists) return res.status(400).json({error: `The id ${id} exists in the registrations collection`});

      const [provider, error] = await flat(Provider.findByIdAndRemove(id));
      if (error) return res.status(500).json();
      if (!provider) return res.status(404).json();

      return res.json();
    })
  );

  app.put(
    '/api/providers/:id',
    checkPermission,
    checkParams,
    guard(async (req, res) => {
      const {id} = res.locals.params;
      const [provider, error] = await flat(Provider.findByIdAndUpdate(id, req.body, {new: true}));

      if (error) return res.status(500).json();
      if (!provider) return res.status(404).json();

      return res.json(provider.toJsonSafe());
    })
  );
};
