const express = require('express')
const router = express.Router();
const cors = require('cors');
const { getAllVideos, getVideoById, updateVideo, deleteVideo, publishAVideo, togglePublishStatus } = require('../controllers/video.controller.js');
const auth = require('../middleware/auth.middlewares.js')
const upload = require('../middleware/multer.middlewares.js');



// use auth middleware to protect routes   
router.use(auth);

// http://localhost:8000/videos?page=1&limit=10&query=searchTerm&sortBy=createdAt&sortType=desc&userId=12345

router.route("/").get(getAllVideos)
 
router.
    route("/:courseId")
    .post(
        upload.fields([
        {
            name: "videoFile",
            maxCount: 1
        }
    ])
    ,publishAVideo
    );
router.route("/:courseId/:videoId").delete(deleteVideo);

router
    .route("/c/:videoId")
    .get(getVideoById)
    // .delete(deleteVideo)
    .patch(updateVideo);

router.route("/toggle-published/:videoId").patch(togglePublishStatus);

module.exports = router








