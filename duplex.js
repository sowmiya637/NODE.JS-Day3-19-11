const net = require("net");

const server = net.createServer(socket => {
  socket.on("data", msg => {
    console.log("User says:", msg.toString());
    socket.write("Got your message!");   // write
  });
});
server.listen(4000);
