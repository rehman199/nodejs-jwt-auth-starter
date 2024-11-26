import passport from "passport";
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptionsWithRequest,
} from "passport-jwt";
import User from "../models/user";

const strategyOptions: StrategyOptionsWithRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET ?? "secret",
  passReqToCallback: true,
};

export default () => {
  passport.use(
    "jwt",
    new JwtStrategy(strategyOptions, async (jwt_payload, done) => {
      try {
        const user = await User.findOne({ id: jwt_payload.id });
        return user ? done(null, user) : done(null, false);
      } catch (err) {
        return done(err, false);
      }
    }),
  );
};
