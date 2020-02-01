import React, {useMemo} from 'react';
import styled from 'styled-components';
import {Box} from 'grommet';
import {Link} from '@reach/router';
import {makeProxyUri} from 'helpers/image';
import Image from 'components/image';

const StyledLink = styled(Link)`
  height: 100%;
`;

const FeedImage = ({feedId, src, height = 170, width, ...rest}) => {
  const proxySrc = useMemo(() => makeProxyUri(src, {height, width}), [src]);
  const heightPx = `${height}px`;
  const widthPx = width && `${width}px`;
  return (
    <Box height={{min: heightPx, max: heightPx}} width={widthPx} {...rest}>
      <StyledLink to={`/feed/${feedId}/article`}>
        <Image src={proxySrc} fit="cover" height="100%" width="100%" />
      </StyledLink>
    </Box>
  );
};

export default FeedImage;
