import React, {useCallback} from 'react';
import {Box, Button} from 'grommet';

const ActionBar = ({resourceId, processing, onSave, onDelete, ...rest}) => {
  const isNew = resourceId === 'new';
  return (
    <Box direction="row" gap="small" {...rest}>
      <Button onClick={onSave} disabled={processing} label={isNew ? 'Create' : 'Save'} primary />
      <Button onClick={onDelete} disabled={processing} color="neutral-4" label={isNew ? 'Cancel' : 'Delete'} />
    </Box>
  );
};

export default ActionBar;
