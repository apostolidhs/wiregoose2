import React, {useState, useEffect} from 'react';
import {useNotification} from 'providers/notifications';
import {useConfigSelector} from 'providers/config/selectors';
import {useApiSelector} from 'providers/api/selectors';
import Context from './context';

const getInitialState = () => ({providers: [], byCategory: {}, loaded: false});

const comperator = (p1, p2) => p1.name.localeCompare(p2.name);

const Registrations = ({children}) => {
  const notification = useNotification();
  const [state, setState] = useState(getInitialState);
  const api = useApiSelector();
  const config = useConfigSelector();

  useEffect(() => {
    const promise = api.registrationsPerCategory();

    promise
      .then(({data: {registrations, providers}}) => {
        const byCategory = registrations.reduce(
          (h, providerIndexes, categoryIndex) => ({
            ...h,
            [config.categories[categoryIndex]]: providerIndexes
              .map(providerIndex => providers[providerIndex])
              .sort(comperator)
          }),
          {}
        );

        const sortedProviders = providers.sort(comperator);

        setState({byCategory, providers: sortedProviders, loaded: true});
      })
      .catch(error => notification.server(error));

    return promise.abort;
  }, []);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default Registrations;
