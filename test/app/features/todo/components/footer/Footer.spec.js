import React from 'react';
import {Provider} from 'react-redux';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import Actions from '../../../../../../src/app/features/todo/actions/Actions';
import Footer from '../../../../../../src/app/features/todo/components/footer/Footer.container';

describe('Todo -> <Footer/>', () => {
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
          todos: []
        }
      };
      const store = storeMock(state);
      wrapper = mount(<Provider store={store}>
        <Footer />
      </Provider>).find('Footer');
    });

    it('should have all props', () => {
      expect(wrapper.props().todos).to.deep.equal([]);
      expect(wrapper.props().onClearCompleted).to.be.defined;
    });

    it('should handle onClearCompleted', () => {
      actionsMock.expects('destroyCompleted').once().withArgs().returns({type: ''});

      wrapper.props().onClearCompleted();
    });
  });

  describe('react', () => {
    it('should return null when todos is empty', () => {
      const state = {
        todo: {
          todos: []
        }
      };
      const wrapper = mount(<Provider store={storeMock(state)}>
        <Footer />
      </Provider>).find('Footer');

      expect(wrapper.html()).to.be.null;
    });

    it('should have all components', () => {
      const state = {
        todo: {
          todos: [{completed: true}]
        }
      };
      const wrapper = mount(<Provider store={storeMock(state)}>
        <Footer />
      </Provider>).find('Footer');

      const footer = wrapper.find('footer');
      expect(footer).to.have.length(1);
      expect(footer.props().id).to.equal('footer');

      const span = footer.find('span');
      expect(span).to.have.length(1);
      expect(span.props().id).to.equal('todo-count');
      expect(span.find('strong')).to.have.length(1);

      const button = footer.find('button');
      expect(button).to.have.length(1);
      expect(button.props().id).to.equal('clear-completed');
    });

    describe('span label', () => {
      it('should display "1 item left" when todos has an element', () => {
        const state = {
          todo: {
            todos: [{id: 1}]
          }
        };
        const wrapper = mount(<Provider store={storeMock(state)}>
          <Footer />
        </Provider>).find('Footer');

        const span = wrapper.find('span');
        expect(span.html()).to.contain('<strong>1</strong>');
        expect(span.html()).to.contain(' item left');
      });

      it('should display "3 items left" when todos has 2 elements completed', () => {
        const state = {
          todo: {
            todos: [{id: 1}, {id: 2, completed: true}, {id: 3, completed: false}]
          }
        };
        const wrapper = mount(<Provider store={storeMock(state)}>
          <Footer />
        </Provider>).find('Footer');

        const span = wrapper.find('span');
        expect(span.html()).to.contain('<strong>2</strong>');
        expect(span.html()).to.contain(' items left');
      });
    });

    describe('clear completed button', () => {
      it('should not display button when any todo is completed', () => {
        const state = {
          todo: {
            todos: [{id: 1}]
          }
        };
        const wrapper = mount(<Provider store={storeMock(state)}>
          <Footer />
        </Provider>).find('Footer');

        const button = wrapper.find('button');
        expect(button).to.have.length(0);
      });

      it('should display button when there are some todos completed', () => {
        const state = {
          todo: {
            todos: [{id: 1}, {id: 2, completed: true}, {id: 3, completed: true}]
          }
        };
        const wrapper = mount(<Provider store={storeMock(state)}>
          <Footer />
        </Provider>).find('Footer');

        const button = wrapper.find('button');
        expect(button).to.have.length(1);
        expect(button.html()).to.contain('Clear completed');
        expect(button.html()).to.contain('2');
      });

      it('should handle button click', () => {
        const state = {
          todo: {
            todos: [{id: 1, completed: true}]
          }
        };
        const wrapper = mount(<Provider store={storeMock(state)}>
          <Footer />
        </Provider>).find('Footer');

        actionsMock.expects('destroyCompleted').once().withArgs().returns({type: ''});

        const button = wrapper.find('button');
        expect(button).to.have.length(1);
        button.simulate('click');
      });
    });
  });
});