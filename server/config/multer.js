var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../public/client/resources')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});

// Multer configuration for single file uploads
exports.upload = multer({
    storage: storage
}).single('file');


