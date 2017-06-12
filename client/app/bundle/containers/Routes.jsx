import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import Home from '../components/Home';
import SideNav from '../components/SideNav';
import Signup from '../components/Signup';
import Login from '../components/Login';
import Protected from '../components/Protected';
import { Header } from '../common/index';
import { MecanoRegistration, VehicleChoice } from '../components/MecanoRegistration/index';
import history from '../store/history';
import PrivateRoute from './PrivateRoute';



class Routes extends Component{
  render(){
    return(
      <ConnectedRouter history={history}>
        <div>
          <div>
            <SideNav />
          </div>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/protected" isAuthenticated={this.props.isAuthenticated} registerMethod="login" component={Protected} />
          <PrivateRoute path="/mecano_signup" isAuthenticated={this.props.isAuthenticated} registerMethod="signup" component={MecanoRegistration} />
          <PrivateRoute path="/mecano_vehicles" isAuthenticated={this.props.isAuthenticated} registerMethod="login" component={VehicleChoice} />
        </div>
      </ConnectedRouter>
    )
  }
}

function mapStateToProps({ auth }) {
  return {
    isAuthenticated: auth.isAuthenticated
  }
}

export default connect(mapStateToProps, null)(Routes);
