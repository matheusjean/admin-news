import { createGlobalStyle, css } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  --danger-color: #F5365C;
  --info-color: #11CDEF;
  --warning-color: #FB6340;
  --success-color: #2DCE89;
}

  *{
    box-sizing: border-box;
    font-family: 'Nunito Sans', sans-serif;
    margin: 0;
    padding: 0;

    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;

    &::before,
    &::after {
      box-sizing: inherit;
    }
  }

  ${({ theme }) => css`
    //scrollbar configuration
    ::-webkit-scrollbar {
      width: 0.8rem;
      height: 0.8rem;
    }
    ::-webkit-scrollbar-track {
      background: ${theme.colors.black};
    }

    ::-webkit-scrollbar-thumb {
      background: ${theme.colors.primary};
      border-radius: 1rem;
    }

    html {
      font-size: 62.5%;
    }

    body {
      background-color: ${theme.colors.background};
      color: ${theme.colors.white};
      font-family: ${theme.font.family};
      font-size: ${theme.sizes.medium};
    }
  `}

  & .swal2-popup {
    font-size: 1.75rem;
  }

  label.required::after {
    content: ' *';
    color: red;
  }

  [id^='global-modal'] {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
  z-index: 4;

  display: flex;
  justify-content: center;
  align-items: center;
  }

`;

export default GlobalStyles;
