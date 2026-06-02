const Post = require("../models/Post");
const AppError = require("../utils/AppError");

class PostService {
  create = async (postInfo, authorId) => {
    const { title, content, category } = postInfo;
    const post = await Post.create({
      title,
      content,
      category,
      author: authorId,
    });
    return post;
  };
  getAll = async () => { };
  getById = async (postId) => {
    const post = await Post.findById(postId);
    if (!post) throw new AppError("Bài viết không tồn tại", 404);
    return post;
  };

  update = async (postId, contentChange) => {
  };
  delete = async (postId) => { };
}

module.exports = new PostService();
