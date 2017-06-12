import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PictureUpdate from '../PictureUpdate';
import {  } from '../../actions/index';
import { Header, Loader, RadioButtons, Input } from '../../common/index';

class VehicleChoice extends Component {
  componentDidMount(){
    //SET GOOGLE-PLACE-AUTOCOMPLETE ON THE ADDRESS FIELD
    var input = document.getElementById('searchTextField');
    var options = {componentRestrictions: {country: 'fr'}};
    new google.maps.places.Autocomplete(input, options);
    //DON'T SUBMIT ON PRESS-ENTER IN AUTOCOMPLETE
    $('body').keypress(function(e){
      if (e.keyCode == '13') {
         e.stopPropagation();
       }
    });
  }
  submit(values){
    // this.props.registerMecano(values)
  }

  render(){
    const { handleSubmit } = this.props;
    return (
      <div>
        <Header>Enregistrement mécano {step}/3</Header>
        <div className="container">
          <form onSubmit={handleSubmit(values => this.submit(values))}>
            <div className="col s12 l6 text-center">
              <br/>
              <h2>Mes domaines de compétences</h2>
              <h3>Véhicules</h3>
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
  return bindActionCreators({  }, dispatch);
}


function mapStateToProps(state) {
  return {

  }
}

VehicleChoice = reduxForm({
  form: 'vehicle_choice'
})(connect(mapStateToProps, mapDispatchToProps)(VehicleChoice));

export { VehicleChoice };
