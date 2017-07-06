import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, change } from 'redux-form';
import { Link } from 'react-router-dom';
import { fetchVehicles, implementSearch } from '../../actions/index';
import { Header, RadioButtons, Input } from '../../common/index';
import carQueryConfig from '../../utils/carQueryConfig';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../../libs/i18n/default';

class MecanoSearch extends Component {
  componentDidMount(){
    // if(this.props.isAuthenticated){
    //   this.props.fetchVehicles();
    // }
    $('ul.tabs').tabs();
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
      triggerAutocomplete(this.getPlace().formatted_address);
    });
    const triggerAutocomplete = (value) => {
      this.props.change("mecano_search", "full_address", value)
    }
    carQueryConfig()
  }
  vehicleFields(){
    return(
      <div>
        <div className="row">
          <div className="col s12 m6 l3">
            <label htmlFor="year">Année</label>
            <select name="year" ref="year" id="year" />
          </div>
          <div className="col s12 m6 l3">
            <label htmlFor="brand">Contructeur</label>
            <select name="brand" ref="brand" id="brand" />
          </div>
          <div id="model-select-group">
            <div className="col s12 m6 l3">
              <label htmlFor="model_select">Modèle</label>
              <select name="model_select" ref="model_select" id="model_select" />
            </div>
            <div className="col s12 m6 l3">
              <label htmlFor="trim">Extension</label>
              <select name="trim" ref="trim" id="trim" />
            </div>
          </div>
          <div id="model-string-group">
            <div className="col s12 m12 l6">
              <label htmlFor="model_string">Modèle</label>
              <input name="model_string" ref="model_string" id="model_string" />
            </div>
          </div>
        </div>
        <div className="col offset-l6 s12 l6">
          <p>
            <input type="checkbox" ref="model_not_found" id="model-not-found" onChange={() => this.manageInputs()} />
            <label htmlFor="model-not-found">Je ne trouve pas mon modèle.</label>
          </p>
        </div>
      </div>
    );
  }
  manageInputs(){
    if(this.refs.model_not_found.checked){
      $('#model-select-group').css('display', 'none')
      $('#model-string-group').css('display', 'block')
    }else{
      $('#model-select-group').css('display', 'block')
      $('#model-string-group').css('display', 'none')
    }
  }
  gatherValues(){
    const {year, brand, model_select, model_string, model_not_found } = this.refs
    let trim = this.refs.trim.childNodes[0].innerHTML
    trim = (trim === "None" || model_not_found.checked) ? "" : trim;
    const model = model_not_found.checked ? model_string.value : model_select.value
    const values = {year: year.value, brand: brand.value, model , trim }
    return values
  }
  submit(values){
    values["vehicle"] = this.gatherValues();
    this.props.implementSearch(values);
  }
  vehicleDisplay(vehicle){
    return(
      <div key={vehicle.id} style={{ margin: "5px 10px" }}>
        <Field className='radioinput' name="vehicle_choice" component="input" type="radio" id={`vehicle-${vehicle.id}`} value={`${vehicle.id}`} />
        <label htmlFor={`vehicle-${vehicle.id}`}>{ `${vehicle.brand}, ${vehicle.model} ${vehicle.trim}, ${vehicle.year} ` }</label>
      </div>
    )
  }
  vehicleCreation(){
    return(
      <div>coucou</div>
    )
  }
  render(){
    const { handleSubmit, vehicles, isAuthenticated, distance } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <Header>Recherche mécano 1/2</Header>
        <div className="container">
          <div className="row">
            <form onSubmit={handleSubmit(values => this.submit(values))}>
            <div className="col s12">
              <div className="text-center">
                <h2>Ma Voiture</h2>
              </div>
                { isAuthenticated ?
                  <ul className="tabs tabs-fixed-width margin-bottom-20">
                    <li className='tab'>
                      <a onClick={() => this.setState({ registeredCar: true})} href="#registered_vehicles" className= {vehicles.length === 0 ? 'disabled' : 'active'}>Véhicules enregistrés</a>
                    </li>
                    <li className="tab">
                      <a onClick={() => this.setState({ registeredCar: false})} className={vehicles.length === 0 ? 'active' : ''} href="#register_vehicles">enregister un véhicule</a>
                    </li>
                  </ul>
                  :
                  <div></div>
                }
                <div id="registered_vehicles" className="wrap">
                  {
                    vehicles.map((vehicle)=>{
                      return this.vehicleDisplay(vehicle)
                    })
                  }
                </div>
                <div id="register_vehicles">
                  {this.vehicleFields()}
                </div>
              </div>
              <div className="col s12 text-center">
                <h2>Lieu de réparation</h2>
                <Input icon="explore" label={formatMessage(defaultMessages.mecanoFullAddress)} name="full_address" type="text" />
                <RadioButtons name="distance" value={ distance } label="" options={{"0":"À domicile", "10":"< 10 km", "50":"< 50 km"}} />
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
  return bindActionCreators({ fetchVehicles, implementSearch, change }, dispatch);
}

function mapStateToProps({vehicle, auth, search}) {
  return {
    vehicles: vehicle.user_vehicles,
    isAuthenticated: auth.isAuthenticated,
    initialValues: {distance: search.distance ? search.distance.toString() : "", full_address: search.full_address}
  }
}


MecanoSearch = reduxForm({
  form: 'mecano_search'
})(connect(mapStateToProps, mapDispatchToProps)(MecanoSearch));

MecanoSearch = injectIntl(MecanoSearch)

export { MecanoSearch };
