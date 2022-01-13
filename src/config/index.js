const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  adminPassword: process.env.ADMIN_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  jwtSecret: process.env.JWT_SECRET,
  awsBucket: process.env.AWS_BUCKET,
  awsRegion: process.env.AWS_REGION,
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsSecretKey: process.env.AWS_SECRET_KEY,
};
