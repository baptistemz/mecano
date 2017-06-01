import {
  MECANO_REGISTRATION_ERROR,
  GO_TO_MECANO_REGISTRATION_STEP
} from '../actions/types';

const INITIAL_STATE = {
    errors: {},
    step: 1
  };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case MECANO_REGISTRATION_ERROR:
      const new_errors = Object.assign({}, state.errors, action.error);
      return { ...state, errors: new_errors }
    case GO_TO_MECANO_REGISTRATION_STEP:
      return { ...state, step: action.step, errors:{} }
    default:
      return state;
  }
}
