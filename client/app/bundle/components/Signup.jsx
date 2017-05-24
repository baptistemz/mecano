import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { signupUser } from '../actions/index';
import { Input, Button } from '../common/index'

class Signup extends Component{
  submit({ first_name, last_name, email, password, password_confirmation }){
    const creds = { first_name: first_name.trim(),
                    last_name: last_name.trim(),
                    email: email.trim(),
                    password: password.trim(),
                    password_confirmation: password_confirmation.trim() };
    this.props.signupUser(creds);
  }
  render(){
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <h4 className="text-center">Créer un compte</h4>
        <br />
        <div className="row">
          <form onSubmit={handleSubmit(values => this.submit(values))}>
            <Input icon="perm_identity" name="first_name"  type="text" />
            <Input icon="perm_identity" name="last_name" type="text" />
            <Input icon="email" name="email" type="email" />
            <Input icon="lock_outline" name="password"  type="password" />
            <Input icon="lock_outline" name="password_confirmation" type="password" />
            <Button type="submit">Connexion</Button>
          </form>
        </div>
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

Signup = reduxForm({
  form: 'login' // a unique name for this form
})(connect(null, mapDispatchToProps)(Signup));

export default Signup ;
