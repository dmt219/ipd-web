var passport = require('passport'),
    ConnectRoles = require('connect-roles');
module.exports=function(app){
    var user = new ConnectRoles({
        failureHandler: function (req, res, action) {
            // optional function to customise code that runs when
            // user fails authorisation
            var accept = req.headers.accept || '';
            res.status(403);
            if (~accept.indexOf('html')) {
            res.render('access-denied', {action: action});
            } else {
            res.send('Access Denied - You don\'t have permission to: ' + action);
            }
        }
    })

    //admin users can access all pages
    user.use(function (req) {
        if (req.user.role === 'admin') {
        return true;
        }
    });

    app.use(user.middleware());
}