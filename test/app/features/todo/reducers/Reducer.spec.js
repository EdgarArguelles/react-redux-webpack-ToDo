import {expect} from 'chai';
import todo from '../../../../../src/app/features/todo/reducers/Reducer';

describe('Todo -> Reducers', () => {
  it('should get a todo structure with default values', () => {
    const stateExpected = {
      todos: [],
      areAllComplete: false,
      editing: null
    };

    const result = todo();
    expect(result).to.deep.equal(stateExpected);
  });
});