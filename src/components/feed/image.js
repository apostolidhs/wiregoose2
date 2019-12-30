import React, {useCallback} from 'react';
import {Box, Image as GImage} from 'grommet';
import placeholderImg from 'assets/placeholder.jpg';

const Image = ({src}) => {
  const ImageContainer = useCallback(props => <GImage src={placeholderImg || src} {...props} />, []);
  return <Box as={ImageContainer} fit="cover" height={{min: '100px', max: '180px'}} />;
};

export default Image;
