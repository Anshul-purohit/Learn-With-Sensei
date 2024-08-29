const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
    razorpay_order_id: {
        type: String,
        required: true,
      },
      razorpay_payment_id: {
        type: String,
        required: true,
      },
      razorpay_signature: {
        type: String,
        required: true,
      },
      userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AuthUser"
      },
      courseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Courses" 
      }
},{timestamps:true})

const Payment = mongoose.model("Payment",paymentSchema)

module.exports = {
    Payment
}