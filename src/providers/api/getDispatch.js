import request from 'helpers/request';

export default config => {
  const transformFeed = feed => ({...feed, category: config.categories[feed.category]});
  const transformFeeds = feeds => feeds.map(transformFeed);

  return {
    timelineExplore: ({target, limit, categories}) =>
      request.get(
        'http://localhost:4100/timeline/explore',
        {target, limit, ...(categories && {categories: categories.join(',')})},
        {transform: ({feeds}) => ({feeds: transformFeeds(feeds)})}
      ),
    registrationsPerCategory: () => request.get('http://localhost:4100/registrationsPerCategory'),
    fetchFeed: (id, {article, related}) =>
      request.get(
        `http://localhost:4100/feeds/${id}`,
        {article, related},
        {transform: ({feed, relatedFeeds}) => ({feed: transformFeed(feed), relatedFeeds: transformFeeds(relatedFeeds)})}
      )
  };
};
