const moments = require('../models/moments-model');

module.exports = {

    listMoments: async (req, res, next) => {

        try {
            const momentsData = await moments.find();

            if (momentsData.length > 0) {
                res.status(200).json({
                    data: momentsData
                })
            } else {
                res.status(404).json({
                    message: 'Moments Not Found'
                })
            }
        } catch(err) {
            res.status(400).json(err);
        }
        
    },

    createMoment: async (req, res, next) => {

        try {
            const momentsData = new moments(req.body)

            await momentsData.save();
            res.status(200).json({
                message: 'Moment Created Successfully !!!',
                data: momentsData
            })
        } catch(err) {
            res.status(400).json(err);
        }
        
    },
    updateMoment: async (req, res, next) => {

        try {

            moments.findByIdAndUpdate(req.body._id, req.body, {}, (err, doc) => {
                if(err) {
                    res.status(400).json(err);
                }
                res.status(200).json({
                    message: 'Moment Updated Successfully !!!',
                })
            });
        } catch(err) {
            res.status(400).json(err);
        }
        
    },
    deleteMoment: async (req, res, next) => {

        try {

            let id = req.params.id;

            moments.findByIdAndDelete(id, {}, (err, doc) => {
                if(err) {
                    res.status(400).json(err);
                }
                res.status(200).json({
                    message: 'Moment Deleted Successfully !!!',
                })
            });
        } catch(err) {
            res.status(400).json(err);
        }
        
    }
}