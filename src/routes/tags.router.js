import { Router } from 'express';
import { json } from 'express/lib/response';
import { onlyCreator, tagService } from '../services/tag.service';
const router = Router();

router.post('/', async ({ user: { sub }, body }, res, next) => {
  try {
    body.userId = sub;
    const tag = await tagService.create(body);
    res.status(201).json(tag);
  } catch (err) {
    next(err);
  }
});

router.get('/', async ({ user: { sub }, res, next }) => {
  try {
    const tags = await tagService.userTags(sub);
    res.json(tags);
  } catch (err) {
    next(err);
  }
});

router.patch(
  '/:id',
  onlyCreator,
  async ({ body, params: { id } }, res, next) => {
    try {
      const tag = await tagService.update(id, body);
      res.json(tag);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
