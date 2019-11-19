var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

const hostname = "localhost";
const port = 3000;
/*
app.use(
  express.static(__dirname + "/public", {
    index: false,
    immutable: true,
    cacheControl: true,
    maxAge: "30d"
  })
);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
*/
io.on("connection", function(socket) {
  console.log("a user connected");

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
  socket.on("page", function(trackPage) {
    console.log(trackPage);
    switch (trackPage) {
      case "HOMEPAGE":
        socket.broadcast.emit("ABOUT", "New User on Homepage.");
        break;
      case "ABOUT":
        socket.broadcast.emit("HOMEPAGE", "New User on About page.");
        break;
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
