import { Router } from 'express';
import { MediaContentService } from '../services/mediaContent.service';
import { upload } from '../libs/multer';
import { getFileStream } from '../libs/s3';
import fs from 'fs';
import util from 'util';
import { validatorHandler } from '../middlewares/validator.handler';
import { dataFilterToCU } from '../schemas/mediaContent.schema';
const unlinkFile = util.promisify(fs.unlink);
const mediaContentService = new MediaContentService();
const router = Router();
router.post(
  '/',
  validatorHandler(dataFilterToCU),
  upload.single('content'),
  async ({ file, body }, res, next) => {
    try {
      const mediaContent = await mediaContentService.create(body, file);
      res.json(mediaContent);
    } catch (err) {
      next(err);
    }
  }
);
router.get('/resource/:key', (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});
// router.get('/', (req, res))

export default router;
