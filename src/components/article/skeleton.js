import React from 'react';
import {Box} from 'grommet';
import SkeletonComponent from 'components/skeleton';

const Skeleton = props => (
  <Box gap="large" {...props}>
    <Box>
      <SkeletonComponent width="90%" />
      <SkeletonComponent width="80%" />
      <SkeletonComponent width="85%" />
    </Box>
    <Box>
      <SkeletonComponent width="90%" />
      <SkeletonComponent width="80%" />
      <SkeletonComponent width="85%" />
    </Box>
    <Box>
      <SkeletonComponent width="90%" />
      <SkeletonComponent width="80%" />
      <SkeletonComponent width="85%" />
    </Box>
  </Box>
);

export default Skeleton;
