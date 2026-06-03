const commentService = require('../services/commentService');
const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/sendResponse');

class CommentController {
    getCommentByPost = catchAsync(async (req, res) => {
        const postId = req.params.postId;
        const comments = await commentService.getCommentByPost(postId);
        sendResponse(res, 200, "Lấy danh sách bình luận thành công!", comments);
    });
    create = catchAsync(async (req, res) => {
        const postId = req.params.postId;
        const userId = req.user._id;
        const { content } = req.body;
        const comment = await commentService.create(postId, userId, content);
        sendResponse(res, 200, "Tạo bình luận thành công!", comment);
    });
    delete = catchAsync(async (req, res) => {
        const userId = req.user._id;
        const commentId = req.params.id;
        const userRole = req.user.role;
        const results = await commentService.delete(commentId, userId, userRole);
        sendResponse(res, 200, "Xóa bình luận thành công!", results);
    });
}

module.exports = new CommentController();