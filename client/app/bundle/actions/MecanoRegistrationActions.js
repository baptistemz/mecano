import {
  MECANO_REGISTRATION_ERROR,
  GO_TO_MECANO_REGISTRATION_STEP
} from './types';


// API CALLS

export function registerMecano(){
  return dispatch => {
  };
};


// REDUX ACTION CREATORS


export function nextStepCheck(step) {
  console.log("nextStepCheck", state)
}

export function goToStep(step) {
  return {
    type: GO_TO_MECANO_REGISTRATION_STEP,
    step
  };
}

export function registrationError(error) {
  console.log("IN ACTION", error)
  return {
    type: MECANO_REGISTRATION_ERROR,
    error: error
  };
}
