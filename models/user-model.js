const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UsersSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    mobileNum: {
        type: String
    },
    city: {
        type: String
    },
    password: {
        type: String
    },
    accessToken: {
        type: String
    }
}, { timestamps: true })

const userModel = mongoose.model('users', UsersSchema);

module.exports = userModel
