const usermaster = require('../models/user-model');
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports = {
    register: (async (req, res, next) => {

        let userData = await usermaster.find({ email: req.body.email });

        if (userData.length > 0) {
            res.status(400).json({
                message: 'User Already Exists'
            })
        } else {
            req.body.password = bcrypt.hashSync(req.body.password, 8);

            let newUser = new usermaster(req.body);

            const accessToken = jwt.sign({ userId: newUser._id.toString() }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            });
            newUser.accessToken = accessToken;

            await newUser.save();

            return res.status(200).json({
                message: 'User Registered Successfully',
                data: newUser
            })
        }
    }),
}