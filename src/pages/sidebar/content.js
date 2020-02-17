import React, {lazy, Fragment} from 'react';
import {Box} from 'grommet';
import {useIsAdminSelector} from 'providers/session';
import Categories from './categories';

const Admin = lazy(() => import(/* webpackChunkName: 'sidebar.admin' */ './admin'));

const Content = props => {
  const isAdmin = useIsAdminSelector();
  return (
    <Box {...props}>
      {isAdmin && <Admin margin={{bottom: 'medium'}} pad={{bottom: 'medium'}} />}
      <Categories />
    </Box>
  );
};

export default Content;
