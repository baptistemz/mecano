import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { signupUser } from '../actions/index';
import { Input, Button, Header } from '../common/index'

const sanitize = (field) => {
  const sanitized_field = field ? field.trim() : '';
  return sanitized_field
}
class Signup extends Component{
  submit({ first_name, last_name, email, password, password_confirmation }, next_path){
    const creds = { first_name: sanitize(first_name),
                    last_name: sanitize(last_name),
                    email: sanitize(email) ,
                    password: sanitize(password),
                    password_confirmation: sanitize(password_confirmation) };
    this.props.signupUser(creds, next_path);
  }
  render(){
    const next_path = this.props.location.state ? this.props.location.state.from : null
    const { handleSubmit, errorMessages } = this.props;
    console.log(errorMessages)
    return (
      <div>
        <Header>Créer un compte</Header>
        <div className="container">
          <br />
          <div className="row">
            <form onSubmit={handleSubmit(values => this.submit(values, next_path))}>
              <Input icon="perm_identity" name="first_name"  type="text" error={errorMessages["first_name"]} />
              <Input icon="perm_identity" name="last_name" type="text" error={errorMessages["last_name"]} />
              <Input icon="email" name="email" type="email" error={errorMessages["email"]} />
              <Input icon="lock_outline" name="password"  type="password" error={errorMessages["password"]} />
              <Input icon="lock_outline" name="password_confirmation" type="password" error={errorMessages["password_confirmation"]} />
              <p className="red-text">{errorMessages.main}</p>
              <Button type="submit">Connexion</Button>
            </form>
          </div>
          <div className="text-center">
            <Link to={{ pathname: '/login', state: { from: next_path } }}>Déjà un compte ? Connecte-toi !</Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signupUser }, dispatch);
}

function mapStateToProps(state) {
  return { errorMessages: state.auth.errors}
}

Signup = reduxForm({
  form: 'signup' // a unique name for this form
})(connect(mapStateToProps, mapDispatchToProps)(Signup));

export default Signup ;
