const branchName = require('current-git-branch')();
const s3bucket = 'help.geo.admin.ch';

// Import the Amazon SDK
const AWS = require("aws-sdk");

// setting up credentials (will look at profile [default] in ~/.aws/credentials)
const credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;

// Import and setting up the Amazon S3 API
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3({
    apiVersion: '2006-03-01', // because reasons... https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
    region: 'eu-west-1',
    credentials: credentials
});

// depending on if we're on a branch or not, we will deploy on the root of the S3 bucket
const baseBucketPath = branchName === 'master' ? '' : (branchName + '/');

// reading all files from directory dist/ (everything has been built by webpack prior to this script being executed, have a look at package.json scripts)
const path = require('path');
const fs = require('fs');
const mime = require('mime-types');
const distFolderFullPath = path.join(__dirname, '../dist');
let pendingUpload = 0;
let errorOccurred = false;

const traverseDirAndUploadFiles = function (dirFullPath) {
    fs.readdirSync(dirFullPath).forEach(file => {
        const fileFullPath = path.join(dirFullPath, file);
        if (fs.lstatSync(fileFullPath).isDirectory()) {
            traverseDirAndUploadFiles(fileFullPath);
        } else {
            // upload each file individually
            const fileFullPath = path.join(dirFullPath, file);
            const s3PathForFile = baseBucketPath + path.relative(distFolderFullPath, fileFullPath);
            const fileStream = fs.createReadStream(fileFullPath);
            fileStream.on('error', err => console.error('Error while reading file', file, err));
            const uploadParams = {
                Bucket: s3bucket,
                Body: fileStream,
                Key: s3PathForFile
            };
            pendingUpload++;
            s3.putObject(uploadParams)
                .on('build', request => {
                    const mimeType = mime.lookup(file);
                    if (mimeType) {
                        request.httpRequest.headers['Content-Type'] = mimeType + ';charset=utf-8';
                    }
                    request.httpRequest.headers['ACL'] = 'public-read';
                    request.httpRequest.headers['CacheControl'] = 'max-age=0, must-revalidate, s-maxage=300';
                })
                .send((err, response) => {
                    if (err) {
                        console.error('Error while uploading file to S3', file, err);
                        errorOccurred = true;
                    } else if (response) {
                        console.log('file', file, 'successfully uploaded to s3 ( s3 path:', s3PathForFile, ')');
                    }
                    pendingUpload--;
                    if (pendingUpload === 0) {
                        console.log('******************************');
                        if (errorOccurred) {
                            console.log('Failure, please check logs above to find out why');
                        } else {
                            console.log('Success, you can now access what you\'ve deployed at https://help.geo.admin.ch/' + baseBucketPath + 'index.html');
                        }
                        console.log('******************************');
                    }
                });
        }
    });
};

// recursively traverse folder dist and upload each file to S3
traverseDirAndUploadFiles(distFolderFullPath);
