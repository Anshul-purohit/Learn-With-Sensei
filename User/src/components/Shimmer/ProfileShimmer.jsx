import { useShared } from '../../SharedContext';
import './styleShimmer.css';

const ProfileShimmer = () => {
    const { isDarkMode } = useShared();

    const shimmerPlaceholders = Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={`border rounded-lg p-4 shadow-lg flex flex-col justify-between ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className={`w-full h-40 animate-shimmer ${isDarkMode ? 'dark-mode' : 'light-mode'} rounded-t-lg mb-4`} />
          <div className={`h-6 animate-shimmer ${isDarkMode ? 'dark-mode' : 'light-mode'} rounded mb-2`} />
          <div className={`h-4 animate-shimmer ${isDarkMode ? 'dark-mode' : 'light-mode'} rounded mb-2`} />
          <div className={`h-4 animate-shimmer ${isDarkMode ? 'dark-mode' : 'light-mode'} rounded mb-4`} />
          <div className={`h-6 animate-shimmer ${isDarkMode ? 'dark-mode' : 'light-mode'} rounded mt-auto w-40`} />
        </div>
      ));

    return (
        <div className={`w-full h-full min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <div className="flex flex-col min-h-screen w-full max-w-4xl mx-auto px-4 py-8">
                <div className={`relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg overflow-hidden`}>
                    <div className="backdrop-blur-sm p-2">
                        <div className={`px-6 py-4 rounded-lg m-auto w-96 z-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <div className='flex items-center justify-center mb-4'>
                                <div className={`w-40 h-40 overflow-hidden rounded-full border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                    <div className={`animate-shimmer ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} w-full h-full rounded-full`} />
                                </div>
                            </div>
                            <div className='text-center'>
                                <div className={`animate-shimmer ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} w-32 h-6 rounded m-auto mb-2`} />
                                <div className={`animate-shimmer ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} w-48 h-6 rounded m-auto mb-2`} />
                                <div className={`animate-shimmer ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} w-40 h-6 rounded m-auto`} />
                            </div>
                            <div className="flex justify-center pb-4">
                                <div className={`animate-shimmer ${isDarkMode ? 'bg-gray-600' : 'bg-gray-500'} w-24 h-10 rounded m-2`} />
                                <div className={`animate-shimmer ${isDarkMode ? 'bg-gray-600' : 'bg-gray-500'} w-24 h-10 rounded m-2`} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    {shimmerPlaceholders}
                </div>
            </div>
        </div>
    );
}

export default ProfileShimmer;
