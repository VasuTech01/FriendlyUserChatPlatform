import { io } from "socket.io-client";

const socket = io.connect("localhost:8081");

const username = window.sessionStorage.getItem("user") ? window.sessionStorage.getItem("user") : "Unknown";
socket.on("connect", () => {
    console.log("User Connected");
    socket.emit("add-user-to-list", username);
})



export default socket;

