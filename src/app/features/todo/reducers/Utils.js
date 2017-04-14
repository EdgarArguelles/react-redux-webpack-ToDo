/**
 * Utils functions used by todo feature
 */
export default class Utils {
  /**
   * Define if all todo elements are completed
   * @param {Object} todos todo list
   * @return {Boolean} true if all elements are completed
   */
  static areAllTodosComplete(todos) {
    if (todos.length === 0) {
      return false;
    }

    for (const id in todos) {
      if (!todos[id].completed) {
        return false;
      }
    }
    return true;
  }
}