import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import PictureUpdate from './PictureUpdate';
import { Header, EditableField, VehicleCard, Button, Loader } from '../common/index';
import VehicleCreation from './VehicleCreation';
import PasswordChange from './PasswordChange';
import { updateProfile, fetchVehicles, deleteVehicle, authError } from '../actions/index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../libs/i18n/default';

class Account extends Component {
  constructor(props){
    super(props);
    this.state = { loading: !props.email };
  }
  componentWillMount(){
    this.props.authError({})
  }
  componentDidUpdate(previousProps){
    if (this.props.email && !previousProps.email){this.setState({ loading: false })};
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
    const { first_name, last_name, email, vehicles, errorMessages } = this.props;
    return (
      <div className="boxes-background">
        <Header>Mon compte</Header>
        <div className="container">
          {
            this.state.loading ?
              <Loader background={true} />
            :
              <div></div>
          }
          <div className="box-shadow marged-20 padded-50-except-top">
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
                  error={errorMessages["first_name"]}
                  />
              </div>
              <div className="col s6 m4">
                <EditableField
                  label="Nom de famille"
                  type="last_name"
                  onSubmit={this.changeProfileField.bind(this)}
                  value={last_name}
                  error={errorMessages["last_name"]}
                  />
              </div>
              <div className="col s12 m4">
                <EditableField
                  label="email"
                  type="email"
                  onSubmit={this.changeProfileField.bind(this)}
                  value={email}
                  error={errorMessages["email"]}
                  />
              </div>
            </div>
            <div className="row">
              <div className="col s12 offset-m3 m6">
                <PictureUpdate />
              </div>
            </div>
          </div>
          <div className="box-shadow marged-20 padded-50-except-top">
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
          <div className="box-shadow marged-20 padded-20">
            <div className="row">
              <div className="col s12 offset-m3 m6">
                <PasswordChange errorMessages={errorMessages} />
                <br/>
              </div>
              <div className="col s12 offset-m3 m6">
                <Button fullWidth={true} icon="delete">Supprimer le compte</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateProfile, fetchVehicles, deleteVehicle, authError }, dispatch);
}

function mapStateToProps({ auth, vehicle }) {
  return {
    errorMessages: auth.errors,
    email: auth.email,
    first_name: auth.first_name,
    last_name: auth.last_name,
    vehicles: vehicle.user_vehicles
  }
}

Account = connect(mapStateToProps,  mapDispatchToProps)(Account);

export default injectIntl(Account)
