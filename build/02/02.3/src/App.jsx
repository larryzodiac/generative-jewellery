// ------------------------------------------------- //
// Evan MacHale - N00150552
// 15.02.19
// ------------------------------------------------- //

import React, { Component } from 'react';
// Material Design Components

// ------------------------------------------------- //

// My Page Components
import Playground from './components/pages/Playground';
// import Account from './components/pages/Account';

// ------------------------------------------------- //

import './App.scss';

// ------------------------------------------------- //

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Playground />
      </React.Fragment>
    );
  }
}

// ------------------------------------------------- //

export default App;

// ------------------------------------------------- //
