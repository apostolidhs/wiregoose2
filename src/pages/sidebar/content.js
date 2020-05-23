import React, {lazy} from 'react';
import {Box} from 'grommet';
import {useIsAdmin} from 'providers/session';
import Categories from './categories';
import Sources from './sources';

const Admin = lazy(() => import(/* webpackChunkName: 'sidebar.admin' */ './admin'));

const Content = props => {
  const isAdmin = useIsAdmin();
  return (
    <Box {...props}>
      {isAdmin && <Admin margin={{bottom: 'medium'}} pad={{bottom: 'medium'}} />}
      <Sources />
      <Categories margin={{top: 'small'}} pad={{top: 'small'}} border={{side: 'top', color: 'light-3'}} />
    </Box>
  );
};

export default Content;
