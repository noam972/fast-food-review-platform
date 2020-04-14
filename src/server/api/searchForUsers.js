const User = require("../model/user");

module.exports = app => {
    app.get("/api/accounts/allusers", async (req, res) => {
        let userExists = await User.find({
            username: {$regex: req.query.username, $options: "i"}
        });
        res.json({ userExists });
    });
};
