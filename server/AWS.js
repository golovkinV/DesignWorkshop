const aws = require('aws-sdk');

const accessKey = 'AKIAJFIEGSFS24MMRGRA';
const secretKey = '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';
const bucket = 'utmn';
const region = 'us-east-2';

aws.config.update({
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    region: region
})

const s3Bucket = new aws.S3({ params: { Bucket: 'utmn' }})

module.exports = s3Bucket