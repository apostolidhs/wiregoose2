import React from 'react';
import {Box, Button} from 'grommet';

const ActionBar = ({resourceId, ...rest}) => {
  return (
    <Box direction="row" gap="small" {...rest}>
      <Button onClick={() => {}} label="Save" primary />
      <Button onClick={() => {}} color="neutral-4" label="Delete" />
    </Box>
  );
};

export default ActionBar;
