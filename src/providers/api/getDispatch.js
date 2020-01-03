import request from 'helpers/request';

export default config => ({
  timelineExplore: ({target, limit, categories}) =>
    request.get(
      'http://localhost:4100/timeline/explore',
      {target, limit, ...(categories && {categories: categories.join(',')})},
      {transform: ({feeds}) => ({feeds: feeds.map(feed => ({...feed, category: config.categories[feed.category]}))})}
    ),
  registrationsPerCategory: () => request.get('http://localhost:4100/registrationsPerCategory')
});
