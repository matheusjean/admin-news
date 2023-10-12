import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from 'react-router-dom'

import { ThemeProvider } from 'styled-components'

import App from './components/App'
import GlobalStyles from './styles/global'
import theme from './styles/theme'

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
)
