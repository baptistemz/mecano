import axios from 'axios';
import { getHeadersObject, setNextHeaders } from '../utils/tokenManagement';
import {
  MECANO_REGISTRATION_ERROR,
  GO_TO_MECANO_REGISTRATION_STEP
} from './types';


// API CALLS

export function registerMecano(data){
  return dispatch => {
    return axios.post('/api/mecano_profiles', data)
      .then(response => {
        console.log("response", response)
        setNextHeaders(response.headers)
      }).catch(error => {
        console.log("error", error.response)
      })
  };
};


// REDUX ACTION CREATORS

export function goToNextStep() {
  return {
    type: GO_TO_MECANO_REGISTRATION_STEP,
    action: "goToNextStep"
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
