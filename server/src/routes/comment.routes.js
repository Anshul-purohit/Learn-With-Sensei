const express = require('express');
const { getVideoComments, addComment, deleteComment , addReplyToComment} = require('../controllers/comment.controller.js');
const auth = require('../middleware/auth.middlewares.js');
const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

// Routes for handling comments

router.route('/:videoId').get(getVideoComments);
router.route('/add-comment/:videoId')
    .post(addComment);

router.route('/add-reply/:videoId/:commentId')
    .post(addReplyToComment)

router.route('/:commentId')

    .delete(deleteComment);

module.exports = router;
