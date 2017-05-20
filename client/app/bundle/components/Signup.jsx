import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { signupUser } from '../actions/index';
import { Input, Button } from '../common/index'

class Signup extends Component {
  onFormSubmit(event) {
    event.preventDefault();
    const first_name = this.refs.first_name;
    const last_name = this.refs.last_name;
    const email = this.refs.email;
    const password = this.refs.password;
    const passwordConfirmation = this.refs.password_confirmation;
    const creds = { first_name: first_name.value.trim(),
                    last_name: last_name.value.trim(),
                    email: email.value.trim(),
                    password: password.value.trim(),
                    password_confirmation: passwordConfirmation.value.trim() };
    this.props.signupUser(creds);
  }
  render() {
    const { errorMessage } = this.props;
    return (
      <div className="container">
        <h4 className="text-center">Créer un compte</h4>
        <br />
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <Input icon="perm_identity" englishLabel="first_name" label="Prénom" type="text"/>
          <Input icon="perm_identity" englishLabel="last_name" label="nom de famille" type="text"/>
          <Input icon="email" label="email" type="email"/>
          <Input icon="lock_outline" englishLabel="password" label="mot de passe" type="password"/>
          <Input icon="lock_outline" englishLabel="password_confimation" label="confirmation du mot de passe" type="password"/>
          <Button type="submit">Connexion</Button>
        </form>
        {errorMessage &&
          <p>{errorMessage}</p>
        }
        <div className="text-center">
          <Link to={'/login'}>Déjà un compte ? Connecte-toi !</Link>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signupUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(Signup);
