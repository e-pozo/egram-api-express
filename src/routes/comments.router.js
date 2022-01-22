import { Router } from 'express';
import { commentService } from '../services/comment.service';
const router = Router();

router.post('/', async ({ user: { sub }, body }, res, next) => {
  try {
    body.userId = sub;
    const comment = await commentService.create(body);
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
});

export default router;
