/**
 * Collect all reducers and combine them.
 */
import {combineReducers} from 'redux';
import todo from './features/todo/reducers/Reducer';

export default combineReducers({
  todo
});