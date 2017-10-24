import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm, change } from 'redux-form';
import PictureUpdate from '../PictureUpdate';
import { registerMecano, mecanoRegistrationError } from '../../actions/index';
import { Header, Loader, RadioButtons, Input } from '../../common/index';
import { injectIntl } from 'react-intl';
import { googleMapsAutocomplete, formatRegistrationData } from '../../utils/mecanoRegistrationUtils'
import { defaultMessages } from '../../../libs/i18n/default';

class MecanoRegistration extends Component {
  componentDidMount(){
    //SET GOOGLE-PLACE-AUTOCOMPLETE ON THE ADDRESS FIELD
    var input = document.getElementById('icon_full_address');
    var options = { componentRestrictions: {country: ['fr', 'be', 'ch']} };
    googleMapsAutocomplete(input, options, this.props.dispatch, "mecano_registration", "full_address")
  }

  submit(values){
    if(values.full_address){
      values = formatRegistrationData(values, this.props.mobile, this.props.pro);
    }else{
      this.props.mecanoRegistrationError({ address: "Saisissez une addresse sous le format 'n° & rue, Ville, Pays' " });
    }
    if( values['country'] && values['city'] && values['address']){
      this.props.registerMecano(values, '/mecano_vehicles')
    }else{
      this.props.mecanoRegistrationError({ address: "Saisissez une addresse sous le format 'n° & rue, Ville, Pays' " });
    }
  }

  render(){
    const { handleSubmit, errors, pro, mobile, isMecano, full_address } = this.props;
    const { formatMessage } = this.props.intl
    console.log(pro)
    if(isMecano){
      return <Redirect to={{pathname: '/mecano_vehicles'}}/>
    }
    return (
      <div>
        <Header>Enregistrement mécano 1/3</Header>
        <div className="container">
          <form onSubmit={handleSubmit(values => this.submit(values))}>
            <div className="col s12 l6 text-center">
              <br/>
              <h2>Mon profil</h2>
              <PictureUpdate/>
              <RadioButtons name="pro" label="Je suis un" options={{ "pro": "professionnel", "non_pro":"passionné" }} />
              {
                pro === "pro" ?
                <div className="row">
                  <div className="col s9">
                    <Input icon="monetization_on" name="price" label={formatMessage(defaultMessages.mecanoPrice)} type="number" error={errors.price} />
                    <Input icon="business" name="company_name" label={formatMessage(defaultMessages.mecanoCompanyName)} type="text" error={errors.company_name} />
                  </div>
                  <p className="col s3" style={{ fontSize: 17, marginTop: 24}}>€/heure</p>
                </div>
                :
                ''
              }
            </div>
            <div className="col s12 l6 text-center">
              <br/>
              <h2>Données géographiques</h2>
              <Input id='gplaces' icon="explore" name="full_address" label={formatMessage(defaultMessages.mecanoFullAddress)} type="text" error={errors.address} />
              <RadioButtons label="Je me déplace" name="mobile" options={{"mobile": "oui", "non_mobile": "non"}} />
              {
                mobile === "mobile" ?
                <div className="row">
                  <div className="col s9">
                    <Input icon="explore" name="radius" label={formatMessage(defaultMessages.mecanoRadius)} type="number" error={errors.radius} />
                  </div>
                  <p className="col s3" style={{ fontSize: 17, marginTop: 24}}>km</p>
                </div>
                :
                ''
              }
            </div>
            <div className="col s12">
              <p className="red-text">{errors ? errors['main'] : ''}</p>
              <div className="space-between">
                <div></div>
                <a onClick={handleSubmit(values => this.submit(values))} className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">keyboard_arrow_right</i></a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ registerMecano, mecanoRegistrationError, change }, dispatch);
}

function mapStateToProps(state) {
  const { mecano_registration } = state.form
  console.log(mecano_registration)
  return {
    mobile: mecano_registration && mecano_registration.values ? mecano_registration.values.mobile : (state.mecano.mobile ? 'mobile' : 'non_mobile'),
    pro: mecano_registration && mecano_registration.values ? mecano_registration.values.pro : (state.mecano.pro ? 'pro' : 'non_pro'),
    isMecano: state.auth.is_mecano,
    errors : state.mecano.errors
  }
}

MecanoRegistration = reduxForm({
  form: 'mecano_registration'
})(connect(mapStateToProps, mapDispatchToProps)(MecanoRegistration));

MecanoRegistration = injectIntl(MecanoRegistration);

export { MecanoRegistration };
