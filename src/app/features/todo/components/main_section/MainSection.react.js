import './MainSection.scss';
import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../todo_item/TodoItem.container';

export default class MainSection extends React.Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    areAllComplete: PropTypes.bool.isRequired,
    onToggleCompleteAll: PropTypes.func.isRequired
  };

  getTodosItems = () => {
    const {todos} = this.props;
    const todosItems = [];
    todos.forEach(todo => {
      todosItems.push(<TodoItem key={todo.id} todo={todo}/>);
    });
    return todosItems;
  };

  render() {
    const {areAllComplete, onToggleCompleteAll} = this.props;

    return (
      <section id="main-section">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={onToggleCompleteAll}
          checked={areAllComplete ? 'checked' : ''}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">{this.getTodosItems()}</ul>
      </section>
    );
  }
}