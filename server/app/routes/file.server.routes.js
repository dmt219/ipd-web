var users = require('../../app/controllers/users.server.controller'),
    file = require('../../app/controllers/file.server.controller');
module.exports = function (app) {
    app.route('/api/file')
        .get(file.listByUser)
        
    app.route('/api/file/:fileId')
        .get(file.FileByID)
        .post(users.requiresLogin,file.create)
        .put(users.requiresLogin,file.FileByID, file.hasAuthorization, file.update)
        .delete(users.requiresLogin,file.FileByID, file.hasAuthorization, file.delete);
    
        
};