const session = require("express-session");
const User = require("../model/user");


module.exports = app => {

  app.post("/api/accounts/login", async (req, res) => {
    try {
      const { body } = req;
      const { username, password } = body;

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

      userExists = await User.findOne({ username: username });
      if (userExists) {
        if (userExists.password === password) {
          req.session.username = username;

          return res.json({
            success: true,
            message: "User connected successfully"
          });
        } else {
          return res.json({
            success: false,
            message: "Error: password is not correct"
          });
        }
      } else {
        return res.json({
          success: false,
          message: "Error: User Name does not Exist"
        });
      }
    } catch (err) {
      return res.json({
        success: false,
        message: "Error: server error"
      });
    }
  });
};
