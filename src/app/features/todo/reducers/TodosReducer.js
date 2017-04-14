import ACTION_TYPES from '../actions/ActionTypes';
import Utils from './Utils';

const create = (todos, payload) => {
  return [
    ...todos,
    {
      id: payload.id,
      text: payload.text,
      completed: false
    }
  ];
};

const update = (todos, payload) => {
  return todos.map(todo => {
    if (todo.id === payload.id) {
      return {...todo, ...payload};
    }
    return todo;
  });
};

const toggle = (todos, payload) => {
  return todos.map(todo => {
    if (todo.id === payload.id) {
      return {...todo, completed: !todo.completed};
    }
    return todo;
  });
};

const toggleAll = (todos) => {
  const newStatus = !Utils.areAllTodosComplete(todos);
  return todos.map(todo => {
    return {...todo, completed: newStatus};
  });
};

const destroy = (todos, payload) => {
  return todos.filter(todo => todo.id !== payload.id);
};

const destroyComplete = (todos) => {
  return todos.filter(todo => !todo.completed);
};

/**
 * Handle todo list actions
 * @param {Array} state current todo list status
 * @param {Object} action action to perform
 * @return {Array} new todo list status
 */
export default (state = [], action = {}) => {
  switch (action.type) {
    case ACTION_TYPES.TODO_CREATE:
      return create(state, action.payload);
    case ACTION_TYPES.TODO_UPDATE:
      return update(state, action.payload);
    case ACTION_TYPES.TODO_TOGGLE:
      return toggle(state, action.payload);
    case ACTION_TYPES.TODO_TOGGLE_ALL:
      return toggleAll(state);
    case ACTION_TYPES.TODO_DESTROY:
      return destroy(state, action.payload);
    case ACTION_TYPES.TODO_DESTROY_COMPLETED:
      return destroyComplete(state);
    default:
      return state;
  }
};