import React from 'react';
import {Box} from 'grommet';
import Preview from 'components/admin/registration/preview';

const Registrations = ({registrations, ...rest}) => {
  return (
    <Box direction="row" {...rest}>
      {registrations.map(registration => (
        <Preview key={registration.id} registration={registration} />
      ))}
    </Box>
  );
};

export default Registrations;
