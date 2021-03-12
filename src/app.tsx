import 'normalize.css';
import * as React from 'react';

import GlobalStyles from './global.styles';
import Routes from './routes';
import Loader from './commons/Loader';

import GlobalProvider from './stores';

const App = () => (
  <GlobalProvider>
    <React.StrictMode>
      <GlobalStyles />
      <React.Suspense fallback={<Loader />}>
        <Routes />
      </React.Suspense>
    </React.StrictMode>
  </GlobalProvider>
);

export default App;
