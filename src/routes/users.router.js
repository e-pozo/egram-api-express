import { Router } from 'express';
const users = Router();

users.get('/', (req, res) => {
  res.json('TODO');
});

export default users;
