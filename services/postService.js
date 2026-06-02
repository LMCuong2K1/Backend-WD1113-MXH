const Post = require("../models/Post");

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
  getAll = async () => {};
  getById = async () => {};
  update = async (postId) => {};
  delete = async (postId) => {};
}

module.exports = new PostService();
