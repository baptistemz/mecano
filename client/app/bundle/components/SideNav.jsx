import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../libs/i18n/default';
import { logoutUser } from '../actions/index';
import { Button, ProfilePicture } from '../common/index';

class SideNav extends Component {
  componentDidMount() {
    if(typeof jQuery !== 'undefined'){
      $('.button-collapse').sideNav({
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true
      });
      $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: true, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'left', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
      });
    }
  }
  logout(event){
    event.preventDefault();
    this.props.logoutUser();
  }
  connectLinks() {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td><i className="material-icons">not_interested</i></td>
              <td>
                <span className="white-text">{formatMessage(defaultMessages.sidenavNotConnectedLogin)} <br/> {formatMessage(defaultMessages.sidenavOrSignup)}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="profile-btn-group">
          <Link to={'/login'}><div className="btn btn-small">{formatMessage(defaultMessages.userLogin)}</div></Link>
          <Link to={'/signup'}><div className="btn btn-small">{formatMessage(defaultMessages.userSignup)}</div></Link>
        </div>
      </div>
    );
  };
  profileThumb() {
    const { email, first_name, last_name } = this.props;
    const { formatMessage } = this.props.intl;
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
          <Link to='/my_account'><div className="btn btn-small">{formatMessage(defaultMessages.headersMyAccount)}</div></Link>
          <a onClick={this.logout.bind(this)}><div className="btn btn-small">{formatMessage(defaultMessages.userLogoff)}</div></a>
        </div>
      </div>
    );
  }
  render() {
    const { isAuthenticated, isMecano, white_navbar } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <div className="navbar">
          <div className="large-navbar hide-on-med-and-down">
            <div className="space-between">
              <div className="space-between">
                <Link className={`${white_navbar ? 'white-shadowed-text' : ''}`} to={'/'}><i className="material-icons">home</i><p>{formatMessage(defaultMessages.sidenavHome)}</p></Link>
              </div>
              <div className="space-between">
                <Link className={`${white_navbar ? 'white-shadowed-text' : ''}`} to={'/mecano_search'}><i className="material-icons">search</i><p>{formatMessage(defaultMessages.homeFindAMecano)}</p></Link>
                {isMecano ?
                  <Link className={`${white_navbar ? 'white-shadowed-text' : ''}`} to={'/mecano_profile'}><i className="material-icons">build</i><p>{formatMessage(defaultMessages.homeMyMecanoProfile)}</p></Link>
                :
                  <Link className={`${white_navbar ? 'white-shadowed-text' : ''}`} to={'/mecano_signup'}><i className="material-icons">build</i><p>{formatMessage(defaultMessages.homeCreateAMecanoProfile)}</p></Link>
                }
                {isAuthenticated ?
                  <div>
                    <a className={`dropdown-button ${white_navbar ? 'white-shadowed-text' : ''}`} data-activates='dropdown-connected'><i className="material-icons">account_circle</i><p>{formatMessage(defaultMessages.headersMyAccount)}</p></a>
                    <div id='dropdown-connected' className='dropdown-background dropdown-content'>
                      <div className="userView margin-top-20">
                        {this.profileThumb()}
                      </div>
                    </div>
                  </div>
                :
                  <div>
                    <a className={`dropdown-button ${white_navbar ? 'white-shadowed-text' : ''}`} data-activates='dropdown-not-connected'><i className="material-icons">lock</i><p>{formatMessage(defaultMessages.userLogin)}</p></a>
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
            <li><Link to={'/mecano_search'}><i className="material-icons">search</i>{formatMessage(defaultMessages.homeFindAMecano)}</Link></li>
            {isMecano ?
              <li><Link to={'/mecano_profile'}><i className="material-icons">build</i>{formatMessage(defaultMessages.homeMyMecanoProfile)}</Link></li>
            :
              <li><Link to={'/mecano_signup'}><i className="material-icons">build</i>{formatMessage(defaultMessages.homeCreateAMecanoProfile)}</Link></li>
            }
          </ul>
          <a data-activates="slide-out" className="button-collapse">
            <i className={`material-icons hide-on-large-only ${white_navbar ? 'white-shadowed-text' : ''}`} id="burger-menu">menu</i>
          </a>
        </div>
      </div>
    );
  }
};
function mapStateToProps({ auth, display }) {
  return {
    isAuthenticated: auth.isAuthenticated,
    email: auth.email || 'unknown@unknown.com',
    first_name: auth.first_name || 'unknown',
    last_name: auth.last_name || 'unknown',
    isMecano: auth.is_mecano,
    profile_picture: auth.profile_picture.thumb.url,
    white_navbar: display.white_navbar
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch);
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(SideNav));
