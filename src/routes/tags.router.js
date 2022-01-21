import { Router } from 'express';
import {
  onlyCreatorClosure as accessTagOnlyCreatorClosure,
  tagService,
} from '../services/tag.service';
import { checkOnlyCreatorClosure as accessMediaContentOnlyCreatorClosure } from '../services/mediaContent.service';
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

router.post(
  '/:tagId/addContent/:contentId',
  accessTagOnlyCreatorClosure((req) => [req.user.sub, req.params.tagId]),
  accessMediaContentOnlyCreatorClosure((req) => [
    req.user.sub,
    req.params.contentId,
  ]),
  async ({ params: { tagId, contentId } }, res, next) => {
    try {
      const tagRelation = await tagService.addContent(tagId, contentId);
      res.json(tagRelation);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/:tagId/removeContent/:contentId',
  accessTagOnlyCreatorClosure((req) => [req.user.sub, req.params.tagId]),
  accessMediaContentOnlyCreatorClosure((req) => [
    req.user.sub,
    req.params.contentId,
  ]),
  async ({ params: { tagId, contentId } }, res, next) => {
    try {
      const tagRelation = await tagService.removeContent(tagId, contentId);
      res.json(tagRelation);
    } catch (err) {
      next(err);
    }
  }
);

router.get('/', async ({ user: { sub }, res, next }) => {
  try {
    const tags = await tagService.userTags(sub);
    res.json(tags);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async ({ user: { sub }, params: { id } }, res, next) => {
  try {
    const mediaContents = await tagService.detail(id, sub);
    res.json(mediaContents);
  } catch (err) {
    next(err);
  }
});

router.patch(
  '/:id',
  accessTagOnlyCreatorClosure((req) => [req.user.sub, req.params.id]),
  async ({ body, params: { id } }, res, next) => {
    try {
      const tag = await tagService.update(id, body);
      res.json(tag);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:id',
  accessTagOnlyCreatorClosure((req) => [req.user.sub, req.params.id]),
  async ({ params: { id } }, res, next) => {
    try {
      const response = await tagService.delete(id);
      res.json(response);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
