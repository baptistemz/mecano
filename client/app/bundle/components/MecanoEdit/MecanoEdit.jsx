import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm, initialize, change } from 'redux-form';
import PictureUpdate from '../PictureUpdate';
import { updateMecanoProfile } from '../../actions/index';
import { Header, Loader, RadioButtons, Input } from '../../common/index';

class MecanoEdit extends Component {
  componentDidMount(){
    //SET GOOGLE-PLACE-AUTOCOMPLETE ON THE ADDRESS FIELD
    var input = document.getElementById('icon_full_address');
    var options = { componentRestrictions: {country: ['fr', 'be', 'ch']} };
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    //DON'T SUBMIT ON PRESS-ENTER IN AUTOCOMPLETE
    google.maps.event.addDomListener(input, 'keydown', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
      }
    });
    // Change value on autocomplete click
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      triggerAutocomplete(this.getPlace().formatted_address)
    });
    const triggerAutocomplete = (value) => {
      this.props.change('mecano_edit', 'full_address', value)
    }
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
    this.props.updateMecanoProfile(this.props.mecano_id, values);
  }
  render(){
    const { handleSubmit, errors, pro, mobile } = this.props;
    console.log(this.props.initialValues)
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
              <RadioButtons label="Je me déplace" name="mobile" options={{"mobile": "oui", "non_mobile": "non"}} />
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

MecanoEdit = reduxForm({
  form: 'mecano_edit'
})(MecanoEdit);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateMecanoProfile, change }, dispatch);
}


function mapStateToProps(state) {
  const { mecano_edit } = state.form
  return {
    mobile: (mecano_edit && mecano_edit.values && (mecano_edit.values.mobile === "mobile")),
    pro: (mecano_edit && mecano_edit.values && (mecano_edit.values.pro === "pro")),
    mecano_id: state.mecano.id,
    initialValues: {
      pro: state.mecano.pro ? "pro" : "non_pro",
      mobile: state.mecano.mobile ? "mobile" : "non_mobile",
      radius: state.mecano.radius,
      full_address: state.mecano.full_address,
      price: state.mecano.price,
      company_name: state.mecano.company_name
    },
    errors : state.mecano.errors
  }
}

MecanoEdit = connect(mapStateToProps, mapDispatchToProps)(MecanoEdit)

export { MecanoEdit };
