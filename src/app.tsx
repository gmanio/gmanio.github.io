import 'normalize.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import GlobalStyles from './global.styles';
import Routes from './routes';
import Loader from './commons/Loader';

ReactDOM.render(
  <React.Suspense fallback={<Loader />}>
    <GlobalStyles />
    <Routes />
  </React.Suspense>,
  document.getElementById('app'),
);
