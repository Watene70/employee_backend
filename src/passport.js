const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("../config/keys");
const opts = {};
(opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()),
  (opts.secretOrKey = keys.secretKey);

const { usersController } = require("./controllers");

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        usersController.findById(jwt_payload.id, (err, user) => {
        if (err) {
          return done(err, null);
        } else {
          return done(null, user);
        }
      });
    })
  );
};
