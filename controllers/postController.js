const catchAsync = require("../utils/catchAsync");
const sendResponse = require("../utils/sendResponse");
const postService = require("../services/postService");
class PostController {
  create = catchAsync(async (req, res) => {
    const { title, content, category } = req.body;
    const authorId = req.user._id;
    const post = await postService.create(
      { title, content, category },
      authorId,
    );
    sendResponse(res, 201, "Tạo bài viết thành công!", post);
  });
  getById = catchAsync(async (req, res) => {
    const postId = req.params.id;
    const post = await postService.findbyId(postId);
    sendResponse(res, 200, "Tìm kiếm bài viết thành công!", post);
  });
  getAll = catchAsync(async (req, res) => {
    const post = await postService.getAll({});
    sendResponse(res, 200, "Tìm bài viết thành công", post);
  });
  update = catchAsync(async (req, res) => {
    const postId = req.params.id;
    const { title, content, category, image } = req.body;
    const post = await postService.update(postId, { title, content, category, image });
    sendResponse(res, 200, "Cập nhật bài viết thành công!", post);
  });
  delete = catchAsync(async (req, res) => {
    const postId = req.params.id;
    const userId = req.user._id;
    const result = await postService.delete(postId, userId);
    sendResponse(res, 204, "Xóa bài viết thành công!", result);
  });

  like = catchAsync(async (req, res) => {
    const postId = req.params.id;
    const userId = req.user._id;
    const { post, like } = await postService.like(postId, userId);
    sendResponse(res, 200, (like === true ? "Like" : "Unlike") + " thành công!", post);
  })
}

module.exports = new PostController();
