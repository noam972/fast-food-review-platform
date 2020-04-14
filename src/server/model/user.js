const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newUser = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  picture: { data: Buffer, contentType: String}
});

module.exports = mongoose.model("User", newUser);
