const {check, validationResult} = require('express-validator');
const Feed = require('../models/feed');

const articleReader = require('../articleReader');

module.exports = app => {
  app.get(
    '/feed/:feedId/article',
    [
      check('feedId')
        .isMongoId()
        .escape()
    ],
    (req, res, next) => {
      const errors = validationResult(req).formatWith(e => e.msg);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.mapped()});
      }

      const {feedId} = {...req.query, ...req.params};
      res.locals.params = {feedId};
      return next();
    },
    async (req, res) => {
      const {feedId} = res.locals.params;

      const feed = await Feed.findById(feedId).select({...Feed.selectFeed(), ...Feed.selectArticle()});

      if (!feed) return res.status(404);
      if (feed.articleCreatedAt) return res.json(feed.toJsonSafe());

      const [content, error] = await articleReader.fromURL(feed.link);

      feed.articleCreatedAt = new Date();
      feed.articleError = error;
      feed.articleContent = content;

      await feed.save();

      return res.json(feed.toJsonSafe());
    }
  );
};
