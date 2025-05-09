// // import { useState, useEffect } from 'react';
// // import axios from 'axios';
// // // import { StarIcon } from '@heroicons/react/20/solid';

// // // Interfaces for API response and data

// // // ... (Interfaces: UserStatistics, UserWork, UserService, UserProject, UserData, GetUserResponse - Keep these as they are) ...
// // interface UserStatistics {
// //     id: number;
// //     user_id: number;
// //     ratings: string | null;
// //     project_completion_rate: string | null;
// //     reemployment_rate: string | null;
// //     on_time_delivery_rate: string | null;
// //     average_response_time: string | null;
// //     registration_date: string | null;
// //     last_seen_at: string | null;
// //     created_at: string;
// //     updated_at: string;
// // }

// // interface UserWork {
// //     id: number;
// //     userId: number;
// //     workTitle: string;
// //     workDescription: string;
// //     thumbnail: string;
// //     workPhoto: string;
// //     completeDate: string;
// //     workLink: string;
// //     skillsOfWork: string;
// //     created_at: string;
// //     updated_at: string;
// // }

// // interface UserService {
// //     id: number;
// //     user_id: number;
// //     serviceTitle: string;
// //     serviceDescription: string;
// //     price: string;
// //     thumbnail: string;
// //     servicePhoto: string;
// //     created_at: string;
// //     updated_at: string;
// // }

// // interface UserProject {
// //     id: number;
// //     user_id: number;
// //     projectTitle: string;
// //     projectDescription: string;
// //     price: string;
// //     thumbnail: string;
// //     projectPhoto: string;
// //     created_at: string;
// //     updated_at: string;
// // }


// // interface UserData {
// //     id: number;
// //     firstName: string;
// //     lastName: string;
// //     email: string;
// //     userName: string;
// //     role: string;
// //     accountType: string;
// //     isEmailVerified: number;
// //     created_at: string;
// //     updated_at: string;
// //     profilePhoto: string | null; // Allow null for profilePhoto
// //     Region: string | null; // Allow null for Region
// //     Phone_number: string | null;
// //     Gender: string | null;
// //     type: null;
// //     user_data: {
// //         id: number;
// //         userId: number;
// //         specialist: string;
// //         jobTitle: string;
// //         description: string;
// //         skillsOfWork: string[];
// //         created_at: string;
// //         updated_at: string;
// //     } | null; // Allow null for user_data
// //     user_works: UserWork | null;
// //     user_statistics: UserStatistics | null; // Allow null for user_statistics
// //     user_services: UserService[] | null; // User services can be null or array of UserService
// //     user_projects: UserProject[] | null; // User projects can be null or array of UserProject
// // }


// // interface GetUserResponse {
// //     message: string;
// //     user: UserData;
// // }

// // interface ProfileContentProps {
// //     statisticData: UserStatistics | null;
// //     loading: boolean;
// //     error: string | null;
// // }

// // interface ProjectsContentProps {
// //     projects: UserProject[] | null;
// //     loading: boolean;
// //     error: string | null;
// // }

// // interface ServicesContentProps {
// //     services: UserService[] | null;
// //     loading: boolean;
// //     error: string | null;
// // }

// // interface UserWorksContentProps {
// //     userWorks: UserWork | null;
// //     loading: boolean;
// //     error: string | null;
// // }


// // const ProfileContent: React.FC<ProfileContentProps> = ({ statisticData, loading, error }) => {

// //     if (loading) {
// //         return <div>Loading Statistics...</div>;
// //     }

// //     if (error) {
// //         return <div className="text-red-500">Error loading statistics: {error}</div>;
// //     }

// //     // Function to format numbers to one decimal place if needed, otherwise as integer, default to '0' if null
// //     const formatNumber = (value: string | null | undefined): string => {
// //         if (value === null || value === undefined) {
// //             return '0'; // Default to '0' if value is null or undefined
// //         }
// //         const num = Number(value);
// //         if (isNaN(num)) return 'N/A';
// //         if (num % 1 === 0) {
// //             return String(num);
// //         } else {
// //             return num.toFixed(1);
// //         }
// //     };

// //     const ratings = formatNumber(statisticData?.ratings);
// //     const projectCompletionRate = formatNumber(statisticData?.project_completion_rate);
// //     const reemploymentRate = formatNumber(statisticData?.reemployment_rate);
// //     const onTimeDeliveryRate = formatNumber(statisticData?.on_time_delivery_rate);
// //     const averageResponseTime = statisticData?.average_response_time || 'N/A';
// //     const registrationDate = statisticData?.registration_date || 'N/A';
// //     const lastSeen = statisticData?.last_seen_at ? `From ${statisticData.last_seen_at}` : 'N/A';


// //     return (
// //         <div className="mt-6 space-y-4">
// //             <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
// //                 <h2 className="text-lg font-semibold text-gray-700 mb-4">Statistics</h2>
// //                 <div className="flex justify-between items-center text-sm text-gray-600 py-1">
// //                     <span>Ratings</span>
// //                     <div className="flex items-center space-x-0.5">
// //                         {[1, 2, 3, 4, 5].map((star) => (
// //                             <svg
// //                                 key={star}
// //                                 xmlns="http://www.w3.org/2000/svg"
// //                                 className={`h-4 w-4 ${star <= parseFloat(ratings) ? 'text-yellow-400' : 'text-gray-300'}`}
// //                                 viewBox="0 0 20 20"
// //                                 fill="currentColor"
// //                             >
// //                                 <path
// //                                     fillRule="evenodd"
// //                                     d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.172 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.296-1.584-.537-1.65l-4.752-.382-1.831-4.401z"
// //                                     clipRule="evenodd"
// //                                 />
// //                             </svg>
// //                         ))}
// //                         <span className="ml-1">{ratings}</span>
// //                     </div>
// //                 </div>
// //                 <div className="flex justify-between items-center text-sm text-gray-600 py-1">
// //                     <span>Project completion rate</span>
// //                     <span className="font-semibold">{projectCompletionRate}%</span>
// //                 </div>
// //                 <div className="flex justify-between items-center text-sm text-gray-600 py-1">
// //                     <span>Reemployment rate</span>
// //                     <span className="font-semibold">{reemploymentRate}%</span>
// //                 </div>
// //                 <div className="flex justify-between items-center text-sm text-gray-600 py-1">
// //                     <span>On time delivery rate</span>
// //                     <span className="font-semibold">{onTimeDeliveryRate}%</span>
// //                 </div>
// //                 <div className="flex justify-between items-center text-sm text-gray-600 py-1">
// //                     <span>Average speed of response</span>
// //                     <span>{averageResponseTime}</span>
// //                 </div>
// //             </div>

// //             <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
// //                 <h2 className="text-lg font-semibold text-gray-700 mb-4">Registration data</h2>
// //                 <div className="flex justify-between items-center text-sm text-gray-600 py-1">
// //                     <span>Registration date</span>
// //                     <span>{registrationDate}</span>
// //                 </div>
// //                 <div className="flex justify-between items-center text-sm text-gray-600 py-1">
// //                     <span>Last seen</span>
// //                     <span>{lastSeen}</span>
// //                 </div>
// //             </div>

// //             <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
// //                 <h2 className="text-lg font-semibold text-gray-700 mb-4">Documentations</h2>
// //                 <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
// //                     <div className="flex items-center space-x-1">
// //                         <svg
// //                             xmlns="http://www.w3.org/2000/svg"
// //                             className="h-4 w-4 text-green-500"
// //                             fill="none"
// //                             viewBox="0 0 24 24"
// //                             stroke="currentColor"
// //                         >
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //                         </svg>
// //                         <span>Email</span>
// //                     </div>
// //                     <div className="flex items-center space-x-1">
// //                         <svg
// //                             xmlns="http://www.w3.org/2000/svg"
// //                             className="h-4 w-4 text-green-500"
// //                             fill="none"
// //                             viewBox="0 0 24 24"
// //                             stroke="currentColor"
// //                         >
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //                         </svg>
// //                         <span>Phone number</span>
// //                     </div>
// //                     <div className="flex items-center space-x-1">
// //                         <svg
// //                             xmlns="http://www.w3.org/2000/svg"
// //                             className="h-4 w-4 text-red-500"
// //                             fill="none"
// //                             viewBox="0 0 24 24"
// //                             stroke="currentColor"
// //                         >
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //                         </svg>
// //                         <span>Personal identity</span>
// //                     </div>
// //                     <div className="flex items-center space-x-1">
// //                         <svg
// //                             xmlns="http://www.w3.org/2000/svg"
// //                             className="h-4 w-4 text-red-500"
// //                             fill="none"
// //                             viewBox="0 0 24 24"
// //                             stroke="currentColor"
// //                         >
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //                         </svg>
// //                         <span>Payment method</span>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // const ProjectsContent: React.FC<ProjectsContentProps> = ({ projects, loading, error }) => {
// //     if (loading) {
// //         return <div>Loading Projects...</div>;
// //     }

// //     if (error) {
// //         return <div className="text-red-500">Error loading projects: {error}</div>;
// //     }

// //     if (!projects || !Array.isArray(projects) || projects.length === 0) { // Added Array.isArray check
// //         return <div className="mt-6 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-300">No projects data available.</div>;
// //     }

// //     return (
// //         <div className="mt-6 space-y-4">
// //             {projects.map((project, index) => (
// //                 <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
// //                     <h3 className="font-semibold text-gray-800 text-sm">{project.projectTitle}</h3>
// //                     <p className="text-gray-700 text-xs mt-2">{project.projectDescription}</p>
// //                     <div className="mt-4 font-semibold text-sm text-gray-800">{project.price}</div>
// //                 </div>
// //             ))}
// //         </div>
// //     );
// // };

// // const ServicesContent: React.FC<ServicesContentProps> = ({ services, loading, error }) => {
// //     if (loading) {
// //         return <div>Loading Services...</div>;
// //     }

// //     if (error) {
// //         return <div className="text-red-500">Error loading services: {error}</div>;
// //     }

// //     if (!services || !Array.isArray(services) || services.length === 0) { // Added Array.isArray check
// //         return <div className="mt-6 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-300">No services data available.</div>;
// //     }


// //     return (
// //         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
// //             {services.map((service, index) => (
// //                 <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
// //                     <img src={`/${service.thumbnail}`} alt={service.serviceTitle} className="w-full h-32 object-cover rounded-md mb-2"  onError={(e) => { e.currentTarget.src = 'placeholder-image-url.jpg'; }}/>
// //                     <h3 className="font-semibold text-gray-800 text-sm">{service.serviceTitle}</h3>
// //                     <p className="text-gray-700 text-xs mt-2">{service.serviceDescription}</p>
// //                     <div className="mt-2 font-semibold text-sm text-gray-800">{service.price}</div>
// //                 </div>
// //             ))}
// //         </div>
// //     );
// // };

// // const UserWorksContent: React.FC<UserWorksContentProps> = ({ userWorks, loading, error }) => {
// //     if (loading) {
// //         return <div>Loading User Gallery...</div>;
// //     }

// //     if (error) {
// //         return <div className="text-red-500">Error loading user gallery: {error}</div>;
// //     }

// //     if (!userWorks) {
// //         return <div className="mt-6 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-300">No works data available.</div>;
// //     }

// //     return (
// //         <div className="mt-6 grid grid-cols-2 gap-4">
// //             {userWorks && <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
// //                 <img src={`/${userWorks.thumbnail}`} alt={userWorks.workTitle} className="w-full h-32 object-cover rounded-md"  onError={(e) => { e.currentTarget.src = 'placeholder-image-url.jpg'; }}/>
// //                 <h3 className="font-semibold text-gray-800 text-sm mt-2">{userWorks.workTitle}</h3>
// //                 <p className="text-gray-600 text-xs mt-1">{userWorks.workDescription}</p>
// //             </div>}
// //         </div>
// //     );
// // };


// // const UserAccount: React.FC = () => {
// //     const [activeTab, setActiveTab] = useState('Profile');
// //     const [statisticData, setStatisticData] = useState<UserStatistics | null>(null);
// //     const [loadingStatistics, setLoadingStatistics] = useState<boolean>(true);
// //     const [statisticsError, setStatisticsError] = useState<string | null>(null);
// //     const [userData, setUserData] = useState<UserData | null>(null);
// //     const [loadingUserData, setLoadingUserData] = useState<boolean>(true);
// //     const [userDataError, setUserDataError] = useState<string | null>(null);
// //     const [userProjects, setUserProjects] = useState<UserProject[] | null>(null); // Initialize as null
// //     const [loadingProjects, setLoadingProjects] = useState<boolean>(false);
// //     const [projectsError, setProjectsError] = useState<string | null>(null);
// //     const [userServices, setUserServices] = useState<UserService[] | null>(null);
// //     const [loadingServices, setLoadingServices] = useState<boolean>(false);
// //     const [servicesError, setServicesError] = useState<string | null>(null);
// //     const [userWorks, setUserWorks] = useState<UserWork | null>(null); // State for user works

// //     useEffect(() => {
// //         const fetchUserDataFromApi = async () => {
// //             setLoadingUserData(true);
// //             setUserDataError(null);
// //             setLoadingStatistics(true);
// //             setStatisticsError(null);
// //             setLoadingProjects(true);
// //             setProjectsError(null);
// //             setLoadingServices(true);
// //             setServicesError(null);

// //             try {
// //                 const response = await axios.get<GetUserResponse>(`${process.env.REACT_APP_BACK_URL}/GetUser`, {
// //                     headers: {
// //                         Authorization: `Bearer ${localStorage.getItem("token")}`,
// //                     }
// //                 });
// //                 setUserData(response.data.user);
// //                 setStatisticData(response.data.user.user_statistics);
// //                 setUserProjects(response.data.user.user_projects);
// //                 setUserServices(response.data.user.user_services);
// //                 setUserWorks(response.data.user.user_works); // Set user works
// //                 setLoadingUserData(false);
// //                 setLoadingStatistics(false);
// //                 setLoadingProjects(false);
// //                 setLoadingServices(false);


// //             } catch (e: any) {
// //                 setUserDataError("Failed to load user data.");
// //                 console.error("Error fetching user data:", e);
// //                 setLoadingUserData(false);
// //                 setStatisticsError("Failed to load user statistics.");
// //                 setLoadingStatistics(false);
// //                 setProjectsError("Failed to load user projects.");
// //                 setLoadingProjects(false);
// //                 setServicesError("Failed to load user services.");
// //                 setLoadingServices(false);
// //             }
// //         };

// //         fetchUserDataFromApi();
// //     }, []);


// //     const handleTabClick = (tab: any) => {
// //         setActiveTab(tab);
// //     };

// //     const getUserRate = (): string => {
// //         const rate = statisticData?.ratings;
// //         if (rate === null || rate === undefined || isNaN(Number(rate))) {
// //             return '0';
// //         }
// //         return Number(rate).toFixed(1);
// //     };

// //     const userRate = getUserRate();


// //     return (
// //         <div className="mt-20 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex justify-center pt-10">
// //             <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-7xl mb-10 transform transition-all duration-300 hover:shadow-2xl">
// //                 <div className="flex items-center justify-center mb-6">
// //                     <h1 className="text-2xl font-semibold text-gray-800">User account</h1>

// //                 </div>
// //                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
// //                     {/* Left Section */}
// //                     <div className="space-y-6">
// //                         {/* My Account */}
// //                         <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
// //                             <div className="flex items-center justify-between mb-4">
// //                                 <div className="flex items-center space-x-2">
// //                                     <svg
// //                                         xmlns="http://www.w3.org/2000/svg"
// //                                         className="h-6 w-6 text-blue-500"
// //                                         fill="none"
// //                                         viewBox="0 0 24 24"
// //                                         stroke="currentColor"
// //                                     >
// //                                         <path
// //                                             strokeLinecap="round"
// //                                             strokeLinejoin="round"
// //                                             strokeWidth={2}
// //                                             d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
// //                                         />
// //                                     </svg>
// //                                     <h2 className="text-lg font-semibold text-gray-700">My account</h2>
// //                                 </div>
// //                                 <svg
// //                                     xmlns="http://www.w3.org/2000/svg"
// //                                     className="h-5 w-5 text-gray-500 hover:text-blue-500 cursor-pointer transition-colors duration-300"
// //                                     fill="none"
// //                                     viewBox="0 0 24 24"
// //                                     stroke="currentColor"
// //                                 >
// //                                     <path
// //                                         strokeLinecap="round"
// //                                         strokeLinejoin="round"
// //                                         strokeWidth={2}
// //                                         d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.535 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
// //                                     />
// //                                 </svg>
// //                             </div>
// //                             {loadingUserData ? (
// //                                 <div>Loading account info...</div>
// //                             ) : userDataError ? (
// //                                 <div className="text-red-500">Error loading account info.</div>
// //                             ) : userData ? (
// //                                 <div className="flex flex-col items-center mb-4">
// //                                     <div className="rounded-full bg-blue-50 w-20 h-20 flex items-center justify-center overflow-hidden">
// //                                         {userData.profilePhoto ? (
// //                                             <img
// //                                                 src={`http://127.0.0.1:8000/storage/${userData.profilePhoto}`}
// //                                                 alt="Profile"
// //                                                 className="w-full h-full object-cover"
// //                                                 onError={(e) => { e.currentTarget.src = 'placeholder-avatar.jpg'; }}
// //                                             />
// //                                         ) : (
// //                                             <svg
// //                                                 xmlns="http://www.w3.org/2000/svg"
// //                                                 className="h-12 w-12 text-blue-500"
// //                                                 fill="none"
// //                                                 viewBox="0 0 24 24"
// //                                                 stroke="currentColor"
// //                                             >
// //                                                 <path
// //                                                     strokeLinecap="round"
// //                                                     strokeLinejoin="round"
// //                                                     strokeWidth={2}
// //                                                     d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
// //                                                 />
// //                                             </svg>
// //                                         )}
// //                                     </div>
// //                                     <p className="mt-3 font-semibold text-gray-800">{`${userData.firstName} ${userData.lastName}`}</p>
// //                                     <div className="flex items-center space-x-1 text-sm text-gray-600">
// //                                         <svg
// //                                             xmlns="http://www.w3.org/2000/svg"
// //                                             className="h-4 w-4"
// //                                             fill="none"
// //                                             viewBox="0 0 24 24"
// //                                             stroke="currentColor"
// //                                         >
// //                                             <path
// //                                                 strokeLinecap="round"
// //                                                 strokeLinejoin="round"
// //                                                 strokeWidth={2}
// //                                                 d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m0 0l-7.89 5.26a2 2 0 01-2.22 0L3 8m0 0l7.89 5.26a2 2 0 002.22 0L21 8"
// //                                             />
// //                                         </svg>
// //                                         <span>{userData.role}, level <span className="font-semibold">New</span></span>
// //                                     </div>
// //                                     <div className="flex items-center space-x-1 text-sm text-gray-600">
// //                                         <svg
// //                                             xmlns="http://www.w3.org/2000/svg"
// //                                             className="h-4 w-4"
// //                                             fill="none"
// //                                             viewBox="0 0 24 24"
// //                                             stroke="currentColor"
// //                                         >
// //                                             <path
// //                                                 strokeLinecap="round"
// //                                                 strokeLinejoin="round"
// //                                                 strokeWidth={2}
// //                                                 d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
// //                                             />
// //                                         </svg>
// //                                         <span>{userData.Region || 'N/A'}</span> {/* Handle null Region */}
// //                                     </div>
// //                                     <p className="text-sm text-gray-600 text-center mt-1">
// //                                         {userData.user_data?.description || "No description provided."}
// //                                     </p>
// //                                 </div>
// //                             ) : null}

// //                             <div className="flex items-center justify-between">
// //                                 <p className="text-sm font-semibold text-gray-700">Rate:</p>
// //                                 <div className="flex items-center space-x-0.5">
// //                                     {[1, 2, 3, 4, 5].map((star) => (
// //                                         <svg
// //                                             key={star}
// //                                             xmlns="http://www.w3.org/2000/svg"
// //                                             className={`h-5 w-5 ${
// //                                                 star <= parseFloat(userRate) ? 'text-yellow-400' : 'text-gray-300'
// //                                                 }`}
// //                                             viewBox="0 0 20 20"
// //                                             fill="currentColor"
// //                                         >
// //                                             <path
// //                                                 fillRule="evenodd"
// //                                                 d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.172 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.296-1.584-.537-1.65l-4.752-.382-1.831-4.401z"
// //                                                 clipRule="evenodd"
// //                                             />
// //                                         </svg>
// //                                     ))}
// //                                     <span className="text-sm text-gray-700 ml-1">{userRate}</span>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                         {/* About me */}
// //                         <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
// //                             <h2 className="text-lg font-semibold text-gray-700 mb-2">About me</h2>
// //                             <p className="text-sm text-gray-600">
// //                                 {userData?.user_data?.description || "No about me information available."}
// //                             </p>
// //                         </div>
// //                         {/* My skills */}
// //                         <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
// //                             <h2 className="text-lg font-semibold text-gray-700 mb-2">My skills</h2>
// //                             <div className="grid grid-cols-3 gap-2">
// //                                 {userData?.user_data?.skillsOfWork?.map((skill, index) => (
// //                                     <span key={index} className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs flex items-center space-x-1">
// //                                         <img src="/photoshop.png" alt={skill} className="w-3 h-3"  onError={(e) => { e.currentTarget.src = 'placeholder-skill.jpg'; }}/>
// //                                         <span>{skill}</span>
// //                                     </span>
// //                                 )) || <span>No skills listed.</span>}
// //                             </div>
// //                         </div>
// //                     </div>

// //                     {/* Right Section */}
// //                     <div className="lg:col-span-3">
// //                         {/* Tabs */}
// //                         <div className="flex border-b">
// //                             <button
// //                                 className={`px-4 py-2 font-semibold text-sm ${activeTab === 'Profile' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
// //                                 onClick={() => handleTabClick('Profile')}
// //                             >
// //                                 Profile
// //                             </button>
// //                             <button
// //                                 className={`px-4 py-2 font-semibold text-sm ${activeTab === 'Projects' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
// //                                 onClick={() => handleTabClick('Projects')}
// //                             >
// //                                 Projects
// //                             </button>
// //                             <button
// //                                 className={`px-4 py-2 font-semibold text-sm ${activeTab === 'Services' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
// //                                 onClick={() => handleTabClick('Services')}
// //                             >
// //                                 Services
// //                             </button>
// //                             <button
// //                                 className={`px-4 py-2 font-semibold text-sm ${activeTab === 'UserWorks' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
// //                                 onClick={() => handleTabClick('UserWorks')}
// //                             >
// //                                 User Gallery
// //                             </button>
// //                         </div>

// //                         {/* Content based on active tab */}
// //                         {activeTab === 'Profile' && <ProfileContent
// //                             statisticData={statisticData}
// //                             loading={loadingStatistics}
// //                             error={statisticsError}
// //                         />}
// //                         {activeTab === 'Projects' && <ProjectsContent
// //                             projects={userProjects}
// //                             loading={loadingProjects}
// //                             error={projectsError}
// //                         />}
// //                         {activeTab === 'Services' && <ServicesContent
// //                             services={userServices}
// //                             loading={loadingServices}
// //                             error={servicesError}
// //                         />}
// //                         {activeTab === 'UserWorks' && <UserWorksContent
// //                             userWorks={userWorks}
// //                             loading={loadingUserData}
// //                             error={userDataError}
// //                         />}
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default UserAccount;










































// // // import React, { useState } from 'react';
// // // import { Mail, CreditCard, Building, Check, Menu } from 'lucide-react';

// // // type SettingTab = 'personal-profile' | 'privacy' | 'more';
// // // type SettingSection = 'account' | 'payment' | 'identity';

// // // interface SettingsProps {
// // //   userId?: number;
// // //   initialTab?: SettingTab;
// // // }

// // // const Settings: React.FC<SettingsProps> = ({ 
// // //   userId = 7, 
// // //   initialTab = 'personal-profile' 
// // // }) => {
// // //   const [activeTab, setActiveTab] = useState<SettingTab>(initialTab);
// // //   const [activeSection, setActiveSection] = useState<SettingSection>('account');
  
// // //   // Form state
// // //   const [accountType, setAccountType] = useState<'freelancer' | 'project-owner'>('freelancer');
// // //   const [specialization, setSpecialization] = useState('');
// // //   const [jobTitle, setJobTitle] = useState('');
// // //   const [biography, setBiography] = useState('Hello, I\'m Oliver Walter, a passionate HTML designer with a strong focus on creating intuitive and engaging digital experiences. With a background in both design and development, I specialize in translating complex business problems into seamless UI/UX solutions.\n\nI take a collaborative approach to understanding user needs and translating them into visually appealing and highly usable interfaces. I\'m passionate about creating responsive designs that not only look great but also provide exceptional user experiences that exceed client expectations.\n\nUsing a collaborative approach to every project, seeking closely with stakeholders to understand their goals so we can develop and fine-tune our solutions. Whether you\'re looking to revamp an existing website or create something entirely new from scratch, I can navigate the design process and create impact for your business.');
// // //   const [skills, setSkills] = useState(['Photoshop', 'Illustrator', 'Prototyping', 'Ideation', 'Wireframe']);
// // //   const [useProfilePicture, setUseProfilePicture] = useState(true);
  
// // //   // Mock user data
// // //   const userData = {
// // //     name: "Smith_AEB",
// // //     connections: 46,
// // //     followers: 53,
// // //     following: 120,
// // //     lastActive: "23h ago"
// // //   };

// // //   // Render different content based on active tab
// // //   const renderContent = () => {
// // //     if (activeTab === 'personal-profile') {
// // //       return (
// // //         <div className="bg-white rounded-lg p-6">
// // //           <h2 className="text-lg font-medium mb-4">Account type</h2>
// // //           <div className="flex gap-4 mb-6">
// // //             <label className="flex items-center gap-2">
// // //               <input 
// // //                 type="radio" 
// // //                 checked={accountType === 'freelancer'} 
// // //                 onChange={() => setAccountType('freelancer')}
// // //                 className="accent-orange-500" 
// // //               />
// // //               <span>Freelancer</span>
// // //             </label>
// // //             <label className="flex items-center gap-2">
// // //               <input 
// // //                 type="radio" 
// // //                 checked={accountType === 'project-owner'} 
// // //                 onChange={() => setAccountType('project-owner')}
// // //                 className="accent-orange-500" 
// // //               />
// // //               <span>Project owner</span>
// // //             </label>
// // //           </div>
          
// // //           <div className="grid grid-cols-2 gap-4 mb-6">
// // //             <div>
// // //               <label className="block text-sm font-medium mb-2">Specialization</label>
// // //               <select 
// // //                 className="w-full border border-gray-300 rounded p-2"
// // //                 value={specialization}
// // //                 onChange={(e) => setSpecialization(e.target.value)}
// // //               >
// // //                 <option value="">Select specialization</option>
// // //                 <option value="web-design">Web Design</option>
// // //                 <option value="ui-ux">UI/UX Design</option>
// // //                 <option value="graphic-design">Graphic Design</option>
// // //               </select>
// // //             </div>
// // //             <div>
// // //               <label className="block text-sm font-medium mb-2">Job title</label>
// // //               <input 
// // //                 type="text" 
// // //                 className="w-full border border-gray-300 rounded p-2"
// // //                 value={jobTitle}
// // //                 onChange={(e) => setJobTitle(e.target.value)}
// // //                 placeholder="Enter job title"
// // //               />
// // //             </div>
// // //           </div>
          
// // //           <div className="mb-6">
// // //             <label className="block text-sm font-medium mb-2">Biography</label>
// // //             <textarea 
// // //               className="w-full border border-gray-300 rounded p-2 h-48"
// // //               value={biography}
// // //               onChange={(e) => setBiography(e.target.value)}
// // //             />
// // //           </div>
          
// // //           <div className="mb-6">
// // //             <label className="block text-sm font-medium mb-2">Skills</label>
// // //             <div className="flex flex-wrap gap-2">
// // //               {skills.map((skill, index) => (
// // //                 <div key={index} className="bg-gray-100 text-sm rounded px-3 py-1 flex items-center gap-1">
// // //                   <span>{skill}</span>
// // //                   <button 
// // //                     className="text-xs"
// // //                     onClick={() => setSkills(skills.filter((_, i) => i !== index))}
// // //                   >
// // //                     ×
// // //                   </button>
// // //                 </div>
// // //               ))}
// // //               <input 
// // //                 type="text" 
// // //                 className="border border-gray-300 rounded px-2 py-1 text-sm"
// // //                 placeholder="Add skill"
// // //                 onKeyDown={(e) => {
// // //                   if (e.key === 'Enter' && e.currentTarget.value) {
// // //                     setSkills([...skills, e.currentTarget.value]);
// // //                     e.currentTarget.value = '';
// // //                   }
// // //                 }}
// // //               />
// // //             </div>
// // //           </div>
          
// // //           <button className="bg-orange-600 text-white px-4 py-2 rounded">Save</button>
// // //         </div>
// // //       );
// // //     } 
// // //     else if (activeTab === 'privacy') {
// // //       return (
// // //         <div className="bg-white rounded-lg p-6">
// // //           <h2 className="text-lg font-medium mb-4">Project owner</h2>
// // //           <div className="flex flex-col gap-3 mb-6">
// // //             <label className="flex items-center gap-2">
// // //               <input 
// // //                 type="checkbox" 
// // //                 checked={useProfilePicture} 
// // //                 onChange={() => setUseProfilePicture(!useProfilePicture)}
// // //                 className="accent-orange-500" 
// // //               />
// // //               <span>Hide profile picture</span>
// // //             </label>
// // //             <label className="flex items-center gap-2">
// // //               <input 
// // //                 type="checkbox" 
// // //                 className="accent-orange-500" 
// // //               />
// // //               <span>Hide profile</span>
// // //             </label>
// // //           </div>
          
// // //           <button className="bg-orange-600 text-white px-4 py-2 rounded">Save</button>
// // //         </div>
// // //       );
// // //     } 
// // //     else if (activeTab === 'more') {
// // //       return (
// // //         <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
// // //           <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2">
// // //             <CreditCard size={24} />
// // //             <span>Credit card</span>
// // //           </button>
// // //           <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2">
// // //             <Mail size={24} />
// // //             <span>Email</span>
// // //           </button>
// // //           <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2">
// // //             <Building size={24} />
// // //             <span>Bank accounts</span>
// // //           </button>
// // //           <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2">
// // //             <Check size={24} />
// // //             <span>Identity verification</span>
// // //           </button>
// // //         </div>
// // //       );
// // //     }
    
// // //     return null;
// // //   };

// // //   return (
// // //     <div className="max-w-6xl mx-auto p-4">
// // //       <h1 className="text-xl font-bold mb-6 text-center">Setting</h1>
      
// // //       <div className="flex flex-col md:flex-row gap-6">
// // //         {/* Sidebar */}
// // //         <div className="w-full md:w-64">
// // //           <div className="bg-white rounded-lg overflow-hidden">
// // //             <div className="p-3 bg-gray-100">
// // //               <span className="font-medium">Setting</span>
// // //             </div>
// // //             <div className="p-2">
// // //               <ul className="space-y-1">
// // //                 <li>
// // //                   <button 
// // //                     className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 ${activeTab === 'personal-profile' ? 'bg-orange-600 text-white' : ''}`}
// // //                     onClick={() => setActiveTab('personal-profile')}
// // //                   >
// // //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                       <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
// // //                       <circle cx="12" cy="7" r="4" />
// // //                     </svg>
// // //                     Personal profile
// // //                   </button>
// // //                 </li>
// // //                 <li>
// // //                   <button 
// // //                     className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 ${activeTab === 'privacy' ? 'bg-orange-600 text-white' : ''}`}
// // //                     onClick={() => setActiveTab('privacy')}
// // //                   >
// // //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                       <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
// // //                       <path d="M7 11V7a5 5 0 0 1 10 0v4" />
// // //                     </svg>
// // //                     Privacy
// // //                   </button>
// // //                 </li>
// // //                 <li>
// // //                   <button 
// // //                     className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 ${activeTab === 'more' ? 'bg-orange-600 text-white' : ''}`}
// // //                     onClick={() => setActiveTab('more')}
// // //                   >
// // //                     <Menu className="h-5 w-5" />
// // //                     More
// // //                   </button>
// // //                 </li>
// // //               </ul>
// // //             </div>
// // //           </div>
          
// // //           {/* User stats */}
// // //           <div className="bg-gray-800 text-white rounded-lg mt-4 p-3 hidden md:block">
// // //             <div className="flex items-center gap-2 mb-3">
// // //               <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm">
// // //                 {userData.name.charAt(0)}
// // //               </div>
// // //               <span>{userData.name}</span>
// // //             </div>
// // //             <div className="text-sm space-y-2">
// // //               <div className="flex items-center gap-2">
// // //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                   <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
// // //                   <circle cx="8.5" cy="7" r="4" />
// // //                   <path d="M20 8v6M23 11h-6" />
// // //                 </svg>
// // //                 <span>{userData.connections} Network</span>
// // //               </div>
// // //               <div className="flex items-center gap-2">
// // //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                   <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
// // //                   <circle cx="9" cy="7" r="4" />
// // //                   <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
// // //                 </svg>
// // //                 <span>{userData.followers} Followers</span>
// // //               </div>
// // //               <div className="flex items-center gap-2">
// // //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                   <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
// // //                   <circle cx="8.5" cy="7" r="4" />
// // //                   <line x1="18" y1="8" x2="23" y2="13" />
// // //                   <line x1="23" y1="8" x2="18" y2="13" />
// // //                 </svg>
// // //                 <span>{userData.following} Following</span>
// // //               </div>
// // //               <div className="flex items-center gap-2">
// // //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                   <circle cx="12" cy="12" r="10" />
// // //                   <polyline points="12 6 12 12 16 14" />
// // //                 </svg>
// // //                 <span>{userData.lastActive}</span>
// // //               </div>
// // //             </div>
            
// // //             <button className="mt-4 bg-orange-600 text-white px-3 py-1 rounded text-sm w-full">
// // //               HR account
// // //             </button>
// // //           </div>
// // //         </div>
        
// // //         {/* Main content */}
// // //         <div className="flex-1">
// // //           {renderContent()}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default UserAccount;

// // // // Example usage:
// // // // <Settings userId={7} initialTab="personal-profile" />




// import React, { useState, useEffect } from 'react';
// import { Mail, CreditCard, Building, Check, Menu } from 'lucide-react';
// import axios, { AxiosError } from 'axios'; // Import AxiosError
// import { Link } from 'react-router-dom';

// // Define types for API responses
// interface APIUserData {
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
//     type: string | null;
//     rate: string | null;
//     user_data: {
//         id: number;
//         userId: number;
//         specialist: string | null;
//         jobTitle: string | null;
//         description: string | null;
//         skillsOfWork: any;
//         created_at: string;
//         updated_at: string;
//     } | null;
//     user_works: any | null;
//     user_statistics: any | null;
//     user_services: any | null;
//     user_projects: any | null;
//     specialization?: string | null;
//     jobTitle?: string | null;
//     biography?: string | null;
//     skills?: string[] | null;
//     hideProfilePicture?: boolean;
// }

// interface GetUserResponse {
//     message: string;
//     user: APIUserData;
// }

// interface UpdateUserResponse {
//     message: string;
//     user: APIUserData;
// }

// interface ErrorResponse {
//     message: string;
// }

// type SettingTab = 'personal-profile' | 'privacy' | 'more';

// interface SettingsProps {
//     userId?: number;
//     initialTab?: SettingTab;
// }

// const UserAccount: React.FC<SettingsProps> = ({  initialTab = 'personal-profile' }) => {
//     const [activeTab, setActiveTab] = useState<SettingTab>(initialTab);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [isUpdating, setIsUpdating] = useState<boolean>(false);
//     const [userData, setUserData] = useState<APIUserData | null>(null);

//     const [accountType, setAccountType] = useState<string>('freelancer');
//     const [specialization, setSpecialization] = useState('');
//     const [jobTitle, setJobTitle] = useState('');
//     const [biography, setBiography] = useState('');
//     const [skills, setSkills] = useState<string[]>([]);
//     const [newSkill, setNewSkill] = useState('');
//     const [hideProfilePicture, setHideProfilePicture] = useState(false);
//     const [skillsUpdated, setSkillsUpdated] = useState(false);
//     const [lastAction, setLastAction] = useState<{type: string, skill: string} | null>(null);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const response = await axios.get<GetUserResponse>(`${process.env.REACT_APP_BACK_URL}/GetUser`, {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//                 });

//                 if (response.data.user) {
//                     const user = response.data.user;
//                     setUserData(user);
//                     setAccountType(user.accountType || 'freelancer');
//                     setSpecialization(user.user_data?.specialist || '');
//                     setJobTitle(user.user_data?.jobTitle || '');
//                     setBiography(user.user_data?.description || '');

//                     // Handle skillsOfWork parsing
//                     const skillsOfWorkAPI = user.user_data?.skillsOfWork;
//                     let parsedSkills: string[] = [];

//                     if (Array.isArray(skillsOfWorkAPI)) {
//                         parsedSkills = skillsOfWorkAPI.map(skill => String(skill));
//                     } else if (typeof skillsOfWorkAPI === 'string') {
//                         // Handle case where API returns JSON string
//                         try {
//                             const parsed = JSON.parse(skillsOfWorkAPI);
//                             if (Array.isArray(parsed)) {
//                                 parsedSkills = parsed.map(skill => String(skill));
//                             }
//                         } catch (e) {
//                             // If it's not valid JSON but a comma-separated string
//                             parsedSkills = skillsOfWorkAPI.split(',').map(s => s.trim()).filter(Boolean);
//                         }
//                     } else if (skillsOfWorkAPI && typeof skillsOfWorkAPI === 'object') {
//                         // Handle case where API returns an object
//                         parsedSkills = Object.values(skillsOfWorkAPI).map(skill => String(skill));
//                     }

//                     setSkills(parsedSkills);
//                     setHideProfilePicture(user.hideProfilePicture || false);
//                 } else {
//                     setError(response.data.message || 'Failed to load user data');
//                 }
//             } catch (err: any) {
//                 console.error('Error fetching user data:', err);
//                 let errorMessage = 'Error loading user data. Please try again later.';
//                 if (axios.isAxiosError<ErrorResponse>(err)) {
//                     errorMessage = err.response?.data?.message || errorMessage;
//                     setError(errorMessage);
//                 } else {
//                     setError(errorMessage);
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUserData();
//     }, []);

//     // Use functional updates with prevState
//     const handleAddSkill = () => {
//         if (newSkill.trim()) {
//             // Using prevState pattern for safer state updates
//             setSkills(prevSkills => {
//                 // Avoid adding duplicate skills
//                 if (!prevSkills.includes(newSkill.trim())) {
//                     // Show notification about the action
//                     setLastAction({type: 'added', skill: newSkill.trim()});
//                     setSkillsUpdated(true);

//                     // Clear the notification after 3 seconds
//                     setTimeout(() => {
//                         setLastAction(null);
//                     }, 3000);

//                     return [...prevSkills, newSkill.trim()];
//                 }
//                 return prevSkills;
//             });

//             setNewSkill('');
//         }
//     };

//     // Use functional updates with prevState
//     const handleRemoveSkill = (skillToRemove: string) => {
//         setSkills(prevSkills => {
//             const newSkills = prevSkills.filter(skill => skill !== skillToRemove);

//             // Show notification about the action
//             setLastAction({type: 'removed', skill: skillToRemove});
//             setSkillsUpdated(true);

//             // Clear the notification after 3 seconds
//             setTimeout(() => {
//                 setLastAction(null);
//             }, 3000);

//             return newSkills;
//         });
//     };

//     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === 'Enter') {
//             e.preventDefault();
//             handleAddSkill();
//         }
//     };

//     const handleSave = async () => {
//         if (loading || isUpdating) return;

//         setIsUpdating(true);
//         setError(null);

//         try {
//             const payload = {
//                 accountType,
//                 Region: userData?.Region || 'united-arab-emirates',
//                 Phone_number: userData?.Phone_number || '',
//                 Gender: userData?.Gender || 'mail',
//                 specialist: specialization,
//                 jobTitle,
//                 description: biography,
//                 hideProfilePicture,
//                 skillsOfWork: skills, // Send skills as an array
//             };

//             console.log("Update Payload:", payload);

//             const response = await axios.put<UpdateUserResponse>(
//                 `${process.env.REACT_APP_BACK_URL}/profileUpdate`,
//                 payload,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );

//             if (response.data.message === 'Profile updated successfully') {
//                 alert('Profile updated successfully!');
//                 setUserData(response.data.user);
//                 setSkillsUpdated(false); // Reset the skills updated flag
//             } else {
//                 setError(response.data.message || 'Failed to save settings.');
//             }
//         } catch (error: any) {
//             console.error('Error saving settings:', error);
//             let errorMessage = 'Error saving settings. Please try again later.';
//             if (axios.isAxiosError<ErrorResponse>(error)) {
//                 const axiosError = error as AxiosError<ErrorResponse>; // Type assertion for better type checking
//                 errorMessage = axiosError.response?.data?.message || errorMessage;
//                 setError(errorMessage);
//                 console.error("Detailed Error Response:", axiosError.response?.data);
//             } else {
//                 setError(errorMessage);
//             }
//             alert(errorMessage);
//         } finally {
//             setIsUpdating(false);
//         }
//     };

//     const renderContent = () => {
//         if (loading) return <div className="bg-white rounded-lg p-6 flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div></div>;
//         if (error) return <div className="bg-white rounded-lg p-6"><div className="text-red-500">{error}</div><button className="mt-4 bg-orange-600 text-white px-4 py-2 rounded" onClick={() => window.location.reload()}>Try Again</button></div>;

//         if (activeTab === 'personal-profile') {
//             return (
//                 <div className="bg-white rounded-lg p-6">
//                     <h2 className="text-lg font-medium mb-4">Personal Profile</h2>
//                     {/* Account Type */}
//                     <h3 className="text-md font-semibold mb-2">Account type</h3>
//                     <div className="flex gap-4 mb-4">
//                         <label className="flex items-center gap-2">
//                             <input
//                                 type="radio"
//                                 checked={accountType === 'freelacer'}
//                                 onChange={() => setAccountType('freelacer')}
//                                 className="accent-orange-500"
//                             />
//                             <span>Freelancer</span>
//                         </label>
//                         <label className="flex items-center gap-2">
//                             <input
//                                 type="radio"
//                                 checked={accountType === 'projectOwner'}
//                                 onChange={() => setAccountType('projectOwner')}
//                                 className="accent-orange-500"
//                             />
//                             <span>Project owner</span>
//                         </label>
//                     </div>
//                     {/* Specialization and Job Title */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                         <div>
//                             <label className="block text-sm font-medium mb-2">Specialization</label>
//                             <select
//                                 className="w-full border border-gray-300 rounded p-2"
//                                 value={specialization}
//                                 onChange={(e) => setSpecialization(e.target.value)}
//                             >
//                                 <option value="">Select specialization</option>
//                                 <option value="web-design">Web Design</option>
//                                 <option value="ui-ux">UI/UX Design</option>
//                                 <option value="graphic-design">Graphic Design</option>
//                                 <option value="frontend-development">Frontend Development</option>
//                                 <option value="backend-development">Backend Development</option>
//                                 <option value="fullstack-development">Fullstack Development</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium mb-2">Job title</label>
//                             <input
//                                 type="text"
//                                 className="w-full border border-gray-300 rounded p-2"
//                                 value={jobTitle}
//                                 onChange={(e) => setJobTitle(e.target.value)}
//                                 placeholder="Enter job title"
//                             />
//                         </div>
//                     </div>
//                     {/* Biography */}
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium mb-2">Biography</label>
//                         <textarea
//                             className="w-full border border-gray-300 rounded p-2 h-48"
//                             value={biography}
//                             onChange={(e) => setBiography(e.target.value)}
//                             placeholder="Tell us about yourself and your professional experience..."
//                         />
//                     </div>
//                     {/* Skills - Improved implementation with notifications */}
//                     <div className="mb-4">
//                         <div className="flex justify-between items-center mb-2">
//                             <label className="block text-sm font-medium">Skills</label>
//                             {skillsUpdated && (
//                                 <span className="text-sm text-orange-600 font-medium">
//                                     * Skills updated (not saved yet)
//                                 </span>
//                             )}
//                         </div>

//                         {/* Skills input with add button */}
//                         <div className="mb-2 flex items-center">
//                             <input
//                                 type="text"
//                                 className="flex-1 border border-gray-300 rounded-l p-2"
//                                 placeholder="Add a skill"
//                                 value={newSkill}
//                                 onChange={(e) => setNewSkill(e.target.value)}
//                                 onKeyDown={handleKeyDown}
//                             />
//                             <button
//                                 className="bg-orange-600 text-white px-4 py-2 rounded-r hover:bg-orange-700 transition-colors"
//                                 onClick={handleAddSkill}
//                                 type="button"
//                             >
//                                 Add
//                             </button>
//                         </div>

//                         {/* Action notification */}
//                         {lastAction && (
//                             <div className={`mb-2 px-3 py-2 rounded text-sm ${
//                                 lastAction.type === 'added' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                             }`}>
//                                 Skill "{lastAction.skill}" {lastAction.type === 'added' ? 'added' : 'removed'}
//                             </div>
//                         )}

//                         {/* Skills list */}
//                         <div className="flex flex-wrap gap-2 mt-2">
//                             {skills.length > 0 ? (
//                                 skills.map((skill, index) => (
//                                     <div key={index} className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-1 group hover:bg-gray-200 transition-colors">
//                                         <span>{skill}</span>
//                                         <button
//                                             type="button"
//                                             className="text-gray-400 group-hover:text-red-500 ml-1 font-bold transition-colors"
//                                             onClick={() => handleRemoveSkill(skill)}
//                                             aria-label={`Remove ${skill}`}
//                                         >
//                                             ×
//                                         </button>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p className="text-gray-500 text-sm">No skills added yet. Add skills that showcase your expertise.</p>
//                             )}
//                         </div>
//                     </div>
//                     {/* Save Button */}
//                     <button
//                         className={`text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors disabled:opacity-50 ${
//                             skillsUpdated ? 'bg-orange-500 animate-pulse' : 'bg-orange-600'
//                         }`}
//                         onClick={handleSave}
//                         disabled={loading || isUpdating}
//                     >
//                         {isUpdating ? 'Saving...' : skillsUpdated ? 'Save Changes' : 'Save'}
//                     </button>
//                 </div>
//             );
//         } else if (activeTab === 'privacy') {
//             return (
//                 <div className="bg-white rounded-lg p-6">
//                     <h2 className="text-lg font-medium mb-4">Privacy Settings</h2>
//                     <div className="flex flex-col gap-3 mb-6">
//                         <label className="flex items-center gap-2">
//                             <input
//                                 type="checkbox"
//                                 checked={hideProfilePicture}
//                                 onChange={() => setHideProfilePicture(!hideProfilePicture)}
//                                 className="accent-orange-500"
//                             />
//                             <span>Hide profile picture</span>
//                         </label>
//                         <label className="flex items-center gap-2">
//                             <input type="checkbox" className="accent-orange-500" />
//                             <span>Hide profile</span>
//                         </label>
//                     </div>
//                     <button
//                         className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors disabled:opacity-50"
//                         onClick={handleSave}
//                         disabled={loading || isUpdating}
//                     >
//                         {isUpdating ? 'Saving...' : 'Save'}
//                     </button>
//                 </div>
//             );
//         } else if (activeTab === 'more') {
//             return (
//                 <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
//                     <Link to="/react/CreditCard">
//                     <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
//                         <CreditCard size={24} />
//                         <span>Credit card</span>
//                     </button>
//                     </Link>

//                     <Link to='/react/Email'>
//                     <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
//                         <Mail size={24} />
//                         <span>Email</span>
//                     </button>
//                     </Link>
//                     <Link to='/react/BankAccounts'>
//                     <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
//                         <Building size={24} />
//                         <span>Bank accounts</span>
//                     </button>
//                     </Link>
//                     <Link to='/react/IdentityVerification'>
//                     <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
//                         <Check size={24} />
//                         <span>Identity verification</span>
//                     </button>
//                     </Link>
//                 </div>
//             );
//         }
//         return null;
//     };

//     return (
//         <div className="m-32 max-w-6xl mx-auto py-10">
//             <h1 className="text-xl font-bold mb-6 text-center">Setting</h1>
//             <div className="flex flex-col md:flex-row gap-6">
//                 <div className="w-full md:w-64">
//                     <div className="bg-white rounded-lg overflow-hidden">
//                         <div className="p-3 bg-gray-100">
//                             <span className="font-medium">Setting</span>
//                         </div>
//                         <div className="p-2">
//                             <ul className="space-y-1">
//                                 <li>
//                                     <button
//                                         className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition-colors ${activeTab === 'personal-profile' ? 'bg-orange-600 text-white' : 'hover:bg-gray-100'}`}
//                                         onClick={() => setActiveTab('personal-profile')}
//                                     >
//                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//                                             <circle cx="12" cy="7" r="4" />
//                                         </svg>
//                                         Personal profile
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button
//                                         className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition-colors ${activeTab === 'privacy' ? 'bg-orange-600 text-white' : 'hover:bg-gray-100'}`}
//                                         onClick={() => setActiveTab('privacy')}
//                                     >
//                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                             <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
//                                             <path d="M7 11V7a5 5 0 0 1 10 0v4" />
//                                         </svg>
//                                         Privacy
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button
//                                         className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition-colors ${activeTab === 'more' ? 'bg-orange-600 text-white' : 'hover:bg-gray-100'}`}
//                                         onClick={() => setActiveTab('more')}
//                                     >
//                                         <Menu className="h-5 w-5" />
//                                         More
//                                     </button>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="flex-1">{renderContent()}</div>
//             </div>
//         </div>
//     );
// };

// export default UserAccount;



import React, { useState, useEffect } from 'react';
import { Mail, CreditCard, Building, Check, Menu } from 'lucide-react';
import axios, { AxiosError } from 'axios'; // Import AxiosError
import { Link } from 'react-router-dom';

// Define types for API responses
interface APIUserData {
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
    type: string | null;
    rate: string | null;
    user_data: {
        id: number;
        userId: number;
        specialist: string | null;
        jobTitle: string | null;
        description: string | null;
        skillsOfWork: any;
        created_at: string;
        updated_at: string;
    } | null;
    user_works: any | null;
    user_statistics: any | null;
    user_services: any | null;
    user_projects: any | null;
    specialization?: string | null;
    jobTitle?: string | null;
    biography?: string | null;
    skills?: string[] | null;
    hideProfilePicture?: boolean;
}

interface GetUserResponse {
    message: string;
    user: APIUserData;
}

interface UpdateUserResponse {
    message: string;
    user: APIUserData;
}

interface ErrorResponse {
    message: string;
}

type SettingTab = 'personal-profile' | 'privacy' | 'more';

interface SettingsProps {
    userId?: number;
    initialTab?: SettingTab;
}


const translations = {
    en: {
        "Setting": "Setting",
        "Personal profile": "Personal profile",
        "Privacy": "Privacy",
        "More": "More",
        "Loading account settings...": "Loading account settings...",
        "Error loading settings": "Error loading settings",
        "Try Again": "Try Again",
        "Personal Profile": "Personal Profile",
        "Account type": "Account type",
        "Freelancer": "Freelancer",
        "Project owner": "Project owner",
        "Specialization": "Specialization",
        "Select specialization": "Select specialization",
        "Web Design": "Web Design",
        "UI/UX Design": "UI/UX Design",
        "Graphic Design": "Graphic Design",
        "Frontend Development": "Frontend Development",
        "Backend Development": "Backend Development",
        "Fullstack Development": "Fullstack Development",
        "Job title": "Job title",
        "Enter job title": "Enter job title",
        "Biography": "Biography",
        "Tell us about yourself and your professional experience...": "Tell us about yourself and your professional experience...",
        "Skills": "Skills",
        "* Skills updated (not saved yet)": "* Skills updated (not saved yet)",
        "Add a skill": "Add a skill",
        "Add": "Add",
        'Skill "': 'Skill "',
        '" added': '" added',
        '" removed': '" removed',
        "No skills added yet. Add skills that showcase your expertise.": "No skills added yet. Add skills that showcase your expertise.",
        "Saving...": "Saving...",
        "Save Changes": "Save Changes",
        "Save": "Save",
        "Privacy Settings": "Privacy Settings",
        "Hide profile picture": "Hide profile picture",
        "Hide profile": "Hide profile",
        "Credit card": "Credit card",
        "Email": "Email",
        "Bank accounts": "Bank accounts",
        "Identity verification": "Identity verification",
    },
    ar: {
        "Setting": "إعدادات",
        "Personal profile": "الملف الشخصي",
        "Privacy": "الخصوصية",
        "More": "المزيد",
        "Loading account settings...": "جاري تحميل إعدادات الحساب...",
        "Error loading settings": "خطأ في تحميل الإعدادات",
        "Try Again": "حاول مرة أخرى",
        "Personal Profile": "الملف الشخصي",
        "Account type": "نوع الحساب",
        "Freelancer": "مستقل",
        "Project owner": "صاحب مشروع",
        "Specialization": "التخصص",
        "Select specialization": "اختر تخصص",
        "Web Design": "تصميم ويب",
        "UI/UX Design": "تصميم واجهة المستخدم وتجربة المستخدم",
        "Graphic Design": "تصميم جرافيك",
        "Frontend Development": "تطوير الواجهة الأمامية",
        "Backend Development": "تطوير الواجهة الخلفية",
        "Fullstack Development": "تطوير الويب الشامل",
        "Job title": "المسمى الوظيفي",
        "Enter job title": "أدخل المسمى الوظيفي",
        "Biography": "السيرة الذاتية",
        "Tell us about yourself and your professional experience...": "أخبرنا عن نفسك وخبراتك المهنية...",
        "Skills": "مهارات",
        "* Skills updated (not saved yet)": "* تم تحديث المهارات (لم يتم الحفظ بعد)",
        "Add a skill": "أضف مهارة",
        "Add": "أضف",
        'Skill "': 'مهارة "',
        '" added': '" تمت إضافتها',
        '" removed': '" تمت إزالتها',
        "No skills added yet. Add skills that showcase your expertise.": "لم يتم إضافة مهارات بعد. أضف مهارات تبرز خبرتك.",
        "Saving...": "جاري الحفظ...",
        "Save Changes": "حفظ التغييرات",
        "Save": "حفظ",
        "Privacy Settings": "إعدادات الخصوصية",
        "Hide profile picture": "إخفاء صورة الملف الشخصي",
        "Hide profile": "إخفاء الملف الشخصي",
        "Credit card": "بطاقة الائتمان",
        "Email": "البريد الإلكتروني",
        "Bank accounts": "حسابات بنكية",
        "Identity verification": "التحقق من الهوية",
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};


const UserAccount: React.FC<SettingsProps> = ({  initialTab = 'personal-profile' }) => {
    const [activeTab, setActiveTab] = useState<SettingTab>(initialTab);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [userData, setUserData] = useState<APIUserData | null>(null);

    const [accountType, setAccountType] = useState<string>('freelancer');
    const [specialization, setSpecialization] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [biography, setBiography] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [newSkill, setNewSkill] = useState('');
    const [hideProfilePicture, setHideProfilePicture] = useState(false);
    const [skillsUpdated, setSkillsUpdated] = useState(false);
    const [lastAction, setLastAction] = useState<{type: string, skill: string} | null>(null);
    const [language, setLanguage] = useState<'en' | 'ar'>(
        (localStorage.getItem('language') as 'ar' | 'en') || 'en'
    );

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage === 'ar' || storedLanguage === 'en') {
            setLanguage(storedLanguage as 'ar' | 'en');
        } else {
            setLanguage('en');
        }
    }, []);

    // const toggleLanguage = () => {
    //     const newLanguage = language === 'en' ? 'ar' : 'en';
    //     setLanguage(newLanguage);
    //     localStorage.setItem('language', newLanguage);
    // };


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get<GetUserResponse>(`${process.env.REACT_APP_BACK_URL}/GetUser`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });

                if (response.data.user) {
                    const user = response.data.user;
                    setUserData(user);
                    setAccountType(user.accountType || 'freelancer');
                    setSpecialization(user.user_data?.specialist || '');
                    setJobTitle(user.user_data?.jobTitle || '');
                    setBiography(user.user_data?.description || '');

                    // Handle skillsOfWork parsing
                    const skillsOfWorkAPI = user.user_data?.skillsOfWork;
                    let parsedSkills: string[] = [];

                    if (Array.isArray(skillsOfWorkAPI)) {
                        parsedSkills = skillsOfWorkAPI.map(skill => String(skill));
                    } else if (typeof skillsOfWorkAPI === 'string') {
                        // Handle case where API returns JSON string
                        try {
                            const parsed = JSON.parse(skillsOfWorkAPI);
                            if (Array.isArray(parsed)) {
                                parsedSkills = parsed.map(skill => String(skill));
                            }
                        } catch (e) {
                            // If it's not valid JSON but a comma-separated string
                            parsedSkills = skillsOfWorkAPI.split(',').map(s => s.trim()).filter(Boolean);
                        }
                    } else if (skillsOfWorkAPI && typeof skillsOfWorkAPI === 'object') {
                        // Handle case where API returns an object
                        parsedSkills = Object.values(skillsOfWorkAPI).map(skill => String(skill));
                    }

                    setSkills(parsedSkills);
                    setHideProfilePicture(user.hideProfilePicture || false);
                } else {
                    setError(response.data.message || translate('Failed to load user data', language));
                }
            } catch (err: any) {
                console.error('Error fetching user data:', err);
                let errorMessage = translate('Error loading user data. Please try again later.', language);
                if (axios.isAxiosError<ErrorResponse>(err)) {
                    errorMessage = err.response?.data?.message || errorMessage;
                    setError(errorMessage);
                } else {
                    setError(errorMessage);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [language]);

    // Use functional updates with prevState
    const handleAddSkill = () => {
        if (newSkill.trim()) {
            // Using prevState pattern for safer state updates
            setSkills(prevSkills => {
                // Avoid adding duplicate skills
                if (!prevSkills.includes(newSkill.trim())) {
                    // Show notification about the action
                    setLastAction({type: 'added', skill: newSkill.trim()});
                    setSkillsUpdated(true);

                    // Clear the notification after 3 seconds
                    setTimeout(() => {
                        setLastAction(null);
                    }, 3000);

                    return [...prevSkills, newSkill.trim()];
                }
                return prevSkills;
            });

            setNewSkill('');
        }
    };

    // Use functional updates with prevState
    const handleRemoveSkill = (skillToRemove: string) => {
        setSkills(prevSkills => {
            const newSkills = prevSkills.filter(skill => skill !== skillToRemove);

            // Show notification about the action
            setLastAction({type: 'removed', skill: skillToRemove});
            setSkillsUpdated(true);

            // Clear the notification after 3 seconds
            setTimeout(() => {
                setLastAction(null);
            }, 3000);

            return newSkills;
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddSkill();
        }
    };

    const handleSave = async () => {
        if (loading || isUpdating) return;

        setIsUpdating(true);
        setError(null);

        try {
            const payload = {
                accountType,
                Region: userData?.Region || 'united-arab-emirates',
                Phone_number: userData?.Phone_number || '',
                Gender: userData?.Gender || 'mail',
                specialist: specialization,
                jobTitle,
                description: biography,
                hideProfilePicture,
                skillsOfWork: skills, // Send skills as an array
            };

            console.log("Update Payload:", payload);

            const response = await axios.put<UpdateUserResponse>(
                `${process.env.REACT_APP_BACK_URL}/profileUpdate`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.message === 'Profile updated successfully') {
                alert(translate('Profile updated successfully!', language));
                setUserData(response.data.user);
                setSkillsUpdated(false); // Reset the skills updated flag
            } else {
                setError(response.data.message || translate('Failed to save settings.', language));
            }
        } catch (error: any) {
            console.error('Error saving settings:', error);
            let errorMessage = translate('Error saving settings. Please try again later.', language);
            if (axios.isAxiosError<ErrorResponse>(error)) {
                const axiosError = error as AxiosError<ErrorResponse>; // Type assertion for better type checking
                errorMessage = axiosError.response?.data?.message || errorMessage;
                setError(errorMessage);
                console.error("Detailed Error Response:", axiosError.response?.data);
            } else {
                setError(errorMessage);
            }
            alert(errorMessage);
        } finally {
            setIsUpdating(false);
        }
    };

    const renderContent = () => {
        if (loading) return <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="bg-white rounded-lg p-6 flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div></div>;
        if (error) return <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="bg-white rounded-lg p-6"><div className="text-red-500">{error}</div><button className="mt-4 bg-orange-600 text-white px-4 py-2 rounded" onClick={() => window.location.reload()}>{translate("Try Again", language)}</button></div>;

        if (activeTab === 'personal-profile') {
            return (
                <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="bg-white rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">{translate("Personal Profile", language)}</h2>
                    {/* Account Type */}
                    <h3 className="text-md font-semibold mb-2">{translate("Account type", language)}</h3>
                    <div className="flex gap-4 mb-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                checked={accountType === 'freelacer'}
                                onChange={() => setAccountType('freelacer')}
                                className="accent-orange-500"
                            />
                            <span>{translate("Freelancer", language)}</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                checked={accountType === 'projectOwner'}
                                onChange={() => setAccountType('projectOwner')}
                                className="accent-orange-500"
                            />
                            <span>{translate("Project owner", language)}</span>
                        </label>
                    </div>
                    {/* Specialization and Job Title */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">{translate("Specialization", language)}</label>
                            <select
                                className="w-full border border-gray-300 rounded p-2"
                                value={specialization}
                                onChange={(e) => setSpecialization(e.target.value)}
                            >
                                <option value="">{translate("Select specialization", language)}</option>
                                <option value="web-design">{translate("Web Design", language)}</option>
                                <option value="ui-ux">{translate("UI/UX Design", language)}</option>
                                <option value="graphic-design">{translate("Graphic Design", language)}</option>
                                <option value="frontend-development">{translate("Frontend Development", language)}</option>
                                <option value="backend-development">{translate("Backend Development", language)}</option>
                                <option value="fullstack-development">{translate("Fullstack Development", language)}</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">{translate("Job title", language)}</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded p-2"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                placeholder={translate("Enter job title", language)}
                            />
                        </div>
                    </div>
                    {/* Biography */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">{translate("Biography", language)}</label>
                        <textarea
                            className="w-full border border-gray-300 rounded p-2 h-48"
                            value={biography}
                            onChange={(e) => setBiography(e.target.value)}
                            placeholder={translate("Tell us about yourself and your professional experience...", language)}
                        />
                    </div>
                    {/* Skills - Improved implementation with notifications */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium">{translate("Skills", language)}</label>
                            {skillsUpdated && (
                                <span className="text-sm text-orange-600 font-medium">
                                    {translate("* Skills updated (not saved yet)", language)}
                                </span>
                            )}
                        </div>

                        {/* Skills input with add button */}
                        <div className="mb-2 flex items-center">
                            <input
                                type="text"
                                className="flex-1 border border-gray-300 rounded-l p-2"
                                placeholder={translate("Add a skill", language)}
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button
                                className="bg-orange-600 text-white px-4 py-2 rounded-r hover:bg-orange-700 transition-colors"
                                onClick={handleAddSkill}
                                type="button"
                            >
                                {translate("Add", language)}
                            </button>
                        </div>

                        {/* Action notification */}
                        {lastAction && (
                            <div className={`mb-2 px-3 py-2 rounded text-sm ${
                                lastAction.type === 'added' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {translate('Skill "', language)}"{lastAction.skill}" {translate(lastAction.type === 'added' ? '" added' : '" removed', language)}
                            </div>
                        )}

                        {/* Skills list */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {skills.length > 0 ? (
                                skills.map((skill, index) => (
                                    <div key={index} className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-1 group hover:bg-gray-200 transition-colors">
                                        <span>{skill}</span>
                                        <button
                                            type="button"
                                            className="text-gray-400 group-hover:text-red-500 ml-1 font-bold transition-colors"
                                            onClick={() => handleRemoveSkill(skill)}
                                            aria-label={`Remove ${skill}`}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">{translate("No skills added yet. Add skills that showcase your expertise.", language)}</p>
                            )}
                        </div>
                    </div>
                    {/* Save Button */}
                    <button
                        className={`text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors disabled:opacity-50 ${
                            skillsUpdated ? 'bg-orange-500 animate-pulse' : 'bg-orange-600'
                        }`}
                        onClick={handleSave}
                        disabled={loading || isUpdating}
                    >
                        {isUpdating ? translate("Saving...", language) : skillsUpdated ? translate("Save Changes", language) : translate("Save", language)}
                    </button>
                </div>
            );
        } else if (activeTab === 'privacy') {
            return (
                <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="bg-white rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">{translate("Privacy Settings", language)}</h2>
                    <div className="flex flex-col gap-3 mb-6">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={hideProfilePicture}
                                onChange={() => setHideProfilePicture(!hideProfilePicture)}
                                className="accent-orange-500"
                            />
                            <span>{translate("Hide profile picture", language)}</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="accent-orange-500" />
                            <span>{translate("Hide profile", language)}</span>
                        </label>
                    </div>
                    <button
                        className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors disabled:opacity-50"
                        onClick={handleSave}
                        disabled={loading || isUpdating}
                    >
                        {isUpdating ? translate("Saving...", language) : translate("Save", language)}
                    </button>
                </div>
            );
        } else if (activeTab === 'more') {
            return (
                <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3">
                    <Link to="/react/CreditCard">
                    <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
                        <CreditCard size={24} />
                        <span>{translate("Credit card", language)}</span>
                    </button>
                    </Link>

                    <Link to='/react/Email'>
                    <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
                        <Mail size={24} />
                        <span>{translate("Email", language)}</span>
                    </button>
                    </Link>
                    <Link to='/react/BankAccounts'>
                    <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
                        <Building size={24} />
                        <span>{translate("Bank accounts", language)}</span>
                    </button>
                    </Link>
                    <Link to='/react/IdentityVerification'>
                    <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
                        <Check size={24} />
                        <span>{translate("Identity verification", language)}</span>
                    </button>
                    </Link>
                </div>
            );
        }
        return null;
    };

    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="m-4 md:m-32 max-w-6xl mx-auto py-10 font-sans">
            <h1 className="text-xl font-bold mb-6 text-center">{translate("Setting", language)}</h1>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-64">
                    <div className="bg-white rounded-lg overflow-hidden">
                        <div className="p-3 bg-gray-100">
                            <span className="font-medium">{translate("Setting", language)}</span>
                        </div>
                        <div className="p-2">
                            <ul className="space-y-1">
                                <li>
                                    <button
                                        className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition-colors ${activeTab === 'personal-profile' ? 'bg-orange-600 text-white' : 'hover:bg-gray-100'}`}
                                        onClick={() => setActiveTab('personal-profile')}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                        {translate("Personal profile", language)}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition-colors ${activeTab === 'privacy' ? 'bg-orange-600 text-white' : 'hover:bg-gray-100'}`}
                                        onClick={() => setActiveTab('privacy')}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                        {translate("Privacy", language)}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition-colors ${activeTab === 'more' ? 'bg-orange-600 text-white' : 'hover:bg-gray-100'}`}
                                        onClick={() => setActiveTab('more')}
                                    >
                                        <Menu className="h-5 w-5" />
                                        {translate("More", language)}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex-1">{renderContent()}</div>
            </div>
        </div>
    );
};

export default UserAccount;