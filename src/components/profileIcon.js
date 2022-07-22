import React, { Component, Suspense } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export default class ProfileIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {username:""};
  }

  

 


  render() {
    var username = (window.sessionStorage.getItem("user")) ?window.sessionStorage.getItem("user"): "";
    return (
      <div className="d-inline   rounded-circle mx-3 text-warning " onMouseEnter={(e) => { console.log("in"); e.target.style.fontSize="25px" }} onMouseLeave={(e) => { console.log("out"); e.target.style.fontSize = "16px"}}>
        😎<b className="text-decoration-underline" > {username.toUpperCase()}</b> 
        {/* <FontAwesomeIcon onMouseEnter={(e) => { console.log("in"); e.target.style.color = "black" }} onMouseLeave={(e) => { console.log("out"); e.target.style.color = "white" }} icon={faCoffee} /> */}
      </div>  
    )
  }
}
