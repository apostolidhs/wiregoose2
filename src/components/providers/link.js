import React from 'react';
import styled from 'styled-components';
import {Link as RouterLink} from '@reach/router';
import {useScreenSize} from 'providers/theme/selectors';
import {useSelectProvider} from 'providers/registrations/selectors';
import Icon from './icon';

const StyledLink = styled(RouterLink)`
  /* margin-top: ${({theme, margin}) => margin && theme.global.edgeSize[margin.top]}; */
  img {
    vertical-align: bottom;
  }
`;

const emptyObject = {};

const Link = ({category, name, ...rest}) => {
  const {isSmall} = useScreenSize();
  const {icon} = useSelectProvider(name) || emptyObject;

  return (
    <StyledLink to={`/source/${name}/${category}`} title={name} {...rest}>
      <Icon src={icon} size={isSmall ? '32px' : '22px'} />
    </StyledLink>
  );
};

export default Link;
