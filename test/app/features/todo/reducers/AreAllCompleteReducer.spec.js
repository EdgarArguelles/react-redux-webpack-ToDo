import {expect} from 'chai';
import sinon from 'sinon';
import ACTION_TYPES from '../../../../../src/app/features/todo/actions/ActionTypes';
import Utils from '../../../../../src/app/features/todo/reducers/Utils';
import areAllComplete from '../../../../../src/app/features/todo/reducers/AreAllCompleteReducer';

describe('Todo -> Reducers -> AreAllCompleteReducer', () => {
  const todos = [];

  it('should get default state when empty', () => {
    const state = false;

    const result = areAllComplete();

    expect(result).to.equal(state);
  });

  it('should get the same original status when action is not allow', () => {
    const state = true;
    const action = {type: 'invalid'};

    const result = areAllComplete(state, action, todos);

    expect(result).to.equal(state);
    // don't mutate
    expect(state).to.equal(true);
  });

  describe('evaluate areAllTodosComplete', () => {
    const state = false;
    const stateExpected = true;
    let utilsMock;

    beforeEach(() => {
      utilsMock = sinon.mock(Utils);
      utilsMock.expects('areAllTodosComplete').once().withArgs(todos).returns(stateExpected);
    });

    afterEach(() => {
      utilsMock.verify();
      utilsMock.restore();
    });

    it('should get true when action is TODO_TOGGLE', () => {
      const action = {type: ACTION_TYPES.TODO_TOGGLE};

      const result = areAllComplete(state, action, todos);

      expect(result).to.equal(stateExpected);
      // don't mutate
      expect(state).to.equal(false);
    });

    it('should get true when action is TODO_TOGGLE_ALL', () => {
      const action = {type: ACTION_TYPES.TODO_TOGGLE_ALL};

      const result = areAllComplete(state, action, todos);

      expect(result).to.equal(stateExpected);
      // don't mutate
      expect(state).to.equal(false);
    });

    it('should get true when action is TODO_DESTROY', () => {
      const action = {type: ACTION_TYPES.TODO_DESTROY};

      const result = areAllComplete(state, action, todos);

      expect(result).to.equal(stateExpected);
      // don't mutate
      expect(state).to.equal(false);
    });
  });

  it('should get false when action is TODO_CREATE', () => {
    const state = true;
    const action = {type: ACTION_TYPES.TODO_CREATE};

    const result = areAllComplete(state, action, todos);

    expect(result).to.be.false;
    // don't mutate
    expect(state).to.equal(true);
  });

  it('should get false when action is TODO_DESTROY_COMPLETED', () => {
    const state = true;
    const action = {type: ACTION_TYPES.TODO_DESTROY_COMPLETED};

    const result = areAllComplete(state, action, todos);

    expect(result).to.be.false;
    // don't mutate
    expect(state).to.equal(true);
  });
});