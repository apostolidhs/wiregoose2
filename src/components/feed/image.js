import React, {useCallback} from 'react';
import {Box} from 'grommet';
import {makeProxyUri} from 'helpers/image';
import Image from 'components/image';

const FeedImage = ({src}) => {
  const ImageContainer = useCallback(props => <Image src={makeProxyUri(src, {height: 170})} {...props} />, []);
  return <Box as={ImageContainer} fit="cover" height={{min: '170px', max: '170px'}} />;
};

export default FeedImage;
