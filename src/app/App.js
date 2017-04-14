/**
 * It's important to note that you'll only have a single store in a Redux application.
 * When you want to split your data handling logic, you'll use reducer composition
 * instead of many stores.
 */
import '../index.html';
import '../assets/img/icon.ico';
import '../assets/img/bg.png';
import './App.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Reducers from './Reducers';
import TodoApp from './features/todo/TodoApp.react';

const store = createStore(Reducers);

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
);