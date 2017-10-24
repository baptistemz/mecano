import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, initialize, change, reset } from 'redux-form';
import PictureUpdate from '../PictureUpdate';
import { updateMecanoProfile, mecanoRegistrationError } from '../../actions/index';
import { Header, Loader, RadioButtons, Input } from '../../common/index';
import { injectIntl } from 'react-intl';
import { googleMapsAutocomplete, formatRegistrationData } from '../../utils/mecanoRegistrationUtils'
import { defaultMessages } from '../../../libs/i18n/default';

class MecanoEdit extends Component {
  componentDidMount(){
    //SET GOOGLE-PLACE-AUTOCOMPLETE ON THE ADDRESS FIELD
    var input = document.getElementById('icon_full_address');
    var options = { componentRestrictions: {country: ['fr', 'be', 'ch']} };
    googleMapsAutocomplete(input, options, this.props.dispatch, "mecano_edit", "full_address")
  }
  submit(values){
    if(values.full_address){
      values = formatRegistrationData(values, this.props.mobile, this.props.pro)
    }else{
      this.props.mecanoRegistrationError({ address: "Saisissez une addresse sous le format 'n° & rue, Ville, Pays' " });
    }
    if( values['country'] && values['city'] && values['address']){
      this.props.updateMecanoProfile(this.props.mecano_id, values, '/mecano_profile')
    }else{
      this.props.mecanoRegistrationError({ address: "Saisissez une addresse sous le format 'n° & rue, Ville, Pays' " });
    }
  }
  render(){
    const { handleSubmit, errors, pro, mobile } = this.props;
    const { formatMessage } = this.props.intl
    return (
      <div>
        <Header>Édition du profil mécano</Header>
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
              <Input icon="explore" name="full_address" label={formatMessage(defaultMessages.mecanoFullAddress)} type="text" error={errors.address} />
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
  return bindActionCreators({ updateMecanoProfile, mecanoRegistrationError }, dispatch);
}


function mapStateToProps(state) {
  const { mecano_edit } = state.form
  return {
    mobile: mecano_edit ? mecano_edit.values.mobile : (state.mecano.mobile ? 'mobile' : 'non_mobile'),
    pro: mecano_edit ? mecano_edit.values.pro : (state.mecano.pro ? 'pro' : 'non_pro'),
    mecano_id: state.mecano.id,
    mecano_edit: mecano_edit,
    initialValues: {
      pro: (state.mecano.pro ? "pro" : "non_pro"),
      mobile: (state.mecano.mobile ? "mobile" : "non_mobile"),
      radius: state.mecano.radius,
      full_address: state.mecano.full_address,
      price: state.mecano.price,
      company_name: state.mecano.company_name
    },
    errors : state.mecano.errors
  }
}

MecanoEdit = reduxForm({
  form: 'mecano_edit'
})(MecanoEdit);

MecanoEdit = injectIntl(connect(mapStateToProps, mapDispatchToProps)(MecanoEdit))

export { MecanoEdit };
