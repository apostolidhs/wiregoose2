import {hoaxActions} from 'react-hoax';
import maxBy from 'lodash/maxBy';

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

export const save = id => (dispatch, getState, {getApi, notification}) => {
  dispatch(hoaxActions.startProcessResource(id));
  const registration = getState().byId[id];
  const api = getApi().admin;
  const promise = id === 'new' ? api.createRegistration(registration) : api.updateRegistration(id, registration);
  return promise
    .then(({data}) => {
      if (id === data.id) {
        dispatch(hoaxActions.doneProcessResource(id));
      } else {
        dispatch(hoaxActions.removeResource(id));
      }
      dispatch(hoaxActions.initializeResource(data.id, data));
      notification.info('Registration saved');
    })
    .catch(e => {
      dispatch(hoaxActions.doneProcessResource(id));
      notification.warning(`Registration save failed, ${e.toString()}`);
    });
};

export const remove = id => (dispatch, getState, {getApi, notification}) => {
  if (id === 'new') return dispatch(hoaxActions.removeResource(id));

  dispatch(hoaxActions.startProcessResource(id));
  return getApi()
    .admin.deleteRegistration(id)
    .then(() => {
      dispatch(hoaxActions.removeResource(id));
      notification.info('Registration deleted');
    })
    .catch(e => {
      dispatch(hoaxActions.doneProcessResource(id));
      notification.warning(`Registration removal failed, ${e.toString()}`);
    });
};

const nestedSync = (dispatch, getState, {getApi, ref}) => {
  ref.animationId = requestAnimationFrame(() => {
    ref.timeoutId = setTimeout(() => {
      const lastSyncId = maxBy(getState().ids, id => getState().byId[id].lastCrawl.getTime());
      ref.promise = lastSyncId ? getApi().admin.syncRegistration(lastSyncId) : Promise.resolve({data: []});
      ref.promise
        .then(({data}) => {
          data.forEach(({id, total, accepted, stored, failures, lastCrawl, isCrawling}) =>
            dispatch(
              hoaxActions.initializeResource(id, {
                ...getState().byId[id],
                total,
                accepted,
                stored,
                failures,
                lastCrawl,
                isCrawling
              })
            )
          );
          dispatch(hoaxActions.update('lastSync', new Date()));
        })
        .then(() => nestedSync(dispatch, getState, {getApi, ref}));
    }, 15 * 1000);
  });
};

export const sync = () => (dispatch, getState, {getApi}) => {
  const ref = {};
  nestedSync(dispatch, getState, {getApi, ref});

  return () => {
    clearTimeout(ref.timeoutId);
    cancelAnimationFrame(ref.animationId);
    ref.promise && ref.promise.abort();
  };
};
