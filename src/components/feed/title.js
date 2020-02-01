import React from 'react';
import {Heading} from 'grommet';
import {Link} from '@reach/router';

const Title = ({feedId, children, ...rest}) => (
  <Heading level="3" {...rest}>
    <Link to={`/feed/${feedId}/article`}>{children}</Link>
  </Heading>
);

export default Title;
