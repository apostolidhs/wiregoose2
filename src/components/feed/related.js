import React from 'react';
import {Box} from 'grommet';
import Image from './image';
import TextTitle from './textTitle';
import SubInfo from './subInfo';

const Related = ({feed: {id, title, image, provider, published, category}, ...rest}) => (
  <Box as="article" pad="medium" gap="medium" elevation="xsmall" {...rest}>
    <Box gap="small" direction="row">
      {image && <Image feedId={id} src={image} height={80} />}
      {title && <TextTitle feedId={id}>{title}</TextTitle>}
    </Box>
    <SubInfo provider={provider} published={published} category={category} />
  </Box>
);

export default Related;
