import request from 'helpers/request';

export default ({categories}) => ({
  timelineExplore: (target, limit) =>
    request.get(
      'http://localhost:4100/timeline/explore',
      {target, limit},
      {transform: ({feeds}) => ({feeds: feeds.map(feed => ({...feed, category: categories[feed.category]}))})}
    ),
  registrationsPerCategory: () => request.get('http://localhost:4100/registrationsPerCategory')
});
