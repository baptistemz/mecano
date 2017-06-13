import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { logoutUser } from '../actions/index';
import { Button } from '../common/index';


class SideNav extends Component {
  componentDidMount() {
    $('.button-collapse').sideNav({
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true
    });
  }
  logout(event){
    event.preventDefault();
    this.props.logoutUser();
  }
  connectLinks() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td><i className="material-icons">not_interested</i></td>
              <td>
                <span className="white-text">Non connecté. </span>
                <span className="white-text">Identifiez vous ou créez un compte.</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="profile-btn-group">
          <Link to={'/login'}><div className="btn btn-small">Se connecter</div></Link>
          <Link to={'/signup'}><div className="btn btn-small">Créer un compte</div></Link>
        </div>
      </div>
    );
  };
  profileThumb() {
    const { user } = this.props;
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td><i className="material-icons">account_circle</i></td>
              <td>
                <span className="white-text">{user.email}</span>
                <br/>
                <span className="capitalize white-text">{`${user.first_name} ${user.last_name}`}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="profile-btn-group">
          <Link to='/profile'><div className="btn btn-small">Mon compte</div></Link>
          <a onClick={this.logout.bind(this)}><div className="btn btn-small">Déconnexion</div></a>
        </div>
      </div>
    );
  }
  render() {
    const { isAuthenticated, isMecano } = this.props;
    return (
      <div>
        <div className="transparent-navbar">
          <ul id="slide-out" className="side-nav">
            <li>
              <div className="userView">
                <div className="background sidenav-background" />
                {isAuthenticated ? this.profileThumb() : this.connectLinks()}
              </div>
            </li>
            <li><Link to={'/'}><i className="material-icons">home</i>Accueil</Link></li>
            {isMecano ?
              <li><Link to={'/mecano_signup'}><i className="material-icons">build</i>Mon profil mécano</Link></li>
            :
              <li><Link to={'/mecano_signup'}><i className="material-icons">build</i>Créer un profil mécano</Link></li>
            }
            <li><div className="divider" /></li>
            <li><Link to={'/protected'}><i className="material-icons">not_interested</i>Protégé</Link></li>
          </ul>
          <a data-activates="slide-out" className="button-collapse show-on-large">
            <i className="material-icons" id="burger-menu">menu</i>
          </a>
        </div>
      </div>
    );
  }
};
function mapStateToProps({ auth }) {
  return {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user || { email: 'unknown@unknown.com', first_name: 'unknown', last_name: 'unknown' },
    isMecano: auth.isMecano
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
