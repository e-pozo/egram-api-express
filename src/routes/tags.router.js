import { Router } from 'express';
const router = Router();

router.post('/', async (req, res, next) => {
  res.json('TODO');
});
