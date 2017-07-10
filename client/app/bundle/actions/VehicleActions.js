import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { setNextHeaders } from '../utils/tokenManagement';
import {
  GOT_CAR_MAKES,
  SELECTED_CAR_MAKE,
  REMOVED_CAR_MAKE,
  GOT_VEHICLES,
  CREATED_VEHICLE,
  DELETED_VEHICLE
} from './types';


// EXTERNAL API CALLS

export function fetchCarMakes(){
  return dispatch => {
    $.getJSON('https://www.carqueryapi.com/api/0.3/?callback=?', {cmd:"getMakes"}, function(data){
      if(!data.error){
        dispatch(gotCarMakes(data));
      }else{
        console.log("error", data.error);
      }
    });
  }
};

export function fetchVehicles(){
  return dispatch => {
    axios.get('/api/vehicles')
      .then(response => {
        console.log(response.headers)
        setNextHeaders(response.headers);
        dispatch(gotVehicles(response.data.vehicles));
      }).catch(error => {
        console.log("ERROR", error)
      })
  }
};

export function createVehicle(vehicle){
  return dispatch => {
    axios.post('/api/vehicles', vehicle)
      .then(response => {
        dispatch(createdVehicle(response.data.vehicle));
        toastr.success(`${vehicle.brand} ${vehicle.model} de ${vehicle.year} a bien été enregistré`);
        setNextHeaders(response.headers);
      }).catch(error => {
        console.log("ERROR", error)
      })
  }
};

export function deleteVehicle(vehicle_id){
  return dispatch => {
    axios.delete(`/api/vehicles/${vehicle_id}`)
      .then(response => {
        dispatch(deletedVehicle(response.data.vehicle));
        setNextHeaders(response.headers);
      }).catch(error => {
        console.log("ERROR", error)
      })
  }
};


// REDUX ACTION CREATORS

export function gotCarMakes(data) {
  const car_makes_list = {}
  data.Makes.map(function(i){car_makes_list[i['make_id']] = null})
  return {
    type: GOT_CAR_MAKES,
    car_makes_list
  }
}


export function selectCarMake(carMake){
  return {
    type: SELECTED_CAR_MAKE,
    carMake: carMake
  };
};
export function removeCarMake(carMake){
  return {
    type: REMOVED_CAR_MAKE,
    carMake: carMake
  };
};

export function gotVehicles(vehicles) {
  return {
    type: GOT_VEHICLES,
    vehicles
  }
}
export function createdVehicle(vehicle) {
  return {
    type: CREATED_VEHICLE,
    vehicle
  }
}
export function deletedVehicle(vehicle) {
  return {
    type: DELETED_VEHICLE,
    vehicle
  }
}
