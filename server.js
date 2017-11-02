const express = require('express')
const http = require("http");
const books = require('./lib/books')
const port = process.env.PORT || 8080
const socketIo = require("socket.io");
const index = require("./routes/index");
const app = express();
app.use(index)

const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`))

const io = socketIo(server)
function getApiAndEmit(socket){
  socket.emit("orders", books.getOrders())
}

let interval;
io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
