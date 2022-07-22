import React, { Component } from "react";
import Toastmsg from "./toastmsg";
import  Validator  from "validator";
import {UserLogin} from "../API/userReqs"
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toastmsg: "hide",
      loginRespo: "",
      password: "",
      email: "",
      toastColor: "dark",
    };
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

  LogniManger = (e) => {
    e.preventDefault();
    if (!this.passwordCheck()||!this.emailCheck()) {
      this.setState({
        loginRespo: "!Please Enter Correct Details :-(",
        toastColor: "danger",
        toastmsg: "show",
        email: "",
        password:"",
      });
    }
    else {
      
      UserLogin(this.state.email, this.state.password).then((res) => {
        console.log("Respo");
      console.log(res);
      window.sessionStorage.setItem("userState", "loged");
      window.sessionStorage.setItem("user", res.user.username);
      window.sessionStorage.setItem("token", res.token);
      this.setState({
        toastmsg: "show",
        loginRespo: "You Are Logged In , enjoy!",
        toastColor: "success",
      });
      setTimeout(() => { this.props.onHomeChange("home"); }, 900);

      }).catch((err) => {
        console.log(err);
        this.setState({
          loginRespo: "Something Went Wrong",
          toastColor: "danger",
          toastmsg: "show",
          email: "",
          password:"",
        });
      })
    
    }
    setTimeout(() => {
      this.setState({ toastmsg: "hide", toastColor: "dark" });
    }, 4000);
  };



  render() {
    var toastmsg = "";
    if (this.state.toastmsg === "show") {
      toastmsg = (
        <Toastmsg
          showMsg={this.state.loginRespo}
          bgColor={this.state.toastColor}
        />
      );
    }

    return (
      <form className="container w-50  my-2 p-1 " action="">
        <div className="container bg-dark text-light rounded  my-4">
          <h2>LOGIN YOUR ACCOUNT</h2>
        </div>
        <div className="container p-4 bg-light rounded  border border-2 shadow h-100 w-100 d-flex flex-column justify-content-center">
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
              type="password"
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
          <div className="input-group flex-nowrap  mx-1 my-3">
            <span className="input-group-text" id="addon-wrapping"></span>
            <button
              type="submit"
              className="btn btn-dark "
              onClick={(e) => {
                this.LogniManger(e);
              }}
            >
              Login
            </button>
          </div>
        </div>
{this.state.email}{this.state.password};
        {toastmsg}
      </form>
    );
  }
}

export default LoginForm;
