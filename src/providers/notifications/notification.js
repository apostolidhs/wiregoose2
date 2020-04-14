import React from 'react';
import styled from 'styled-components';
import {useScreenSize} from 'providers/theme/selectors';
import {Box, Text} from 'grommet';

const Container = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const Notification = ({type, message}) => {
  const {isSmall} = useScreenSize();

  return (
    <Container animation="fadeIn">
      <Box
        background={type === 'info' ? 'neutral-3' : 'status-warning'}
        pad={{left: isSmall ? 'medium' : '290px', vertical: 'small', right: 'medium'}}>
        <Text color="white" size="large">
          {message}
        </Text>
      </Box>
    </Container>
  );
};

export default Notification;
