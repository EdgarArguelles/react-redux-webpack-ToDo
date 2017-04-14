import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {mount} from 'enzyme';
import {expect} from 'chai';
import Reducers from '../../../../src/app/Reducers';
import TodoApp from '../../../../src/app/features/todo/TodoApp.react';

describe('Todo -> <TodoApp/>', () => {
  it('should have all components', () => {
    const wrapper = mount(<Provider store={createStore(Reducers)}>
      <TodoApp />
    </Provider>);

    const div = wrapper.find('div#todo-app');
    expect(div).to.have.length(1);
    expect(div.props().id).to.equal('todo-app');
    expect(div.find('Header')).to.have.length(1);
    expect(div.find('MainSection')).to.have.length(1);
    expect(div.find('Footer')).to.have.length(1);
  });
});