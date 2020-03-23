import React, {useCallback} from 'react';
import {Box, Heading, Button} from 'grommet';
import {AddCircle, Trash} from 'grommet-icons';
import {useRegistrationSelector, useRegistrationsSelector, useRegistrationAction} from 'providers/admin/registrations';
import {useProviderAction} from 'providers/admin/providers';
import {useProviderSelector} from 'providers/admin/providers';

const Header = ({id, onExpand, ...rest}) => {
  const initializeResource = useRegistrationAction('initializeResource');
  const {remove} = useProviderAction();
  const disabled = useRegistrationSelector('new', resource => !!resource);

  const [name, processing] = useProviderSelector(id, state => state && [state.name, state.processing]);
  const removeDisabled = useRegistrationsSelector(({byId, ids}) => ids.some(i => byId[i].provider === id));

  const onCreate = useCallback(() => {
    initializeResource('new', {lang: 'gr', provider: id});
    onExpand('new');
  }, []);
  const onDelete = useCallback(() => remove(id), [id]);

  return (
    <Box animation={processing ? 'fadeIn' : null} direction="row" justify="between" {...rest}>
      <Heading level="3" margin="none" {...rest}>
        {name}
      </Heading>

      <Box gap="small" direction="row">
        <Button
          icon={<Trash size="32px" color="brand" />}
          plain
          gap="xsmall"
          onClick={onDelete}
          disabled={disabled || removeDisabled}
        />
        <Button
          icon={<AddCircle size="32px" color="brand" />}
          plain
          gap="xsmall"
          onClick={onCreate}
          disabled={disabled}
        />
      </Box>
    </Box>
  );
};

export default Header;
