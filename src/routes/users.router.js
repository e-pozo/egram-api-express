import { Router } from 'express';
import { userService } from '../services/user.service';
import { validatorHandler } from '../middlewares/validator.handler';
import { dataFilterToC, dataFilterToU } from '../schemas/user.schema';
import { login } from '../auth/authMiddlewares';
import passport from '../auth';
import { ac, checkAccess } from '../auth/accessControl';
import { user } from 'pg/lib/defaults';
const users = Router();
//ADMIN RESOURCES
users.get(
  '/',
  checkAccess((roles) => ac.can(roles).readAny('user')),
  async ({ query: { offset, limit } }, res, next) => {
    try {
      const users = await userService.find({ offset, limit });
      res.json(users);
    } catch (err) {
      next(err);
    }
  }
);
users.get(
  '/:id',
  checkAccess((roles) => ac.can(roles).readAny('user')),
  async ({ params: { id } }, res, next) => {
    try {
      const user = await userService.findOne(id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);
users.post(
  '/',
  checkAccess((roles) => ac.can(roles).createAny('user')),
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
  checkAccess((roles) => ac.can(roles).updateAny('user')),
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
users.delete(
  '/:id',
  checkAccess((roles) => ac.can(roles).deleteAny('user')),
  async ({ params: { id } }, res, next) => {
    try {
      await userService.delete(id);
      res.json({ id });
    } catch (err) {
      next(err);
    }
  }
);

export default users;
