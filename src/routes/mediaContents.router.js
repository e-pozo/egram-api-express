import { Router } from 'express';
import { mediaContentService } from '../services/mediaContent.service';
import { upload } from '../libs/multer';
import { getFileStream } from '../libs/s3';
import { validatorHandler } from '../middlewares/validator.handler';
import { dataFilterToCU } from '../schemas/mediaContent.schema';
const router = Router();
router.post(
  '/',
  validatorHandler(dataFilterToCU),
  upload.single('content'),
  async ({ file, body, user: { sub } }, res, next) => {
    try {
      const mediaContent = await mediaContentService.create(sub, body, file);
      res.json(mediaContent);
    } catch (err) {
      next(err);
    }
  }
);

router.get('/', async ({ user: { sub } }, res, next) => {
  try {
    const mediaContents = await mediaContentService.userMediaContents(sub);
    res.json(mediaContents);
  } catch (err) {
    next(err);
  }
});
router.get('/resource/:key', (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});
// router.get('/', (req, res))

export default router;
