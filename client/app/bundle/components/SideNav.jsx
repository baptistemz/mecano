
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { logoutUser } from '../actions/index';
import { Button, ProfilePicture } from '../common/index';


class SideNav extends Component {
  componentDidMount() {
    $('.button-collapse').sideNav({
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true
    });
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );
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
                <span className="white-text">Non connecté. Identifiez vous <br/> ou créez un compte.</span>
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
    const { email, first_name, last_name } = this.props;
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td><ProfilePicture currentUser={true} small={true} /></td>
              <td>
                <span className="white-text">{email}</span>
                <br/>
                <span className="capitalize white-text">{`${first_name} ${last_name}`}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="profile-btn-group">
          <Link to='/my_account'><div className="btn btn-small">Mon compte</div></Link>
          <a onClick={this.logout.bind(this)}><div className="btn btn-small">Déconnexion</div></a>
        </div>
      </div>
    );
  }
  render() {
    const { isAuthenticated, isMecano } = this.props;
    return (
      <div>
        <div className="navbar">
          <div className="large-navbar hide-on-med-and-down">
            <div className="space-between">
              <div className="space-between">
                <Link to={'/'}><i className="material-icons">home</i><p>Accueil</p></Link>
                <Link to={'/mecano_search'}><i className="material-icons">search</i><p>Trouver un mécano</p></Link>
              </div>
              <div className="space-between">
                {isMecano ?
                  <Link to={'/mecano_profile'}><i className="material-icons">build</i><p>Mon profil mécano</p></Link>
                :
                  <Link to={'/mecano_signup'}><i className="material-icons">build</i><p>Inscription mécano</p></Link>
                }
                {isAuthenticated ?
                  <div>
                    <a className='dropdown-button' data-activates='dropdown-connected'><i className="material-icons">account_circle</i><p>Mon compte</p></a>
                    <div id='dropdown-connected' className='dropdown-background dropdown-content'>
                      <div className="userView margin-top-20">
                        {this.profileThumb()}
                      </div>
                    </div>
                  </div>
                :
                  <div>
                    <a className='dropdown-button' data-activates='dropdown-not-connected'><i className="material-icons">lock</i><p>Hors ligne</p></a>
                    <div id='dropdown-not-connected' className='dropdown-background dropdown-content'>
                      <div className="userView margin-top-20">
                        {this.connectLinks()}
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
          <ul id="slide-out" className="side-nav">
            <li>
              <div className="userView">
                <div className="background sidenav-background" />
                {isAuthenticated ? this.profileThumb() : this.connectLinks()}
              </div>
            </li>
            <li><Link to={'/'}><i className="material-icons">home</i>Accueil</Link></li>
            <li><Link to={'/mecano_search'}><i className="material-icons">search</i>Trouver un mécano</Link></li>
            {isMecano ?
              <li><Link to={'/mecano_profile'}><i className="material-icons">build</i>Mon profil mécano</Link></li>
            :
              <li><Link to={'/mecano_signup'}><i className="material-icons">build</i>Créer un profil mécano</Link></li>
            }
          </ul>
          <a data-activates="slide-out" className="button-collapse">
            <i className="material-icons hide-on-large-only" id="burger-menu">menu</i>
          </a>
        </div>
      </div>
    );
  }
};
function mapStateToProps({ auth }) {
  return {
    isAuthenticated: auth.isAuthenticated,
    email: auth.email || 'unknown@unknown.com',
    first_name: auth.first_name || 'unknown',
    last_name: auth.last_name || 'unknown',
    isMecano: auth.is_mecano,
    profile_picture: auth.profile_picture.thumb.url
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
