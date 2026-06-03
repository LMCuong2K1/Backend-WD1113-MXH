const Comment = require('../models/Comment');
const Post = require('../models/Post');
const postService = require('../services/postService');
const AppError = require('../utils/AppError');

class CommentService {
    getCommentByPost = async (postId) => {
        const comments = await Comment.find({ post: postId }).populate('author', 'name avatar');
        return comments;
    };
    getCommentById = async (commentId) => {
        const comment = await Comment.findById(commentId);
        if (!comment) throw new AppError("Bình luận không tồn tại!", 404);
        return comment;
    }
    create = async (postId, userId, content) => {
        const post = await postService.getById(postId);
        const comment = await Comment.create({
            content: content,
            author: userId,
            post: post.id
        });
        return comment;
    };
    delete = async (commentId, userId, userRole) => {
        const comment = await this.getCommentById(commentId);
        const postId = comment.post;
        const post = await Post.findById(postId);
        let canDelete = false;
        if (userId.equals(comment.author) || userId.equals(post.author) || userRole === "Admin") canDelete = true;
        if (canDelete === false) throw new AppError("Bạn không thể xóa bình luận này!", 403);
        const results = await comment.delete(userId);
        return results;
    }

}
module.exports = new CommentService();