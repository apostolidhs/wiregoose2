export const initialBucket = {loading: false, loaded: false, ids: []};
export const initialState = {feeds: {}, sources: {}, categories: {}, articles: initialBucket};

const getInitialFeedState = (id = null) => ({
  loading: false,
  loaded: false,
  id,

  articleLoaded: false,
  articleLoading: false,
  articleContent: [],
  articleError: null,
  articleCreatedAt: null,

  relatedLoaded: false,
  relatedLoading: false,
  relatedIds: []
});

const addFeed = (stateFeeds, feed, attrs) => {
  const storedFeed = stateFeeds[feed.id];
  return {
    ...stateFeeds,
    [feed.id]: storedFeed
      ? {...storedFeed, reference: storedFeed.reference + 1, ...attrs}
      : {...feed, fetched: new Date(), reference: 1, ...attrs}
  };
};

const removeFeed = (stateFeeds, id, attrs) => {
  const feed = stateFeeds[id];
  if (!feed) return stateFeeds;
  if (feed.reference > 1) return {...stateFeeds, [id]: {...feed, reference: feed.reference - 1, ...attrs}};

  delete stateFeeds[id];
  return feed.relatedIds.reduce((h, relatedFeedId) => removeFeed(h, relatedFeedId), {...stateFeeds});
};

const addFeeds = (stateFeeds, feeds) => feeds.reduce((h, feed) => addFeed(h, feed), stateFeeds);

const addFeedsToBucket = (bucket, feeds) => ({...bucket, ids: [...bucket.ids, ...feeds.map(f => f.id)]});

const setCategory = (s, name, bucket) => ({
  ...s,
  categories: {
    ...s.categories,
    [name]: {...((s.categories && s.categories[name]) || initialBucket), ...bucket}
  }
});

const categoryFetchFinished = (s, name, stateFeeds) => {
  const feeds = addFeeds(s.feeds, stateFeeds);
  const bucket = addFeedsToBucket({...s.categories[name], loading: false, loaded: true}, stateFeeds);
  return {...setCategory(s, name, bucket), feeds};
};

export default dispatch => ({
  categoryFetchStarted: name => dispatch(s => setCategory(s, name, {loading: true})),
  categoryFetchFinished: (name, feeds) => dispatch(s => categoryFetchFinished(s, name, feeds)),
  categoryFetchFailed: name => dispatch(s => setCategory(s, name, {loading: false})),

  feedFetchStarted: (id, {article, related}) =>
    dispatch(s => {
      const attrs = {articleLoading: !!article, relatedLoading: !!related, loading: true};
      if (s.articles.ids.includes(id)) {
        return {...s, feeds: {...s.feeds, [id]: {...s.feeds[id], ...attrs}}};
      }

      const feeds = addFeed(s.feeds, getInitialFeedState(id), attrs);
      const articles = article ? addFeedsToBucket(s.articles, [feeds[id]]) : s.articles;
      return {...s, articles, feeds};
    }),

  feedFetchFinished: (id, {relatedFeeds, feed}, {article, related}) =>
    dispatch(s => {
      const stateFeed = s.feeds[id];
      if (!feed) {
        console.warn(`feedFetchFinished: feed ${id} doesn't exist`);
        return s;
      }

      const feeds = relatedFeeds ? addFeeds(s.feeds, relatedFeeds) : s.feeds;
      return {
        ...s,
        ...(article && {articles: {...s.articles, loading: false, loaded: true}}),
        feeds: {
          ...feeds,
          [id]: {
            ...stateFeed,
            ...feed,
            loading: false,
            loaded: true,
            ...(related && {
              relatedLoading: false,
              relatedLoaded: true,
              relatedIds: relatedFeeds.map(f => f.id)
            }),
            ...(article && {articleLoading: false, articleLoaded: true})
          }
        }
      };
    }),

  feedFetchFailed: (id, {article, related}) =>
    dispatch(s => ({
      ...s,
      feeds: removeFeed(s.feeds, id, {
        ...(article && {articleLoading: false}),
        ...(related && {relatedLoading: false}),
        loading: false
      }),
      articles: article ? {loading: false, loaded: true, ids: s.articles.ids.filter(i => i !== id)} : s.articles
    }))
});
