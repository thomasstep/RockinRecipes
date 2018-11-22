import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';

import Login from './Components/Login';
import Recommendations from './Components/Recommendations';
import RecipeList from './Components/RecipeList';

import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Login />
          <Recommendations />
          <RecipeList />
        </div>
      </Provider>
    );
  }
}

export default App;
