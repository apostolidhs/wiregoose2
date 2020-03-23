import React, {useMemo} from 'react';
import {Box} from 'grommet';
import {useRegistrationsSelector} from 'providers/admin/registrations';
import Header from './header';
import Registrations from './registrations';

export const useRegistrationsByProviderSelector = providerId => {
  const {byId, ids} = useRegistrationsSelector(({byId, ids}) => ({byId, ids}));
  return useMemo(
    () =>
      ids
        .sort((a, b) => (a === 'new' ? -1 : 1))
        .filter(id => byId[id].provider === providerId)
        .map(id => byId[id]),
    [providerId, byId]
  );
};

const Provider = ({expanded, onExpand, id, ...rest}) => {
  const registrations = useRegistrationsByProviderSelector(id);
  return (
    <Box gap="small" border={{color: 'light-3'}} pad="small" {...rest}>
      <Header id={id} onExpand={onExpand} />
      {registrations.length > 0 && (
        <Registrations expanded={expanded} onExpand={onExpand} registrations={registrations} />
      )}
    </Box>
  );
};

export default Provider;
