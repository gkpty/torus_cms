// Load the AWS SDK
const aws = require('aws-sdk');

// Construct the AWS S3 Object - http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
const s3 = new aws.S3({
    apiVersion: '2006-03-01'
 });
        
// Define 2 new variables for the source and destination buckets
var srcBucket = "awsamplifygraphql31d067b54fe946609156b15e77c1b3f8";
var destBucket = "torus.digital";
var exTension = "private/us-east-1:ac06372e-5966-482a-b1eb-df3e87441368"
var sourceObject = "89573202-bb97-4b2d-b93c-18cb9959f0d6.jpg";

//Main function
exports.handler = (event, context, callback) => {
        
//Copy the current object to the destination bucket - http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#copyObject-property
s3.copyObject({ 
    CopySource: srcBucket + '/' + exTension + '/' + sourceObject,
    Bucket: destBucket,
    Key: sourceObject
    }, function(copyErr, copyData){
       if (copyErr) {
            console.log("Error: " + copyErr);
         } else {
            console.log('Copied OK');
         } 
    });
  callback(null, 'All done!');
};