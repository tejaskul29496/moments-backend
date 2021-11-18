const express = require('express');
const momentsApi = require('../controllers/momentsCntrl');
const authVerify = require('../middlewares/authJwt');
const router = express.Router();
const multer = require("multer");
const s3 = require("../helpers/s3");

router.get('/list', [authVerify.verifyToken, momentsApi.listMoments]);
router.post('/add-moment', [authVerify.verifyToken, momentsApi.createMoment]);
router.put('/update-moment', [authVerify.verifyToken, momentsApi.updateMoment]);
router.delete('/remove-moment/:id', [authVerify.verifyToken, momentsApi.deleteMoment]);

const upload = multer({ storage: multer.memoryStorage() });

uploadToS3 = (fileList) => {
    return new Promise((resolve, reject) => {

        try {
            let s3FileUploadResponses = [];
            for (let i = 0; i < fileList.length; i++) {
                //@TODO: implement single upload tracking
                // enable error handling using try catch
                s3FileUploadResponses.push(
                    s3.s3Upload(fileList[i])
                );
            }

            Promise.all(s3FileUploadResponses).then((resp) => {
                resolve({
                    fileLink: resp
                });
            });

        } catch (err) {
            reject({
                message: "error",
                error: err,
            });
        }

    });
}

deleteFromS3 = (society_num, fname) => {
    return new Promise((resolve, reject) => {

        try {
            let s3FileUploadResponses = [];
            for (let i = 0; i < 1; i++) {
                s3FileUploadResponses.push(
                    s3.deleteObject(`${s3.FILE_TYPE.DOCUMENT_UPLOAD}/${society_num}`, fname)
                );
            }
            Promise.all(s3FileUploadResponses).then((resp) => {
                resolve({
                    message: 'File Deleted Successfully !!!'
                });
            });
        } catch (err) {
            console.log(err);
            reject({
                message: "error",
                error: err,
            });
        }

    });
}

router.post(
    "/multi-upload",
    upload.array('documents'),
    (req, res, next) => {
        uploadToS3Promises = [
            uploadToS3(req.files)
        ];

        Promise.all(uploadToS3Promises).then(resp => {
            res.status(200).json({
                docFiles: resp
            })
        }).catch(err => {
            res.status(400).json(err)
        });
    }
);

module.exports = router;