import React from 'react';
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
    console.log(response);
}

class LoginAPI extends React.Component {
    render() {
        return (
            <GoogleLogin
                clientId="1065031723084-4s4etvpbgndk46tn43ucurgmlsetrt7l.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />
        );
    }
}

export default LoginAPI;