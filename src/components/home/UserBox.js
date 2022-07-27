import React, { Component } from 'react';
import VideoBox from './videoBox';
import ChatBox from './chatBox';

export default class UserBox extends Component {
    constructor(props) {
        super(props);
    }
  render() {
    return (
        <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"row",justifyContent:"center"}} className="bg-danger p-1">
            <VideoBox />
            <ChatBox calledUsername={this.props.calledUsername} calledUserid={this.props.calledUserId} roomid={this.props.roomid} onCallend={this.props.onCallend} />
        </div>
    )
  }
}
