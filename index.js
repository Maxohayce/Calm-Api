require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Pusher = require("pusher");

const app = express();

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID, // Replace with your Pusher App ID
  key: process.env.PUSHER_KEY, // Replace with your Pusher Key
  secret: process.env.PUSHER_SECRET, // Replace with your Pusher Secret
  cluster: process.env.PUSHER_CLUSTER, // Replace with your Pusher Cluster
  useTLS: true,
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Calm API");
});

app.post("/messages", (req, res) => {
  const { initials, text, time } = req.body;

  pusher.trigger("chat", "chat-message", {
    initials,
    text,
    time,
  });

  res.status(200).send("Message sent");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
