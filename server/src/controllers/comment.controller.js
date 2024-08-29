const mongoose = require("mongoose");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { Comment } = require("../models/comment.model");
const { ApiResponse } = require("../utils/ApiResponse");
const { Like } = require("../models/like.model");

const getVideoComments = asyncHandler(async (req,res)=>{
    // Fetch all comments for the video
    const { videoId } = req.params;
    const comments = await Comment.find({ video: videoId })
      .populate({ path: 'owner', select: 'username avatar' })
      .sort({ createdAt: -1 }); // Sort comments by created time in descending order

    // Create a map to hold comments by their IDs
    const commentMap = {};
    comments.forEach(comment => {
      commentMap[comment._id] = { ...comment._doc, replies: [] };
    });
  
    // console.log(commentMap);
    // Build the nested comment structure
    const rootComments = []; 
    // also return like for each comment fetching from like database

    comments.forEach(comment => {
      if (comment.parent) {
        // If the comment is a reply, add it to the parent's replies array
        if (commentMap[comment.parent]) {
          commentMap[comment.parent].replies.push(commentMap[comment._id]);
        }
      } else {
        // If the comment is a top-level comment, add it to the rootComments array
        rootComments.push(commentMap[comment._id]);
      }
    });
  
    // Sort the replies of each comment in ascending order of creation time
    const sortReplies = (comments) => {
      comments.forEach(comment => {
        comment.replies.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        // Recursively sort replies
        sortReplies(comment.replies);
      });
    };
    
    // sortReplies(rootComments);
    // add comment count
    // in rootComments also show like for each comment fetching from like database
    // traversing through rootComments array and for each comment id find like count
    // add the value of like count  to each comment to rootComments array 

    // const rootCommentsWithLikeCount = rootComments.map(comment => {
    //   console.log(comment);
    // });
    // console.log(rootCommentsWithLikeCount);

    const commentCount = await Comment.countDocuments({ video: videoId });
    // traverse through rootComments array and for each comment id find like count
    async function getCommentWithLikeCount(comment) {
        // Get like count and user list for the current comment
        const likes = await Like.find({ comment: comment._id });
        const likeCount = likes.length;
        // console.log(likes);
        const likedBy = likes.map(like => like.LikedBy); // Assuming `userId` is the field storing the user who liked the comment
        // console.log(likedBy);
        // Traverse through the sub-comments (replies) of the current comment
        const repliesWithLikeCount = await Promise.all(comment.replies.map(async subComment => {
            const subCommentLikes = await Like.find({ comment: subComment._id });
            const subCommentLikeCount = subCommentLikes.length;
            const subCommentLikedBy = subCommentLikes.map(like => like.LikedBy);
    
            // Return subComment with like count and likedBy array
            return { ...subComment, likeCount: subCommentLikeCount, likedBy: subCommentLikedBy };
        }));
    
        // Return the comment with its like count, likedBy array, and updated replies
        return { ...comment, likeCount, likedBy, replies: repliesWithLikeCount };
    }
    
    const rootCommentsWithLikeCount = await Promise.all(
        rootComments.map(async comment => {
            return await getCommentWithLikeCount(comment);
        })
    );
    
    
    
    
    return res.status(200).json(new ApiResponse(200,{commentCount,rootCommentsWithLikeCount},"Comments Fetched Successfully"));
        
})
const addReplyToComment = asyncHandler(async (req,res)=>{
    const {commentId,videoId} = req.params
    const {content} = req.body;
    if(!commentId || !commentId.trim()){
        throw new ApiError(400,"Comment Id is Required")
    }
    if(!videoId || !videoId.trim()){
        throw new ApiError(400,"Video Id is Required")
    }
    if(!content){
        throw new ApiError(400,"Content Field is Empty")
    }
    console.log(commentId);
    const parentComment = await Comment.findById(commentId)

    console.log(parentComment);
    let parentId;
    if(parentComment.parent == null){
        parentId = parentComment._id;
    }
    else{
        parentId = parentComment.parent;
    }
    const reply = await Comment.create({
        comment:content,
        video:videoId,
        owner:req.user._id,
        parent:parentId,
        
    })
    if(!reply){
        throw new ApiError(400,"Something went wrong while creating reply")
    }
    console.log(reply);
    const addReply = await Comment.findByIdAndUpdate(parentId,{
        $push:{
            replies:reply
        }
    })
    // console.log(addReply);
    if(!addReply){
        throw new ApiError(400,"Something went wrong while adding reply")
    }
    return res.status(201).json(new ApiResponse(200,reply,"Reply Added Successfully"))
})
const addComment = asyncHandler(async (req,res)=>{
    const {videoId} = req.params
    const {content} = req.body;
    console.log(content);
    if(!videoId || !videoId.trim()){
        throw new ApiError(400,"Video Id is Required")
    }
    if(!content){
        throw new ApiError(400,"Content Field is Empty")
    }

    const comment = await Comment.create({
        comment:content,
        video:videoId,
        owner:req.user._id,
        parent:null
    })
    if(!comment){
        throw new ApiError(400,"Something went wrong while creating comment")
    }
    return res.status(201).json(new ApiResponse(200,comment,"Comment Added Successfully"))
})
const deleteComment = asyncHandler(async (req,res)=>{
    const {commentId} = req.params;
    if(!commentId || !commentId.trim()){
        throw new ApiError(400,"Comment Id is Required")
    }
    // // if user is not owner of comment then not allowed
    // const comment = await Comment.findById(commentId);
    // if(!comment){
    //     throw new ApiError(400,"Comment not found or error while deleting")
    // }
    // if(comment.owner.toString() !== req.user._id.toString()){
    //     throw new ApiError(400,"You are not allowed to delete this comment")
    // }

    
    // delete comment and all the comments in replies array of that comment
    const comment = await Comment.findByIdAndDelete(commentId);
    if(!comment){
        throw new ApiError(400,"Comment not found or error while deleting")
    }
    await Comment.deleteMany({parent:commentId})

    return res.status(200).json(new ApiResponse(200,comment,"Comment Deleted Successfully"))
})

module.exports = {
    getVideoComments,
    addComment,
    deleteComment,
    addReplyToComment
}