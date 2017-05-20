import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loginUser } from '../actions/index';
import { Input, Button } from '../common/index'

class Login extends Component {
  onFormSubmit(event) {
    event.preventDefault();
    const email = this.refs.email;
    const password = this.refs.password;
    const creds = { email: email.value.trim(), password: password.value.trim() };
    this.props.loginUser(creds);
  }
  render() {
    const { errorMessage } = this.props;
    return (
      <div className="container">
        <h4 className="text-center">Se connecter</h4>
        <br />
        <div className="row">
          <form onSubmit={this.onFormSubmit.bind(this)}>
            <Input icon="email" label="email" type="email" />
            <Input icon="lock_outline" label="password" type="password" />
            <Button type="submit">Connexion</Button>
          </form>
          {errorMessage &&
            <p>{errorMessage}</p>
          }
        </div>
        <div className="text-center margin-top-20 margin-bottom-20 text-20">
          <Link to={'/signup'}>Pas encore de compte ? Enregistre-toi !</Link>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(Login);
