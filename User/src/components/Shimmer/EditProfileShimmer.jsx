import './styleShimmer.css';
import { useTheme } from '../ThemeContext';

const EditProfileShimmer = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'} flex items-center justify-center`}>
      <div className={`grid grid-rows-3 gap-10 shadow-xl border rounded-lg mt-10 mb-10 p-6 sm:p-10 ${isDarkMode ? 'bg-gray-800 border-gray-800' : 'bg-white border-gray-300'} w-full max-w-4xl`}>
        
        {/* Change Avatar Section */}
        <div className={`animate-shimmer  p-6 border rounded-lg flex flex-col ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
          <div className={`animate-shimmer h-6 mb-4 w-32 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
          <div className="flex items-center space-x-4 mb-4">
            <div className={`animate-shimmer w-full h-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
          </div>
          <div className="flex justify-end">
            <div className={`animate-shimmer w-32 h-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
          </div>
        </div>

        {/* Edit Personal Details Section */}
        <div className={`animate-shimmer  p-6 border rounded-lg flex flex-col ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
          <div className={`animate-shimmer h-6 mb-4 w-40 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-4">
            <div className={`animate-shimmer w-full h-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
            <div className={`animate-shimmer w-full h-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
            <div className={`animate-shimmer w-full h-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
          </div>
          <div className="flex justify-end">
            <div className={`animate-shimmer w-32 h-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className={`animate-shimmer p-6 border rounded-lg flex flex-col ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
          <div className={`animate-shimmer h-6 mb-4 w-40 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
            <div className={`animate-shimmer w-full h-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
            <div className={`animate-shimmer w-full h-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
          </div>
          <div className="flex justify-end">
            <div className={`animate-shimmer w-32 h-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditProfileShimmer;
