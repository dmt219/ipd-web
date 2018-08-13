var mongoose = require('mongoose'),
    File = mongoose.model('File'),
    fs= require('fs'),
    multer =require('../../config/multer');
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

exports.list = function (req, res) {
    File.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            console.log(data);
            res.json(data);
        }
    });
};

exports.listByUser = function (req, res) {
    File.find({creator:req.user}).sort('-created').populate('creator', 'firstName lastName fullName').exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            console.log(data);
            res.json(data);
        }
    });
};

exports.FileByID = function (req, res) {
    var _id = req.params.fileId;
    console.log(_id);
    File.findById(_id).populate('creator', 'firstName lastName fullName').exec(function (err, data) {
        console.log(data);
        if (err) return next(err);
        if (!File) return next(new Error('Failed to load File '+_id));
        res.json(data);
    });
};

exports.update = function (req, res) {
    var data = req.data;
    data.title = req.body.title;
    data.content = req.body.content;
    data.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    });
};

exports.delete = function (req, res) {
    var data = req.data;
    data.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    });
};

exports.hasAuthorization = function (req, res, next) {
    if (req.data.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};

exports.create = function(req,res){
    console.log(req.file);
    var data =new File();
    data._id=req.body._id;
    data.title=req.body.title;
    data.content=req.body.content;
    data.creator=req.user;
    data.originalName =req.file.originalname;
    multer.upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
    });
   
   data.file = fs.readFileSync(req.file.path,'utf8');
   data.save(function (err) {
    if (err) {
        console.log(err);
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.json(data);
    }
    });
}

