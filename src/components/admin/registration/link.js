import React from 'react';
import {Box, Button} from 'grommet';
import {RegistrationField} from 'providers/admin/registrations';

const Link = ({resourceId, onCrawl, ...rest}) => {
  return (
    <Box gap="small" justify="between" direction="row" {...rest}>
      <RegistrationField.Input fieldKey="link" resourceId={resourceId} placeholder="Link" />
      <Button onClick={onCrawl} label="Crawl" />
    </Box>
  );
};

export default Link;
