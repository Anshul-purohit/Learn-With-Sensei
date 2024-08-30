const express = require('express')
const router = express.Router();
const cors = require('cors');
const { toggleVideoCheck, courseCheckVideo  } = require('../controllers/check.controller.js');
const auth = require('../middleware/auth.middlewares.js')

// use auth middleware to protect routes   
// router.use(auth);


router.route("/:courseId/:videoId").post(auth,toggleVideoCheck)
router.route("/check/:courseId").get(auth,courseCheckVideo) 


module.exports = router  
