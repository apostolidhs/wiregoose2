import React from 'react';
import {Box, Paragraph} from 'grommet';
import Truncate from 'components/truncate';

const Description = ({children, ...rest}) => (
  <Box as={Paragraph} flex="grow" color="dark-2" {...rest}>
    <Truncate>{children}</Truncate>
  </Box>
);

export default Description;
