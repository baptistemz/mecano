import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import PictureUpdate from './PictureUpdate';
import { Header, EditableField, VehicleCard } from '../common/index';
import VehicleCreation from './VehicleCreation';
import { updateProfile, fetchVehicles, deleteVehicle } from '../actions/index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../libs/i18n/default';

class Account extends Component {
  componentDidMount(){
    // console.log("one call")
    // this.props.fetchVehicles();
  }
  changeProfileField(type, text) {
    const next_path = this.props.location.state ? this.props.location.state.from : null
    const { formatMessage } = this.props.intl
    const data = {};
    data[type] = text;
    const key =  formatMessage(defaultMessages[_.camelCase('user_' + type)])
    this.props.updateProfile(data, `Votre ${key} a bien été mis à jour pour "${text}"`, next_path);
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
          <div className="text-center">
            <h2>Mes infos personnelles</h2>
          </div>
          <div className="row">
            <div className="col s6 m4">
              <EditableField
                label="prénom"
                type="first_name"
                onSubmit={this.changeProfileField.bind(this)}
                value={first_name}
                />
            </div>
            <div className="col s6 m4">
              <EditableField
                label="Nom de famille"
                type="last_name"
                onSubmit={this.changeProfileField.bind(this)}
                value={last_name}
                />
            </div>
            <div className="col s12 m4">
              <EditableField
                label="email"
                type="email"
                onSubmit={this.changeProfileField.bind(this)}
                value={email}
                />
            </div>
          </div>
          <PictureUpdate />
          <br/>
          <div className="text-center">
            <h2>Mes véhicules</h2>
          </div>
          <div className="row">
            {vehicles.map((vehicle)=>{
              return <VehicleCard
                key={`${vehicle.id}`}
                id={`${vehicle.id}`}
                year={vehicle.year}
                model={vehicle.model}
                brand={vehicle.brand}
                trim={vehicle.trim}
                onDelete={this.onCardDelete.bind(this, vehicle)}
                />
            })}
          </div>
          <VehicleCreation wholeForm={true} />
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

Account = connect(mapStateToProps,  mapDispatchToProps)(Account);

export default injectIntl(Account)
