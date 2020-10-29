import React, {useEffect} from 'react';
import {makeMemberHoax} from 'react-hoax';
import {getFacebookId} from 'helpers/environment';

const getInitialState = () => ({fb: null});

export const hoax = makeMemberHoax('session', {getInitialState});

export const useFacebookMember = hoax.useMember;
export const useFacebookSelector = hoax.useSelector;
export const useFacebookAction = hoax.useAction;

const getFB = () =>
  new Promise((resolve, reject) => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: getFacebookId(),
        autoLogAppEvents: true,
        version: 'v7.0'
      });
      resolve(window.FB);
    };

    const fbEl = document.createElement('div');
    fbEl.id = 'fb-root';
    document.body.insertBefore(fbEl, document.body.firstChild);

    const scriptEl = document.createElement('script');
    scriptEl.setAttribute('defer', '');
    scriptEl.setAttribute('async', '');
    scriptEl.setAttribute('crossorigin', 'anonymous');
    scriptEl.src = 'https://connect.facebook.net/el_GR/sdk.js';
    scriptEl.onerror = reject;

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(scriptEl, firstScriptTag);
  });

const Container = ({children}) => {
  const {loaded} = useFacebookSelector();
  const {startFetch, doneFetch, failFetch} = useFacebookAction();

  useEffect(() => {
    if (loaded) return;

    startFetch();
    getFB()
      .then(fb => doneFetch({fb}))
      .catch(failFetch);
  }, []);

  return children;
};

const FacebookProvider = ({children}) => {
  return (
    <hoax.Provider>
      <Container>{children}</Container>
    </hoax.Provider>
  );
};

export default FacebookProvider;
