import { expect } from '../test_helper';
import authReducer from '../../bundle/reducers/auth_reducer';
import { LOGIN_SUCCESS } from '../../bundle/actions/types'

describe('Auth Reducer', () => {
  it('Handles action of type LOGIN_SUCCESS', () => {
    const user = {
      email: "michel@michel.com",
      first_name: "michel",
      last_name: "michel",
      profile_picture: {},
      is_mecano: true,
      id: 1
    }
    const action = {
      type: LOGIN_SUCCESS,
      user
    }
    expect(authReducer({}, action)).to.deep.equal(Object.assign(user, {isAuthenticated: true, errors: {}}))
  });
});
