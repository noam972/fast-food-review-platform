const User = require("../model/user");

module.exports = app => {
  app.get("/api/accounts/username", async (req, res) => {
    userExists = await User.find({ username: req.query.username });
    res.json({ userExists });
  });
};
