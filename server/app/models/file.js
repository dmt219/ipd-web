var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var File = new Schema({
    _id: String,
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    file: {
        type:String
    },
    originalName: {
        type:String
    },
    shared:{
        type:Boolean
    }
},{ _id: false });
mongoose.model('File', File);
