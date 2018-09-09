import { UPDATE_SUPPORT, RESET_FORM } from '../actions.js';

const support = (state = '', action) => {
  if (action.type === UPDATE_SUPPORT) {
    const newState = action.payload;
    return newState;
  } else if (action.type === RESET_FORM) {
    return '';
  } else {
    return state;
  }
};

export default support;