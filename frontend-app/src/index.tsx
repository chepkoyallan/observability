import 'src/build/tailwind.output.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { cssRule } from 'typestyle';
import './index.css';
// import App from './Router';
import { HashRouter } from 'react-router-dom';
import Router from './components/Router';

export const queryClient = new QueryClient();

const app = (
  <QueryClientProvider client={queryClient}>
    <HashRouter>
      <Router/>
    </HashRouter>
  </QueryClientProvider>
)

ReactDOM.render(
  (app),
  document.getElementById('root')
)

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <HashRouter>
//       <Router/>
//     </HashRouter>
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
