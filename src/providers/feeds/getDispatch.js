export const initialBucket = {loading: false, loaded: false, ids: []};
export const initialState = {feeds: {}, categories: {}, articles: initialBucket};
const getInitialFeedState = (id = null) => ({loading: false, loaded: false, id});

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
  if (feed.reference > 1) {
    return {...stateFeeds, [id]: {...feed, reference: feed.reference - 1, ...attrs}};
  }
  delete stateFeeds[id];
  return {...stateFeeds};
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

  articleFetchStarted: id =>
    dispatch(s => {
      // debugger;
      if (s.articles.ids.includes(id)) {
        return {...s, feeds: {...s.feeds, [id]: {...s.feeds[id], articleLoading: true}}};
      }

      const feeds = addFeed(s.feeds, getInitialFeedState(id), {articleLoading: true});
      const articles = addFeedsToBucket(s.articles, [feeds[id]]);
      return {...s, articles, feeds};
    }),

  articleFetchFinished: (id, feed) =>
    dispatch(s => {
      // debugger;
      return {
        ...s,
        articles: {...s.articles, loading: false, loaded: true},
        feeds: {...s.feeds, [id]: {...s.feeds[id], ...feed, articleLoading: false}}
      };
    }),

  articleFetchFailed: id =>
    dispatch(s => {
      // debugger;
      return {
        ...s,
        feeds: removeFeed(s.feeds, id, {articleLoading: false}),
        articles: {loading: false, loaded: true, ids: s.articles.ids.filter(i => i !== id)}
      };
    })
});
