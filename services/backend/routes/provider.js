const {check} = require('express-validator');
const Provider = require('../models/provider');
const validationMiddleware = require('../../helpers/validationMiddleware');

module.exports = app => {
  app.get('/providers', async (req, res) => {
    const [providers, error] = await flat(Provider.find());
    if (error) res.status(500).json();
    res.json(providers.map(r => r.toJsonSafe()));
  });

  app.post('/providers', async (req, res) => {
    const [provider, error] = await flat(Provider.create(req.body));
    if (error) res.status(500).json();
    return res.json(provider.toJsonSafe());
  });

  const checkParams = [
    check('id')
      .isMongoId()
      .escape(),
    validationMiddleware({
      params: req => {
        const {id} = req.query;
        return {id};
      }
    })
  ];

  app.delete('/providers/:id', checkParams, async (req, res) => {
    const {id} = res.locals.params;
    const [provider, error] = await flat(Provider.findByIdAndRemove(id));
    if (error) return res.status(500).json();
    if (!provider) return res.status(404).json();
    return res.json();
  });

  app.put('/providers/:id', checkParams, async (req, res) => {
    const {id} = res.locals.params;
    const [provider, error] = await flat(Provider.findByIdAndUpdate(id, req.body, {new: true}));

    if (error) return res.status(500).json();
    if (!provider) return res.status(404).json();

    return res.json(provider.toJsonSafe());
  });
};
