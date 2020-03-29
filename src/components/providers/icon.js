import React, {useMemo} from 'react';
import useTheme from 'hooks/useTheme';
import ImageComponent from 'components/image';

const ProviderIcon = ({src, size = 'xxsmall', ...rest}) => {
  const theme = useTheme();
  const dimension = useMemo(() => Number.parseInt(theme.global.size[size] || size, 10), []);

  return <ImageComponent src={src} h={dimension} w={dimension} round height={size} width={size} {...rest} />;
};

export default ProviderIcon;
