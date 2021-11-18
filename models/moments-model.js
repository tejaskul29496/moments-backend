const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MomentsSchema = new Schema({
    title: {
        type: String
    },
    tags: {
        type: Array
    },
    documents: {
        type: Array
    }
}, { timestamps: true })

const momentsModel = mongoose.model('moments', MomentsSchema);

module.exports = momentsModel
