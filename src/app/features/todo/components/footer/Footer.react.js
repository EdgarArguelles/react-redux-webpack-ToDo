import './Footer.scss';
import React from 'react';
import PropTypes from 'prop-types';

export default class Footer extends React.Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    onClearCompleted: PropTypes.func.isRequired
  };

  getCompleted = () => {
    const {todos} = this.props;
    let completed = 0;
    todos.forEach(todo => {
      if (todo.completed) {
        completed++;
      }
    });
    return completed;
  };

  getClearCompletedButton = (completed) => {
    const {onClearCompleted} = this.props;
    let clearCompletedButton;
    if (completed) {
      clearCompletedButton = (
        <button
          id="clear-completed"
          onClick={onClearCompleted}>
          Clear completed ({completed})
        </button>
      );
    }
    return clearCompletedButton;
  };

  render() {
    const {todos} = this.props;
    const total = todos.length;

    if (total === 0) {
      return null;
    }

    const completed = this.getCompleted();
    const itemsLeft = total - completed;
    let itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';

    return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            {itemsLeft}
          </strong>
          {itemsLeftPhrase}
        </span>
        {this.getClearCompletedButton(completed)}
      </footer>
    );
  }
}