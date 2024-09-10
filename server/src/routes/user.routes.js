const express = require('express')
const router = express.Router();
const cors = require('cors');
const jwt = require("jsonwebtoken")
const app = express();
const { check, test, registerUser, loginUser, getprofile, logoutUser, changeCurrentPassword, updateAccountDetails, updateUserAvatar, forgotPassword, resetPassword , verifyToken} = require('../controllers/user.controller.js');
const auth = require('../middleware/auth.middlewares.js')
const upload = require('../middleware/multer.middlewares.js')
const passport = require('passport') // passport initialization 
require('../utils/passport.js') // passport config file 
app.use(passport.initialize())

app.use(passport.session())

test
// router.use(
//     cors({
//         credentials: true,
//         origin: "http://localhost:5173"
//     })
// )

router.get('/', test)
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route("/verify-token/:token").post(verifyToken)
// router.post('/register',registerUser)

// authentication
router.route("/").get(test)
router.route("/check").get(check)
router.route("/auth/google").get(passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/auth/google/callback', (req, res, next) => {
    passport.authenticate('google',  (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            // return res.redirect('http://localhost:5174/Login');
            return res.redirect('https://learnwithsensei-frontend.onrender.com/login');
        }
        req.logIn(user, async (err) => {
            if (err) {
                return next(err);
            }
            const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
       
            user.tokens = user.tokens.concat({token})
            await user.save();
            res.cookie("access_token", token, {
                // expires: new Date(Date.now() + 24*60*60*1000),
                // httpOnly: true,
                // secure: false,
                // withCredentials: true
                
                expires: new Date(Date.now() + 24*60*60*1000),
                httpOnly: true,  // Optional: Set this if you don't want the cookie to be accessible via JavaScript
            secure: true,    // Must be true when using SameSite=None and HTTPS
            sameSite: 'None',// Required for cross-site cookies
            withCredentials: true 
            });
            
           
            // Redirect to the profile page
            // https://learnwithsensei-frontend.onrender.com
            // return res.redirect('http://localhost:5174/profile');
            return res.redirect('https://learnwithsensei-frontend.onrender.com/profile');
        });
    })(req, res, next);
});

//
// router.route("/auth/google/callback").get(passport.authenticate('google', { failureRedirect: "/login" }),
// router.get( '/auth/google/callback', 
// 	passport.authenticate( 'google', { 
// 		successRedirect: "/api/v1/users/check", 
// 		failureRedirect: "/api/v1/users/login"
// }));
// async  (req, res) => {
//     res.cookie("access_token", req.user.tokens[0].token,{
//         expires:new Date(Date.now() + 15*60*1000),
//         httpOnly:true,
//         secure: false,
//         withCredentials:true
//     })

//     res.redirect("api/v1/users/profile")
// }
// async (req, res) => {
//     res.cookie("access_token", req.user.tokens[0].token,{
//         expires:new Date(Date.now() + 15*60*1000),
//         httpOnly:true,
//         secure: false,
//         withCredentials:true

//     })

//     // res.redirect("api/v1/users/profile")
// }
// )

router.route("/login").post(loginUser)
router.route("/profile").get(auth, getprofile)
router.route("/change-password").post(auth, changeCurrentPassword)
router.route("/update-account").patch(auth, updateAccountDetails)

router.route("/avatar").patch(auth,  upload.fields([
    {
        name: "avatar",
        maxCount: 1
    }
]), updateUserAvatar)

router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password/:token").post(resetPassword)
// http://localhost:8000/reset-password/5e437f7606910ecd5a3d88e9166006a9acc2ec00
router.route("/logout").get(auth,logoutUser)


module.exports = router
