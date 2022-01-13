import S3 from 'aws-sdk/clients/s3';
import fs from 'fs';
import { awsRegion, awsAccessKey, awsSecretKey, awsBucket } from '../config';
const s3 = new S3({
  region: awsRegion,
  accessKeyId: awsAccessKey,
  secretAccessKey: awsSecretKey,
});

//uploads a file to s3
export function uploadFileS3(file) {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: awsBucket,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
}
//downloads a file from s3
export function getFileStreamS3(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: awsBucket,
  };
  return s3.getObject(downloadParams).createReadStream();
}

export function deleteFileS3(fileKey) {
  const deleteParams = {
    Bucket: awsBucket,
    Key: fileKey,
  };
  return s3.deleteObject(deleteParams).promise();
}
