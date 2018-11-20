import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';

import Login from './Components/Login';
import Recipes from './Components/Recipes';
import RecipeList from './Components/RecipeList';

import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Login />
          <Recipes />
          <RecipeList />
        </div>
      </Provider>
    );
  }
}

export default App;
