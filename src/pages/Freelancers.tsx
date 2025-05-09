// import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
// import axios, { AxiosError } from "axios";
// import { Link } from "react-router-dom";
// import { toast, ToastContainer } from 'react-toastify'; // Import POSITION
// import 'react-toastify/dist/ReactToastify.css';



// // --- Types --- (Keep types at the top for clarity)
// // interface User {
// //   id: number;
// //   firstName: string;
// //   lastName: string;
// //   email: string;
// //   userName: string;
// //   role: string;
// //   accountType: string;
// //   isEmailVerified: number;
// //   created_at: string;
// //   updated_at: string;
// //   profilePhoto: string | null;
// //   Region: string | null;
// //   Phone_number: string | null;
// //   Gender: string | null;
// // }

// interface UserData {
//   id: number;
//   userId: number;
//   specialist: string | null;
//   jobTitle: string | null;
//   description: string | null;
//   skillsOfWork: string | null; // API returns stringified JSON array
//   created_at: string;
//   updated_at: string;
// }

// interface Freelancer {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   userName: string;
//   role: string;
//   accountType: string;
//   isEmailVerified: number;
//   created_at: string;
//   updated_at: string;
//   profilePhoto: string | null;
//   Region: string | null;
//   Phone_number: string | null;
//   Gender: string | null;
//   user_data: UserData | null; // User data is now of type UserData or null
//   user_works: any; // Adjust type if user_works has a specific structure
//   specialist?: string; // Optional specialization field - for easier filtering
//   jobTitle?: string; // Optional jobTitle field - for easier filtering
//   skillsOfWork?: string[]; // Optional skills field - for easier filtering (parsed array)
//   country?: string; // Optional country field
//   rate: number | null; // Rate can be null or a number (1 to 5)
// }

// interface FreelancerApiResponse {
//   freelancers: Freelancer[];
// }

// const itemsPerPage = 8; // Number of freelancers per page

// interface FreelancerListProps {
//   // You can add props if needed
// }

// // --- Report Modal Component (Reused from OpenProjects - Ensure it's defined or import it) ---
// const ReportModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
//   isOpen,
//   onClose,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-20">
//       <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-md">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">
//           Report content
//         </h2>
//         <div className="space-y-3">
//           <div>
//             <label className="inline-flex items-center">
//               <input
//                 type="radio"
//                 className="form-radio h-4 w-4 text-orange-500"
//                 name="reportReason"
//                 value="not_like"
//               />
//               <span className="ml-2 text-gray-700 text-sm">
//                 I did not like this content
//               </span>
//             </label>
//           </div>
//           <div>
//             <label className="inline-flex items-center">
//               <input
//                 type="radio"
//                 className="form-radio h-4 w-4 text-orange-500"
//                 name="reportReason"
//                 value="annoying_spam"
//               />
//               <span className="ml-2 text-gray-700 text-sm">
//                 This content is annoying, repetitive or spam
//               </span>
//             </label>
//           </div>
//           <div>
//             <label className="inline-flex items-center">
//               <input
//                 type="radio"
//                 className="form-radio h-4 w-4 text-orange-500"
//                 name="reportReason"
//                 value="terms_violation"
//               />
//               <span className="ml-2 text-gray-700 text-sm">
//                 This content violates independent's terms of use
//               </span>
//             </label>
//           </div>
//         </div>
//         <div className="mt-4">
//           <label
//             htmlFor="moreInfo"
//             className="block text-sm text-gray-700 mb-1"
//           >
//             More Information (Optional)
//           </label>
//           <textarea
//             id="moreInfo"
//             rows={3}
//             className="shadow-sm focus:ring-orange-500 focus:border-orange-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
//           ></textarea>
//         </div>
//         <div className="mt-6 flex justify-end space-x-2">
//           <button
//             onClick={onClose}
//             type="button"
//             className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onClose}
//             type="button"
//             className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- Skeleton Components ---
// const FreelancerCardSkeleton: React.FC = () => (
//   <div className="w-full rounded-xl border border-gray-200 bg-white p-6 mb-4 shadow-sm animate-pulse">
//     <div className="flex items-start space-x-4">
//       <div className="w-12 h-12 rounded-full bg-gray-300"></div>
//       <div className="flex-1">
//         <div className="h-5 bg-gray-300 rounded mb-2 w-56"></div>
//         <div className="h-4 bg-gray-300 rounded mb-2 w-40"></div>
//         <div className="h-3 bg-gray-300 rounded w-full"></div>
//         <div className="h-3 bg-gray-300 rounded w-5/6 mt-1"></div>
//       </div>
//       <div className="w-24">
//         <div className="h-8 bg-gray-300 rounded"></div>
//       </div>
//     </div>
//   </div>
// );

// const FreelancerListSkeleton: React.FC = () => (
//   <div>
//     {Array.from({ length: 3 }).map((_, index) => (
//       <FreelancerCardSkeleton key={index} />
//     ))}
//   </div>
// );


// // --- Freelancer Card Component ---
// const FreelancerCard: React.FC<{ freelancer: Freelancer }> = ({
//   freelancer,
// }) => {
//   const [isContactDropdownOpen, setIsContactDropdownOpen] = useState<boolean>(false);
//   const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
//   const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown

//   const toggleContactDropdown = () => {
//     setIsContactDropdownOpen(!isContactDropdownOpen);
//   };

//   const openReportModal = () => {
//     setIsContactDropdownOpen(false);
//     setIsReportModalOpen(true);
//   };

//   const closeReportModal = () => {
//     setIsReportModalOpen(false);
//   };

//   const addToFavorite = async () => {
//     setIsContactDropdownOpen(false);
//     // const userId = 1; // Replace with actual user ID from your auth context/state
//     const favouriteData = {
//         // user_id: userId,
//         favourite_id: freelancer.id.toString(), // API expects string for favourite_id
//         type: "freelancer"
//     };


//     try {
//         const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/favourites`, favouriteData,{
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure token is correctly retrieved
//             }
//         });

//         console.log(response);

//         if (response.status === 201) {
//           toast.success("Freelancer added to favorites!", {
//             position: "top-right", // ✅ Correct
//           });
//         } else {
//             toast.error("Failed to add to favorites.", {
//               position: "top-right", // ✅ Correct
//             });
//         }
//     } catch (error: any) {
//         let errorMessage = "Failed to add to favorites.";
//         if (axios.isAxiosError(error)) {
//             errorMessage = error.response?.data?.message || errorMessage;
//         }
//         toast.error(errorMessage, {
//           position: "top-right", // ✅ Correct
//         });
//         console.error("Error adding to favorites:", error);
//     }
//   };

//   // Effect to handle clicks outside the dropdown
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (isContactDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsContactDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isContactDropdownOpen, dropdownRef]);


//   // Function to render star ratings dynamically
//   const renderStars = useCallback((rate: number | null) => {
//     const stars = [];
//     const filledStars = rate || 0; // Use 0 if rate is null
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <svg
//           key={i}
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill={i <= filledStars ? "currentColor" : "currentColor"}
//           className={`w-4 h-4 ${
//             i <= filledStars ? "text-yellow-400" : "text-gray-300"
//           }`}
//         >
//           <path
//             fillRule="evenodd"
//             d="M10.868 2.512A1 1 0 009.132 2.512L7.166 6.46l-4.845.702a1 1 0 00-.552 1.667l3.69 3.185-1.278 4.703a1 1 0 001.513 1.057l4.19-2.922 4.19 2.922a1 1 0 001.513-1.057l-1.278-4.703 3.69-3.185a1 1 0 00-.553-1.667l-4.845-.702L10.868 2.512z"
//             clipRule="evenodd"
//           />
//         </svg>
//       );
//     }
//     return stars;
//   }, []); // useCallback for optimization

//   // Calculate percentage rating
//   const percentageRate = freelancer.rate ? (freelancer.rate / 5) * 100 : 0;
//   const displayPercentage = freelancer.rate ? `${percentageRate.toFixed(0)}%` : "No rating";

//   return (
//     <div className="w-full rounded-xl border border-gray-200 bg-white p-6 mb-4 shadow-sm relative">
//       <ToastContainer /> {/* Add ToastContainer here */}
//       <div className="flex items-start space-x-4">
//         <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//           <img
//             src={`https://i.pravatar.cc/150?u=${freelancer.id}`}
//             alt="Freelancer Avatar"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="flex-1">
//           <h3 className="font-semibold text-xl text-gray-900">{`${freelancer.firstName} ${freelancer.lastName}`}</h3>
//           <div className="text-sm text-gray-600 mt-1 flex items-center space-x-3">
//             <div className="flex items-center space-x-1">
//               {renderStars(freelancer.rate)}
//             </div>
//             <div className="flex items-center space-x-1">
//               <span>{displayPercentage}</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="w-4 h-4 text-gray-500"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9h.008v.008H15.75V9zm-5.25-.375a.75.75 0 00-.75.75v4.125a.75.75 0 00.75.75h3a.75.75 0 00.75-.75V9.375a.75.75 0 00-.75-.75h-3zM18 9.75a.75.75 0 01-.75.75h-2.253l-1.023 2.302a11.25 11.25 0 00-2.64 3.918c-.382.542-.58 1.18a.75.75 0 01-.577 1.206.75.75 0 01-1.205-.577 12.75 12.75 0 013.45-5.013l1.023-2.302H17.25a.75.75 0 01.75-.75zM6 9.75a.75.75 0 00.75.75h2.253l1.023 2.302a11.25 11.25 0 012.64 3.918c.382.542-.58 1.18a.75.75 0 00.577 1.206.75.75 0 001.205-.577 12.75 12.75 0 00-3.45-5.013L8.253 10.5H6.75a.75.75 0 00-.75-.75z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span>
//                 {freelancer.user_data?.specialist || "No Specialization"}
//               </span>{" "}
//               {/* Display specialization or default text */}
//             </div>
//           </div>
//           <p className="text-gray-700 mt-3 text-sm">
//             {freelancer.user_data?.description || "No Description"}
//           </p>
//         </div>

//       <div className="flex flex-col items-end justify-between">
//   <div className="relative inline-block text-left">
//     <div>
//       <button
//         className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-5 py-2 bg-orange-600 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center"
//         onClick={toggleContactDropdown}
//         type="button"
//         id="options-menu-button"
//         aria-expanded={isContactDropdownOpen}
//         aria-haspopup="true"
//       >
//         <Link
//           to={`/ContactMePage/${freelancer.id}`}
//           className="inline-flex items-center" // Important: Add items-center to the Link
//         >
//           <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"> {/* Changed ml-2 to mr-2 for spacing to the right of the icon */}
//             <path d="M17.3894 0H2.61094C0.339326 0 -0.844596 2.63548 0.696196 4.26234L3.78568 7.52441C4.23 7.99355 4.47673 8.60858 4.47673 9.24704V15.4553C4.47673 17.8735 7.61615 18.9233 9.13941 17.0145L19.4463 4.09894C20.7775 2.43071 19.5578 0 17.3894 0Z" fill="white"/>
//           </svg>
//           Contact me
//         </Link>
//         <svg
//           className=" -mr-1 ml-2 h-5 w-5 text-white"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//           aria-hidden="true"
//         >
//           <path
//             fillRule="evenodd"
//             d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </button>
//     </div>

//     {isContactDropdownOpen && (
//       <div
//         ref={dropdownRef} // Attach ref to the dropdown div
//         className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
//         role="menu"
//         aria-orientation="vertical"
//         aria-labelledby="options-menu-button"
//         tabIndex={-1}
//       >
//         <div className="py-1" role="none">
//            <button
//               onClick={addToFavorite}
//               className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               role="menuitem"
//               tabIndex={-1}
//             >
//               Add to favorite
//             </button>
//             <button
//               onClick={openReportModal}
//               className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               role="menuitem"
//               tabIndex={-1}
//             >
//               Report content
//             </button>
//         </div>
//       </div>
//     )}
//   </div>
// </div>

//       </div>
//       <ReportModal isOpen={isReportModalOpen} onClose={closeReportModal} />
//     </div>
//   );
// };

// interface FreelancerFilterSidebarProps {
//   onSearchFreelancer: (query: string) => void;
//   onSpecializationChange: (specialization: string) => void;
//   onJobTitleChange: (jobTitle: string) => void;
//   onSkillsChange: (skills: string) => void;
//   onCountryChange: (country: string) => void;
//   onRateChange: (rate: number | null) => void;
//   onClearFilters: () => void;
// }

// const FreelancerFilterSidebar: React.FC<FreelancerFilterSidebarProps> = ({
//   onSearchFreelancer,
//   onSpecializationChange,
//   onJobTitleChange,
//   onSkillsChange,
//   onCountryChange,
//   onRateChange,
//   onClearFilters,
// }) => {
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");
//   const [jobTitleQuery, setJobTitleQuery] = useState<string>("");
//   const [skillsQuery, setSkillsQuery] = useState<string>("");
//   const [countryQuery, setCountryQuery] = useState<string>("");
//   const [selectedRate, setSelectedRate] = useState<number | null>(null);

//   const specializationOptions = [
//     "All",
//     "Web Development",
//     "Graphic Designer",
//     "Marketing Specialist",
//     "Writer",
//   ]; // Example options - Match API data

//   const handleSearchInputChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setSearchQuery(event.target.value);
//     onSearchFreelancer(event.target.value);
//   };

//   const handleSpecializationChangeLocal = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setSelectedSpecialization(event.target.value);
//     onSpecializationChange(event.target.value);
//   };

//   const handleJobTitleInputChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setJobTitleQuery(event.target.value);
//     onJobTitleChange(event.target.value);
//   };

//   const handleSkillsInputChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setSkillsQuery(event.target.value);
//     onSkillsChange(event.target.value);
//   };

//   const handleCountryInputChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setCountryQuery(event.target.value);
//     onCountryChange(event.target.value);
//   };

//   const handleRateStarClick = (rate: number) => {
//     setSelectedRate(rate);
//     onRateChange(rate);
//   };

//   const handleClearAllFilters = () => {
//     setSearchQuery("");
//     setSelectedSpecialization("");
//     setJobTitleQuery("");
//     setSkillsQuery("");
//     setCountryQuery("");
//     setSelectedRate(null);
//     onClearFilters();
//   };

//   return (
//     <aside className="bg-gray-50 p-5 rounded-xl w-full md:w-72 shadow-sm">
//       <div className="flex justify-between items-center mb-5">
//         <h2 className="font-semibold text-lg text-gray-800">
//           Search on freelancers
//         </h2>
//         <button
//           onClick={handleClearAllFilters}
//           className="text-sm text-gray-500 hover:text-gray-700"
//         >
//           Clear all filters
//         </button>
//       </div>

//       <div className="mb-5">
//         <label
//           htmlFor="searchFreelancer"
//           className="block text-sm font-medium text-gray-700 mb-2"
//         >
//           Search on freelancers
//         </label>
//         <input
//           type="text"
//           id="searchFreelancer"
//           className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
//           placeholder="Freelancer name..."
//           value={searchQuery}
//           onChange={handleSearchInputChange}
//         />
//       </div>

//       <div className="mb-5">
//         <label
//           htmlFor="specialization"
//           className="block text-sm font-medium text-gray-700 mb-2"
//         >
//           specialization
//         </label>
//         <select
//           id="specialization"
//           className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
//           value={selectedSpecialization}
//           onChange={handleSpecializationChangeLocal}
//         >
//           <option value="" hidden>
//             All
//           </option>
//           {specializationOptions.map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-5">
//         <label
//           htmlFor="jobTitle"
//           className="block text-sm font-medium text-gray-700 mb-2"
//         >
//           Job title
//         </label>
//         <input
//           type="text"
//           id="jobTitle"
//           className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
//           placeholder="Job title..."
//           value={jobTitleQuery}
//           onChange={handleJobTitleInputChange}
//         />
//       </div>

//       <div className="mb-5">
//         <label
//           htmlFor="skills"
//           className="block text-sm font-medium text-gray-700 mb-2"
//         >
//           Skills
//         </label>
//         <input
//           type="text"
//           id="skills"
//           className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
//           placeholder="Skills..."
//           value={skillsQuery}
//           onChange={handleSkillsInputChange}
//         />
//       </div>

//       <div className="mb-5">
//         <label
//           htmlFor="country"
//           className="block text-sm font-medium text-gray-700 mb-2"
//         >
//           Country
//         </label>
//         <input
//           type="text"
//           id="country"
//           className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
//           placeholder="Country..."
//           value={countryQuery}
//           onChange={handleCountryInputChange}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Rate
//         </label>
//         <div className="flex items-center space-x-2">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <svg
//               key={star}
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//               className={`w-5 h-5 ${
//                 selectedRate !== null && star <= selectedRate
//                   ? "text-yellow-400 hover:text-yellow-500 cursor-pointer"
//                   : "text-gray-300 hover:text-gray-400 cursor-pointer"
//               }`}
//               onClick={() => handleRateStarClick(star)}
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10.868 2.512A1 1 0 009.132 2.512L7.166 6.46l-4.845.702a1 1 0 00-.552 1.667l3.69 3.185-1.278 4.703a1 1 0 001.513 1.057l4.19-2.922 4.19 2.922a1 1 0 001.513-1.057l-1.278-4.703 3.69-3.185a1 1 0 00-.553-1.667l-4.845-.702L10.868 2.512z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           ))}
//         </div>
//       </div>
//     </aside>
//   );
// };

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
// }) => {
//   const pages = Array.from(
//     { length: totalPages <= 17 ? totalPages : 17 },
//     (_, i) => i + 1
//   );

//   return (
//     <div className="flex justify-center mt-8">
//       <nav aria-label="Projects pagination">
//         <ul className="inline-flex space-x-2">
//           <li>
//             <button
//               onClick={() => onPageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="py-2 px-3 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 className="w-4 h-4"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M15.793 7.707a1 1 0 010 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L12 9.586l2.293-2.293a1 1 0 011.414 0z"
//                   clipRule="evenodd"
//                 />
//                 <path
//                   fillRule="evenodd"
//                   d="M7 10a1 1 0 011-1h5a1 1 0 110 2H8a1 1 0 01-1-1z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//           </li>
//           {pages.map((page) => {
//             if (
//               page === 1 ||
//               page === totalPages ||
//               Math.abs(page - currentPage) <= 2
//             ) {
//               return (
//                 <li key={page}>
//                   <button
//                     onClick={() => onPageChange(page)}
//                     className={`py-2 px-3 rounded-lg border border-gray-300 ${
//                       currentPage === page
//                         ? "bg-orange-500 text-white"
//                         : "bg-white hover:bg-gray-100"
//                     }`}
//                     aria-current={currentPage === page ? "page" : undefined}
//                   >
//                     {page}
//                   </button>
//                 </li>
//               );
//             } else if (
//               pages[page - 2] !== page - 1 &&
//               (page === currentPage - 3 || page === currentPage + 3)
//             ) {
//               return (
//                 <li key={`ellipsis-${page}`}>
//                   <span className="py-2 px-3">...</span>
//                 </li>
//               );
//             }
//             return null;
//           })}
//           <li>
//             <button
//               onClick={() => onPageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="py-2 px-3 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 className="w-4 h-4"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10.207 7.293a1 1 0 011.414 0l-3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L12.414 10l-2.293-2.293a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//                 <path
//                   fillRule="evenodd"
//                   d="M13 10a1 1 0 01-1 1H7a1 1 0 110-2h5a1 1 0 011 1z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// const FreelancerList: React.FC<FreelancerListProps> = () => {
//   const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const [loading, setLoading] = useState<boolean>(true); // Start loading as true
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [filteredFreelancers, setFilteredFreelancers] = useState<Freelancer[]>([]); // State for filtered freelancers
//   const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");
//   const [jobTitleQuery, setJobTitleQuery] = useState<string>("");
//   const [skillsQuery, setSkillsQuery] = useState<string>("");
//   const [countryQuery, setCountryQuery] = useState<string>("");
//   const [selectedRate, setSelectedRate] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchFreelancers = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         console.log(`${process.env.REACT_APP_BACK_URL}/GetAllFreelancers?page=${currentPage}`);

//         const response = await axios.get<FreelancerApiResponse>(
//           `${process.env.REACT_APP_BACK_URL}/GetAllFreelancers?page=${currentPage}`
//         );
//         // Process skillsOfWork to be array and flatten user_data for easier access
//         const processedFreelancers = response.data.freelancers.map(
//           (freelancer) => ({
//             ...freelancer,
//             specialist: freelancer.user_data?.specialist || undefined, // Flatten specialist
//             jobTitle: freelancer.user_data?.jobTitle || undefined, // Flatten jobTitle
//             skillsOfWork: freelancer.user_data?.skillsOfWork
//               ? JSON.parse(freelancer.user_data.skillsOfWork)
//               : [], // Parse skills array
//             rate: freelancer.rate !== null ? Number(freelancer.rate) : null, // Ensure rate is number or null
//           })
//         );
//         setFreelancers(processedFreelancers);
//         setFilteredFreelancers(processedFreelancers); // Initialize filtered freelancers with fetched data
//         setTotalPages(
//           Math.ceil(response.data.freelancers.length / itemsPerPage)
//         ); // Adjust totalPages calculation if API provides total count
//       } catch (e) {
//         setError("Failed to load freelancers.");
//         if (axios.isAxiosError(e)) {
//           const axiosError = e as AxiosError;
//           console.error("Axios error:", axiosError.message);
//         } else {
//           console.error("An unexpected error occurred:", e);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFreelancers();
//   }, [currentPage]);

//   useEffect(() => {
//     applyFilters();
//   }, [
//     searchQuery,
//     selectedSpecialization,
//     jobTitleQuery,
//     skillsQuery,
//     countryQuery,
//     selectedRate,
//     freelancers,
//   ]); // Apply filters when any filter criteria or freelancers change

//   useEffect(() => {
//     setTotalPages(Math.ceil(filteredFreelancers.length / itemsPerPage) || 1);
//     setCurrentPage(1); // Reset to first page when filters/search change
//   }, [filteredFreelancers]);

//   const getCurrentPageFreelancers = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return filteredFreelancers.slice(startIndex, endIndex);
//   }, [currentPage, filteredFreelancers]); // Memoize getCurrentPageFreelancers

//   const handlePageChange = (pageNumber: number) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   const handleSearchFreelancer = (query: string) => {
//     setSearchQuery(query);
//   };

//   const handleSpecializationChange = (specialization: string) => {
//     setSelectedSpecialization(specialization);
//   };

//   const handleJobTitleChange = (jobTitle: string) => {
//     setJobTitleQuery(jobTitle);
//   };

//   const handleSkillsChange = (skills: string) => {
//     setSkillsQuery(skills);
//   };

//   const handleCountryChange = (country: string) => {
//     setCountryQuery(country);
//   };

//   const handleRateChange = (rate: number | null) => {
//     setSelectedRate(rate);
//   };

//   const handleClearFilters = () => {
//     setSearchQuery("");
//     setSelectedSpecialization("");
//     setJobTitleQuery("");
//     setSkillsQuery("");
//     setCountryQuery("");
//     setSelectedRate(null);
//     setFilteredFreelancers(freelancers); // Reset filtered freelancers to all freelancers
//   };

//   const applyFilters = useCallback(() => {
//     let tempFreelancers = [...freelancers];

//     // Search Filter (Name or Username)
//     if (searchQuery) {
//       tempFreelancers = tempFreelancers.filter(
//         (freelancer) =>
//           `${freelancer.firstName} ${freelancer.lastName}`
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase()) ||
//           freelancer.userName.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Specialization Filter
//     if (selectedSpecialization && selectedSpecialization !== "All") {
//       tempFreelancers = tempFreelancers.filter(
//         (freelancer) =>
//           freelancer.specialist?.toLowerCase() ===
//           selectedSpecialization.toLowerCase()
//       );
//     }

//     // Job Title Filter
//     if (jobTitleQuery) {
//       tempFreelancers = tempFreelancers.filter((freelancer) =>
//         freelancer.jobTitle?.toLowerCase().includes(jobTitleQuery.toLowerCase())
//       );
//     }

//     // Skills Filter
//     if (skillsQuery) {
//       tempFreelancers = tempFreelancers.filter((freelancer) =>
//         freelancer.skillsOfWork?.some((skill) =>
//           skill.toLowerCase().includes(skillsQuery.toLowerCase())
//         )
//       );
//     }

//     // Country Filter
//     if (countryQuery) {
//       tempFreelancers = tempFreelancers.filter((freelancer) =>
//         freelancer.country?.toLowerCase().includes(countryQuery.toLowerCase())
//       );
//     }

//     // Rate Filter (Star Rating)
//     if (selectedRate !== null) { // Filter only if selectedRate is not null
//       tempFreelancers = tempFreelancers.filter(freelancer => {
//         if (selectedRate === 0) { // If selectedRate is 0, filter for no rating (null rate)
//           return freelancer.rate === null;
//         } else { // Otherwise, filter for rates greater than or equal to selectedRate
//           return freelancer.rate !== null && freelancer.rate >= selectedRate;
//         }
//       });
//     }


//     setFilteredFreelancers(tempFreelancers);
//   }, [freelancers, searchQuery, selectedSpecialization, jobTitleQuery, skillsQuery, countryQuery, selectedRate]); // useCallback for optimization

//   if (loading) {
//     return <FreelancerListSkeleton />;
//   }

//   if (error) {
//     return <div className="text-red-500 text-center">Error: {error}</div>;
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen font-sans">
//       <div className="container mx-auto px-6 py-10">
//         <h1 className="text-2xl font-bold text-gray-900 mb-8">
//           Search on freelancers
//         </h1>

//         <div className="flex flex-col md:flex-row space-x-0 md:space-x-8">
//           <FreelancerFilterSidebar
//             onSearchFreelancer={handleSearchFreelancer}
//             onSpecializationChange={handleSpecializationChange}
//             onJobTitleChange={handleJobTitleChange}
//             onSkillsChange={handleSkillsChange}
//             onCountryChange={handleCountryChange}
//             onRateChange={handleRateChange}
//             onClearFilters={handleClearFilters}
//           />

//           <main className="flex-1">
//             <div>
//               {getCurrentPageFreelancers.map((freelancer) => (
//                 <FreelancerCard key={freelancer.id} freelancer={freelancer} />
//               ))}
//             </div>
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//             />
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FreelancerList;






















import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- Types ---
interface UserData {
    id: number;
    userId: number;
    specialist: string | null;
    jobTitle: string | null;
    description: string | null;
    skillsOfWork: string | null;
    created_at: string;
    updated_at: string;
}

interface Freelancer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    role: string;
    accountType: string;
    isEmailVerified: number;
    created_at: string;
    updated_at: string;
    profilePhoto: string | null;
    Region: string | null;
    Phone_number: string | null;
    Gender: string | null;
    user_data: UserData | null;
    user_works: any;
    specialist?: string;
    jobTitle?: string;
    skillsOfWork?: string[];
    country?: string;
    rate: number | null;
}

interface FreelancerApiResponse {
    freelancers: Freelancer[];
}

const itemsPerPage = 8;

interface FreelancerListProps {}
interface FreelancerCardProps { freelancer: Freelancer, language: 'en' | 'ar', renderStars: (rate: number | null) => JSX.Element[] }
interface FreelancerFilterSidebarProps {
    onSearchFreelancer: (query: string) => void;
    onSpecializationChange: (specialization: string) => void;
    onJobTitleChange: (jobTitle: string) => void;
    onSkillsChange: (skills: string) => void;
    onCountryChange: (country: string) => void;
    onRateChange: (rate: number | null) => void;
    onClearFilters: () => void;
}
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
interface ReportModalProps { isOpen: boolean; onClose: () => void }

// --- Skeleton Components ---
const FreelancerCardSkeleton: React.FC = () => (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-6 mb-4 shadow-sm animate-pulse">
        <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
            <div className="flex-1">
                <div className="h-5 bg-gray-300 rounded mb-2 w-56"></div>
                <div className="h-4 bg-gray-300 rounded mb-2 w-40"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6 mt-1"></div>
            </div>
            <div className="w-24">
                <div className="h-8 bg-gray-300 rounded"></div>
            </div>
        </div>
    </div>
);

const FreelancerListSkeleton: React.FC = () => (
    <div>
        {Array.from({ length: 3 }).map((_, index) => (
            <FreelancerCardSkeleton key={index} />
        ))}
    </div>
);

// --- Report Modal Component ---
const ReportModal: React.FC<ReportModalProps> = ({
    isOpen,
    onClose,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-20">
            <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Report content
                </h2>
                <div className="space-y-3">
                    <div>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio h-4 w-4 text-orange-500"
                                name="reportReason"
                                value="not_like"
                            />
                            <span className="ml-2 text-gray-700 text-sm">
                                I did not like this content
                            </span>
                        </label>
                    </div>
                    <div>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio h-4 w-4 text-orange-500"
                                name="reportReason"
                                value="annoying_spam"
                            />
                            <span className="ml-2 text-gray-700 text-sm">
                                This content is annoying, repetitive or spam
                            </span>
                        </label>
                    </div>
                    <div>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio h-4 w-4 text-orange-500"
                                name="reportReason"
                                value="terms_violation"
                            />
                            <span className="ml-2 text-gray-700 text-sm">
                                This content violates independent's terms of use
                            </span>
                        </label>
                    </div>
                </div>
                <div className="mt-4">
                    <label
                        htmlFor="moreInfo"
                        className="block text-sm text-gray-700 mb-1"
                    >
                        More Information (Optional)
                    </label>
                    <textarea
                        id="moreInfo"
                        rows={3}
                        className="shadow-sm focus:ring-orange-500 focus:border-orange-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onClose}
                        type="button"
                        className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

const translations = {
    en: {
        "Search on freelancers": "Search on freelancers",
        "Clear all filters": "Clear all filters",
        "Freelancer name...": "Freelancer name...",
        "specialization": "specialization",
        "All": "All",
        "Job title": "Job title",
        "Job title...": "Job title...",
        "Skills": "Skills",
        "Skills...": "Skills...",
        "Country": "Country",
        "Country...": "Country...",
        "Rate": "Rate",
        "Contact me": "Contact me",
        "Add to favorite": "Add to favorite",
        "Report content": "Report content",
        "Cancel": "Cancel",
        "Send": "Send",
        "Error:": "Error:",
        "Failed to load freelancers.": "Failed to load freelancers.",
        "Failed to add to favorites.": "Failed to add to favorites.",
        "Freelancer added to favorites!": "Freelancer added to favorites!",
        "Loading freelancers...": "Loading freelancers...",
        "No Specialization": "No Specialization",
        "No Description": "No Description",
        // "Report content": "Report content",
        "I did not like this content": "I did not like this content",
        "This content is annoying, repetitive or spam": "This content is annoying, repetitive or spam",
        "This content violates independent's terms of use": "This content violates independent's terms of use",
        "More Information (Optional)": "More Information (Optional)",
    },
    ar: {
        "Search on freelancers": "البحث عن المستقلين",
        "Clear all filters": "مسح جميع الفلاتر",
        "Freelancer name...": "اسم المستقل...",
        "specialization": "التخصص",
        "All": "الكل",
        "Job title": "المسمى الوظيفي",
        "Job title...": "المسمى الوظيفي...",
        "Skills": "المهارات",
        "Skills...": "المهارات...",
        "Country": "الدولة",
        "Country...": "الدولة...",
        "Rate": "التقييم",
        "Contact me": "تواصل معي",
        "Add to favorite": "أضف إلى المفضلة",
        "Report content": "الإبلاغ عن محتوى",
        "Cancel": "إلغاء",
        "Send": "إرسال",
        "Error:": "خطأ:",
        "Failed to load freelancers.": "فشل تحميل المستقلين.",
        "Failed to add to favorites.": "فشل الإضافة إلى المفضلة.",
        "Freelancer added to favorites!": "تمت إضافة المستقل إلى المفضلة!",
        "Loading freelancers...": "جاري تحميل المستقلين...",
        "No Specialization": "لا يوجد تخصص",
        "No Description": "لا يوجد وصف",
        // "Report content": "الإبلاغ عن محتوى",
        "I did not like this content": "لم يعجبني هذا المحتوى",
        "This content is annoying, repetitive or spam": "هذا المحتوى مزعج أو متكرر أو غير مرغوب فيه",
        "This content violates independent's terms of use": "هذا المحتوى ينتهك شروط استخدام المستقل",
        "More Information (Optional)": "مزيد من المعلومات (اختياري)",
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};


// --- FreelancerList Component ---
const FreelancerList: React.FC<FreelancerListProps> = () => {
    const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredFreelancers, setFilteredFreelancers] = useState<Freelancer[]>([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");
    const [jobTitleQuery, setJobTitleQuery] = useState<string>("");
    const [skillsQuery, setSkillsQuery] = useState<string>("");
    const [countryQuery, setCountryQuery] = useState<string>("");
    const [selectedRate, setSelectedRate] = useState<number | null>(null);
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
        const fetchFreelancers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get<FreelancerApiResponse>(
                    `${process.env.REACT_APP_BACK_URL}/GetAllFreelancers?page=${currentPage}`
                );
                const processedFreelancers = response.data.freelancers.map(
                    (freelancer) => ({
                        ...freelancer,
                        specialist: freelancer.user_data?.specialist || undefined,
                        jobTitle: freelancer.user_data?.jobTitle || undefined,
                        skillsOfWork: freelancer.user_data?.skillsOfWork
                            ? JSON.parse(freelancer.user_data.skillsOfWork)
                            : [],
                        rate: freelancer.rate !== null ? Number(freelancer.rate) : null,
                    })
                );
                setFreelancers(processedFreelancers);
                setFilteredFreelancers(processedFreelancers);
                setTotalPages(
                    Math.ceil(response.data.freelancers.length / itemsPerPage)
                );
            } catch (e) {
                setError(translate("Failed to load freelancers.", language));
                if (axios.isAxiosError(e)) {
                    const axiosError = e as AxiosError;
                    console.error("Axios error:", axiosError.message);
                } else {
                    console.error("An unexpected error occurred:", e);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchFreelancers();
    }, [currentPage, language]);

    useEffect(() => {
        applyFilters();
    }, [
        searchQuery,
        selectedSpecialization,
        jobTitleQuery,
        skillsQuery,
        countryQuery,
        selectedRate,
        freelancers,
    ]);

    useEffect(() => {
        setTotalPages(Math.ceil(filteredFreelancers.length / itemsPerPage) || 1);
        setCurrentPage(1);
    }, [filteredFreelancers]);

    const getCurrentPageFreelancers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredFreelancers.slice(startIndex, endIndex);
    }, [currentPage, filteredFreelancers]);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleSearchFreelancer = (query: string) => {
        setSearchQuery(query);
    };

    const handleSpecializationChange = (specialization: string) => {
        setSelectedSpecialization(specialization);
    };

    const handleJobTitleChange = (jobTitle: string) => {
        setJobTitleQuery(jobTitle);
    };

    const handleSkillsChange = (skills: string) => {
        setSkillsQuery(skills);
    };

    const handleCountryChange = (country: string) => {
        setCountryQuery(country);
    };

    const handleRateChange = (rate: number | null) => {
        setSelectedRate(rate);
    };

    const handleClearFilters = () => {
        setSearchQuery("");
        setSelectedSpecialization("");
        setJobTitleQuery("");
        setSkillsQuery("");
        setCountryQuery("");
        setSelectedRate(null);
        setFilteredFreelancers(freelancers);
    };

    const applyFilters = useCallback(() => {
        let tempFreelancers = [...freelancers];

        if (searchQuery) {
            tempFreelancers = tempFreelancers.filter(
                (freelancer) =>
                    `${freelancer.firstName} ${freelancer.lastName}`
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    freelancer.userName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedSpecialization && selectedSpecialization !== "All") {
            tempFreelancers = tempFreelancers.filter(
                (freelancer) =>
                    freelancer.specialist?.toLowerCase() ===
                    selectedSpecialization.toLowerCase()
            );
        }

        if (jobTitleQuery) {
            tempFreelancers = tempFreelancers.filter((freelancer) =>
                freelancer.jobTitle?.toLowerCase().includes(jobTitleQuery.toLowerCase())
            );
        }

        if (skillsQuery) {
            tempFreelancers = tempFreelancers.filter((freelancer) =>
                freelancer.skillsOfWork?.some((skill) =>
                    skill.toLowerCase().includes(skillsQuery.toLowerCase())
                )
            );
        }

        if (countryQuery) {
            tempFreelancers = tempFreelancers.filter((freelancer) =>
                freelancer.country?.toLowerCase().includes(countryQuery.toLowerCase())
            );
        }

        if (selectedRate !== null) {
            tempFreelancers = tempFreelancers.filter(freelancer => {
                if (selectedRate === 0) {
                    return freelancer.rate === null;
                } else {
                    return freelancer.rate !== null && freelancer.rate >= selectedRate;
                }
            });
        }


        setFilteredFreelancers(tempFreelancers);
    }, [freelancers, searchQuery, selectedSpecialization, jobTitleQuery, skillsQuery, countryQuery, selectedRate]);


      // Function to render star ratings dynamically
    const renderStars = useCallback((rate: number | null) => {
        const stars = [];
        const filledStars = rate || 0; // Use 0 if rate is null
        for (let i = 1; i <= 5; i++) {
        stars.push(
            <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={i <= filledStars ? "currentColor" : "currentColor"}
            className={`w-4 h-4 ${
                i <= filledStars ? "text-yellow-400" : "text-gray-300"
            }`}
            >
            <path
                fillRule="evenodd"
                d="M10.868 2.512A1 1 0 009.132 2.512L7.166 6.46l-4.845.702a1 1 0 00-.552 1.667l3.69 3.185-1.278 4.703a1 1 0 001.513 1.057l4.19-2.922 4.19 2.922a1 1 0 001.513-1.057l-1.278-4.703 3.69-3.185a1 1 0 00-.553-1.667l-4.845-.702L10.868 2.512z"
                clipRule="evenodd"
            />
            </svg>
        );
        }
        return stars;
    }, []); // useCallback for optimization


    if (loading) {
        return <FreelancerListSkeleton />;
    }

    if (error) {
        return <div className="text-red-500 text-center">Error: {translate(error, language)}</div>;
    }

    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="bg-gray-100 mt-20 min-h-screen font-sans">
            <div className="container mx-auto px-4 md:px-6 py-8 md:py-10">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 md:mb-8">
                    {translate("Search on freelancers", language)}
                </h1>

                <div className="flex flex-col md:flex-row space-x-0 gap-10 md:space-x-8">
                    <FreelancerFilterSidebar
                        onSearchFreelancer={handleSearchFreelancer}
                        onSpecializationChange={handleSpecializationChange}
                        onJobTitleChange={handleJobTitleChange}
                        onSkillsChange={handleSkillsChange}
                        onCountryChange={handleCountryChange}
                        onRateChange={handleRateChange}
                        onClearFilters={handleClearFilters}
                    />

                    <main className="flex-1 mt-6 md:mt-0">
                        <div>
                            {getCurrentPageFreelancers.map((freelancer) => (
                                <FreelancerCard key={freelancer.id} freelancer={freelancer} language={language} renderStars={renderStars}/>
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


// --- FreelancerCard Component ---
const FreelancerCard: React.FC<FreelancerCardProps> = ({
    freelancer,
    language,
    renderStars
}) => {
    const [isContactDropdownOpen, setIsContactDropdownOpen] = useState<boolean>(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleContactDropdown = () => {
        setIsContactDropdownOpen(!isContactDropdownOpen);
    };

    const openReportModal = () => {
        setIsContactDropdownOpen(false);
        setIsReportModalOpen(true);
    };

    const closeReportModal = () => {
        setIsReportModalOpen(false);
    };

    const addToFavorite = async () => {
        setIsContactDropdownOpen(false);
        const favouriteData = {
            favourite_id: freelancer.id.toString(),
            type: "freelancer"
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/favourites`, favouriteData,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 201) {
                toast.success(translate("Freelancer added to favorites!", language), {
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
            console.error("Error adding to favorites:", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isContactDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsContactDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isContactDropdownOpen, dropdownRef]);


    const percentageRate = freelancer.rate ? (freelancer.rate / 5) * 100 : 0;
    const displayPercentage = freelancer.rate ? `${percentageRate.toFixed(0)}%` : translate("No Rating", language);

    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white p-6 mb-4 shadow-sm relative">
            <ToastContainer />
            <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                        src={`https://i.pravatar.cc/150?u=${freelancer.id}`}
                        alt="Freelancer Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-xl text-gray-900">{`${freelancer.firstName} ${freelancer.lastName}`}</h3>
                    <div className="text-sm text-gray-600 mt-1 flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                            {renderStars(freelancer.rate)}
                        </div>
                        <div className="flex items-center space-x-1">
                            <span>{displayPercentage}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500">
                                <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9h.008v.008H15.75V9zm-5.25-.375a.75.75 0 00-.75.75v4.125a.75.75 0 00.75.75h3a.75.75 0 00.75-.75V9.375a.75.75 0 00-.75-.75h-3zM18 9.75a.75.75 0 01-.75.75h-2.253l-1.023 2.302a11.25 11.25 0 00-2.64 3.918c-.382.542-.58 1.18a.75.75 0 01-.577 1.206.75.75 0 01-1.205-.577 12.75 12.75 0 013.45-5.013l1.023-2.302H17.25a.75.75 0 01.75-.75zM6 9.75a.75.75 0 00.75.75h2.253l1.023 2.302a11.25 12.75 0 00-3.45-5.013L8.253 10.5H6.75a.75.75 0 00-.75-.75z" clipRule="evenodd" />
                            </svg>
                            <span>
                                {freelancer.user_data?.specialist || translate("No Specialization", language)}
                            </span>
                        </div>
                    </div>
                    <p className="text-gray-700 mt-3 text-sm">
                        {freelancer.user_data?.description || translate("No Description", language)}
                    </p>
                </div>

                <div className="flex flex-col items-end justify-between">
                    <div className="relative inline-block text-left">
                        <div>
                            <button
                                className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-5 py-2 bg-orange-600 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center"
                                onClick={toggleContactDropdown}
                                type="button"
                                id="options-menu-button"
                                aria-expanded={isContactDropdownOpen}
                                aria-haspopup="true"
                            >
                                <Link
                                    to={`/react/ContactMePage/${freelancer.id}`}
                                    className="inline-flex items-center"
                                >
                                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                                        <path d="M17.3894 0H2.61094C0.339326 0 -0.844596 2.63548 0.696196 4.26234L3.78568 7.52441C4.23 7.99355 4.47673 8.60858 4.47673 9.24704V15.4553C4.47673 17.8735 7.61615 18.9233 9.13941 17.0145L19.4463 4.09894C20.7775 2.43071 19.5578 0 17.3894 0Z" fill="white"/>
                                    </svg>
                                    {translate("Contact me", language)}
                                </Link>
                                <svg
                                    className=" -mr-1 ml-2 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>

                        {isContactDropdownOpen && (
                            <div
                                ref={dropdownRef}
                                className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu-button"
                                tabIndex={-1}
                            >
                                <div className="py-1" role="none">
                                    <button
                                        onClick={addToFavorite}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        tabIndex={-1}
                                    >
                                        {translate("Add to favorite", language)}
                                    </button>
                                    <button
                                        onClick={openReportModal}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        tabIndex={-1}
                                    >
                                        {translate("Report content", language)}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ReportModal isOpen={isReportModalOpen} onClose={closeReportModal} />
        </div>
    );
};

// --- FreelancerFilterSidebar Component ---
const FreelancerFilterSidebar: React.FC<FreelancerFilterSidebarProps> = ({
    onSearchFreelancer,
    onSpecializationChange,
    onJobTitleChange,
    onSkillsChange,
    onCountryChange,
    onRateChange,
    onClearFilters,
}) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");
    const [jobTitleQuery, setJobTitleQuery] = useState<string>("");
    const [skillsQuery, setSkillsQuery] = useState<string>("");
    const [countryQuery, setCountryQuery] = useState<string>("");
    const [selectedRate, setSelectedRate] = useState<number | null>(null);
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


    const specializationOptions = [
        "All",
        "Web Development",
        "Graphic Designer",
        "Marketing Specialist",
        "Writer",
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

    const handleSearchInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchQuery(event.target.value);
        onSearchFreelancer(event.target.value);
    };

    const handleSpecializationChangeLocal = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedSpecialization(event.target.value);
        onSpecializationChange(event.target.value);
    };

    const handleJobTitleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setJobTitleQuery(event.target.value);
        onJobTitleChange(event.target.value);
    };

    const handleSkillsInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSkillsQuery(event.target.value);
        onSkillsChange(event.target.value);
    };

    const handleCountryInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCountryQuery(event.target.value);
        onCountryChange(event.target.value);
    };

    const handleRateStarClick = (rate: number) => {
        setSelectedRate(rate);
        onRateChange(rate);
    };

    const handleClearAllFilters = () => {
        setSearchQuery("");
        setSelectedSpecialization("");
        setJobTitleQuery("");
        setSkillsQuery("");
        setCountryQuery("");
        setSelectedRate(null);
        onClearFilters();
    };

    return (
        <aside className="bg-gray-50 p-4 md:p-5 rounded-xl w-full md:w-72 shadow-sm">
            <div className="flex justify-between items-center mb-4 md:mb-5">
                <h2 className="font-semibold text-lg text-gray-800">
                    {translate("Search on freelancers", language)}
                </h2>
                <button
                    onClick={handleClearAllFilters}
                    className="text-sm text-gray-500 hover:text-gray-700"
                >
                    {translate("Clear all filters", language)}
                </button>
            </div>

            <div className="mb-4 md:mb-5">
                <label
                    htmlFor="searchFreelancer"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    {translate("Search on freelancers", language)}
                </label>
                <input
                    type="text"
                    id="searchFreelancer"
                    className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder={translate("Freelancer name...", language)}
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>

            <div className="mb-4 md:mb-5">
                <label
                    htmlFor="specialization"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    {translate("specialization", language)}
                </label>
                <select
                    id="specialization"
                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    value={selectedSpecialization}
                    onChange={handleSpecializationChangeLocal}
                >
                    <option value="" hidden>
                        {translate("All", language)}
                    </option>
                    {specializationOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4 md:mb-5">
                <label
                    htmlFor="jobTitle"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    {translate("Job title", language)}
                </label>
                <input
                    type="text"
                    id="jobTitle"
                    className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder={translate("Job title...", language)}
                    value={jobTitleQuery}
                    onChange={handleJobTitleInputChange}
                />
            </div>

            <div className="mb-4 md:mb-5">
                <label
                    htmlFor="skills"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    {translate("Skills", language)}
                </label>
                <input
                    type="text"
                    id="skills"
                    className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder={translate("Skills...", language)}
                    value={skillsQuery}
                    onChange={handleSkillsInputChange}
                />
            </div>

            <div className="mb-4 md:mb-5">
                <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    {translate("Country", language)}
                </label>
                <input
                    type="text"
                    id="country"
                    className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder={translate("Country...", language)}
                    value={countryQuery}
                    onChange={handleCountryInputChange}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{translate("Rate", language)}</label>
                <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`w-5 h-5 ${selectedRate !== null && star <= selectedRate ? "text-yellow-400 hover:text-yellow-500 cursor-pointer" : "text-gray-300 hover:text-gray-400 cursor-pointer"}`}
                            onClick={() => handleRateStarClick(star)}
                        >
                            <path fillRule="evenodd" d="M10.868 2.512A1 1 0 009.132 2.512L7.166 6.46l-4.845.702a1 1 0 00-.552 1.667l3.69 3.185-1.278 4.703a1 1 0 001.513 1.057l4.19-2.922 4.19 2.922a1 1 0 001.513-1.057l-1.278-4.703 3.69-3.185a1 1 0 00-.553-1.667l-4.845-.702L10.868 2.512z" clipRule="evenodd" />
                        </svg>
                    ))}
                </div>
            </div>
        </aside>
    );
};

// --- Pagination Component ---
const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const pages = Array.from(
        { length: totalPages <= 17 ? totalPages : 17 },
        (_, i) => i + 1
    );

    return (
        <div className="flex justify-center mt-8">
            <nav aria-label="Projects pagination">
                <ul className="inline-flex space-x-2">
                    <li>
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="py-2 px-3 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M15.793 7.707a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        </button>
                    </li>
                    {pages.map((page) => {
                        if (
                            page === 1 ||
                            page === totalPages ||
                            Math.abs(page - currentPage) <= 2
                        ) {
                            return (
                                <li key={page}>
                                    <button
                                        onClick={() => onPageChange(page)}
                                        className={`py-2 px-3 rounded-lg border border-gray-300 ${currentPage === page ? "bg-orange-500 text-white" : "bg-white hover:bg-gray-100"}`}
                                        aria-current={currentPage === page ? "page" : undefined}
                                    >
                                        {page}
                                    </button>
                                </li>
                            );
                        } else if (
                            pages[page - 2] !== page - 1 &&
                            (page === currentPage - 3 || page === currentPage + 3)
                        ) {
                            return (
                                <li key={`ellipsis-${page}`}>
                                    <span className="py-2 px-3">...</span>
                                </li>
                            );
                        }
                        return null;
                    })}
                    <li>
                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="py-2 px-3 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.207 7.293a1 1 0 011.414 0l-3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L12.414 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};


export default FreelancerList;