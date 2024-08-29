const mongoose = require("mongoose");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { Like } = require("../models/like.model");


const toggleVideoLike = asyncHandler(async (req, res) => {

  const { videoId } = req.params;
  console.log("video id", videoId);
  // cheking if video is liked than do unlike else do like
  if(!videoId || !videoId.trim()){
    throw new ApiError(400,"video id is required")
  }
  const checkLike = await Like.find({ video: videoId, LikedBy: req.user._id });
  console.log(checkLike);
  if (checkLike.length > 0) {
    const unlike = await Like.findOneAndDelete({ video: videoId, LikedBy: req.user._id });
    const likes = await Like.countDocuments({video:videoId})
    if (unlike) {
      return res.status(200).json(new ApiResponse(200, {unlike,likes}, "unliked successfully"));
    }
  } else {
    const like = await Like.create({
      video: videoId,
      LikedBy: req.user._id,
    });
    const likes = await Like.countDocuments({video:videoId})
    if (like) {
      return res.status(200).json(new ApiResponse(200, {like,likes}, "liked successfully"));
    }
  }

  throw new ApiError(500, "something went wrong");
})


const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  console.log("comment id", commentId);
  // cheking if comment is liked than do unlike else do like and return total like count
  if(!commentId || !commentId.trim()){
    throw new ApiError(400,"comment id is required")
  }
  const checkLike = await Like.find({ comment: commentId, LikedBy: req.user._id });
  console.log(checkLike);
  if (checkLike.length > 0) {
    const unlike = await Like.findOneAndDelete({ comment: commentId, LikedBy: req.user._id });
    const likes = await Like.countDocuments({comment:commentId})
    if (unlike) {
      return res.status(200).json(new ApiResponse(200, {unlike,likes}, "unliked successfully"));
    }
  } else {
    console.log(commentId);
    const like = await Like.create({
      comment: commentId,
      LikedBy: req.user._id,
    });
    console.log(like);
    const likes = await Like.countDocuments({comment:commentId})
    if (like) {
      return res.status(200).json(new ApiResponse(200, {like,likes}, "liked successfully"));
    }
  }
  throw new ApiError(500, "something went wrong");

})

const getAllVideoLikes = asyncHandler(async (req, res) => {
  const { videoId} = req.params;
  if(!videoId || !videoId.trim()){
    throw new ApiError(400,"video id is required")
  }
  // count no of likes
  // const likes = await Like.find({video:videoId})
  // count value
  const videoLikes = await Like.find({ video: videoId });
  const videoLikesCount = videoLikes.length;
  const videoLikedBy = videoLikes.map(like => like.LikedBy);

  // console.log(likes);
  return res.status(200).json(new ApiResponse(200,{videoLikesCount,videoLikedBy},""))
})

const getAllCommentLikes = asyncHandler(async (req, res) => {
  const { commentId} = req.params;
  if(!commentId || !commentId.trim()){
    throw new ApiError(400,"comment id is required")
  }
  const likes = await Like.countDocuments({comment:commentId})
  return res.status(200).json(new ApiResponse(200,likes,""))
})
const userLikeComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if(!commentId || !commentId.trim()){
    throw new ApiError(400,"comment id is required")
  }
  const checkLike = await Like.find({ comment: commentId, LikedBy: req.user._id });
  if (checkLike.length > 0) {
    return res.status(200).json(new ApiResponse(200, true, "liked"));
  } else {
    return res.status(200).json(new ApiResponse(200, false, "not liked"));
  }
})

const userLikeVideo = asyncHandler(async (req, res) => {
  const { videoId} = req.params;
  if(!videoId || !videoId.trim()){
    throw new ApiError(400,"video id is required")
  }
  const checkLike = await Like.find({ video: videoId, LikedBy: req.user._id });
  if (checkLike.length > 0) {
    return res.status(200).json(new ApiResponse(200, true, "liked"));
  } else {
    return res.status(200).json(new ApiResponse(200, false, "not liked"));
  }
})


module.exports={
    toggleVideoLike,
    toggleCommentLike,
    getAllVideoLikes,
    getAllCommentLikes,
    userLikeComment,
    userLikeVideo
}