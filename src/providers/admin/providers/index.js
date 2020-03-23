import React, {useMemo, useRef} from 'react';
import makeFields from 'components/makeFields';
import {useApiSelector} from 'providers/api/selectors';
import {useNotification} from 'providers/notifications';
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
  const ref = useRef();
  const api = useApiSelector();
  ref.current = api;
  const notification = useNotification();

  const extraArgument = {getApi: () => ref.current, notification};
  return <Hoax.Provider extraArgument={extraArgument}>{children}</Hoax.Provider>;
};

export default ProviderProvider;
