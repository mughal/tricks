const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ActiveDirectory = require('activedirectory');

const adConfig = {
  url: process.env.AD_URL,
  baseDN: process.env.AD_BASE_DN,
  username: process.env.AD_USERNAME,
  password: process.env.AD_PASSWORD
};
const ad = new ActiveDirectory(adConfig);

passport.use(new LocalStrategy(
  function(username, password, done) {
    ad.authenticate(username, password, function(err, auth) {
      if (err) {
        return done(err);
      }
      if (!auth) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      // Fetch user info from AD and pass it to done
      ad.findUser(username, function(err, user) {
        if (err) {
          return done(err);
        }
        return done(null, user);
      });
    });
  }
));


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    //return done(err, profile);
    console.log(profile);
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


