import React, {useState} from 'react';
import {Box} from 'grommet';
import {useProviderListSelector} from 'providers/admin/providers';
import Provider from './provider';

const Providers = props => {
  const [expanded, setExpanded] = useState();
  const providers = useProviderListSelector();

  return (
    <Box gap="medium" {...props}>
      {providers.map(provider => (
        <Provider expanded={expanded} onExpand={setExpanded} key={provider.id} id={provider.id} />
      ))}
    </Box>
  );
};

export default Providers;
