/**
 * Following the Flux Standard Action: https://github.com/acdlite/flux-standard-action
 */
import ACTION_TYPES from './ActionTypes';

let nextTodoId = 0;

export default class Actions {
  /**
   * Create a new ToDo
   * @param {string} text content of new ToDo
   * @return {Object} action
   */
  static create(text) {
    return {
      type: ACTION_TYPES.TODO_CREATE,
      payload: {
        id: nextTodoId++,
        text: text
      }
    };
  }

  /**
   * Prepare a ToDo item to edited
   * @param {Number} id The ID of the ToDo item to be edited
   * @return {Object} action
   */
  static startEditing(id) {
    return {
      type: ACTION_TYPES.TODO_START_EDITING,
      payload: {
        id: id
      }
    };
  }

  /**
   * Update a ToDo
   * @param {object} todo ToDo to be updated
   * @return {Object} action
   */
  static updateText(todo) {
    return {
      type: ACTION_TYPES.TODO_UPDATE,
      payload: {
        id: todo.id,
        text: todo.text
      }
    };
  }

  /**
   * Toggle a single ToDo item
   * @param {Number} id The ID of the ToDo item to be toggled
   * @return {Object} action
   */
  static toggleComplete(id) {
    return {
      type: ACTION_TYPES.TODO_TOGGLE,
      payload: {
        id: id
      }
    };
  }

  /**
   * Mark all ToDos as complete
   * @return {Object} action
   */
  static toggleCompleteAll() {
    return {
      type: ACTION_TYPES.TODO_TOGGLE_ALL
    };
  }

  /**
   * @param {string} id The ID of the ToDo item
   * @return {Object} action
   */
  static destroy(id) {
    return {
      type: ACTION_TYPES.TODO_DESTROY,
      payload: {
        id: id
      }
    };
  }

  /**
   * Delete all the completed ToDos
   * @return {Object} action
   */
  static destroyCompleted() {
    return {
      type: ACTION_TYPES.TODO_DESTROY_COMPLETED
    };
  }
}