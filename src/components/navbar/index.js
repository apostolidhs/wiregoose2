import React, {forwardRef} from 'react';
import {Box, Button} from 'grommet';
import {TextAlignLeft, Compass, Menu} from 'grommet-icons';
import styled from 'styled-components';
import Link from '../link';

const Container = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const onSidebarClick = () => {
  window.location.hash = 'sidebar';
};

const NavBar = forwardRef((props, ref) => {
  return (
    <Container ref={ref} {...props}>
      <Box as="nav" background="white" pad="medium" direction="row" justify="around" border="top">
        <Button onClick={onSidebarClick} icon={<TextAlignLeft size="medium" />} />
        <Link to="/" icon={<Compass size="medium" />} />
        <Button icon={<Menu size="medium" />} />
      </Box>
    </Container>
  );
});

export default NavBar;
