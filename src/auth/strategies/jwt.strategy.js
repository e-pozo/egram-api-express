import { Strategy, ExtractJwt } from 'passport-jwt';
import config from '../../config';
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

export default new Strategy(opts, (payload, done) => done(null, payload));
