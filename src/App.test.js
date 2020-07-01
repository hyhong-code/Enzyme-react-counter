import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Facotory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test value
 * @param {ShallowWrapper} wrapper  - Enzyme shallow wrapper to search within
 * @param {String} val - Value of data-test attribute for search
 * @return {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

describe("Counter", () => {
  test("renders counter display", () => {
    const wrapper = setup();
    const counterDisplay = findByTestAttr(wrapper, "counter-display");
    expect(counterDisplay.length).toBe(1);
  });

  test("counter starts at 0", () => {
    const wrapper = setup();
    const initialCounterState = wrapper.state("counter");
    expect(initialCounterState).toBe(0);
  });

  test("counter doesn't go below 0", () => {
    const counter = 0;
    const wrapper = setup(null, { counter });
    const decrementButton = findByTestAttr(wrapper, "decrement-button");
    decrementButton.simulate("click");
    wrapper.update();
    const counterDisplay = findByTestAttr(wrapper, "counter-display");
    expect(counterDisplay.text()).toContain(counter);
  });
});

describe("Increment", () => {
  test("renders increment button", () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, "increment-button");
    expect(button.length).toBe(1);
  });

  test("clicking button increments counter display", () => {
    const counter = 7;
    const wrapper = setup(null, { counter });

    // find button and click
    const button = findByTestAttr(wrapper, "increment-button");
    button.simulate("click");

    // find display and test value
    const counterDisplay = findByTestAttr(wrapper, "counter-display");
    expect(counterDisplay.text()).toContain(counter + 1);
  });
});

describe("Decrement", () => {
  test("render decrement button", () => {
    const wrapper = setup();
    const decrementButton = findByTestAttr(wrapper, "decrement-button");
    expect(decrementButton.length).toBe(1);
  });

  test("render decrement button", () => {
    const wrapper = setup();
    const decrementButton = findByTestAttr(wrapper, "decrement-button");
    expect(decrementButton.length).toBe(1);
  });
});

describe("Alert", () => {
  test("renders alert when counter at 0 and decrement button clicked", () => {
    const wrapper = setup(null, { counter: 0 });

    // find decrement button and simulate click
    const decrementButton = findByTestAttr(wrapper, "decrement-button");
    decrementButton.simulate("click");
    wrapper.update();

    // find alert and test render
    const alert = findByTestAttr(wrapper, "alert");
    expect(alert.length).toBe(1);
  });

  test("doesn't render alert when counter at 0 and increment button clicked", () => {
    // let alert show
    const wrapper = setup(null, { counter: 0, showAlert: true });

    // find increment button and simulate click
    const incrementButton = findByTestAttr(wrapper, "increment-button");
    incrementButton.simulate("click");
    wrapper.update();

    // find and test alert
    const alert = findByTestAttr(wrapper, "alert");
    expect(alert.length).toBe(0);
  });
});
