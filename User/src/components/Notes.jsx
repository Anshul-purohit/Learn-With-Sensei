import { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext'; 
import { useShared } from '../SharedContext';
import axios from 'axios';
import {  toast } from "react-toastify";

const Notes = ({ vidId }) => {
  const { isDarkMode } = useTheme();
  const [note, setNote] = useState('');
  const { userid } = useShared();
  const {apiBaseUrl} = useShared()

  const handleInputChange = (e) => {
    setNote(e.target.value);
  };

  const handleSave = () => {
    axios.post(`${apiBaseUrl}/notes/${vidId}`, {
      description: note
    }, {
      withCredentials: true
    })
    .then(function (response) {
      console.log(response.data);
      toast.success("Notes added!");
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/notes/${vidId}`, { withCredentials: true });
        console.log(response.data);
        setNote(response.data.data.notes); // Set the fetched note to state
      } catch (error) {
        console.error("Error fetching user notes:", error);
      }
    };

    fetchUserNotes();
  }, [vidId]);

  return (
    <div className={`mt-4 p-4 rounded-lg flex-1 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}`}>
      <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>My Notes</h2>
      <div className="mb-4">
        <textarea
          className={`w-full h-96 p-2 border rounded-md mb-2 ${isDarkMode ? 'bg-gray-900 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-800'}`}
          value={note} // Controlled by note state
          onChange={handleInputChange}
          placeholder="Write your note here..."
          rows="4"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded-md transition duration-300 ${isDarkMode ? 'bg-teal-600 hover:bg-teal-500 text-white' : 'bg-teal-600 hover:bg-teal-500 text-white'}`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notes;
