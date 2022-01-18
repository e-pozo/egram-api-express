import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';
import boom from '@hapi/boom';
import { compare } from './hash';
import { userService } from '../services/user.service';

const token = (payload, expirationTime) =>
  jwt.sign(payload, jwtSecret, { expiresIn: expirationTime });

const payload = (user) => ({
  sub: user.id,
  roles: user.roles.map((roleData) => roleData.role),
});
export async function login({ body: { email, password } }, res, next) {
  try {
    const user = await userService.findByEmail(email);
    if (await compare(password, user.password)) {
      const userPayload = payload(user);
      res.json({
        token: token(userPayload, '14d'),
        refreshToken: token(userPayload, '4d'),
      });
    } else {
      throw null;
    }
  } catch (err) {
    next(boom.unauthorized('wrong password or email'));
  }
}

export async function refresh({ user: { sub } }, res, next) {
  try {
    const user = await userService.findOne(sub);
    res.json({ token: token(payload(user), '1d') });
  } catch (err) {
    next(boom.unauthorized('unauthorized'));
  }
}

// export async function checkMediaResourceAccess({ user: {sub}, params:{key}}, res, next){
//   try {
//     const user = await userService.findOne(sub);

//   }
// }
