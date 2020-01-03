import React from 'react';
import styled from 'styled-components';
import {Image as GImage} from 'grommet';
import placeholderImg from 'assets/placeholder.jpg';

const StyledImage = styled(GImage)`
  background-color: ${({theme}) => theme.global.colors['light-2']};
`;

const Image = ({src, ...rest}) => {
  return <StyledImage src={src} fallback={placeholderImg} {...rest} />;
};

export default Image;
