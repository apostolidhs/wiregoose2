export const initialBucket = {loading: false, loaded: false, ids: []};

const addFeeds = (allFeeds, bucketFeeds, feeds) => ({
  allFeeds: feeds.reduce(
    (h, feed) => ({
      ...h,
      [feed.id]:
        feed.id in allFeeds
          ? {...h[feed.id], reference: h[feed.id].reference + 1}
          : {...feed, fetched: new Date(), reference: 1}
    }),
    allFeeds
  ),
  bucketFeeds: [...bucketFeeds, ...feeds.map(f => f.id)]
});

const setCategory = (state, name, bucket) => ({
  ...state,
  categories: {
    ...state.categories,
    [name]: {...((state.categories && state.categories[name]) || initialBucket), ...bucket}
  }
});

export default dispatch => ({
  categoryFetchStarted: name => dispatch(s => setCategory(s, name, {loading: true})),
  categoryFetchFinished: (name, feeds) =>
    dispatch(s => {
      const {allFeeds, bucketFeeds} = addFeeds(s.feeds, s.categories[name].ids, feeds);
      return {
        ...s,
        ...setCategory(s, name, {loading: false, loaded: true, ids: bucketFeeds}),
        feeds: allFeeds
      };
    }),
  categoryFetchFailed: name => dispatch(s => setCategory(s, name, {loading: false}))
});
