import React, {useMemo} from 'react';
import {Box} from 'grommet';
import {useProvidersSelector} from 'providers/admin/providers';
import Provider from './provider';

export const useProviderListSelector = () => {
  const {byId, ids} = useProvidersSelector(({byId, ids}) => ({byId, ids}));
  return useMemo(() => ids.map(id => byId[id]), [byId]);
};

const Registrations = () => {
  const providers = useProviderListSelector();
  return (
    <Box>
      {providers.map(provider => (
        <Provider key={provider.id} {...provider} />
      ))}
    </Box>
  );
};

export default Registrations;
