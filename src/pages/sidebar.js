import React, {Fragment} from 'react';
import {Box} from 'grommet';
import styled, {keyframes} from 'styled-components';
import {useRegistrationsSelector} from 'providers/registrations/selectors';
import RegistrationCategory from 'components/registrations/category';

const containerTransitions = {
  entering: keyframes` from { transform: scaleX(0); opacity: 0; }`,
  exiting: keyframes` to { transform: scaleX(0); opacity: 0; }`
};

const Container = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  right: 100px;
  bottom: 0;
  background-color: #fff;
  z-index: 2;
  transform-origin: left;
  animation: ${props => containerTransitions[props.transition]} 300ms forwards;
`;

const overlayTransitions = {
  entering: keyframes` from { opacity: 0; }`,
  exiting: keyframes` to { opacity: 0; }`
};

const Overlay = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.6;
  z-index: 1;
  animation: ${props => overlayTransitions[props.transition]} 300ms forwards;
`;

const onOverlayClick = () => (window.location.hash = '');

const Sidebar = ({transition}) => {
  const {byCategory} = useRegistrationsSelector();
  return (
    <Fragment>
      <Overlay transition={transition} background="dark-6" onClick={onOverlayClick} />
      <Container transition={transition} elevation="small" pad="large" overflow={{vertical: 'auto'}}>
        <Box direction="column" gap="medium" height={{min: 'auto'}}>
          {Object.keys(byCategory).map(category => (
            <RegistrationCategory key={category} category={category} providers={byCategory[category]} />
          ))}
        </Box>
      </Container>
    </Fragment>
  );
};

export default Sidebar;
