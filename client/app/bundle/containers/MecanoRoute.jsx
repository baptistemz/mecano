import React from 'react';
import { Route, Redirect } from 'react-router';

const MecanoRoute = ({ component: Component, isAuthenticated, isMecano,  registerMethod, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated && isMecano ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location, redirected: true },
      }}/>
    )
  )}/>
)

export default MecanoRoute;
