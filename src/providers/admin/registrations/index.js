import React, {useRef} from 'react';
import makeFields from 'components/makeFields';
import {useApiSelector} from 'providers/api/selectors';
import Hoax from './hoax';

export const useRegistrationMember = Hoax.useMember;
export const useRegistrationsSelector = Hoax.useSelector;
export const useRegistrationAction = Hoax.useAction;
export const useRegistrationSelector = Hoax.useResourceSelector;
export const RegistrationField = makeFields(useRegistrationMember);

const RegistrationProvider = ({children}) => {
  const ref = useRef();
  const api = useApiSelector();
  ref.current = api;

  const extraArgument = {getApi: () => ref.current};
  return <Hoax.Provider extraArgument={extraArgument}>{children}</Hoax.Provider>;
};

export default RegistrationProvider;
