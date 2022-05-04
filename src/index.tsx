import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import App from './App';
import { theme } from './constants';
import { ThemeProvider } from '@mui/material';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers';
const root = document.getElementById('root');

render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <App />
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>,
  root
);
