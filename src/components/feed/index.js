import React from 'react';
import {Box} from 'grommet';
import Image from './image';
import Title from './title';
import SubInfo from './subInfo';
import Description from './description';
import ActionBar from './actionBar';

const Feed = ({feed: {id, image, title, description}, ...rest}) => {
  const visibleImage = !!image;
  const visibleDescription = description && (title.length < 50 || !image);
  const visibleTitle = !!title;
  const descriptionSize = visibleDescription && (image ? 100 - title.length : 256);
  const margin = {vertical: 'xsmall'};
  const flex = !!image && !visibleDescription && 'grow';

  return (
    <Box as="article" {...rest}>
      {visibleImage && <Image feedId={id} src={image} />}
      {visibleImage && <SubInfo margin={{top: 'xsmall'}} id={id} />}
      {visibleTitle && (
        <Title feedId={id} flex={flex} margin={margin}>
          {title}
        </Title>
      )}
      {!visibleImage && <SubInfo id={id} flex={flex} />}
      {visibleDescription && (
        <Description feedId={id} margin={image ? margin : {vertical: 'small'}} size={descriptionSize}>
          {description}
        </Description>
      )}
      <ActionBar feedId={id} />
    </Box>
  );
};

export default Feed;
