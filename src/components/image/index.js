import React, {useMemo, memo} from 'react';
import styled from 'styled-components';
import {Image as GImage} from 'grommet';
import {isMockedImage, getImageProxyUri} from 'helpers/environment';
import placeholderImg from 'assets/placeholder.jpg';

const StyledImage = styled(GImage)`
  background-color: ${({theme}) => theme.global.colors['light-2']};
`;

const Image = ({src, w: width, h: height, ...rest}) => {
  const proxyUri = useMemo(() => {
    const params = [width && `w=${width}`, height && `h=${height}`].join('&');
    return isMockedImage() || !src
      ? placeholderImg
      : `${getImageProxyUri()}/${encodeURIComponent(src)}${params ? `?${params}` : ''}`;
  }, [src]);

  return <StyledImage src={proxyUri || placeholderImg} fallback={placeholderImg} {...rest} />;
};

export default memo(Image);
