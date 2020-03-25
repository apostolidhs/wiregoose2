import React, {useState} from 'react';
import {Box} from 'grommet';
import {useProvidersSelector} from 'providers/admin/providers';
import Provider from './provider';

const Providers = props => {
  const ids = useProvidersSelector(({ids}) => ids);

  return (
    <Box gap="medium" {...props}>
      {ids.map(id => (
        <Provider key={id} id={id} />
      ))}
    </Box>
  );
};

export default Providers;
