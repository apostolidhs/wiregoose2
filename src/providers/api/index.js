import React, {useState, useEffect} from 'react';
import {useConfigSelector} from 'providers/config/selectors';
import {useSession} from 'providers/session';
import Context from './context';
import getDispatch from './getDispatch';

const ApiProvider = ({children}) => {
  const config = useConfigSelector();
  const {isAdmin, accessToken} = useSession();
  const [dispatch, setDispatch] = useState(() => getDispatch({config}));

  useEffect(() => {
    if (!isAdmin || dispatch.admin) return;
    import('./getAdminDispatch')
      .then(adminDispach => adminDispach.default({getToken: () => accessToken, config}))
      .then(admin => setDispatch(d => ({...d, admin})));
  }, [isAdmin, accessToken]);

  return <Context.Provider value={dispatch}>{children}</Context.Provider>;
};

export default ApiProvider;
