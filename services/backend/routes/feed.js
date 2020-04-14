const {check} = require('express-validator');
const Feed = require('../models/feed');
const validationMiddleware = require('../../helpers/validationMiddleware');
const guard = require('../../helpers/middlewares/errorGuard');
const checkPermission = require('../../helpers/middlewares/checkPermission');
const articleReader = require('../articleReader');

const getArticle = async feed => {
  if (feed.articleCreatedAt) return feed;

  const [content, error] = await articleReader.fromURL(feed.link);

  feed.articleCreatedAt = new Date();
  feed.articleError = error;
  feed.articleContent = content;

  await feed.save();

  return feed;
};

const getRelated = async feed => {
  const {lang, category, _id} = feed;
  const feeds = await Feed.find({lang, _id: {$lt: _id}, category})
    .select(Feed.selectFeed())
    .sort({_id: -1})
    .limit(4);

  return feeds.map(f => f.toJsonSafe());
};

module.exports = app => {
  app.get(
    '/api/feeds/articlemining',
    checkPermission,
    check('link'),
    validationMiddleware({params: ({query: {link}}) => ({link})}),
    guard(async (req, res) => {
      const {link} = res.locals.params;
      const [content, error] = await articleReader.fromURL(link);
      if (error) return res.status(400).json({error});

      res.json(content);
    })
  );

  app.get(
    '/api/feeds/:feedId',
    [
      check('feedId').isMongoId().escape(),
      check('article').toBoolean().optional(),
      check('related').toBoolean().optional()
    ],
    validationMiddleware({
      params: req => {
        const {feedId, article, related} = {...req.query, ...req.params};
        return {feedId, article, related};
      }
    }),
    guard(async (req, res) => {
      const {feedId, article, related} = res.locals.params;
      const feed = await Feed.findById(feedId).select({...Feed.selectFeed(), ...(article && Feed.selectArticle())});
      if (!feed) return res.status(404).json();

      if (article) {
        await getArticle(feed);
      }

      const relatedFeeds = related && (await getRelated(feed));

      res.json({feed: feed.toJsonSafe(), relatedFeeds});
    })
  );
};
