const Review = require("../model/review");
const User = require("../model/user");
const Restaurant = require("../model/restaurant");
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const fs = require('fs');

module.exports = app => {
  app.post("/api/reviews/writereview", upload.single('picture'), async (req, res) => {
    try {
      const { body } = req;
      const {
        username,
        restaurantid,
        bathroomquality,
        staffkindness,
        cleanliness,
        drivethru,
        deliveryspeed,
        foodquality,
        picture
      } = body;

      if (!username) {
        return res.json({
          success: false,
          message: "Error: User id cannot be blank"
        });
      }

      existUser = await User.find({ username: username });
      if (existUser.length === 0) {
        return res.json({
          success: false,
          message: "Error: User not found"
        });
      }

      if (!restaurantid) {
        return res.json({
          success: false,
          message: "Error: Restaurant id cannot be blank"
        });
      }

      existRestaurant = await Restaurant.find({ _id: restaurantid });
      if (existRestaurant.length === 0) {
        return res.json({
          success: false,
          message: "Error: Restaurant not found"
        });
      }

      if (!(1 <= bathroomquality && bathroomquality <= 5)) {
        return res.json({
          success: false,
          message:
            "Error: Bathroom Quality must be between 1 to 5 and cannot be blank "
        });
      }

      if (!(1 <= staffkindness && staffkindness <= 5)) {
        return res.json({
          success: false,
          message:
            "Error: staff Kindness must be between 1 to 5 and cannot be blank"
        });
      }

      if (!(1 <= cleanliness && cleanliness <= 5)) {
        return res.json({
          success: false,
          message:
            "Error: Cleanliness must be between 1 to 5 and cannot be blank"
        });
      }

      if (!(0 <= drivethru && drivethru <= 5)) {
        return res.json({
          success: false,
          message: "Error: Drive-thru quality must be between 0 to 5"
        });
      }

      if (!(0 <= deliveryspeed && deliveryspeed <= 5)) {
        return res.json({
          success: false,
          message: "Error: Delivery speed quality must be between 0 to 5"
        });
      }

      if (!(1 <= foodquality && foodquality <= 5)) {
        return res.json({
          success: false,
          message:
            "Error: Food quality must be between 1 to 5 and cannot be blank"
        });
      }

      const newReview = new Review();
      newReview.username = username;
      newReview.restaurantid = restaurantid;
      newReview.bathroomquality = bathroomquality;
      newReview.staffkindness = staffkindness;
      newReview.cleanliness = cleanliness;
      newReview.drivethru = drivethru;
      newReview.deliveryspeed = deliveryspeed;
      newReview.foodquality = foodquality;
      newReview.restaurantname= existRestaurant[0].name;
      newReview.picture = req.file ? {data: fs.readFileSync(req.file.path), contentType: req.file.mimetype} : null;
      await newReview.save(newReview);
      return res.json({
        success: true,
        message: "successfully written review"
      });
    } catch (err) {
      console.log(err);
      return res.json({
        success: false,
        message: "Error: server error"
      });
    }
  });
};
