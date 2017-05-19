import { combineReducers } from 'redux';
// import { reducer as toastrReducer } from 'react-redux-toastr';
// import AuthReducer from './auth_reducer';
// import MusicReducer from './music_reducer';
import AuthReducer from './auth_reducer';
import ResourceReducer from './resource_reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  protected_info: ResourceReducer,
});

export default rootReducer;
