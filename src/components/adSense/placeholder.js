import React from 'react';
import {Box, Heading} from 'grommet';
import {UserWorker} from 'grommet-icons';

const Placeholder = () => {
  return (
    <Box gap="small" direction="row">
      <UserWorker />
      <Heading margin="none" level="3" size="small">
        Χώρος διαφημίσεων, υπό κατασκευή
      </Heading>
    </Box>
  );
};

export default Placeholder;
