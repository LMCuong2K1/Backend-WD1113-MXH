const mongooseDelete = require('mongoose-delete');
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Technology', 'Lifestyle', 'Education', 'Entertainment', 'Sports', 'Travel', 'Food', 'News', 'Other'],
        default: 'Other'
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    image: {
        type: String,
        default: ''
    }
}, { timestamps: true });

PostSchema.plugin(mongooseDelete, { deletedAt: true, deletedBy: true, overrideMethods: true });
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;