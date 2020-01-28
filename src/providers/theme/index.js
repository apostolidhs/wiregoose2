import React from 'react';
import {Grommet} from 'grommet';
import theme from './theme';
import GlobalStyle from './globalStyle';

const Theme = ({children}) => (
  <Grommet theme={theme} style={{height: '100%'}}>
    <GlobalStyle />
    {children}
  </Grommet>
);

export default Theme;
