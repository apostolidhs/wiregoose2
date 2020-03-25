import React, {useMemo} from 'react';
import {Box} from 'grommet';
import {useRegistrationsSelector} from 'providers/admin/registrations';
import {useProvidersSelector} from 'providers/admin/providers';
import Registrations from 'components/admin/registrations';
import ProviderComponent from 'components/admin/provider';
import Header from './header';

export const useRegistrationsByProviderSelector = providerId => {
  const {byId, ids} = useRegistrationsSelector(({byId, ids}) => ({byId, ids}));
  return useMemo(() => ids.filter(id => byId[id].provider === providerId).sort((a, b) => (a === 'new' ? -1 : 1)), [
    providerId,
    byId
  ]);
};

const Provider = ({id, ...rest}) => {
  const ids = useRegistrationsByProviderSelector(id);
  const isEditing = useProvidersSelector(({editedId}) => editedId === id);

  return (
    <Box gap="small" border={{color: 'light-3'}} pad="small" {...rest}>
      <Header id={id} />
      {isEditing && <ProviderComponent id={id} />}
      {ids.length > 0 && <Registrations ids={ids} />}
    </Box>
  );
};

export default Provider;
