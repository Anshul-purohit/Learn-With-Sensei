import './styleShimmer.css';
import { useTheme } from '../../ThemeContext';

const CoursePageShimmer = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`min-h-screen flex flex-col lg:flex-row ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
            <div className={`flex-1 p-4 flex flex-col overflow-y-auto no-scrollbar ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`} style={{ maxHeight: '100vh' }}>
                <div className={`animate-shimmer p-1 mb-1 h-8 bg-gray-300 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
                <div className="relative w-full" style={{ height: "550px" }}>
                    <div className={`animate-shimmer   w-full h-full bg-gray-300 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
                    <div className={`h-12 mt-4 flex flex-row rounded-b ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className={`animate-shimmer  flex-1 h-8 bg-gray-300  rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
                        <div className={` animate-shimmer w-24 h-8 ml-4 bg-gray-300  rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
                    </div>
                </div>
                <div className={`mt-20 rounded p-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex">
                        <div className={` animate-shimmer  h-10 w-20 bg-gray-300  rounded mr-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
                        <div className={` animate-shimmer  h-10 w-20 bg-gray-300  rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
                    </div>
                    <hr className={`my-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`} />
                    <div className={` animate-shimmer  h-24 w-full bg-gray-300  rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
                </div>
            </div>

            <div className={`w-full lg:w-1/4 shadow-lg p-4 h-screen overflow-y-auto no-scrollbar ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className={` animate-shimmer  h-10 space-y-2 mt-2 ml-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <div className={`animate-shimmer w-10 h-10 flex-1 p-1 bg-gray-300  rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
                        </div>
                        <div className={`flex-1 h-8 bg-gray-300 animate-shimmer   rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
                    </div>
                </div>
                <ul className="space-y-2 mt-2 ml-4">
                    {Array(12).fill().map((_, idx) => (
                        <li key={idx} className={`animate-shimmer p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} `}>
                            <div className="flex items-center space-x-4">
                                <div className={`animate-shimmer w-4 h-8 bg-gray-400  rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
                                <div className={`animate-shimmer h-6 flex-1 bg-gray-400  rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CoursePageShimmer;
