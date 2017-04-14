import {expect} from 'chai';
import ACTION_TYPES from '../../../../../src/app/features/todo/actions/ActionTypes';
import editing from '../../../../../src/app/features/todo/reducers/EditingReducer';

describe('Todo -> Reducers -> EditingReducer', () => {
  it('should get default state when empty', () => {
    const state = null;

    const result = editing();

    expect(result).to.equal(state);
  });

  it('should get the same original status when action is not allow', () => {
    const state = 5;
    const action = {type: 'invalid'};

    const result = editing(state, action);

    expect(result).to.equal(state);
    // don't mutate
    expect(state).to.equal(5);
  });

  it('should get 15 when action is TODO_START_EDITING', () => {
    const state = 5;
    const stateExpected = 15;
    const action = {
      type: ACTION_TYPES.TODO_START_EDITING,
      payload: {
        id: stateExpected
      }
    };

    const result = editing(state, action);

    expect(result).to.equal(stateExpected);
    // don't mutate
    expect(state).to.equal(5);
  });
});