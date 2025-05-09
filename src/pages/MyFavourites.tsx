// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import authorAvatarPlaceholder from "../assets/basic.png";

// // Interfaces for API response and data
// interface User {
//     id: number;
//     firstName: string;
//     lastName: string;
//     email: string;
//     userName: string;
//     role: string;
//     accountType: string;
//     isEmailVerified: number;
//     created_at: string;
//     updated_at: string;
//     profilePhoto: string | null;
//     Region: string | null;
//     Phone_number: string | null;
//     Gender: string | null;
//     type: null;
//     rate: number | null;
// }

// interface Project {
//     id: number;
//     user_id: number;
//     project_name: string;
//     project_description: string;
//     project_image: string | null;
//     required_skills: string;
//     section: string;
//     sub_section: string;
//     project_link: string | null;
//     project_question: string | null;
//     status: string;
//     created_at: string;
//     updated_at: string;
//     duration: string | null;
//     budget: string | null;
//     user?: User; // User can be potentially undefined
// }

// interface Service {
//     id: number;
//     user_id: number;
//     title: string;
//     section: string;
//     subsection: string | null;
//     description: string;
//     thumbnail_photo: string | null;
//     main_photo: string | null;
//     required_skills: string | null;
//     price: string;
//     delivery_duration: string;
//     from_date: string | null;
//     to_date: string | null;
//     link: string | null;
//     status: string;
//     created_at: string;
//     updated_at: string;
//     user: User;
// }

// interface BusinessGalleryItem {
//     id: number;
//     userId: number;
//     workTitle: string;
//     workDescription: string;
//     thumbnail: string;
//     workPhoto: string;
//     completeDate: string;
//     workLink: string;
//     skillsOfWork: string;
//     created_at: string;
//     updated_at: string;
//     user: User;
// }

// interface Freelancer {
//     id: number;
//     firstName: string;
//     lastName: string;
//     email: string;
//     userName: string;
//     role: string;
//     accountType: string;
//     isEmailVerified: number;
//     created_at: string;
//     updated_at: string;
//     profilePhoto: string | null;
//     Region: string | null;
//     Phone_number: string | null;
//     Gender: string | null;
//     type: null;
//     rate: number | null;
//     user_data: {
//         specialist: string | null;
//         description: string | null;
//     } | null;
// }

// interface FavouriteData {
//     projects: Array<{ favouritable: Project, id:number }>; // Include favourite id
//     services: Array<{ favouritable: Service, id:number }>; // Include favourite id
//     businessGallery: Array<{ favouritable: BusinessGalleryItem, id:number }>; // Include favourite id
//     freelancers: Array<{ favouritable: Freelancer, id:number }>; // Include favourite id
//     user: any
// }

// interface GetFavouritesResponse {
//     message: string;
//     data: FavouriteData;
//     user: User;
// }


// const MyFavourites: React.FC = () => {
//     const [activeTab, setActiveTab] = useState<'Projects' | 'Services' | 'BusinessGallery' | 'Freelancers'>('Projects');
//     const [favouritesData, setFavouritesData] = useState<FavouriteData | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const userAvatarPlaceholder = "placeholder-avatar.jpg";


//     useEffect(() => {
//         const fetchFavourites = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await axios.get<GetFavouritesResponse>(`${process.env.REACT_APP_BACK_URL}/getFavouritesByType`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     }
//                 });
//                 setFavouritesData(response.data as any); // Changed to response.data
//                 setLoading(false);

//             } catch (err: any) {
//                 setError(err.message || 'Failed to fetch favourites');
//                 setLoading(false);
//             }
//         };

//         fetchFavourites();
//     }, []);

//     const handleTabClick = (tab: 'Projects' | 'Services' | 'BusinessGallery' | 'Freelancers') => {
//         setActiveTab(tab);
//     };

//     const handleDeleteFavouriteItem = async (favouriteId: number, type: string) => {
//         try {
//             await axios.delete(`${process.env.REACT_APP_BACK_URL}/favourites/${favouriteId}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 }
//             });
//             toast.success("Removed from favourites!", {
//                 position: "top-right",
//             });

//             // Update state to remove the deleted item
//             setFavouritesData(prevData => {
//                 if (!prevData) return null;
//                 const updatedData = { ...prevData };
//                 switch (type) {
//                     case 'project':
//                         updatedData.projects = prevData.projects.filter(item => item.id !== favouriteId);
//                         break;
//                     case 'service':
//                         updatedData.services = prevData.services.filter(item => item.id !== favouriteId);
//                         break;
//                     case 'businessGallery':
//                         updatedData.businessGallery = prevData.businessGallery.filter(item => item.id !== favouriteId);
//                         break;
//                     case 'freelancer':
//                         updatedData.freelancers = prevData.freelancers.filter(item => item.id !== favouriteId);
//                         break;
//                     default:
//                         break;
//                 }
//                 return updatedData;
//             });


//         } catch (err: any) {
//             let errorMessage = "Failed to remove from favorites.";
//             if (axios.isAxiosError(err)) {
//                 errorMessage = err.response?.data?.message || errorMessage;
//             }
//             toast.error(errorMessage, {
//                 position: "top-right",
//             });
//             console.error("Error removing from favorites:", err);
//         }
//     };


//     if (loading) {
//         return <div>Loading favourites...</div>;
//     }

//     if (error) {
//         return <div className="text-red-500">Error loading favourites: {error}</div>;
//     }

//     const renderFavouritesContent = () => {
//         const onDelete = (favouriteId: number, type: string) => handleDeleteFavouriteItem(favouriteId, type);

//         switch (activeTab) {
//             case 'Projects':
//                 return <FavouriteProjects projects={favouritesData?.projects || []} onDelete={onDelete} />;
//             case 'Services':
//                 return <FavouriteServices services={favouritesData?.services || []} onDelete={onDelete} />;
//             case 'BusinessGallery':
//                 return <FavouriteBusinessGallery businessGalleryItems={favouritesData?.businessGallery || []} onDelete={onDelete} />;
//             case 'Freelancers':
//                 return <FavouriteFreelancers freelancers={favouritesData?.freelancers || []} onDelete={onDelete} />;
//             default:
//                 return <div>Select a category</div>;
//         }
//     };


//     return (
//         <div className="mt-24 bg-gray-100 min-h-screen font-sans pt-10">
//             <div className="container mx-auto px-4 py-8 flex  "> {/* flex container added here */}
//                 <div className="w-1/4 pr-8 hidden md:block"> {/* User profile section - hidden on small screens */}
//                     {favouritesData?.user && (
//                         <UserProfileCard user={favouritesData.user} userAvatarPlaceholder={userAvatarPlaceholder} />
//                     )}
//                 </div>

//                 <div className="flex-1"> {/* Favourites content takes remaining space */}
//                     <h1 className="text-3xl font-semibold text-gray-800 mb-6">My favourites</h1>

//                     <div className="flex border-b mb-4">
//                         <button
//                             className={`px-4 py-2 font-semibold text-sm ${activeTab === 'Projects' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
//                             onClick={() => handleTabClick('Projects')}
//                         >
//                             Projects
//                         </button>
//                         <button
//                             className={`px-4 py-2 font-semibold text-sm ${activeTab === 'Services' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
//                             onClick={() => handleTabClick('Services')}
//                         >
//                             Services
//                         </button>
//                         <button
//                             className={`px-4 py-2 font-semibold text-sm ${activeTab === 'BusinessGallery' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
//                             onClick={() => handleTabClick('BusinessGallery')}
//                         >
//                             Business gallery
//                         </button>
//                         <button
//                             className={`px-4 py-2 font-semibold text-sm ${activeTab === 'Freelancers' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
//                             onClick={() => handleTabClick('Freelancers')}
//                         >
//                             Freelancers
//                         </button>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                         {renderFavouritesContent()}
//                     </div>
//                 </div>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// };


// interface UserProfileCardProps {
//     user: User;
//     userAvatarPlaceholder: string;
// }

// const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, userAvatarPlaceholder }) => {

//     const renderStars = (rate: number | null) => {
//         const fullStars = Math.floor(rate || 0);
//         const hasHalfStar = (rate || 0) % 1 !== 0;
//         const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

//         return (
//             // <div className="flex items-center">
//             //     {Array.from({ length: fullStars }, (_, i) => (
//             //         <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
//             //             <path fillRule="evenodd" d="M10 15.272L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19 10 15.272z" clipRule="evenodd" />
//             //         </svg>
//             //     ))}
//             //     {hasHalfStar && (
//             //         <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
//             //             <path fillRule="evenodd" d="M10 12.72l3.09 2.48-1.12-4.82 4.49-3.86-4.92-.42L10 2.27 7.45 6.1 2.53 6.52l4.49 3.86-1.12 4.82L10 12.72z" clipRule="evenodd" />
//             //         </svg>
//             //     ))}
//             //     {Array.from({ length: emptyStars }, (_, i) => (
//             //         <svg key={i} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20" fill="currentColor">
//             //             <path fillRule="evenodd" d="M10 14.522L16.18 18l-1.64-7.03L20 6.49l-7.19-.61L10 0 7.19 5.88 0 6.49l5.46 4.73L3.82 18 10 14.522z" clipRule="evenodd" />
//             //         </svg>
//             //     ))}
//             // </div>

//             <div className="flex items-center">
//             {Array.from({ length: fullStars }, (_, i) => (
//                 <svg key={`full-${i}`} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 15.272L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19 10 15.272z" clipRule="evenodd" />
//                 </svg>
//             ))}
//             {hasHalfStar && (
//                 <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 12.72l3.09 2.48-1.12-4.82 4.49-3.86-4.92-.42L10 2.27 7.45 6.1 2.53 6.52l4.49 3.86-1.12 4.82L10 12.72z" clipRule="evenodd" />
//                 </svg>
//             )}
//             {Array.from({ length: emptyStars }, (_, i) => (
//                 <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 14.522L16.18 18l-1.64-7.03L20 6.49l-7.19-.61L10 0 7.19 5.88 0 6.49l5.46 4.73L3.82 18 10 14.522z" clipRule="evenodd" />
//                 </svg>
//             ))}
//         </div>
//         );
//     };

//     return (
//         <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 mb-4 shadow-sm relative">
//             <div className="flex flex-col items-center">
//                 <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//                     <img
//                         src={user.profilePhoto ? `http://127.0.0.1:8000/storage/${user.profilePhoto}` : userAvatarPlaceholder}
//                         alt="User Avatar"
//                         className="w-full h-full object-cover"
//                         onError={(e) => { e.currentTarget.src = userAvatarPlaceholder; }}
//                     />
//                 </div>
//                 <div className="mt-4 text-center">
//                     <h3 className="font-semibold text-xl text-gray-900">{`${user?.firstName} ${user?.lastName}`}</h3>
//                     <div className="text-sm text-gray-600 mt-1">
//                         Freelancer, Level New {/* Assuming default level, adjust as needed */}
//                     </div>
//                     <div className="text-sm text-gray-600 mt-1">
//                         Saudi Arabia {/* Assuming default location, adjust as needed or get from user data */}
//                     </div>
//                     <div className="text-sm text-gray-600 mt-1">
//                         Programming, website and application development {/* Assuming default specialization, adjust as needed or get from user data */}
//                     </div>
//                     <div className="mt-2 flex items-center justify-center space-x-1">
//                         <span className="font-semibold text-gray-700 text-sm">Rate:</span>
//                         {renderStars(user?.rate || 0)} {/* Assuming rate is in user data, default to 0 if not available */}
//                         <span className="text-sm text-gray-600 ml-1"> {user?.rate || '0'}</span> {/* Display rate value if available */}
//                     </div>
//                 </div>
//             </div>
//             <button
//                 className="absolute top-[50px] right-2 p-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => alert('Edit Profile')} // Replace with your edit profile logic
//             >
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v5h-5l-1.28-1.28" />
//                 </svg>
//             </button>
//         </div>
//     );
// };


// interface FavouriteProjectsProps {
//     projects: Array<{ favouritable: Project, id: number }>;
//     onDelete: (favouriteId: number, type: string) => void;
// }

// const FavouriteProjects: React.FC<FavouriteProjectsProps> = ({ projects, onDelete }) => {
//     if (!projects || projects.length === 0) {
//         return <div>No favourite projects yet.</div>;
//     }
//     return (
//         <>
//             {projects.map(({ favouritable, id: favouriteId }) => (
//                 favouritable && <ProjectCard key={favouritable.id} project={favouritable} favouriteId={favouriteId} onDelete={onDelete} />
//             ))}
//         </>
//     );
// };


// interface FavouriteServicesProps {
//     services: Array<{ favouritable: Service, id: number }>;
//     onDelete: (favouriteId: number, type: string) => void;
// }

// const FavouriteServices: React.FC<FavouriteServicesProps> = ({ services, onDelete }) => {
//     if (!services || services.length === 0) {
//         return <div>No favourite services yet.</div>;
//     }
//     return (
//         <>
//             {services.map(({ favouritable, id: favouriteId }) => (
//                 favouritable && <ServiceCard key={favouritable.id} service={favouritable} favouriteId={favouriteId} onDelete={onDelete} />
//             ))}
//         </>
//     );
// };

// interface FavouriteBusinessGalleryProps {
//     businessGalleryItems: Array<{ favouritable: BusinessGalleryItem, id: number }>;
//     onDelete: (favouriteId: number, type: string) => void;
// }

// const FavouriteBusinessGallery: React.FC<FavouriteBusinessGalleryProps> = ({ businessGalleryItems, onDelete }) => {
//     if (!businessGalleryItems || businessGalleryItems.length === 0) {
//         return <div>No favourite business gallery items yet.</div>;
//     }
//     return (
//         <>
//             {businessGalleryItems.map(({ favouritable, id: favouriteId }) => (
//                 favouritable && <BusinessGalleryCard key={favouritable.id} businessGalleryItem={favouritable} favouriteId={favouriteId} onDelete={onDelete} />
//             ))}
//         </>
//     );
// };

// interface FavouriteFreelancersProps {
//     freelancers: Array<{ favouritable: Freelancer, id: number }>;
//     onDelete: (favouriteId: number, type: string) => void;
// }

// const FavouriteFreelancers: React.FC<FavouriteFreelancersProps> = ({ freelancers, onDelete }) => {
//     if (!freelancers || freelancers.length === 0) {
//         return <div>No favourite freelancers yet.</div>;
//     }
//     return (
//         <>
//             {freelancers.map(({ favouritable, id: favouriteId }) => (
//                 favouritable && <FreelancerCard key={favouritable.id} freelancer={favouritable} favouriteId={favouriteId} onDelete={onDelete} />
//             ))}
//         </>
//     );
// };


// interface ProjectCardProps {
//     project: Project;
//     favouriteId: number;
//     onDelete: (favouriteId: number, type: string) => void;
// };

// // const ProjectCard: React.FC<ProjectCardProps> = ({ project, favouriteId, onDelete }) => {
// //     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// //     const projectImagePlaceholder = "placeholder-project.jpg";
// //     const authorAvatarPlaceholder = "placeholder-avatar.jpg";

// //     const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

// //     const projectImage = project.project_image ? `${process.env.REACT_APP_BACK_URL}/storage/${project.project_image}` : projectImagePlaceholder;
// //     const authorAvatar = project.user?.profilePhoto ? `${process.env.REACT_APP_BACK_URL}/storage/${project.user.profilePhoto}` : authorAvatarPlaceholder; // Safe access user?.profilePhoto


// //     const handleDeleteClick = () => {
// //         onDelete(favouriteId, 'project');
// //     };


// //     const openReportModal = () => {
// //         setIsDropdownOpen(false);
// //         toast.info("Report feature is in development!", {
// //             position: "top-right",
// //         });
// //     };
// //     const closeReportModal = () => {
// //         setIsDropdownOpen(false);
// //     };
// //     const [isReportModalOpen, setIsReportModalOpen] = useState(false);


// //     const getDurationText = (duration: string | null): string => {
// //         if (!duration) return "";
// //         const parts = duration.split(" ");
// //         if (parts.length !== 2) return duration;
// //         const value = parseInt(parts[0]);
// //         const unit = parts[1].toLowerCase();

// //         if (isNaN(value)) return duration;

// //         switch (unit) {
// //             case 'day':
// //             case 'days':
// //                 return `for ${value} day${value > 1 ? 's' : ''}`;
// //             case 'week':
// //             case 'weeks':
// //                 return `for ${value} week${value > 1 ? 's' : ''}`;
// //             case 'month':
// //             case 'months':
// //                 return `for ${value} month${value > 1 ? 's' : ''}`;
// //             default:
// //                 return duration;
// //         }
// //     };


// //     return (
// //         <div className="rounded-md border border-gray-200 w-[500px] bg-white shadow-sm relative"> {/* Added relative positioning */}
// //             <ToastContainer />
// //             <div className="md:flex">
// //                     <Link to={`/ProjectDetailsPage/${project.id}`}>
// //                 <div className="md:w-40  overflow-hidden">
// //                         <img
// //                             src={projectImage}
// //                             alt={project.project_name}
// //                             className="w-full h-full object-cover cursor-pointer"
// //                             style={{ height: '120px' }}
// //                             onError={(e) => { e.currentTarget.src = projectImagePlaceholder; }}
// //                         />
// //                 </div>

// //                 <div className="p-4 flex-1">
// //                     <div className="flex justify-between items-start">
// //                         <div>
// //                             <Link to={`/ProjectDetailsPage/${project.id}`}>
// //                                 <h3 className="font-semibold text-base text-gray-900 hover:text-orange-500 cursor-pointer">{project.project_name}</h3>
// //                             </Link>
// //                         </div>
// //                         <div className="relative inline-block text-left">
// //                             <div>
// //                                 <button
// //                                     onClick={toggleDropdown}
// //                                     type="button"
// //                                     className="inline-flex justify-center items-center p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md"
// //                                     aria-haspopup="true"
// //                                     aria-expanded={isDropdownOpen}
// //                                 >
// //                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
// //                                         <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a5.25 5.25 0 1010.5 0 5.25 5.25 0 00-10.5 0zM12.75 10.5h-1.5m3 0h-3m-3 0h-1.5m9 0H21a.75.75 0 00-.75-.75V8.25a.75.75 0 00-.75-.75h-2.25c.03.225.03.45.03.675a3 3 0 01-3 3H9.75a3 3 0 01-3-3c0-.225.0-.45-.03-.675H6a.75.75 0 00-.75.75v2.25a.75.75 0 00.75.75H12.75zM15 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
// //                                     </svg>
// //                                 </button>
// //                             </div>
// //                             {/* {isDropdownOpen && (
// //                                 <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-xl z-10 border border-gray-200">
// //                                     <button
// //                                         onClick={handleDeleteClick}
// //                                         className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md"
// //                                         role="menuitem"
// //                                     >
// //                                         <div className="flex items-center space-x-2">
// //                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-500">
// //                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.5-2.5L7.5 12m0 0l-2.25 2.25M7.5 12l2.25-2.25M7.5 12L9.75 14.25m15 0a6 6 0 11-12 0 6 6 0 0112 0z" />
// //                                             </svg>
// //                                             <span>Remove from favorites</span>
// //                                         </div>
// //                                     </button>
// //                                     <button
// //                                         onClick={openReportModal}
// //                                         className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-md"
// //                                         role="menuitem"
// //                                     >
// //                                         <div className="flex items-center space-x-2">
// //                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-500">
// //                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.932 3.374h16.636c1.716 0 2.802-1.874 1.932-3.374l-9.303-16.25C12.529 1.485 11.471 1.485 9.303 3.75l-9.303 16.25zM12 17.25h.008v.008H12v-.008z" />
// //                                             </svg>
// //                                             <span>Report content</span>
// //                                         </div>
// //                                     </button>
// //                                 </div>
// //                             )} */}
// //                         </div>
// //                     </div>

// //                     <div className="text-sm text-gray-500 mt-2 flex items-center space-x-3">
// //                         <div className="flex items-center space-x-2">
// //                             <img src={authorAvatar} alt="Author Avatar" className="w-5 h-5 rounded-full" onError={(e) => { e.currentTarget.src = authorAvatarPlaceholder; }} />
// //                             <span className="text-xs">{project.user?.userName}</span> {/* Safe access user?.userName */}
// //                         </div>
// //                         <div className="flex items-center space-x-1">
// //                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
// //                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414 1.414L9.586 10l-1.293 1.293a1 1 0 101.414 1.414L11 11.414l1.293 1.293a1 1 0 001.414-1.414L12.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 9.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293zM10 2a8 8 0 100 16 8 8 0 000-16z" clipRule="evenodd" />
// //                             </svg>
// //                             <span className="text-xs">{new Date(project.created_at).toLocaleDateString()}</span>
// //                         </div>
// //                         <div className="flex items-center space-x-1">
// //                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
// //                                 <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
// //                             </svg>
// //                             <span className="text-xs">0 Offers</span>
// //                         </div>
// //                     </div>

// //                     <p className="text-gray-700 mt-2 text-sm line-clamp-2">{project.project_description}</p>
// //                     <div className="mt-3 flex justify-between items-center">
// //                         <div>
// //                             <span className="font-semibold text-orange-600 text-lg">{project.budget ? project.budget : "Budget Not Specified"}</span>
// //                             <span className="text-gray-500 text-xs"> {project.duration ? `(${getDurationText(project.duration)})` : ""}</span>
// //                         </div>
// //                         <div>
// //                             {/* <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-1.5 px-3 rounded text-xs">
// //                                 Add to cart
// //                             </button> */}
// //                         </div>
// //                     </div>
// //                 </div>
// //                 </Link>
// //             </div>
// //             <button
// //                 onClick={handleDeleteClick}
// //                 className="absolute top-2 right-2 p-1 rounded-md bg-white text-gray-500 hover:text-gray-700 cursor-pointer"
// //                 title="Remove from favorites"
// //             >
// //                 {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
// //                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.5-2.5L7.5 12m0 0l-2.25 2.25M7.5 12l2.25-2.25M7.5 12L9.75 14.25m15 0a6 6 0 11-12 0 6 6 0 0112 0z" />
// //                 </svg> */}
// //                 <h1 className='text-red-700 font-bold'>Remove</h1>
// //             </button>
// //             <ReportModal isOpen={isReportModalOpen} onClose={closeReportModal} />
// //         </div>
// //     );
// // };


// const ProjectCard: React.FC<ProjectCardProps> = ({ project, favouriteId, onDelete }) => {
//     // const projectImagePlaceholder = "placeholder-project.jpg";
//     // const authorAvatarPlaceholder = "placeholder-avatar.jpg";

//     // const projectImage = project.project_image ? `${process.env.REACT_APP_BACK_URL}/storage/${project.project_image}` : projectImagePlaceholder;
//     // const authorAvatar = project.user?.profilePhoto ? `${process.env.REACT_APP_BACK_URL}/storage/${project.user.profilePhoto}` : authorAvatarPlaceholder; // Safe access user?.profilePhoto


//     // const handleDeleteClick = () => {
//     //     onDelete(favouriteId, 'project');
//     // };


//     // const renderStars = useCallback((rate: number | null) => {
//     //     const stars = [];
//     //     const filledStars = rate || 0;
//     //     for (let i = 1; i <= 5; i++) {
//     //         stars.push(
//     //             <svg
//     //                 key={i}
//     //                 xmlns="http://www.w3.org/2000/svg"
//     //                 viewBox="0 0 20 20"
//     //                 fill={i <= filledStars ? "currentColor" : "currentColor"}
//     //                 className={`w-4 h-4 ${i <= filledStars ? "text-yellow-400" : "text-gray-300"}`}
//     //             >
//     //                 <path
//     //                     fillRule="evenodd"
//     //                     d="M10.868 2.512A1 1 0 009.132 2.512L7.166 6.46l-4.845.702a1 1 0 00-.552 1.667l3.69 3.185-1.278 4.703a1 1 0 001.513 1.057l4.19-2.922 4.19 2.922a1 1 0 001.513-1.057l-1.278-4.703 3.69-3.185a1 1 0 00-.553-1.667l-4.845-.702L10.868 2.512z"
//     //                     clipRule="evenodd"
//     //                 />
//     //             </svg>
//     //         );
//     //     }
//     //     return stars;
//     // }, []);

//     // const displayPercentage = "No offers" ; // Projects have no percentage rate




//         // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//         // console.log(isDropdownOpen);
        
//     const projectImagePlaceholder = "placeholder-project.jpg";
//     // const authorAvatarPlaceholder = "placeholder-avatar.jpg";

//     // const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

//     // const projectImage = project.project_image ? `${process.env.REACT_APP_BACK_URL}/storage/${project.project_image}` : projectImagePlaceholder;
//     // const authorAvatar = project.user?.profilePhoto ? `${process.env.REACT_APP_BACK_URL}/storage/${project.user.profilePhoto}` : authorAvatarPlaceholder; // Safe access user?.profilePhoto


//     const handleDeleteClick = () => {
//         onDelete(favouriteId, 'project');
//     };


//     // const openReportModal = () => {
//     //     setIsDropdownOpen(false);
//     //     toast.info("Report feature is in development!", {
//     //         position: "top-right",
//     //     });
//     // };
//     // const closeReportModal = () => {
//     //     setIsDropdownOpen(false);
//     // };
//     // const [isReportModalOpen, setIsReportModalOpen] = useState(false);


//     // const getDurationText = (duration: string | null): string => {
//     //     if (!duration) return "";
//     //     const parts = duration.split(" ");
//     //     if (parts.length !== 2) return duration;
//     //     const value = parseInt(parts[0]);
//     //     const unit = parts[1].toLowerCase();

//     //     if (isNaN(value)) return duration;

//     //     switch (unit) {
//     //         case 'day':
//     //         case 'days':
//     //             return `for ${value} day${value > 1 ? 's' : ''}`;
//     //         case 'week':
//     //         case 'weeks':
//     //             return `for ${value} week${value > 1 ? 's' : ''}`;
//     //         case 'month':
//     //         case 'months':
//     //             return `for ${value} month${value > 1 ? 's' : ''}`;
//     //         default:
//     //             return duration;
//     //     }
//     // };

    

// // console.log(project.user?.profilePhoto ? "asdsa": "asdasd");


//     return (
//         <div className="relative w-[500px] rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
//       <ToastContainer />
//       <div className="flex items-start gap-4">
//         {/* Project Image */}
//         <Link to={`/ProjectDetailsPage/${project.id}`} className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
//           <img
//             src={`http://127.0.0.1:8000/storage/${project.project_image}` || projectImagePlaceholder}
//             alt={project.project_name}
//             className="w-full h-full object-cover"
//             onError={(e) => (e.currentTarget.src = projectImagePlaceholder)}
//           />
//         </Link>

//         {/* Project Details */}
//         <div className="flex-1">
//           <Link to={`/ProjectDetailsPage/${project.id}`} className="block">
//             <h3 className="text-lg font-semibold text-gray-900 hover:text-orange-500 transition">{project.project_name}</h3>
//           </Link>

//           {/* Metadata Row */}
//           <div className="mt-1 flex items-center gap-3 text-sm text-gray-600">
//             {/* Author Details */}
//             <div className="flex items-center gap-2">
//               <img
//                 src={ project.user?.profilePhoto ? `http://127.0.0.1:8000/storage/${project.user?.profilePhoto}` : authorAvatarPlaceholder}
//                 alt="Author Avatar"
//                 className="w-6 h-6 rounded-full"
//                 onError={(e) => (e.currentTarget.src = authorAvatarPlaceholder)}
//               />
//               <span className="text-xs">{project.user?.userName || "Unknown"}</span>
//             </div>

//             {/* Created At */}
//             <div className="flex items-center gap-1">
//               <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414 1.414L9.586 10l-1.293 1.293a1 1 0 101.414 1.414L11 11.414l1.293 1.293a1 1 0 001.414-1.414L12.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 9.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span className="text-xs">{new Date(project.created_at).toLocaleDateString()}</span>
//             </div>

//             {/* Offers */}
//             <div className="flex items-center gap-1 px-2 bg-gray-100 rounded-md text-gray-700">
//               <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
//                 <path
//                   fillRule="evenodd"
//                   d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span className="text-xs">0 Offers</span>
//             </div>
//           </div>

//           {/* Project Description */}
//           <p className="text-gray-700 mt-3 text-sm line-clamp-2">{project.project_description}</p>
//         </div>
//       </div>

//       {/* Remove Button */}
//       <button
//         onClick={handleDeleteClick}
//         className="absolute top-2 right-2 p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition text-xs font-medium"
//         title="Remove from favorites"
//       >
//         Remove
//       </button>
//     </div>
//     );
// };



// interface ServiceCardProps {
//     service: Service;
//     favouriteId: number;
//     onDelete: (favouriteId: number, type: string) => void;
// }

// const ServiceCard: React.FC<ServiceCardProps> = ({ service, favouriteId, onDelete }) => {
//     const serviceImagePlaceholder = "placeholder-service.jpg";
//     const serviceImage = service.thumbnail_photo ? `http://127.0.0.1:8000/storage/${service.thumbnail_photo}` : serviceImagePlaceholder;
//     const { title, price, /*view_count, rating_avg,*/ delivery_duration } = service;

//     // interface StarRatingProps {
//     //     rating: number | null;
//     // }

//     // const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
//     //     const fullStars = Math.floor(rating || 0);
//     //     const hasHalfStar = (rating || 0) % 1 !== 0;
//     //     const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

//     //     return (
//     //         <div className="flex items-center">
//     //             {[...Array(fullStars)].map((_, i) => <svg key={i} className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.176-6.545L.487 7.23l6.545-.953L10 0l2.868 6.277 6.545.953-4.711 4.315 1.176 6.545z" /></svg>)}
//     //             {hasHalfStar && <svg className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.176-6.545L.487 7.23l6.545-.953L10 0v15z" /></svg>}
//     //             {[...Array(emptyStars)].map((_, i) => <svg key={i} className="w-3 h-3 text-gray-300 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.176-6.545L.487 7.23l6.545-.953L10 0l2.868 6.277 6.545.953-4.711 4.315 1.176 6.545z" /></svg>)}
//     //         </div>
//     //     );
//     // };

//     const handleDeleteClick = () => {
//         onDelete(favouriteId, 'service');
//     };


//     return (
//         <div className=" bg-white rounded-md shadow-sm overflow-hidden border border-gray-200 relative"> {/* Added relative positioning */}
//             <div className="relative">
//                 <Link to={`/ServiceDetailsPage/${service.id}`}>
//                     <img className="w-full h-40 object-cover cursor-pointer" src={`${serviceImage}`} alt={title} onError={(e) => { e.currentTarget.src = serviceImagePlaceholder; }} style={{ height: '160px' }} />
//                 </Link>

//             </div>
//             <div className="p-3">
//                 <Link to={`/ServiceDetailsPage/${service.id}`}>
//                     <h3 className="text-sm font-semibold text-gray-800 truncate hover:text-orange-500 cursor-pointer">{title}</h3>
//                 </Link>
//                 <div className="flex items-center justify-between mt-2 text-gray-600 text-xs">
//                     <div className="flex items-center">
//                         <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
//                         <span>{/*view_count*/}305</span>
//                     </div>
//                     <div className="flex items-center">
//                         <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//                         <span>{delivery_duration || '24 hours'}</span>
//                     </div>
//                 </div>
//                 <div className="flex justify-between items-center mt-2">
//                     <div className="text-sm font-bold text-orange-500">${price}</div>
//                     {/* <div className="flex items-center text-sm text-gray-700">
//                         <StarRating rating={rating_avg} />
//                         <span className="ml-1">({rating_avg?.toFixed(1)})</span>
//                     </div> */}
//                 </div>
//             </div>
//             <button
//                 onClick={handleDeleteClick}
//                 className="absolute top-2 right-2 p-1 rounded-md bg-white text-gray-500 hover:text-gray-700 cursor-pointer"
//                 title="Remove from favorites"
//             >
//                 {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.5-2.5L7.5 12m0 0l-2.25 2.25M7.5 12l2.25-2.25M7.5 12L9.75 14.25m15 0a6 6 0 11-12 0 6 6 0 0112 0z" />
//                 </svg> */}
//                                 <h1 className='text-red-700 font-bold'>Remove</h1>

//             </button>
//         </div>
//     );
// };


// interface BusinessGalleryCardProps {
//     businessGalleryItem: BusinessGalleryItem;
//     favouriteId: number;
//     onDelete: (favouriteId: number, type: string) => void;
// }

// const BusinessGalleryCard: React.FC<BusinessGalleryCardProps> = ({ businessGalleryItem, favouriteId, onDelete }) => {
//     const businessGalleryImagePlaceholder = "placeholder-business-gallery.jpg";
//     const businessGalleryImage = businessGalleryItem.thumbnail ? `http://127.0.0.1:8000/storage/${businessGalleryItem.thumbnail}` : businessGalleryImagePlaceholder;
//     const { workTitle /*likes, views*/ } = businessGalleryItem;

//     const handleDeleteClick = () => {
//         onDelete(favouriteId, 'businessGallery');
//     };


//     return (
//         <div key={businessGalleryItem.id} className="bg-white rounded-lg shadow-md overflow-hidden relative"> {/* Added relative positioning */}
//             <Link to={`/BusinessGalleryDetailsPage/${businessGalleryItem.id}`}>
//                 <img className="w-full h-32 object-cover cursor-pointer" src={businessGalleryImage} alt={workTitle} onError={(e) => { e.currentTarget.src = businessGalleryImagePlaceholder; }} style={{ height: '160px' }} />
//             </Link>
//             <div className="p-4">
//                 <Link to={`/BusinessGalleryDetailsPage/${businessGalleryItem.id}`}>
//                     <h3 className="text-sm font-semibold text-gray-800 truncate mb-2 hover:text-orange-500 cursor-pointer">{workTitle}</h3>
//                 </Link>
//                 <div className="flex items-center justify-between text-gray-600 text-xs">
//                     <div className="flex items-center space-x-2">
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h-2v2h2v-2zM3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2M3 7v-2a4 4 0 014-4h10a4 4 0 014 4v2h-1.333M3 7h18m-13 4v4h-2v-4m-6-4h.01M19 11h.01M21 7a2 2 0 01-2 2V5a2 2 0 112 2zM4 7a2 2 0 01-2 2V5a2 2 0 112 2z"></path></svg>
//                         <span>Play</span>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                         <div className="flex items-center space-x-1">

//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
//                             <span>{/*likes*/}12</span>
//                         </div>
//                         <div className="flex items-center space-x-1">
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
//                             <span>{/*views*/}24</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <button
//                 onClick={handleDeleteClick}
//                 className="absolute top-2 right-2 p-1 rounded-md bg-white text-gray-500 hover:text-gray-700 cursor-pointer"
//                 title="Remove from favorites"
//             >
//                 {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.5-2.5L7.5 12m0 0l-2.25 2.25M7.5 12l2.25-2.25M7.5 12L9.75 14.25m15 0a6 6 0 11-12 0 6 6 0 0112 0z" />
//                 </svg> */}
//                                 <h1 className='text-red-700 font-bold'>Remove</h1>

//             </button>
//         </div>
//     );
// };


// interface FreelancerCardProps {
//     freelancer: Freelancer;
//     favouriteId: number;
//     onDelete: (favouriteId: number, type: string) => void;
// }

// const FreelancerCard: React.FC<FreelancerCardProps> = ({ freelancer, favouriteId, onDelete }) => {
//     const [isContactDropdownOpen, setIsContactDropdownOpen] = useState<boolean>(false);
//     const dropdownRef = useRef<HTMLDivElement>(null);
//     const userAvatarPlaceholder = "placeholder-avatar.jpg";
//     const authorAvatar = freelancer.profilePhoto ? `http://127.0.0.1:8000/storage/${freelancer.profilePhoto}` : userAvatarPlaceholder;
//     const { firstName, lastName, rate, user_data, id: freelancerId } = freelancer;

//     const toggleContactDropdown = () => {
//         setIsContactDropdownOpen(!isContactDropdownOpen);
//     };


//     const handleDeleteClick = () => {
//         onDelete(favouriteId, 'freelancer');
//     };


//     const openReportModal = () => {
//         setIsContactDropdownOpen(false);
//         toast.info("Report feature is in development!", {
//             position: "top-right",
//         });
//     };
//     // const closeReportModal = () => {
//     //     setIsContactDropdownOpen(false);
//     // };


//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (isContactDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//                 setIsContactDropdownOpen(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [isContactDropdownOpen, dropdownRef]);


//     const renderStars = useCallback((rate: number | null) => {
//         const stars = [];
//         const filledStars = rate || 0;
//         for (let i = 1; i <= 5; i++) {
//             stars.push(
//                 <svg
//                     key={i}
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                     fill={i <= filledStars ? "currentColor" : "currentColor"}
//                     className={`w-4 h-4 ${i <= filledStars ? "text-yellow-400" : "text-gray-300"}`}
//                 >
//                     <path
//                         fillRule="evenodd"
//                         d="M10.868 2.512A1 1 0 009.132 2.512L7.166 6.46l-4.845.702a1 1 0 00-.552 1.667l3.69 3.185-1.278 4.703a1 1 0 001.513 1.057l4.19-2.922 4.19 2.922a1 1 0 001.513-1.057l-1.278-4.703 3.69-3.185a1 1 0 00-.553-1.667l-4.845-.702L10.868 2.512z"
//                         clipRule="evenodd"
//                     />
//                 </svg>
//             );
//         }
//         return stars;
//     }, []);

//     const percentageRate = rate ? (rate / 5) * 100 : 0;
//     const displayPercentage = rate ? `${percentageRate.toFixed(0)}%` : "No rating";

//     return (
//         <div className="rounded-xl border w-[500px] border-gray-200 bg-white p-6 mb-4 shadow-sm relative"> {/* Added relative positioning */}
//             <ToastContainer />
//             <div className="flex items-start space-x-4">
//                 <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//                     <Link to={`/FreelancerDetailsPage/${freelancerId}`}>
//                         <img
//                             src={authorAvatar}
//                             alt="Freelancer Avatar"
//                             className="w-full h-full object-cover cursor-pointer"
//                             onError={(e) => { e.currentTarget.src = userAvatarPlaceholder; }}
//                         />
//                     </Link>
//                 </div>
//                 <div className="flex-1">
//                     <Link to={`/FreelancerDetailsPage/${freelancerId}`}>
//                         <h3 className="font-semibold text-xl text-gray-900 hover:text-orange-500 cursor-pointer">{`${firstName} ${lastName}`}</h3>
//                     </Link>
//                     <div className="text-sm text-gray-600 mt-1 flex items-center space-x-3">
//                         <div className="flex items-center space-x-1">
//                             {renderStars(rate)}
//                         </div>
//                         <div className="flex items-center space-x-1">
//                             <span>{displayPercentage}</span>
//                         </div>
//                         <div className="flex items-center space-x-1">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 viewBox="0 0 24 24"
//                                 fill="currentColor"
//                                 className="w-4 h-4 text-gray-500"
//                             >
//                                 <path
//                                     fillRule="evenodd"
//                                     d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9h.008v.008H15.75V9zm-5.25-.375a.75.75 0 00-.75.75v4.125a.75.75 0 00.75.75h3a.75.75 0 00.75-.75V9.375a.75.75 0 00-.75-.75h-3zM18 9.75a.75.75 0 01-.75.75h-2.253l-1.023 2.302a11.25 11.25 0 00-2.64 3.918c-.382.542-.58 1.18a.75.75 0 01-.577 1.206.75.75 0 01-1.205-.577 12.75 12.75 0 013.45-5.013l1.023-2.302H17.25a.75.75 0 01.75-.75zM6 9.75a.75.75 0 00.75.75h2.253l1.023 2.302a11.25 11.25 0 012.64 3.918c.382.542-.58 1.18a.75.75 0 00.577 1.206.75.75 0 001.205-.577 12.75 12.75 0 00-3.45-5.013L8.253 10.5H6.75a.75.75 0 00-.75-.75z"
//                                     clipRule="evenodd"
//                                 />
//                             </svg>
//                             <span>
//                                 {user_data?.specialist || "No Specialization"}
//                             </span>

//                         <div className="flex flex-col items-end justify-between">
//                     <div className="relative inline-block text-left">
//                         <div>
//                             <button
//                                 className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-5 py-2 bg-orange-600 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center"
//                                 onClick={toggleContactDropdown}
//                                 type="button"
//                                 id="options-menu-button"
//                                 aria-expanded={isContactDropdownOpen}
//                                 aria-haspopup="true"
//                             >
//                                 <Link
//                                     to={`/ContactMePage/${freelancer.id}`}
//                                     className="inline-flex items-center"
//                                 >
//                                     <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
//                                         <path d="M17.3894 0H2.61094C0.339326 0 -0.844596 2.63548 0.696196 4.26234L3.78568 7.52441C4.23 7.99355 4.47673 8.60858 4.47673 9.24704V15.4553C4.47673 17.8735 7.61615 18.9233 9.13941 17.0145L19.4463 4.09894C20.7775 2.43071 19.5578 0 17.3894 0Z" fill="white" />
//                                     </svg>
//                                     Contact me
//                                 </Link>
//                                 <svg
//                                     className=" -mr-1 ml-2 h-5 w-5 text-white"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                             </button>
//                         </div>

//                         {isContactDropdownOpen && (
//                             <div
//                                 ref={dropdownRef}
//                                 className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
//                                 role="menu"
//                                 aria-orientation="vertical"
//                                 aria-labelledby="options-menu-button"
//                                 tabIndex={-1}
//                             >
//                                 <div className="py-1" role="none">
//                                     <button
//                                         onClick={handleDeleteClick}
//                                         className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                         role="menuitem"
//                                         tabIndex={-1}
//                                     >
//                                         Remove from favorite
//                                     </button>
//                                     <button
//                                         onClick={openReportModal}
//                                         className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                         role="menuitem"
//                                         tabIndex={-1}
//                                     >
//                                         Report content
//                                     </button>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//                         </div>
//                     </div>


//                     <p className="text-gray-700 mt-3 text-sm">
//                         {user_data?.description || "No Description"}
//                     </p>

//             </div>
//                 </div>
//             <button
//                 onClick={handleDeleteClick}
//                 className="absolute top-2 right-2 p-1 rounded-md bg-white text-gray-500 hover:text-gray-700 cursor-pointer"
//                 title="Remove from favorites"
//             >
//                 {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.5-2.5L7.5 12m0 0l-2.25 2.25M7.5 12l2.25-2.25M7.5 12L9.75 14.25m15 0a6 6 0 11-12 0 6 6 0 0112 0z" />
//                 </svg> */}
//                                 <h1 className='text-red-700 font-bold'>Remove</h1>

//             </button>
//         </div>
//     );
// };

// // interface ReportModalProps {
// //     isOpen: boolean;
// //     onClose: () => void;
// // }

// // const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
// //     if (!isOpen) return null;

// //     return (
// //         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
// //             <div className="bg-white p-6 rounded-md shadow-lg">
// //                 <h2 className="text-lg font-semibold mb-4">Report Content</h2>
// //                 <p className="mb-4">Are you sure you want to report this content?</p>
// //                 <div className="flex justify-end">
// //                     <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded mr-2">Cancel</button>
// //                     <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Report</button>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };


// export default MyFavourites;







// import { useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { AxiosError } from "axios";
// import { FcGoogle } from "react-icons/fc";
// import { FaLinkedin } from "react-icons/fa";
// import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
// import joinUs from "../assets/joinUs.png";
// import { useNavigate } from "react-router-dom";
// import { useGoogleLogin } from "@react-oauth/google";
// import { useLinkedIn } from "react-linkedin-login-oauth2";
// import axios from "axios"; // Make sure axios is imported if not already

// // Define the form data type
// type FormData = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// };

// const JoinUsPage = () => {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<FormData>();

//   const [serverError, setServerError] = useState<string | null>(null);

//   // Google Login Integration
//   const googleLogin = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       try {
//         const userInfoResponse = await fetch(
//           "https://www.googleapis.com/oauth2/v3/userinfo",
//           {
//             headers: {
//               Authorization: `Bearer ${tokenResponse.access_token}`,
//             },
//           }
//         );

//         if (userInfoResponse.ok) {
//           const userInfo = await userInfoResponse.json();
//           handleSocialLogin("google", userInfo); // Call social login handler
//         } else {
//           console.error(
//             "Failed to fetch user info from Google Userinfo API:",
//             userInfoResponse.status,
//             userInfoResponse.statusText
//           );
//           setServerError(
//             "Google Login failed: Could not fetch user information."
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching user info from Google:", error);
//         setServerError("Google Login failed: Error fetching user information.");
//       }
//     },
//     onError: (error) => {
//       console.error("Google Login failed:", error);
//       setServerError("Google Login failed.");
//     },
//   });

//   // LinkedIn Login Integration
//   const { linkedInLogin } = useLinkedIn({
//     clientId: process.env.REACT_APP_LINKEDIN_CLIENT_ID!,
//     redirectUri: window.location.origin, // Use current origin for redirect URI
//     onSuccess: async (codeResponse: any) => {
//       try {
//         // LinkedIn requires exchanging code for token on backend for security
//         const response = await axios.post("/api/linkedin-login", {
//           // Backend endpoint to handle LinkedIn login
//           code: codeResponse.code,
//         });
//         handleSocialLogin("linkedin", response.data.user); // Assuming backend returns user info
//       } catch (error: any) {
//         console.error("LinkedIn Login Error:", error);
//         setServerError("LinkedIn Login failed.");
//       }
//     },
//     onError: (error) => {
//       console.error("LinkedIn Login Error:", error);
//       setServerError("LinkedIn Login failed.");
//     },
//   });

//   // Generic Social Login Handler
//   const handleSocialLogin = async (
//     provider: "google" | "linkedin",
//     userInfo: any
//   ) => {
//     try {
//       const response = await axios.post("/api/social-login", {
//         // Backend endpoint to check/create user
//         provider: provider,
//         userInfo: userInfo,
//       });

//       localStorage.setItem("token", response.data.token); // Assuming backend returns token on successful login/register
//       navigate("/react/Dashboard"); // Redirect to dashboard
//     } catch (error: any) {
//       if (error.response && error.response.status === 404) {
//         // User not found, redirect to account setup with basic info
//         localStorage.setItem(
//           "basicUserInfo",
//           JSON.stringify({
//             email: userInfo.email, // Or appropriate email field from userInfo
//             firstName: userInfo.given_name || userInfo.firstName, // Adjust based on provider response
//             lastName: userInfo.family_name || userInfo.lastName,
//             socialProvider: provider,
//           })
//         );
//         navigate("/react/accountSetup");
//       } else {
//         console.error("Social Login Error:", error);
//         setServerError("Social login failed. Please try again.");
//       }
//     }
//   };

//   const onSubmit: SubmitHandler<FormData> = async (data) => {
//     try {
//       // Save the basic user info to localStorage for manual registration
//       localStorage.setItem(
//         "basicUserInfo",
//         JSON.stringify({
//           ...data,
//           socialProvider: "email", // Indicate manual registration
//         })
//       );

//       // Redirect to the AccountData component
//       navigate("/react/accountSetup");
//     } catch (error) {
//       const axiosError = error as AxiosError<{
//         message: string;
//         errors?: Record<string, string[]>;
//       }>;
//       if (axiosError.response) {
//         if (axiosError.response.data.errors) {
//           Object.entries(axiosError.response.data.errors).forEach(
//             ([field, messages]) => {
//               setError(field as keyof FormData, {
//                 type: "server",
//                 message: messages.join(", "),
//               });
//             }
//           );
//         } else {
//           setServerError(axiosError.response.data.message);
//         }
//       } else {
//         setServerError("An error occurred. Please try again later.");
//       }
//     }
//   };

//   return (
//     <div className="bg-gray-50 py-16 md:py-20">
//       <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6 text-gray-800">
//         Join Us
//       </h2>

//       <div className="container mx-auto bg-white rounded-lg shadow-xl overflow-hidden md:flex md:space-x-8">
//         {/* Left Section */}
//         <div className="md:w-1/2 px-8 py-8 md:py-16">
//           {/* Social Media Sign-In Buttons */}
//           <div className="gap-10 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
//             <button
//               type="button" // Important to prevent form submission
//               onClick={() => googleLogin()}
//               className=" flex items-center justify-center bg-red-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md"
//             >
//               <FcGoogle className="m-3 mr-2 text-2xl" />
//               Join by Google
//             </button>
//             <button
//               type="button" // Important to prevent form submission
//               onClick={() => linkedInLogin()}
//               className=" flex items-center justify-center bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
//             >
//               <FaLinkedin className="mr-2 text-xl" />
//               Join by Linkedin
//             </button>
//           </div>

//           {/* OR Divider */}
//           <div className="flex items-center justify-center my-4">
//             <div className="border-t border-gray-300 flex-grow"></div>
//             <span className="mx-4 text-gray-500 font-semibold">OR</span>
//             <div className="border-t border-gray-300 flex-grow"></div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             {/* ... (rest of your existing form for manual registration - First Name, Last Name, Email, Password) ... */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label
//                   htmlFor="firstName"
//                   className="block text-gray-700 text-sm font-semibold mb-1"
//                 >
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   placeholder="Enter your first name"
//                   className={`w-full px-4 py-3 border ${
//                     errors.firstName ? "border-red-500" : "border-gray-300"
//                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
//                   {...register("firstName", {
//                     required: "First name is required",
//                   })}
//                 />
//                 {errors.firstName && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.firstName.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label
//                   htmlFor="lastName"
//                   className="block text-gray-700 text-sm font-semibold mb-1"
//                 >
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   placeholder="Enter your last name"
//                   className={`w-full px-4 py-3 border ${
//                     errors.lastName ? "border-red-500" : "border-gray-300"
//                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
//                   {...register("lastName", {
//                     required: "Last name is required",
//                   })}
//                 />
//                 {errors.lastName && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.lastName.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-gray-700 text-sm font-semibold mb-1"
//               >
//                 Email
//               </label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   id="email"
//                   placeholder="Enter your email"
//                   className={`w-full px-4 py-3 border ${
//                     errors.email ? "border-red-500" : "border-gray-300"
//                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                       message: "Invalid email address",
//                     },
//                   })}
//                 />
//                 <span className="absolute inset-y-0 right-3 flex items-center">
//                   <HiOutlineMail className="h-5 w-5 text-gray-400" />
//                 </span>
//               </div>
//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-gray-700 text-sm font-semibold mb-1"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type="password"
//                   id="password"
//                   placeholder="Enter your password"
//                   className={`w-full px-4 py-3 border ${
//                     errors.password ? "border-red-500" : "border-gray-300"
//                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
//                   {...register("password", {
//                     required: "Password is required",
//                   })}
//                 />
//                 <span className="absolute inset-y-0 right-3 flex items-center">
//                   <HiOutlineLockClosed className="h-5 w-5 text-gray-400" />
//                 </span>
//               </div>
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300"
//             >
//               Next
//             </button>

//             {/* Display server errors */}
//             {serverError && (
//               <p className="text-red-500 text-sm mt-2 text-center">
//                 {serverError}
//               </p>
//             )}
//           </form>
//         </div>

//         {/* Right Section - Image */}
//         <div className="hidden md:block md:w-1/2">
//           <img
//             src={joinUs}
//             alt="Join Us illustration"
//             className="w-full h-full object-cover rounded-tl-lg rounded-bl-lg"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JoinUsPage;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import authorAvatarPlaceholder from "../assets/basic.png";

// Interfaces for API response and data
interface User {
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
    type: null;
    rate: number | null;
}

interface Project {
    id: number;
    user_id: number;
    project_name: string;
    project_description: string;
    project_image: string | null;
    required_skills: string;
    section: string;
    sub_section: string;
    project_link: string | null;
    project_question: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    duration: string | null;
    budget: string | null;
    user?: User; // User can be potentially undefined
}

interface Service {
    id: number;
    user_id: number;
    title: string;
    section: string;
    subsection: string | null;
    description: string;
    thumbnail_photo: string | null;
    main_photo: string | null;
    required_skills: string | null;
    price: string;
    delivery_duration: string;
    from_date: string | null;
    to_date: string | null;
    link: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    user: User;
}

interface BusinessGalleryItem {
    id: number;
    userId: number;
    workTitle: string;
    workDescription: string;
    thumbnail: string;
    workPhoto: string;
    completeDate: string;
    workLink: string;
    skillsOfWork: string;
    created_at: string;
    updated_at: string;
    user: User;
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
    type: null;
    rate: number | null;
    user_data: {
        specialist: string | null;
        description: string | null;
    } | null;
}

interface FavouriteData {
    projects: Array<{ favouritable: Project, id:number }>; // Include favourite id
    services: Array<{ favouritable: Service, id:number }>; // Include favourite id
    businessGallery: Array<{ favouritable: BusinessGalleryItem, id:number }>; // Include favourite id
    freelancers: Array<{ favouritable: Freelancer, id:number }>; // Include favourite id
    user: any
}

interface GetFavouritesResponse {
    message: string;
    data: FavouriteData;
    user: User;
}


const translations = {
    en: {
        "My favourites": "My favourites",
        "Projects": "Projects",
        "Services": "Services",
        "Business gallery": "Business gallery",
        "Freelancers": "Freelancers",
        "Loading favourites...": "Loading favourites...",
        "Error loading favourites: ": "Error loading favourites: ",
        "No favourite projects yet.": "No favourite projects yet.",
        "No favourite services yet.": "No favourite services yet.",
        "No favourite business gallery items yet.": "No favourite business gallery items yet.",
        "No favourite freelancers yet.": "No favourite freelancers yet.",
        "Select a category": "Select a category",
        "Freelancer, Level New": "Freelancer, Level New",
        "Saudi Arabia": "Saudi Arabia",
        "Programming, website and application development": "Programming, website and application development",
        "Rate:": "Rate:",
        "Edit Profile": "Edit Profile",
        "Remove from favourites!": "Removed from favourites!",
        "Failed to remove from favorites.": "Failed to remove from favorites.",
        "Error removing from favorites:": "Error removing from favorites:",
        "Contact me": "Contact me",
        "Remove from favorite": "Remove from favorite",
        "Report content": "Report content",
        "Remove": "Remove",
        "Budget Not Specified": "Budget Not Specified",
        "No offers": "No offers",
        "Play": "Play",
        "Add to cart": "Add to cart",
    },
    ar: {
        "My favourites": "مفضلاتي",
        "Projects": "المشاريع",
        "Services": "الخدمات",
        "Business gallery": "معرض الأعمال",
        "Freelancers": "المستقلين",
        "Loading favourites...": "جاري تحميل المفضلة...",
        "Error loading favourites: ": "خطأ في تحميل المفضلة: ",
        "No favourite projects yet.": "لا توجد مشاريع مفضلة حتى الآن.",
        "No favourite services yet.": "لا توجد خدمات مفضلة حتى الآن.",
        "No favourite business gallery items yet.": "لا توجد عناصر مفضلة في معرض الأعمال حتى الآن.",
        "No favourite freelancers yet.": "لا يوجد مستقلون مفضلون حتى الآن.",
        "Select a category": "اختر فئة",
        "Freelancer, Level New": "مستقل، المستوى جديد",
        "Saudi Arabia": "المملكة العربية السعودية",
        "Programming, website and application development": "برمجة وتطوير مواقع الويب والتطبيقات",
        "Rate:": "المعدل:",
        "Edit Profile": "تعديل الملف الشخصي",
        "Remove from favourites!": "!تمت الإزالة من المفضلة",
        "Failed to remove from favorites.": "فشل الإزالة من المفضلة.",
        "Error removing from favorites:": "خطأ في إزالة المفضلة:",
        "Contact me": "اتصل بي",
        "Remove from favorite": "إزالة من المفضلة",
        "Report content": "الإبلاغ عن محتوى",
        "Remove": "إزالة",
        "Budget Not Specified": "الميزانية غير محددة",
        "No offers": "لا يوجد عروض",
        "Play": "تشغيل",
        "Add to cart": "أضف إلى السلة",
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};


const MyFavourites: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'Projects' | 'Services' | 'BusinessGallery' | 'Freelancers'>('Projects');
    const [favouritesData, setFavouritesData] = useState<FavouriteData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const userAvatarPlaceholder = "placeholder-avatar.jpg";
    const language = localStorage.getItem('language') === 'ar' ? 'ar' : 'en';


    useEffect(() => {
        const fetchFavourites = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get<GetFavouritesResponse>(`${process.env.REACT_APP_BACK_URL}/getFavouritesByType`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                setFavouritesData(response.data as any); // Changed to response.data
                setLoading(false);

            } catch (err: any) {
                setError(err.message || translate('Failed to fetch favourites', language));
                setLoading(false);
            }
        };

        fetchFavourites();
    }, [language]);

    const handleTabClick = (tab: 'Projects' | 'Services' | 'BusinessGallery' | 'Freelancers') => {
        setActiveTab(tab);
    };

    const handleDeleteFavouriteItem = async (favouriteId: number, type: string) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACK_URL}/favourites/${favouriteId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            toast.success(translate("Remove from favourites!", language), {
                position: "top-right",
            });

            // Update state to remove the deleted item
            setFavouritesData(prevData => {
                if (!prevData) return null;
                const updatedData = { ...prevData };
                switch (type) {
                    case 'project':
                        updatedData.projects = prevData.projects.filter(item => item.id !== favouriteId);
                        break;
                    case 'service':
                        updatedData.services = prevData.services.filter(item => item.id !== favouriteId);
                        break;
                    case 'businessGallery':
                        updatedData.businessGallery = prevData.businessGallery.filter(item => item.id !== favouriteId);
                        break;
                    case 'freelancer':
                        updatedData.freelancers = prevData.freelancers.filter(item => item.id !== favouriteId);
                        break;
                    default:
                        break;
                }
                return updatedData;
            });


        } catch (err: any) {
            let errorMessage = translate("Failed to remove from favorites.", language);
            if (axios.isAxiosError(err)) {
                errorMessage = err.response?.data?.message || errorMessage;
            }
            toast.error(errorMessage, {
                position: "top-right",
            });
            console.error("Error removing from favorites:", err);
        }
    };


    if (loading) {
        return <div>{translate("Loading favourites...", language)}</div>;
    }

    if (error) {
        return <div className="text-red-500">{translate("Error loading favourites: ", language)} {error}</div>;
    }

    const renderFavouritesContent = () => {
        const onDelete = (favouriteId: number, type: string) => handleDeleteFavouriteItem(favouriteId, type);

        switch (activeTab) {
            case 'Projects':
                return <FavouriteProjects projects={favouritesData?.projects || []} onDelete={onDelete} />;
            case 'Services':
                return <FavouriteServices services={favouritesData?.services || []} onDelete={onDelete} />;
            case 'BusinessGallery':
                return <FavouriteBusinessGallery businessGalleryItems={favouritesData?.businessGallery || []} onDelete={onDelete} />;
            case 'Freelancers':
                return <FavouriteFreelancers freelancers={favouritesData?.freelancers || []} onDelete={onDelete} />;
            default:
                return <div>{translate("Select a category", language)}</div>;
        }
    };


    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="mt-24 bg-gray-100 min-h-screen font-sans pt-10">
            <div className="container gap-10 mx-auto px-4 py-8 flex flex-col md:flex-row"> {/* flex container added here and responsive direction */}
                <div className="w-full md:w-1/4 pr-8 mb-8 md:mb-0"> {/* User profile section - full width on small screens, fixed width on medium+ */}
                    {favouritesData?.user && (
                        <UserProfileCard user={favouritesData.user} userAvatarPlaceholder={userAvatarPlaceholder} />
                    )}
                </div>

                <div className="flex-1"> {/* Favourites content takes remaining space */}
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6">{translate("My favourites", language)}</h1>

                    <div className="flex border-b mb-4">
                        <button
                            className={`px-4 py-2 font-semibold text-sm ${activeTab === 'Projects' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
                            onClick={() => handleTabClick('Projects')}
                        >
                            {translate("Projects", language)}
                        </button>
                        <button
                            className={`px-4 py-2 font-semibold text-sm ${activeTab === 'Services' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
                            onClick={() => handleTabClick('Services')}
                        >
                            {translate("Services", language)}
                        </button>
                        <button
                            className={`px-4 py-2 font-semibold text-sm ${activeTab === 'BusinessGallery' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
                            onClick={() => handleTabClick('BusinessGallery')}
                        >
                            {translate("Business gallery", language)}
                        </button>
                        <button
                            className={`px-4 py-2 font-semibold text-sm ${activeTab === 'Freelancers' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
                            onClick={() => handleTabClick('Freelancers')}
                        >
                            {translate("Freelancers", language)}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> {/* Responsive grid columns */}
                        {renderFavouritesContent()}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};


interface UserProfileCardProps {
    user: User;
    userAvatarPlaceholder: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, userAvatarPlaceholder }) => {
    const language = localStorage.getItem('language') === 'ar' ? 'ar' : 'en';

    const renderStars = (rate: number | null) => {
        const fullStars = Math.floor(rate || 0);
        const hasHalfStar = (rate || 0) % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="flex items-center">
            {Array.from({ length: fullStars }, (_, i) => (
                <svg key={`full-${i}`} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 15.272L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19 10 15.272z" clipRule="evenodd" />
                </svg>
            ))}
            {hasHalfStar && (
                <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 12.72l3.09 2.48-1.12-4.82 4.49-3.86-4.92-.42L10 2.27 7.45 6.1 2.53 6.52l4.49 3.86-1.12 4.82L10 12.72z" clipRule="evenodd" />
                </svg>
            )}
            {Array.from({ length: emptyStars }, (_, i) => (
                <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 14.522L16.18 18l-1.64-7.03L20 6.49l-7.19-.61L10 0 7.19 5.88 0 6.49l5.46 4.73L3.82 18 10 14.522z" clipRule="evenodd" />
                </svg>
            ))}
        </div>
        );
    };

    return (
        <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 mb-4 shadow-sm relative">
            <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                        src={user.profilePhoto ? `http://127.0.0.1:8000/storage/${user.profilePhoto}` : userAvatarPlaceholder}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = userAvatarPlaceholder; }}
                    />
                </div>
                <div className="mt-4 text-center">
                    <h3 className="font-semibold text-xl text-gray-900">{`${user?.firstName} ${user?.lastName}`}</h3>
                    <div className="text-sm text-gray-600 mt-1">
                        {translate("Freelancer, Level New", language)}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                        {translate("Saudi Arabia", language)}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                        {translate("Programming, website and application development", language)}
                    </div>
                    <div className="mt-2 flex items-center justify-center space-x-1">
                        <span className="font-semibold text-gray-700 text-sm">{translate("Rate:", language)}</span>
                        {renderStars(user?.rate || 0)}
                        <span className="text-sm text-gray-600 ml-1"> {user?.rate || '0'}</span>
                    </div>
                </div>
            </div>
            <button
                className="absolute top-[50px] right-2 p-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => alert(translate('Edit Profile', language))} // Replace with your edit profile logic
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v5h-5l-1.28-1.28" />
                </svg>
                <span className="sr-only">{translate("Edit Profile", language)}</span>
            </button>
        </div>
    );
};


interface FavouriteProjectsProps {
    projects: Array<{ favouritable: Project, id: number }>;
    onDelete: (favouriteId: number, type: string) => void;
}

const FavouriteProjects: React.FC<FavouriteProjectsProps> = ({ projects, onDelete }: any) => {
    const language = localStorage.getItem('language') === 'ar' ? 'ar' : 'en';

    if (!projects || projects.length === 0) {
        return <div>{translate("No favourite projects yet.", language)}</div>;
    }
    return (
        <>
            {projects.map(({ favouritable, id: favouriteId }: any) => (
                favouritable && <ProjectCard key={favouritable.id} project={favouritable} favouriteId={favouriteId} onDelete={onDelete} />
            ))}
        </>
    );
};


interface FavouriteServicesProps {
    services: Array<{ favouritable: Service, id: number }>;
    onDelete: (favouriteId: number, type: string) => void;
}

const FavouriteServices: React.FC<FavouriteServicesProps> = ({ services, onDelete }: any) => {
    const language = localStorage.getItem('language') === 'ar' ? 'ar' : 'en';

    if (!services || services.length === 0) {
        return <div>{translate("No favourite services yet.", language)}</div>;
    }
    return (
        <>
            {services.map(({ favouritable, id: favouriteId }: any) => (
                favouritable && <ServiceCard key={favouritable.id} service={favouritable} favouriteId={favouriteId} onDelete={onDelete} />
            ))}
        </>
    );
};

interface FavouriteBusinessGalleryProps {
    businessGalleryItems: Array<{ favouritable: BusinessGalleryItem, id: number }>;
    onDelete: (favouriteId: number, type: string) => void;
}

const FavouriteBusinessGallery: React.FC<FavouriteBusinessGalleryProps> = ({ businessGalleryItems, onDelete }: any) => {
    const language = localStorage.getItem('language') === 'ar' ? 'ar' : 'en';

    if (!businessGalleryItems || businessGalleryItems.length === 0) {
        return <div>{translate("No favourite business gallery items yet.", language)}</div>;
    }
    return (
        <>
            {businessGalleryItems.map(({ favouritable, id: favouriteId }: any) => (
                favouritable && <BusinessGalleryCard key={favouritable.id} businessGalleryItem={favouritable} favouriteId={favouriteId} onDelete={onDelete} />
            ))}
        </>
    );
};

interface FavouriteFreelancersProps {
    freelancers: Array<{ favouritable: Freelancer, id: number }>;
    onDelete: (favouriteId: number, type: string) => void;
}

const FavouriteFreelancers: React.FC<FavouriteFreelancersProps> = ({ freelancers, onDelete }: any) => {
    const language = localStorage.getItem('language') === 'ar' ? 'ar' : 'en';

    if (!freelancers || freelancers.length === 0) {
        return <div>{translate("No favourite freelancers yet.", language)}</div>;
    }
    return (
        <>
            {freelancers.map(({ favouritable, id: favouriteId }: any) => (
                favouritable && <FreelancerCard key={favouritable.id} freelancer={favouritable} favouriteId={favouriteId} onDelete={onDelete} />
            ))}
        </>
    );
};


interface ProjectCardProps {
    project: Project;
    favouriteId: number;
    onDelete: (favouriteId: number, type: string) => void;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, favouriteId, onDelete }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const projectImagePlaceholder = "placeholder-project.jpg";
    const authorAvatarPlaceholder = "placeholder-avatar.jpg";
    const language = localStorage.getItem('language') === 'ar' ? 'ar' : 'en';

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const projectImage = project.project_image ? `http://127.0.0.1:8000/storage/${project.project_image}` : projectImagePlaceholder;
    const authorAvatar = project.user?.profilePhoto ? `http://127.0.0.1:8000/storage/${project.user.profilePhoto}` : authorAvatarPlaceholder; // Safe access user?.profilePhoto


    const handleDeleteClick = () => {
        onDelete(favouriteId, 'project');
    };


    const openReportModal = () => {
        setIsDropdownOpen(false);
        toast.info("Report feature is in development!", {
            position: "top-right",
        });
    };
    // const closeReportModal = () => {
    //     setIsDropdownOpen(false);
    // };
    // const [isReportModalOpen, setIsReportModalOpen] = useState(false);


    const getDurationText = (duration: string | null): string => {
        if (!duration) return "";
        const parts = duration.split(" ");
        if (parts.length !== 2) return duration;
        const value = parseInt(parts[0]);
        const unit = parts[1].toLowerCase();

        if (isNaN(value)) return duration;

        switch (unit) {
            case 'day':
            case 'days':
                return `for ${value} day${value > 1 ? 's' : ''}`;
            case 'week':
            case 'weeks':
                return `for ${value} week${value > 1 ? 's' : ''}`;
            case 'month':
            case 'months':
                return `for ${value} month${value > 1 ? 's' : ''}`;
            default:
                return duration;
        }
    };


    return (
        <div className="rounded-md border w-[500px] border-gray-200 bg-white shadow-sm relative"> {/* Added relative positioning */}
            <ToastContainer />
            <div className="md:flex">
                    <Link to={`/ProjectDetailsPage/${project.id}`} className="block md:flex-shrink-0"> {/* Make image not shrink on md+ screens */}
                <div className="md:w-40  overflow-hidden">
                        <img
                            src={projectImage}
                            alt={project.project_name}
                            className="w-full h-full object-cover cursor-pointer"
                            style={{ height: '120px' }}
                            onError={(e) => { e.currentTarget.src = projectImagePlaceholder; }}
                        />
                </div>
                </Link>


                <div className="p-4 flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <Link to={`/ProjectDetailsPage/${project.id}`}>
                                <h3 className="font-semibold text-base text-gray-900 hover:text-orange-500 cursor-pointer">{project.project_name}</h3>
                            </Link>
                        </div>
                        <div className="relative inline-block text-left">
                            <div>
                                <button
                                    onClick={toggleDropdown}
                                    type="button"
                                    className="inline-flex justify-center items-center p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md"
                                    aria-haspopup="true"
                                    aria-expanded={isDropdownOpen}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a5.25 5.25 0 1010.5 0 5.25 5.25 0 00-10.5 0zM12.75 10.5h-1.5m3 0h-3m-3 0h-1.5m9 0H21a.75.75 0 00-.75-.75V8.25a.75.75 0 00-.75-.75h-2.25c.03.225.03.45.03.675a3 3 0 01-3 3H9.75a3 3 0 01-3-3c0-.225.0-.45-.03-.675H6a.75.75 0 00-.75.75v2.25a.75.75 0 00.75.75H12.75zM15 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                    </svg>
                                </button>
                            </div>
                            {isDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-xl z-10 border border-gray-200">
                                    <button
                                        onClick={handleDeleteClick}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md"
                                        role="menuitem"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.5-2.5L7.5 12m0 0l-2.25 2.25M7.5 12l2.25-2.25M7.5 12L9.75 14.25m15 0a6 6 0 11-12 0 6 6 0 0112 0z" />
                                            </svg>
                                            <span>{translate("Remove from favorite", language)}</span>
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

                    <div className="text-sm text-gray-500 mt-2 flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                            <img src={authorAvatar} alt="Author Avatar" className="w-5 h-5 rounded-full" onError={(e) => { e.currentTarget.src = authorAvatarPlaceholder; }} />
                            <span className="text-xs">{project.user?.userName}</span> {/* Safe access user?.userName */}
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414 1.414L9.586 10l-1.293 1.293a1 1 0 101.414 1.414L11 11.414l1.293 1.293a1 1 0 001.414-1.414L12.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 9.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293zM10 2a8 8 0 100 16 8 8 0 000-16z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs">{new Date(project.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs">{translate("No offers", language)}</span>
                        </div>
                    </div>

                    <p className="text-gray-700 mt-2 text-sm line-clamp-2">{project.project_description}</p>
                    <div className="mt-3 flex justify-between items-center">
                        <div>
                            <span className="font-semibold text-orange-600 text-lg">{project.budget ? project.budget : translate("Budget Not Specified", language)}</span>
                            <span className="text-gray-500 text-xs"> {project.duration ? `(${getDurationText(project.duration)})` : ""}</span>
                        </div>
                        <div>
                            {/* <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-1.5 px-3 rounded text-xs">
                                {translate("Add to cart", language)}
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
            <button
                onClick={handleDeleteClick}
                className="absolute top-2 right-2 p-1 rounded-md bg-white text-gray-500 hover:text-gray-700 cursor-pointer"
                title="Remove from favorites"
            >
                <h1 className='text-red-700 font-bold'>{translate("Remove", language)}</h1>
            </button>
        </div>
    );
};



interface ServiceCardProps {
    service: Service;
    favouriteId: number;
    onDelete: (favouriteId: number, type: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, favouriteId, onDelete }) => {
    const serviceImagePlaceholder = "placeholder-service.jpg";
    const serviceImage = service.thumbnail_photo ? `http://127.0.0.1:8000/storage/${service.thumbnail_photo}` : serviceImagePlaceholder;
    const { title, price, /*view_count, rating_avg,*/ delivery_duration } = service;
    const language = localStorage.getItem('language') === 'ar' ? 'ar' : 'en';


    const handleDeleteClick = () => {
        onDelete(favouriteId, 'service');
    };


    return (
        <div className=" bg-white rounded-md shadow-sm overflow-hidden border border-gray-200 relative"> {/* Added relative positioning */}
            <div className="relative">
                <Link to={`/ServiceDetailsPage/${service.id}`}>
                    <img className="w-full h-40 object-cover cursor-pointer" src={`${serviceImage}`} alt={title} onError={(e) => { e.currentTarget.src = serviceImagePlaceholder; }} style={{ height: '160px' }} />
                </Link>

            </div>
            <div className="p-3">
                <Link to={`/ServiceDetailsPage/${service.id}`}>
                    <h3 className="text-sm font-semibold text-gray-800 truncate hover:text-orange-500 cursor-pointer">{title}</h3>
                </Link>
                <div className="flex items-center justify-between mt-2 text-gray-600 text-xs">
                    <div className="flex items-center">
                        <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        <span>{/*view_count*/}305</span>
                    </div>
                    <div className="flex items-center">
                        <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{delivery_duration || '24 hours'}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <div className="text-sm font-bold text-orange-500">${price}</div>
                    {/* <div className="flex items-center text-sm text-gray-700">
                        <StarRating rating={rating_avg} />
                        <span className="ml-1">({rating_avg?.toFixed(1)})</span>
                    </div> */}
                </div>
            </div>
            <button
                onClick={handleDeleteClick}
                className="absolute top-2 right-2 p-1 rounded-md bg-white text-gray-500 hover:text-gray-700 cursor-pointer"
                title="Remove from favorites"
            >
                <h1 className='text-red-700 font-bold'>{translate("Remove", language)}</h1>

            </button>
        </div>
    );
};


interface BusinessGalleryCardProps {
    businessGalleryItem: BusinessGalleryItem;
    favouriteId: number;
    onDelete: (favouriteId: number, type: string) => void;
}

const BusinessGalleryCard: React.FC<BusinessGalleryCardProps> = ({ businessGalleryItem, favouriteId, onDelete }) => {
    const businessGalleryImagePlaceholder = "placeholder-business-gallery.jpg";
    const businessGalleryImage = businessGalleryItem.thumbnail ? `http://127.0.0.1:8000/storage/${businessGalleryItem.thumbnail}` : businessGalleryImagePlaceholder;
    const { workTitle /*likes, views*/ } = businessGalleryItem;
    const language = localStorage.getItem('language') === 'ar' ? 'ar' : 'en';


    const handleDeleteClick = () => {
        onDelete(favouriteId, 'businessGallery');
    };


    return (
        <div key={businessGalleryItem.id} className="bg-white rounded-lg shadow-md overflow-hidden relative"> {/* Added relative positioning */}
            <Link to={`/BusinessGalleryDetailsPage/${businessGalleryItem.id}`}>
                <img className="w-full h-32 object-cover cursor-pointer" src={businessGalleryImage} alt={workTitle} onError={(e) => { e.currentTarget.src = businessGalleryImagePlaceholder; }} style={{ height: '160px' }} />
            </Link>
            <div className="p-4">
                <Link to={`/BusinessGalleryDetailsPage/${businessGalleryItem.id}`}>
                    <h3 className="text-sm font-semibold text-gray-800 truncate mb-2 hover:text-orange-500 cursor-pointer">{workTitle}</h3>
                </Link>
                <div className="flex items-center justify-between text-gray-600 text-xs">
                    <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h-2v2h2v-2zM3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2M3 7v-2a4 4 0 014-4h10a4 4 0 014 4v2h-1.333M3 7h18m-13 4v4h-2v-4m-6-4h.01M19 11h.01M21 7a2 2 0 01-2 2V5a2 2 0 112 2zM4 7a2 2 0 01-2 2V5a2 2 0 112 2z"></path></svg>
                        <span>{translate("Play", language)}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">

                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                            <span>{/*likes*/}12</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                            <span>{/*views*/}24</span>
                        </div>
                    </div>
                </div>
            </div>
            <button
                onClick={handleDeleteClick}
                className="absolute top-2 right-2 p-1 rounded-md bg-white text-gray-500 hover:text-gray-700 cursor-pointer"
                title="Remove from favorites"
            >
                <h1 className='text-red-700 font-bold'>{translate("Remove", language)}</h1>

            </button>
        </div>
    );
};


interface FreelancerCardProps {
    freelancer: Freelancer;
    favouriteId: number;
    onDelete: (favouriteId: number, type: string) => void;
}

const FreelancerCard: React.FC<FreelancerCardProps> = ({ freelancer, favouriteId, onDelete }) => {
    const [isContactDropdownOpen, setIsContactDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const userAvatarPlaceholder = "placeholder-avatar.jpg";
    const authorAvatar = freelancer.profilePhoto ? `http://127.0.0.1:8000/storage/${freelancer.profilePhoto}` : userAvatarPlaceholder;
    const { firstName, lastName, rate, user_data, id: freelancerId } = freelancer;
    const language = localStorage.getItem('language') === 'ar' ? 'ar' : 'en';


    const toggleContactDropdown = () => {
        setIsContactDropdownOpen(!isContactDropdownOpen);
    };


    const handleDeleteClick = () => {
        onDelete(favouriteId, 'freelancer');
    };


    const openReportModal = () => {
        setIsContactDropdownOpen(false);
        toast.info("Report feature is in development!", {
            position: "top-right",
        });
    };
    // const closeReportModal = () => {
    //     setIsContactDropdownOpen(false);
    // };


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


    const renderStars = useCallback((rate: number | null) => {
        const stars = [];
        const filledStars = rate || 0;
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill={i <= filledStars ? "currentColor" : "currentColor"}
                    className={`w-4 h-4 ${i <= filledStars ? "text-yellow-400" : "text-gray-300"}`}
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
    }, []);

    const percentageRate = rate ? (rate / 5) * 100 : 0;
    const displayPercentage = rate ? `${percentageRate.toFixed(0)}%` : "No rating";

    return (
        <div className="rounded-xl border w-full md:w-[500px] border-gray-200 bg-white p-6 mb-4 shadow-sm relative"> {/* Added relative positioning and responsive width */}
            <ToastContainer />
            <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <Link to={`/FreelancerDetailsPage/${freelancerId}`}>
                        <img
                            src={authorAvatar}
                            alt="Freelancer Avatar"
                            className="w-full h-full object-cover cursor-pointer"
                            onError={(e) => { e.currentTarget.src = userAvatarPlaceholder; }}
                        />
                    </Link>
                </div>
                <div className="flex-1">
                    <Link to={`/FreelancerDetailsPage/${freelancerId}`}>
                        <h3 className="font-semibold text-xl text-gray-900 hover:text-orange-500 cursor-pointer">{`${firstName} ${lastName}`}</h3>
                    </Link>
                    <div className="text-sm text-gray-600 mt-1 flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                            {renderStars(rate)}
                        </div>
                        <div className="flex items-center space-x-1">
                            <span>{displayPercentage}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4 text-gray-500"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9h.008v.008H15.75V9zm-5.25-.375a.75.75 0 00-.75.75v4.125a.75.75 0 00.75.75h3a.75.75 0 00.75-.75V9.375a.75.75 0 00-.75-.75h-3zM18 9.75a.75.75 0 01-.75.75h-2.253l-1.023 2.302a11.25 11.25 0 00-2.64 3.918c-.382.542-.58 1.18a.75.75 0 01-.577 1.206.75.75 0 01-1.205-.577 12.75 12.75 0 013.45-5.013l1.023-2.302H17.25a.75.75 0 01.75-.75zM6 9.75a.75.75 0 00.75.75h2.253l1.023 2.302a11.25 11.25 0 012.64 3.918c.382.542-.58 1.18a.75.75 0 00.577 1.206.75.75 0 001.205-.577 12.75 12.75 0 00-3.45-5.013L8.253 10.5H6.75a.75.75 0 00-.75-.75z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>
                                {user_data?.specialist || "No Specialization"}
                            </span>

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
                                    to={`/ContactMePage/${freelancer.id}`}
                                    className="inline-flex items-center"
                                >
                                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                                        <path d="M17.3894 0H2.61094C0.339326 0 -0.844596 2.63548 0.696196 4.26234L3.78568 7.52441C4.23 7.99355 4.47673 8.60858 4.47673 9.24704V15.4553C4.47673 17.8735 7.61615 18.9233 9.13941 17.0145L19.4463 4.09894C20.7775 2.43071 19.5578 0 17.3894 0Z" fill="white" />
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
                                        onClick={handleDeleteClick}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        tabIndex={-1}
                                    >
                                        {translate("Remove from favorite", language)}
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
                    </div>


                    <p className="text-gray-700 mt-3 text-sm">
                        {user_data?.description || "No Description"}
                    </p>

            </div>
                </div>
            <button
                onClick={handleDeleteClick}
                className="absolute top-2 right-2 p-1 rounded-md bg-white text-gray-500 hover:text-gray-700 cursor-pointer"
                title="Remove from favorites"
            >
                <h1 className='text-red-700 font-bold'>{translate("Remove", language)}</h1>

            </button>
        </div>
    );
};


export default MyFavourites;