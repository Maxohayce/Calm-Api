require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://calm-client.netlify.app",
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "https://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("server is running");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
