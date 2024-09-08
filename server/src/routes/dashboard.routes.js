const express = require('express')
const router = express.Router();
const cors = require('cors');
const { getDashboardData } = require('../controllers/dashboard.controller.js');

router.route('/').get(getDashboardData)

module.exports = router

