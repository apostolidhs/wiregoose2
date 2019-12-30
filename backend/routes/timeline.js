const {check, validationResult} = require('express-validator');
const Feeds = require('../models/feed');
const config = require('../../src/config');

const categoryByIndex = config.categories.reduce((h, category, index) => ({...h, [category]: index}), {});

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
        .optional()
    ],
    (req, res, next) => {
      const errors = validationResult(req).formatWith(e => e.msg);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.mapped()});
      }

      const {target, lang, limit} = {limit: 20, lang: 'gr', ...req.query};
      res.locals.params = {target, lang, limit};
      return next();
    },
    async (req, res) => {
      const {target, lang, limit} = res.locals.params;
      const feeds = await Feeds.find({
        lang,
        ...(target && {_id: {$lt: target}})
      })
        .select({
          title: 1,
          image: 1,
          description: 1,
          published: 1,
          link: 1,
          category: 1,
          author: 1,
          provider: 1
        })
        .sort({_id: -1})
        .limit(limit);

      res.json({
        feeds: feeds.map(feed => ({
          ...feed.toJSON(),
          _id: undefined,
          id: feed.id,
          category: categoryByIndex[feed.category]
        }))
      });
    }
  );
};
