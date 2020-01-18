import request from 'helpers/request';

export default config => {
  const transformFeed = feed => ({...feed, category: config.categories[feed.category]});

  return {
    timelineExplore: ({target, limit, categories}) =>
      request.get(
        'http://localhost:4100/timeline/explore',
        {target, limit, ...(categories && {categories: categories.join(',')})},
        {transform: ({feeds}) => ({feeds: feeds.map(transformFeed)})}
      ),
    registrationsPerCategory: () => request.get('http://localhost:4100/registrationsPerCategory'),
    fetchFeedWithArticle: id =>
      request.get(`http://localhost:4100/feed/${id}/article`, null, {transform: transformFeed})
  };
};
