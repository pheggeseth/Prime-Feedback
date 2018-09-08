import { UPDATE_SUPPORT } from '../actions.js';

const support = (state = '', action) => {
  if (action.type === UPDATE_SUPPORT) {
    const newState = action.payload;
    return newState;
  } else {
    return state;
  }
};

export default support;