import ACTION_TYPES from '../actions/ActionTypes';
import Utils from './Utils';

/**
 * Handle areAllComplete actions
 * @param {Boolean} state current areAllComplete status
 * @param {Object} action action to perform
 * @param {Array} todos current todo list status
 * @return {Boolean} new areAllComplete status
 */
export default (state = false, action = {}, todos) => {
  switch (action.type) {
    case ACTION_TYPES.TODO_TOGGLE:
    case ACTION_TYPES.TODO_TOGGLE_ALL:
    case ACTION_TYPES.TODO_DESTROY:
      return Utils.areAllTodosComplete(todos);
    case ACTION_TYPES.TODO_CREATE:
    case ACTION_TYPES.TODO_DESTROY_COMPLETED:
      return false;
    default:
      return state;
  }
};