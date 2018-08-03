var users = require('../../app/controllers/users.server.controller'),
    file = require('../../app/controllers/file.server.controller');
module.exports = function (app) {
    app.route('/api/file')
        .get(file.list)
        .post(users.requiresLogin, file.create);
    app.route('/api/file/:fileId')
        .get(file.read)
        .put(users.requiresLogin, file.hasAuthorization, file.update)
        .delete(users.requiresLogin, file.hasAuthorization, file.delete);
    app.param('fileId', file.FileByID);
};