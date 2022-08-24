import React, { Component } from 'react';
import ListItems from './ListItems';
import socket from '../../API/socketHandler';


export default class HomeUserlist extends Component {
    constructor(props) {
      super(props);
      this.state = { callState: false, calledUsername: "", calledUserId: "" };
      this.socket = socket;
     
  }
  
  
  render() {
    return (
        <div style={{width:"60%",position:"relative"}} className="constainer w-80 d-flex flex-column bg-light shadow-lg rounded bd-highlight p-3">
        {this.props.userList.map((user) => {
          console.log(user);
          return <ListItems key={user.id} username={user.username} userid={user.id} onCalleSelect={this.props.onCalleSelect}  />
        })}
      </div>
    )
  }
}
