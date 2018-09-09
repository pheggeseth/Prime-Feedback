import { UPDATE_COMMENTS, RESET_FORM } from '../actions.js';

const comments = (state = '', action) => {
  if (action.type === UPDATE_COMMENTS) {
    const newState = action.payload;
    return newState;
  } else if (action.type === RESET_FORM) {
    return '';
  } else {
    return state;
  }
};

export default comments;