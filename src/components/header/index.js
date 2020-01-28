import React, {forwardRef} from 'react';
import styled from 'styled-components';
import {Box, Heading, Button, Header as GHeader} from 'grommet';
import Link from 'components/link';

const Container = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: transform 300ms;
  z-index: 1;
`;

const Header = forwardRef((props, ref) => {
  return (
    <Container ref={ref} {...props}>
      <GHeader pad={{vertical: 'large', horizontal: 'medium'}} border="bottom" background="white">
        <Link noActive to="/">
          <Heading margin="none">Wiregoose</Heading>
        </Link>
        <Button label="Είσοδος" href="/" />
      </GHeader>
    </Container>
  );
});

export default Header;
