const s3 = require('../AWS');

exports.uploadImage = (req, res) => {
    const image = req.files.file
    const params = {
        Bucket: 'utmn2',
        Key: image.name, // File name you want to save as in S3
        Body: image.data
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err)
            throw err;
        res.send(data.Location)
    });
}