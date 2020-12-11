import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, -moz-user-input, h1, h2, h3, h4, h5, h6, strong, button {
    font-family: 'Roboto', sans-serif;
  }
`;
