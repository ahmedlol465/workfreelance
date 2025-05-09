// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import projectImagePlaceholder from '../assets/Rectangle 13.png';
// import userAvatarPlaceholder from '../assets/Rectangle 4.png';

// // --- Types ---
// interface User {
//     id: number;
//     firstName: string;
//     lastName: string;
//     userName: string;
//     profilePhoto: string | null;
// }

// interface Project {
//     id: number;
//     project_name: string;
//     project_description: string;
//     project_image: string | null;
//     required_skills: string;
//     section: string;
//     created_at: string;
//     user: User;
//     duration: string | null; // Duration will be a string from backend
//     budget: string | null;
// }

// interface ApiResponse {
//     message: string;
//     data: {
//         current_page: number;
//         data: Project[];
//         last_page: number;
//     };
// }

// const itemsPerPage = 8;

// // --- Report Modal Component ---
// const ReportModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-20">
//             <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-md">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-4">Report content</h2>
//                 <div className="space-y-3">
//                     <div>
//                         <label className="inline-flex items-center">
//                             <input type="radio" className="form-radio h-4 w-4 text-orange-500" name="reportReason" value="not_like" />
//                             <span className="ml-2 text-gray-700 text-sm">I did not like this content</span>
//                         </label>
//                     </div>
//                     <div>
//                         <label className="inline-flex items-center">
//                             <input type="radio" className="form-radio h-4 w-4 text-orange-500" name="reportReason" value="annoying_spam" />
//                             <span className="ml-2 text-gray-700 text-sm">This content is annoying, repetitive or spam</span>
//                         </label>
//                     </div>
//                     <div>
//                         <label className="inline-flex items-center">
//                             <input type="radio" className="form-radio h-4 w-4 text-orange-500" name="reportReason" value="terms_violation" />
//                             <span className="ml-2 text-gray-700 text-sm">This content violates terms of use</span>
//                         </label>
//                     </div>
//                 </div>
//                 <div className="mt-4">
//                     <label htmlFor="moreInfo" className="block text-sm text-gray-700 mb-1">More Information (Optional)</label>
//                     <textarea id="moreInfo" rows={3} className="shadow-sm focus:ring-orange-500 focus:border-orange-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
//                 </div>
//                 <div className="mt-6 flex justify-end space-x-2">
//                     <button onClick={onClose} type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">Cancel</button>
//                     <button onClick={onClose} type="button" className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">Send</button>
//                 </div>
//             </div>
//         </div>
//     );
// };


// // --- Project Card Component ---
// const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [isReportModalOpen, setIsReportModalOpen] = useState(false);

//     const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
//     const openReportModal = () => { setIsDropdownOpen(false); setIsReportModalOpen(true); };
//     const closeReportModal = () => setIsReportModalOpen(false);

//     const projectImage = project.project_image ? `http://127.0.0.1:8000/storage/${project.project_image}` : projectImagePlaceholder;
//     const authorAvatar = project.user.profilePhoto ? `http://127.0.0.1:8000/storage/${project.user.profilePhoto}` : userAvatarPlaceholder;

//     const addToFavorite = async () => {
//         setIsDropdownOpen(false);
//         const favouriteData = {
//             favourite_id: project.id.toString(),
//             type: "project"
//         };

//         try {
//             const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/favourites`, favouriteData, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });

//             if (response.status === 201) {
//                 toast.success("Project added to favorites!", {
//                     position: "top-right",
//                 });
//             } else {
//                 toast.error("Failed to add to favorites.", {
//                     position: "top-right",
//                 });
//             }
//         } catch (error: any) {
//             let errorMessage = "Failed to add to favorites.";
//             if (axios.isAxiosError(error)) {
//                 errorMessage = error.response?.data?.message || errorMessage;
//             }
//             toast.error(errorMessage, {
//                 position: "top-right",
//             });
//             console.error("Error adding to favorites:", error);
//         }
//     };

//     const getDurationText = (duration: string | null) => {
//         if (!duration) return "";
//         const durationValue = parseInt(duration);
//         if (isNaN(durationValue)) return duration; // Return original string if not a number

//         return `${durationValue} week${durationValue > 1 ? 's' : ''}`; // Basic conversion logic
//     };


//     return (
//         <div className="rounded-md border border-gray-200 bg-white shadow-sm">
//             <ToastContainer />
//             <div className="md:flex">
//                 <div className="md:w-40  overflow-hidden">
//                     <img
//                         src={projectImage}
//                         alt={project.project_name}
//                         className="w-full h-full object-cover"
//                         style={{ height: '120px' }}
//                     />
//                 </div>

//                 <div className="p-4 flex-1">
//                     <div className="flex justify-between items-start">
//                         <div>
//                             <h3 className="font-semibold text-base text-gray-900">{project.project_name}</h3>
//                         </div>
//                         <div className="relative inline-block text-left">
//                             <div>
//                                 <button
//                                     onClick={toggleDropdown}
//                                     type="button"
//                                     className="inline-flex justify-center items-center p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md"
//                                     aria-haspopup="true"
//                                     aria-expanded={isDropdownOpen}
//                                 >
//                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a5.25 5.25 0 1010.5 0 5.25 5.25 0 00-10.5 0zM12.75 10.5h-1.5m3 0h-3m-3 0h-1.5m9 0H21a.75.75 0 00-.75-.75V8.25a.75.75 0 00-.75-.75h-2.25c.03.225.03.45.03.675a3 3 0 01-3 3H9.75a3 3 0 01-3-3c0-.225.0-.45-.03-.675H6a.75.75 0 00-.75.75v2.25a.75.75 0 00.75.75H12.75zM15 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
//                                     </svg>
//                                 </button>
//                             </div>
//                             {isDropdownOpen && (
//                                 <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-xl z-10 border border-gray-200">
//                                     <button onClick={addToFavorite} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md" role="menuitem">
//                                         <div className="flex items-center space-x-2">
//                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-500">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.08 2.833-4.918-.903-8.428-4.918-8.428-4.918v16.266c0 .621.45 1.164 1.072 1.164h10.584c.622 0 1.072-.543 1.072-1.164V8.25zm-18.907 1.95l2.499-1.874m0 0c1.092-.82 2.932.32 2.932 1.958v10.012c0 .557.402 1.048.959 1.048h7.885c.557 0 1.048.49.959-1.048v-10.016l2.499-1.875m-13.504-.22l2.499 1.875m0 0c1.091.82 2.932-.32 2.932-1.958v-10.012c0-.557.402-1.048.959-1.048h7.885c.557 0 1.048.49.959-1.048v10.016l2.499-1.875m-13.504.22v-3.433" />
//                                             </svg>
//                                             <span>Add to favorites</span>
//                                         </div>
//                                     </button>
//                                     <button
//                                         onClick={openReportModal}
//                                         className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-md"
//                                         role="menuitem"
//                                     >
//                                         <div className="flex items-center space-x-2">
//                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-500">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.932 3.374h16.636c1.716 0 2.802-1.874 1.932-3.374l-9.303-16.25C12.529 1.485 11.471 1.485 9.303 3.75l-9.303 16.25zM12 17.25h.008v.008H12v-.008z" />
//                                             </svg>
//                                             <span>Report content</span>
//                                         </div>
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     <div className="text-sm text-gray-500 mt-2 flex items-center space-x-3">
//                         <div className="flex items-center space-x-2">
//                             <img src={authorAvatar} alt="Author Avatar" className="w-5 h-5 rounded-full" />
//                             <span className="text-xs">{project.user.userName}</span>
//                         </div>
//                         <div className="flex items-center space-x-1">
//                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
//                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414 1.414L9.586 10l-1.293 1.293a1 1 0 101.414 1.414L11 11.414l1.293 1.293a1 1 0 001.414-1.414L12.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 9.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293zM10 2a8 8 0 100 16 8 8 0 000-16z" clipRule="evenodd" />
//                             </svg>
//                             <span className="text-xs">{new Date(project.created_at).toLocaleDateString()}</span>
//                         </div>
//                         <div className="flex items-center space-x-1">
//                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
//                                 <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
//                             </svg>
//                             <span className="text-xs">0 Offers</span>
//                         </div>
//                     </div>

//                     <p className="text-gray-700 mt-2 text-sm line-clamp-2">{project.project_description}</p>
//                     <div className="mt-3 flex justify-between items-center">
//                         <div>
//                             <span className="font-semibold text-orange-600 text-lg">{project.budget ? project.budget : "Budget Not Specified"}</span>
//                             <span className="text-gray-500 text-xs"> {project.duration ? `(${getDurationText(project.duration)})` : ""}</span>
//                         </div>
//                         <div>
//                             <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-1.5 px-3 rounded text-xs">
//                                 Add to cart
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <ReportModal isOpen={isReportModalOpen} onClose={closeReportModal} />
//         </div>
//     );
// };


// // --- Project Filter Sidebar Component ---
// const ProjectFilterSidebar: React.FC<{
//     onSearchProject: (query: string) => void;
//     onCategoryChange: (categories: string[]) => void;
//     onDurationChange: (duration: string | null) => void;
//     onBudgetChange: (min: number | null, max: number | null) => void;
//     onClearFilters: () => void;
// }> = ({ onSearchProject, onCategoryChange, onDurationChange, onBudgetChange, onClearFilters }) => {
//     const [searchQuery, setSearchQuery] = useState<string>("");
//     const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//     const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
//     const [minBudget, setMinBudget] = useState<string>("");
//     const [maxBudget, setMaxBudget] = useState<string>("");
//     const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
//     const [isDurationOpen, setIsDurationOpen] = useState(false);
//     const [isBudgetOpen, setIsBudgetOpen] = useState(false);

//     const categoriesList = [
//         "Consulting",
//         "Programming",
//         "Engineering and arch",
//         "Design",
//         "Marketing",
//         "Writing and translation",
//         "DON entry",
//         "Training & Education",
//         "Web development",
//         "Mobile app",
//     ];

//     const durations = [
//         "Less than 1 week",
//         "From 1 to 2 weeks",
//         "From 2 weeks to 1 month",
//         "From 1 month to 3 months",
//         "More than 3 months",
//     ];

//     const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchQuery(event.target.value);
//         onSearchProject(event.target.value);
//     };


//     const handleCategoryCheckbox = (category: string) => {
//         if (selectedCategories.includes(category)) {
//             setSelectedCategories(selectedCategories.filter((c) => c !== category));
//         } else {
//             setSelectedCategories([...selectedCategories, category]);
//         }
//         onCategoryChange([...selectedCategories, category]); // Update parent component immediately
//     };

//     const handleDurationChange = (duration: string) => {
//         setSelectedDuration(duration === selectedDuration ? null : duration);
//         onDurationChange(duration === selectedDuration ? null : duration);
//     };

//     const handleBudgetChangeLocal = (min: number | null, max: number | null) => {
//         setMinBudget(min !== null ? String(min) : "");
//         setMaxBudget(max !== null ? String(max) : "");
//         onBudgetChange(min, max);
//     };


//     const handleClearFiltersLocal = () => {
//         setSearchQuery("");
//         setSelectedCategories([]);
//         setSelectedDuration(null);
//         setMinBudget("");
//         setMaxBudget("");
//         onClearFilters();
//     };


//     return (
//         <aside className="bg-gray-50 p-4 rounded-md w-full md:w-72 shadow-sm border border-gray-200">
//             <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
//                 <h2 className="font-semibold text-lg text-gray-800">Filter projects</h2>
//                 <button onClick={handleClearFiltersLocal} className="text-xs text-gray-500 hover:text-gray-700">Clear filters</button>
//             </div>

//             <div className="mb-3">
//                 <label htmlFor="searchProject" className="block text-sm font-medium text-gray-700 mb-1 text-xs">Search for a project</label>
//                 <input
//                     type="text"
//                     id="searchProject"
//                     className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-xs"
//                     placeholder="Project name"
//                     value={searchQuery}
//                     onChange={handleSearchInputChange}
//                 />
//             </div>

//             <div className="mb-3">
//                 <div className="flex justify-between items-center mb-1 cursor-pointer" onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}>
//                     <h3 className="font-semibold text-gray-700 text-sm">Categories</h3>
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 transition-transform ${isCategoriesOpen ? "rotate-180" : ""}`}>
//                         <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
//                     </svg>
//                 </div>
//                 <div className={`space-y-1 overflow-hidden transition-max-height duration-300 ${isCategoriesOpen ? "max-h-96" : "max-h-0"}`}>
//                     {categoriesList.map((category) => (
//                         <div key={category} className="flex items-center">
//                             <input id={`category-${category}`} type="checkbox" className="form-checkbox h-3 w-3 text-orange-500 rounded border-gray-300 focus:ring-orange-500" checked={selectedCategories.includes(category)} onChange={() => handleCategoryCheckbox(category)} />
//                             <label htmlFor={`category-${category}`} className="ml-2 text-gray-700 text-xs">{category}</label>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="mb-3">
//                 <div className="flex justify-between items-center mb-1 cursor-pointer" onClick={() => setIsDurationOpen(!isDurationOpen)}>
//                     <h3 className="font-semibold text-gray-700 text-sm">Delivery duration</h3>
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 transition-transform ${isDurationOpen ? "rotate-180" : ""}`}>
//                         <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
//                     </svg>
//                 </div>
//                 <div className={`space-y-1 overflow-hidden transition-max-height duration-300 ${isDurationOpen ? "max-h-96" : "max-h-0"}`}>
//                     {durations.map((duration) => (
//                         <div key={duration} className="flex items-center">
//                             <input type="radio" id={`duration-${duration.replace(/\s/g, "")}`} name="deliveryDuration" className="form-radio h-3 w-3 text-orange-500 rounded border-gray-300 focus:ring-orange-500" checked={selectedDuration === duration} onChange={() => handleDurationChange(duration)} />
//                             <label htmlFor={`duration-${duration.replace(/\s/g, "")}`} className="ml-2 text-gray-700 text-xs">{duration}</label>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="mb-3">
//                 <div className="flex justify-between items-center mb-1 cursor-pointer" onClick={() => setIsBudgetOpen(!isBudgetOpen)}>
//                     <h3 className="font-semibold text-gray-700 text-sm">Budget</h3>
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 transition-transform ${isBudgetOpen ? "rotate-180" : ""}`}>
//                         <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
//                     </svg>
//                 </div>
//                 <div className={`flex space-x-2 overflow-hidden transition-max-height duration-300 ${isBudgetOpen ? "max-h-40" : "max-h-0"}`}>
//                     <div className="flex-1">
//                         <label htmlFor="minBudget" className="block text-sm text-gray-700 text-xs">Minimum</label>
//                         <input type="number" id="minBudget" className="mt-1 p-1.5 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-xs" placeholder="Min" value={minBudget} onChange={(e) => handleBudgetChangeLocal(Number(e.target.value) || null, Number(maxBudget) || null)} />
//                     </div>
//                     <div className="flex-1">
//                         <label htmlFor="maxBudget" className="block text-sm text-gray-700 text-xs">Maximum</label>
//                         <input type="number" id="maxBudget" className="mt-1 p-1.5 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-xs" placeholder="Max" value={maxBudget} onChange={(e) => handleBudgetChangeLocal(Number(minBudget) || null, Number(e.target.value) || null)} />
//                     </div>
//                 </div>
//             </div>
//         </aside>
//     );
// };


// // --- Sorting Dropdown Component --- (Reused)
// const SortingDropdown: React.FC<{ onSort: (option: string) => void }> = ({ onSort }) => {
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const sortingOptions = ["Newest", "Oldest"];

//     const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
//     const handleSortOption = (option: string) => { onSort(option); setIsDropdownOpen(false); };

//     return (
//         <div className="relative inline-block text-left">
//             <div>
//                 <button
//                     onClick={toggleDropdown}
//                     type="button"
//                     className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-xs"
//                     id="sort-menu-button"
//                     aria-expanded={isDropdownOpen}
//                     aria-haspopup="true"
//                 >
//                     Hour on filters
//                     <svg className="-mr-1 ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                         <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                 </button>
//             </div>

//             {isDropdownOpen && (
//                 <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10" role="menu" aria-orientation="vertical" aria-labelledby="sort-menu-button" tabIndex={-1}>
//                     <div className="py-1" role="none">
//                         {sortingOptions.map((option) => (
//                             <button key={option} onClick={() => handleSortOption(option)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-xs" role="menuitem" tabIndex={-1}>
//                                 {option}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// // --- Pagination Component --- (Reused)
// const Pagination: React.FC<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void }> = ({ currentPage, totalPages, onPageChange }) => {
//     const pages = Array.from({ length: totalPages <= 17 ? totalPages : 17 }, (_, i) => i + 1);

//     return (
//         <div className="flex justify-center mt-6">
//             <nav aria-label="Projects pagination">
//                 <ul className="inline-flex space-x-1">
//                     <li>
//                         <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="py-1.5 px-2 rounded-md bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-xs">
//                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
//                                 <path fillRule="evenodd" d="M15.793 7.707a1 1 0 010 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L12 9.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                                 <path fillRule="evenodd" d="M7 10a1 1 0 011-1h5a1 1 0 010 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
//                             </svg>
//                         </button>
//                     </li>
//                     {pages.map((page) => {
//                         if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2) {
//                             return (
//                                 <li key={page}>
//                                     <button onClick={() => onPageChange(page)} className={`py-1.5 px-2 rounded-md border border-gray-300 text-xs ${currentPage === page ? "bg-orange-500 text-white" : "bg-white hover:bg-gray-100"}`} aria-current={currentPage === page ? "page" : undefined}>
//                                         {page}
//                                     </button>
//                                 </li>
//                             );
//                         } else if (pages[page - 2] !== page - 1 && (page === currentPage - 3 || page === currentPage + 3)) {
//                             return (
//                                 <li key={`ellipsis-${page}`}>
//                                     <span className="py-1.5 px-2 text-xs">...</span>
//                                 </li>
//                             );
//                         }
//                         return null;
//                     })}
//                     <li>
//                         <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="py-1.5 px-2 rounded-md bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-xs">
//                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
//                                 <path fillRule="evenodd" d="M10.207 7.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L12.414 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                                 <path fillRule="evenodd" d="M13 10a1 1 0 01-1 1H7a1 1 0 010-2h5a1 1 0 011 1z" clipRule="evenodd" />
//                             </svg>
//                         </button>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     );
// };


// // --- Main OpenProjects Component ---
// const OpenProjects: React.FC = () => {
//     const [projects, setProjects] = useState<Project[]>([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//     const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
//     const [budgetRange, setBudgetRange] = useState<{ min: number | null; max: number | null }>({ min: null, max: null });
//     const [selectedSortOption, setSelectedSortOption] = useState<string>("Newest");

//     useEffect(() => {
//         const fetchProjects = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await axios.get<ApiResponse>(`${process.env.REACT_APP_BACK_URL}/projects?page=${currentPage}`);
//                 setProjects(response.data.data.data);
//                 setTotalPages(response.data.data.last_page);
//                 applyFiltersAndSearch(response.data.data.data);
//             } catch (e) {
//                 setError("Failed to load projects.");
//                 if (axios.isAxiosError(e)) {
//                     console.error("Axios error:", e.message);
//                 } else {
//                     console.error("An unexpected error occurred:", e);
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProjects();
//     }, [currentPage]);

//     useEffect(() => {
//         applyFiltersAndSearch(projects);
//     }, [searchQuery, selectedCategories, selectedDuration, budgetRange, projects, selectedSortOption]);

//     useEffect(() => {
//         setTotalPages(Math.ceil(filteredProjects.length / itemsPerPage) || 1);
//         setCurrentPage(1);
//     }, [filteredProjects]);

//     const getCurrentPageProjects = () => {
//         const startIndex = (currentPage - 1) * itemsPerPage;
//         const endIndex = startIndex + itemsPerPage;
//         return filteredProjects.slice(startIndex, endIndex);
//     };

//     const handlePageChange = (pageNumber: number) => {
//         if (pageNumber >= 1 && pageNumber <= totalPages) {
//             setCurrentPage(pageNumber);
//         }
//     };

//     const handleSearchProject = (query: string) => {
//         setSearchQuery(query);
//     };

//     const handleCategoryChange = (categories: string[]) => setSelectedCategories(categories);
//     const handleDurationChange = (duration: string | null) => setSelectedDuration(duration);
//     const handleBudgetChange = (min: number | null, max: number | null) => setBudgetRange({ min, max });
//     const handleClearFilters = () => {
//         setSearchQuery("");
//         setSelectedCategories([]);
//         setSelectedDuration(null);
//         setBudgetRange({ min: null, max: null });
//         applyFiltersAndSearch(projects);
//     };
//     const handleSortChange = (option: string) => {
//         setSelectedSortOption(option);
//     };

//     const applyFiltersAndSearch = useCallback((currentProjects: Project[]) => {
//         let tempProjects = [...currentProjects];

//         if (searchQuery) {
//             tempProjects = tempProjects.filter(project => project.project_name.toLowerCase().includes(searchQuery.toLowerCase()) || project.project_description.toLowerCase().includes(searchQuery.toLowerCase()));
//         }
//         if (selectedCategories.length > 0) {
//             tempProjects = tempProjects.filter(project => selectedCategories.includes(project.section));
//         }
//         if (selectedDuration) {
//             tempProjects = tempProjects.filter(project => project.duration === selectedDuration);
//         }
//         if (budgetRange.min !== null) {
//             // tempProjects = tempProjects.filter(project => project.budget && parseFloat(project.budget.replace(/[^0-9.]/g, '')) >= budgetRange.min);
//             tempProjects = tempProjects.filter(project => 
//                 project.budget && parseFloat(project.budget.replace(/[^0-9.]/g, '')) >= (budgetRange.min ?? -Infinity)
//               );
//         }
//         if (budgetRange.max !== null) {
//             // tempProjects = tempProjects.filter(project => project.budget && parseFloat(project.budget.replace(/[^0-9.]/g, '')) <= budgetRange.max);
//             tempProjects = tempProjects.filter(project => 
//                 project.budget && parseFloat(project.budget.replace(/[^0-9.]/g, '')) >= (budgetRange.max ?? -Infinity)
//               );
//         }


//         if (selectedSortOption === "Oldest") {
//             tempProjects.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
//         } else if (selectedSortOption === "Newest") {
//             tempProjects.sort((b, a) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
//         }

//         setFilteredProjects(tempProjects);
//     }, [searchQuery, selectedCategories, selectedDuration, budgetRange, selectedSortOption]);


//     if (loading) {
//         return <div className="text-center">Loading projects...</div>;
//     }
//     if (error) {
//         return <div className="text-red-500 text-center">Error: {error}</div>;
//     }

//     return (
//         <div className="pt-20 bg-gray-100 min-h-screen font-sans">
//             <div className="container mx-auto px-6 py-10">
//                 <div className="flex justify-between items-center mb-4">
//                     <h1 className="text-2xl font-bold text-gray-900">Open projects</h1>
//                     <SortingDropdown onSort={handleSortChange} />
//                 </div>

//                 <div className="flex flex-col md:flex-row space-x-0 md:space-x-6">
//                     <ProjectFilterSidebar
//                         onSearchProject={handleSearchProject}
//                         onCategoryChange={handleCategoryChange}
//                         onDurationChange={handleDurationChange}
//                         onBudgetChange={handleBudgetChange}
//                         onClearFilters={handleClearFilters}
//                     />

//                     <main className="flex-1 mt-4 md:mt-0">
//                         <ToastContainer />
//                         <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
//                             {getCurrentPageProjects().map((project) => (
//                                 <ProjectCard key={project.id} project={project} />
//                             ))}
//                         </div>
//                         <Pagination
//                             currentPage={currentPage}
//                             totalPages={totalPages}
//                             onPageChange={handlePageChange}
//                         />
//                     </main>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default OpenProjects;



import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import projectImagePlaceholder from '../assets/Rectangle 13.png';
import { Link } from "react-router-dom";
// import userAvatarPlaceholder from '../assets/Rectangle 4.png';


interface User {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    profilePhoto: string | null;
}

interface Project {
    id: number;
    project_name: string;
    project_description: string;
    project_image: string | null;
    required_skills: string;
    section: string;
    created_at: string;
    user: User;
    duration: string | null;
    budget: string | null;
    budgetTo: string | null | number
}

interface ApiResponse {
    message: string;
    data: {
        current_page: number;
        data: Project[];
        last_page: number;
    };
}

const itemsPerPage = 8;


const translations = {
    en: {
        "Report content": "Report content",
        "I did not like this content": "I did not like this content",
        "This content is annoying, repetitive or spam": "This content is annoying, repetitive or spam",
        "This content violates terms of use": "This content violates terms of use",
        "More Information (Optional)": "More Information (Optional)",
        "Cancel": "Cancel",
        "Send": "Send",
        "Project added to favorites!": "Project added to favorites!",
        "Failed to add to favorites.": "Failed to add to favorites.",
        "Error adding to favorites:": "Error adding to favorites:",
        "Add to favorites": "Add to favorites",
        // "Report content": "Report content",
        "0 Offers": "0 Offers",
        "Add to cart": "Add to cart",
        "Filter projects": "Filter projects",
        "Clear filters": "Clear filters",
        "Search for a project": "Search for a project",
        "Project name": "Project name",
        "Categories": "Categories",
        "Delivery duration": "Delivery duration",
        "Budget": "Budget",
        "Minimum": "Minimum",
        "Maximum": "Maximum",
        "Hour on filters": "Sort by",
        "Newest": "Newest",
        "Oldest": "Oldest",
        "Loading projects...": "Loading projects...",
        "Failed to load projects.": "Failed to load projects.",
        "Error: ": "Error: ",
        "Open projects": "Open projects",
        "week": "week",
        "weeks": "weeks",
        "Budget Not Specified": "Budget Not Specified",
    },
    ar: {
        "Report content": "الإبلاغ عن المحتوى",
        "I did not like this content": "لم يعجبني هذا المحتوى",
        "This content is annoying, repetitive or spam": "هذا المحتوى مزعج أو متكرر أو غير مرغوب فيه",
        "This content violates terms of use": "هذا المحتوى ينتهك شروط الاستخدام",
        "More Information (Optional)": "مزيد من المعلومات (اختياري)",
        "Cancel": "إلغاء",
        "Send": "إرسال",
        "Project added to favorites!": "تمت إضافة المشروع إلى المفضلة!",
        "Failed to add to favorites.": "فشل الإضافة إلى المفضلة.",
        "Error adding to favorites:": "خطأ في الإضافة إلى المفضلة:",
        "Add to favorites": "أضف إلى المفضلة",
        // "Report content": "الإبلاغ عن المحتوى",
        "0 Offers": "0 عروض",
        "Add to cart": "أضف إلى السلة",
        "Filter projects": "فلترة المشاريع",
        "Clear filters": "مسح الفلاتر",
        "Search for a project": "البحث عن مشروع",
        "Project name": "اسم المشروع",
        "Categories": "الأقسام",
        "Delivery duration": "مدة التسليم",
        "Budget": "الميزانية",
        "Minimum": "الحد الأدنى",
        "Maximum": "الحد الأقصى",
        "Hour on filters": "ترتيب حسب",
        "Newest": "الأحدث",
        "Oldest": "الأقدم",
        "Loading projects...": "جاري تحميل المشاريع...",
        "Failed to load projects.": "فشل تحميل المشاريع.",
        "Error: ": "خطأ: ",
        "Open projects": "المشاريع المفتوحة",
        "week": "أسبوع",
        "weeks": "أسابيع",
        "Budget Not Specified": "الميزانية غير محددة",
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};


const ReportModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-20">
            <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">{translate("Report content", 'en')}</h2>
                <div className="space-y-3">
                    <div>
                        <label className="inline-flex items-center">
                            <input type="radio" className="form-radio h-4 w-4 text-orange-500" name="reportReason" value="not_like" />
                            <span className="ml-2 text-gray-700 text-sm">{translate("I did not like this content", 'en')}</span>
                        </label>
                    </div>
                    <div>
                        <label className="inline-flex items-center">
                            <input type="radio" className="form-radio h-4 w-4 text-orange-500" name="reportReason" value="annoying_spam" />
                            <span className="ml-2 text-gray-700 text-sm">{translate("This content is annoying, repetitive or spam", 'en')}</span>
                        </label>
                    </div>
                    <div>
                        <label className="inline-flex items-center">
                            <input type="radio" className="form-radio h-4 w-4 text-orange-500" name="reportReason" value="terms_violation" />
                            <span className="ml-2 text-gray-700 text-sm">{translate("This content violates terms of use", 'en')}</span>
                        </label>
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="moreInfo" className="block text-sm text-gray-700 mb-1">{translate("More Information (Optional)", 'en')}</label>
                    <textarea id="moreInfo" rows={3} className="shadow-sm focus:ring-orange-500 focus:border-orange-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                    <button onClick={onClose} type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">{translate("Cancel", 'en')}</button>
                    <button onClick={onClose} type="button" className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">{translate("Send", 'en')}</button>
                </div>
            </div>
        </div>
    );
};


const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [language, setLanguage] = useState<'en' | 'ar'>(
        localStorage.getItem('language') === 'ar' ? 'ar' : 'en'
    );

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage === 'ar' || storedLanguage === 'en') {
            setLanguage(storedLanguage);
        } else {
            setLanguage('en');
        }
    }, []);


    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const openReportModal = () => { setIsDropdownOpen(false); setIsReportModalOpen(true); };
    const closeReportModal = () => setIsReportModalOpen(false);

    const projectImage = project.project_image ? `http://127.0.0.1:8000/storage/${project.project_image}` : projectImagePlaceholder;
    // const authorAvatar = project.user.profilePhoto ? `http://127.0.0.1:8000/storage/${project.user.profilePhoto}` : userAvatarPlaceholder;

    const addToFavorite = async () => {
        setIsDropdownOpen(false);
        const favouriteData = {
            favourite_id: project.id.toString(),
            type: "project",
            favouritable_id: project.id,
            favouritable_type: "project"
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/favourites`, favouriteData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 201) {
                toast.success(translate("Project added to favorites!", language), {
                    position: "top-right",
                });
            } else {
                toast.error(translate("Failed to add to favorites.", language), {
                    position: "top-right",
                });
            }
        } catch (error: any) {
            let errorMessage = translate("Failed to add to favorites.", language);
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            }
            toast.error(errorMessage, {
                position: "top-right",
            });
            console.error(translate("Error adding to favorites:", language), error);
        }
    };

    // const getDurationText = (duration: string | null) => {
    //     if (!duration) return "";
    //     const durationValue = parseInt(duration);
    //     if (isNaN(durationValue)) return duration;

    //     return `${durationValue} ${translate(durationValue > 1 ? 'weeks' : 'week', language)}`;
    // };


    return (
      

        <div className="rounded-md border border-gray-200 bg-white shadow-sm">
            {/* <ToastContainer /> */} {/* Removed ToastContainer */}
            <div className="md:flex">
                

                <div className="p-4 flex-1">
                    <div className="flex justify-between items-start">
                        <div className="flex gap-5">

                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                        src={projectImage}
                        alt="Freelancer Avatar"
                        className="w-full h-full object-cover"
                        />
                </div>
                        <div>
                            <h3 className="font-semibold text-base text-gray-900">{project.project_name}</h3>
                            <div className="text-sm text-gray-500 mt-2 flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.589-7.499-1.632z" />
                                    </svg>

                                    <span className="text-xs">{project.user.userName}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                    {/* <span className="text-xs">From {new Date(project.created_at).toLocaleDateString()} hours</span> */}
                                </div>
                                <span className="text-xs">
  {`From ${Math.floor(
    (Date.now() - new Date(project.created_at).getTime()) / (1000 * 60 * 60)
  )} hours ago`}
</span>

                                <div className="flex items-center space-x-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 009 2.25h-1.5a3.375 3.375 0 00-3.375 3.375v1.5a1.125 1.125 0 01-1.125 1.125h-1.5A3.375 3.375 0 003 8.25v2.625a3.375 3.375 0 003.375 3.375h1.5a1.125 1.125 0 011.125 1.125v1.5a3.375 3.375 0 003.375 3.375h1.5a3.375 3.375 0 003.375-3.375v-1.5a1.125 1.125 0 011.125-1.125h1.5a3.375 3.375 0 003.375-3.375z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75v-1.5m0 0c-1.037 0-1.875-.838-1.875-1.875S10.963 9 12 9s1.875.838 1.875 1.875S13.037 12.75 12 12.75z" />
                                    </svg>
                                    <span className="text-xs">5 Offers</span>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="relative inline-block text-left">
                            <div className="flex items-center">
                                <span className="font-semibold text-orange-600 text-lg">{project.budget && project.budgetTo ? `${project.budget}$ - ${project.budgetTo}$` : translate("Budget Not Specified", language)}</span>

                                <button
                                    onClick={toggleDropdown}
                                    type="button"
                                    className="inline-flex justify-center items-center ml-2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-1 rounded-md"
                                    aria-haspopup="true"
                                    aria-expanded={isDropdownOpen}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.5-4.75a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            {/* Removed Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-xl z-10 border border-gray-200">
                                    <button onClick={addToFavorite} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md" role="menuitem">
                                        <div className="flex items-center space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.08 2.833-4.918-.903-8.428-4.918-8.428-4.918v16.266c0 .621.45 1.164 1.072 1.164h10.584c.622 0 1.072-.543 1.072-1.164V8.25zm-18.907 1.95l2.499-1.874m0 0c1.092-.82 2.932.32 2.932 1.958v10.012c0 .557.402 1.048.959 1.048h7.885c.557 0 1.048.49.959-1.048v-10.016l2.499-1.875m-13.504-.22l2.499 1.875m0 0c1.091.82 2.932-.32 2.932-1.958v-10.012c0-.557.402-1.048.959-1.048h7.885c.557 0 1.048.49.959-1.048v10.016l2.499-1.875m-13.504.22v-3.433" />
                                            </svg>
                                            <span>{translate("Add to favorites", language)}</span>
                                        </div>
                                    </button>
                                    <button
                                        onClick={openReportModal}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-md"
                                        role="menuitem"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.932 3.374h16.636c1.716 0 2.802-1.874 1.932-3.374l-9.303-16.25C12.529 1.485 11.471 1.485 9.303 3.75l-9.303 16.25zM12 17.25h.008v.008H12v-.008z" />
                                            </svg>
                                            <span>{translate("Report content", language)}</span>
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>


                    <p className="text-gray-700 mt-2 text-sm line-clamp-2">{project.project_description}</p>
                    
                </div>
            </div>
            <ReportModal isOpen={isReportModalOpen} onClose={closeReportModal} />
        </div>

    );
    
};


const ProjectFilterSidebar: React.FC<{
    onSearchProject: (query: string) => void;
    onCategoryChange: (categories: string[]) => void;
    onDurationChange: (duration: string | null) => void;
    onBudgetChange: (min: number | null, max: number | null) => void;
    onClearFilters: () => void;
}> = ({ onSearchProject, onCategoryChange, onDurationChange, onBudgetChange, onClearFilters }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
    const [minBudget, setMinBudget] = useState<string>("");
    const [maxBudget, setMaxBudget] = useState<string>("");
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
    const [isDurationOpen, setIsDurationOpen] = useState(false);
    const [isBudgetOpen, setIsBudgetOpen] = useState(false);
    const [language, setLanguage] = useState<'en' | 'ar'>(
        localStorage.getItem('language') === 'ar' ? 'ar' : 'en'
    );

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage === 'ar' || storedLanguage === 'en') {
            setLanguage(storedLanguage);
        } else {
            setLanguage('en');
        }
    }, []);


    const categoriesList = [
        translate("Consulting", language),
        translate("Programming", language),
        translate("Engineering and arch", language),
        translate("Design", language),
        translate("Marketing", language),
        translate("Writing and translation", language),
        translate("DON entry", language),
        translate("Training & Education", language),
        translate("Web development", language),
        translate("Mobile app", language),
    ];

    const durations = [
        translate("Less than 1 week", language),
        translate("From 1 to 2 weeks", language),
        translate("From 2 weeks to 1 month", language),
        translate("From 1 month to 3 months", language),
        translate("More than 3 months", language),
    ];

        useEffect(() => {
            if(localStorage.getItem('searchQuery')){
                setSearchQuery(localStorage.getItem('searchQuery') as string);
            }
        }, [])
        
        useEffect(() => {
                // localStorage.removeItem("query")
                setTimeout(() => {
                    localStorage.removeItem("searchQuery");
                }, 600); // 60000ms = 1 minute
            })

    useEffect(() => {
        const query = localStorage.getItem("query")
        const searchQuery = localStorage.getItem("searchQuery") as string
        
        if(query){ 
            setSearchQuery(query);
            onSearchProject(query);
            setSearchQuery(searchQuery);
            onSearchProject(searchQuery);
        }
    })

    useEffect(() => {
        // localStorage.removeItem("query")
        setTimeout(() => {
            localStorage.removeItem("query");
        }, 600); // 60000ms = 1 minute
    })
    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setSearchQuery(event.target.value);
        onSearchProject(event.target.value);
    };


    const handleCategoryCheckbox = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
        onCategoryChange([...selectedCategories, category]);
    };

    const handleDurationChange = (duration: string) => {
        setSelectedDuration(duration === selectedDuration ? null : duration);
        onDurationChange(duration === selectedDuration ? null : duration);
    };

    const handleBudgetChangeLocal = (min: number | null, max: number | null) => {
        setMinBudget(min !== null ? String(min) : "");
        setMaxBudget(max !== null ? String(max) : "");
        onBudgetChange(min, max);
    };


    const handleClearFiltersLocal = () => {
        setSearchQuery("");
        setSelectedCategories([]);
        setSelectedDuration(null);
        setMinBudget("");
        setMaxBudget("");
        onClearFilters();
    };


    return (
        <aside dir={language === 'ar' ? 'rtl' : 'ltr'} className="bg-gray-50 p-4 rounded-md w-full md:w-72 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
                <h2 className="font-semibold text-lg text-gray-800">{translate("Filter projects", language)}</h2>
                <button onClick={handleClearFiltersLocal} className="text-xs text-gray-500 hover:text-gray-700">{translate("Clear filters", language)}</button>
            </div>

            <div className="mb-3">
                <label htmlFor="searchProject" className="block text-sm font-medium text-gray-700 mb-1 text-xs">{translate("Search for a project", language)}</label>
                <input
                    type="text"
                    id="searchProject"
                    className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-xs"
                    placeholder={translate("Project name", language)}
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>

            <div className="mb-3">
                <div className="flex justify-between items-center mb-1 cursor-pointer" onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}>
                    <h3 className="font-semibold text-gray-700 text-sm">{translate("Categories", language)}</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 transition-transform ${isCategoriesOpen ? "rotate-180" : ""}`}>
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className={`space-y-1 overflow-hidden transition-max-height duration-300 ${isCategoriesOpen ? "max-h-96" : "max-h-0"}`}>
                    {categoriesList.map((category) => (
                        <div key={category} className="flex items-center">
                            <input id={`category-${category}`} type="checkbox" className="form-checkbox h-3 w-3 text-orange-500 rounded border-gray-300 focus:ring-orange-500" checked={selectedCategories.includes(category)} onChange={() => handleCategoryCheckbox(category)} />
                            <label htmlFor={`category-${category}`} className="ml-2 text-gray-700 text-xs">{category}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-3">
                <div className="flex justify-between items-center mb-1 cursor-pointer" onClick={() => setIsDurationOpen(!isDurationOpen)}>
                    <h3 className="font-semibold text-gray-700 text-sm">{translate("Delivery duration", language)}</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 transition-transform ${isDurationOpen ? "rotate-180" : ""}`}>
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className={`space-y-1 overflow-hidden transition-max-height duration-300 ${isDurationOpen ? "max-h-96" : "max-h-0"}`}>
                    {durations.map((duration) => (
                        <div key={duration} className="flex items-center">
                            <input type="radio" id={`duration-${duration.replace(/\s/g, "")}`} name="deliveryDuration" className="form-radio h-3 w-3 text-orange-500 rounded border-gray-300 focus:ring-orange-500" checked={selectedDuration === duration} onChange={() => handleDurationChange(duration)} />
                            <label htmlFor={`duration-${duration.replace(/\s/g, "")}`} className="ml-2 text-gray-700 text-xs">{duration}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-3">
                <div className="flex justify-between items-center mb-1 cursor-pointer" onClick={() => setIsBudgetOpen(!isBudgetOpen)}>
                    <h3 className="font-semibold text-gray-700 text-sm">{translate("Budget", language)}</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 transition-transform ${isBudgetOpen ? "rotate-180" : ""}`}>
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className={`flex space-x-2 overflow-hidden transition-max-height duration-300 ${isBudgetOpen ? "max-h-40" : "max-h-0"}`}>
                    <div className="flex-1">
                        <label htmlFor="minBudget" className="block text-sm text-gray-700 text-xs">{translate("Minimum", language)}</label>
                        <input type="number" id="minBudget" className="mt-1 p-1.5 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-xs" placeholder={translate("Minimum", language)} value={minBudget} onChange={(e) => handleBudgetChangeLocal(Number(e.target.value) || null, Number(maxBudget) || null)} />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="maxBudget" className="block text-sm text-gray-700 text-xs">{translate("Maximum", language)}</label>
                        <input type="number" id="maxBudget" className="mt-1 p-1.5 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-xs" placeholder={translate("Maximum", language)} value={maxBudget} onChange={(e) => handleBudgetChangeLocal(Number(minBudget) || null, Number(e.target.value) || null)} />
                    </div>
                </div>
            </div>
        </aside>
    );
};


const SortingDropdown: React.FC<{ onSort: (option: string) => void }> = ({ onSort }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const sortingOptions = [translate("Newest", 'en'), translate("Oldest", 'en')];
    const [language, setLanguage] = useState<'en' | 'ar'>(
        localStorage.getItem('language') === 'ar' ? 'ar' : 'en'
    );

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage === 'ar' || storedLanguage === 'en') {
            setLanguage(storedLanguage);
        } else {
            setLanguage('en');
        }
    }, []);


    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const handleSortOption = (option: string) => { onSort(option); setIsDropdownOpen(false); };

    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="relative inline-block text-left">
            <div>
                <button
                    onClick={toggleDropdown}
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-xs"
                    id="sort-menu-button"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                >
                    {translate("Hour on filters", language)}
                    <svg className="-mr-1 ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10" role="menu" aria-orientation="vertical" aria-labelledby="sort-menu-button" tabIndex={-1}>
                    <div className="py-1" role="none">
                        {sortingOptions.map((option) => (
                            <button key={option} onClick={() => handleSortOption(option)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-xs" role="menuitem" tabIndex={-1}>
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


const Pagination: React.FC<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void }> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages <= 17 ? totalPages : 17 }, (_, i) => i + 1);

    return (
        <div className="flex justify-center mt-6">
            <nav aria-label="Projects pagination">
                <ul className="inline-flex space-x-1">
                    <li>
                        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="py-1.5 px-2 rounded-md bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                <path fillRule="evenodd" d="M15.793 7.707a1 1 0 010 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L12 9.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M7 10a1 1 0 011-1h5a1 1 0 010 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </li>
                    {pages.map((page) => {
                        if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2) {
                            return (
                                <li key={page}>
                                    <button onClick={() => onPageChange(page)} className={`py-1.5 px-2 rounded-md border border-gray-300 text-xs ${currentPage === page ? "bg-orange-500 text-white" : "bg-white hover:bg-gray-100"}`} aria-current={currentPage === page ? "page" : undefined}>
                                        {page}
                                    </button>
                                </li>
                            );
                        } else if (pages[page - 2] !== page - 1 && (page === currentPage - 3 || page === currentPage + 3)) {
                            return (
                                <li key={`ellipsis-${page}`}>
                                    <span className="py-1.5 px-2 text-xs">...</span>
                                </li>
                            );
                        }
                        return null;
                    })}
                    <li>
                        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="py-1.5 px-2 rounded-md bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                <path fillRule="evenodd" d="M10.207 7.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L12.414 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M13 10a1 1 0 01-1 1H7a1 1 0 010-2h5a1 1 0 011 1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};


const OpenProjects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
    const [budgetRange, setBudgetRange] = useState<{ min: number | null; max: number | null }>({ min: null, max: null });
    const [selectedSortOption, setSelectedSortOption] = useState<string>("Newest");
    const [language, setLanguage] = useState<'en' | 'ar'>(
        localStorage.getItem('language') === 'ar' ? 'ar' : 'en'
    );

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage === 'ar' || storedLanguage === 'en') {
            setLanguage(storedLanguage);
        } else {
            setLanguage('en');
        }
    }, []);


    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get<ApiResponse>(`${process.env.REACT_APP_BACK_URL}/projects?page=${currentPage}`);
                setProjects(response.data.data.data);
                setTotalPages(response.data.data.last_page);
                applyFiltersAndSearch(response.data.data.data);
            } catch (e:any) {
                setError(translate("Failed to load projects.", language));
                if (axios.isAxiosError(e)) {
                    console.error("Axios error:", e.message);
                } else {
                    console.error("An unexpected error occurred:", e);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [currentPage, language]);

    useEffect(() => {
        applyFiltersAndSearch(projects);
    }, [searchQuery, selectedCategories, selectedDuration, budgetRange, projects, selectedSortOption, language]);

    useEffect(() => {
        setTotalPages(Math.ceil(filteredProjects.length / itemsPerPage) || 1);
        setCurrentPage(1);
    }, [filteredProjects]);

    const getCurrentPageProjects = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredProjects.slice(startIndex, endIndex);
    };

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleSearchProject = (query: string) => {
        setSearchQuery(query);
        
    };

    const handleCategoryChange = (categories: string[]) => setSelectedCategories(categories);
    const handleDurationChange = (duration: string | null) => setSelectedDuration(duration);
    const handleBudgetChange = (min: number | null, max: number | null) => setBudgetRange({ min, max });
    const handleClearFilters = () => {
        setSearchQuery("");
        setSelectedCategories([]);
        setSelectedDuration(null);
        setBudgetRange({ min: null, max: null });
        applyFiltersAndSearch(projects);
    };
    const handleSortChange = (option: string) => {
        setSelectedSortOption(option);
    };

    const applyFiltersAndSearch = useCallback((currentProjects: Project[]) => {
        let tempProjects = [...currentProjects];

        if (searchQuery) {
            tempProjects = tempProjects.filter(project => project.project_name.toLowerCase().includes(searchQuery.toLowerCase()) || project.project_description.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (selectedCategories.length > 0) {
            tempProjects = tempProjects.filter(project => selectedCategories.includes(project.section));
        }
        if (selectedDuration) {
            tempProjects = tempProjects.filter(project => project.duration === selectedDuration);
        }
        if (budgetRange.min !== null) {
            tempProjects = tempProjects.filter(project =>
                project.budget && parseFloat(project.budget.replace(/[^0-9.]/g, '')) >= (budgetRange.min ?? -Infinity)
            );
        }
        if (budgetRange.max !== null) {
            tempProjects = tempProjects.filter(project =>
                project.budget && parseFloat(project.budget.replace(/[^0-9.]/g, '')) <= (budgetRange.max ?? -Infinity)
            );
        }


        if (selectedSortOption === translate("Oldest", language)) {
            tempProjects.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        } else if (selectedSortOption === translate("Newest", language)) {
            tempProjects.sort((b, a) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        }

        setFilteredProjects(tempProjects);
    }, [searchQuery, selectedCategories, selectedDuration, budgetRange, selectedSortOption, language, translate]);


    if (loading) {
        return <div className="text-center">{translate("Loading projects...", language)}</div>;
    }
    if (error) {
        return <div className="text-red-500 text-center">{translate("Error: ", language)} {error}</div>;
    }

    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="pt-20 bg-gray-100 min-h-screen font-sans">
            <div className="container mx-auto px-6 py-10">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">{translate("Open projects", language)}</h1>
                    <SortingDropdown onSort={handleSortChange} />
                </div>

                <div className="flex flex-col md:flex-row space-x-0 md:space-x-6">
                    <ProjectFilterSidebar
                        onSearchProject={handleSearchProject}
                        onCategoryChange={handleCategoryChange}
                        onDurationChange={handleDurationChange}
                        onBudgetChange={handleBudgetChange}
                        onClearFilters={handleClearFilters}
                    />

                    <main className="flex-1 mt-4 md:mt-0">
                        <ToastContainer />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                            {getCurrentPageProjects().map((project) => (
                                <Link to={`/react/project/${project.id}`} key={project.id}>
                                <ProjectCard key={project.id} project={project} />
                                </Link>
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default OpenProjects;