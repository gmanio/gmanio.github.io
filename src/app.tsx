import 'normalize.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Routes } from './routes';
import Loader from './components/Loader';

ReactDOM.render(
  <React.Suspense fallback={<Loader/>}>
    <Routes />
  </React.Suspense>,
  document.getElementById('app'),
);
