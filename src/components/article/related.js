import React from 'react';
import {Box} from 'grommet';
import RelatedFeed from 'components/feed/related';

const Related = ({feeds, ...rest}) => (
  <Box gap="large" height={{min: 'initial'}} {...rest}>
    {feeds.map(feed => (
      <RelatedFeed key={feed.id} feed={feed} />
    ))}
  </Box>
);

export default Related;
