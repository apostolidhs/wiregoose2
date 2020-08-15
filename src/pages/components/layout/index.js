import React from 'react';
import {Box} from 'grommet';

const Layout = ({children}) => (
  <Box fill direction="column">
    {children}
  </Box>
);

export default Layout;
