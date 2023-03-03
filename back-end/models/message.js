const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  text: { type: String, required: true },
  date: { type: Date, required: true },
  user: { type: String, required: true },
  username: { type: String, required: true }
});

module.exports = mongoose.model('Message', messageSchema);