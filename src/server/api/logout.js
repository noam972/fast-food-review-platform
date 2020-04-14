const session = require("express-session");

module.exports = app => {
  app.get("/api/accounts/logout", async (req, res) => {
    console.log("Going to delete this session= ",req.session.username);
    req.session.destroy(err => {
      if (err) {
        console.log(err);
      } else {
        res.end();
      }
    });
  });
};
