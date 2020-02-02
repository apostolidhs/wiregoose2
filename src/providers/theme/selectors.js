import {useContext, useMemo} from 'react';
import {ResponsiveContext} from 'grommet';

export const useScreenSize = () => {
  const size = useContext(ResponsiveContext);

  return useMemo(
    () => ({
      size,
      isSmall: size === 'small',
      isLarge: size !== 'small'
    }),
    [size]
  );
};
