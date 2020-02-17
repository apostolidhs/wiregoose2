import request from 'helpers/request';
import makeTransformFeeds from 'providers/feeds/deserialize';
import {getBackendUri} from 'helpers/environment';

const uri = getBackendUri();

export default ({config}) => {
  const {transformFeed, transformFeeds} = makeTransformFeeds(config);
  return {
    timelineExplore: ({target, limit, categories, providers}) =>
      request.get(`${uri}/timeline/explore`, {
        params: {
          target,
          limit,
          ...(categories && {categories: categories.join(',')}),
          ...(providers && {providers: providers.join(',')})
        },
        transform: ({feeds}) => ({feeds: transformFeeds(feeds)})
      }),
    registrationsPerCategory: () => request.get(`${uri}/registrationsPerCategory`),
    fetchFeed: (id, {article, related}) =>
      request.get(`${uri}/feeds/${id}`, {
        params: {article, related},
        transform: ({feed, relatedFeeds}) => ({feed: transformFeed(feed), relatedFeeds: transformFeeds(relatedFeeds)})
      })
  };
};
