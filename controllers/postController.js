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
    const postId = req.params;
    const post = await postService.findbyId(postId);
    sendResponse(res, 201, "Tìm kiếm bài viết thành công!", post);
  });
  getAll = catchAsync(async (req, res) => { });
  update = catchAsync(async (req, res) => {
    const postId = req.params;
    const { title, content, category, image } = req.body;
    const post = await postService.update(postId, { title, content, category, image });
    sendResponse(res, 201, "Cập nhật bài viết thành công!", post);
  });
  delete = catchAsync(async (req, res) => { });
}

module.exports = new PostController();
