import { Router } from 'express';
const users = Router();

users.get('/', (req, res) => {
  res.json({ msg: 'TODO' });
});

export default users;
