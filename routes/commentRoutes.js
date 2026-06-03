const { protect, admin } = require("../middlewares/authMiddleware");
const express = require("express");
const CommentController = require('../controllers/commentController');
const Comment = require('../models/Comment');
const { authorize } = require('../middlewares/authorize');
const router = express.Router({ mergeParams: true });

router.post('/', protect, CommentController.create);
router.get('/', CommentController.getCommentByPost);

router.delete('/:id', protect, CommentController.delete);

module.exports = router;