import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, change } from 'redux-form';
import { Link } from 'react-router-dom';
import { fetchVehicles, implementSearch, searchError } from '../../actions/index';
import { Header, RadioButtons, Input } from '../../common/index';
import carQueryConfig from '../../utils/carQueryConfig';
import { injectIntl } from 'react-intl';
import { googleMapsAutocomplete } from '../../utils/mecanoRegistrationUtils'
import { defaultMessages } from '../../../libs/i18n/default';

class MecanoSearch extends Component {
  constructor(props){
    super(props)
    this.state = { registeredCar: props.isAuthenticated && props.vehicles.length > 0 }
  }
  componentDidUpdate(newProps){
    if(newProps.vehicles != this.props.vehicles){this.setState({ registeredCar: true })}
    if(this.props.isAuthenticated){$('ul.tabs').tabs()};
    var input = document.getElementById('icon_full_address');
    var options = { componentRestrictions: {country: ['fr', 'be', 'ch']} };
    googleMapsAutocomplete(input, options, this.props.dispatch, "mecano_search", "full_address");
    carQueryConfig();
  }
  vehicleFields(){
    const {errors} = this.props;
    return(
      <div id="mecano_search">
        <div className="row">
          <div className="col s12 m6 l3">
            <label htmlFor="year">Année <span className="red-text">{errors.year ? errors.year : ''}</span></label>
            <select name="year" ref="year" id="year" />
          </div>
          <div className="col s12 m6 l3">
            <label htmlFor="brand">Contructeur <span className="red-text">{errors.brand ? errors.brand : ''}</span></label>
            <select name="brand" ref="brand" id="brand" />
          </div>
          <div id="model-select-group">
            <div className="col s12 m6 l3">
              <label htmlFor="model_select">Modèle <span className="red-text">{errors.model ? errors.model : ''}</span></label>
              <select name="model_select" ref="model_select" id="model_select" />
            </div>
            <div className="col s12 m6 l3">
              <label htmlFor="trim">Extension</label>
              <select name="trim" ref="trim" id="trim" />
            </div>
          </div>
          <div id="model-string-group">
            <div className="col s12 m12 l6">
              <label htmlFor="model_string">Modèle <span className="red-text">{errors.model ? errors.model : ''}</span></label>
              <input style={{ margin: 0 }} name="model_string" ref="model_string" id="model_string" />
            </div>
          </div>
          <div className="col offset-l6 s12 l6">
            <p>
              <input type="checkbox" ref="model_not_found" id="model-not-found" onChange={() => this.manageInputs()} />
              <label htmlFor="model-not-found">Je ne trouve pas mon modèle.</label>
            </p>
          </div>
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
  gatherVehicleValues(){
    const {year, brand, model_select, model_string, model_not_found } = this.refs
    let trim = this.refs.trim.childNodes[0].innerHTML
    trim = (trim === "None" || model_not_found.checked) ? "" : trim;
    const model = model_not_found.checked ? model_string.value : model_select.value
    const values = {year: year.value, brand: brand.value, model , trim }
    return values
  }
  submit(values){
    console.log("this.state", this.state)
    const {year, brand, model_select, model_string, model_not_found } = this.refs
    if(values.full_address && values.full_address.split(",").length > 1){
      if (this.state.registeredCar){
        console.log("values.vehicle_choice", values.vehicle_choice)
        if(!values.vehicle_choice){return this.props.searchError({ vehicle_choice: "Veuillez choisir un véhicule ou en enregistrer un nouveau" })}
        values["vehicle"] = $.grep(this.props.vehicles, function(e){ return e.id == values.vehicle_choice; })[0];
      }else{
        values["vehicle"] = this.gatherVehicleValues();
        if(!year.value){ return this.props.searchError({ year: "requis", brand: "requis", model: "requis" })};
        if(!brand.value){ return this.props.searchError({ brand: "requis", model: "requis" })};
        if(!(model_select.value || model_string)){ return this.props.searchError({ model: "requis" })};
      }
      this.props.implementSearch(values);
    }else{
      this.props.searchError({ full_address: "Saisissez au moins une ville et un pays au format 'Ville, Pays'" });
    }
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
    const { handleSubmit, vehicles, isAuthenticated, distance, errors } = this.props;
    const { formatMessage } = this.props.intl;
    console.log(errors)
    return (
      <div className="boxes-background">
        <Header>Recherche mécano 1/2</Header>
        <div className="container">
          <div className="row">
            <form onSubmit={handleSubmit(values => this.submit(values))}>
              <div className="col s12">
                <div className="box-shadow marged-20 padded-50-except-top">
                  <div className="text-center">
                    <h2>Mon véhicule</h2>
                  </div>
                  { isAuthenticated && vehicles.length > 0 ?
                    <ul className="tabs tabs-fixed-width margin-bottom-20">
                      <li className='tab'>
                        <a onClick={() => this.setState({ registeredCar: true})} href="#registered_vehicles" className= {vehicles.length === 0 ? 'disabled' : 'active'}>
                          <span className="hide-on-small-only">Véhicules enregistrés</span>
                          <span className="hide-on-med-and-up">Enregistrés</span>
                        </a>
                      </li>
                      <li className="tab">
                        <a onClick={() => this.setState({ registeredCar: false})} className={vehicles.length === 0 ? 'active' : ''} href="#register_vehicles">
                          <span className="hide-on-small-only">enregister un véhicule</span>
                          <span className="hide-on-med-and-up">nouveau</span>
                        </a>
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
                    <p className="red-text">{ errors.vehicle_choice }</p>
                  </div>
                  <div id="register_vehicles">
                    {this.vehicleFields()}
                  </div>
                </div>
                <div className="box-shadow marged-20 padded-20">
                  <div className="text-center">
                    <h2>Lieu de réparation</h2>
                  </div>
                  <Input icon="explore" label={formatMessage(defaultMessages.mecanoFullAddress)} name="full_address" type="text" error={errors.full_address} />
                  <RadioButtons name="distance" value={ distance } label="" options={{"0":"À domicile", "10":"< 10 km", "50":"< 50 km"}} />
                </div>
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
  return bindActionCreators({ fetchVehicles, implementSearch, searchError }, dispatch);
}

function mapStateToProps({vehicle, auth, search}) {
  return {
    vehicles: vehicle.user_vehicles,
    isAuthenticated: auth.isAuthenticated,
    initialValues: {distance: search.distance ? search.distance.toString() : "", full_address: search.full_address },
    errors: search.errors
  }
}


MecanoSearch = reduxForm({
  form: 'mecano_search'
})(MecanoSearch);

MecanoSearch = injectIntl(connect(mapStateToProps, mapDispatchToProps)(MecanoSearch))

export { MecanoSearch };
