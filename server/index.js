const dotenv = require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
   cors: {
      origin: "*",
      methods: ["GET", "POST"],
   },
});

io.on("connection", (socket) => {
   socket.on("send-message", (data) => {
      socket.broadcast.emit("recieve-message", { username: data.username, message: data.message });
   });

   app.post("/send-notification", (req, res) => {
      socket.broadcast.emit("notification", { message: "vais a cagaros encima" });
      return res.send("os vais a cagar");
   });
});

server.listen(PORT, () => {
   console.log("SERVER IS RUNNING ON PORT 4000");
});
