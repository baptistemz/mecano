import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm, initialize } from 'redux-form';
import PictureUpdate from '../PictureUpdate';
import { updateMecanoProfile } from '../../actions/index';
import { Header, Loader, RadioButtons, Input } from '../../common/index';

class MecanoEdit extends Component {
  componentDidMount(){
    this.handleInitialize();
    //SET GOOGLE-PLACE-AUTOCOMPLETE ON THE ADDRESS FIELD
    var input = document.getElementById('icon_full_address');
    var options = { componentRestrictions: {country: ['fr', 'be', 'ch']} };
    new google.maps.places.Autocomplete(input, options);
    //DON'T SUBMIT ON PRESS-ENTER IN AUTOCOMPLETE
    google.maps.event.addDomListener(input, 'keydown', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
      }
    });
  }
  handleInitialize() {
    const { mecano_profile } = this.props;
    const initData = {
      "pro": mecano_profile.pro ? 'professionnel' : 'passionné',
      "mobile": mecano_profile.mobile ? 'oui' : 'non',
      "full_address": `${mecano_profile.address},${mecano_profile.city},${mecano_profile.country}`,
      "radius": mecano_profile.radius,
      "price": mecano_profile.price,
      "company_name": mecano_profile.company_name
    };
    this.props.initialize(initData);
  }
  submit(values){
    if(values.full_address){
      const splitted_address = values.full_address.split(',');
      values['mobile'] = this.props.mobile;
      values['pro'] = this.props.pro;
      values['country'] = splitted_address[splitted_address.length - 1];
      values['city'] = splitted_address[splitted_address.length - 2];
      values['address'] = splitted_address[splitted_address.length - 3];
    }else{
      this.props.mecanoRegistrationError({errors: "Saisissez une addresse sous le format 'n°, rue, Ville, Pays' "});
    }
    this.props.updateMecanoProfile(this.props.mecano_profile.id, values);
  }
  render(){
    const { handleSubmit, errors, pro, mobile, mecano_profile } = this.props;
    return (
      <div>
        <Header>Édition du profil mécano</Header>
        <div className="container">
          <form onSubmit={handleSubmit(values => this.submit(values))}>
            <div className="col s12 l6 text-center">
              <br/>
              <h2>Mon profil</h2>
              <PictureUpdate/>
              <RadioButtons name="pro" label="Je suis un" options={["professionnel", "passionné"]} />
              {
                pro ?
                <div className="row">
                  <div className="col s9">
                    <Input icon="monetization_on" name="price" type="number" error={errors.rate} />
                    <Input icon="business" name="company_name" type="text" error={errors.company_name} />
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
              <Input icon="explore" name="full_address" type="text" error={errors.address} />
              <RadioButtons label="Je me déplace" name="mobile" options={["oui", "non"]} />
              {
                mobile ?
                <div className="row">
                  <div className="col s9">
                    <Input icon="explore" name="radius" type="number" error={errors.radius} />
                  </div>
                  <p className="col s3" style={{ fontSize: 17, marginTop: 24}}>km</p>
                </div>
                :
                ''
              }
            </div>
            <div className="col s12">
              <p className="red-text">{errors ? errors[0] : ''}</p>
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
  return bindActionCreators({ updateMecanoProfile }, dispatch);
}


function mapStateToProps(state) {
  const { mecano_edit } = state.form
  return {
    mobile: (mecano_edit && mecano_edit.values && (mecano_edit.values.mobile === "oui")),
    pro: (mecano_edit && mecano_edit.values && (mecano_edit.values.pro === "professionnel")),
    mecano_profile: state.mecano.mecano_profile ,
    errors : state.mecano.errors
  }
}

MecanoEdit = reduxForm({
  form: 'mecano_edit'
})(connect(mapStateToProps, mapDispatchToProps)(MecanoEdit));

export { MecanoEdit };
