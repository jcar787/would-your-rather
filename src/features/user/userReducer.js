import {
  UPDATE_USER,
  LOAD_USERS,
  LOAD_USERS_RESPONSE,
  LOAD_USERS_FAILED
} from './userConstants';

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        users: { ...state.users, [action.user.username]: action.user }
      };
    case LOAD_USERS:
      return {
        ...state,
        loadUsers: true
      };
    case LOAD_USERS_RESPONSE:
      return {
        ...state,
        loadUsers: false,
        users: action.users
      };
    case LOAD_USERS_FAILED:
      return {
        ...state,
        loadUsers: false,
        users: null
      };
    default:
      return state;
  }
};
