const fs = require('fs');
const AWS = require('aws-sdk');
const BUCKET_NAME = 'mymockuploadbucket';
const s3 = new AWS.S3();

module.exports.s3Upload = (files) => {
    return new Promise(function (fulfill, reject) {

        const BUCKET = BUCKET_NAME;

        AWS.config.update({
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            // region: REGION
        })

        var s3 = new AWS.S3()
        s3.putObject({
            Bucket: BUCKET,
            Body: files.buffer,
            Key: files.originalname
        })
            .promise()
            .then(response => {
                var a = (`${s3.getSignedUrl('getObject', { Bucket: BUCKET, Key: files.originalname })}`)
                // var str = a.split("?AWSAccessKeyId")
                var str = a.split("?")
                fulfill({name: files.originalname, link: str[0], size: files.size})
                console.log(`S3 file uploaded! - `, str[0]);

            })
            .catch(err => {
                console.log('failed:', err)
            })

    })
}

module.exports.deleteObject = (recordId, fname) => {
    return new Promise(function (fulfill, reject) {

        const BUCKET = BUCKET_NAME + '/' + recordId;

        const params = {
            Bucket: BUCKET,
            Key: fname,
        };

        AWS.config.update({
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            // region: REGION
        })

        var s3 = new AWS.S3()
        s3.deleteObject(params).promise().then(response => {
            console.log(response)
            fulfill({
                message: 'File Deleted Successfully !!'
            })
        }).catch(err => {
            console.log('failed:', err)
            reject(err);
        })

    })
}
