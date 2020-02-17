import getInitialFeedState from './getInitialFeedState';

export default ({categories}) => {
  const transformFeed = feed => ({
    ...getInitialFeedState(),
    ...feed,
    category: categories[feed.category]
  });
  const transformFeeds = feeds => feeds.map(transformFeed);

  return {transformFeed, transformFeeds};
};
