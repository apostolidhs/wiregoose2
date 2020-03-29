import {useEffect, useRef} from 'react';
import maxBy from 'lodash/maxBy';
import {useApiSelector} from 'providers/api/selectors';
import {useRegistrationAction, useRegistrationsSelector} from 'providers/admin/registrations';
import {useProviderAction} from 'providers/admin/providers';

const useFetchRegistrations = api => {
  const {startFetch, doneFetch, failFetch, update} = useRegistrationAction();

  useEffect(() => {
    if (!api.admin) return;

    startFetch();
    const promise = api.admin.fetchRegistrations();

    promise
      .then(({data}) => {
        doneFetch(data);
        update('lastSync', new Date());
      })
      .catch(error => failFetch(error));

    return promise.abort;
  }, [api.admin]);
};

const useFetchProviders = api => {
  const {startFetch, doneFetch, failFetch} = useProviderAction();

  useEffect(() => {
    if (!api.admin) return;

    startFetch();
    const promise = api.admin.fetchProviders();

    promise.then(({data}) => doneFetch(data)).catch(error => failFetch(error));

    return promise.abort;
  }, [api.admin]);
};

const useSync = api => {
  const loaded = useRegistrationsSelector(({loaded}) => loaded);
  const sync = useRegistrationAction('sync');

  useEffect(() => (loaded && api.admin ? sync() : undefined), [loaded, api.admin]);
};

export default () => {
  const api = useApiSelector();
  useFetchRegistrations(api);
  useFetchProviders(api);
  useSync(api);
};
