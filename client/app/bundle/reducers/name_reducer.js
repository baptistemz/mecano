import {
  NAME_CHANGED
} from '../actions/types';

const INITIAL_STATE = { value: '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case NAME_CHANGED:
      return { ...state,
        value: action.payload
      };
    default:
      return state;
  }
}
