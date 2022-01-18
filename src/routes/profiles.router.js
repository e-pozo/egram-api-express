import { Router } from 'sequelize';
import { userService } from '../services/user.service';
import { ac, checkAccess } from '../auth/accessControl';
const profile = Router();

profile.get(
  '/:id',
  checkAccess((roles) => ac.can(roles).readAny('profile')),
  (req, res) => res.json('TODO')
);
