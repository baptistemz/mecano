import {
  MARK_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  mark: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case MARK_CHANGED:
      const mark = action.mark === 0 ? null : action.mark
      return { ...state, mark }
      break;
    default:
      return state;
  }
}
