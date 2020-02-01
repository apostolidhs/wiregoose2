import {useContext, useMemo} from 'react';
import Context from './context';

export const useRegistrationsSelector = () => useContext(Context);

export const useSelectProvider = name => {
  const registrations = useRegistrationsSelector();
  return useMemo(() => registrations.providers.find(p => p.name === name), [registrations, name]);
};

export const useSelectCategoriesByProvider = name => {
  const registrations = useRegistrationsSelector();
  return useMemo(
    () =>
      Object.entries(registrations.byCategory).reduce(
        (h, [category, providers]) => (providers.some(provider => provider.name === name) ? [...h, category] : h),
        []
      ),
    [registrations, name]
  );
};

export const useSelectRegistrationsLoaded = () => useRegistrationsSelector().loaded;
