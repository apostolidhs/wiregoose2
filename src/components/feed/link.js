import React from 'react';
import {Box, Button} from 'grommet';
import {FormNext} from 'grommet-icons';
import Truncate from 'components/truncate';
import LinkComponent from 'components/link';
import Image from './image';
import TextTitle from './textTitle';

const Link = ({feed: {id, image, title}, ...rest}) => (
  <Box as="article" pad="medium" gap="small" direction="row" elevation="xsmall" height={{min: 'initial'}} {...rest}>
    {image && <Image height={50} width={50} feedId={id} src={image} />}
    {title && (
      <TextTitle alignSelf="center" feedId={id}>
        <Truncate size={45}>{title}</Truncate>
      </TextTitle>
    )}
    <LinkComponent icon={<FormNext size="32px" />} to={`feed/${id}/article`} gap="none" plain reverse />
  </Box>
);

export default Link;
