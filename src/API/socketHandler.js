import { io } from "socket.io-client";




const socket = io.connect("https://comwooauthsystem.herokuapp.com", {
  withCredentials: true,
  extraHeaders: {
   "Access-Control-Allow-Origin": "https://comwooapp.herokuapp.com"
 }
});


const username = window.sessionStorage.getItem("user") ? window.sessionStorage.getItem("user") : "unknown";

socket.on("connect", () => {
  console.log("User Connected");
    socket.emit("add-user-to-list", username,socket.id);
})

socket.on("allow-call", (username, callback) => {
  console.log("asking User", username);
 
    var f = window.confirm(`${username} wants to join You`, "press Yes to allow him");
    if (!f) {
        socket.emit("call-end");
    }
})

socket.on("allow-user", (username, desid) => {
  console.log("Inside Allow call", username, desid);
  const call = window.sessionStorage.getItem("oncall");
  if (call=="true") {
    socket.emit("stop-call", desid);
    return;
  }
    const getCheck = () => {
      return new Promise((resolve, reject) => { 

          const f = window.confirm("Connection Request"+`${username} is asking to join You`);
          console.log("prompt decision", f);
        if (f===true) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    }
    getCheck().then((resp) => {
      if (resp) {
        socket.emit("create-call", desid, socket.id);
      } else {
          socket.emit("stop-call", desid);
      }   
    })

  })








export default socket;

