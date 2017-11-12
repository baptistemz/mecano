import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import ReduxToastr from 'react-redux-toastr';
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
import history from '../store/history';
import { setWhiteNavbar } from '../actions/index';
import PrivateRoute from './PrivateRoute';
import MecanoRoute from './MecanoRoute';



class ClientRoutes extends Component{
  componentWillMount(){
    history.location.pathname === '/' ? this.props.setWhiteNavbar(true) : this.props.setWhiteNavbar(false);
  }
  render(){
    const { isAuthenticated, isMecano, rehydrated } = this.props;
    const authenticated = rehydrated ? isAuthenticated : true
    const mecano = rehydrated ? isMecano : true
    return(
      <ConnectedRouter history={history}>
        <div style={{ overflowX: "hidden" }}>
          <div>
            <SideNav />
          </div>
          <div className="body-height">
            <Route exact path="/" component={Home}/>
            <Route path="/signup" component={isAuthenticated ? Home : Signup} />
            <Route path="/login" component={isAuthenticated ? Home : Login} />
            <Route path="/password_forgotten" component={PasswordForgotten} />
            <Route path="/new_password" component={NewPassword} />
            <Route path="/mecano_search" component={MecanoSearch} />
            <Route path="/mecano_search_domains" render={() => {
                return  <MecanoSearchDomains appKey={this.props.appKey}/>
              } }  />
            <Route exact path="/mecanos" render={() => {
                return  <MecanoSearchResults appKey={this.props.appKey} location={history.location}/>
              } } />
            <Route path="/mecanos/:id" component={MecanoPublicPage} />
            <PrivateRoute path="/my_account" isAuthenticated={authenticated} registerMethod="login" component={Account} />
            <PrivateRoute path="/mecano_signup" isAuthenticated={authenticated} registerMethod="signup" component={MecanoRegistration} />
            <PrivateRoute path="/mecano_vehicles" isAuthenticated={authenticated} registerMethod="login" component={VehicleChoice} />
            <PrivateRoute path="/mecano_domains" isAuthenticated={authenticated} registerMethod="login" component={DomainChoice} />
            <MecanoRoute path="/mecano_profile" isAuthenticated={authenticated} isMecano={mecano} component={MecanoProfile} />
            <MecanoRoute path="/mecano_edit" isAuthenticated={authenticated} isMecano={mecano} component={MecanoEdit} />
            <MecanoRoute path="/vehicle_edit" isAuthenticated={authenticated} isMecano={mecano} component={VehicleEdit} client={true} />
            <MecanoRoute path="/domain_edit" isAuthenticated={authenticated} isMecano={mecano} component={DomainEdit} />
          </div>
          <Footer />
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setWhiteNavbar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientRoutes);
