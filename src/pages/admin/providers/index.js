import React, {useCallback} from 'react';
import {Box, Button} from 'grommet';
import {useProviderSelector, useProviderAction} from 'providers/admin/providers';
import Provider from 'components/admin/provider';
import ProviderList from './providers';

const Providers = () => {
  const initializeResource = useProviderAction('initializeResource');
  const hasNew = useProviderSelector('new', s => !!s);

  const onCreate = useCallback(() => initializeResource('new'), []);
  return (
    <Box gap="medium">
      <Box direction="row" justify="end">
        <Button onClick={onCreate} disabled={hasNew} label="Add Provider" />
      </Box>
      {hasNew && <Provider id="new" />}
      <ProviderList />
    </Box>
  );
};

export default Providers;
