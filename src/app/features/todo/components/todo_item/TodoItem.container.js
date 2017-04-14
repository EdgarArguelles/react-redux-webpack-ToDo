import {connect} from 'react-redux';
import Actions from '../../actions/Actions';
import TodoItem from './TodoItem.react';

const mapStateToProps = (state, ownProps) => {
  return {
    isEditing: state.todo.editing === parseInt(ownProps.todo.id, 10)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelect: (id) => {
      dispatch(Actions.startEditing(id));
    },
    onSave: (todo) => {
      if (todo.text) {
        dispatch(Actions.updateText(todo));
      }
      dispatch(Actions.startEditing(null));
    },
    onToggleComplete: (id) => {
      dispatch(Actions.toggleComplete(id));
    },
    onDestroy: (id) => {
      dispatch(Actions.destroy(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItem);