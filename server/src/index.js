const express = require('express') // server 
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express();
const {mongoose} = require('mongoose');
const razorpay = require("razorpay")
const session = require('express-session');
const errorHandler = require('./middleware/Error.middlewares.js')



dotenv.config({
    path: './.env'
})

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// app.use(cookieParser())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}))



// console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
 console.log("Database Connected");   
}).catch((err) => {
    console.log("Database not connected",err);
});
app.use(express.json())

// cookie parser
app.use(cookieParser())
// write comment about below
// url encoded is used for form data in postman request
app.use(express.urlencoded({extended:false}))



// routes import
app.use('/api/v1/users',require('./routes/user.routes.js'))
app.use('/api/v1/videos',require('./routes/video.routes.js'))
app.use('/api/v1/courses',require('./routes/courses.routes.js'))
app.use('/api/v1/comments',require('./routes/comment.routes.js'))
app.use('/api/v1/likes',require('./routes/like.routes.js'))
app.use('/api/v1/payments',require('./routes/payment.routes.js'))
app.use('/api/v1/dashboard',require('./routes/dashboard.routes.js'))
app.use('/api/v1/notes',require('./routes/notes.routes.js'))
app.use('/api/v1/check',require('./routes/check.routes.js'))

app.use(errorHandler)


const port = process.env.PORT || 8000;
app.listen(port,()=>console.log(`server is running on port ${port}`))