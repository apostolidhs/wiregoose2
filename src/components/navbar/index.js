import React, {forwardRef, useRef, useEffect} from 'react';
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

const NavBar = ({onReady, props}) => {
  const ref = useRef();

  useEffect(() => {
    onReady({height: ref.current.clientHeight});
  }, []);

  return (
    <Container ref={ref} {...props}>
      <Box as="nav" background="white" pad="small" direction="row" justify="around" border="top">
        <Button onClick={onSidebarClick} icon={<TextAlignLeft size="32px" />} />
        <Link to="/" icon={<Compass size="32px" />} />
        <Link to="/settings" icon={<Menu size="32px" />} />
      </Box>
    </Container>
  );
};

export default NavBar;
