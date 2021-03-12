import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import withFirebase from './hocs/withFirebase';

import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/join" component={RegisterPage} />
        <Route component={() => <div>Not Found</div>} />
      </Switch>
    </Router>
  );
};

export default withFirebase(Routes);
