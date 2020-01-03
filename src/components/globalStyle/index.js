import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body, html, #root {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  a {
    text-decoration: none;
  }
  a:-webkit-any-link {
    color: initial;
  }
`;

export default GlobalStyle;
