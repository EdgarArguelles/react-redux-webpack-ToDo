import {expect} from 'chai';
import sinon from 'sinon';
import ACTION_TYPES from '../../../../../src/app/features/todo/actions/ActionTypes';
import Utils from '../../../../../src/app/features/todo/reducers/Utils';
import todos from '../../../../../src/app/features/todo/reducers/TodosReducer';

describe('Todo -> Reducers -> TodosReducer', () => {
  it('should get default state when empty', () => {
    const state = [];

    const result = todos();

    expect(result).to.deep.equal(state);
  });

  it('should get the same original status when action is not allow', () => {
    const state = [{id: 5}];
    const action = {type: 'invalid'};

    const result = todos(state, action);

    expect(result).to.deep.equal(state);
    // don't mutate
    expect(state).to.deep.equal([{id: 5}]);
  });

  it('should add a todo element to todo list when action is TODO_CREATE', () => {
    const todo = {
      id: 15,
      text: 'test'
    };
    const state = [{id: 5}];
    const stateExpected = [...state, {
      id: todo.id,
      text: todo.text,
      completed: false
    }];
    const action = {
      type: ACTION_TYPES.TODO_CREATE,
      payload: todo
    };

    const result = todos(state, action);

    expect(result).to.deep.equal(stateExpected);
    // don't mutate
    expect(state).to.deep.equal([{id: 5}]);
  });

  it('should update a todo element when action is TODO_UPDATE', () => {
    const todo = {
      id: 15,
      text: 'test2'
    };
    const state = [{id: 5}, {
      id: todo.id,
      text: 'all text',
      completed: false
    }];
    const stateExpected = [{id: 5}, {
      id: todo.id,
      text: todo.text,
      completed: false
    }];
    const action = {
      type: ACTION_TYPES.TODO_UPDATE,
      payload: todo
    };

    const result = todos(state, action);

    expect(result).to.deep.equal(stateExpected);
    // don't mutate
    expect(state).to.deep.equal([{id: 5}, {
      id: todo.id,
      text: 'all text',
      completed: false
    }]);
  });

  it('should toggle a todo completed flag when action is TODO_TOGGLE', () => {
    const id = 15;
    const state = [{id: 5}, {
      id: id,
      text: 'test',
      completed: false
    }];
    const stateExpected = [{id: 5}, {
      id: id,
      text: 'test',
      completed: true
    }];
    const action = {
      type: ACTION_TYPES.TODO_TOGGLE,
      payload: {
        id: id
      }
    };

    const result = todos(state, action);

    expect(result).to.deep.equal(stateExpected);
    // don't mutate
    expect(state).to.deep.equal([{id: 5}, {
      id: id,
      text: 'test',
      completed: false
    }]);
  });

  it('should toggle all completed flags when action is TODO_TOGGLE_ALL', () => {
    const state = [{
      id: 5,
      text: 'test',
      completed: true
    }, {
      id: 15,
      text: 'test 2',
      completed: false
    }];
    const stateExpected = [{
      id: 5,
      text: 'test',
      completed: true
    }, {
      id: 15,
      text: 'test 2',
      completed: true
    }];
    const action = {
      type: ACTION_TYPES.TODO_TOGGLE_ALL
    };
    const utilsMock = sinon.mock(Utils);
    utilsMock.expects('areAllTodosComplete').once().withArgs(state).returns(false);

    const result = todos(state, action);

    expect(result).to.deep.equal(stateExpected);
    utilsMock.verify();
    utilsMock.restore();
    // don't mutate
    expect(state).to.deep.equal([{
      id: 5,
      text: 'test',
      completed: true
    }, {
      id: 15,
      text: 'test 2',
      completed: false
    }]);
  });

  it('should destroy a todo flag element when action is TODO_DESTROY', () => {
    const id = 15;
    const state = [{id: 5}, {
      id: id,
      text: 'test',
      completed: false
    }];
    const stateExpected = [{id: 5}];
    const action = {
      type: ACTION_TYPES.TODO_DESTROY,
      payload: {
        id: id
      }
    };

    const result = todos(state, action);

    expect(result).to.deep.equal(stateExpected);
    // don't mutate
    expect(state).to.deep.equal([{id: 5}, {
      id: id,
      text: 'test',
      completed: false
    }]);
  });

  it('should destroy all completed todos when action is TODO_DESTROY_COMPLETED', () => {
    const state = [{
      id: 5,
      text: 'test',
      completed: true
    }, {
      id: 15,
      text: 'test 2',
      completed: false
    }];
    const stateExpected = [{
      id: 15,
      text: 'test 2',
      completed: false
    }];
    const action = {
      type: ACTION_TYPES.TODO_DESTROY_COMPLETED
    };

    const result = todos(state, action);

    expect(result).to.deep.equal(stateExpected);
    // don't mutate
    expect(state).to.deep.equal([{
      id: 5,
      text: 'test',
      completed: true
    }, {
      id: 15,
      text: 'test 2',
      completed: false
    }]);
  });
});