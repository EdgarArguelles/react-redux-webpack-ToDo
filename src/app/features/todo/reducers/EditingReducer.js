import ACTION_TYPES from '../actions/ActionTypes';

const startEditing = (editing, payload) => {
  return payload.id;
};

/**
 * Handle editing actions
 * @param {Number} state current editing status
 * @param {Object} action action to perform
 * @return {Number} new editing status
 */
export default (state = null, action = {}) => {
  switch (action.type) {
    case ACTION_TYPES.TODO_START_EDITING:
      return startEditing(state, action.payload);
    default:
      return state;
  }
};