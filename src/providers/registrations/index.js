import React, {useState, useEffect} from 'react';
import {useConfigSelector} from 'providers/config/selectors';
import {useApiSelector} from 'providers/api/selectors';
import Context from './context';

const getInitialState = () => ({providers: [], byCategory: {}});

const Registrations = ({children}) => {
  const [state, setState] = useState(getInitialState);
  const api = useApiSelector();
  const config = useConfigSelector();

  useEffect(() => {
    const promise = api.registrationsPerCategory();

    promise
      .then(({data: {registrations, providers}}) => {
        const byCategory = registrations.reduce((h, providerIndexes, categoryIndex) => {
          return {
            ...h,
            [config.categories[categoryIndex]]: providerIndexes.map(providerIndex => providers[providerIndex])
          };
        }, {});
        setState({byCategory, providers});
      })
      .catch(error => {
        console.error(error);
      });

    return promise.abort;
  }, []);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default Registrations;