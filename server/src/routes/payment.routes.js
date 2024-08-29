const express = require('express')
const router = express.Router();
const cors = require('cors');
const auth = require('../middleware/auth.middlewares.js');   
const { coursePayment, getKey, verifyPayment } = require('../controllers/payment.controller.js');


router.use(auth);


router.route('/course-payment').post(coursePayment)
router.route('/razorkey').get(getKey)
router.route('/payment-verification/:courseID').post(verifyPayment)


module.exports = router
