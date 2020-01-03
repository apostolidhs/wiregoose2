import {isMockedImage, getImageProxyUri} from 'helpers/environment';
import placeholderImg from 'assets/placeholder.jpg';

export const makeProxyUri = (src, {width, height} = {}) => {
  const params = [width && `w=${width}`, height && `h=${height}`].join('&');
  return isMockedImage()
    ? placeholderImg
    : `${getImageProxyUri()}/${encodeURIComponent(src)}${params ? `?${params}` : ''}`;
};
