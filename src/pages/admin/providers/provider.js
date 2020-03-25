import React, {useMemo} from 'react';
import {Box} from 'grommet';
import {useRegistrationsSelector} from 'providers/admin/registrations';
import {useProvidersSelector} from 'providers/admin/providers';
import Registrations from 'components/admin/registrations';
import ProviderComponent from 'components/admin/provider';
import Header from './header';

export const useRegistrationsByProviderSelector = providerId => {
  const {byId, ids} = useRegistrationsSelector(({byId, ids}) => ({byId, ids}));
  return useMemo(
    () =>
      ids
        .filter(id => byId[id].provider === providerId)
        .sort((a, b) => (a === 'new' ? -1 : 1))
        .map(id => byId[id]),
    [providerId, byId]
  );
};

const Provider = ({expanded, onExpand, id, ...rest}) => {
  const registrations = useRegistrationsByProviderSelector(id);
  const isEditing = useProvidersSelector(({editedId}) => editedId === id);

  return (
    <Box gap="small" border={{color: 'light-3'}} pad="small" {...rest}>
      <Header id={id} onExpand={onExpand} />
      {isEditing && <ProviderComponent id={id} />}
      {registrations.length > 0 && (
        <Registrations expanded={expanded} onExpand={onExpand} registrations={registrations} />
      )}
    </Box>
  );
};

export default Provider;
