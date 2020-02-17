import request from 'helpers/request';
import makeTransformFeeds from 'providers/feeds/deserialize';

export default ({config}) => {
  const {transformFeed, transformFeeds} = makeTransformFeeds(config);
  return {
    timelineExplore: ({target, limit, categories, providers}) =>
      request.get('http://localhost:4100/timeline/explore', {
        params: {
          target,
          limit,
          ...(categories && {categories: categories.join(',')}),
          ...(providers && {providers: providers.join(',')})
        },
        transform: ({feeds}) => ({feeds: transformFeeds(feeds)})
      }),
    registrationsPerCategory: () => request.get('http://localhost:4100/registrationsPerCategory'),
    fetchFeed: (id, {article, related}) =>
      request.get(`http://localhost:4100/feeds/${id}`, {
        params: {article, related},
        transform: ({feed, relatedFeeds}) => ({feed: transformFeed(feed), relatedFeeds: transformFeeds(relatedFeeds)})
      })
  };
};
