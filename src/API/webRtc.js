import socket from "./socketHandler";
import "./webRtc";
const { RTCPeerConnection, RTCSessionDescription } = window;
let isAlreadyCalling = false;
let getCalled = false;
var calledUser;
const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
const peerConnection = new RTCPeerConnection(configuration);



peerConnection.addEventListener("track", async (event) => {
  console.log("adding tracks to remote", event);
  peerConnection=new RTCPeerConnection(configuration);
  const remote_video = document.getElementById("remote-video");
  const [remoteStream] = event.streams;
  if (remote_video) {
    remote_video.srcObject = remoteStream;
    remote_video.play();
  }

})
export async function CallUser(socketid) {
  calledUser = socketid;
  console.log("Called Peer", socketid);
  console.log("video calling user", socketid);
  socket.on("answer-made", async  (message) => {
    if (message.answer) {
      const remoteDesc = new RTCSessionDescription(message.answer);
      await peerConnection.setRemoteDescription(remoteDesc);
    }
  });
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.emit("offermade", { offer,to:socketid });
}


socket.on("call-made", async (message) => {
  console.log("call-made", message);
  if (message.offer) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
    const answer = await peerConnection.createAnswer();
    peerConnection.setLocalDescription(answer).then(() => {
      getMedia();

    }).then(() => {
      socket.emit("make-answer", { answer, to: message.scoket }); 
    })
   
     
  }



})
socket.on("icecandidate-received", async (data) => {
      
  if (data.iceCandidate) {
    calledUser = data.socket;
    try {
      await peerConnection.addIceCandidate(data.iceCandidate);
    } catch (e) {
      console.log("Error adding received candidate");
     }
   }
})

peerConnection.addEventListener("icecandidate", event => {
  console.log("icecandidate called", event);
  if (event.candidate) {
    socket.emit("icecandidate-made", { icecandidate:event.candidate,to:calledUser});
  }
})


peerConnection.addEventListener("connectionstatechange", event => {
  if (peerConnection.connectionState === "connected") {
    console.log("connection Built with ", calledUser);
  }
})

function hasUserMedia() { 
    //check if the browser supports the WebRTC 
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || 
       navigator.mozGetUserMedia); 
}
async function getMedia() {
  
    var local_video = document.getElementById("local-video");
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia({ video: true, audio: true }, stream => {
      console.log("setting Streams", stream);
      if (local_video) {
          local_video.srcObject = stream;
          local_video.play();
      }
      stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
    }, err => {
      console.warn(err.message);
    });
  


}

   