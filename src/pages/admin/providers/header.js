import React, {useCallback} from 'react';
import {Box, Heading, Button} from 'grommet';
import {AddCircle, Trash, Edit} from 'grommet-icons';
import {useRegistrationSelector, useRegistrationsSelector, useRegistrationAction} from 'providers/admin/registrations';
import {useProviderAction} from 'providers/admin/providers';
import {useProviderSelector, useProvidersSelector} from 'providers/admin/providers';

const Header = ({id, ...rest}) => {
  const {initializeResource, update: updateRegistration} = useRegistrationAction();
  const {remove, update} = useProviderAction();
  const disabled = useRegistrationSelector('new', resource => !!resource);

  const [name, processing] = useProviderSelector(id, state => state && [state.name, state.processing]);
  const removeDisabled = useRegistrationsSelector(({byId, ids}) => ids.some(i => byId[i].provider === id));
  const isEditing = useProvidersSelector(({editedId}) => !!editedId);

  const onCreate = useCallback(() => {
    initializeResource('new', {lang: 'gr', provider: id});
    updateRegistration('expanded', 'new');
  }, []);
  const onEdit = useCallback(() => update('editedId', id), [id]);
  const onDelete = useCallback(() => remove(id), [id]);

  return (
    <Box animation={processing ? 'fadeIn' : null} direction="row" justify="between" {...rest}>
      <Box direction="row">
        <Heading level="3" margin="none" {...rest}>
          {name}
        </Heading>
        <Button
          icon={<Edit size="32px" color="brand" />}
          plain
          gap="xsmall"
          margin={{left: 'medium'}}
          onClick={onEdit}
          disabled={disabled || isEditing}
        />
        <Button
          icon={<Trash size="32px" color="brand" />}
          plain
          gap="xsmall"
          margin={{left: 'small'}}
          onClick={onDelete}
          disabled={disabled || removeDisabled}
        />
      </Box>

      <Button
        icon={<AddCircle size="32px" color="brand" />}
        plain
        gap="xsmall"
        onClick={onCreate}
        disabled={disabled}
      />
    </Box>
  );
};

export default Header;
