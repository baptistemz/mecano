import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { sendPasswordResetEmail } from '../actions/index';
import { Input, Button, Header } from '../common/index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../libs/i18n/default';

class PasswordForgotten extends Component{
  submit(values){
    this.props.sendPasswordResetEmail(values);
  }
  render(){
    const next_path = this.props.location.state ? this.props.location.state.from : null
    const { handleSubmit, errorMessages } = this.props;
    const { formatMessage } = this.props.intl
    return (
      <div>
        <Header>{formatMessage(defaultMessages.userLogin)}</Header>
        <div className="center-page-content">
          <div className="container">
            <br />
            <div className="row">
              <div className="col s12 m8 l6 offset-m2 offset-l3">
                <form onSubmit={handleSubmit(values => this.submit(values))}>
                  <Input icon="email" name="email" label={formatMessage(defaultMessages.userEmail)} type="email" />
                  <p className="red-text">{errorMessages.main ? errorMessages.main : ''}</p>
                  <Button fullWidth={true} icon="mail_outline" type="submit">{formatMessage(defaultMessages.confirm)}</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sendPasswordResetEmail }, dispatch);
}

function mapStateToProps(state) {
  return { errorMessages: state.auth.errors}
}

PasswordForgotten = reduxForm({
  form: 'password_forgotten'
})(connect(mapStateToProps, mapDispatchToProps)(PasswordForgotten));

export default injectIntl(PasswordForgotten) ;
