import {connect} from 'react-redux';
import Actions from '../../actions/Actions';
import Footer from './Footer.react';

const mapStateToProps = (state) => {
  return {
    todos: state.todo.todos
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearCompleted: () => {
      dispatch(Actions.destroyCompleted());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);