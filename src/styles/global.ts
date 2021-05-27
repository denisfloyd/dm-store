import { createGlobalStyle } from 'styled-components';

import colors from './colors';

export default createGlobalStyle`
  :root {
    --teste: '#000000'
  }

  html {
    font-size: 62.5%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #000;
    color: #000000;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 1rem;
  }

  button {
    cursor: pointer;
  }
`;
