import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    counter: 0
  }

  render() {
    const { counter } = this.state;
    return (
      <div data-test='component-app'>
        <h1 data-test='counter-display'>The counter is currently {counter}</h1>
        <button
          onClick={() => this.setState({ counter: this.state.counter + 1 })}
          data-test='increment-button'
        >
          Increment counter
        </button>
      </div>
    );
  }
}

export default App;
