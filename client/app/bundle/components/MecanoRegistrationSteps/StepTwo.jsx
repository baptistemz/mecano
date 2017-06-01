import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { RadioButtons, Input } from '../../common/index';
import PictureUpdate from '../PictureUpdate';

class StepTwo extends Component {
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
        Step Two
      </div>
    );
  }
}

export { StepTwo };
