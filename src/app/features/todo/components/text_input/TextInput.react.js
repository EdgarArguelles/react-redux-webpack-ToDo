import React from 'react';
import PropTypes from 'prop-types';

const ENTER_KEY_CODE = 13;

export default class TextInput extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onSave: PropTypes.func.isRequired
  };

  save = () => {
    const {onSave} = this.props;
    onSave(this.input.value);
    this.input.value = '';
  };

  onKeyDown = (event) => {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.save();
    }
  };

  render() {
    const {className, id, placeholder, value} = this.props;

    return (
      <input
        ref={node => {
          this.input = node;
        }}
        className={className}
        id={id}
        placeholder={placeholder}
        onBlur={this.save}
        onKeyDown={this.onKeyDown}
        defaultValue={value}
        autoFocus={true}
      />
    );
  }
}