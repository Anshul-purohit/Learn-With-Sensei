const asyncHandler = require("../utils/asyncHandler.js");
const {ApiResponse} = require("../utils/ApiResponse.js");
const {Video} = require("../models/video.model.js");
const ApiError = require("../utils/ApiError.js");
const { Courses } = require("../models/courses.model");
const { uploadOnCloudinary, deleteOnCloudinary } = require("../utils/cloudinary");

const getAllVideos = asyncHandler(async (req,res)=>{
    const {  query, sortBy, sortType, userId } = req.query
    // http://localhost:8000/videos?page=1&limit=10&query=searchTerm&sortBy=createdAt&sortType=desc&userId=12345

    //TODO: get all videos based on query, sort, pagination
    const queryObj = {}

    if (query) {
        queryObj.title = { $regex: query, $options: "i" }
    }

    const sortObj = {};

    if(sortBy)
    {
        sortObj[sortBy] = sortType === 'desc' ? -1 : 1;
    }
   
    try { let videos;
        if(userId){
            videos = await Video
            .find({ owner: userId, ...queryObj })  // Include queryObj in the find condition
            .sort(sortObj)
            
        }
        else
        {
            videos = await Video
                .find(queryObj)  // Include queryObj in the find condition
                .sort(sortObj)
               
        }

        return res.status(200).json(new ApiResponse(200, videos, "Videos fetched successfully"))
    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching videos")
    }


})

const publishAVideo = asyncHandler(async (req,res)=>{
    const {title,description} = req.body;
    
   if(!title || !description){
       throw new ApiError(400,"Please provide title and description")
   }
    // checking for video or thumbnail path and return error if found any
    console.log(req.files)
    if(!req.files || !req.files.videoFile || !req.files.videoFile[0]){
        throw new ApiError(400,"Please provide video")
    }


    const videoFileLocalPath = req.files?.videoFile[0]?.path;
    // const thumbnailFileLocalPath = req.files?.thumbnail[0]?.path;
   
    
    if (!videoFileLocalPath) {
        throw new ApiError(400, 'Please provide a video file');
    }

    // if (!thumbnailFileLocalPath) {
    //     throw new ApiError(400, 'Please provide a thumbnail file');
    // }

    // checking file type and return error if found any
    // file type for videos are MP4, WebM, OGV, MXF, MPEG, and WMV

    const videoFileType = videoFileLocalPath.split(".").pop();
    // const thumbnailFileType = thumbnailFileLocalPath.split(".").pop();

    if (videoFileType !== "mp4" && videoFileType !== "webm" && videoFileType !== "ogv" && videoFileType !== "mxf" && videoFileType !== "mpeg" && videoFileType !== "wmv") {
        throw new ApiError(400, 'Please provide a valid video file');
    }
    // if (thumbnailFileType !== "jpg" && thumbnailFileType !== "jpeg" && thumbnailFileType !== "png") {
    //     throw new ApiError(400, 'Please provide a valid thumbnail file');
    // }

    const videoFile = await uploadOnCloudinary(videoFileLocalPath);
    // const thumbnail = await uploadOnCloudinary(thumbnailFileLocalPath);

    if(!videoFile){
        throw new ApiError(400,"Error while uploading video")
    }

    const video = await Video.create({
        videoFile:videoFile.url,
        // thumbnail:thumbnail.url,
        owner:req.user._id, // user id
        title,
        description,
        duration:videoFile.duration,
        views:0,
        isPublished:true
    })

    const createdVideo = await Video.findById(video._id)

    if(!createdVideo)
    {
        // delete video from cloudinary
        await deleteOnCloudinary(videoFile.url);
        // await deleteOnCloudinary(thumbnail.url);
        throw new ApiError(500,"Something went wrong while creating video")
    }

    // return res.status(201).json(new ApiResponse(200,createdVideo,"Video created successfully"))
    let { courseId} = req.params

    if (!courseId || !courseId.trim()) {
        throw new ApiError(400, "course id is required")
    }   

    // if (!videoId || !videoId.trim()) {
    //     throw new ApiError(400, "video id is required")
    // }   
    courseId = courseId.trim();
    // videoId = videoId.trim();
    const course = await Courses.findByIdAndUpdate(
        courseId,
        {
            $push: {
                videos: createdVideo._id
            }
        },
        { new: true }
    );

    if (!course) {
        throw new ApiError(404, "Course not found")
    }
    return res.status(200).json(new ApiResponse(200, course, "Video added to course successfully")) 
})

const getVideoById = asyncHandler(async (req,res)=>{

    const {videoId} = req.params

    if(!videoId || !videoId.trim()){
        throw new ApiError(400,"video id is required")
    }
    const findVideo = await Video.findByIdAndUpdate(
        videoId,
        { $inc : {views : 1}},
        {new :true}
        );

    if(!findVideo){
        throw new ApiError(404,"video Not found");
    }

    return res.status(220).json(new ApiResponse(220,findVideo,""))
})

const updateVideo = asyncHandler(async (req,res)=>{
    const { videoId } = req.params;
const { title, description } = req.body;

if (!videoId || !videoId.trim()) {
    throw new ApiError(400, "Video ID is required");
}

// Fetch the existing video document
const existingVideo = await Video.findById(videoId);

if (!existingVideo) {
    throw new ApiError(404, "Video not found");
}

// Conditional update for title and description
const updatedTitle = title || existingVideo.title;
const updatedDescription = description || existingVideo.description;

// // Handle thumbnail
// let updatedThumbnail = existingVideo.thumbnail;

// const thumbnailLocalPath = req.file?.path;
// if (thumbnailLocalPath) {
//     const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
//     if (!thumbnail.url) {
//         throw new ApiError(400, "Something went wrong while uploading thumbnail");
//     }
//     updatedThumbnail = thumbnail.url;
// }

// Update the video document
const video = await Video.findByIdAndUpdate(
    videoId,
    {
        $set: {
            title: updatedTitle,
            description: updatedDescription,
            // thumbnail: updatedThumbnail
        }
    },
    { new: true }
);

if (!video) {
    throw new ApiError(500, "Failed to update video");
}


return res.status(200).json(new ApiResponse(200, video, "Video updated successfully"));

});

const deleteVideo = asyncHandler(async (req,res)=>{
    const {videoId,courseId} = req.params

    if(!videoId || !videoId.trim()){
        throw new ApiError(400,"video id is required")
    }
    if(!courseId || !courseId.trim()){
        throw new ApiError(400,"Course id is required")
    }
   const checkVideo = await Video.findById(videoId)
   if(!checkVideo){
    throw new ApiError(404,"video not found")
   }

   const vid = await deleteOnCloudinary(checkVideo.videoFile)
    // const thumb = await deleteOnCloudinary(checkVideo.thumbnail)
    const delvid = await Video.findByIdAndDelete(videoId)
    const delfromPlaylist = await Courses.findByIdAndUpdate(
        courseId,
        {
            $pull: {
                videos: videoId
            }
        },
        {new:true}
    )
    
    if(!delvid){
        throw new ApiError(500,"Something went wrong while deleting video")
    }
    if(!delfromPlaylist){
        throw new ApiError(500,"Something went wrong while deleting video from playlist")
    }
    return res.status(200).json(new ApiResponse(200,delvid,"Video deleted successfully"))



})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;


    // Fetch the current video details from the database
    const currentVideo = await Video.findById(videoId);

    if (!currentVideo) {
        throw new ApiError(404, "Video not found");
    }

    // Invert the isPublished field
    const updatedIsPublished = !currentVideo.isPublished;

    // Update the video in the database with the inverted isPublished value
    const video = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                isPublished: updatedIsPublished
            }
        },
        { new: true }
    );

    return res.status(200).json(new ApiResponse(200, video, "Video published status changed"));
});
module.exports={
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
