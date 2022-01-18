import { Router } from 'express';
import { validatorHandler } from '../middlewares/validator.handler';
import { dataFilterToC, dataFilterLogin } from '../schemas/user.schema';
import { login, refresh } from '../auth/authMiddlewares';
import { userService } from '../services/user.service';
import passport from '../auth';
const auth = Router();

auth.post(
  '/signin',
  validatorHandler(dataFilterToC),
  async ({ body }, res, next) => {
    try {
      const user = await userService.createUser(body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
);

auth.post('/login', validatorHandler(dataFilterLogin), login);
auth.post(
  '/refresh',
  passport.authenticate('jwt', { session: false }),
  refresh
);

export default auth;
