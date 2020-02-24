const {check} = require('express-validator');
const Feed = require('../models/feed');
const validationMiddleware = require('../../helpers/validationMiddleware');
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
    '/feeds/articlemining',
    check('link'),
    validationMiddleware({params: ({query: {link}}) => ({link})}),
    async (req, res) => {
      const {link} = res.locals.params;
      const [content, error] = await articleReader.fromURL(link);
      if (error) return res.status(400).json({error});

      res.json(content);
    }
  );

  app.get(
    '/feeds/:feedId',
    [
      check('feedId')
        .isMongoId()
        .escape(),
      check('article')
        .toBoolean()
        .optional(),
      check('related')
        .toBoolean()
        .optional()
    ],
    validationMiddleware({
      params: req => {
        const {feedId, article, related} = {...req.query, ...req.params};
        return {feedId, article, related};
      }
    }),
    async (req, res) => {
      const {feedId, article, related} = res.locals.params;

      const feed = await Feed.findById(feedId).select({...Feed.selectFeed(), ...(article && Feed.selectArticle())});
      if (!feed) return res.status(404);

      if (article) {
        await getArticle(feed);
      }

      const relatedFeeds = related && (await getRelated(feed));

      res.json({feed: feed.toJsonSafe(), relatedFeeds});
    }
  );
};
