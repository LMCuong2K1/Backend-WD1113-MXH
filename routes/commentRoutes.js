const { protect, admin } = require("../middlewares/authMiddleware");
const express = require("express");
const CommentController = require('../controllers/commentController');
const Comment = require('../models/Comment');
const validate = require('../middlewares/validate');
const { authorize } = require('../middlewares/authorize');
const { createCommentSchema, getCommentByPostSchema, deleteCommentSchema } = require('../validators/commentValidator');
const router = express.Router({ mergeParams: true });

router.post('/', protect, validate(createCommentSchema), CommentController.create);
router.get('/', validate(getCommentByPostSchema), CommentController.getCommentByPost);

router.delete('/:id', protect, validate(deleteCommentSchema), CommentController.delete);

module.exports = router;