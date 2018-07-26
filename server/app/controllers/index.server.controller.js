var passport = require('passport'),
    ConnectRoles = require('connect-roles');
exports.render = function (req, res) {
    if(req.user){
        console.log('role is ' + req.user.role);
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