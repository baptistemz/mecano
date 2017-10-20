import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import {reset} from 'redux-form';
import { getHeadersObject, setNextHeaders } from '../utils/tokenManagement';
import {
  MECANO_REGISTRATION_ERROR,
  REGISTERED_MECANO,
  UPDATED_MECANO,
  GOT_MECANO
} from './types';


// API CALLS

export function registerMecano(data, next_path){
  return dispatch => {
    return axios.post('/api/mecano_profiles', data)
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(registeredMecano(response.data.mecano_profile))
        dispatch(push(next_path ? next_path : '/mecano_vehicles'))
      }).catch(error => {
        console.log(error)
        dispatch(mecanoRegistrationError(error.response.data.errors));
        setNextHeaders(error.response.headers)
      })
  };
};

export function updateMecanoProfile(id, data, next_path){
  return dispatch => {
    return axios.put(`/api/mecano_profiles/${id}`, data)
      .then(response => {
        console.log(response)
        dispatch(updatedMecano(response.data.mecano_profile))
        setNextHeaders(response.headers)
        if(next_path){dispatch(push(next_path))};
      }).catch(error => {
        dispatch(mecanoRegistrationError(error.response.data.errors));
        setNextHeaders(error.response.headers)
      })
  };
};

export function fetchMecanoProfile(id){
  return dispatch => {
    axios.get(`/api/mecano_profiles/${id}`)
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(gotMecanoProfile(response.data));
      }).catch(error => {
        console.log("ERROR", error)
      })
  }
};


// REDUX ACTION CREATORS

export function registeredMecano(mecano_profile) {
  return {
    type: REGISTERED_MECANO,
    mecano_profile
  };
}

export function updatedMecano(mecano_profile) {
  return {
    type: UPDATED_MECANO,
    mecano_profile
  };
}

export function gotMecanoProfile(data) {
  return {
    type: GOT_MECANO,
    data
  };
}

export function mecanoRegistrationError(errors) {
  if(errors){
    let errorsGroup = {};
    Object.keys(errors).forEach(function(key,index) {
      if(typeof errors[key] === 'object'){
        errors[key].map((arrayEl) => { errorsGroup[key] = arrayEl })
      }else{
        errorsGroup[key] = errors[key]
      };
    });
    console.log('errorsGroup', errorsGroup)
    return {
      type: MECANO_REGISTRATION_ERROR,
      payload: errorsGroup
    }
  }else{
    return {
      type: MECANO_REGISTRATION_ERROR,
      payload: { main: "erreur d'enregistrement" }
    }
  }
}
