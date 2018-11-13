import React from 'react';
import {  Grid, Header, Image } from 'semantic-ui-react';
import './style/main.css';

const LoginForm = () => (
  <div className='login-form'>
    <Grid>
        <Header className='header' as='h2'>
          <br/><br/><br/>
          <Image src='/logo.png' />
          <br/>
          Log-in to your account
        </Header>
        <br/>
    </Grid>
  </div>
)

export default LoginForm