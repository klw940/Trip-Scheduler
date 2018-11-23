import React, { Component } from "react";
import { LoginForm, User_Group, GroupProject } from "./components";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

class App extends Component {

  render() {
    var username = 0;
    if(sessionStorage.getItem('Group_List')){
      username = JSON.parse(sessionStorage.getItem('Group_List'))[0].User_Name;
    }
    var authenticate = (encodeURI(username) !== window.location.href.split('/')[3]);//한글이기 때문에 인코딩된 값으로 출력됨
    return (
      <BrowserRouter>
      {/* 없는 path에 대한 접근을 막고 로그인 세션유지를 위함 */}
        {!authenticate || window.location.href===('http://localhost:3000/')
          ? <div className="App">
            {!username  //로그인 x
              ? <Route exact path="/" component={LoginForm} />
              : <Redirect to={"/" + username} />

            }
            <Switch>
              <Route path="/:username/:groupname" component={GroupProject} />
              <Route path="/:username" component={User_Group} />
            </Switch>
            </div>
          : <div>404</div>
        }
        {/* switch는 스위치안에서 선택 위에서 아래로 순서대로 확인
          exact는 정확히 해당경로만 
           */}
      </BrowserRouter>
    );
  }
}

export default App;
