const User = require("../model/user");
const Review = require("../model/review");
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const fs = require('fs');

module.exports = app => {
    app.post("/api/accounts/changeuser", upload.single('changeParameter'), async (req, res) => {
        try {
            const { body } = req;
            const {
                username,
                parameter,
                changeParameter
            } = body;
            console.log("username= ", username);
            userExists = await User.find({ username: username });
            if (!userExists.length) {
                return res.json({
                    success: false,
                    message: "Error: username doesn't exist"
                });
            }


            if (parameter === 'username' && changeParameter) {
                userExists = await User.find({ username: changeParameter });
                if (userExists.length) {
                    return res.json({
                        success: false,
                        message: "Error: username already exist"
                    });
                }

                await User.find( { username: username } ).updateOne( { $set: { username: changeParameter} } );
                await Review.find( { username: username } ).updateMany( { $set: { username: changeParameter} } );
                return res.json({
                    success: true,
                    message: "username Changed successfully!"
                });
            }

            if (parameter === "password" && changeParameter) {
                await User.find( { username: username } ).updateOne( { $set: { password: changeParameter} } );

                return res.json({
                    success: true,
                    message: "password Changed successfully!"
                });
            }

            if (parameter === "location" && changeParameter) {
                await User.find( { username: username } ).updateOne( { $set: { location: changeParameter} } );

                return res.json({
                    success: true,
                    message: "location Changed successfully!"
                });
            }

            if (parameter === "picture") {
                let pictureChange = req.file ? {data: fs.readFileSync(req.file.path), contentType: req.file.mimetype} : null;
                await User.find( { username: username } ).updateOne( { $set: { picture: pictureChange} } );

                return res.json({
                    success: true,
                    message: "picture Changed successfully!"
                });
            }
        } catch (err) {
            console.log(err);
            return res.json({
                success: false,
                message: "Error: server error"
            });
        }
    });
};
