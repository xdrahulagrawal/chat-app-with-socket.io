const io = require("socket.io")(8000);
const users = {};

//io.on bahut saare socket logo ko listen krega
//socket.on particular user ko handle krega
io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    console.log("username", name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});
