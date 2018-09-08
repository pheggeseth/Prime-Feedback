import { UPDATE_FEELING } from '../actions.js';

const feeling = (state = '', action) => {
  if (action.type === UPDATE_FEELING) {
    const newState = action.payload;
    return newState;
  } else {
    return state;
  }
};

export default feeling;