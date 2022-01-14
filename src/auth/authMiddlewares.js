import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';
import boom from '@hapi/boom';
import { compare } from './hash';
import { userService } from '../services/user.service';

const token = (payload, expirationTime) =>
  jwt.sign(payload, jwtSecret, { expiresIn: expirationTime });

export async function login({ body: { email, password } }, res, next) {
  try {
    const user = await userService.findByEmail(email);
    if (await compare(password, user.password)) {
      const payload = {
        sub: user.id,
        roles: user.roles.map((roleData) => roleData.role),
      };
      res.json({
        token: token(payload, '15m'),
        refreshToken: token(payload, '4d'),
      });
    } else {
      throw null;
    }
  } catch (err) {
    next(boom.unauthorized('wrong password or email'));
  }
}
