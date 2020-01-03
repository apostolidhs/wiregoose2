import React from 'react';
import {Box, Paragraph} from 'grommet';
import Truncate from 'components/truncate';

const Description = ({children, size = 128, ...rest}) => (
  <Box as={Paragraph} flex="grow" color="dark-2" {...rest}>
    <Truncate size={size}>{children}</Truncate>
  </Box>
);

export default Description;
