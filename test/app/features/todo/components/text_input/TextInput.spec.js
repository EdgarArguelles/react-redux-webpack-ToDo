import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import TextInput from '../../../../../../src/app/features/todo/components/text_input/TextInput.react';

describe('Todo -> <TextInput/>', () => {
  it('should have all props', () => {
    const onSave = sinon.spy();
    const wrapper = mount(<TextInput
      onSave={onSave}
      className="class test"
      id="5"
      placeholder="placeholder test"
      value="value test"/>);

    expect(wrapper.html()).to.equal('<input class="class test" ' +
      'id="5" placeholder="placeholder test" value="value test">');

    const input = wrapper.find('input');
    expect(input).to.have.length(1);
    expect(input.props().className).to.equal('class test');
    expect(input.props().id).to.equal('5');
    expect(input.props().placeholder).to.equal('placeholder test');
    expect(input.props().defaultValue).to.equal('value test');
    expect(input.props().autoFocus).to.equal(true);
  });

  it('should handle onBlur event', () => {
    const onSave = sinon.spy();
    const wrapper = mount(<TextInput onSave={onSave}/>);

    const input = wrapper.find('input');
    input.node.value = 'test blur';
    input.simulate('blur');
    sinon.assert.calledWith(onSave, 'test blur');
    expect(input.node.value).to.equal('');
  });

  describe('onKeyDown event', () => {
    let onSave, wrapper, input;

    beforeEach(() => {
      onSave = sinon.spy();
      wrapper = mount(<TextInput onSave={onSave}/>);
      input = wrapper.find('input');
    });

    it('should handle onKeyDown event when keyCode is not 13', () => {
      input.simulate('keyDown', {keyCode: 12});
      sinon.assert.notCalled(onSave);
    });

    it('should handle onKeyDown event when keyCode is 13', () => {
      input.node.value = 'test blur';
      input.simulate('keyDown', {keyCode: 13});
      sinon.assert.calledWith(onSave, 'test blur');
      expect(input.node.value).to.equal('');
    });
  });
});