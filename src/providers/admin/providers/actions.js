import {hoaxActions, hoaxResourceActions} from 'react-hoax';

export const fetch = () => (dispatch, getState, {getApi, notification}) => {
  dispatch(hoaxActions.startFetch);
  return getApi()
    .admin.fetchProviders()
    .then(({data}) => dispatch(hoaxActions.doneFetch(data)))
    .catch(error => {
      dispatch(hoaxActions.failFetch);
    });
};

export const save = id => (dispatch, getState, {getApi, notification}) => {
  dispatch(hoaxResourceActions.startProcessResource(id));
  const provider = getState().byId[id];
  const promise = id === 'new' ? getApi().admin.createProvider(provider) : getApi().admin.updateProvider(id, provider);
  return promise
    .then(({data}) => {
      if (id === data.id) {
        dispatch(hoaxResourceActions.doneProcessResource(id));
      } else {
        dispatch(hoaxResourceActions.removeResource(id));
      }
      dispatch(hoaxResourceActions.initializeResource(data.id, data));
      notification.info('Provider saved');
    })
    .catch(({data: {error}}) => {
      notification.warning(`Provider save failed, ${error.toString()}`);
      dispatch(hoaxResourceActions.doneProcessResource(id));
    });
};

export const remove = id => (dispatch, getState, {getApi, notification}) => {
  if (id === 'new') return Promise.resolve(dispatch(hoaxResourceActions.removeResource(id)));

  dispatch(hoaxResourceActions.startProcessResource(id));
  return getApi()
    .admin.deleteProvider(id)
    .then(() => {
      dispatch(hoaxResourceActions.removeResource(id));
      notification.info('Provider deleted');
    })
    .catch(e => {
      dispatch(hoaxResourceActions.doneProcessResource(id));
      notification.warning(`Provider removal failed, ${e.toString()}`);
    });
};
