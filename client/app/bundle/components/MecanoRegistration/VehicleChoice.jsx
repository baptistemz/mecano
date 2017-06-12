import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { fetchCarMakes } from '../../actions/index';
import autocomplete from '../../utils/autocomplete';
import { Header, Input, RadioButtons } from '../../common/index';

class VehicleChoice extends Component {
  componentWillMount(){
    //GET CAR MAKES LIST
    this.props.fetchCarMakes()
  }
  componentDidMount(){
    //AUTOCOMPLETE
    autocomplete("car-make-input", "car-makes", this.props.car_makes_list)
  }
  submit(values){
    // this.props.registerMecano(values)
  }

  render(){
    const { handleSubmit, car_makes_list } = this.props;
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
              <datalist name="car-makes" id="car-makes">
                {
                  car_makes_list.map((i)=>{
                    return <option key={i} value={i}/>
                  })
                }
              </datalist>
              <input type="text" list="car-makes" id="car-make-input" />
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
  return bindActionCreators({ fetchCarMakes }, dispatch);
}


function mapStateToProps(state) {
  return {
    car_makes_list: state.vehicle.car_makes_list
  }
}

VehicleChoice = reduxForm({
  form: 'vehicle_choice'
})(connect(mapStateToProps, mapDispatchToProps)(VehicleChoice));

export { VehicleChoice };
