var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');
    
module.exports = function (app) {
    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);
    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));
    app.get('/signout', users.signout);

    /*privileged routes*/
    require('../config/roles')(app);
    app.get('/private', user.can('access private page'), function (req, res) {
        res.render('private');
    });
    app.get('/admin', user.can('access admin page'), function (req, res) {
        res.render('admin');
    });

    

};