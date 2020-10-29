import React, {forwardRef} from 'react';
import styled from 'styled-components';
import {Box, Heading, Header as GHeader, Button} from 'grommet';
import Link from 'components/link';
import {useScreenSize} from 'providers/theme/selectors';
import {useSession} from 'providers/session';

const Container = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: transform 300ms;
  z-index: 1;
`;

const Header = forwardRef((props, ref) => {
  const {isLarge} = useScreenSize();
  const {isLoggedIn} = useSession;
  return (
    <Container height={{min: 'initial'}} border="bottom" align="center" ref={ref} {...props}>
      <GHeader
        height={{min: 'initial'}}
        pad={{vertical: 'medium', horizontal: 'small'}}
        width={isLarge ? 'xlarge' : '100%'}
        background="white">
        <Link noActive to="/">
          <Heading margin="2px" level="2">
            Wiregoose
          </Heading>
        </Link>
        {!isLoggedIn && <Button label="Είσοδος" href="/" />}
      </GHeader>
    </Container>
  );
});

export default Header;
