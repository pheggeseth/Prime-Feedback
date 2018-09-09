import { UPDATE_FEELING, RESET_FORM } from '../actions.js';

const feeling = (state = '', action) => {
  if (action.type === UPDATE_FEELING) {
    const newState = action.payload;
    return newState;
  } else if (action.type === RESET_FORM) {
    return '';
  } else {
    return state;
  }
};

export default feeling;