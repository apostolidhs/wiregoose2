import React, {memo} from 'react';
import {Box} from 'grommet';
import {useRegistrationsSelector} from 'providers/registrations/selectors';
import Category from 'components/registrations/category';

const Sources = props => {
  const {providers} = useRegistrationsSelector();

  return (
    <Box direction="column" gap="small" height={{min: 'auto'}} {...props}>
      <Category category="all" providers={providers} />
    </Box>
  );
};

export default memo(Sources);
