import React, { Component } from "react";

export default class extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var b = "text-warning bg-";
    if (this.props.username === window.sessionStorage.getItem("user")) {
      b += "danger";
      
    } else {
      b += "primary";
    }
    
    return (
      <div
        className="shadow"
        style={{
          width: "60%",
          borderBottom: "1px solid gray",
          margin: "4%",
          borderTopRightRadius: "6px",
          
        
        }}
        
      >
        <div
          style={{
            height: "30%",
            width: "100%",
            fontSize: "10px",
            fontWeight: "bold",
            textAlign: "left",
            borderRadius: "3px",
            padding:"2px"
          }}
          className={b}
        >
          {this.props.username}
        </div>
        <div style={{ width: "100%",fontSize:"12px" }} className="text-wrap" >
          {this.props.message}
        </div>
        <div
          style={{
            height: "10%",
            width: "100%",
            fontSize: "10px",
            textAlign: "left",
          }}
        >
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    );
  }
}
