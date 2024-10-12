const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    ConversationId: {
      type: String,
    },

    Sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
