import React, {useEffect, useState, useMemo} from 'react';
import {navigate} from '@reach/router';
import {Box, Heading} from 'grommet';
import ProviderIcon from 'components/providers/icon';

const Header = ({icon, name}) => (
  <Box pad="large" gap="small" justify="center" direction="row">
    <ProviderIcon src={icon} />
    <Heading alignSelf="center" level="2" margin="none">
      {name}
    </Heading>
  </Box>
);

export default Header;
