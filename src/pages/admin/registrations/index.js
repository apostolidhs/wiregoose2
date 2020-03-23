import React, {useCallback} from 'react';
import {Box, Button} from 'grommet';
import {useProviderSelector, useProviderAction} from 'providers/admin/providers';
import Provider from 'components/admin/provider';
import Providers from './providers';

const Registrations = () => {
  const initializeResource = useProviderAction('initializeResource');
  const disabled = useProviderSelector('new', s => !s);

  const onCreate = useCallback(() => initializeResource('new'), []);

  return (
    <Box gap="medium" margin={{top: 'medium', right: 'medium'}}>
      <Box direction="row" justify="end">
        <Button onClick={onCreate} disabled={!disabled} label="Add Provider" />
      </Box>
      {!disabled && <Provider id="new" />}
      <Providers />
    </Box>
  );
};

export default Registrations;
