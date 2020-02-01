import React from 'react';
import {Box} from 'grommet';
import styled, {keyframes} from 'styled-components';

export const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const StyledBox = styled(Box)`
  animation: ${skeletonKeyframes} 2s ease-in-out infinite;
  background-image: ${({theme}) =>
    `linear-gradient(90deg, ${theme.global.colors['light-3']}, ${theme.global.colors['light-1']}, ${theme.global.colors['light-3']})`};
  background-size: 200px 100%;
  background-repeat: no-repeat;
`;

const Skeleton = props => (
  <StyledBox background="light-3" width="100%" height="25px" round="small" margin={{vertical: 'xsmall'}} {...props} />
);

export default Skeleton;
