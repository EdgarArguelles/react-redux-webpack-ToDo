import {expect} from 'chai';
import Utils from '../../../../../src/app/features/todo/reducers/Utils';

describe('Todo -> Reducers -> Utils', () => {
  describe('areAllTodosComplete', () => {
    it('should get false when todos list is empty', () => {
      const todos = [];

      const result = Utils.areAllTodosComplete(todos);

      expect(result).to.be.false;
    });

    it('should get false when at least a todo is not completed', () => {
      const todos = [{completed: true}, {completed: false}, {completed: true}];

      const result = Utils.areAllTodosComplete(todos);

      expect(result).to.be.false;
    });

    it('should get true when all todos are completed', () => {
      const todos = [{completed: true}, {completed: true}, {completed: true}];

      const result = Utils.areAllTodosComplete(todos);

      expect(result).to.be.true;
    });
  });
});