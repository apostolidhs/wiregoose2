import React from 'react';
import {Box} from 'grommet';
import RelatedFeed from 'components/feed/related';

const Related = ({feeds, ...rest}) => (
  <Box gap="medium" height={{min: 'initial'}} flex="grow" direction={'column'} {...rest}>
    {feeds.map(feed => (
      <RelatedFeed key={feed.id} feed={feed} width={'100%'} />
    ))}
  </Box>
);

export default Related;
