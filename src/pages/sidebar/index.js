import React, {Fragment, useEffect, useRef, forwardRef} from 'react';
import {Box} from 'grommet';
import styled, {keyframes} from 'styled-components';
import Categories from './categories';

const Sidebar = forwardRef((props, ref) => {
  return (
    <Box direction="column" height="100%" ref={ref} {...props}>
      <Categories />
    </Box>
  );
});

export default Sidebar;
