import {useMemo} from 'react';
import Hoax from './hoax';

export const useRegistrationMember = Hoax.useMember;
export const useRegistrationsSelector = Hoax.useSelector;
export const useRegistrationAction = Hoax.useAction;
export const useRegistrationSelector = Hoax.useResourceSelector;
export const RegistrationField = Hoax.Field;

const RegistrationProvider = Hoax.Provider;

export default RegistrationProvider;
