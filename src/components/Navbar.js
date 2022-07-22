import React, { Component } from "react";

import ProfileIcon from "./profileIcon";
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
  }


  

 

  render() {
    var leftIcon = (<div className="d-inline p-2  text-white">
      <button type="button" onClick={() => { this.props.onHomeChange("signIn") }} className="btn btn-dark text-white m-1">SignUp</button>
      <button type="button" onClick={() => { this.props.onHomeChange("login") }} className="btn btn btn-light text-dark m-1">Login</button>
    </div>);
    if (window.sessionStorage.getItem("userState")==="loged") {
         leftIcon=<ProfileIcon />
    }
    
    return (
      <nav className="navbar  navbar-dark  bg-danger  ">
        <div className=" container-fluid ">
          <div className ="d-inline p-2  text-white">
                    <a href="" className="navbar-brand " onMouseEnter={(e) => { e.target.style.color = "black" }} onMouseLeave={(e) => { e.target.style.color ="white"}} onClick={(e) => { ; e.preventDefault();  this.props.onHomeChange("home") }} >
              PRO-ALPHA
            </a>
          </div>
          {/* <div className="d-inline p-2  text-white">
                    <button type="button" onClick={()=>{this.props.onHomeChange("signIn")}} className="btn btn-dark text-white m-1">SignUp</button>
                    <button type="button" onClick={()=>{this.props.onHomeChange("login")}} className="btn btn btn-light text-dark m-1">Login</button>
          </div> */}
          {leftIcon}
        </div>
      </nav>
    );
  }
}

export default Navbar;
