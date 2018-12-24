import {
  REGISTER_SUCCESS,
  REGISTER_SUBMITED,
  REGISTER_FAILED
} from './registerConstants';

const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        message: 'Success. Go To Login Page'
      };
    case REGISTER_FAILED:
      return { ...state, registering: false, message: action.message };
    case REGISTER_SUBMITED:
      return { ...state, registering: true, message: '' };
    default:
      return state;
  }
};
