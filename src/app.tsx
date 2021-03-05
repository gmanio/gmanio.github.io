import 'normalize.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import GlobalStyles from './global.styles';
import Routes from './routes';
import Loader from './commons/Loader';

import GlobalProvider from './stores';

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <React.Suspense fallback={<Loader />}>
        <GlobalStyles />
        <Routes />
      </React.Suspense>
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('app'),
);
