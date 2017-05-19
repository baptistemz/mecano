import React, { Component } from 'react';
import { Link } from 'react-router';
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
    if (this.props.isAuthenticated) {
      return(
        <div onClick={this.logout.bind(this)}>
          <Button icon="exit_to_app">Logout</Button>
        </div>
      )
    }else{
      return(
        <div>
          <Link to={'/login'}><Button icon="lock">Connexion</Button></Link>
          <Link to={'/signup'}><Button icon="create">Créer un compte</Button></Link>
        </div>
      )
    };
  };
  render(){
    return (
      <div>
        <div className="container">
          <Link to={'/'}><Button icon="home">Accueil</Button></Link>
          {this.connectLinks()}
          <Link to={'/protected'}><Button icon="not_interested">Protégé</Button></Link>
        </div>
        { this.props.children }
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch);
}
function mapStateToProps({ auth }) {
  return {
    isAuthenticated: auth.isAuthenticated
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
