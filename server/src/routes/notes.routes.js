const express = require('express')
const router = express.Router();
const cors = require('cors');
const { UpdateNotes, getNotes } = require('../controllers/notes.controller.js');
const auth = require('../middleware/auth.middlewares.js')

// use auth middleware to protect routes   
router.use(auth);


router.route("/:videoId").post(UpdateNotes)
router.route("/:videoId").get(getNotes)



module.exports = router 
