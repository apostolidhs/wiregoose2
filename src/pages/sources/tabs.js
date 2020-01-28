import {Tabs} from 'grommet';
import styled from 'styled-components';

const StyledTabs = styled(Tabs)`
  > :first-child::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  > :first-child {
    box-shadow: ${({theme}) => theme.global.elevation[theme.dark ? 'dark' : 'light'].xsmall};
    flex-wrap: nowrap;
    flex-shrink: 0;
    white-space: nowrap;
    overflow-y: hidden;
    width: auto;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  }
`;

export default StyledTabs;
