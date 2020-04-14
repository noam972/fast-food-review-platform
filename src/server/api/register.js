const User = require("../model/user");
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const fs = require('fs');

module.exports = app => {
  app.post("/api/accounts/register", upload.single('picture'), async (req, res) => {
    try {
      const { body } = req;
      const {
        username,
        password,
        location,
        picture
      } = body;

      if (!username) {
        return res.json({
          success: false,
          message: "Error: username cannot be blank"
        });
      }

      if (!password) {
        return res.json({
          success: false,
          message: "Error: password cannot be blank"
        });
      }

      if (!location) {
        return res.json({
          success: false,
          message: "Error: location cannot be blank"
        });
      }

      userExists = await User.find({ username: username });

      if (userExists.length) {
        return res.json({
          success: false,
          message: "Error: username already exists"
        });
      }

      const newUser = new User();
      newUser.username = username;
      newUser.password = password;
      newUser.location = location;
      newUser.picture = req.file ? {data: fs.readFileSync(req.file.path), contentType: req.file.mimetype} : null;
      await newUser.save(newUser);
      return res.json({
        success: true,
        message: "successfully Registered!"
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
