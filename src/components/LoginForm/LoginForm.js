import React, { Component } from "react";
import { Grid, Header, Image } from "semantic-ui-react";
import GoogleLogin from "react-google-login";
import "./LoginForm.css";
import { PostData } from '../../containers'
import { Redirect } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    //state는 jsx에서this.state.stateName으로 사용가능
    //constructor 에서 설정
    //component에서 this.setState({})로 수정가능
    //state사용시 초기값 설정은 필수this.setState({ redirect: true });으로 사용
    //this.signup = this.signup.bind(this); bind는 this(html)가 render에서 사용하는 this와 같다는 뜻 보통 constructor에서 지정해줌
    this.state = {
      loginError: false,
      redirect: false,
    };
  }
  signup(res, type) {
    var postData;
    if (type === "google" && res.w3.U3) {
      postData = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.El,
        token: res.Zi.access_token,
        provider_pic: res.w3.Paa
      };
    }
    if (postData) {
      PostData(postData.name, postData).then(result => {
        this.setState(postData);
        sessionStorage.setItem('Group_List', JSON.stringify(result.data));// session 저장  
        this.setState(result); //_id(Group_ID), Group_Name, User_ID, Member(Array)  4가지 변수 저장
        this.setState({ redirect: true });
      });
    };
  }
  render() {
    if (this.state.redirect) {
      return (<Redirect to={{
        pathname: "/" + this.state.name,
      }} />)
    }
    const responseGoogle = response => {
      this.signup(response, "google");
    };
    return (
      <div className="login-form">
        <Grid>
          <Header className="header" as="h2">
            <br /><br /><br />
            <Image src="/logo.png" />
            <br />
            Log-in to your account
          </Header>
          <br />
          <GoogleLogin
            clientId="717271903689-1elevq8nve9karftirv96uh5g20po8vp.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </Grid>
      </div>
    );
  }
}

export default LoginForm;
