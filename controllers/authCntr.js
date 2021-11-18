const jwt = require('jsonwebtoken');
const usermaster = require('../models/user-model');
const bcrypt = require('bcryptjs');

module.exports = {
    login: (async (req, res, next) => {
        usermaster.find({
            email: req.body.email
        }, async function (err, data) {
            if (err) {
                return res.status(400).send({
                    message: "Error",
                    error: err
                });
            }

            if(data.length > 0) {
                if (bcrypt.compareSync(req.body.password, data[0].password)) {
                    const accessToken = jwt.sign({ userId: data[0]._id.toString() }, process.env.JWT_SECRET, {
                        expiresIn: "1d"
                    });
                    await usermaster.findByIdAndUpdate(data[0]._id.toString(), { accessToken })
                    return res.status(201).send({
                        message: "User Logged In",
                        token: accessToken
                    })
                } else {
                    return res.status(400).send({
                        message: "Wrong Password"
                    });
                }
            } else {
                return res.status(404).send({
                    message: "No User Found"
                });
            }
        })
    }),
}