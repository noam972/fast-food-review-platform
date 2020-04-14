const session = require("express-session");

module.exports = app => {
    app.get("/api/accounts/checksession", async (req, res) => {
        try {
            let userName = req.session.username;
            res.json({userName});
        } catch (e) {
            console.log(e);
            return res.json({
                success: false,
                message: "Error: server error"
            });
        }
    });
};
