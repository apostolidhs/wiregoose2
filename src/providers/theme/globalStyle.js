import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body, html, #root {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  :focus {
    outline: 0;
  }
  a {
    text-decoration: none;
    text-decoration-color: initial;
    color: initial;
  }
  a:-webkit-any-link {
    color: initial;
  }
  button:focus {
    outline:0 !important;
  }
`;

export default GlobalStyle;
