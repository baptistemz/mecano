import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { updatePassword } from '../actions/index';
import { Input, Button, Header } from '../common/index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../libs/i18n/default';

class NewPassword extends Component{
  submit(values){
    const search = this.props.location.search; // params contained in url string
    const params = new URLSearchParams(search);
    if(values.password === values.password_confirmation){
      this.props.updatePassword(values, params)
    }else{
      toastr.error("Le nouveau mot de passe et la confirmation ne sont pas identiques")
    }
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
                  <Input icon="lock_outline" name="password" label={formatMessage(defaultMessages.userNewPassword)} type="password" />
                  <Input icon="lock_outline" name="password_confirmation" label={formatMessage(defaultMessages.userNewPasswordConfirmation)} type="password" />
                  <p className="red-text">{errorMessages.main ? errorMessages.main : ''}</p>
                  <Button fullWidth={true} icon="lock_open" type="submit">{formatMessage(defaultMessages.userChangePassword)}</Button>
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
  return bindActionCreators({ updatePassword }, dispatch);
}

function mapStateToProps(state) {
  return { errorMessages: state.auth.errors}
}

NewPassword = reduxForm({
  form: 'new_password'
})(connect(mapStateToProps, mapDispatchToProps)(NewPassword));

export default injectIntl(NewPassword) ;
