import React, { Component } from 'react';
import LoginAPI from './LoginAPI.js';
import LoginForm from '../containers/LoginForm.js';


class App extends Component {
  render() {
    return (
      <div className='App'>
        <LoginForm/>
        <LoginAPI/>
      </div>
    );
  }
}

export default App;
