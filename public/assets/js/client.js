const socket = io("http://127.0.0.1:8000", {
  transports: ["websocket", "polling", "flashsocket"],
});

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
const username = prompt("enter your name to join");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = messageInput.value;
  append(`you: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});

socket.emit("new-user-joined", username);

socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});

socket.on("receive", (data) => {
  append(`${data.name} : ${data.message}`, "left");
});

socket.on("left", (name) => {
  append(`${name} left the chat`, "left");
});
