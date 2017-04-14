import {expect} from 'chai';
import ACTION_TYPES from '../../../../../src/app/features/todo/actions/ActionTypes';
import Actions from '../../../../../src/app/features/todo/actions/Actions';

describe('Todo -> Actions', () => {
  it('should create an action to add a todo', () => {
    const text = 'example';

    const actionResult = Actions.create(text);

    expect(actionResult.type).to.equal(ACTION_TYPES.TODO_CREATE);
    expect(actionResult.payload.id).to.be.defined;
    expect(actionResult.payload.text).to.equal(text);
  });

  it('should create an action to starts editing process', () => {
    const id = 5;
    const actionExpected = {
      type: ACTION_TYPES.TODO_START_EDITING,
      payload: {
        id: id
      }
    };

    const actionResult = Actions.startEditing(id);

    expect(actionResult).to.deep.equal(actionExpected);
  });

  it('should create an action to update a todo', () => {
    const todo = {
      id: 5,
      text: 'test 1',
      extra: 'extra'
    };
    const actionExpected = {
      type: ACTION_TYPES.TODO_UPDATE,
      payload: {
        id: todo.id,
        text: todo.text
      }
    };

    const actionResult = Actions.updateText(todo);

    expect(actionResult).to.deep.equal(actionExpected);
  });

  it('should create an action to toggle complete flag', () => {
    const id = 5;
    const actionExpected = {
      type: ACTION_TYPES.TODO_TOGGLE,
      payload: {
        id: id
      }
    };

    const actionResult = Actions.toggleComplete(id);

    expect(actionResult).to.deep.equal(actionExpected);
  });

  it('should create an action to toggle all complete flag', () => {
    const actionExpected = {
      type: ACTION_TYPES.TODO_TOGGLE_ALL
    };

    const actionResult = Actions.toggleCompleteAll();

    expect(actionResult).to.deep.equal(actionExpected);
  });

  it('should create an action to destroy a todo', () => {
    const id = 5;
    const actionExpected = {
      type: ACTION_TYPES.TODO_DESTROY,
      payload: {
        id: id
      }
    };

    const actionResult = Actions.destroy(id);

    expect(actionResult).to.deep.equal(actionExpected);
  });

  it('should create an action to destroy all completed todos', () => {
    const actionExpected = {
      type: ACTION_TYPES.TODO_DESTROY_COMPLETED
    };

    const actionResult = Actions.destroyCompleted();

    expect(actionResult).to.deep.equal(actionExpected);
  });
});