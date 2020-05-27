import React, {useContext} from 'react';
import once from 'lodash/once';
import Context from './context';

const appId = '821271344594009';

const getFB = once(() => {
  return new Promise(resolve => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId,
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

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(scriptEl, firstScriptTag);
  });
});

const dispatch = {getFB};

const FeedProvider = ({children}) => <Context.Provider value={dispatch}>{children}</Context.Provider>;

export const useFacebook = () => useContext(Context);

export default FeedProvider;
