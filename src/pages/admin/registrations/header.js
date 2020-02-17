import React from 'react';
import {Heading} from 'grommet';

const Header = ({name, ...rest}) => {
  return (
    <Heading level="3" {...rest}>
      {name}
    </Heading>
  );
};

export default Header;
