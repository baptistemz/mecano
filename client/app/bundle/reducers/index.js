import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';
import MecanoRegistrationReducer from './mecano_registration_reducer';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  auth: AuthReducer,
  mecanoRegistration: MecanoRegistrationReducer,
  form: formReducer,
  toastr: toastrReducer,
  router: routerReducer
});

export default rootReducer;
