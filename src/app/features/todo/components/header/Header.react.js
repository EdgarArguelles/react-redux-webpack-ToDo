import './Header.scss';
import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../text_input/TextInput.react';

export default class Header extends React.Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired
  };

  render() {
    const {onSave} = this.props;

    return (
      <header id="header">
        <h1>TODOS</h1>
        <TextInput
          id="new-todo"
          placeholder="What needs to be done?"
          onSave={onSave}
        />
      </header>
    );
  }
}