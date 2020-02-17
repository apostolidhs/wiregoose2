import React, {useEffect} from 'react';
import {Router} from '@reach/router';
import {useApiSelector} from 'providers/api/selectors';
import {useRegistrationAction} from 'providers/admin/registrations';
import {useProviderAction} from 'providers/admin/providers';
import Registrations from './registrations';

const useFetchRegistrations = api => {
  const {startFetch, doneFetch, failFetch} = useRegistrationAction();

  useEffect(() => {
    if (!api.admin) return;

    startFetch();
    const promise = api.admin.fetchRegistrations();

    promise.then(({data}) => doneFetch(data)).catch(error => failFetch(error));

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

const Page = () => {
  const api = useApiSelector();
  useFetchRegistrations(api);
  useFetchProviders(api);

  return (
    <Router>
      <Registrations path="/" />
    </Router>
  );
};

export default Page;
