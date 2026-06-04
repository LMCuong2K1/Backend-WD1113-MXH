const { protect, admin } = require("../middlewares/authMiddleware");
const express = require("express");
const PostController = require('../controllers/postController');
const Post = require('../models/Post');
const { authorize } = require('../middlewares/authorize');
const commentRoutes = require('./commentRoutes');
const validate = require('../middlewares/validate');
const { createPostSchema, updatePostSchema, getPostByIdSchema, getAllPostSchema, deletePostSchema } = require('../validators/postValidator');
const router = express.Router();

router.post('/', protect, validate(createPostSchema), PostController.create);
router.get('/:id', validate(getPostByIdSchema), PostController.getById);
router.use('/:postId/comments', commentRoutes);
router.get('/', validate(getAllPostSchema), PostController.getAll);
router.put('/:id', protect, authorize(Post, ["Admin"], true), validate(updatePostSchema), PostController.update);
router.delete('/:id', protect, authorize(Post, ["Admin"], true), validate(deletePostSchema), PostController.delete);
router.post('/:id/like', protect, PostController.like);
module.exports = router;
