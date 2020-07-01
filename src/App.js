import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      showAlert: false,
    };
  }

  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">
          The counter is currently {this.state.counter}
        </h1>
        {this.state.showAlert && (
          <h3 data-test="alert" style={{ color: "red" }}>
            Counter cannot go below 0
          </h3>
        )}
        <button
          data-test="increment-button"
          onClick={() => {
            this.setState((state) => {
              if (state.counter === 0) {
                return {
                  counter: state.counter + 1,
                  showAlert: false,
                };
              }
              return { ...state, counter: state.counter + 1 };
            });
          }}
        >
          Increment counter
        </button>
        <button
          data-test="decrement-button"
          onClick={() => {
            this.setState((state) => {
              if (state.counter === 0) {
                return {
                  counter: 0,
                  showAlert: true,
                };
              }
              return { ...state, counter: state.counter - 1 };
            });
          }}
        >
          Decrement counter
        </button>
      </div>
    );
  }
}

export default App;
