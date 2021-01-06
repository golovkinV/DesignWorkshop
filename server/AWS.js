const aws = require('aws-sdk');

const accessKey = 'AKIAJFDXY25QZ673BEXA';
const secretKey = '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';
const bucket = 'utmn2';
const region = 'us-east-2';

aws.config.update({
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    region: region
})

const s3Bucket = new aws.S3({ params: { Bucket: 'utmn2' }})

module.exports = s3Bucket