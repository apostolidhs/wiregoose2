import React from 'react';
import {Box, Text} from 'grommet';

const Pill = ({children}) => (
  <Box as={Text} background="light-3" round="small" pad={{horizontal: 'small', vertical: 'xxsmall'}}>
    {children}
  </Box>
);

export default Pill;
