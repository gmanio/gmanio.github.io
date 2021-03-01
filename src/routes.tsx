import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainPage from './pages/MainPage';

export const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route component={() => <div>Not Found</div>} />
      </Switch>
    </Router>
  );
};
