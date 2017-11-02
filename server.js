const express = require('express')
const http = require("http");
// const SocketServer = require('ws').Server
// const path = require('path')
const books = require('./lib/books')
const port = process.env.PORT || 8080
// const INDEX = path.join(__dirname, 'index.html')
const socketIo = require("socket.io");
const index = require("./routes/index");
const app = express();
app.use(index)

// const server = express()
//   .use((req, res) => res.sendFile(INDEX) )
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))
const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`))

const io = socketIo(server)
function getApiAndEmit(socket){
  socket.emit("orders", books.getOrders())
}

// const wss = new SocketServer({ server })
//
// wss.on('connection', (ws) => {
//   console.log('Client connected')
//   ws.on('close', () => console.log('Client disconnected'))
// })
//
// setInterval(() => {
//   wss.clients.forEach((client) => {
//     client.send(books.getOrders())
//   })
// }, 500)

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
