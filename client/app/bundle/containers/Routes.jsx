import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Home from '../components/Home';
import SideNav from '../components/SideNav';
import Signup from '../components/Signup';
import Login from '../components/Login';
import Protected from '../components/Protected';
import { Header } from '../common/index';
import { MecanoRegistration, VehicleChoice, DomainChoice, MecanoProfile } from '../components/MecanoRegistration/index';
import { MecanoEdit, VehicleEdit, DomainEdit } from '../components/MecanoEdit/index';
import history from '../store/history';
import PrivateRoute from './PrivateRoute';
import MecanoRoute from './MecanoRoute';



class Routes extends Component{
  render(){
    const { isAuthenticated, isMecano } = this.props;
    return(
      <ConnectedRouter history={history}>
        <div>
          <div>
            <SideNav />
          </div>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/protected" isAuthenticated={isAuthenticated} registerMethod="login" component={Protected} />
          <PrivateRoute path="/mecano_signup" isAuthenticated={isAuthenticated} registerMethod="signup" component={MecanoRegistration} />
          <PrivateRoute path="/mecano_vehicles" isAuthenticated={isAuthenticated} registerMethod="login" component={VehicleChoice} />
          <PrivateRoute path="/mecano_domains" isAuthenticated={isAuthenticated} registerMethod="login" component={DomainChoice} />
          <MecanoRoute path="/mecano_profile" isAuthenticated={isAuthenticated} isMecano={isMecano} component={MecanoProfile} />
          <MecanoRoute path="/mecano_edit" isAuthenticated={isAuthenticated} isMecano={isMecano} component={MecanoEdit} />
          <MecanoRoute path="/vehicle_edit" isAuthenticated={isAuthenticated} isMecano={isMecano} component={VehicleEdit} />
          <MecanoRoute path="/domain_edit" isAuthenticated={isAuthenticated} isMecano={isMecano} component={DomainEdit} />
        </div>
      </ConnectedRouter>
    )
  }
}

function mapStateToProps({ auth }) {
  return {
    isAuthenticated: auth.isAuthenticated,
    isMecano: auth.is_mecano
  }
}

export default connect(mapStateToProps, null)(Routes);
