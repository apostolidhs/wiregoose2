import React, {useMemo} from 'react';
import styled from 'styled-components';
import {Box} from 'grommet';
import {Link} from '@reach/router';
import {makeProxyUri} from 'helpers/image';
import Image from 'components/image';

const StyledLink = styled(Link)`
  height: 100%;
`;

const FeedImage = ({feedId, src, ...rest}) => {
  const proxySrc = useMemo(() => makeProxyUri(src, {height: 170}), []);
  return (
    <Box height={{min: '170px', max: '170px'}} {...rest}>
      <StyledLink to={`feed/${feedId}/article`}>
        <Image src={proxySrc} fit="cover" height="100%" width="100%" />
      </StyledLink>
    </Box>
  );
};

export default FeedImage;
