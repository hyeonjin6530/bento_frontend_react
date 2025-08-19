import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const API_URI = import.meta.env.VITE_PUBLIC_API_URI;

export default function PersonLayout() {
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchInput) {
      setError('Please enter the patient ID');
      return; 
    }
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URI}/api/person/${searchInput}/`); 
      if (!response.ok) {
        setError('Patient ID not found');
        navigate('/person'); 
        return;
      }
      navigate(`/person/${searchInput}`); 
    } catch (err) {
      setError('An error occurred while loading data');
      navigate('/person'); 
    } finally {
      setLoading(false); 
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); 
    }
  };

  return (
    <div>
      <title>Patient CDM - Bento</title>
      <div className="w-full bg-gray-50">
        <div className="bg-white shadow-sm">
          <div className="container mx-auto w-[85%] py-4">
            <div className="flex items-center justify-center gap-4">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter Patient ID"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>} 
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="w-[85%]">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}