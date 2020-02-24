import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {Text, Box} from 'grommet';

const Since = ({Icon, color, date, ...rest}) => (
  <Box direction="row" gap="xxsmall" {...rest}>
    <Icon color={color} />
    <Text>{formatDistanceToNow(new Date(date))}</Text>
  </Box>
);

export default Since;
