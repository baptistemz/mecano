import {
  NAME_CHANGED
} from './types';

export function updateName(name) {
  return (dispatch) => {
    dispatch({
      type: NAME_CHANGED,
      payload: name
    });
  };
}
