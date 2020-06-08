import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    counter: 0,
    showError: false
  }

  incrementCount = () => {
    const { showError } = this.state;
    if (showError) {
      this.setState({ showError: false });
    }
    this.setState({ counter: this.state.counter + 1 })
  };

  decrementCount = () => {
    const {counter} = this.state;
    if (counter === 0) {
      this.setState({ showError: true });
    }
    else {
      this.setState({ counter: counter - 1 });
    }
  };

  render() {
    const { counter, showError } = this.state;
    return (
      <div data-test='component-app'>
        <h1 data-test='counter-display'>The counter is currently {counter}</h1>
        { showError ? <h2 data-test='error'>You can't go below zero!</h2>
          : '' }
        <button
          onClick={ this.incrementCount }
          data-test='increment-button'
        >
          Increment counter
        </button>
        <button
          onClick={ this.decrementCount }
          data-test='decrement-button'
        >
          Decrement counter
        </button>
      </div>
    );
  }
}

export default App;
