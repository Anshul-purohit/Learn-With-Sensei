const express = require('express')
const router = express.Router();
const cors = require('cors');
const { getDashboardData } = require('../controllers/dashboard.controller.js');
const auth = require('../middleware/auth.middlewares.js')
router.use(auth);

router.route('/').get(getDashboardData)

module.exports = router

