import { Router } from 'express';
import { userService } from '../services/user.service';
const users = Router();

users.get('/', (req, res) => {
  res.json({ msg: 'TODO' });
});
users.post('/', async ({ body }, res, next) => {
  try {
    const user = await userService.create(body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});
export default users;
