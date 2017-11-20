import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Input, Button } from '../common/index';
import { toastr } from 'react-redux-toastr';
import { updatePassword } from '../actions/index'
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../libs/i18n/default';

class PasswordChange extends Component {
  submit(values){
    if(values.password === values.password_confirmation){
      this.props.updatePassword(values)
    }else{
      toastr.error("Le nouveau mot de passe et la confirmation ne sont pas identiques")
    }
  }
  componentDidMount(){
    $('.modal').modal();
  }
  render(){
    const { handleSubmit, errorMessages } = this.props;
    const { formatMessage } = this.props.intl
    return(
      <div>
        <div className="modal-trigger" data-target="password_modal"<button className="waves-effect waves-light full-width btn">{formatMessage(defaultMessages.userChangePassword)}</button></div>
        <div id="password_modal" className="modal">
          <div className="modal-content">
            <div className="text-center">
              <h2>{formatMessage(defaultMessages.userChangePassword)}</h2>
            </div>
            <form onSubmit={handleSubmit(values => this.submit(values))}>
              <Input icon="lock_outline" name="current_password" label={formatMessage(defaultMessages.userCurrentPassword)} error={errorMessages["current_password"]} type="password" />
              <Input icon="lock_outline" name="password" label={formatMessage(defaultMessages.userNewPassword)} type="password" error={errorMessages["password"]} />
              <Input icon="lock_outline" name="password_confirmation" label={formatMessage(defaultMessages.userNewPasswordConfirmation)} type="password"  error={errorMessages["password_confirmation"]}/>
              <Button fullWidth={true} icon="lock_open" type="submit">{formatMessage(defaultMessages.userChangePassword)}</Button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updatePassword }, dispatch);
}

PasswordChange = reduxForm({
  form: 'password_change'
})(connect(null, mapDispatchToProps)(PasswordChange));


export default injectIntl(PasswordChange);
