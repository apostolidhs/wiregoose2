import {hoaxActions} from 'react-hoax';

export const fetch = () => (dispatch, getState, {getApi, notification}) => {
  dispatch(hoaxActions.startFetch);
  return getApi()
    .admin.fetchProviders()
    .then(({data}) => dispatch(hoaxActions.doneFetch(data)))
    .catch((error) => {
      dispatch(hoaxActions.failFetch);
    });
};

export const save = (id) => (dispatch, getState, {getApi, notification}) => {
  dispatch(hoaxActions.startProcessResource(id));
  const provider = getState().byId[id];
  const promise = id === 'new' ? getApi().admin.createProvider(provider) : getApi().admin.updateProvider(id, provider);
  return promise
    .then(({data}) => {
      if (id === data.id) {
        dispatch(hoaxActions.doneProcessResource(id));
      } else {
        dispatch(hoaxActions.removeResource(id));
      }
      dispatch(hoaxActions.initializeResource(data.id, data));
      notification.info('Provider saved');
    })
    .catch(({data: {error}}) => {
      notification.warning(`Provider save failed, ${error.toString()}`);
      dispatch(hoaxActions.doneProcessResource(id));
    });
};

export const remove = (id) => (dispatch, getState, {getApi, notification}) => {
  if (id === 'new') return Promise.resolve(dispatch(hoaxActions.removeResource(id)));

  dispatch(hoaxActions.startProcessResource(id));
  return getApi()
    .admin.deleteProvider(id)
    .then(() => {
      dispatch(hoaxActions.removeResource(id));
      notification.info('Provider deleted');
    })
    .catch((e) => {
      dispatch(hoaxActions.doneProcessResource(id));
      notification.warning(`Provider removal failed, ${e.toString()}`);
    });
};
