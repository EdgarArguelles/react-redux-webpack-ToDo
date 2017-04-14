/**
 * Given the same arguments, it should calculate the next state and return it.
 * No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
import todos from './TodosReducer';
import areAllComplete from './AreAllCompleteReducer';
import editing from './EditingReducer';

/**
 * Handle todo section actions
 * @param {Object} state current todo section status
 * @param {Object} action action to perform
 * @return {Object} new todo section status
 */
export default (state = {}, action = {}) => {
  const newTodos = todos(state.todos, action);
  return {
    todos: newTodos,
    areAllComplete: areAllComplete(state.areAllComplete, action, newTodos),
    editing: editing(state.editing, action)
  };
};