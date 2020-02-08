import React from 'react';
import {Heading, Box} from 'grommet';
import {useScreenSize} from 'providers/theme/selectors';

const TextedIcon = ({Icon, children, ...rest}) => {
  const {isSmall} = useScreenSize();
  return (
    <Box
      pad="medium"
      gap="small"
      justify="center"
      direction="row"
      elevation={isSmall ? 'xsmall' : 'none'}
      height={{min: 'initial'}}
      {...rest}>
      {Icon && <Icon size="42px" color="dark-1" />}
      <Heading alignSelf="center" level="2" margin="none">
        {children}
      </Heading>
    </Box>
  );
};

export default TextedIcon;
