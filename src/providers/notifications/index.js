import React, {Fragment, useState, useMemo, useContext} from 'react';
import getDispatch from './getDispatch';
import Context from './context';
import Notification from './notification';

const Notifications = ({children}) => {
  const [state, setState] = useState();
  const dispatch = useMemo(() => getDispatch(setState), []);

  return (
    <Fragment>
      {state && <Notification {...state} />}
      <Context.Provider value={dispatch}>{children}</Context.Provider>
    </Fragment>
  );
};

export const useNotification = () => useContext(Context);

export default Notifications;
