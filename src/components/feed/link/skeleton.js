import React from 'react';
import SkeletonComponent from 'components/skeleton';
import {LinkContainer} from './index';

const Skeleton = props => (
  <LinkContainer flex="grow" {...props}>
    <SkeletonComponent />
  </LinkContainer>
);

export default Skeleton;
