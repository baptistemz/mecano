import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { fetchCarMakes, selectCarMake, removeCarMake } from '../../actions/index';
import autocomplete from '../../utils/autocomplete';
import { Header, Input, RadioButtons, Chip } from '../../common/index';

class VehicleChoice extends Component {
  componentWillMount(){
    //GET CAR MAKES LIST
    this.props.fetchCarMakes()
  }
  componentDidUpdate(newProps){
    //AUTOCOMPLETE
    $('.chips').material_chip();
    $('.chips-autocomplete').material_chip({
      autocompleteOptions: {
        data: newProps.car_makes_list,
        limit: Infinity,
        minLength: 1
      }
    });
    //DO NOT SAVE AS A CHIP IF TEXT IS NOT CONTAINED IN AUTOCOMPLETE
    $('.chips').on('chip.add', function(e, chip){
      if(!(chip.tag in newProps.car_makes_list)){
        for(var key in e.target.children) {
          if(e.target.children.hasOwnProperty(key)){
            if( e.target.children[key].innerText === `${chip.tag}close`){
              e.target.children[key].remove()
            }
          }
        }
      }
  });
  }
  submit(values){
    console.log(values)
    console.log(this)
  }

  render(){
    const { handleSubmit, selected_car_makes } = this.props;
    console.log('in component', selected_car_makes)
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
              <RadioButtons name="all_vehicles" label="Je travaille sur" options={["tous vehicules", "certaines marques"]} />
              <br/>
              <div className="chips chips-autocomplete input-field" data-index="0" data-initialized="true">
                <Field id="car_makes" name="car_makes" component="input" />
                <label htmlFor="car_makes">Marques de véhicules</label>
              </div>
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
  return bindActionCreators({ fetchCarMakes, selectCarMake, removeCarMake }, dispatch);
}


function mapStateToProps(state) {
  return {
    car_makes_list: state.vehicle.car_makes_list,
    selected_car_makes: state.vehicle.selected_car_makes
  }
}

VehicleChoice = reduxForm({
  form: 'vehicle_choice'
})(connect(mapStateToProps, mapDispatchToProps)(VehicleChoice));

export { VehicleChoice };
