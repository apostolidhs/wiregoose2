import React from 'react';
import {Box} from 'grommet';
import ActionBar from 'components/feed/actionBar';
import Back from 'components/back';

const Header = ({feedId, ...rest}) => {
  return (
    <Box height={{min: 'initial'}} direction="row" justify="between" {...rest}>
      <Back />
      <ActionBar height={{min: 'initial'}} feedId={feedId} />
    </Box>
  );
};

export default Header;
