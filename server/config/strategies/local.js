var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../../app/models/user');
module.exports = function () {
    passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField:'password'
    },
    function (username, password, done) {
        User.findOne({
            email: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Unknown user'
                });
            }
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }
            return done(null, user);
        });
    }));
};