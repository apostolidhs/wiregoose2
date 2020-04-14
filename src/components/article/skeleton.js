import React from 'react';
import {Box} from 'grommet';
import {useScreenSize} from 'providers/theme/selectors';
import SkeletonComponent from 'components/skeleton';

const Paragraph = ({isSmall}) => (
  <Box width={isSmall ? '100%' : 'large'}>
    <SkeletonComponent width="90%" />
    <SkeletonComponent width="80%" />
    <SkeletonComponent width="85%" />
  </Box>
);

const Skeleton = props => {
  const {isSmall} = useScreenSize();
  return (
    <Box gap="large" align="center" {...props}>
      <Paragraph isSmall={isSmall} />
      <Paragraph isSmall={isSmall} />
      <Paragraph isSmall={isSmall} />
    </Box>
  );
};

export default Skeleton;
