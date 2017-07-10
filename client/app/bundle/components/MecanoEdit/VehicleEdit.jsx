import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { fetchCarMakes, selectCarMake, removeCarMake, updateCarDomains, updateMecanoProfile } from '../../actions/index';
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
    $('.chips').material_chip({
      placeholder: 'Marques',
      secondaryPlaceholder: 'Marques',
      data: this.props.selected_car_makes,
      autocompleteOptions: {
        data: this.props.car_makes_list,
        limit: Infinity,
        minLength: 0
      }
    });
    $('.chips').on('chip.delete', function(e, chip){
      removeCarMake(chip)
    });
  }
  componentWillReceiveProps(newProps){
    //AUTOCOMPLETE
    $('.chips-autocomplete').material_chip({
      placeholder: 'Marques',
      secondaryPlaceholder: 'Marques',
      data: newProps.selected_car_makes,
      autocompleteOptions: {
        data: newProps.car_makes_list,
        limit: Infinity,
        minLength: 0
      }
    });
  }
  submit(values){
    const { updateCarDomains, updateMecanoProfile, mecano_id, selected_car_makes } = this.props
    const data = []
    if(values.all_vehicles === 'specific_brands'){
      selected_car_makes.map((make)=> data.push({kind: "car_make", value: make.tag}))
      updateMecanoProfile(mecano_id, { "all_vehicles": false }, '/mecano_profile')
      updateCarDomains(mecano_id, {domains: data})
    }else{
      updateCarDomains(mecano_id, {domains: data})
      updateMecanoProfile(mecano_id, { "all_vehicles": true }, '/mecano_profile')
    }
  }
  render(){
    const { handleSubmit, specific_brands } = this.props;
    const input_style = specific_brands ? { display: "block"} : { display: "none" };
    return (
      <div>
        <Header>Édition du profil mécano</Header>
          <div className="center-page-content">
            <div className="container">
              <form onSubmit={handleSubmit(values => this.submit(values))}>
                <div className="col s12 l6 text-center">
                  <h2>Mes domaines de compétences</h2>
                  <br/>
                </div>
                <div className="col s12">
                  <RadioButtons name="all_vehicles" label="Je travaille sur" options={{"all_vehicles": "tous véhicules", "specific_brands":"certaines marques"}} />
                  <br/>
                  {
                    specific_brands ?
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
      </div>
    );
  }
}

VehicleEdit = reduxForm({
  form: 'vehicle_edit'
})(VehicleEdit);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCarMakes, selectCarMake, removeCarMake, updateCarDomains, updateMecanoProfile }, dispatch);
}

function mapStateToProps({form, mecano, vehicle}) {
  const { vehicle_edit } = form
  return {
    car_makes_list: vehicle.car_makes_list,
    selected_car_makes: vehicle.selected_car_makes,
    specific_brands: (vehicle_edit && vehicle_edit.values && (vehicle_edit.values.all_vehicles === "specific_brands")),
    mecano_id: mecano.id,
    mecano_car_makes: mecano.car_makes,
    initialValues: { all_vehicles: mecano.all_vehicles ? "all_vehicles" : "specific_brands" }
  }
}

VehicleEdit = connect(mapStateToProps, mapDispatchToProps)(VehicleEdit)

export { VehicleEdit };
