import React, { Component } from "react";
import socket from "../../API/socketHandler";
import ChatMessages from "./ChatMessages";
export default class ChatBox extends Component {
 
  constructor(props) {
    super(props);
    this.messagesEndRef = React.createRef(null);
    this.state = { messageList: [], message: "" };
    socket.on("message-Received", (msg) => {
      console.log("message Received", msg);
      this.setState({ messageList: [...this.state.messageList, msg] });
     

    });

  }
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate () {
    this.scrollToBottom()
  }
  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      
  }

  onMessageSend = () => {
    socket.emit("sent-message", {
      username: window.sessionStorage.getItem("user"),
      userid: socket.id,
      message: this.state.message,
      roomid:this.props.roomid,
    });
  };

  render() {
    return (
      <div 
        style={{ width: "40%", height: "100%", }}
        className="bg-light rounded shadow my-1"
      >
        <div style={{ width: "100%", height: "90%" }}>
          <div
            style={{
              width: "100%",
              height: "10%",
            
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                textDecoration: "underline",
                marginLeft: "2%",
              }}
            >
              <strong>{this.props.calledUsername}</strong>
            </div>
            <div>
              <button
                className="btn btn-primary btn-close"
                onClick={() => {
                  this.props.onCallend(this.props.calledUserid);
                }}
              ></button>
            </div>
          </div>
          <div
           
            style={{ width: "100%", height: "68vh", display: "flex", flexDirection: "column", justifyContent: "start", overflowY: "scroll" }}
            ref={this.messagesEndRef}
          >
            {this.state.messageList.map((data) => {
               return <ChatMessages username={data.username} message={data.message} /> 
            })}
          </div>
        </div>
        <div
          style={{ width: "100%", height: "10%" }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
           
              display: "flex",
              justifyContent: "center",
              alignItems:"center"
            }}
          >
            <div
              style={{ width: "70%", height: "100%",border:"2px solid gray"}}
              className="rounded"
            >
              <input
                style={{ height: "100%", width: "100%",fontSize:"16px"}}
                value={this.state.message}
                onChange={(e) => {
                  this.setState({ message: e.target.value });
                }}
              />
            </div>
            <div
              style={{ width: "15%", height: "60%" }}
            >
              <button style={{ width: "80%", height: "60%" }} className="rounded"  onClick={() => { this.onMessageSend() }}>▶</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
