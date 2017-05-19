import React from 'react';
import { IndexRoute, Route, browserHistory } from 'react-router';
import Home from '../components/Home';
import SideNav from '../components/SideNav';
import Signup from '../components/Signup';
import Login from '../components/Login';
import Protected from '../components/Protected';


export default(
  <div>
    <Route path="/" component={SideNav} history={browserHistory}>
      <IndexRoute component={Home} />
      <Route path="signup" component={Signup} />
      <Route path="login" component={Login} />
      <Route path="protected" component={Protected} />
    </Route>
  </div>
);
