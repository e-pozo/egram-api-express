import { Router } from 'express';
import { MediaContentService } from '../services/mediaContent.service';
import { upload } from '../libs/multer';
import { uploadFile, getFileStream } from '../libs/s3';
import fs from 'fs';
import util from 'util';
const unlinkFile = util.promisify(fs.unlink);
const mediaContentService = new MediaContentService();
const router = Router();
router.post(
  '/',
  upload.single('content'),
  async ({ file, body }, res, next) => {
    try {
      const result = await uploadFile(file);
      console.log(result);
      const fileName = file.filename;
      const data = {
        title: body.title || null,
        description: body.description || null,
        mediaURL: fileName,
        likes: 0,
        visits: 0,
        sharedCounter: 0,
        disclosureDate: body.disclosureDate || null,
        accessStatus: body.accessStatus || 'private',
      };
      const mediaContent = mediaContentService.create(data);
      await unlinkFile(file.path);
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
