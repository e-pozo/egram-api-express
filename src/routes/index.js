import { Router } from 'express';
import users from './users.router';
export function useRoutes(app) {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/users', users);
}
