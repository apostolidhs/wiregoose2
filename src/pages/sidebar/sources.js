import React from 'react';
import {Box} from 'grommet';
import {CategoryLink} from 'components/categories';

const Sources = props => {
  return (
    <Box direction="column" gap="small" height={{min: 'auto'}} {...props}>
      <Box gap="xsmall">
        <CategoryLink size="large" icon category="all" />
        {/* <Providers category={category} providers={providers} /> */}
      </Box>
    </Box>
  );
};

export default Sources;
