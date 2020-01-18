import {useContext, useMemo} from 'react';
import Context from './context';

export const useRegistrationsSelector = () => useContext(Context);

export const useSelectProvider = name => {
  const registrations = useRegistrationsSelector();
  return useMemo(() => registrations.providers.find(p => p.name === name), [registrations]);
};
