const express = require('express')
const router = express.Router();
const cors = require('cors');
const { toggleVideoLike, toggleCommentLike,getAllVideoLikes,getAllCommentLikes,userLikeComment,userLikeVideo } = require('../controllers/like.controller.js');
const auth = require('../middleware/auth.middlewares.js')

// use auth middleware to protect routes   
router.use(auth);

// toggle video like
router.route("/:videoId").patch(toggleVideoLike)
router.route("/:videoId").get(getAllVideoLikes)


// toggle comment like
router.route("/c/:commentId").patch(toggleCommentLike)
router.route("/c/:commentId").get(getAllCommentLikes)

router.route("check/:commentId").patch(userLikeComment)
router.route("check/:videoId").patch(userLikeVideo)

module.exports = router