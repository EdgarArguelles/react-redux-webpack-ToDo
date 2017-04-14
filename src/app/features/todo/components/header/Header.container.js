import {connect} from 'react-redux';
import Actions from '../../actions/Actions';
import Header from './Header.react';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (value) => {
      if (value) {
        dispatch(Actions.create(value));
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);