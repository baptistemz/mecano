import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { fetchVehicles } from '../../actions/index';
import { Header, RadioButtons, Input } from '../../common/index';
import VehicleCreation from '../VehicleCreation';

class MecanoSearch extends Component {
  componentWillMount(){
    this.props.fetchVehicles();
  }
  componentDidMount(){
    $('ul.tabs').tabs();
    var input = document.getElementById('icon_full_address');
    var options = {};
    new google.maps.places.Autocomplete(input, options);
    //DON'T SUBMIT ON PRESS-ENTER IN AUTOCOMPLETE
    google.maps.event.addDomListener(input, 'keydown', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
      }
    });
  }
  submit(values){
    // if(values.full_address){
    //   const splitted_address = values.full_address.split(',');
    //   values['selected_vehicle'] = this.props.selected_vehicle;
    //   values['country'] = splitted_address[splitted_address.length - 1];
    //   values['city'] = splitted_address[splitted_address.length - 2];
    //   values['address'] = splitted_address[splitted_address.length - 3];
    // }else{
    //   this.props.mecanoRegistrationError({errors: "Saisissez une addresse sous le format 'n°, rue, Ville, Pays' "});
    // }
    // this.props.registerMecano(values, '/mecano_vehicles')
    console.log(values)
    console.loh(this)
  }
  vehicleDisplay(vehicle){
    return(
      <div key={vehicle.id} style={{ margin: 0 }}>
        <Field className='radioinput' name="vehicle_choice" component="input" type="radio" id={`vehicle-${vehicle.id}`} value={ `vehicle-${vehicle.id}` } />
        <label htmlFor={`vehicle-${vehicle.id}`}>{ `${vehicle.brand}, ${vehicle.model} ${vehicle.trim}, ${vehicle.year} ` }</label>
      </div>
    )
  }
  render(){
    const { handleSubmit, vehicles } = this.props
    return (
      <div>
        <Header>Recherche mécano 1/2</Header>
        <div className="container">
          <div className="row">
            <form onSubmit={handleSubmit(values => this.submit(values))}>
            <div className="col s12">
              <h2>Votre Voiture</h2>
                <ul className="tabs">
                  <li className='tab'>
                    <a href="#registered_vehicles" className= {vehicles.length === 0 ? 'disabled' : 'active'}>Véhicules enregistrés</a>
                  </li>
                  <li className="tab">
                    <a className={vehicles.length === 0 ? 'active' : ''} href="#register_vehicles">enregister un véhicule</a>
                  </li>
                </ul>
                <div id="registered_vehicles">
                  {
                    vehicles.map((vehicle)=>{
                      return this.vehicleDisplay(vehicle)
                    })
                  }
                </div>
                <div id="register_vehicles">
                  <VehicleCreation />
                </div>
              </div>
              <div className="col s12 text-center">
                <h2>Lieu de réparation</h2>
                <Input icon="explore" name="full_address" type="text" />
              </div>
              <div className="col s12">
                <p className="red-text"></p>
                <div className="space-between">
                  <div></div>
                  <a onClick={handleSubmit(values => this.submit(values))} className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">keyboard_arrow_right</i></a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchVehicles}, dispatch);
}

function mapStateToProps({vehicle}) {
  return {
    vehicles: vehicle.user_vehicles,
  }
}

MecanoSearch = reduxForm({
  form: 'domain_choice'
})(connect(mapStateToProps, mapDispatchToProps)(MecanoSearch));

export { MecanoSearch };
