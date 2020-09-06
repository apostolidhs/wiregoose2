import React, {forwardRef} from 'react';
import {useTransition, animated} from 'react-spring';
import {Box} from 'grommet';
import usePrevious from 'hooks/usePrevious';
import {useScreenSize} from 'providers/theme/selectors';

const AnimatedBox = animated(Box);

export const AnimatedRoute = forwardRef(({tabIndex, animatedStyle, style, children, ...rest}, ref) => {
  const {isSmall} = useScreenSize();
  return (
    <AnimatedBox
      ref={ref}
      style={{
        ...style,
        ...animatedStyle,
        ...(isSmall && {width: '100%'})
      }}
      {...rest}>
      {children}
    </AnimatedBox>
  );
});

const animation = {
  initial: {transform: 'translate3d(0, 0, 0)', opacity: 1},
  from: {transform: 'translate3d(100%, 0, 0)', opacity: 0},
  enter: {transform: 'translate3d(0, 0, 0)', opacity: 1},
  leave: {transform: 'translate3d(-100%, 0, 0)', opacity: 0}
};

const reverseAnimation = {
  ...animation,
  from: animation.leave,
  leave: animation.from
};

const AnimatedRouter = ({location, children}) => {
  const prevPathname = usePrevious(location.pathname);
  const reverse = prevPathname && prevPathname.startsWith(location.pathname);

  const transitions = useTransition(location, item => item.pathname, {
    config: {duration: 200},
    immediate:
      location.pathname === '/' || location.pathname.startsWith('/source') || location.pathname.startsWith('/category'),
    ...(reverse ? reverseAnimation : animation)
  });

  return transitions.map(({item, props: animatedStyle, key, state}) => {
    return item.pathname === location.pathname && children({currentLocation: item, animatedStyle, key, state});
  });
};

export default AnimatedRouter;
