import { UPDATE_COMMENTS } from '../actions.js';

const comments = (state = '', action) => {
  if (action.type === UPDATE_COMMENTS) {
    const newState = action.payload;
    return newState;
  } else {
    return state;
  }
};

export default comments;