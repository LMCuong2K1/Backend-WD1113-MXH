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
  getAll = async () => {
    const post = await Post.find({});
    return post;
  };
  getById = async (postId) => {
    const post = await Post.findById(postId);
    if (!post) throw new AppError("Bài viết không tồn tại", 404);
    return post;
  };

  update = async (postId, contentChange) => {
    const post = await this.getById(postId);

    const filterData = {};
    Object.keys(contentChange).forEach(key => {
      if (contentChange[key] !== undefined)
        filterData[key] = contentChange[key];
    });
    Object.assign(post, filterData);
    await post.save();
    return post;
  };
  delete = async (postId, userId) => {
    const post = await this.getById(postId);
    const result = await post.delete(userId);
    return result;
  };
  like = async (postId, userId) => {
    let like = true;
    const post = await this.getById(postId);
    const user = post.likes.includes(userId);
    if (!user) {
      post.likes.push(userId);
    }
    else {
      post.likes.pull(userId);
      like = false;
    }
    await post.save();
    return { post, like };
  }
}

module.exports = new PostService();
