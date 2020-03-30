import React from 'react';
import Hoax from './hoax';

export const useSessionMember = Hoax.useMember;
export const useSessionSelector = Hoax.useSelector;
export const useSessionAction = Hoax.useAction;
export const SessionField = Hoax.Field;

export const useIsAdmin = () => useSessionSelector(({token}) => !!token);

const SessionContainer = ({children}) => {
  // load session from localstorage
  return children;
};

const SessionProvider = ({children}) => {
  return (
    <Hoax.Provider>
      <SessionContainer>{children}</SessionContainer>
    </Hoax.Provider>
  );
};

export default SessionProvider;
