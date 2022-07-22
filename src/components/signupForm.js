import React, { Component } from "react";
import Toastmsg from "./toastmsg";
import Validator from "validator";
import { UserCreate } from "../API/userReqs";

class SignupForm extends Component {
 

  constructor(props) {
    super(props);
    this.state = { toastmsg: "hide", loginRespo: "",toastColor:"",username:"",password:"",confpwd:"",email:""};
  }


  passwordCheck = () => {
    if (this.state.password.length < 8 || this.state.password === "") {
      return false;
    }
    return true;
  };
  emailCheck = () => {
    if (!Validator.isEmail(this.state.email)) {
      return false;
    }
    return true;
  };


  SigninManger=(e)=>{
    e.preventDefault();
    if ((!this.state.username)||(!this.emailCheck())||(!this.passwordCheck())||(this.state.password!==this.state.confpwd)) {
        this.setState({ loginRespo: "!Pls Check Your entered Data :-( ", toastColor: "danger",toastmsg:"show",username:"",password:"",email:"" });
    } else {
      console.log(this.state.username, this.state.email, this.state.password);
      var Respo;
      UserCreate(this.state.username, this.state.email, this.state.password).then((res) => {
        Respo = res;
        console.log("inside COmp", res);
        window.sessionStorage.setItem("userState", "loged");
        window.sessionStorage.setItem("user", Respo.user.username);
        window.sessionStorage.setItem("token", Respo.token);

        this.setState({ toastmsg: "show", loginRespo: "You Are Account is created , enjoy!", toastColor: "success" });
        setTimeout(() => { this.props.onHomeChange("home"); }, 900);
      }).catch((err) => {
        console.log(err);
        this.setState({ loginRespo: " Something went Wrong  ", toastColor: "danger",toastmsg:"show",username:"",password:"",email:"" });
      });
  
    }
    setTimeout(() => {
        this.setState({ toastmsg: "hide", toastColor: "dark" });
    }, 4000);
}
  render() {
    var toastmsg = "";
    if (this.state.toastmsg === "show") {
        toastmsg = <Toastmsg showMsg={ this.state.loginRespo} bgColor={this.state.toastColor} />
    }
    return (
      <div className="container w-50  my-2 p-1 ">
        <div className="container bg-dark text-light rounded  my-4">
                <h2>Create Your Account Here</h2>
                 
        </div>
        <div className="container p-2 bg-light rounded  border border-2 shadow h-100 w-100 d-flex flex-column justify-content-center ">
          <div className="input-group flex-nowrap  mx-1 my-3">
            <span className="input-group-text" id="addon-wrapping">
              @
            </span>
            <input
              type="text"
              value={this.state.username}
                        onChange={(e) => {
                            this.setState({ username: e.target.value });
                        }}
              className="form-control "
              placeholder="Username"
              aria-label="Username"
              aria-describedby="addon-wrapping"
            />
          </div>
          <div className="input-group  h-2 flex-nowrap mx-1 my-3">
            <span className="input-group-text" id="addon-wrapping">
              email
            </span>
            <input
              type="email"
              value={this.state.email}
                        onChange={(e) => {
                            this.setState({ email: e.target.value });
                        }}
              className="form-control"
              placeholder="email"
              aria-label="email"
              aria-describedby="addon-wrapping"
            />
          </div>
          <div className="input-group  flex-nowrap mx-1 my-3">
            <span className="input-group-text" id="addon-wrapping">
              password
            </span>
            <input
              type="text"
              value={this.state.password}
                        onChange={(e) => {
                            this.setState({ password: e.target.value });
                        }}
              className="form-control"
              placeholder="password"
              aria-label="password"
              aria-describedby="addon-wrapping"
            />
          </div>
          <div className="input-group  flex-nowrap mx-1 my-3">
            <span className="input-group-text" id="addon-wrapping">
              confirm password
            </span>
            <input
              type="password"
              value={this.state.confpwd}
                        onChange={(e) => {
                            this.setState({ confpwd: e.target.value });
                        }}
              className="form-control"
              placeholder="password"
              aria-label="password"
              aria-describedby="addon-wrapping"
            />
          </div>
          <div className="input-group flex-nowrap  mx-1 my-3">
            <span className="input-group-text" id="addon-wrapping">
              #
            </span>
            <button className="btn btn-dark " onClick={(e) => { this.SigninManger(e) }}>
                         create Account
            </button>
          </div>
        </div>
        {toastmsg}
      </div>
    );
  }
}

export default SignupForm;
