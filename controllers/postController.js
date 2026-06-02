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
  getById = catchAsync(async (req, res) => {});
  getAll = catchAsync(async (req, res) => {});
  update = catchAsync(async (req, res) => {});
  delete = catchAsync(async (req, res) => {});
}

module.exports = new PostController();
