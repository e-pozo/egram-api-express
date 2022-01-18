import { Router } from 'express';
import {
  mediaContentService,
  checkMediaContentAuthorization,
  checkOnlyCreator,
} from '../services/mediaContent.service';
import { upload } from '../libs/multer';
import { getFileStreamS3 } from '../libs/s3';
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
      res.status(201).json(mediaContent);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/:id',
  checkOnlyCreator,
  async ({ params: { id }, body }, res, next) => {
    try {
      const mediaContent = await mediaContentService.update(id, body);
      res.json(mediaContent);
    } catch (err) {
      next(err);
    }
  }
);
router.get('/created', async ({ user: { sub } }, res, next) => {
  try {
    const mediaContents = await mediaContentService.userMediaContents(sub);
    res.json(mediaContents);
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:id',
  checkMediaContentAuthorization,
  async ({ user, params: { id } }, res, next) => {
    console.log(user);
    try {
      const mediaContent = await mediaContentService.findOne(id);
      res.json(mediaContent);
    } catch (err) {
      next(err);
    }
  }
);

router.get('/resource/:key', checkMediaContentAuthorization, (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStreamS3(key);
  readStream.pipe(res);
});
// router.get('/', (req, res))

export default router;
