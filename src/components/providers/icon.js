import React, {useCallback} from 'react';
import {Box, Image as GImage} from 'grommet';
import placeholderImg from 'assets/placeholder.jpg';

const ProviderIcon = ({src, size = 'xxsmall', ...rest}) => {
  const Image = useCallback(props => <GImage src={placeholderImg || src} {...props} />, []);
  return <Box as={Image} round height={size} width={size} {...rest} />;
};

export default ProviderIcon;
