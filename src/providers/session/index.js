import React, {useEffect, useMemo} from 'react';
import storage from 'helpers/storage';
import Hoax from './hoax';

export const useSessionMember = Hoax.useMember;
export const useSessionSelector = Hoax.useSelector;
export const useSessionAction = Hoax.useAction;
export const SessionField = Hoax.Field;

export const useIsAdmin = () => useSessionSelector(({token}) => !!token);

const tokenSelector = ({token}) => token;
export const useSessionToken = () => useSessionSelector(tokenSelector);

const SessionContainer = ({children}) => {
  const token = useSessionSelector(tokenSelector);

  useEffect(() => {
    storage.set('token', token);
  }, [token]);

  return children;
};

const storageOptions = {age: 1000 * 60 * 60 * 24 * 3};

const SessionProvider = ({children}) => {
  const initialState = useMemo(() => {
    const token = storage.get('token', storageOptions);
    return token && {token};
  }, []);

  return (
    <Hoax.Provider initialState={initialState}>
      <SessionContainer>{children}</SessionContainer>
    </Hoax.Provider>
  );
};

export default SessionProvider;
