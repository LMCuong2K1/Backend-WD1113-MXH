const { protect, admin } = require("../middlewares/authMiddleware");
const express = require("express");
const PostController = require('../controllers/postController');
const Post = require('../models/Post');
const { authorize } = require('../middlewares/authorize');
const router = express.Router();

router.post('/', protect, PostController.create);
router.get('/:id', PostController.getById);
router.get('/', PostController.getAll);
router.put('/:id', protect, authorize(Post, ["Admin"], true), PostController.update);
router.delete('/:id', protect, authorize(Post, ["Admin"], true), PostController.delete);

router.post('/:id/like',protect,PostController.like);
module.exports = router;
