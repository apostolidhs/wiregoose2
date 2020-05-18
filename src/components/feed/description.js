import React from 'react';
import {Box} from 'grommet';
import {Link} from '@reach/router';
import Truncate from 'components/truncate';

const Description = ({feedId, size = 128, children, ...rest}) => (
  <Box as="p" height={{min: 'initial'}} flex="grow" color="dark-2" {...rest}>
    <Link to={`/feed/${feedId}/article`}>
      <Truncate size={size}>{children}</Truncate>
    </Link>
  </Box>
);

export default Description;
