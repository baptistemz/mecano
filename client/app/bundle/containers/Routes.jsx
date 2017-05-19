import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Home from '../components/Home';
import SideNav from '../components/SideNav';
import Signup from '../components/Signup';
import Login from '../components/Login';


export default(
  <div>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="signup" component={Signup} />
      <Route path="login" component={Login} />
    </div>
  </div>
);
