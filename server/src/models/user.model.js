const mongoose = require("mongoose")
const crypto = require("crypto")
const AuthUserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, 
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true, 
    },
    fullName: {
        type: String,
        required: true,
        trim: true, 
        index: true
    },
    avatar: {
        type: String, // cloudinary url
        required: false,
    },
    password:{
        type:String,
        required: [true, 'Password is required']
    },tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    isVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    verifyUserMailToken:String,
    verifyUserMailExpire:Date
},{timestamps:true})

AuthUserSchema.methods.getResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

    return resetToken;
};
AuthUserSchema.methods.getVerifyToken = function () {
    const verifyToken = crypto.randomBytes(20).toString("hex");

    this.verifyUserMailToken = crypto
        .createHash("sha256")
        .update(verifyToken)
        .digest("hex");

    this.verifyUserMailExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
    

    return verifyToken;
};

const AuthUser = mongoose.model("AuthUser",AuthUserSchema)


module.exports = {
    AuthUser
}