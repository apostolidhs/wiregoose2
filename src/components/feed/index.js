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
  return (
    <Box as="article" {...rest}>
      <Image src={image} />
      <Title margin={{vertical: 'small'}}>{title}</Title>
      <SubInfo provider={provider} published={published} />
      <Description margin={{vertical: 'small'}}>{description}</Description>
      <ActionBar />
    </Box>
  );
};

export default Feed;
