import { createGlobalStyle } from 'styled-components';

import colors from './colors';

export default createGlobalStyle`
  :root {
    --color-primary: #FF9000;
    --color-text-primary: #4B4B62;
    --color-white: #FFFFFF
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
    background: radial-gradient(circle, #3A4B62 10%, #4B4B62 100%);

    /* background: var(--teste); */
    color: #000000;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 1rem;
  }

  #root {
    max-width: 85%;
    margin: 0 auto;
  }

  button {
    cursor: pointer;
  }
`;
