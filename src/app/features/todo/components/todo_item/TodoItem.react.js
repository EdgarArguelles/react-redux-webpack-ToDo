import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../text_input/TextInput.react';

export default class TodoItem extends React.Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onToggleComplete: PropTypes.func.isRequired,
    onDestroy: PropTypes.func.isRequired
  };

  save = (text) => {
    const {todo, onSave} = this.props;
    onSave({...todo, text: text});
  };

  select = () => {
    const {todo, onSelect} = this.props;
    if (!todo.completed) {
      onSelect(todo.id);
    }
  };

  getTextInput = () => {
    const {todo, isEditing} = this.props;
    let input;
    if (isEditing) {
      input = (
        <TextInput
          className="edit"
          onSave={this.save}
          value={todo.text}
        />
      );
    }
    return input;
  };

  render() {
    const {todo, isEditing, onToggleComplete, onDestroy} = this.props;

    const currentClassName = todo.completed ? 'completed' : isEditing ? 'editing' : '';
    return (
      <li
        key={todo.id}
        className={currentClassName}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleComplete(todo.id)}
          />
          <label onDoubleClick={this.select}>
            {todo.text}
          </label>
          <button className="destroy" onClick={() => onDestroy(todo.id)}/>
        </div>
        {this.getTextInput()}
      </li>
    );
  }
}