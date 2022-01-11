import express from 'express';
import cors from 'cors';
import {
  boomErrorHandler,
  logErrors,
  ormErrorHandler,
  sendServerErrorHandler,
} from './middlewares/error.handler';
import { useRoutes } from './routes';

const app = express();
const port = 3000;

app.use(express.json());
const whitelist = [
  'http://localhost:8080',
  'http://localhost:3000',
  'https://myapp.co',
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('not allowed'));
    }
  },
};
app.use(cors(options));
useRoutes(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(sendServerErrorHandler);
app.listen(port, () => console.log(`server running on port ${port}`));
