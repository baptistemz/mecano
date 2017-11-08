import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { fetchCarMakes, selectCarMakes, selectCarMake, removeCarMake, updateCarDomains, updateMecanoProfile } from '../../actions/index';
import { Header, Input, RadioButtons, Loader } from '../../common/index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../../libs/i18n/default';

class VehicleEdit extends Component {
  constructor(){
    super();
    this.state = { loading: false };
  }
  componentWillMount(){
    // MARK ALREADY REGISTERED CAR MAKES AS SELECTED
    this.props.selectCarMakes(this.props.mecano_car_makes)
  }
  addChip(e, chip){
    //DO NOT SAVE AS A CHIP IF TEXT IS NOT CONTAINED IN AUTOCOMPLETE LIST
    if(!(chip.tag in this.props.car_makes_list)){
      for(var key in e.target.children) {
        if(e.target.children.hasOwnProperty(key)){
          if( e.target.children[key].innerText === `${chip.tag}close`){
            e.target.children[key].remove()
          }
        }
      }
    }else{
      this.props.selectCarMake(chip)
    }
  }
  componentDidMount(){
    this.props.fetchCarMakes();
    //GET CAR MAKES LIST
    const { removeCarMake, car_makes_list }= this.props
    $('.chips').on('chip.add', (e, chip) => this.addChip(e, chip));
    $('.chips').on('chip.delete', function(e, chip){
      removeCarMake(chip)
    });
  }
  componentDidUpdate(previousProps){
    //AUTOCOMPLETE
    $('.chips-autocomplete').material_chip({
      placeholder: 'Marques',
      secondaryPlaceholder: 'Marques',
      data: this.props.selected_car_makes,
      autocompleteOptions: {
        data: this.props.car_makes_list,
        limit: Infinity,
        minLength: 0
      }
    });
  }


  submit(values){
    this.setState({ loading: true });
    const { updateCarDomains, updateMecanoProfile, mecano_id, selected_car_makes } = this.props
    let data = []
    if(values.all_vehicles === 'specific_brands'){
      selected_car_makes.map((make)=> data.push({kind: "car_make", value: make.tag}))
      updateMecanoProfile(mecano_id, { "all_vehicles": false })
      updateCarDomains(mecano_id, {domains: data})
    }else{
      updateMecanoProfile(mecano_id, { "all_vehicles": true })
      updateCarDomains(mecano_id, {domains: data})
    }
  }
  render(){
    const { handleSubmit, specific_brands } = this.props;
    const { formatMessage } = this.props.intl
    const input_style = specific_brands ? { display: "block"} : { display: "none" };
    return (
      <div>
        <Header>{formatMessage(defaultMessages.headersMecanoProfileEdit)}</Header>
        <div className="container">
          {
            this.state.loading ?
              <Loader background={true} />
            :
              <div></div>
          }
          <form onSubmit={handleSubmit(values => this.submit(values))}>
            <div className="col s12 l6 text-center">
              <h2>{formatMessage(defaultMessages.mecanoRegistrationMyDomains)}</h2>
              <br/>
            </div>
            <div className="col s12">
              <RadioButtons name="all_vehicles" label={formatMessage(defaultMessages.mecanoRegistrationIWorkOn)} options={{"all_vehicles": formatMessage(defaultMessages.mecanoRegistrationAllVehicles), "specific_brands":formatMessage(defaultMessages.mecanoRegistrationSpecificBrands)}} />
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
    );
  }
}

VehicleEdit = reduxForm({
  form: 'vehicle_edit'
})(VehicleEdit);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCarMakes, selectCarMake, selectCarMakes, removeCarMake, updateCarDomains, updateMecanoProfile }, dispatch);
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

VehicleEdit = injectIntl(connect(mapStateToProps, mapDispatchToProps)(VehicleEdit));

export { VehicleEdit };
