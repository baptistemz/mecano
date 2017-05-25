import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../actions/index';
import { Button } from '../common/index';


class SideNav extends Component {
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
                <span className="white-text name">Not connected</span>
                <span className="white-text email">Login or Sign up</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="space-around profile-btn-group">
          <Link to={'/login'}><div className="btn btn-small">Se connecter</div></Link>
          <Link to={'/signup'}><div className="btn btn-small">Créer un compte</div></Link>
        </div>
      </div>
    );
  };
  profileThumb() {
    const { first_name, last_name, email } = this.props;
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td><i className="material-icons">perm_identity</i></td>
              <td>
                <span className="white-text name">{email}</span>
                <span className="white-text email">{`${first_name} ${last_name.charAt(0).toUpperCase()}`}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="space-around profile-btn-group">
          <Link to='/profile'><div className="btn btn-small">Profile</div></Link>
          <a onClick={this.logout.bind(this)}><div className="btn btn-small">Log out</div></a>
        </div>
      </div>
    );
  }
  render() {
    const { isAuthenticated } = this.props;
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
            <li><div className="divider" /></li>
            <li><Link to={'/'}><i className="material-icons">home</i>Accueil</Link></li>
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
    isAuthenticated: auth.isAuthenticated
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
