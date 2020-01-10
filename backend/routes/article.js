const {check, validationResult} = require('express-validator');
// const Mercury = require('@postlight/mercury-parser');
// const read = require('node-readability');
const flatPromise = require('../../helpers/flatPromise');
const Feed = require('../models/feed');
const Article = require('../models/article');

const articleReader = require('../articleReader');

module.exports = app => {
  app.get(
    '/article/:feedId',
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

      const article = await Article.findOne({feed: feedId});

      if (article) {
        return res.json(article.toJSON());
      }

      const feed = await Feed.findById(feedId).select({link: 1});

      if (!feed) {
        return res.status(404);
      }
      console.log(feed.link);
      // read(feed.link, function(err, article, meta) {
      //   console.log(err);
      //   // Main Article
      //   console.log(article.content);
      //   // // Title
      //   console.log(article.title);

      //   // // HTML Source Code
      //   // console.log(article.html);
      //   // // DOM
      //   // console.log(article.document);

      //   // // Response Object from Request Lib
      //   // console.log(meta);

      //   // Close article to clean up jsdom and prevent leaks
      //   // res.json(article);
      //   article.close();
      // });

      // const [result, parseError] = await flatPromise(Mercury.parse(feed.link));
      // console.log(result, parseError);
      // if (parseError) {
      //   return res.status(400).json({errors: parseError.message});
      // }

      // res.json(result);
    }
  );
};
