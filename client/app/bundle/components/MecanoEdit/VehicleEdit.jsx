import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { fetchCarMakes, selectCarMake, removeCarMake, registerDomains, updateMecanoProfile } from '../../actions/index';
import autocomplete from '../../utils/autocomplete';
import { Header, Input, RadioButtons } from '../../common/index';

class VehicleEdit extends Component {
  componentWillMount(){
    //GET CAR MAKES LIST
    this.props.fetchCarMakes()
  }
  componentDidMount(){
    const { selectCarMake, removeCarMake, car_makes_list }= this.props
    $('.chips').on('chip.add', function(e, chip){
      //DO NOT SAVE AS A CHIP IF TEXT IS NOT CONTAINED IN AUTOCOMPLETE LIST
      if(!(chip.tag in car_makes_list)){
        for(var key in e.target.children) {
          if(e.target.children.hasOwnProperty(key)){
            if( e.target.children[key].innerText === `${chip.tag}close`){
              e.target.children[key].remove()
            }
          }
        }
      }else{
        selectCarMake(chip)
      }
    });
    $('.chips').on('chip.remove', function(e, chip){
      removeCarMake(chip)
    });
  }
  componentWillReceiveProps(newProps){
    //AUTOCOMPLETE
    $('.chips').material_chip();
    $('.chips-autocomplete').material_chip({
      placeholder: 'Marques',
      secondaryPlaceholder: 'Marques',
      data: newProps.selected_car_makes,
      autocompleteOptions: {
        data: newProps.car_makes_list,
        limit: Infinity,
        minLength: 1
      }
    });
  }
  submit(values){
    const { registerDomains, updateMecanoProfile, mecano_profile, selected_car_makes } = this.props
    if(values.all_vehicles === 'certaines marques'){
      const data = []
      selected_car_makes.map((e)=> data.push({kind: "car_make", name: e.tag}))
      registerDomains(mecano_profile.id, {domains: data}, '/mecano_domains')
    }else{
      updateMecanoProfile(mecano_profile.id, { "all_vehicles": true }, '/mecano_domains')
    }
  }
  render(){
    const { handleSubmit, only_vehicle_brands } = this.props;
    return (
      <div>
        <Header>Enregistrement mécano 2/3</Header>
        <div className="container">
          <form onSubmit={handleSubmit(values => this.submit(values))}>
            <div className="col s12 l6 text-center">
              <h2>Mes domaines de compétences</h2>
              <br/>
            </div>
            <div className="col s12">
              <RadioButtons name="all_vehicles" label="Je travaille sur" options={["tous véhicules", "certaines marques"]} />
              <br/>
              {
                only_vehicle_brands ?
                  <div className="chips chips-autocomplete input-field" data-index="0" data-initialized="true">
                    <Field id="car_makes" ref="car_makes" name="car_makes" component="input" />
                  </div>
                :
                  <div style={{ display: 'none' }} className="chips chips-autocomplete input-field" data-index="0" data-initialized="true">
                    <Field id="car_makes" ref="car_makes" name="car_makes" component="input" />
                  </div>
              }
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
  return bindActionCreators({ fetchCarMakes, selectCarMake, removeCarMake, registerDomains, updateMecanoProfile }, dispatch);
}

function mapStateToProps(state) {
  const { vehicle_choice } = state.form
  return {
    car_makes_list: state.vehicle.car_makes_list,
    selected_car_makes: state.vehicle.selected_car_makes,
    only_vehicle_brands: (vehicle_choice && vehicle_choice.values && (vehicle_choice.values.all_vehicles === "certaines marques")),
    mecano_profile: state.mecano.mecano_profile
  }
}

VehicleEdit = reduxForm({
  form: 'vehicle_choice'
})(connect(mapStateToProps, mapDispatchToProps)(VehicleEdit));

export { VehicleEdit };
