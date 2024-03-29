const mongoose = require('mongoose');


const CommentsSchema = new mongoose.Schema({

    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    comment: {
        type: String,
        required: true
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    },
    level: {
        type: Number,
        default: 0,
    },
    replies: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      }],


}, {timestamps: true}

);

module.exports = mongoose.model('Comment', CommentsSchema);