import React, { Component } from "react";

export default class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          width: "60%",
          justifyContent: "space-around",
          position: "relative",
          left: "10%",
          boxShadow: "4px 2px 4px gray",
         
        }}
        className="d-flex bd-highlight p-2   border rounded   border-warning bg-success my-1 text-light"
        onClick={()=>{this.props.onCalleSelect(this.props.username,this.props.userid)}}
      >
        <div
          style={{ width: "50%" }}
          className="p-2  "
          // onMouseOver={(e)=>{e.stopPropagation()}}
        >
          {this.props.username}😃
        </div>
        <div
          style={{
            border: "2px solid gray",
            width: "50%",
            fontWeight: "bold",
          }}
          className="p-2  bd-highlight"
          // onMouseOver={(e)=>{e.stopPropagation()}}
        >
          {this.props.userid}
        </div>
      </div>
    );
  }
}
