const { S3Client } = require('@aws-sdk/client-s3');        // const AWS = require('aws-sdk');

require('dotenv').config();




const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
})

//AWS.config.update({
//  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//  region: process.env.AWS_REGION,
//});

module.exports = { s3 };    // module.exports = AWS;