const {check, validationResult} = require('express-validator');
const Feed = require('../models/feed');
const config = require('../../src/config');

module.exports = app => {
  app.get(
    '/timeline/explore',
    [
      check('target')
        .isMongoId()
        .optional()
        .escape(),
      check('limit')
        .isInt({min: 5, max: 50})
        .optional()
        .toInt(),
      check('lang')
        .isIn(config.languages)
        .optional(),
      check('categories')
        .isIn(config.categories)
        .optional()
    ],
    (req, res, next) => {
      const errors = validationResult(req).formatWith(e => e.msg);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.mapped()});
      }

      const {target, lang, limit, categories} = {limit: 20, lang: 'gr', ...req.query};
      res.locals.params = {target, lang, limit, categories};
      return next();
    },
    async (req, res) => {
      const {target, lang, limit, categories} = res.locals.params;
      const feeds = await Feed.find({
        lang,
        ...(target && {_id: {$lt: target}}),
        ...(categories && {category: categories})
      })
        .select(Feed.selectFeed())
        .sort({_id: -1})
        .limit(limit);

      res.json({feeds: feeds.map(f => f.toJsonSafe())});
    }
  );
};
