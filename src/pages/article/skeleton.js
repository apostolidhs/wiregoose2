import React from 'react';
import {Box} from 'grommet';
import SkeletonComponent from 'components/skeleton';

export const HeadingSkeleton = props => (
  <Box {...props}>
    <SkeletonComponent width="90%" />
    <SkeletonComponent width="80%" />
    <SkeletonComponent width="85%" />
    <SkeletonComponent width="65%" />
  </Box>
);
