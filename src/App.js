import React, { Component } from "react";
import { LoginForm, User_Group, GroupProject } from "./components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//import ExampleComponent from './containers/fullcalendarexample/fullcalendar.js';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={LoginForm} />
          {/* session 구현해서 직접 패스 입력해 접근하는 것 막기 */}
          <Switch>
            <Route path = "/:username/:groupid" component={GroupProject}/>
            <Route path="/:username" component={User_Group} />
          </Switch>
          {/* switch는 스위치안에서 선택 위에서 아래로 순서대로 확인
          exact는 정확히 해당경로만 
           */}
        </div>
      </BrowserRouter>
      //<ExampleComponent/>
    );
  }
}

export default App;
