import React, { Component } from "react";

export default class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        style={{ width: "80%", justifyContent: "space-around",position: "relative",left:"10%",boxShadow:"4px 2px 4px gray" }}
        className="d-flex bd-highlight p-2   border rounded   border-warning bg-success my-1 text-light"
      >
        <div style={{ width: "59%" }} className="p-2  ">
          <strong style={{ width: "20%" }}>{this.props.username}</strong>🚩
          <strong style={{ width: "80%" }}>{this.props.userid}</strong>
        </div>
        <div
          style={{
            border: "2px solid gray",
            width: "17%",
            fontSize: "22px",
            color: "gray",
            fontWeight: "bold",
          }}
          className="p-2  bd-highlight"
          onMouseOver={(e) => {
            e.target.style.transitionDuration = "0.2s";
            e.target.style.fontSize = "18px";
              
          }}
          onMouseOut={(e) => {
            e.target.style.transitionDuration = "0.2s";
            e.target.style.fontSize = "22px";
              
          }}

        >
          📸
        </div>
        <div
          style={{
            border: "2px solid gray",
            width: "17%",
            fontSize: "20px",
            color: "gray",
            fontWeight: "bold",
          }}
          className="p-2  bd-highlight"

          onMouseOver={(e) => {
            e.target.style.transitionDuration = "0.2s";
            e.target.style.fontSize = "18px";
              
          }}
          onMouseOut={(e) => {
            e.target.style.transitionDuration = "0.2s";
            e.target.style.fontSize = "22px";
              
          }}
        >
          📑
        </div>
      </div>
    );
  }
}
