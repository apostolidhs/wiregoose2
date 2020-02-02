import React from 'react';
import {Heading, Box} from 'grommet';

const TextedIcon = ({Icon, children, ...rest}) => (
  <Box height={{min: 'initial'}} elevation="xsmall" pad="medium" gap="xsmall" align="center" {...rest}>
    {Icon && <Icon size="large" color="dark-1" />}
    <Heading level="2" margin="none">
      {children}
    </Heading>
  </Box>
);

export default TextedIcon;
