import React, { Component } from "react";
import socket from "../../API/socketHandler";
const { RTCPeerConnection, RTCSessionDescription } = window;
class VideoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: "",
      config: {
        video: {
          width: {
            min: 640,
            max: 720
        },
        height: {
            min: 480,
            max: 480.
        }
        },
        audio: {
          echoCancellation:true,
        },
      },
      localRef: React.createRef(),
      remoteRef: React.createRef(),
      localConnection: null,
      muted: true,
      video:true,
    };
  }

  componentDidMount() {
    console.log(this.state.localRef);
    console.log(this.state.remoteRef);
    navigator.mediaDevices
      .getUserMedia(this.state.config)
      .then((stream) => {
        this.state.stream = stream;
        this.state.localRef.current.srcObject = stream;
        console.log("stream addded ", stream);
        console.trace(this.state.remoteRef.current);
        this.initConnection(stream);
      })
      .catch((err) => console.log("eror catching user media", err));
  }
  initConnection(stream) {
    const server = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    const localConnection = new RTCPeerConnection(server);
    this.state.stream.getTracks().forEach((track) => {
      localConnection.addTrack(track, this.state.stream);
      console.log(track);
    });
    // localConnection.addEventListener(
    //   "icecandidate",
    //   this.handleConnection
    // );
    localConnection.onicecandidate = (event) => {
      console.log("ice candidate sent", event.candidate);

      socket.emit("icecandidate-made", {
        candidate: event.candidate,
        target: this.props.calledUserId,
      });

      socket.on("icecandidate-received", (o) => {
        console.log("ice candidate received from ", o.sender);
        if (o.candidate) {
          this.handleConnection(o.candidate);
        }
      });
    };
    localConnection.addEventListener(
      "iceconnectionstatechange",
      this.handleConnectionStateChange
    );
    localConnection.addEventListener("track", this.gotRemoteStream);

    //
    //  localConnection.addStream(this.state.stream);

    //this.setState({ localConnection: localConnection });
    this.state.localConnection = localConnection;

    socket.on("offer-received", (o) => {
      console.log("Remote Offer Received");
      this.state.localConnection.setRemoteDescription(o.offer).then(() => {
        console.log("Remote offerset");
        this.createdAnswer(o.sender);
      });
    });
    socket.on("answer-received", (o) => {
      console.log("answer-received");
      this.state.localConnection
        .setRemoteDescription(o.answer)
        .then(() => {
          console.log("remote-description set");
        })
        .catch((err) => {
          console.log("error setting remote description", err);
        });
    });
    console.log("calling user", this.props.calling);

    if (this.props.calling) {
      this.state.localConnection
        .createOffer()
        .then(this.createdOffer)
        .catch((err) => {
          console.log("error creating  Offer", err);
        });
    }
  }
  createdOffer = (description) => {
    console.log("creating  local Offer", description);
    this.state.localConnection
      .setLocalDescription(description)
      .then(() => {
        socket.emit("Offer-made", {
          offer: description,
          target: this.props.calledUserId,
        });
      })
      .catch((err) => {
        console.log("error creating local Offer", err);
      });
  };

  createdAnswer = (target) => {
    console.log("creating Answer for", target);
    this.state.localConnection
      .createAnswer()
      .then((description) => {
        console.log("setting local Desription");
        this.state.localConnection
          .setLocalDescription(description)
          .then(() => {
            console.log("local description set");
            socket.emit("answer-made", {
              answer: description,
              target: target,
            });
          })
          .catch((err) => {
            console.log("Error setting local description", err);
          });
      })
      .catch((err) => {
        console.log("Error creating Answer", err);
      });
  };
  gotRemoteStream = async (event) => {
    console.log("remote Streams event", event);
    const [remoteStream] = await event.streams;
    console.log("adding remote Stream", remoteStream);
    console.log(this.state.remoteRef.current);
    this.state.remoteRef.current.srcObject = remoteStream;

    console.log("remote stream added");
  };
  handleConnection = (event) => {
    console.log("received Candidate", event);
    //const peerConnection = event.target;
    const iceCandidate = event.candidate;
    console.log("iceCandiate", iceCandidate);
    if (iceCandidate !== "" && iceCandidate !== null) {
      const newIceCandidate = new RTCIceCandidate({
        candidate: iceCandidate,
        sdpMid: event.sdpMid,
        sdpMLineIndex: event.sdpMLineIndex,
      });
      this.state.localConnection
        .addIceCandidate(newIceCandidate)
        .then(() => {
          console.log("Ice Candidate added");
        })
        .catch((err) => {
          console.log("Error adding ice candidate: ", err);
        });
    }
  };
  handleConnectionStateChange = (event) => {
    console.log("connection state change", event);
  };
  componentWillUnmount() {
    console.log("component unmounting");
    this.state.localRef.current.srcObject = null;
    this.state.remoteRef.current.srcObject = null;
    const media = this.state.stream.getTracks();
    media.forEach(track => track.stop());
  }
  muteMic = () => {
    if (this.state.stream) {
      const tracks = this.state.stream.getAudioTracks();
      tracks.forEach(track => track.enabled = !track.enabled);
      this.setState({ muted: !this.state.muted });
    }
  }
  offVideo=()=>{
  if (this.state.stream) {
    const tracks = this.state.stream.getVideoTracks();
    tracks.forEach(track => track.enabled = !track.enabled);
    this.setState({  video: !this.state.video });
  }
  }
  render() {
    return (
      <div
        style={{ width: "60%", height: "90vh" }}
        className="m-1"
      >
        <div style={{height:"90%",width:"100%"}}>
        <div
          style={{ width: "100%", height: "100%"}}>
          <video
            ref={this.state.remoteRef}
            id="remote-video"
            style={{
              height: "100%",
              width: "100%",
            
            }}
            autoPlay
          />
        </div>
        <div
          style={{
            width: "35%",
            height: "25%",
    
            position: "relative",
            left: "30%",
            bottom: "30%",
            zIndex: "8",
          }}
        >
          <video
            ref={this.state.localRef}
            id="local-video"
            style={{
              height: "100%",
              width: "100%",
              
              shadow:"2px 2px white"
            }}
            autoPlay
          />
        </div>
        </div>
        <div style={{ height: "9%", width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start",alignItems:"center" }}>
          <button onClick={this.muteMic} className="btn btn-primary mx-3">{this.state.muted ? "Mute":"Unmute"}</button>
          <button onClick={this.offVideo} className="btn btn-warning mx-3">{this.state.video ? "Off Camera":"On Camera"}</button>
        </div>
      </div>
    );
  }
}

export default VideoBox;
