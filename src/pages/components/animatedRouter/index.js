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
        position: 'absolute',
        height: '100%',
        width: isSmall ? '100%' : `${window.innerWidth - 300}px`
      }}
      {...rest}>
      {children}
    </AnimatedBox>
  );
});

const animation = {
  initial: {left: '0', opacity: 1},
  from: {left: '100%', opacity: 0},
  enter: {left: '0', opacity: 1},
  leave: {left: '-100%', opacity: 0}
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
    config: {duration: 150},
    immediate: location.pathname.startsWith('/source'),
    ...(reverse ? reverseAnimation : animation)
  });

  return transitions.map(({item, props: animatedStyle, key}) => children({currentLocation: item, animatedStyle, key}));
};

export default AnimatedRouter;
