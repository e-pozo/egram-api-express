import { Router } from 'express';
import users from './users.router';
import mediaContents from './mediaContents.router';
import friends from './friends.router';
import auth from './auth';
import passport from '../auth';
export function useRoutes(app) {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/auth', auth);
  router.use('/users', passport.authenticate('jwt', { session: false }), users);
  router.use(
    '/media-contents',
    passport.authenticate('jwt', { session: false }),
    mediaContents
  );
  router.use(
    '/friends',
    passport.authenticate('jwt', { session: false }),
    friends
  );
}
