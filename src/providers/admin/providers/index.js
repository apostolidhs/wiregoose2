import {useMemo} from 'react';
import Hoax from './hoax';

export const useProviderMember = Hoax.useMember;
export const useProvidersSelector = Hoax.useSelector;
export const useProviderAction = Hoax.useAction;
export const useProviderSelector = Hoax.useResourceSelector;
export const ProviderField = Hoax.Field;

export const useProviderListSelector = () => {
  const {byId, ids} = useProvidersSelector(({byId, ids}) => ({byId, ids}));
  return useMemo(() => ids.map(id => byId[id]), [byId]);
};

const ProviderProvider = Hoax.Provider;

export default ProviderProvider;
