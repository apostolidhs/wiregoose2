import React from 'react';
import {Box} from 'grommet';
import Image from './image';
import TextTitle from './textTitle';
import SubInfo from './subInfo';

const Related = ({feed: {id, title, image}, ...rest}) => (
  <Box as="article" pad="medium" gap="medium" elevation="xsmall" flex="grow" {...rest}>
    <Box gap="small" direction="row">
      {image && <Image feedId={id} src={image} height={100} width={120} />}
      {title && <TextTitle feedId={id}>{title}</TextTitle>}
    </Box>
    <SubInfo id={id} />
  </Box>
);

export default Related;
