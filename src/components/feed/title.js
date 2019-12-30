import React from 'react';
import {Heading} from 'grommet';

const Title = ({children, ...rest}) => (
  <Heading level="2" {...rest}>
    {children}
  </Heading>
);

export default Title;
