import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';
import MecanoProfileReducer from './mecano_profile_reducer';
import vehicleReducer from './vehicle_reducer';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  auth: AuthReducer,
  mecano: MecanoProfileReducer,
  form: formReducer,
  vehicle: vehicleReducer,
  toastr: toastrReducer,
  router: routerReducer
});

export default rootReducer;
