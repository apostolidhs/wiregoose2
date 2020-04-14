import React from 'react';
import {Box} from 'grommet';
import Image from './image';
import Title from './title';
import SubInfo from './subInfo';
import Description from './description';
import ActionBar from './actionBar';

const Feed = ({feed: {id, image, title, description, provider, published, category}, ...rest}) => {
  const visibleImage = !!image;
  const visibleDescription = description && (title.length < 50 || !image);
  const visibleTitle = !!title;
  const descriptionSize = visibleDescription && (image ? 100 - title.length : 256);
  const margin = {vertical: 'xsmall'};

  return (
    <Box as="article" {...rest}>
      {visibleImage && <Image feedId={id} src={image} />}
      {visibleImage && <SubInfo id={id} />}
      {visibleTitle && (
        <Title feedId={id} flex={image && !visibleDescription && 'grow'} margin={margin}>
          {title}
        </Title>
      )}
      {!visibleImage && <SubInfo id={id} flex={!image && !visibleDescription && 'grow'} />}
      {visibleDescription && (
        <Description feedId={id} margin={margin} size={descriptionSize}>
          {description}
        </Description>
      )}
      <ActionBar feedId={id} />
    </Box>
  );
};

export default Feed;
