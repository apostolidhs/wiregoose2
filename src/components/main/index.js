import {Main as GMail} from 'grommet';
import styled from 'styled-components';

const Main = styled(GMail).attrs(({pad = 'none', overflow = 'initial'}) => ({
  pad,
  overflow,
  height: {min: 'initial'}
}))`
  position: relative;
`;

export default Main;
