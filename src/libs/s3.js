import S3 from 'aws-sdk/clients/s3';
import fs from 'fs';
import { awsRegion, awsAccessKey, awsSecretKey, awsBucket } from '../config';
const s3 = new S3({
  region: awsRegion,
  accessKeyId: awsAccessKey,
  secretAccessKey: awsSecretKey,
});

//uploads a file to s3
export function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: awsBucket,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
}
//downloads a file from s3
export function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: awsBucket,
  };
  return s3.getObject(downloadParams).createReadStream();
}
