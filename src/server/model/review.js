const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newReview = new Schema({
  username: { type: String, required: true },
  restaurantid: { type: mongoose.Schema.Types.ObjectId, required: true },
  bathroomquality: { type: Number, required: true },
  staffkindness: { type: Number, required: true },
  cleanliness: { type: Number, required: true },
  drivethru: { type: Number, default: 0 },
  deliveryspeed: { type: Number, default: 0 },
  foodquality: { type: Number, required: true },
  creationdate: { type: Date, default: Date.now },
  restaurantname : {type: String},
  picture: { data: Buffer, contentType: String}
});

module.exports = mongoose.model("Review", newReview);
