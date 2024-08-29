const mongoose = require("mongoose");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { Check} = require("../models/check.model");


const toggleVideoCheck = asyncHandler(async (req, res , next) => {

  const { videoId , courseId } = req.params;
  console.log("video id", videoId);
  // cheking if video is liked than do unlike else do like
  if(!videoId || !videoId.trim()){
    return next(new ApiError(400,"video id is required"))
  }
  if(!courseId || !courseId.trim()){
    return next(new ApiError(400,"course id is required"))
  }
  const checkCheck  = await Check.find({ video: videoId, checkedBy: req.user._id , courseId:courseId});
  console.log(checkCheck);
  if (checkCheck.length > 0) {
    const uncheck = await Check.findOneAndDelete({ video: videoId, checkedBy: req.user._id  , courseId:courseId});
    
    if (uncheck) {
      return res.status(200).json(new ApiResponse(200, {uncheck}, "unchecked successfully"));
    }
  } else {
    const check = await Check.create({
      video: videoId,
      LikedBy: req.user._id,
      courseId:courseId
    });
   
    if (check) {
      return res.status(200).json(new ApiResponse(200, {check}, "checked successfully"));
    }
  }

  return next (new ApiError(400, "something went wrong"));
})

const userCheckVideo = asyncHandler(async (req, res,next) => {
  const { videoId , courseId} = req.params;
  if(!videoId || !videoId.trim()){
    return next(new ApiError(400,"video id is required"))
  }
  if(!courseId || !courseId.trim()){
    return next(new ApiError(400,"course id is required"))
  }
  const checkCheck = await Check.find({ video: videoId, checkedBy: req.user._id , courseId:courseId});
  if (checkCheck.length > 0) {
    return res.status(200).json(new ApiResponse(200, true, "checked"));
  } else {
    return res.status(200).json(new ApiResponse(200, false, "not checked"));
  }
})


module.exports={
    toggleVideoCheck,
    userCheckVideo
}