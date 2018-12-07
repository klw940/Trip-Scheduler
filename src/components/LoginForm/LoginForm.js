import React, { Component } from "react";
import { Grid, Header, Image } from "semantic-ui-react";
import GoogleLogin from "react-google-login";
import "./LoginForm.css";
import { Redirect, withRouter } from "react-router-dom";
import { PostData } from "../../containers";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginError: false,
            redirect: false,
        };
    }
    componentWillMount(){
        this.props.history.push('/'); /// withrouter와 같이 써야함  develope모드(npm start)에서는 2번씩 render하기때문에 뒤로가기 2번씩 생성됨 https://github.com/erikras/react-redux-universal-hot-example/issues/429
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
                sessionStorage.setItem('username', res.w3.ig);
                sessionStorage.setItem('useremail', res.w3.U3);
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
            <Grid centered columns={2} verticalAlign='middle' className="login-form">
                <Grid.Row>
                    <Grid.Column width={6} textAlign='center'>
                        <Image src="/logo.png" centered/>
                        <Header className="header" as="h2">
                            Log-in to your account
                        </Header>
                        <GoogleLogin
                            clientId="717271903689-1elevq8nve9karftirv96uh5g20po8vp.apps.googleusercontent.com"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default withRouter(LoginForm);
