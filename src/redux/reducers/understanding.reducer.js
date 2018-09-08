import { UPDATE_UNDERSTANDING } from '../actions.js';

const understanding = (state = '', action) => {
  if (action.type === UPDATE_UNDERSTANDING) {
    const newState = action.payload;
    return newState;
  } else {
    return state;
  }
};

export default understanding;