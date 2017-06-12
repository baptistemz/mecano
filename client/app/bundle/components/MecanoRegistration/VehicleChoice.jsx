import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { fetchCarMakes } from '../../actions/index';
import { Header, Input } from '../../common/index';

class VehicleChoice extends Component {
  componentWillMount(){
    //GET CAR MAKES LIST
    this.props.fetchCarMakes()
  }
  componentDidMount(){
    //DON'T SUBMIT ON PRESS-ENTER IN AUTOCOMPLETE

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
              <br/>
              <h2>Mes domaines de compétences</h2>
              <h3>Véhicules</h3>
            </div>
            <div className="col s12">
              <select name="car-makes" id="car-makes">
                {
                  car_makes_list.map((i)=>{
                    return <option value={i}>{i}</option>
                  })
                }
              </select>
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
