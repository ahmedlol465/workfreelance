import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  // Get search term from local storage on component mount
  useEffect(() => {
    const storedSearch = localStorage.getItem('searchTerm');
    if (storedSearch) {
      setSearchTerm(storedSearch);
    }
  }, []);

  // Search result categories with their icons and navigation paths
  const categories = [
    {
      id: 'projects',
      name: 'projects',
      path: '/react/OpenProjects',
      icon: (
        <div className="w-12 h-12 mx-auto mb-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="#FF5722" className="w-full h-full">
            <rect x="4" y="4" width="16" height="16" rx="1" strokeWidth="1.5" />
            <line x1="8" y1="9" x2="16" y2="9" strokeWidth="1.5" />
            <line x1="8" y1="12" x2="16" y2="12" strokeWidth="1.5" />
            <line x1="8" y1="15" x2="16" y2="15" strokeWidth="1.5" />
          </svg>
        </div>
      )
    },
    {
      id: 'freelancers',
      name: 'Freelancers',
      path: '/react/FreelancerList',
      icon: (
        <div className="w-12 h-12 mx-auto mb-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="#FF5722" className="w-full h-full">
            <circle cx="12" cy="8" r="4" strokeWidth="1.5" />
            <path d="M4 18C4 14.6863 7.58172 12 12 12C16.4183 12 20 14.6863 20 18" strokeWidth="1.5" />
          </svg>
        </div>
      )
    },
    {
      id: 'business-gallery',
      name: 'Buisness gallery',
      path: '/react/ServicesPage/another services',
      icon: (
        <div className="w-12 h-12 mx-auto mb-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="#FF5722" className="w-full h-full">
            <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="1.5" />
            <circle cx="16" cy="8" r="1.5" strokeWidth="1.5" />
            <path d="M4 15L8 12L12 15L20 8" strokeWidth="1.5" />
          </svg>
        </div>
      )
    },
    {
      id: 'companies',
      name: 'Companies',
      // path: '/companies',
      icon: (
        <div className="w-12 h-12 mx-auto mb-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="#6B7280" className="w-full h-full">
            <rect x="4" y="8" width="16" height="12" rx="1" strokeWidth="1.5" />
            <path d="M9 8V5C9 4.44772 9.44772 4 10 4H14C14.5523 4 15 4.44772 15 5V8" strokeWidth="1.5" />
            <line x1="8" y1="12" x2="10" y2="12" strokeWidth="1.5" />
            <line x1="14" y1="12" x2="16" y2="12" strokeWidth="1.5" />
            <line x1="8" y1="16" x2="10" y2="16" strokeWidth="1.5" />
            <line x1="14" y1="16" x2="16" y2="16" strokeWidth="1.5" />
          </svg>
        </div>
      )
    }
  ];

  // Handle navigation to the specific category page
  const handleNavigate = (path: any) => {
    navigate(path, { state: { searchTerm } });
  };

  return (
    <div className="bg-gray-200 min-h-screen p-6 mt-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-medium mb-4">Search results on : {searchTerm || '.......'}</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="bg-white p-6 rounded shadow flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleNavigate(category.path)}
            >
              {category.icon}
              <span className={`${category.id === 'projects' || category.id === 'business-gallery' ? 'text-orange-500' : 'text-gray-600'}`}>
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;