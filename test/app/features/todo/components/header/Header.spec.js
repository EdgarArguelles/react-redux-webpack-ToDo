import React from 'react';
import {Provider} from 'react-redux';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import Actions from '../../../../../../src/app/features/todo/actions/Actions';
import Header from '../../../../../../src/app/features/todo/components/header/Header.container';

describe('Todo -> <Header/>', () => {
  let storeMock, actionsMock;

  beforeEach(() => {
    storeMock = configureStore();
    actionsMock = sinon.mock(Actions);
  });

  afterEach(() => {
    actionsMock.verify();
    actionsMock.restore();
  });

  describe('container', () => {
    let wrapper;

    beforeEach(() => {
      const state = {};
      const store = storeMock(state);
      wrapper = mount(<Provider store={store}>
        <Header />
      </Provider>).find('Header');
    });

    it('should have all props', () => {
      expect(wrapper.props().onSave).to.be.defined;
    });

    it('should not call create action in onSave when empty', () => {
      actionsMock.expects('create').never();

      wrapper.props().onSave('');
    });

    it('should call create action in onSave when value', () => {
      actionsMock.expects('create').once().withArgs('test').returns({type: ''});

      wrapper.props().onSave('test');
    });
  });

  describe('react', () => {
    it('should have all components', () => {
      const state = {};
      const wrapper = mount(<Provider store={storeMock(state)}>
        <Header />
      </Provider>).find('Header');

      const header = wrapper.find('header');
      expect(header).to.have.length(1);
      expect(header.props().id).to.equal('header');

      const h1 = header.find('h1');
      expect(h1).to.have.length(1);
      expect(h1.html()).to.equal('<h1>TODOS</h1>');

      const TextInput = header.find('TextInput');
      expect(TextInput).to.have.length(1);
      expect(TextInput.props().id).to.equal('new-todo');
      expect(TextInput.props().placeholder).to.equal('What needs to be done?');
      expect(TextInput.props().onSave).to.equal(wrapper.props().onSave);
    });
  });
});