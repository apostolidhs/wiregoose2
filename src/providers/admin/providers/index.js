import React, {useMemo} from 'react';
import makeFields from 'components/makeFields';
import useExtraArgument from '../useExtraArgument';
import Hoax from './hoax';

export const useProviderMember = Hoax.useMember;
export const useProvidersSelector = Hoax.useSelector;
export const useProviderAction = Hoax.useAction;
export const useProviderSelector = Hoax.useResourceSelector;
export const ProviderField = makeFields(useProviderMember);

export const useProviderListSelector = () => {
  const byId = useProvidersSelector(({byId}) => byId);
  return useMemo(
    () =>
      Object.values(byId)
        .filter(({id}) => id !== 'new')
        .sort((a, b) => a.name.localeCompare(b.name)),
    [byId]
  );
};

const ProviderProvider = ({children}) => {
  const extraArgument = useExtraArgument();
  return <Hoax.Provider extraArgument={extraArgument}>{children}</Hoax.Provider>;
};

export default ProviderProvider;
