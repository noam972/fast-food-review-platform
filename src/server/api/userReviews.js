const User = require("../model/user");
const Review = require("../model/review");

module.exports = app => {
  app.get("/api/accounts/id", async (req, res) => {
    userExists = await User.findOne({ username: req.query.username });
    if (userExists) {
      existReview = await Review.find({ username: userExists.username });
      res.json({ existReview });
    } else {
      return res.json({
        success: false,
        message: "Error: user does not exist"
      });
    }
  });
};
