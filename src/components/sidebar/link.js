import React, {useMemo} from 'react';
import {Box, Text} from 'grommet';
import styled from 'styled-components';
import {Link as RouterLink} from '@reach/router';

const StyledBox = styled(RouterLink)`
  &[aria-current='page'] {
    color: #1a73e8;
    svg {
      fill: #1a73e8;
      stroke: #1a73e8;
    }
  }
`;

const getLink = (to, title) => {
  const SidebarLink = ({children, className}) => (
    <StyledBox to={to} title={title} className={className}>
      {children}
    </StyledBox>
  );
  return SidebarLink;
};

const Link = ({to, title, Icon, children, ...rest}) => {
  const link = useMemo(() => getLink(to, title), [to]);
  return (
    <Box align="end" as={link} gap="small" direction="row" {...rest}>
      <Box justify="center">
        <Icon />
      </Box>
      <Text size="large">{children}</Text>
    </Box>
  );
};

export default Link;
