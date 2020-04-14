const User = require("../model/user");

module.exports = app => {
    app.get("/api/accounts/getuser", async (req, res) => {
        userExists = await User.find({ username: req.query.username });
        res.send({ userExists });
    });
};