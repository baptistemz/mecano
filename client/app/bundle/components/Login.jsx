import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { loginUser } from '../actions/index';
import { Input, Button } from '../common/index';

const sanitize = (field) => {
  const sanitized_field = field ? field.trim() : '';
  return sanitized_field
}
class Login extends Component{
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    if(this.props.location.state
      && this.props.location.state.redirected){
      toastr.info("Veuillez vous connecter pour réaliser cette action")
    }
  }
  submit({ email, password }, next_path){
    const creds = { email: sanitize(email), password: sanitize(password) };
    this.props.loginUser(creds, next_path);
  }
  render(){
    const next_path = this.props.location.state ? this.props.location.state.from : null
    const { handleSubmit, errorMessages } = this.props;
    return (
      <div className="container">
        <h4 className="text-center">Se connecter</h4>
        <br />
        <div className="row">
          <form onSubmit={handleSubmit(values => this.submit(values, next_path))}>
            <Input icon="email" name="email" type="email" />
            <Input icon="lock_outline" name="password" type="password" />
            <p className="red-text">{errorMessages.main ? errorMessages.main : ''}</p>
            <Button type="submit">Connexion</Button>
          </form>
        </div>
        <div className="text-center margin-top-20 margin-bottom-20 text-20">
          <Link to={{ pathname: '/signup', state: { from: next_path } }}>Pas encore de compte ? Enregistre-toi !</Link>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUser }, dispatch);
}

function mapStateToProps(state) {
  return { errorMessages: state.auth.errors}
}

Login = reduxForm({
  form: 'login'
})(connect(mapStateToProps, mapDispatchToProps)(Login));

export default Login ;
