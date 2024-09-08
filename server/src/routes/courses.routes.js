const express = require('express')
const router = express.Router();
const cors = require('cors');
const {  
    getAllCourses, 
    createCourse,
    getUserCourses,
    getCourseById,
    addVideoToCourse,
    removeVideoFromCourse,
    deleteCourse,
    updateCourse } = require('../controllers/courses.controller.js');
const auth = require('../middleware/auth.middlewares.js')
const upload = require('../middleware/multer.middlewares.js');


// use auth middleware to protect routes   
// router.use(auth);

router.route("/").get(getAllCourses).post(auth, upload.fields([
    {
        name: "thumbnail",
        maxCount: 1
    }
]),createCourse);
// GET /api/courses?page=1&limit=10&query=javascript&sortBy=title&sortType=asc&userId=60c7bb9f4e43b25a885b9e9f

router.route("/:courseId")
        .get(auth, getCourseById)
        .patch(auth, upload.single("thumbnail"),updateCourse)
        .delete(auth, deleteCourse)

router.route("/add-video/:courseId/:videoId").patch(auth,addVideoToCourse)
router.route("/remove-video/:courseId/:videoId").patch(auth,removeVideoFromCourse)

router.route("/user-courses/:userId").get(auth,getUserCourses)
module.exports = router
