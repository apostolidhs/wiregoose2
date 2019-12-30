import React, {useCallback} from 'react';
import {Box, Image as GImage} from 'grommet';
import placeholderImg from 'assets/placeholder.jpg';

const ProviderIcon = ({src, ...rest}) => {
  const Image = useCallback(props => <GImage src={placeholderImg || src} {...props} />, []);
  return <Box as={Image} round height="xxsmall" width="xxsmall" {...rest} />;
};

export default ProviderIcon;
