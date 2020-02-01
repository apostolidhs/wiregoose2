import React from 'react';
import {Box} from 'grommet';
import {Image as GImage} from 'grommet';
import SkeletonComponent from 'components/skeleton';
import placeholderImg from 'assets/placeholder.jpg';

const Skeleton = props => (
  <Box {...props}>
    <Box height="170px">
      <GImage src={placeholderImg} height="170px" />
    </Box>
    <Box margin={{vertical: 'small'}}>
      <SkeletonComponent width="80%" />
      <SkeletonComponent width="30%" />
    </Box>
    <Box flex="grow" margin={{vertical: 'small'}}>
      <SkeletonComponent width="90%" />
      <SkeletonComponent width="90%" />
      <SkeletonComponent width="30%" />
    </Box>
    <Box alignSelf="end">
      <SkeletonComponent width="200px" />
    </Box>
  </Box>
);

export default Skeleton;
