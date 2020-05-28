import React, {useMemo, useState, createContext, useContext} from 'react';
import once from 'lodash/once';

const Context = createContext();
const DispatchContext = createContext();

const initialize = once(() => {
  return new Promise((resolve, reject) => {
    const scriptEl = document.createElement('script');
    scriptEl.setAttribute('async', '');
    scriptEl.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    scriptEl.onerror = reject;
    scriptEl.onload = resolve;

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(scriptEl, firstScriptTag);
  });
});

const AdSenseProvider = ({children}) => {
  const [initialized, setInitialized] = useState();
  const [hasError, setHasError] = useState();

  const dispatch = useMemo(() => ({
    update: () => {
      if (!initialized) {
        initialize().catch(() => setHasError(true));
        setInitialized(true);
      }

      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }));

  return (
    <DispatchContext.Provider value={dispatch}>
      <Context.Provider value={hasError}>{children}</Context.Provider>
    </DispatchContext.Provider>
  );
};

export const useAdSenseDispatch = () => useContext(DispatchContext);
export const useAdSense = () => useContext(Context);

export default AdSenseProvider;
