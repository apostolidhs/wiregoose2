import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {Box, Text} from 'grommet';

const SubInfo = ({provider, published}) => (
  <Box direction="row">
    <Text color="dark-2">{provider}</Text>
    <Text color="dark-2" margin={{left: 'xsmall'}}>
      {formatDistanceToNow(new Date(published))}
    </Text>
  </Box>
);

export default SubInfo;

// {/* <Text color="dark-2" margin={{horizontal: 'xsmall'}}>
//   •
// </Text> */}
