import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { reduxForm, Field } from 'redux-form';
import { registerMecano } from '../actions/index';
import { Header, RadioButtons, Button, Input } from '../common/index';
import PictureUpdate from '../components/PictureUpdate';

class MecanoRegistration extends Component {
  submit({ email, password }, next_path){
    const creds = { email: sanitize(email), password: sanitize(password) };
    this.props.registerMecano(creds, next_path);
  }
  render(){
    const { handleSubmit, errorMessages, pro, mobile } = this.props;
    return (
      <div>
        <Header>Enregistrement mécano 1/3</Header>
        <div className="container">
          <div className="row">
            <form>
              <div className="col s12 l6 text-center">
                <br/>
                <h2>Mon profil</h2>
                <RadioButtons name="pro" label="Je suis un" options={["professionnel", "passionné"]} />
                <PictureUpdate/>
              </div>
              <div className="col s12 l6 text-center">
                <br/>
                <h2>Données géographiques</h2>
                <Input icon="place" name="address" type="text" />
                <RadioButtons label="Je me déplace" name="mobile" options={["oui", "non"]} />
                  {
                    mobile ?
                      <div className="row">
                        <div className="col s9">
                          <Input icon="explore" name="radius" type="number" />
                        </div>
                        <p className="col s3" style={{ fontSize: 17, marginTop: 24}}>km</p>
                      </div>
                    :
                      ''
                  }
                <br/>
              </div>
              <Button className="col s12 m6 offset-m3 l4 offset-l4">Etape suivante</Button>
            </form>
          </div>
      </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ registerMecano }, dispatch);
}

function mapStateToProps(state) {
  const { mecano_registration } = state.form
  return {
    errorMessages: state.mecanoRegistration.errors,
    mobile: (mecano_registration && mecano_registration.values && (mecano_registration.values.mobile === "oui"))
  }
}

MecanoRegistration = reduxForm({
  form: 'mecano_registration'
})(connect(mapStateToProps, mapDispatchToProps)(MecanoRegistration));

export default MecanoRegistration ;
