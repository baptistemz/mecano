import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { loginUser } from '../actions/index';
import { Input, Button, Header } from '../common/index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../libs/i18n/default';

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
    const { formatMessage } = this.props.intl
    return (
      <div>
        <Header>{formatMessage(defaultMessages.userLogin)}</Header>
        <div className="container">
          <br />
          <div className="row">
            <form onSubmit={handleSubmit(values => this.submit(values, next_path))}>
              <Input icon="email" name={formatMessage(defaultMessages.userEmail)} type="email" />
              <Input icon="lock_outline" name={formatMessage(defaultMessages.userPassword)} type="password" />
              <p className="red-text">{errorMessages.main ? errorMessages.main : ''}</p>
              <Button icon="lock_open" type="submit">{formatMessage(defaultMessages.userLogin)}</Button>
            </form>
          </div>
          <div className="text-center margin-top-20 margin-bottom-20 text-20">
            <Link to={{ pathname: '/signup', state: { from: next_path } }}>{formatMessage(defaultMessages.userNoAccountYetMessage)}</Link>
          </div>
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

export default injectIntl(Login) ;
