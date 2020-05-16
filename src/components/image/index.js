import React, {useMemo, memo} from 'react';
import {Image as GImage} from 'grommet';
import {isMockedImage, getImageProxyUri} from 'helpers/environment';
import placeholderImg from 'assets/placeholder.jpg';

const Image = ({src, w: width, h: height, ...rest}) => {
  const proxyUri = useMemo(() => {
    const params = [width && `w=${width}`, height && `h=${height}`].filter(Boolean).join('&');
    return isMockedImage() || !src
      ? placeholderImg
      : `${getImageProxyUri()}/${encodeURIComponent(src)}${params ? `?${params}` : ''}`;
  }, [src]);

  return <GImage src={proxyUri || placeholderImg} fallback={placeholderImg} {...rest} />;
};

export default memo(Image);
