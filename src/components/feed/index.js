import React, {useEffect} from 'react';
import {Box} from 'grommet';
import Image from './image';
import Title from './title';
import SubInfo from './subInfo';
import Description from './description';
import ActionBar from './actionBar';

const Feed = ({feed: {id, image, title, description, provider, published, category}, ...rest}) => {
  // useEffect(() => {
  //   return () => console.log('unmount');
  // }, []);
  const descriptionSize = image ? 128 - title.length : 256;

  return (
    <Box as="article" {...rest}>
      {image && <Image feedId={id} src={image} />}
      <SubInfo provider={provider} published={published} category={category} margin={{vertical: 'small'}} />
      {title && (
        <Title feedId={id} margin={{vertical: 'small'}}>
          {title}
        </Title>
      )}
      {description && (
        <Description feedId={id} margin={{vertical: 'small'}} size={descriptionSize}>
          {description}
        </Description>
      )}
      <ActionBar />
    </Box>
  );
};

export default Feed;
