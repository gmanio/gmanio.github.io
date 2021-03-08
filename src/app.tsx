import 'normalize.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import GlobalStyles from './global.styles';
import Routes from './routes';
import Loader from './commons/Loader';

import GlobalProvider from './stores';

ReactDOM.render(
  <GlobalProvider>
    <React.StrictMode>
      <GlobalStyles />
      <React.Suspense fallback={<Loader />}>
        <Routes />
      </React.Suspense>
    </React.StrictMode>
  </GlobalProvider>,
  document.getElementById('app'),
);
