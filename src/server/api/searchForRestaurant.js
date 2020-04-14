const Restaurant = require("../model/restaurant");

module.exports = app => {
  app.get("/api/restaurants/id", async (req, res) => {
    restaurantExists = await Restaurant.find({ _id: req.query.id });
    res.json({ restaurantExists });
  });
};
