import React, {forwardRef} from 'react';
import styled from 'styled-components';
import {Box, Heading, Button, Header as GHeader} from 'grommet';

const Container = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: transform 200ms;
`;

const Header = forwardRef((props, ref) => {
  return (
    <Container ref={ref} {...props}>
      <GHeader pad={{vertical: 'large', horizontal: 'medium'}} border="bottom" background="white">
        <Button plain href="/">
          <Heading margin="none">Wiregoose</Heading>
        </Button>
        <Button label="Είσοδος" href="/" />
      </GHeader>
    </Container>
  );
});

export default Header;
