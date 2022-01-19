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

router.post(
  '/:id/subscribe',
  async ({ user: { sub }, params: { id } }, res, next) => {
    try {
      const subscription = await mediaContentService.subscribe(sub, id);
      res.json(subscription);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/:id/unsubscribe',
  async ({ user: { sub }, params: { id } }, res, next) => {
    try {
      const subscription = await mediaContentService.unsubscribe(sub, id);
      res.json(subscription);
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

router.delete(
  '/:id',
  checkOnlyCreator,
  async ({ params: { id } }, res, next) => {
    try {
      const response = await mediaContentService.delete(id);
      res.json(response);
    } catch (err) {
      next(err);
    }
  }
);
export default router;
