import React, {useRef, useMemo} from 'react';
import makeFields from 'components/makeFields';
import useExtraArgument from '../useExtraArgument';
import Hoax from './hoax';

export const useRegistrationMember = Hoax.useMember;
export const useRegistrationsSelector = Hoax.useSelector;
export const useRegistrationAction = Hoax.useAction;
export const useRegistrationSelector = Hoax.useResourceSelector;
export const RegistrationField = makeFields(useRegistrationMember);

const RegistrationProvider = ({children}) => {
  const extraArgument = useExtraArgument();
  return <Hoax.Provider extraArgument={extraArgument}>{children}</Hoax.Provider>;
};

const getSum = (target, array) =>
  array.reduce((h, num, index) => {
    h[index] = num + (target[index] || 0);
    return h;
  }, target);

export const useRegistrationsChart = (ids) => {
  const byId = useRegistrationsSelector(({byId}) => byId);
  return useMemo(() =>
    ids.reduce(
      (h, i) => ({
        total: getSum(h.total, byId[i].total),
        accepted: getSum(h.accepted, byId[i].accepted),
        stored: getSum(h.stored, byId[i].stored),
      }),
      {total: [], accepted: [], stored: []}
    )
  );
};

export default RegistrationProvider;
