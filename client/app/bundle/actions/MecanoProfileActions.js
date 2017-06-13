import axios from 'axios';
import { push } from 'react-router-redux'
import { getHeadersObject, setNextHeaders } from '../utils/tokenManagement';
import {
  MECANO_REGISTRATION_ERROR,
  REGISTERED_MECANO
} from './types';


// API CALLS

export function registerMecano(data){
  return dispatch => {
    return axios.post('/api/mecano_profiles', data)
      .then(response => {
        dispatch(push(next_path ? next_path.pathname : '/mecano_vehicle'))
        dispatch(registeredMecano(response.data.mecano_profile))
        setNextHeaders(response.headers)
      }).catch(error => {
        mecanoRegistrationError(error.response)
        setNextHeaders(response.headers)
      })
  };
};


// REDUX ACTION CREATORS

export function registeredMecano(mecano_profile) {
  return {
    type: REGISTERED_MECANO,
    mecano_profile
  };
}

export function mecanoRegistrationError(errors) {
  console.log(errors)
  if(!errors){
    return {
      type: MECANO_REGISTRATION_ERROR,
      payload: { main: "erreur d'enregistrement" }
    }
  }
  const errorGroup = {};
  Object.keys(errors).forEach(function(key,index) {
    errorGroup[key] = errors[key];
  });
}
