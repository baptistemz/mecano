import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { reduxForm, Field } from 'redux-form';
import { registerMecano } from '../actions/index';
import { Header, RadioButtons, Button } from '../common/index';

class MecanoRegistration extends Component {
  submit({ email, password }, next_path){
    const creds = { email: sanitize(email), password: sanitize(password) };
    this.props.registerMecano(creds, next_path);
  }
  render(){
    const { handleSubmit, errorMessages } = this.props;
    return (
      <div>
        <Header>Enregistrement mécano 1/3</Header>
        <form>
          <p>Mon profil</p>
          <RadioButtons name="pro" options={["professionnel", "passionné"]} />
          <p>Je me déplace</p>
          <RadioButtons name="mobile" options={["oui", "non"]} />
          <Button>Etape suivante</Button>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ registerMecano }, dispatch);
}

function mapStateToProps(state) {
  return { errorMessages: state.mecanoRegistration.errors}
}

MecanoRegistration = reduxForm({
  form: 'mecano_registration'
})(connect(mapStateToProps, mapDispatchToProps)(MecanoRegistration));

export default MecanoRegistration ;
