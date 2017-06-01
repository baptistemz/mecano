import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { RadioButtons, Input } from '../../common/index';
import PictureUpdate from '../PictureUpdate';

class StepOne extends Component {
  componentDidMount(){
    //SET GOOGLE-PLACE-AUTOCOMPLETE ON THE ADDRESS FIELD
    var input = document.getElementById('searchTextField');
    var options = {componentRestrictions: {country: 'fr'}};
    new google.maps.places.Autocomplete(input, options);
  }
  render(){
    const { pro, mobile, errors } = this.props;
    return (
      <div>
        <div className="col s12 l6 text-center">
          <br/>
          <h2>Mon profil</h2>
          <PictureUpdate/>
          <RadioButtons name="pro" label="Je suis un" options={["professionnel", "passionné"]} />
          {
            pro ?
              <div className="row">
                <div className="col s9">
                  <Input icon="monetization_on" name="rate" type="number" error={errors.rate} />
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
          <Input id="searchTextField" icon="explore" name="address" type="text" placeholder="" error={errors.address} />
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
      </div>
    );
  }
}

export { StepOne };
