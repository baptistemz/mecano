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
        console.log("response", response)
        dispatch(registeredMecano(response.data.mecano_profile))
        setNextHeaders(response.headers)
      }).catch(error => {
        console.log("error", error.response)
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

export function mecanoRegistrationError(error) {
  if (errors.length === 1){
    return {
      type: MECANO_REGISTRATION_ERROR,
      payload: { main: errors[0] }
    }
  }else{
    const errorGroup = {};
    Object.keys(errors).forEach(function(key,index) {
      errorGroup[key] = errors[key];
    });
    return {
      type: MECANO_REGISTRATION_ERROR,
      payload: errorGroup
    }
  }
}
