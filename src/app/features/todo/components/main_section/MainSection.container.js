import {connect} from 'react-redux';
import Actions from '../../actions/Actions';
import MainSection from './MainSection.react';

const mapStateToProps = (state) => {
  return {
    todos: state.todo.todos,
    areAllComplete: state.todo.areAllComplete
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleCompleteAll: () => {
      dispatch(Actions.toggleCompleteAll());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSection);