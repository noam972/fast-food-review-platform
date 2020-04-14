const Restaurant = require("../model/restaurant");
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const fs = require('fs');

module.exports = app => {
  app.post("/api/restaurants/makerestaurant", upload.single('picture'), async (req, res) => {
    try {
      const { body } = req;
      const { name, location, picture } = body;

      if (!name) {
        return res.json({
          success: false,
          message: "Error: Name cannot be blank"
        });
      }

      if (!location) {
        return res.json({
          success: false,
          message: "Error: Location cannot be blank"
        });
      }

      const newRestaurant = new Restaurant();
      newRestaurant.name = name;
      newRestaurant.location = location;
      newRestaurant.picture = req.file ? {data: fs.readFileSync(req.file.path), contentType: req.file.mimetype} : null;
      await newRestaurant.save(newRestaurant);
      return res.json({
        success: true,
        message: "successfully signed in"
      });
    } catch (err) {
      return res.json({
        success: false,
        message: "Error: server error"
      });
    }
  });
};
