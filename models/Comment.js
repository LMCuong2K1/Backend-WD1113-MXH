const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const CommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    content: {
        type: String,
        require: true
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Comment',
        default: null
    }
}, { timestamps: true });

CommentSchema.plugin(mongooseDelete, { deletedBy: true, deletedAt: true, overrideMethods: true });
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;