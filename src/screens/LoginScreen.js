import React, { Component } from 'react';
import AuthForm from '../ui/AuthForm';
import { login, signup, subscribeToAuthChanges } from '../api/FoodsApi';

class LoginScreen extends Component {

  state = {
    authMode: 'login'
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {

  }


  switchAuthMode = () => {
    this.setState(prevState => ({
      authMode: prevState.authMode === 'login' ? 'signup' : 'login'
    }));
  }

  render() {
    return (
      <AuthForm
        authMode={this.state.authMode}
        switchAuthMode={this.switchAuthMode}
      />
    );
  }
}


export default LoginScreen;