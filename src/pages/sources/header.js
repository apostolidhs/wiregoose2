import React from 'react';
import {Box, Heading} from 'grommet';
import ProviderIcon from 'components/providers/icon';

const Header = ({icon, name}) => (
  <Box pad="medium" gap="small" align="end" justify="center" direction="row" height={{min: 'initial'}}>
    <ProviderIcon src={icon} />
    <Heading alignSelf="center" level="2" margin="none">
      {name}
    </Heading>
  </Box>
);

export default Header;
