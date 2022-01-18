import { Router } from 'express';
import { userService } from '../services/user.service';
import {
  checkAuthorizationOnAcceptFriend,
  checkAuthorizationOnBreakFriend,
} from '../services/friendship.service';
const friends = Router();

friends.get('/', async ({ user: { sub } }, res, next) => {
  try {
    const friends = await userService.friends(sub, 'ACCEPTED');
    res.json(friends);
  } catch (err) {
    next(err);
  }
});
friends.get('/broken', async ({ user: { sub } }, res, next) => {
  console.log(sub);
  try {
    const brokenFriendships = await userService.friends(sub, 'BROKEN');
    res.json(brokenFriendships);
  } catch (err) {
    next(err);
  }
});
friends.get('/received-requests', async ({ user: { sub } }, res, next) => {
  try {
    const requests = await userService.friendReceivedRequests(sub);
    res.json(requests);
  } catch (err) {
    next(err);
  }
});
friends.get('/sent-requests', async ({ user: { sub } }, res, next) => {
  try {
    const requests = await userService.friendSentRequests(sub);
    res.json(requests);
  } catch (err) {
    next(err);
  }
});

friends.patch(
  '/:id/accept',
  checkAuthorizationOnAcceptFriend,
  async ({ params: { id } }, res, next) => {
    try {
      const friendship = await userService.acceptFriendRequest(id);
      res.json(friendship);
    } catch (err) {
      next(err);
    }
  }
);

friends.patch(
  '/:id/break',
  checkAuthorizationOnBreakFriend,
  async ({ params: { id } }, res, next) => {
    try {
      const friendship = await userService.breakFriendship(id);
      res.json(friendship);
    } catch (err) {
      next(err);
    }
  }
);
friends.post(
  '/:id/create-request',
  async ({ user: { sub }, params: { id } }, res, next) => {
    try {
      const ans = await userService.createFriendRequest(sub, id);
      res.status(201).json(ans);
    } catch (err) {
      next(err);
    }
  }
);

export default friends;
