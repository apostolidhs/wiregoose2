import React, {Fragment} from 'react';
import {Box} from 'grommet';
import styled, {keyframes} from 'styled-components';
import Content from './content';

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
  animation: ${props => containerTransitions[props.transition]} 200ms forwards;
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
  animation: ${props => overlayTransitions[props.transition]} 200ms forwards;
`;

const Sidebar = ({transition, onOverlayClick}) => {
  return (
    <Fragment>
      <Overlay transition={transition} background="dark-6" onClick={onOverlayClick} />
      <Container transition={transition} elevation="small" pad="medium" overflow={{vertical: 'auto'}}>
        <Content />
      </Container>
    </Fragment>
  );
};

export default Sidebar;
