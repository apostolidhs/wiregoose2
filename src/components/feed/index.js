import React, {useEffect} from 'react';
import {Box} from 'grommet';
import Image from './image';
import Title from './title';
import SubInfo from './subInfo';
import Description from './description';
import ActionBar from './actionBar';

const Feed = ({feed: {image, title, description, provider, published}, ...rest}) => {
  // useEffect(() => {
  //   return () => console.log('unmount');
  // }, []);
  const descriptionSize = image ? 128 - title.length : 256;

  return (
    <Box as="article" {...rest}>
      {image && <Image src={image} />}
      {title && <Title margin={{vertical: 'small'}}>{title}</Title>}
      <SubInfo provider={provider} published={published} />
      {description && (
        <Description margin={{vertical: 'small'}} size={descriptionSize}>
          {description}
        </Description>
      )}
      <ActionBar />
    </Box>
  );
};

export default Feed;
