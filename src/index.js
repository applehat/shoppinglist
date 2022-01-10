import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import '@fontsource/dosis'
import '@fontsource/nunito'


const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#4D81B7',
    },
    secondary: {
      main: '#f50057',
    },
    button: {
      main: '#1871E8',
      contrastText: '#fff',
    }
  },
  typography: {
    fontFamily: '"Nunito", sans-serif',
    button: {
      textTransform: "none"
    },
  },
  components: {
    TextField: {
      helperText: {
        marginLeft: 0
      }
    },
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Nunito', sans-serif;
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          line-height: 22px;
          font-size: 16px;
        }
      `,
    },
  },
});


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);