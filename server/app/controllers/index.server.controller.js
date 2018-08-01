var passport = require('passport'),
    ConnectRoles = require('connect-roles');
exports.render = function (req, res) {
    if(req.user){
        res.render('IPD', {
        userFullName: req.user ? req.user.fullName : ''
        })
    }else{
        res.render('IPD', {
            userFullName: req.user ? req.user.fullName : ''
        });
    }
};