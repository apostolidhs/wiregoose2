import React from 'react';
import {Heading, Box} from 'grommet';

const TextedIcon = ({Icon, children, ...rest}) => (
  <Box height={{min: 'initial'}} elevation="xsmall" pad="large" gap="small" align="center" {...rest}>
    <Icon size="large" color="dark-1" />
    <Heading level="2" margin="none">
      {children}
    </Heading>
  </Box>
);

export default TextedIcon;
