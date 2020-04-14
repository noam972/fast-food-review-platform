const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newRestaurant = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  creationdate: { type: Date, default: Date.now },
  picture: { data: Buffer, contentType: String}
});

module.exports = mongoose.model("Restaurant", newRestaurant);
