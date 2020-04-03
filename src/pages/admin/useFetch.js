import {useEffect, useRef} from 'react';
import {useApiSelector} from 'providers/api/selectors';
import {useRegistrationAction, useRegistrationsSelector} from 'providers/admin/registrations';
import {useProviderAction} from 'providers/admin/providers';

const useSync = (api) => {
  const loaded = useRegistrationsSelector(({loaded}) => loaded);
  const sync = useRegistrationAction('sync');

  useEffect(() => (loaded && api.admin ? sync() : undefined), [loaded, api.admin]);
};

export default () => {
  const api = useApiSelector();
  const {fetch: fetchRegistrations} = useRegistrationAction();
  const {fetch: fetchProviders} = useProviderAction();

  useEffect(() => {
    if (!api.admin) return;
    fetchRegistrations();
    fetchProviders();
  }, [api.admin]);

  useSync(api);
};
