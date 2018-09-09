import { UPDATE_UNDERSTANDING, RESET_FORM } from '../actions.js';

const understanding = (state = '', action) => {
  if (action.type === UPDATE_UNDERSTANDING) {
    const newState = action.payload;
    return newState;
  } else if (action.type === RESET_FORM) {
    return '';
  } else {
    return state;
  }
};

export default understanding;