import React, { Component } from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/loginForm';
import SignupForm from './components/signupForm';
class App extends Component {
  constructor() {
    super();
    this.state = { pageState: "home",userState:""};
  }
  onHomeBodyChange=(e)=>{
     this.setState({ pageState: e });
  }
  UserStateManager(st) {
    window.sessionStorage.setItem("userState", st);
    return;
  }


  render() {
    var home = "";
    if (this.state.pageState ==="login") {
      home = <LoginForm  onHomeChange={this.onHomeBodyChange}/>
    }
    if (this.state.pageState === 'signIn') {
      home=<SignupForm onHomeChange={this.onHomeBodyChange} />
    } 
    return (
      <React.Fragment>
        <Navbar onHomeChange={this.onHomeBodyChange} onUserStateChange={ this.UserStateManager} />
        <div className="container-fluid my-3  rounded-3 border-shadow " >
          {home}
        </div>
        </React.Fragment>
    );
  }
}

export default App;