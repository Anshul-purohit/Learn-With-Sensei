import { useShared } from '../../SharedContext';
import './styleShimmer.css'; 

const CoursesShimmer = () => {
    const { isDarkMode } = useShared();

  const shimmerPlaceholders = Array.from({ length: 6 }).map((_, index) => (
    <div key={index} className={`border rounded-lg p-4 shadow-lg flex flex-col justify-between ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className={`w-full h-56 animate-shimmer ${isDarkMode ? 'dark-mode' : 'light-mode'} rounded-t-lg mb-4`} />
      <div className={`h-6 animate-shimmer ${isDarkMode ? 'dark-mode' : 'light-mode'} rounded mb-2`} />
      <div className={`h-4 animate-shimmer ${isDarkMode ? 'dark-mode' : 'light-mode'} rounded mb-2`} />
      <div className={`h-4 animate-shimmer ${isDarkMode ? 'dark-mode' : 'light-mode'} rounded mb-4`} />
      <div className={`h-6 animate-shimmer ${isDarkMode ? 'dark-mode' : 'light-mode'} rounded mt-auto w-40`} />
    </div>
  ));

  return (
    <div className={`w-full flex items-center justify-center content-center py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-screen-lg w-full px-4">
        <div className="w-full p-4 mb-8 flex justify-between items-center">
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-zinc-600'}`}></h1>
            <h4 className={`text-gray-400 ${isDarkMode ? 'text-gray-300' : ''}`}></h4>
          </div>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {shimmerPlaceholders}
        </div>
      </div>
    </div>
  );
};

export default CoursesShimmer;



