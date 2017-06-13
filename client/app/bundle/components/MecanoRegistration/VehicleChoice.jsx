import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { fetchCarMakes, selectCarMake, removeCarMake } from '../../actions/index';
import autocomplete from '../../utils/autocomplete';
import { Header, Input, RadioButtons, Chip } from '../../common/index';

class VehicleChoice extends Component {
  componentWillMount(){
    //GET CAR MAKES LIST
    this.props.fetchCarMakes()
  }
  componentDidMount(){
    //AUTOCOMPLETE
    autocomplete("car-make-input", "car-makes", this.props.car_makes_list)
  }
  submitNewCarMake(values){
    if($.inArray(values.car_make, this.props.selected_car_makes) === -1){
      this.props.selectCarMake(values.car_make)
    }
  }
  removeCarMake(value){
    this.props.removeCarMake(value)
  }

  render(){
    const { handleSubmit, car_makes_list, selected_car_makes } = this.props;
    return (
      <div>
        <Header>Enregistrement mécano 2/3</Header>
        <div className="container">
          <form onSubmit={handleSubmit(values => this.submitNewCarMake(values))}>
            <div className="col s12 l6 text-center">
              <h2>Mes domaines de compétences</h2>
              <br/>
            </div>
            <div className="col s12">
              <RadioButtons name="all_vehicles" label="Je travaille sur" options={["tous vehicules", "certaines marques"]} />
              <datalist name="car-makes" id="car-makes">
                {
                  car_makes_list.map((i)=>{
                    return <option key={i} value={i}/>
                  })
                }
              </datalist>
              <Field type="text" component="input" list="car-makes" name="car_make" id="car-make-input" onSelect={()=> console.log("oui")} />
              {
                selected_car_makes.map((i)=>{
                  return <Chip key={i} onClose={this.removeCarMake.bind(this, i)}>{i}</Chip>
                })
              }
              <div className="space-between">
                <Link to={'/mecano_signup'} className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">keyboard_arrow_left</i></Link>
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
