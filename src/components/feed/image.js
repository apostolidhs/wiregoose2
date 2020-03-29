import React from 'react';
import styled from 'styled-components';
import {Box} from 'grommet';
import {Link} from '@reach/router';
import Image from 'components/image';

const StyledLink = styled(Link)`
  height: 100%;
`;

const FeedImage = ({feedId, src, height = 170, width, ...rest}) => {
  const heightPx = `${height}px`;
  const widthPx = width && `${width}px`;
  return (
    <Box height={heightPx} width={widthPx} {...rest}>
      <StyledLink to={`/feed/${feedId}/article`}>
        <Image src={src} h={height} w={width} fit="cover" height="100%" width="100%" />
      </StyledLink>
    </Box>
  );
};

export default FeedImage;
