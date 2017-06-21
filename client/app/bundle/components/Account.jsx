import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PictureUpdate from './PictureUpdate';
import { Header, EditableField, VehicleCard } from '../common/index';
import VehicleCreation from './VehicleCreation';
import { updateProfile, fetchVehicles, deleteVehicle } from '../actions/index';

class Account extends Component {
  componentWillMount(){
    this.props.fetchVehicles();
  }
  changeProfileField(type, text) {
    const data = {};
    data[type] = text;
    this.props.updateProfile(data);
  }
  onCardDelete(vehicle){
    this.props.deleteVehicle(vehicle.id)
  }
  render() {
    const { first_name, last_name, email, vehicles } = this.props;
    return (
      <div>
        <Header>Mon compte</Header>
        <div className="container">
          <h2>Mes informations personnelles</h2>
          <EditableField
            type="first_name"
            onSubmit={this.changeProfileField.bind(this)}
            value={first_name}
          />
          <EditableField
            type="last_name"
            onSubmit={this.changeProfileField.bind(this)}
            value={last_name}
          />
          <EditableField
            type="email"
            onSubmit={this.changeProfileField.bind(this)}
            value={email}
          />
          <PictureUpdate />
          <h2>Mes véhicules</h2>
          <div className="row">
            {vehicles.map((vehicle)=>{
              return <VehicleCard
                key={`${vehicle.brand}${vehicle.model}${vehicle.year}${vehicle.trim}`}
                year={vehicle.year}
                model={vehicle.model}
                brand={vehicle.brand}
                trim={vehicle.trim}
                onDelete={this.onCardDelete.bind(this, vehicle)}
                />
            })}
          </div>
          <VehicleCreation submit={(values) => console.log("values, values")} />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateProfile, fetchVehicles, deleteVehicle }, dispatch);
}

function mapStateToProps({ auth, vehicle }) {
  return {
    email: auth.email,
    first_name: auth.first_name,
    last_name: auth.last_name,
    vehicles: vehicle.user_vehicles
  }
}

export default connect(mapStateToProps,  mapDispatchToProps)(Account);
