require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Pusher = require("pusher");

const app = express();

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

app.use(
  cors({
    origin: "https://calm-client.netlify.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Calm API");
});

app.post("/messages", async (req, res) => {
  const { initials, text, time } = req.body;

  const newMsg = await pusher.trigger("chat", "chat-message", {
    initials,
    text,
    time,
  });
  console.log(newMsg);

  res.status(200).send("Message sent");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
