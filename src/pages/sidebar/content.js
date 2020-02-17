import React, {lazy, Fragment} from 'react';
import {useIsAdminSelector} from 'providers/session';
import Categories from './categories';

const Admin = lazy(() => import(/* webpackChunkName: 'sidebar.admin' */ './admin'));

const Content = props => {
  const isAdmin = useIsAdminSelector();
  return (
    <Fragment>
      {isAdmin && <Admin {...props} />}
      <Categories {...props} />
    </Fragment>
  );
};

export default Content;
