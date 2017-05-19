import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { signupUser } from '../actions/index';

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
        <div className="row">
          <div className="vertical-align-container">
            <div className="col s12 l10 offset-l1">
              <div className="nice-container">
                <h4 className="text-center">Créer un compte</h4>
                <br />
                <div className="row">
                  <form onSubmit={this.onFormSubmit.bind(this)}>
                    <div className="input-field">
                      <i className="material-icons prefix">perm_identity</i>
                      <input id="icon_first_name" ref="first_name" type="text" className="validate" />
                      <label htmlFor="icon_email">Prénom</label>
                    </div>
                    <div className="input-field">
                      <i className="material-icons prefix">perm_identity</i>
                      <input id="icon_last_name" ref="last_name" type="text" className="validate" />
                      <label htmlFor="icon_email">Nom</label>
                    </div>
                    <div className="input-field">
                      <i className="material-icons prefix">email</i>
                      <input id="icon_email" ref="email" type="email" className="validate" />
                      <label htmlFor="icon_email">Email</label>
                    </div>
                    <div className="input-field">
                      <i className="material-icons prefix">lock_outline</i>
                      <input
                        id="icon_password" ref="password"
                        type="password" className="validate"
                      />
                    <label htmlFor="icon_password">Mot de passe</label>
                    </div>
                    <div className="input-field">
                      <i className="material-icons prefix">lock_outline</i>
                      <input
                        id="icon_password_confirmation" ref="password_confirmation"
                        type="password" className="validate"
                      />
                    <label htmlFor="icon_password_confirmation">Confirmation du mot de passe</label>
                    </div>
                    <button type="submit" className="btn full-width">
                      Submit
                    </button>
                  </form>
                  {errorMessage &&
                    <p>{errorMessage}</p>
                  }
                </div>
              </div>
              <div className="text-center">
                <Link to={'/login'}>Déjà un compte ? Connecte-toi !</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signupUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(Signup);
