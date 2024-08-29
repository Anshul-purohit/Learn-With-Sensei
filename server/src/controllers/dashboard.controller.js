const mongoose = require("mongoose");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { Courses } = require("../models/courses.model");
const { AuthUser } = require("../models/user.model");
const { Like } = require("../models/like.model");


const getDashboardData = asyncHandler(async (req, res) => {
   // total users , total courses , total video category
   const totalUsers = await AuthUser.countDocuments();
   const totalCourses = await Courses.countDocuments();
   const totalVideoCategory = await Courses.distinct("category");
   
   return res.status(200).json(new ApiResponse(200, {totalUsers,totalCourses,totalVideoCategory}, "data fetched successfully"))
})  

module.exports = { getDashboardData }