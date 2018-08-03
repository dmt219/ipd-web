var mongoose = require('mongoose'),
    File = mongoose.model('File');
var getErrorMessage = function (err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
            message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.create = function (req, res) {
    var file = new File(req.body);
    file.creator = req.user;
    file.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(file);
        }
    });
};

exports.list = function (req, res) {
    File.find().sort('-created').populate('creator', 'firstName lastName fullName ').exec(function (err, file) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(file);
        }
    });
};

exports.FileByID = function (req, res, next, id) {
    File.findById(id).populate('creator', 'firstName lastName fullName ').exec(function (err, file) {
        if (err) return next(err);
        if (!File) return next(new Error('Failed to load File '+id));
        req.file = file;
        next();
    });
};

exports.read = function (req, res) {
    res.json(req.file);
};

exports.update = function (req, res) {
    var file = req.file;
    file.title = req.body.title;
    file.content = req.body.content;
    file.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(file);
        }
    });
};

exports.delete = function (req, res) {
    var file = req.file;
    file.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(file);
        }
    });
};

exports.hasAuthorization = function (req, res, next) {
    if (req.file.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};