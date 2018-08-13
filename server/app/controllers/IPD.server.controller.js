var passport = require('passport'),
    ConnectRoles = require('connect-roles');
exports.render = function (req, res) {
    res.render('IPD', {
        userFullName: req.user ? req.user.fullName : ''
    });
};