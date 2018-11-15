import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';

import Login from './Components/Login';

import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <hr />
          <Login />
        </div>
      </Provider>
    );
  }
}

export default App;