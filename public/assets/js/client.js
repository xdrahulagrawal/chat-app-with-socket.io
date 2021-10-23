const socket = io("http://127.0.0.1/:8000");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
const username = prompt("enter your name to join");
socket.emit("new-user-joined", username);
