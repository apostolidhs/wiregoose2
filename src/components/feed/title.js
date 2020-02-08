import React from 'react';
import {Box, Heading} from 'grommet';
import {Link} from '@reach/router';

const Title = ({feedId, children, ...rest}) => (
  <Box height={{min: 'initial'}} {...rest}>
    <Heading margin="none" level="3">
      <Link to={`/feed/${feedId}/article`}>{children}</Link>
    </Heading>
  </Box>
);

export default Title;
