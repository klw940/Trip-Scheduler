import React, { Component } from "react";
import { LoginForm, User_Group, GroupProject } from "./components";
import { Route, Switch} from 'react-router-dom';
import './App.css'

class App extends Component {

  render() {
    return (
        <div className="App">
          <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route path="/:username/:groupname" component={GroupProject} />
            <Route path="/:username" component={User_Group} />
          </Switch>
        </div>
      
    );
  }
}

export default App ;
