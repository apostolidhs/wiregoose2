import {useMemo} from 'react';
import Hoax from './hoax';

export const useProviderMember = Hoax.useMember;
export const useProvidersSelector = Hoax.useSelector;
export const useProviderAction = Hoax.useAction;
export const useProviderSelector = Hoax.useResourceSelector;
export const ProviderField = Hoax.Field;

const ProviderProvider = Hoax.Provider;

export default ProviderProvider;
