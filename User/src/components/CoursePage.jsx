import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { ToastContainer } from "react-toastify";
import Notes from './Notes';
import CommentsSection from './CommentsSection';
import { ThumbUpIcon } from '@heroicons/react/outline';
import { ThumbUpIcon as ThumbUpSolid } from '@heroicons/react/solid';
import { useShared } from '../SharedContext';
import ConfettiExplosion from 'react-confetti-explosion';
import Modal from 'react-modal';
import CoursePageShimmer from './Shimmer/CoursePageShimmer';

const CoursePage = () => {
    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [cmtAndNote, setcmtAndNote] = useState('comment');
    const [checkedState, setCheckedState] = useState([]);
    const [curLike, setCurLike] = useState(0);
    const [likedByUser, setLikedByUser] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actualCheckedVideos, setActualCheckedVideos] = useState([]);

    const { isDarkMode, apiBaseUrl, userid } = useShared();
    const { coursebyId } = useParams();
    const navigate = useNavigate();
    const playerRef = useRef(null);

    const totalLectures = course?.videos.length || 0;
    const completedLectures = checkedState.filter(Boolean).length;
    const percentage = totalLectures ? (completedLectures / totalLectures) * 100 : 0;

    useEffect(() => {
        const fetchCurrentCheckVideos = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/checkBox/check/${coursebyId}`, { withCredentials: true });
                const checkedVideos = response.data.data.check.map((item) => item.video);
                setActualCheckedVideos(checkedVideos);
            } catch (error) {
                console.log(error);
                navigate('/Login');
            }
        };

        fetchCurrentCheckVideos();
    }, [apiBaseUrl, navigate, coursebyId]);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/courses/${coursebyId}`, { withCredentials: true });
                const courseData = response.data.data.course[0];
                setCourse(courseData);
                if (courseData.videos.length > 0) {
                    const initialVideo = courseData.videos[0];
                    setSelectedVideo(initialVideo);
                    setCurrentVideo(initialVideo.videoFile);
                    setCheckedState(
                        courseData.videos.map((video) => actualCheckedVideos.includes(video._id))
                    );
                }
            } catch (error) {
                console.log(error);
                navigate('/Login');
            }
        };

        fetchCourse();
    }, [coursebyId, navigate, apiBaseUrl, actualCheckedVideos]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (percentage === 100) {
            setIsModalOpen(true);
        }
    }, [percentage]);

    useEffect(() => {
        if (selectedVideo?._id) {
            const getCurrentLikes = async () => {
                try {
                    const response = await axios.get(`${apiBaseUrl}/likes/${selectedVideo._id}`, { withCredentials: true });
                    setCurLike(response.data.data.videoLikesCount);
                    setLikedByUser(response.data.data.videoLikedBy.includes(userid));
                } catch (error) {
                    console.log(error);
                }
            };
            getCurrentLikes();
        }
    }, [selectedVideo, userid, apiBaseUrl]);

    const handleVideoLike = () => {
        if (selectedVideo) {
            axios.patch(`${apiBaseUrl}/likes/${selectedVideo._id}`, { userId: userid }, { withCredentials: true })
                .then(response => {
                    setLikedByUser(response.data.message === "liked successfully");
                    setCurLike(response.data.data.likes);
                })
                .catch(error => console.log(error));
        }
    };

    const handleCurrentVideo = (video) => {
        setSelectedVideo(video);
        setCurrentVideo(video.videoFile);
    };

    const handleCheckboxChange = async (videoId, index) => {
        try {
            await axios.patch(
                `${apiBaseUrl}/checkBox/${coursebyId}/${videoId}`,
                {}, 
                { withCredentials: true }
            );
            setCheckedState((prevState) => {
                const updatedState = [...prevState];
                updatedState[index] = !updatedState[index];
                return updatedState;
            });
        } catch (error) {
            console.log(error);
        }
    };

    if (loading || !course) {
        return <CoursePageShimmer />;
    }

    return (
        <div className={`min-h-screen flex flex-col lg:flex-row ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
            <div className={`flex-1 p-4 flex flex-col overflow-y-auto ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`} style={{ maxHeight: '100vh' }}>
                <div className='p-1 mb-1 text-2xl font-bold'>{course.name}</div>
                
                {course.videos.length > 0 ? (
                    <>
                        <div className="relative w-full" style={{ height: "550px" }}>
                            <ReactPlayer
                                ref={playerRef}
                                url={currentVideo}
                                config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                                onContextMenu={(e) => e.preventDefault()}
                                controls
                                width="100%"
                                height="100%"
                                className="react-player"
                            />
                            <div className={`h-12 flex flex-row rounded-b ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                                <p className='flex-1 font-bold text-xl p-2'>{selectedVideo?.title}</p>
                                <button onClick={handleVideoLike} className='flex items-center p-2'>
                                    {likedByUser ? <ThumbUpSolid className="h-5 w-5" /> : <ThumbUpIcon className="h-5 w-5" />}
                                    <span className='ml-1'>{curLike}</span>
                                </button>
                            </div>
                        </div>
                        <div className={`mt-20 rounded p-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <button className='p-2 text-lg font-semibold' onClick={() => setcmtAndNote('comment')}>Comment</button>
                            <button className='p-2 text-lg font-semibold' onClick={() => setcmtAndNote('Note')}>Note</button>
                            <hr />
                            {cmtAndNote === 'comment' ? (
                                <CommentsSection videoId={selectedVideo?._id} />
                            ) : (
                                <Notes vidId={selectedVideo?._id}/>
                            )}
                        </div>
                    </>
                ) : (
                    <div className={`mt-20 text-center p-4 rounded ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}>
                        <p className="text-2xl font-semibold">Stay tuned, the instructor will update the videos soon!</p>
                    </div>
                )}
            </div>

            {course.videos.length > 0 && (
                <div className={`w-full lg:w-1/4 shadow-lg p-4 h-screen overflow-y-auto ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                    <div className={`h-10 space-y-2 mt-2 ml-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                {totalLectures === 0 ? (
                                    <div className="text-2xl pl-2">📈</div>
                                ) : (
                                    <div className="relative w-10 h-10 p-1">
                                       {percentage===100 ?(
                                        <div className="text-2xl animate-pulse pl-2">✅</div>
                                       ):(
                                        <CircularProgressbar
                                        value={percentage}
                                        styles={buildStyles({
                                            pathColor: percentage === 0 ? "#d1d5db" : percentage < 50 ? "#ef4444" : "#10b981",
                                            textColor: percentage === 0 ? "#d1d5db" : percentage < 50 ? "#ef4444" : "#10b981",
                                            trailColor: "#e5e7eb",
                                            pathTransitionDuration: 0.5,
                                        })}
                                    />)}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold">
                                    Completed {completedLectures} of {totalLectures} lectures
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4 mt-2">
                        {course.videos.map((video, index) => (
                            <div
                                key={video._id}
                                className={`p-2 rounded-lg cursor-pointer ${selectedVideo === video ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-300') : (isDarkMode ? 'bg-gray-800 text-gray-100 hover:bg-gray-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200')}`}
                                onClick={() => handleCurrentVideo(video)}
                            >
                                <h3 className="text-lg font-bold mb-2">{video.title}</h3>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={checkedState[index]}
                                        onChange={() => handleCheckboxChange(video._id, index)}
                                    />
                                    <label className="text-sm line-clamp-1">{video.description}</label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <ToastContainer />

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="fixed inset-0 flex items-center justify-center"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className={`p-8 rounded-lg shadow-lg text-center ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-black'}`}>
                    <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
                    <p className="mb-4">You have completed all the lectures.</p>
                    <button
                        className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <ConfettiExplosion />
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default CoursePage;

