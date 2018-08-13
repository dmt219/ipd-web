var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');
var User = require('mongoose').model('User'); /*testing*/
var File = require('mongoose').model('File');/*testing*/
module.exports = function (app) {
    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);
    app.route('/signin')
        .get(users.renderSignin);
    app.post('/signin',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        })
    );
    app.get('/signout', users.signout);

    app.route('/forgot')
        .get(users.renderForgot)
        .post(users.forgot);

    app.route('/reset/:token')
        .get(users.renderReset)
        .post(users.reset);

    app.get('/oauth/facebook',passport.authenticate('facebook', {
        scope: ['email']
    }, {
        failureRedirect: '/signin'
    }));
    app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin',
        successRedirect: '/'
    }));

    app.get('/oauth/google',passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ],
    }));
    app.get('/oauth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin',
        successRedirect: '/'
    }));
    /*testing*/
    app.get('/usersList', function (req, res) {
        User.find({}, function (err, users) {
            var userMap = {};

            users.forEach(function (user) {
                userMap[user._id] = user;
            });

            res.send(userMap);
        });
    });

    app.get('/fileList', function (req, res) {
        File.find({}, function (err, datas) {
            var dataMap = {};

            datas.forEach(function (data) {
                dataMap[data._id] = data;
            });

            res.send(dataMap);
        });
    });



    /*privileged routes
    require('../../config/roles')(app);
    app.get('/private', user.can('access private page'), function (req, res) {
        res.render('private');
    });
    app.get('/admin', user.can('access admin page'), function (req, res) {
        res.render('admin');
    });
    */
};