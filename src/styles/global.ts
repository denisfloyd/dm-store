import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  :root {
    --color-primary: #FF9000;
    --color-primary-light: rgba(255, 144, 0, 0.2);
    --color-secondary: #C81414;
    --color-text-primary: #4B4B62;
    --color-white: #FFFFFF;
    --color-success: #109E41;
    --color-divider: #dddddd;
    --color-yellow-logo: #f9b902;
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

    color: var(--color-text-primary);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 1.4rem;
  }

  #root {
    max-width: 85%;
    margin: 0 auto;
  }

  button {
    cursor: pointer;
  }

  .MuiCircularProgress-colorPrimary {
    color: var(--color-primary) !important;
  }

  .MuiMenuItem-root {
    font-size: 1.4rem !important;
    text-transform: capitalize;
  }

  @media (max-width: 800px) {
    .ReactModal__Content {
      width: 50rem !important;
    }
  }
`;
