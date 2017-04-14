import React from 'react';
import {Provider} from 'react-redux';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import Actions from '../../../../../../src/app/features/todo/actions/Actions';
import TodoItem from '../../../../../../src/app/features/todo/components/todo_item/TodoItem.container';

describe('Todo -> <TodoItem/>', () => {
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
    let store;

    beforeEach(() => {
      const state = {
        todo: {
          editing: 1
        }
      };
      store = storeMock(state);
    });

    it('should have all props', () => {
      const todo = {id: 1};
      const wrapper = mount(<Provider store={store}>
        <TodoItem todo={todo}/>
      </Provider>).find('TodoItem');

      expect(wrapper.props().todo).to.deep.equal(todo);
      expect(wrapper.props().isEditing).to.equal(true);
      expect(wrapper.props().onSelect).to.be.defined;
      expect(wrapper.props().onSave).to.be.defined;
      expect(wrapper.props().onToggleComplete).to.be.defined;
      expect(wrapper.props().onDestroy).to.be.defined;
    });

    it('should set isEditing as false', () => {
      const todo = {id: 2};
      const wrapper = mount(<Provider store={store}>
        <TodoItem todo={todo}/>
      </Provider>).find('TodoItem');

      expect(wrapper.props().isEditing).to.equal(false);
    });

    describe('handle events', () => {
      let wrapper;

      beforeEach(() => {
        const todo = {id: 1};
        wrapper = mount(<Provider store={store}>
          <TodoItem todo={todo}/>
        </Provider>).find('TodoItem');
      });

      it('should handle onSelect', () => {
        actionsMock.expects('startEditing').once().withArgs(6).returns({type: ''});

        wrapper.props().onSelect(6);
      });

      it('should handle onSave when todo.text is empty', () => {
        actionsMock.expects('updateText').never();
        actionsMock.expects('startEditing').once().withArgs(null).returns({type: ''});

        wrapper.props().onSave({id: 2});
      });

      it('should handle onSave when todo.text has value', () => {
        actionsMock.expects('updateText').once().withArgs({id: 2, text: 'test'}).returns({type: ''});
        actionsMock.expects('startEditing').once().withArgs(null).returns({type: ''});

        wrapper.props().onSave({id: 2, text: 'test'});
      });

      it('should handle onToggleComplete', () => {
        actionsMock.expects('toggleComplete').once().withArgs(6).returns({type: ''});

        wrapper.props().onToggleComplete(6);
      });

      it('should handle onDestroy', () => {
        actionsMock.expects('destroy').once().withArgs(6).returns({type: ''});

        wrapper.props().onDestroy(6);
      });
    });
  });

  describe('react', () => {
    describe('when incompleted', () => {
      let wrapper;

      beforeEach(() => {
        const state = {
          todo: {
            editing: null
          }
        };
        const todo = {id: 1, text: 'test text', completed: false};
        wrapper = mount(<Provider store={storeMock(state)}>
          <TodoItem todo={todo}/>
        </Provider>).find('TodoItem');
      });

      it('should have all components', () => {
        const li = wrapper.find('li');
        expect(li).to.have.length(1);
        expect(li.props().className).to.equal('');

        const div = li.find('div');
        expect(div).to.have.length(1);

        const input = div.find('input');
        expect(input).to.have.length(1);
        expect(input.props().className).to.equal('toggle');
        expect(input.props().type).to.equal('checkbox');
        expect(input.props().checked).to.equal(false);

        const label = div.find('label');
        expect(label).to.have.length(1);
        expect(label.html()).to.contain('test text');

        const button = div.find('button');
        expect(button).to.have.length(1);
        expect(button.props().className).to.equal('destroy');

        const TextInput = wrapper.find('TextInput');
        expect(TextInput).to.have.length(0);
      });

      it('should handle checkbox change', () => {
        actionsMock.expects('toggleComplete').once().withArgs(1).returns({type: ''});

        const input = wrapper.find('input');
        input.simulate('change');
      });

      it('should handle destroy button click', () => {
        actionsMock.expects('destroy').once().withArgs(1).returns({type: ''});

        const button = wrapper.find('button');
        button.simulate('click');
      });

      it('should handle label double click', () => {
        actionsMock.expects('startEditing').once().withArgs(1).returns({type: ''});

        const label = wrapper.find('label');
        label.simulate('doubleClick');
      });
    });

    describe('when completed', () => {
      let wrapper;

      beforeEach(() => {
        const state = {
          todo: {
            editing: 2
          }
        };
        const todo = {id: 1, text: 'test text', completed: true};
        wrapper = mount(<Provider store={storeMock(state)}>
          <TodoItem todo={todo}/>
        </Provider>).find('TodoItem');
      });

      it('should have all components', () => {
        const li = wrapper.find('li');
        expect(li).to.have.length(1);
        expect(li.props().className).to.equal('completed');

        const div = li.find('div');
        expect(div).to.have.length(1);

        const input = div.find('input');
        expect(input).to.have.length(1);
        expect(input.props().className).to.equal('toggle');
        expect(input.props().type).to.equal('checkbox');
        expect(input.props().checked).to.equal(true);

        const label = div.find('label');
        expect(label).to.have.length(1);
        expect(label.html()).to.contain('test text');

        const button = div.find('button');
        expect(button).to.have.length(1);
        expect(button.props().className).to.equal('destroy');

        const TextInput = wrapper.find('TextInput');
        expect(TextInput).to.have.length(0);
      });

      it('should handle label double click', () => {
        actionsMock.expects('startEditing').never();

        const label = wrapper.find('label');
        label.simulate('doubleClick');
      });
    });

    describe('when editing', () => {
      let wrapper;

      beforeEach(() => {
        const state = {
          todo: {
            editing: 1
          }
        };
        const todo = {id: 1, text: 'test text', completed: false};
        wrapper = mount(<Provider store={storeMock(state)}>
          <TodoItem todo={todo}/>
        </Provider>).find('TodoItem');
      });

      it('should have all components', () => {
        const li = wrapper.find('li');
        expect(li).to.have.length(1);
        expect(li.props().className).to.equal('editing');

        const div = li.find('div');
        expect(div).to.have.length(1);

        const input = div.find('input');
        expect(input).to.have.length(1);
        expect(input.props().className).to.equal('toggle');
        expect(input.props().type).to.equal('checkbox');
        expect(input.props().checked).to.equal(false);

        const label = div.find('label');
        expect(label).to.have.length(1);
        expect(label.html()).to.contain('test text');

        const button = div.find('button');
        expect(button).to.have.length(1);
        expect(button.props().className).to.equal('destroy');

        const TextInput = wrapper.find('TextInput');
        expect(TextInput).to.have.length(1);
        expect(TextInput.props().className).to.equal('edit');
        expect(TextInput.props().value).to.equal('test text');
      });

      it('should handle TextInput save', () => {
        actionsMock.expects('updateText').once().withArgs({
          id: 1,
          text: 'new value',
          completed: false
        }).returns({type: ''});
        actionsMock.expects('startEditing').once().withArgs(null).returns({type: ''});

        const TextInput = wrapper.find('TextInput');
        const input = TextInput.find('input');
        input.node.value = 'new value';
        input.simulate('blur');
      });
    });
  });
});