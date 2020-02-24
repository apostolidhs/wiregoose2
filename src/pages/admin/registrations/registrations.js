import React from 'react';
import {Box} from 'grommet';
import Registration from 'components/admin/registration';

const Registrations = ({expanded, onExpand, registrations, ...rest}) => {
  return (
    <Box direction="row" wrap {...rest}>
      {registrations.map(registration => (
        <Registration
          key={registration.id}
          registration={registration}
          expanded={expanded === registration.id}
          onExpand={onExpand}
        />
      ))}
    </Box>
  );
};

export default Registrations;
