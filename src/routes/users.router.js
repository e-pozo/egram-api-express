import { Router } from 'express';
import { userService } from '../services/user.service';
import { validatorHandler } from '../middlewares/validator.handler';
import { dataFilterToC, dataFilterToU } from '../schemas/user.schema';
import { login } from '../auth/authMiddlewares';
const users = Router();

users.get('/', async (_req, res, next) => {
  try {
    const users = await userService.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

users.post(
  '/',
  validatorHandler(dataFilterToU),
  async ({ body }, res, next) => {
    try {
      const user = await userService.create(body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
);
users.patch(
  '/:id',
  validatorHandler(dataFilterToU),
  async ({ params: { id }, body }, res, next) => {
    try {
      const user = await userService.update(id, body);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);
users.delete('/:id', async ({ params: { id } }, res, next) => {
  try {
    await userService.delete(id);
    res.json({ id });
  } catch (err) {
    next(err);
  }
});

users.post('/login', login);
export default users;
