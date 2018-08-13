module.exports = function(app) {
    var IPD = require('../controllers/IPD.server.controller');
    app.get('/', IPD.render);
};