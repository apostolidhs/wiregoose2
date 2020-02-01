import React from 'react';
import {Text} from 'grommet';
import {Link} from '@reach/router';

const TextTitle = ({feedId, children, ...rest}) => (
  <Text margin="none" {...rest}>
    <Link to={`/feed/${feedId}/article`}>{children}</Link>
  </Text>
);

export default TextTitle;
