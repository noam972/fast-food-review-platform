const Restaurant = require("../model/restaurant");
const Review = require("../model/review");

module.exports = app => {
  app.get("/api/restaurants/search", async (req, res) => {
    let restaurantExists = await Restaurant.find({
      name: {$regex: req.query.name, $options: "i"}
    });
    res.json({ restaurantExists });
  });
};
