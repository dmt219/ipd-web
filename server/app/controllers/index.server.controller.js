var passport = require('passport'),
    ConnectRoles = require('connect-roles');
exports.render = function (req, res) {
    res.render('IPD', {
        user: JSON.stringify(req.user)
    });
};