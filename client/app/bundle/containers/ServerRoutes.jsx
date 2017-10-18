import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Home from '../components/Home';
import SideNav from '../components/SideNav';
import Account from '../components/Account';
import Signup from '../components/Signup';
import Login from '../components/Login';
import PasswordForgotten from '../components/PasswordForgotten';
import NewPassword from '../components/NewPassword'
import { MecanoPublicPage } from '../components/MecanoPublicPage/index';
import { Header, Footer } from '../common/index';
import { MecanoRegistration, VehicleChoice, DomainChoice, MecanoProfile } from '../components/MecanoRegistration/index';
import { MecanoEdit, VehicleEdit, DomainEdit } from '../components/MecanoEdit/index';
import { MecanoSearch, MecanoSearchDomains, MecanoSearchResults } from '../components/MecanoSearch/index';
import { setWhiteNavbar } from '../actions/index';
import PrivateRoute from './PrivateRoute';
import MecanoRoute from './MecanoRoute';

class ServerRoutes extends Component{
  componentWillMount(){
    this.props.location === '/' ? this.props.setWhiteNavbar(false) : this.props.setWhiteNavbar(false);
  }
  render(){
    const { isAuthenticated, isMecano, location } = this.props;
    const context = {};
    return(
      <StaticRouter location={location} context={context}>
        <div>
          <div>
            <SideNav />
          </div>
          <div className="body-height">
            <Route exact path="/" render={() => {
                return <Home />;
            } } />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/password_forgotten" component={PasswordForgotten} />
            <Route path="/new_password" component={NewPassword} />
            <Route path="/mecano_search" component={MecanoSearch} />
            <Route path="/mecano_search_domains" component={MecanoSearchDomains} />
            <Route exact path="/mecanos" component={MecanoSearchResults} />
            <Route path="/mecanos/:id" component={MecanoPublicPage} />
            <PrivateRoute path="/my_account" isAuthenticated={true} registerMethod="login" component={Account} />
            <PrivateRoute path="/mecano_signup" isAuthenticated={true} registerMethod="signup" component={MecanoRegistration} />
            <PrivateRoute path="/mecano_vehicles" isAuthenticated={true} registerMethod="login" component={VehicleChoice} />
            <PrivateRoute path="/mecano_domains" isAuthenticated={true} registerMethod="login" component={DomainChoice} />
            <MecanoRoute path="/mecano_profile" isAuthenticated={true} isMecano={true} component={MecanoProfile} />
            <MecanoRoute path="/mecano_edit" isAuthenticated={true} isMecano={true} component={MecanoEdit} />
            <MecanoRoute path="/vehicle_edit" isAuthenticated={true} isMecano={true} component={VehicleEdit} client={false} />
            <MecanoRoute path="/domain_edit" isAuthenticated={true} isMecano={true} component={DomainEdit} />
          </div>
          <Footer />
        </div>
      </StaticRouter>
    )
  }
}

function mapStateToProps({ auth }) {
  return {
    isAuthenticated: auth.isAuthenticated,
    isMecano: auth.is_mecano
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setWhiteNavbar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerRoutes);
