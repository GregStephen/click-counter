import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
  * Factory function to create a ShallowWrapper for the App component.
  * @function setup
  * @param {object} props - Component props specific to this setup.
  * @param {object} state - Initial state for setup.
  * @returns {ShallowWrapper}
*/
const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to serach within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

test('clicking increase button increments counter display by one', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  // find button and clicks
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');

  // find display and tests value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
});

test('clicking decrement button decreases counter display by one', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  // find button and clicks
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  // find display and tests value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter - 1);
});

test('clicking decrement button while state is zero shows error', () => {
  const counter = 0;
  const wrapper = setup(null, { counter });

  // find button and clicks
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  // find error and checks if exists as well as state stays at 0;
  const error = findByTestAttr(wrapper, 'error');
  const initialCounterState = wrapper.state('counter');
  expect(error.length).toBe(1) && expect(initialCounterState).toBe(0);
});

test('clicking increment button while error is show takes away error', () => {
  const counter = 0;
  const wrapper = setup(null, { counter });

  // find button and clicks
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  incrementButton.simulate('click');

  // find display and tests value
  const error = findByTestAttr(wrapper, 'error');
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1) && expect(error.length).toBe(0);
})
