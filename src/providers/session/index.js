import React, {useEffect} from 'react';
import {getFacebookAdminUserId} from 'helpers/environment';
import {useFacebookSelector} from 'providers/facebook';
import Hoax from './hoax';

export const useSessionMember = Hoax.useMember;
export const useSessionSelector = Hoax.useSelector;
export const useSessionAction = Hoax.useAction;
export const SessionField = Hoax.Field;

const facebookMember = {fieldKey: 'facebook'};

export const useSession = () => {
  const [facebook, setFacebook] = useSessionMember(facebookMember);
  const isLoggedIn = facebook !== null;

  return {
    isLoggedIn,
    isFacebookLoggedIn: isLoggedIn,
    isAdmin: isLoggedIn && facebook.userID === getFacebookAdminUserId(),
    setFacebook,
    type: isLoggedIn ? 'facebook' : '',
    accessToken: isLoggedIn ? facebook.accessToken : ''
  };
};

const SessionProvider = ({children}) => {
  const {fb} = useFacebookSelector();
  useEffect(() => {
    if (!fb) return;
    fb.getLoginStatus(response => {
      console.log('getLoginStatus', response);
    });
  }, [fb]);

  return <Hoax.Provider>{children}</Hoax.Provider>;
};

export default SessionProvider;
