import { useState, useEffect } from 'react';
import { ThumbUpIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import { ThumbUpIcon as ThumbUpSolid } from '@heroicons/react/solid';
import {  toast } from "react-toastify";
import axios from 'axios';
import { useShared } from '../SharedContext';


const CommentsSection = ({ videoId }) => {
    const {isDarkMode , toggleTheme} = useShared();
    const { apiBaseUrl } = useShared()
    const [newReply, setNewReply] = useState({});
    const [replyingTo, setReplyingTo] = useState(null);
    const [showReplies, setShowReplies] = useState({});
    const [newComment, setNewComment] = useState('');
    const { username } = useShared();
    const { userid } = useShared();

    const [likedByUser, setLikedByUser] = useState(false);
    const [comments, setComments] = useState([]);
    const [totalComments,setTotalComments] = useState(0);


    const getComments = async () => {
      if (videoId) {
          try {
              const response = await axios.get(`${apiBaseUrl}/comments/${videoId}`, { withCredentials: true });
              // console.log("xx : ",response.data)
              setTotalComments(response.data.data.commentCount)
              const x = response.data.data.rootCommentsWithLikeCount;
              // console.log("comments : ", x);
              const y = x.map(com => ({
                  comment: com.comment,
                  username: com.owner.username,
                  replies: com.replies,
                  id: com._id,
                  initialLike: com.likeCount,
                  likedBy: com.likedBy
              }));
              setComments(y);
          } catch (error) {
              console.log(error);
          }
      }
    };

    useEffect(() => {
        getComments();
    },[videoId,likedByUser]); 



    // console.log("zzz : ",comments)

    const handleReplyChange = (e, index) => {
        const updatedReplies = { ...newReply, [index]: e.target.value };
        setNewReply(updatedReplies);
    };

    const toggleRepliesVisibility = (index) => {
        setShowReplies(prevState => ({ ...prevState, [index]: !prevState[index] }));
    };


    const handleNewComment = () => {
        if (!newComment) return;
        axios.post(`${apiBaseUrl}/comments/add-comment/${videoId}`, {
            content: newComment
        }, {
            withCredentials: true
        })
        .then(function (response) {
            toast.success("Comment added!");
            console.log("kkkkkk : ",response.data)
            setNewComment('');
            getComments();
        })
        .catch(function (error){
            toast.error(error.response.data.message);
        });
    }

    const handleNewReply = (commentId) => {
        if (!newReply[replyingTo]) return;

        console.log(videoId, commentId, newReply[replyingTo]);
        axios.post(`${apiBaseUrl}/comments/add-reply/${videoId}/${commentId}`, {
            content: newReply[replyingTo]
        }, {
            withCredentials: true
        })
        .then(function (response) {
            toast.success("Reply added!");
            setNewReply(prevState => ({ ...prevState, [replyingTo]: '' })); 
            setReplyingTo(null);
            getComments();
        })
        .catch(function (error) {
            toast.error(error.response.data.message);
        });
    }

    const handleDeleteComment = (id, isReply = false, parentId = null) => {
        axios.delete(`${apiBaseUrl}/comments/${id}`, {
            withCredentials: true
        })
        .then(function (response) {
            toast.success("Comment deleted successfully!");
            getComments();
        })
        .catch(function (error) {
            toast.error(error.response.data.message)
        });
    }

    const handleCommentLike = (id) => {
        if (id) {
            axios.patch(`${apiBaseUrl}/likes/c/${id}`, {
                userId: userid 
            }, {
                withCredentials: true
            })
            .then(function (response) {
                const info = response.data.message;
                // console.log("lll : ",response.data);
                // console.log("fff : ",info);
                if(info === "liked successfully")
                  setLikedByUser(true)
                else
                  setLikedByUser(false)

            })
            .catch(function (error) {
                console.log(error);
            });
        }
    };

    return (
        <div className={`mt-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg flex-1`}>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-4`}>Comments ({totalComments})</h2>
          <div className="mb-4">
            <textarea
              className={`w-full h-10 p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-900 text-gray-200' : 'border-gray-300'} rounded-md mb-2`}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              rows="4"
            ></textarea>
            <button
              className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-600"
              onClick={handleNewComment}
            >
              Comment
            </button>
          </div>
          <div className="space-y-4">
            {comments.map((commentData, index) => (
              <div key={index} className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} p-2 rounded-md`}>
                <div className='flex flex-row'>
                  <p className='flex-1'>
                    <span className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>@{commentData.username}</span>
                    <br />
                    {commentData.comment}
                  </p>
                  {commentData.username === username && ( 
                    <button
                      onClick={() => handleDeleteComment(commentData.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <div className="flex flex-row mt-2">
                  <div className='flex-1 flex flex-row'>
                    <button 
                      onClick={() => handleCommentLike(commentData.id)}
                      className="text-blue-500 p-2 flex flex-row"
                    >
                      {console.log("yyy :",commentData)}
                      {commentData.likedBy.map((user, index) => {
                        console.log("z  : ", user === userid);
                        if (user === userid) {
                          // setLikedByUser(true)
                          return <ThumbUpSolid key={index} className="h-5 w-5" />;
                        }
                      })}

                      {(commentData.likedBy.length==0 || likedByUser===false) && <ThumbUpIcon className="h-5 w-5" />} 
                      
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{commentData.initialLike}</p>
                    </button>
                    <button
                      onClick={() => setReplyingTo(replyingTo === index ? null : index)}
                      className={`p-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    >
                      reply 
                    </button>
                  </div>
                  <button
                    onClick={() => toggleRepliesVisibility(index)}
                    className={`p-2 flex items-center space-x-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                  {showReplies[index] ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                  {commentData.replies.length>0 &&
                    <span style={{color:"blue"}}>Replies ({commentData.replies.length})</span>}
                  </button>
                </div>
                {replyingTo === index && (
                  <div className="mt-2">
                    <textarea
                      className={`w-full h-10 p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-gray-200' : 'border-gray-300'} rounded-md mb-2`}
                      value={newReply[index] || ''}
                      onChange={(e) => handleReplyChange(e, index)}
                      placeholder="Write a reply..."
                      rows="2"
                    ></textarea>
                    <button
                      onClick={() => handleNewReply(commentData.id)}
                      className="bg-teal-700 text-white px-4 py-1 rounded-md hover:bg-teal-600"
                    >
                      Reply
                    </button>
                  </div>
                )}
                {showReplies[index] && commentData.replies.length > 0 && (
                  <div className={`mt-2 space-y-2 pl-4 border-l-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    {commentData.replies.map((reply, replyIndex) => (
                      <div key={replyIndex} className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-2 rounded-md`}>
                        <p>
                          <span className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>@{reply.owner.username}</span>
                          <br />
                          {reply.comment}
                        </p>
                        <div className="flex justify-between mt-2">
                          <div className='flex flex-row'>
                            <button
                              onClick={() => handleCommentLike(reply._id)}
                              className="text-blue-500 flex flex-row p-2"
                            >
                              {console.log("tt : ",reply)}
                              {reply.likedBy.map((user) => {
                                console.log(" z  : ", user === userid);
                                if (user === userid) {
                                  return <ThumbUpSolid key={index} className="h-5 w-5" />;
                                }
                              })}
                              {reply.likedBy.length==0 && <ThumbUpIcon className="h-5 w-5" />}
                              {/* <ThumbUpIcon className="h-5 w-5" /> */}
                              {console.log("r : ",reply)}
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{reply.likeCount}</p>
                            </button>
                            <button
                              onClick={() => setReplyingTo(replyingTo === index ? null : index)}
                              className={`p-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                            >
                              Reply
                            </button>
                          </div>
                          {reply.owner.username === username && ( 
                            <button
                              onClick={() => handleDeleteComment(reply._id, true, commentData.id)}
                              className="text-red-500"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
};

export default CommentsSection;

