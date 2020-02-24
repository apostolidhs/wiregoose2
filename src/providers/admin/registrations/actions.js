import {hoaxActions} from 'react-hoax';

export const crawl = (id, link) => (dispatch, getState, {getApi}) => {
  dispatch(hoaxActions.startProcessResource(id));

  return getApi()
    .admin.crawlRegistration(link)
    .then(({data}) => data)
    .finally(() => dispatch(hoaxActions.doneProcessResource(id)));
};

export const articleMining = (id, link) => (dispatch, getState, {getApi}) => {
  dispatch(hoaxActions.startProcessResource(id));

  return getApi()
    .admin.articleMining(link)
    .then(({data}) => data)
    .finally(() => dispatch(hoaxActions.doneProcessResource(id)));
};
