import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { fonts, theme } from './Css';
import ReactDOM from 'react-dom/client';
import 'src/build/tailwind.output.css';
import Router from './components/Router';
import { HashRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import { cssRule } from 'typestyle';

cssRule('html, body, #root', {
  background: 'white',
  color: 'rgba(0, 0, 0, .66)',
  display: 'flex',
  fontFamily: fonts.main,
  fontSize: 13,
  height: '100%',
  width: '100%',
});

export const queryClient = new QueryClient();

const app = (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Router />
      </HashRouter>
    </ThemeProvider>
  </QueryClientProvider>
  
)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
   {app}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
