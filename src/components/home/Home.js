import React, { Component } from "react";
import HomeUserlist from "./homeUserlist";
import socket from "../../API/socketHandler";
import UserBox from "./UserBox";
import { CallUser } from "../../API/webRtc";


class Home extends Component {

    constructor(props) {
        super(props);
      this.state = { userList: [], homeState:"",onCall:false,calledUsername:"",calledUserId:"",roomid:"" };
    }
  componentDidMount=()=> {
    socket.emit("get-user-list",socket.id,(res) => {
      this.setState({ userList: res });
      console.log(this.state.userList);
    });
    socket.on("Enter-call", (rid,username,userid) => {
      console.log("Entering Call");
      socket.emit("create-room", rid);
   this.setState({ roomid: rid, calledUsername: username, calledUserId: userid, onCall: true });  
    CallUser(userid);
    })
    socket.on("call-not-allowed", () => {
      this.setState({ onCall: false } );
    })
    socket.on("end-call", () => {
      // socket.leave(this.state.roomid);
      console.log("inside end-call");

      this.setState({ onCall: false });
    
    })


  }
  onCalleSelect=(username, userid)=>{
    console.log(username, userid, socket.id);

    socket.emit("call-made", window.sessionStorage.getItem("user"), userid,socket.id);
    this.setState({ calledUserId: userid, calledUsername: username });
  }
  onCallEnd = (userid) => {
    console.log("ending call with",userid);
    socket.emit("end-request", socket.id,userid);
    window.location.reload();
  }

  render() {

    var home = (<div>You Are Not Loged in</div>);
    if (this.state.onCall === true) {
      home = <UserBox  calledUsername={this.state.calledUsername} calledUserId={this.state.calledUserId} onCallend={this.onCallEnd} roomid={this.state.roomid}  />
    }
    else if (window.sessionStorage.getItem("userState") === "loged") {
      home = <HomeUserlist userList={this.state.userList} onCall={this.state.onCall} onCalleSelect={this.onCalleSelect} />
    }
    return (
      <center style={{width:"90%",left:"5%",position:"relative",border:"3px solid yellow"}}  >
      {home}
      </center>
    );
  }
}

export default Home;
