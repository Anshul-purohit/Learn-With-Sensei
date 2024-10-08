import { useNavigate } from 'react-router-dom';
import image from '../assets/image.png';
import { useShared } from '../SharedContext';
import CategoryCard from './CategoryCard';
import Statistics from './Statistics';

const Body = () => {
    const { isDarkMode } = useShared();
    const navigate = useNavigate()

    const handleExploreMore = () => {
        navigate('/course/allcourses')
    }

    return (
        <>
            <div>
                <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-300 to-emerald-900 ">
                    <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 w-full">
                        <div className="p-8 flex flex-col w-full h-full mx-auto">
                            <div className='w-full m-4 pl-24 pb-20'>
                                <h2 className="text-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800  mb-4">
                                    Build Skills With Online Courses
                                </h2>
                                <p className="text-left text-lg text-gray-600 mb-4">
                                Boost your skills with expertly crafted courses. Start today and stay focused on success! </p>
                                <div className="text-left"> 
                                    <button 
                                        className="font-semibold transition ease-in-out delay-150 bg-teal-700 hover:bg-teal-900 hover:-translate-y-1 duration-300 rounded px-4 py-2 text-white w-52 bg-teal-500 hover:bg-teal-700"
                                        onClick={handleExploreMore}>
                                        Explore More
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 flex w-full h-full pb-20 mx-auto items-start">
                            <img src={image} alt="Logo" className="w-96 h-96 mx-auto mb-4" /> 
                        </div>
                    </div>
                </div>
            </div>

            <CategoryCard />
            <Statistics />
        </>
    );
}

export default Body;
