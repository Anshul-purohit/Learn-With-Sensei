// const { hashPassword,comparePassword } = require("../helpers/auth.helpers.js");
const { AuthUser} = require("../models/user.model.js");
// const jwt = require("jsonwebtoken")
// const { json } = require("express");
// const { sendEmail } = require("../utils/sendEmail.js");
// const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const crypto = require("crypto")
const ApiError = require("../utils/ApiError.js")
const {ApiResponse} = require("../utils/ApiResponse.js")
const asyncHandler = require("../utils/asyncHandler.js")
const {Courses} = require("../models/courses.model")
const razorpay = require("razorpay");
const { Payment } = require("../models/payment.model.js");

const instance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });

const coursePayment = asyncHandler(async (req,res)=>{
    const {fee,} = req.body

    if(!fee){
        throw new ApiError(400,"fee is required")
    }

    const options = {
        amount: fee*100, // amount in the smallest currency unit
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex")
    }
    const order = await instance.orders.create(options)
    console.log(order)
    return res.status(200).json(new ApiResponse(200,order))

})

const verifyPayment = asyncHandler(async (req,res)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body
    const studentID = req.user._id

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
        throw new ApiError(400,"razorpay order id, razorpay payment id or razorpay signature is missing")
    }
    const {courseID} = req.params

    if(!courseID || !courseID.trim()){
        throw new ApiError(400,"course id is required")
    }
    console.log(courseID);
    const course = await Courses.findById(courseID)
    if(!course){
        throw new ApiError(404,"course not found")
    }
    const user = await AuthUser.findById(studentID)
    if(!user){
        throw new ApiError(404,"user not found")
    }
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

    const isAuth = expectedSignature === razorpay_signature
    if(isAuth){
        const orderDetails = await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            userID:studentID,
            courseID
        })
        return res.status(200).json(new ApiResponse(200,orderDetails,"Payment verified"))
        
    }
    else
    {
        throw new ApiError(400,"Payment verification failed")
    }
})

const getKey = asyncHandler(async (req,res)=>{
    return res.status(200).json(new ApiResponse(200,process.env.RAZORPAY_KEY_ID,"Razorpay key"))
})
module.exports = {
    coursePayment,
    verifyPayment,
    getKey
}
