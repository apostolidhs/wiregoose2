import React from 'react';
import {Box} from 'grommet';
import {useRegistrationAction} from 'providers/admin/registrations';
import Registration from 'components/admin/registration';

const Registrations = ({expanded, onExpand, registrations, ...rest}) => {
  const {save, remove} = useRegistrationAction();

  return (
    <Box direction="row" wrap {...rest}>
      {registrations.map(registration => {
        const {id} = registration;
        return (
          <Registration
            key={id}
            registration={registration}
            expanded={expanded === id}
            onExpand={onExpand}
            onSave={() => save(id)}
            onDelete={() => remove(id)}
          />
        );
      })}
    </Box>
  );
};

export default Registrations;
