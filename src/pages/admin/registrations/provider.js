import React, {useMemo} from 'react';
import {Box} from 'grommet';
import {useRegistrationsSelector} from 'providers/admin/registrations';
import Header from './header';
import Registrations from './registrations';

export const useRegistrationsByProviderSelector = providerId => {
  const {byId, ids} = useRegistrationsSelector(({byId, ids}) => ({byId, ids}));
  return useMemo(() => ids.filter(id => byId[id].provider === providerId).map(id => byId[id]), [providerId, byId]);
};

const Provider = ({expanded, onExpand, id, name}) => {
  const registrations = useRegistrationsByProviderSelector(id);
  return (
    <Box gap="small">
      <Header name={name} />
      <Registrations expanded={expanded} onExpand={onExpand} registrations={registrations} />
    </Box>
  );
};

export default Provider;
