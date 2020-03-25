import React, {memo} from 'react';
import {Box} from 'grommet';
import {useRegistrationAction} from 'providers/admin/registrations';
import Registration from 'components/admin/registration';

const Registrations = ({ids, ...rest}) => {
  const {save, remove} = useRegistrationAction();

  return (
    <Box direction="row" wrap {...rest}>
      {ids.map(id => (
        <Registration key={id} id={id} onSave={() => save(id)} onDelete={() => remove(id)} />
      ))}
    </Box>
  );
};

export default memo(Registrations);
