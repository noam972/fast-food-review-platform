const Restaurant = require("../model/restaurant");
const Review = require("../model/review");

module.exports = app => {
  app.get("/api/restaurantreviews/id", async (req, res) => {
    restaurantExists = await Restaurant.findOne({ _id: req.query.id });
    if (restaurantExists) {
      existReview = await Review.find({ restaurantid: restaurantExists._id });
      res.json({ existReview });
    }
  });
};
