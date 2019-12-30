import React, {useMemo} from 'react';
import {useConfigSelector} from 'providers/config/selectors';
import Context from './context';
import getDispatch from './getDispatch';

const ApiProvider = ({children}) => {
  const config = useConfigSelector();
  const dispatch = useMemo(() => getDispatch(config), []);
  return <Context.Provider value={dispatch}>{children}</Context.Provider>;
};

export default ApiProvider;
