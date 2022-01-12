import multer from 'multer';
import path from 'path';
import { v4 as uuid } from 'uuid';
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, `../uploads`));
  },
  filename: (_req, _file, cb) => {
    cb(null, uuid());
  },
});

export const upload = multer({ storage: storage });
