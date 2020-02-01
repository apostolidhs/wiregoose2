import React, {useCallback, useMemo} from 'react';
import {Box, Image as GImage} from 'grommet';
import {makeProxyUri} from 'helpers/image';
import useTheme from 'hooks/useTheme';
import placeholderImg from 'assets/placeholder.jpg';
import ImageComponent from 'components/image';

const ProviderIcon = ({src, size = 'xxsmall', ...rest}) => {
  const theme = useTheme();

  const proxySrc = useMemo(() => {
    if (!src) return;
    const sizeNumber = Number.parseInt(theme.global.size[size] || size, 10);
    return makeProxyUri(src, {height: sizeNumber, width: sizeNumber});
  }, [src, size]);

  const Image = useCallback(props => <ImageComponent src={proxySrc || placeholderImg} {...props} />, [proxySrc]);
  return <Box as={Image} round height={size} width={size} {...rest} />;
};

export default ProviderIcon;
