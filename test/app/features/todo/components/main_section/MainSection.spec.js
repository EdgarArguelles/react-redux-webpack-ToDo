import React from 'react';
import {Provider} from 'react-redux';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import Actions from '../../../../../../src/app/features/todo/actions/Actions';
import MainSection from '../../../../../../src/app/features/todo/components/main_section/MainSection.container';

describe('Todo -> <MainSection/>', () => {
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
      const state = {
        todo: {
          todos: [],
          areAllComplete: false
        }
      };
      const store = storeMock(state);
      wrapper = mount(<Provider store={store}>
        <MainSection />
      </Provider>).find('MainSection');
    });

    it('should have all props', () => {
      expect(wrapper.props().todos).to.deep.equal([]);
      expect(wrapper.props().areAllComplete).to.equal(false);
      expect(wrapper.props().onToggleCompleteAll).to.be.defined;
    });

    it('should handle onToggleCompleteAll action', () => {
      actionsMock.expects('toggleCompleteAll').once().withArgs().returns({type: ''});

      wrapper.props().onToggleCompleteAll();
    });
  });

  describe('react', () => {
    describe('when areAllComplete false and todos empty', () => {
      let wrapper;

      beforeEach(() => {
        const state = {
          todo: {
            todos: [],
            areAllComplete: false
          }
        };
        wrapper = mount(<Provider store={storeMock(state)}>
          <MainSection />
        </Provider>).find('MainSection');
      });

      it('should have all components', () => {
        const section = wrapper.find('section');
        expect(section).to.have.length(1);
        expect(section.props().id).to.equal('main-section');

        const input = section.find('input');
        expect(input).to.have.length(1);
        expect(input.props().id).to.equal('toggle-all');
        expect(input.props().type).to.equal('checkbox');
        expect(input.props().onChange).to.equal(wrapper.props().onToggleCompleteAll);
        expect(input.props().checked).to.equal('');

        const label = section.find('label');
        expect(label).to.have.length(1);
        expect(label.props().htmlFor).to.equal('toggle-all');
        expect(label.html()).to.contain('Mark all as complete');

        const ul = section.find('ul');
        expect(ul).to.have.length(1);
        expect(ul.props().id).to.equal('todo-list');

        const TodoItem = ul.find('TodoItem');
        expect(TodoItem).to.have.length(0);
      });

      it('should handle checkbox change', () => {
        actionsMock.expects('toggleCompleteAll').once().withArgs().returns({type: ''});

        const input = wrapper.find('input');
        input.simulate('change');
      });
    });

    describe('when areAllComplete true and todos not empty', () => {
      let wrapper;

      beforeEach(() => {
        const state = {
          todo: {
            todos: [{id: 1}, {id: 2}],
            areAllComplete: true
          }
        };
        wrapper = mount(<Provider store={storeMock(state)}>
          <MainSection />
        </Provider>).find('MainSection');
      });

      it('should have all components', () => {
        const section = wrapper.find('section');
        expect(section).to.have.length(1);
        expect(section.props().id).to.equal('main-section');

        const input = section.find('input#toggle-all');
        expect(input).to.have.length(1);
        expect(input.props().id).to.equal('toggle-all');
        expect(input.props().type).to.equal('checkbox');
        expect(input.props().onChange).to.equal(wrapper.props().onToggleCompleteAll);
        expect(input.props().checked).to.equal('checked');

        const label = section.find('label');
        expect(label.first().props().htmlFor).to.equal('toggle-all');
        expect(label.first().html()).to.contain('Mark all as complete');

        const ul = section.find('ul');
        expect(ul).to.have.length(1);
        expect(ul.props().id).to.equal('todo-list');

        const TodoItem = ul.find('TodoItem');
        expect(TodoItem).to.have.length(2);
        expect(TodoItem.first().props().todo).to.deep.equal({id: 1});
      });
    });
  });
});