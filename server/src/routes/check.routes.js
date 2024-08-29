const express = require('express')
const router = express.Router();
const cors = require('cors');
const { toggleVideoCheck , userCheckVideo } = require('../controllers/check.controller.js');
const auth = require('../middleware/auth.middlewares.js')

// use auth middleware to protect routes   
router.use(auth);


router.route("/:courseId/:videoId").patch(toggleVideoCheck)
router.route("check/:courseId/:videoId").get(userCheckVideo) 


module.exports = router  
