import React, { Component } from "react";
import HomeUserlist from "./homeUserlist";
import socket from "../../API/socketHandler";
import UserBox from "./UserBox";
import { CallUser } from "../../API/webRtc";


class Home extends Component {

    constructor(props) {
        super(props);
      this.state = { userList: [], homeState:"",onCall:false,calledUsername:"",calledUserId:"",roomid:"",calling:false,msg:""};
    }
  componentDidMount=()=> {
    socket.emit("get-user-list",socket.id,(res) => {
      this.setState({ userList: res });
      console.log(this.state.userList);
    });
    window.sessionStorage.setItem("oncall", false);
    socket.on("Enter-call", (rid,username,userid) => {
      console.log("Entering Call");
      socket.emit("create-room", rid);
      this.setState({ roomid: rid, calledUsername: username, calledUserId: userid, onCall: true, msg: "starting call...." });  
      setTimeout(() => {
        this.setState({ msg: "" });
      }, 3000);
      window.sessionStorage.setItem("oncall", true);
    })
    socket.on("call-not-allowed", () => {
      this.setState({ onCall: false,msg:"call not possible" });
      setTimeout(() => {
        this.setState({ msg: "" });
      }, 3000);

      window.sessionStorage.setItem("oncall", false);

    })
    socket.on("end-call", () => {
      // socket.leave(this.state.roomid);
      console.log("inside end-call");
      window.sessionStorage.setItem("oncall", false);
      this.setState({ onCall: false ,msg:"Call ended"});
      setTimeout(() => {
        this.setState({ msg: "" });
      }, 3000);

    
    })


  }
  onCalleSelect=(username, userid)=>{
    console.log(username, userid, socket.id);

    socket.emit("call-made", window.sessionStorage.getItem("user"), userid,socket.id);
    this.setState({ calledUserId: userid, calledUsername: username,calling:true });
  }
  onCallEnd = (userid) => {
    console.log("ending call with",userid);
    socket.emit("end-request", socket.id, userid);
    window.sessionStorage.setItem("oncall", false);
    this.setState({ calledUserId: null, calledUsername: null, calling: false, onCall: false,msg:"Call ended" })
    setTimeout(() => {
      this.setState({ msg: "" });
    }, 3000);

    window.location.reload();

  }

  render() {


    var home = (<div>You Are Not Loged in</div>);
    if (this.state.onCall === true) {
      home = <UserBox  calledUsername={this.state.calledUsername} calledUserId={this.state.calledUserId} onCallend={this.onCallEnd} roomid={this.state.roomid} calling={this.state.calling}  />
    }
    else if (window.sessionStorage.getItem("userState") === "loged") {
      home = <HomeUserlist userList={this.state.userList} onCall={this.state.onCall} onCalleSelect={this.onCalleSelect} />
    }
    return (
      
      <center style={{width:"90%",left:"5%",position:"relative",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}   >
        {home}
        <div style={{height:"10%",width:"30%",position:"fixed",bottom:"0px",left:"35%",display:"flex", flexDirection: "row", justifyContent: "center"}}>
          <div  style={{ height: "80%", width: "100%",fontSize:"24px"}}>
          {this.state.msg}
          </div> 
        </div>
      </center>
    );
  }
}

export default Home;
