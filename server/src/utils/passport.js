const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config();
const {AuthUser} = require("../models/user.model.js")
const jwt = require("jsonwebtoken")


const {hashPassword,comparePassword} = require("../helpers/auth.helpers.js")


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // callbackURL: "http://localhost:8000/api/v1/users/auth/google/callback",
    callbackURL: "https://learn-with-sensei.onrender.com/api/v1/users/auth/google/callback",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
 
    console.log(profile)
    console.log("user Email id"
    );
    console.log(profile.emails[0].value)

    const user = await AuthUser.findOne({email:profile.emails[0].value})
    console.log("user Profile")
    console.log(user)

    if(user){
        return done(null, user)
    }

    // Hash the password
    const password = Math.random().toString(36).slice(-8);
    const hashedPassword = await hashPassword(password);
    const newUser = await AuthUser.create({
      fullName:profile.displayName,
      username:profile.displayName.toLowerCase(),
      email:profile.emails[0].value,
      password:hashedPassword,
      // gender:profile.gender,
      avatar:profile.photos[0].value,
      isVerified:true
    })
    await newUser.save()
    const token = jwt.sign({_id:newUser._id},process.env.JWT_SECRET)
       
        newUser.tokens = newUser.tokens.concat({token})
        await newUser.save();


    return done(null, newUser);
  }
));

// how to also store user data in session
// Serialize user to save data in session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user to retrieve data from session
passport.deserializeUser((user, done) => {
  done(null, user);
});
