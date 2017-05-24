import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { loginUser } from '../actions/index';
import { Input, Button } from '../common/index';


class Login extends Component{
  submit({ email, password }){
    const creds = { email: email.trim(), password: password.trim() };
    this.props.loginUser(creds);
  }
  render(){
    if(this.props.location.state
      && this.props.location.state.redirected){
      toastr.info("Veuillez vous connecter pour réaliser cette action")
    }
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <h4 className="text-center">Se connecter</h4>
        <br />
        <div className="row">
          <form onSubmit={handleSubmit(values => this.submit(values))}>
            <Input icon="email" name="email" type="email" />
            <Input icon="lock_outline" name="password" type="password" />
            <Button type="submit">Connexion</Button>
          </form>
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

Login = reduxForm({
  form: 'login'
})(connect(null, mapDispatchToProps)(Login));

export default Login ;
