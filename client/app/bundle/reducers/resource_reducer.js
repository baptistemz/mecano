import {
  GOT_PROTECTED
} from '../actions/types';

const INITIAL_STATE = {
    user: {}
  };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GOT_PROTECTED:
      console.log("action.user", action.user)
      return {
        user: action.user,
      }
    default:
      return state;
  }
}
