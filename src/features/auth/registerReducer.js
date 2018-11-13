import {
  REGISTER_SUCCESS,
  REGISTER_SUBMITED,
  REGISTER_FAILED
} from './registerConstants';

const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, registering: false, error: null };
    case REGISTER_FAILED:
      return { ...state, registering: false, error: action.error };
    case REGISTER_SUBMITED:
      return { ...state, registering: true };
    default:
      return state;
  }
};
