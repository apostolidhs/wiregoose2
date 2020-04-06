const {check} = require('express-validator');
const Feed = require('../models/feed');
const config = require('../../../src/config');
const validationMiddleware = require('../../helpers/validationMiddleware');
const guard = require('../../helpers/middlewares/errorGuard');

module.exports = (app) => {
  app.get(
    '/api/timeline/explore',
    [
      check('target').isMongoId().optional().escape(),
      check('limit').isInt({min: 5, max: 50}).optional().toInt(),
      check('lang').isIn(config.languages).optional(),
      check('categories').isIn(config.categories).optional(),
      check('providers').escape().optional(),
    ],
    validationMiddleware({
      params: (req) => {
        const {target, lang, limit, categories, providers} = {limit: 20, lang: 'gr', ...req.query};
        return {target, lang, limit, categories, providers};
      },
    }),
    guard(async (req, res) => {
      const {target, lang, limit, categories, providers} = res.locals.params;
      const feeds = await Feed.find({
        lang,
        ...(target && {_id: {$lt: target}}),
        ...(categories && {category: categories}),
        ...(providers && {provider: providers}),
      })
        .select(Feed.selectFeed())
        .sort({_id: -1})
        .limit(limit);

      res.json({feeds: feeds.map((f) => f.toJsonSafe())});
    })
  );
};
