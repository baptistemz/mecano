import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';
import ResourceReducer from './resource_reducer';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  auth: AuthReducer,
  protected_info: ResourceReducer,
  form: formReducer,
  toastr: toastrReducer,
  router: routerReducer
});

export default rootReducer;
