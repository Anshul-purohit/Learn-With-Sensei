const { hashPassword,comparePassword } = require("../helpers/auth.helpers.js");
const { AuthUser} = require("../models/user.model.js");
const jwt = require("jsonwebtoken")
const { json } = require("express");
const { sendEmail } = require("../utils/sendEmail.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const crypto = require("crypto")
const ApiError = require("../utils/ApiError.js")
const {ApiResponse} = require("../utils/ApiResponse.js")
const asyncHandler = require("../utils/asyncHandler.js");
const { type } = require("os");

//  jay hind dosto

const test = asyncHandler(async (req,res)=>{
    res.render('../helpers/logingoogle.ejs');
})
    

const check = asyncHandler(async (req,res)=>{
    res.cookie("access_token", req.user.tokens[0].token,{
        expires: new Date(Date.now() + 15* 60 * 1000), // Cookie expires in 1 day
        httpOnly: true,  // Optional: Set this if you don't want the cookie to be accessible via JavaScript
        secure: true,    // Must be true when using SameSite=None and HTTPS
        sameSite: 'None',// Required for cross-site cookies
        withCredentials: true // Set to true if you want to send cookies with cross-site requests
            })
            res.redirect("api/v1/users/Profile")
        
})
const registerUser = asyncHandler(async (req,res,next)=>{
    const {fullName, email, username, password} = req.body;
    if(!fullName){
        return next( new ApiError(400,"fullName the fields are Required"))
    }
    if(!password || password.length<6){
       return next(new ApiError(400,"password required and password should be at least 6 characters"))
     }

     if(!username){
        return next( new ApiError(400,"username fields are Required"))
     }
     
     if(!email){
        return next(new ApiError(400,"email fields are Required"))
     }
    // verify email format 
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return next(new ApiError(400,"Please provide a valid email"))
    }
     const existedUser = await AuthUser.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
       return next(new ApiError(400, 'User already exists'));
    }
    //  Check if req.files and req.files.avatar exist
    // console.log(req);
    //  if (!req.file || !req.file.avatar || !req.file.avatar[0]) {
    //     throw new ApiError(400, 'Please provide an avatar');
    //   }
    let avatarLocalPath;

if (req.files && req.files.avatar && req.files.avatar.length > 0) {
    avatarLocalPath = req.files.avatar[0].path;
} else {
   return next(new ApiError(400, 'Please provide an avatar'));
}
    if (!avatarLocalPath) {
       return next(new ApiError(400, 'Please provide an avatar'));
    }


    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if(!avatar){
       return next(new ApiError(400,"Error while uploading avatar"))
    }

     const hashedPassword = await hashPassword(password)
    const user = await AuthUser.create({
        fullName,
        username:username.toLowerCase(),
        email,
        password:hashedPassword,
        avatar:avatar.url
    })


    if(!user)
    {
        return next(new ApiError(400,"User not created"))
    }
    // send email
    const verifyToken = await user.getVerifyToken();
    await user.save();


    // const verifyLink = `https://sensei-backend-bjr2.onrender.com/users/verify-token/${verifyToken}`; // path of frontend page
    const verifyLink = `https://learnwithsensei-frontend.onrender.com/users/verify-token/${verifyToken}`; // URL of the frontend route


    const mail_send = sendEmail(
        email,
        "Welcome to Learn With Sensei",
        `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 10px; text-align: center;">
    <div style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
        <h1 style="color: #333333;">Welcome to Education Hub</h1>
        <p style="font-size: 16px; color: #666666;">
            <b>Hello ${user.fullName},</b><br><br>
            Welcome to our community! We are thrilled to have you join us. Here, you'll discover a wealth of resources, support, and connections to enrich your educational journey.
        </p>
        <p style="font-size: 16px; color: #666666;">
            To get started, please verify your email address by clicking the button below:
        </p>
        <a href="${verifyLink}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">Verify Email</a>
        <p style="font-size: 14px; color: #999999; margin-top: 20px;">
            Best Regards,<br>
            The Education Hub Team
        </p>
    </div>
    <footer style="font-size: 12px; color: #aaaaaa; margin-top: 20px;">
        If you did not sign up for this account, please disregard this email.
    </footer>
</div>`


    );
    

    if(!mail_send)
    {
        return next(new ApiError(400,"Error while sending email"))
    }

    return res.status(201).json( new ApiResponse(201,"User Created Successfully and Verify Email Sent",user))
    // return res.json(user + "User Created Successfully and Verify Email Sent")
}
)
const verifyToken = asyncHandler( async(req,res,next)=>{
        const {token}=req.params;
        
        const verifyUserMailToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

        const user= await AuthUser.findOne({
            verifyUserMailToken,
            verifyUserMailExpire:{
                $gt:Date.now()
            }
        })

        if(!user){
            return next(new ApiError(401," Invalid Token || Token Expired"))
        }
        user.isVerified = true
        // make it null and delete it
        user.verifyUserMailToken = undefined
        user.verifyUserMailExpire = undefined


        // delete user.verifyUserMailToken && delete user.verifyUserMailExpire
        await user.save();

        res.status(200).json(new ApiResponse(200,"User Verified Successfully",user))

        
})
const loginUser = asyncHandler( async (req,res,next)=>{

    const {email, username, password} = req.body;
        if(!email)
       {
        return next( new ApiError(400,"Email is required"))
       }

       if(!password)
       {
        return next( new ApiError(400,"Password is required"))
       }

       if(!username)
       {
        return next( new ApiError(400,"username is required"))
       }

       const user = await AuthUser.findOne({
        $and: [{username}, {email}]
    })
       if(!user){
        return next( new ApiError(400,"User not found"))
       }
// check if password match stor cookie and set on background
       const match = await comparePassword(password,user.password)
       // check alos user if verified else give error that first do mail verification
       // assign cookie , jwt 
       if (match && user.isVerified) {
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
       
        user.tokens = user.tokens.concat({token})
        await user.save();

        res.cookie("access_token",token,{
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Cookie expires in 1 day
            httpOnly: true,  // Prevents JavaScript access
            secure: true,    // Ensures cookies are sent over HTTPS
            sameSite: 'None' // Required for cross-site cookies
        })
    }
    
       if(!match)
       {
       return next( new ApiError(400,"Password is incorrect"))
       }
       if(!user.isVerified)
       {
        return next( new ApiError(400,"Please verify your email"))
        // throw new ApiError(400,"Please verify your email")
       }
       return res.status(200).json(new ApiResponse(200,"Login Successfully",user))


})

const logoutUser = asyncHandler( async (req,res,next)=>{

    try {
        console.log("logout");
        req.user.tokens = req.user.tokens.filter((c)=> c.token !== req.token)
        res.clearCookie("access_token");
     
        await req.user.save();
        res.status(200).json(new ApiResponse(200,"Logout Successfully"))
    } catch (error) {
        console.log(error);
    }
})
const getprofile = asyncHandler(async (req,res,next)=>{

    try {
        // do not show password

        const user = await AuthUser.findById(req.user)
        res.status(200).json(new ApiResponse(200,"Profile",user))
    } catch (error) {
        console.log(error);
    }
})

const changeCurrentPassword = asyncHandler( async (req,res,next)=>{

    
        const {oldPassword, newPassword} = req.body
        if(!oldPassword)
       {
       return next( new ApiError(400,"oldPassword is required"))
       }
    //    console.log("CC : ",typeof(newPassword.length))
       if(!newPassword || newPassword.length<6)
       {
        return next( new ApiError(400,"newPassword is required and should be at least 6 characters"))
       }
    //    console.log(typeof(oldPassword))
    //    console.log(typeof(newPassword))
       if(oldPassword === newPassword){
        // return res.send("Password should not be same")
        return next( new ApiError(400,"newPassword should not be same as oldPassword"))
       } 

       const user = await AuthUser.findById(req.user)
       const checkoldpassword = await comparePassword(oldPassword,user.password)
       if(!checkoldpassword)
       {
        return next( new ApiError(400,"oldPassword is incorrect"))
       }
       if(newPassword.length < 6){
        return next( new ApiError(400,"newPassword should be at least 6 characters"))
       }    

       const hashedPassword = await hashPassword(newPassword)
       user.password = hashedPassword
       await user.save()

       res.status(200).json(new ApiResponse(200,"Password Changed Successfully"))

    

})

const updateAccountDetails = asyncHandler(async (req,res,next)=>{

   
        const {fullName, username, email} = req.body
        const user = await AuthUser.findById(req.user)
        user.fullName = fullName ?? user.fullName; // Use the new value or retain the old one if not provided
    user.username = username ?? user.username;
    user.email = email ?? user.email;
    // user.gender = gender ?? user.gender;
        await user.save()
        res.status(200).json(new ApiResponse(200,"Account Details Updated Successfully",user))
   
})
const updateUserAvatar = asyncHandler( async (req,res,next)=>{
    
    
       
        let avatarLocalPath;
console.log(req.files);

if (req.files && req.files.avatar && req.files.avatar.length > 0) {
    avatarLocalPath = req.files.avatar[0].path;
} else {
    return next(new ApiError(400, 'Please provide an avatar'));
}
    if (!avatarLocalPath) {
        return next(new ApiError(400, 'Please provide an avatar'));
    }

        const avatar = await uploadOnCloudinary(avatarLocalPath)
        if(!avatar){
            return next(new ApiError(400,"Error while uploading avatar"))
        }
        const updatedUser = await AuthUser.findByIdAndUpdate(
            req.user, {
           $set :{
            avatar:avatar.url
           }
        },{new:true}
        )

        res.status(200).json(new ApiResponse(200,"Avatar Updated Successfully",updatedUser))


   
})

const forgotPassword = asyncHandler( async (req,res,next)=>{
// description of below code
// send email to user with reset token and link to reset password
// if user does not exist send error
// if user exist send email

    try {
        const {email} = req.body
        if(!email)
       {
       return next( new ApiError(400,"Email is required"))
       }

       const user = await AuthUser.findOne({email})
       if(!user){
        return next( new ApiError(400,"User not found"))
       }
    //    console.log(email)
       const resetToken = await user.getResetToken();
       await user.save();

       const resetUrl = `http://localhost:8000/reset-password/${resetToken}`;
    //    const htmlContent = `
    //    <p>You requested a password reset</p>
    //    <p>Click this <a href="${resetUrl}">link</a> to reset your password</p>
    // `;

    //    const data = {
    //     to:email,
    //     subject:"Reset your password",
    //     text:htmlContent
    //    }
       await sendEmail(
        email,
        "Password reset request",
        `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 10px; text-align: center;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
            <h1 style="color: #333333;">Password Reset Request</h1>
            <p style="font-size: 16px; color: #666666;">You requested a password reset for your account. Click the link below to reset your password:</p>
            <a href="${resetUrl}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">Reset Password</a>
            <p style="font-size: 14px; color: #999999; margin-top: 20px;">If you did not request a password reset, please ignore this email.</p>
        </div>
        <footer style="font-size: 12px; color: #aaaaaa; margin-top: 20px;">
            This email was sent automatically. Please do not reply.
        </footer>
    </div>
`    
       )

       res.status(200).json(new ApiResponse(200,"Password reset link sent to your email"))


    } catch (error) {
        console.log(error);
    }
}
)
const resetPassword = asyncHandler( async (req,res,next)=>{
// description of below code
// reset password , user will have to enter new password
// it match with dataset and if match update password
// make null resetToken and expireToken

    try {
        const {password,confirmPassword} = req.body
        const { token } = req.params;
        if(!password){
            return next( new ApiError(400,"password is required"))
        }
        if(!confirmPassword){
            return next( new ApiError(400,"confirmPassword is required"))
        }

        if(password !== confirmPassword){
            return next( new ApiError(400,"password and confirmPassword should be same"))
        }

        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");
    
        const user = await AuthUser.findOne({
            resetPasswordToken,
            resetPasswordExpire: {
                $gt: Date.now(),
            },
        });
    
        if(!user){
            return next( new ApiError(400,"Invalid or expired password reset token"))
        }
        const hashedPassword = await hashPassword(password)
        user.password = hashedPassword
        user.resetToken = null
        user.expireToken = null
        await user.save()

        res.status(200).json(new ApiResponse(200,"Password Reset Successfully"))
    }

    catch (error) {
        console.log(error);
    }
})

module.exports = {
    test,
    registerUser,
    loginUser,
    logoutUser,
    getprofile,
    changeCurrentPassword,
    updateAccountDetails,
    updateUserAvatar,
    forgotPassword,
    resetPassword,
    verifyToken,
    check

}