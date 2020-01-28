import {Main as GMail} from 'grommet';
import styled from 'styled-components';

const Main = styled(GMail).attrs(({pad = 'medium'}) => ({
  pad
}))`
  position: relative;
`;

export default Main;
