import request from 'helpers/request';
import getInitialFeedState from 'providers/feeds/getInitialFeedState';

export default config => {
  const transformFeed = feed => ({...getInitialFeedState(), ...feed, category: config.categories[feed.category]});
  const transformFeeds = feeds => feeds.map(transformFeed);

  return {
    timelineExplore: ({target, limit, categories, providers}) =>
      request.get(
        'http://localhost:4100/timeline/explore',
        {
          target,
          limit,
          ...(categories && {categories: categories.join(',')}),
          ...(providers && {providers: providers.join(',')})
        },
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
