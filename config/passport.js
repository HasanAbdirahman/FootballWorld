const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { Router } = require("express");
let passport = require("passport");
let User = require("../model/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ googleId: profile.id }, function (err, user) {
        if (err) return cb(err);
        if (user) {
          return cb(null, user);
        } else {
          let newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });
          newUser.save(function (err) {
            if (err) {
              return cb(err);
            } else {
              return cb(null, newUser);
            }
          });
        }
      });
    }
  )
);
// new user that was created so that we can set up a session
// this is where u can use done() function
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// when a request comes in from an existing user
// and we want to assign to the req.user object
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      cb(err);
    } else {
      done(null, user);
    }
  });
});
