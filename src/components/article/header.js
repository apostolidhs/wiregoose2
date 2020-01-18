import React from 'react';
import {Box} from 'grommet';
import ActionBar from 'components/feed/actionBar';
import Back from 'components/back';

const Header = () => {
  return (
    <Box height={{min: 'initial'}} direction="row" justify="between">
      <Back />
      <ActionBar height={{min: 'initial'}} />
    </Box>
  );
};

export default Header;
