import { combineReducers } from 'redux';
// import { reducer as toastrReducer } from 'react-redux-toastr';
// import AuthReducer from './auth_reducer';
// import MusicReducer from './music_reducer';
import NameReducer from './name_reducer';

const rootReducer = combineReducers({
  name: NameReducer
});

export default rootReducer;
