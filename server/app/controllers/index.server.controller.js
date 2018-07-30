var passport = require('passport'),
    ConnectRoles = require('connect-roles');
exports.render = function (req, res) {
    if(req.user){
        res.render('index', {
        title: 'Hello World',
        userFullName: req.user ? req.user.fullName : ''
        })
    }else{
        res.render('index', {
            title: 'Hello World',
            userFullName: req.user ? req.user.fullName : ''
        });
    }
};