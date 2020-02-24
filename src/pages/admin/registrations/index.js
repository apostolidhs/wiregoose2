import React, {useMemo, useState} from 'react';
import {Box} from 'grommet';
import {useProviderListSelector} from 'providers/admin/providers';
import Provider from './provider';

const Registrations = () => {
  const [expanded, setExpanded] = useState();
  const providers = useProviderListSelector();
  return (
    <Box>
      {providers.map(provider => (
        <Provider expanded={expanded} onExpand={setExpanded} key={provider.id} {...provider} />
      ))}
    </Box>
  );
};

export default Registrations;
