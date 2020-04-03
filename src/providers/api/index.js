import React, {useState, useEffect} from 'react';
import {useConfigSelector} from 'providers/config/selectors';
import {useIsAdmin, useSessionSelector} from 'providers/session';
import Context from './context';
import getDispatch from './getDispatch';

const tokenSelector = ({token}) => token;

const ApiProvider = ({children}) => {
  const config = useConfigSelector();
  const isAdmin = useIsAdmin();
  const token = useSessionSelector(tokenSelector);
  const [dispatch, setDispatch] = useState(() => getDispatch({config}));

  useEffect(() => {
    if (!isAdmin || dispatch.admin) return;
    import('./getAdminDispatch')
      .then((adminDispach) => adminDispach.default({getToken: () => token, config}))
      .then((admin) => setDispatch((d) => ({...d, admin})));
  }, [isAdmin, token]);

  return <Context.Provider value={dispatch}>{children}</Context.Provider>;
};

export default ApiProvider;
