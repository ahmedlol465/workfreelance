// import React, { useState, useEffect, memo } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// // Interfaces for API Data (Keep these as they are)
// interface User {
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
//   type: string | null;
//   rate: string | null;
// }

// interface BalanceData {
//   id: number;
//   user_id: number;
//   total_balance: string;
//   pending_balance: string;
//   available_balance: string;
//   withdrawal_balance: string;
//   created_at: string;
//   updated_at: string;
//   user: User;
// }

// interface BalanceResponse {
//   success: boolean;
//   data: BalanceData;
// }

// interface StatusCounts {
//   [status: string]: { count: number; percentage: number };
// }

// interface StatusCountsResponse {
//   data: StatusCounts;
//   user: User;
// }

// // Skeleton Components
// const MyAccountSkeleton = () => (
//   <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-pulse">
//     <div className="flex items-center justify-between mb-4">
//       <div className="flex items-center space-x-2">
//         <div className="rounded-full bg-gray-300 h-6 w-6"></div>
//         <div className="bg-gray-300 h-5 w-32 rounded-md"></div>
//       </div>
//       <div className="rounded-full bg-gray-300 h-5 w-5"></div>
//     </div>
//     <div className="flex flex-col items-center mb-4">
//       <div className="rounded-full bg-gray-300 w-20 h-20"></div>
//       <div className="bg-gray-300 h-4 w-40 rounded-md mt-3"></div>
//       <div className="bg-gray-300 h-3 w-48 rounded-md mt-2"></div>
//       <div className="bg-gray-300 h-3 w-56 rounded-md mt-2"></div>
//     </div>
//     <div className="flex items-center justify-between">
//       <div className="bg-gray-300 h-3 w-24 rounded-md"></div>
//       <div className="flex items-center space-x-0.5">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <div key={star} className="rounded-full bg-gray-300 h-5 w-5"></div>
//         ))}
//       </div>
//     </div>
//     <div className="bg-gray-300 h-3 w-32 rounded-md mt-2"></div>
//   </div>
// );

// const MyBalanceSkeleton = () => (
//   <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300 animate-pulse">
//     <div className="flex items-center space-x-2 mb-4">
//       <div className="rounded-full bg-gray-300 h-6 w-6"></div>
//       <div className="bg-gray-300 h-5 w-32 rounded-md"></div>
//     </div>
//     <div className="grid grid-cols-2 gap-4 mb-4">
//       <div>
//         <div className="bg-gray-300 h-6 w-24 rounded-md mb-1"></div>
//         <div className="bg-gray-300 h-3 w-32 rounded-md"></div>
//       </div>
//       <div>
//         <div className="bg-gray-300 h-6 w-24 rounded-md mb-1"></div>
//         <div className="bg-gray-300 h-3 w-32 rounded-md"></div>
//       </div>
//     </div>
//     <div className="grid grid-cols-2 gap-4">
//       <div>
//         <div className="bg-gray-300 h-3 w-40 rounded-md"></div>
//       </div>
//       <div>
//         <div className="bg-gray-300 h-3 w-40 rounded-md"></div>
//       </div>
//     </div>
//   </div>
// );

// const StatusSectionSkeleton = ({ title }: { title: string }) => (
//   <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300 animate-pulse">
//     <div className="flex items-center justify-between mb-4">
//       <div className="flex items-center space-x-2">
//         <div className="rounded-full bg-gray-300 h-6 w-6"></div>
//         <div className="bg-gray-300 h-5 w-32 rounded-md"></div>
//       </div>
//       <div className="rounded-md bg-gray-300 h-6 w-20"></div>
//     </div>
//     <div className="grid grid-cols-1 gap-4">
//       {Array(4).fill(0).map((_, index) => (
//         <div key={index}>
//           <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
//             <div className="bg-gray-300 h-3 w-24 rounded-md"></div>
//             <div className="bg-gray-300 h-3 w-12 rounded-md"></div>
//           </div>
//           <div className="bg-gray-200 rounded-full h-2.5 mb-3">
//             <div className="bg-gray-300 h-2.5 rounded-full w-1/2"></div>
//           </div>
//         </div>
//       ))}
//       <div>{title}</div>
//     </div>
//   </div>
// );


// const ControlPanel: React.FC = memo(() => {
//   const [balanceData, setBalanceData] = useState<BalanceData | null>(null);
//   const [projectStatusData, setProjectStatusData] =
//     useState<StatusCounts | null>(null);
//   const [serviceStatusData, setServiceStatusData] =
//     useState<StatusCounts | null>(null);
//   const [purchaseStatusData, setPurchaseStatusData] =
//     useState<StatusCounts | null>(null);
//   const [userData, setUserData] = useState<User | null>(null);

//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const authToken = localStorage.getItem("token");
//         if (!authToken) {
//           setError("Authentication token not found.");
//           setLoading(false);
//           return;
//         }

//         console.log("Auth Token:", authToken);

//         const [
//           balanceResponse,
//           projectStatusResponse,
//           serviceStatusResponse,
//           purchaseStatusResponse,
//         ] = await Promise.all([
//           axios.get<BalanceResponse>(
//             `${process.env.REACT_APP_BACK_URL}/user-balances`,
//             { headers: { Authorization: `Bearer ${authToken}` } }
//           ),
//           axios.get<StatusCountsResponse>(
//             `${process.env.REACT_APP_BACK_URL}/projects/status-counts`,
//             { headers: { Authorization: `Bearer ${authToken}` } }
//           ),
//           axios.get<StatusCountsResponse>(
//             `${process.env.REACT_APP_BACK_URL}/services/status-counts`,
//             { headers: { Authorization: `Bearer ${authToken}` } }
//           ),
//           axios.get<StatusCountsResponse>(
//             `${process.env.REACT_APP_BACK_URL}/purchases/status-counts`,
//             { headers: { Authorization: `Bearer ${authToken}` } }
//           ),
//         ]);

//         setBalanceData(balanceResponse.data.data);
//         setProjectStatusData(projectStatusResponse.data.data);
//         setServiceStatusData(serviceStatusResponse.data.data);
//         setPurchaseStatusData(purchaseStatusResponse.data.data);
//         setUserData(projectStatusResponse.data.user);
//       } catch (error) {
//         setError(
//           "Failed to load control panel data. Please ensure you are logged in."
//         );
//         console.error("Error fetching control panel data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center pt-10 bg-[#F8F9FA]">
//         <h1 className=" text-3xl font-bold mb-8 text-gray-800 ">
//           Control Panel
//         </h1>
//         <div className="p-16 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen gap-32 flex justify-center items-start py-10">
//           <div className="w-[500px]">
//             <MyAccountSkeleton />
//             <div className="my-10"><StatusSectionSkeleton title="Steps to Complete the Account" /></div>
//             <StatusSectionSkeleton title="Work Link for Companies" />
//           </div>
//           <div className=" rounded-xl shadow-lg p-8 w-full max-w-4xl transform transition-all duration-300 hover:shadow-2xl">
//             <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
//               <MyBalanceSkeleton />
//               <StatusSectionSkeleton title="My Projects" />
//               <div className="flex gap-12">
//                 <div className="w-full"><StatusSectionSkeleton title="My Services" /></div>
//                 <div className="w-full"><StatusSectionSkeleton title="My Purchase" /></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="flex justify-center pt-10 bg-[#F8F9FA] text-red-500">Error: {error}</div>;
//   }

//   const totalBalance = balanceData?.total_balance || "0.00";
//   const availableBalance = balanceData?.available_balance || "0.00";
//   const withdrawalBalance = balanceData?.withdrawal_balance || "0.00";
//   const pendingBalance = balanceData?.pending_balance || "0.00";

//   const userName = userData?.firstName ? `${userData.firstName} ${userData.lastName}` : "User Name";
//   const accountLevel = "New";
//   const userRate = userData?.rate || "0";

//   const renderStatusSection = (
//     title: string,
//     statusData: StatusCounts | null,
//     addButtonText: React.ReactNode,
//     iconSVG: JSX.Element,
//     colorClassGetter: (status: string) => string
//   ) => {
//     if (!statusData) return <div>No status data available for {title}</div>;

//     const statusItems = Object.entries(statusData).map(([status, data]) => ({
//       label: status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
//       percentage: data.percentage,
//       count: data.count,
//       colorClass: colorClassGetter(status),
//     }));

//     const totalCount = Object.values(statusData).reduce((sum, data) => sum + data.count, 0);

//     return (
//       <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-2">
//             {iconSVG}
//             <h2 className="text-lg font-semibold text-gray-700">
//               {title} <span className="text-gray-500">({totalCount})</span>
//             </h2>
//           </div>
//           {addButtonText && (
//             <Link to="/react/AddProjectForm">

//             <button
//               className={`bg-${addButtonText === "Add project" ? "orange" : "blue"}-500 text-white text-sm rounded-lg px-3 py-1.5 hover:bg-${addButtonText === "Add project" ? "orange" : "blue"}-600 focus:outline-none transition-colors duration-300`}
//             >
//               {addButtonText}
//             </button>
//               </Link>
//           )}
//         </div>
//         <div className="grid grid-cols-1 gap-4">
//           {statusItems.map((item, index) => (
//             <div key={index}>
//               <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
//                 <span>{item.label}</span>
//                 <span>{item.percentage}%</span>
//               </div>
//               <div className="bg-gray-200 rounded-full h-2.5 mb-3">
//                 <div
//                   className={`${item.colorClass} h-2.5 rounded-full`}
//                   style={{ width: `${item.percentage}%` }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const getProjectColorClass = (status: string) => {
//     switch (status) {
//       case "draft":
//         return "bg-orange-500";
//       case "completed":
//       case "closed":
//         return "bg-green-500";
//       case "canceled":
//       case "rejected":
//         return "bg-red-500";
//       default:
//         return "bg-orange-500";
//     }
//   };

//   const getServiceColorClass = (status: string) => {
//     switch (status) {
//       case "sent":
//         return "bg-blue-500";
//       case "opened":
//         return "bg-blue-500";
//       case "completed":
//         return "bg-green-500";
//       case "canceled":
//         return "bg-red-500";
//       default:
//         return "bg-blue-500";
//     }
//   };

//   const getPurchaseColorClass = (status: string) => {
//     switch (status) {
//       case "awaiting_seller_approval":
//         return "bg-yellow-500";
//       case "in_progress":
//         return "bg-blue-500";
//       case "completed":
//         return "bg-green-500";
//       case "canceled":
//         return "bg-red-500";
//       default:
//         return "bg-yellow-500";
//     }
//   };

//   const hasAddedFirstProject = projectStatusData && Object.values(projectStatusData).reduce((sum, data) => sum + data.count, 0) > 0;
//   const isAddProjectChecked = userData?.accountType === 'freelacer' || hasAddedFirstProject;
//   const displayRate = userRate === null || userRate === '0' ? '0' : userRate;
//   const starRating = displayRate === '0' ? 0 : 4;
// console.log("userData.profilePhoto",userData?.profilePhoto);


//   return (
//     <>
//       <div className="flex justify-center pt-10 bg-[#F8F9FA]">
//         <h1 className=" text-3xl font-bold mb-8 text-gray-800 ">
//           Control Panel
//         </h1>
//       </div>

//       <div className="p-16 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen gap-32 flex justify-center items-start py-10">
//         <div className="w-[500px] ">
//           {/* My Account */}
//           {loading ? <MyAccountSkeleton /> : (
//             <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
//               {/* ... My Account content ... (same as before, but use userData, userName, userRate, etc.) */}
//                <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center space-x-2">
//                   {userData?.profilePhoto ?(
//                     <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M20.5807 9.33333C20.5807 11.8646 18.5287 13.9167 15.9974 13.9167V15.4167C19.3571 15.4167 22.0807 12.6931 22.0807 9.33333H20.5807ZM15.9974 13.9167C13.4661 13.9167 11.4141 11.8646 11.4141 9.33333H9.91406C9.91406 12.6931 12.6377 15.4167 15.9974 15.4167V13.9167ZM11.4141 9.33333C11.4141 6.80203 13.4661 4.75 15.9974 4.75V3.25C12.6377 3.25 9.91406 5.9736 9.91406 9.33333H11.4141ZM15.9974 4.75C18.5287 4.75 20.5807 6.80203 20.5807 9.33333H22.0807C22.0807 5.9736 19.3571 3.25 15.9974 3.25V4.75ZM24.5807 23.3333C24.5807 24.1849 23.8709 25.1577 22.2616 25.9623C20.6972 26.7446 18.4835 27.25 15.9974 27.25V28.75C18.6659 28.75 21.1189 28.2108 22.9325 27.304C24.7012 26.4196 26.0807 25.0591 26.0807 23.3333H24.5807ZM15.9974 27.25C13.5113 27.25 11.2976 26.7446 9.73314 25.9623C8.12387 25.1577 7.41406 24.1849 7.41406 23.3333H5.91406C5.91406 25.0591 7.29359 26.4196 9.06232 27.304C10.8759 28.2108 13.3289 28.75 15.9974 28.75V27.25ZM7.41406 23.3333C7.41406 22.4818 8.12387 21.509 9.73314 20.7043C11.2976 19.9221 13.5113 19.4167 15.9974 19.4167V17.9167C13.3289 17.9167 10.8759 18.4559 9.06232 19.3627C7.29359 20.247 5.91406 21.6075 5.91406 23.3333H7.41406ZM15.9974 19.4167C18.4835 19.4167 20.6972 19.9221 22.2616 20.7043C23.8709 21.509 24.5807 22.4818 24.5807 23.3333H26.0807C26.0807 21.6075 24.7012 20.247 22.9325 19.3627C21.1189 18.4559 18.6659 17.9167 15.9974 17.9167V19.4167Z" fill="#151515"/>
//                     </svg>

//                   ) : (
//                     <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-blue-500"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                     />
//                   </svg>
//                   )}

//                   <h2 className="text-lg font-semibold text-gray-700">
//                     My Account
//                   </h2>
//                 </div>
//                 <Link to="/react/EditAccountPage">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-gray-500 hover:text-blue-500 cursor-pointer transition-colors duration-300"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.535 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
//                   />
//                 </svg>
//                 </Link>
//               </div>
//               <div className="flex flex-col items-center mb-4">
//                 <div className="rounded-full bg-blue-50 w-20 h-20 flex items-center justify-center">
//                   {userData?.profilePhoto ? (
//                     <img
//                       src={`http://127.0.0.1:8000/storage/${userData.profilePhoto}`}
//                       alt="Profile"
//                       className="rounded-full w-20 h-20 object-cover"
//                     />
//                   ) : (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-12 w-12 text-blue-500"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                   )}
//                 </div>
//                 <p className="mt-3 font-semibold text-gray-800">{userName}</p>
//                 <div className="flex items-center space-x-1 text-sm text-gray-600">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m0 0l-7.89 5.26a2 2 0 01-2.22 0L3 8m0 0l7.89 5.26a2 2 0 002.22 0L21 8"
//                     />
//                   </svg>
//                   <span>
//                     Freelancer, Level <span className="font-semibold">{accountLevel}</span>
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-600 text-center mt-1">
//                   Programming, website and application development
//                 </p>
//               </div>
//               <div className="flex items-center justify-between">
//                 <p className="text-sm font-semibold text-gray-700">Rate:</p>
//                 <div className="flex items-center space-x-0.5">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <svg
//                       key={star}
//                       xmlns="http://www.w3.org/2000/svg"
//                       className={`h-5 w-5 ${star <= starRating ? "text-yellow-400" : "text-gray-300"}`}
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.172 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.296-1.584-.537-1.65l-4.752-.382-1.831-4.401z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   ))}
//                   <span className="text-sm text-gray-700 ml-1">{starRating}.0</span>
//                 </div>
//               </div>
//               <p className="text-sm  text-gray-700">My Rate: {displayRate}$</p>
//             </div>
//           )}


//           {/* Steps to complete the account */}
//           {loading ? <StatusSectionSkeleton title="Steps to Complete the Account" /> : (
//              <div className="bg-white my-10 border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
//                 {/* ... Steps to complete account content ... (same as before) */}
//                 <h2 className="text-lg font-semibold text-gray-700 mb-4">
//                   Steps to Complete the Account
//                 </h2>
//                 <div className="flex items-center space-x-2 mb-3">
//                   <div className={`w-5 h-5 rounded-full border-2  flex items-center justify-center ${isAddProjectChecked ? 'border-green-500' : 'border-gray-300'}`}>
//                     {isAddProjectChecked && <div className="w-3 h-3 bg-green-500 rounded-full" />}
//                   </div>
//                   <span className="text-sm text-gray-700">
//                     Add your first project
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center" />
//                   <span className="text-sm text-gray-700">
//                     Confirm mobile number
//                   </span>
//                 </div>
//               </div>
//           )}


//           {/* Work link for Companies */}
//           {loading ? <StatusSectionSkeleton title="Work Link for Companies" /> : (
//             <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
//               {/* ... Work link for companies content ... (same as before) */}
//                <div className="flex items-center space-x-2 mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 text-purple-500"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14-10H3m14 0h-5v5m5 0v-5z"
//                   />
//                 </svg>
//                 <h2 className="text-lg font-semibold text-gray-700">
//                   Work Link for Companies
//                 </h2>
//               </div>
//               <p className="text-sm text-gray-600 mb-4">
//                 A solution tailored for companies and organizations that helps
//                 them grow their business by simplifying the process of hiring
//                 freelancers through a system that allows colleagues to add company
//                 members (with members of anyone else) to assist in marketing or
//                 sales and communicate with freelancers according to specific
//                 permissions.
//               </p>
//               <button className="bg-transparent hover:bg-gray-100 text-purple-500 border border-purple-500 hover:border-transparent rounded-lg px-4 py-2 text-sm focus:outline-none transition-colors duration-300">
//                 Know more
//               </button>
//             </div>
//           )}
//         </div>
//         <div className=" rounded-xl shadow-lg p-8 w-full max-w-4xl transform transition-all duration-300 hover:shadow-2xl">
//           <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
//             {/* My Balance */}
//             {loading ? <MyBalanceSkeleton /> : (
//               <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
//                 {/* ... My Balance content ... (same as before, using balanceData) */}
//                  <div className="flex items-center space-x-2 mb-4">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-green-500"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-2m-5 8v-4m0 0H9m0 0L9 18m0-4l3 3m-3-3l-3-3"
//                     />
//                   </svg>
//                   <h2 className="text-lg font-semibold text-gray-700">
//                     My Balance
//                   </h2>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <p className="text-2xl font-bold text-green-600">
//                       {totalBalance} $
//                     </p>
//                     <p className="text-sm text-gray-600">Total balance</p>
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold text-green-600">
//                       {availableBalance} $
//                     </p>
//                     <p className="text-sm text-gray-600">Available balance</p>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-sm text-gray-600">
//                       Withdrawable balance <span className="font-semibold">{withdrawalBalance} $</span>
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600">
//                       Pending balance <span className="font-semibold">{pendingBalance} $</span>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}


//             {/* My Projects Section - Dynamic */}
//             {loading ? <StatusSectionSkeleton title="My Projects" /> : renderStatusSection(
//               "My Projects",
//               projectStatusData,
//               <Link to="/react/AddProjectForm">
//               Add project
//                     </Link>,
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 text-orange-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
//                 />
//               </svg>,
//               getProjectColorClass
//             )}


//             <div className="flex gap-12">
//               {/* My Services Section - Dynamic */}
//               {loading ? <StatusSectionSkeleton title="My Services" /> : (
//                 <div className="w-full">
//                   {renderStatusSection(
//                     "My Services",
//                     serviceStatusData,
//                     <Link to="/react/AddServiceForm">
//                     Add
//                     </Link>,
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-blue-500"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
//                       />
//                     </svg>,
//                     getServiceColorClass
//                   )}
//                 </div>
//               )}


//               {/* My Purchase Section - Dynamic */}
//               {loading ? <StatusSectionSkeleton title="My Purchase" /> : (
//                 <div className="w-full">
//                   {renderStatusSection(
//                     "My Purchase",
//                     purchaseStatusData,
//                     null,
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-yellow-500"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                       />
//                     </svg>,
//                     getPurchaseColorClass
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// });

// export default ControlPanel;





import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';

// Interfaces for API Data (Keep these as they are)
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
    type: string | null;
    rate: string | null;
}

interface BalanceData {
    id: number;
    user_id: number;
    total_balance: string;
    pending_balance: string;
    available_balance: string;
    withdrawal_balance: string;
    created_at: string;
    updated_at: string;
    user: User;
}

interface BalanceResponse {
    success: boolean;
    data: BalanceData;
}

interface StatusCounts {
    [status: string]: { count: number; percentage: number };
}

interface StatusCountsResponse {
    data: StatusCounts;
    user: User;
}

// Skeleton Components (Keep these as they are, no text to translate)
const MyAccountSkeleton = () => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-pulse">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
                <div className="rounded-full bg-gray-300 h-6 w-6"></div>
                <div className="bg-gray-300 h-5 w-32 rounded-md"></div>
            </div>
            <div className="rounded-full bg-gray-300 h-5 w-5"></div>
        </div>
        <div className="flex flex-col items-center mb-4">
            <div className="rounded-full bg-gray-300 w-20 h-20"></div>
            <div className="bg-gray-300 h-4 w-40 rounded-md mt-3"></div>
            <div className="bg-gray-300 h-3 w-48 rounded-md mt-2"></div>
            <div className="bg-gray-300 h-3 w-56 rounded-md mt-2"></div>
        </div>
        <div className="flex items-center justify-between">
            <div className="bg-gray-300 h-3 w-24 rounded-md"></div>
            <div className="flex items-center space-x-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="rounded-full bg-gray-300 h-5 w-5"></div>
                ))}
            </div>
        </div>
        <div className="bg-gray-300 h-3 w-32 rounded-md mt-2"></div>
    </div>
);

const MyBalanceSkeleton = () => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300 animate-pulse">
        <div className="flex items-center space-x-2 mb-4">
            <div className="rounded-full bg-gray-300 h-6 w-6"></div>
            <div className="bg-gray-300 h-5 w-32 rounded-md"></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
                <div className="bg-gray-300 h-6 w-24 rounded-md mb-1"></div>
                <div className="bg-gray-300 h-3 w-32 rounded-md"></div>
            </div>
            <div>
                <div className="bg-gray-300 h-6 w-24 rounded-md mb-1"></div>
                <div className="bg-gray-300 h-3 w-32 rounded-md"></div>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <div className="bg-gray-300 h-3 w-40 rounded-md"></div>
            </div>
            <div>
                <div className="bg-gray-300 h-3 w-40 rounded-md"></div>
            </div>
        </div>
    </div>
);

const StatusSectionSkeleton = ({ title }: { title: string }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300 animate-pulse">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
                <div className="rounded-full bg-gray-300 h-6 w-6"></div>
                <div className="bg-gray-300 h-5 w-32 rounded-md"></div>
            </div>
            <div className="rounded-md bg-gray-300 h-6 w-20"></div>
        </div>
        <div className="grid grid-cols-1 gap-4">
            {Array(4).fill(0).map((_, index) => (
                <div key={index}>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <div className="bg-gray-300 h-3 w-24 rounded-md"></div>
                        <div className="bg-gray-300 h-3 w-12 rounded-md"></div>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2.5 mb-3">
                        <div className="bg-gray-300 h-2.5 rounded-full w-1/2"></div>
                    </div>
                </div>
            ))}
            <div>{title}</div>
        </div>
    </div>
);

const translations = {
    en: {
        "Control Panel": "Control Panel",
        "Error: ": "Error: ",
        "Authentication token not found.": "Authentication token not found.",
        "Failed to load control panel data. Please ensure you are logged in.": "Failed to load control panel data. Please ensure you are logged in.",
        "My Account": "My Account",
        "Edit": "Edit",
        "Freelancer, Level ": "Freelancer, Level ",
        "Programming, website and application development": "Programming, website and application development",
        "Rate:": "Rate:",
        "My Rate: ": "My Rate: ",
        "Steps to Complete the Account": "Steps to Complete the Account",
        "Add your first project": "Add your first project",
        "Confirm mobile number": "Confirm mobile number",
        "Work Link for Companies": "Work Link for Companies",
        "A solution tailored for companies and organizations that helps them grow their business by simplifying the process of hiring freelancers through a system that allows colleagues to add company members (with members of anyone else) to assist in marketing or sales and communicate with freelancers according to specific permissions.": "A solution tailored for companies and organizations that helps them grow their business by simplifying the process of hiring freelancers through a system that allows colleagues to add company members (with members of anyone else) to assist in marketing or sales and communicate with freelancers according to specific permissions.",
        "Know more": "Know more",
        "My Balance": "My Balance",
        "Total balance": "Total balance",
        "Available balance": "Available balance",
        "Withdrawable balance ": "Withdrawable balance ",
        "Pending balance ": "Pending balance ",
        "My Projects": "My Projects",
        "Add project": "Add project",
        "My Services": "My Services",
        "Add": "Add",
        "My Purchase": "My Purchase",
        "draft": "Draft",
        "completed": "Completed",
        "closed": "Closed",
        "canceled": "Canceled",
        "rejected": "Rejected",
        "sent": "Sent",
        "opened": "Opened",
        "awaiting_seller_approval": "Awaiting Seller Approval",
        "in_progress": "In Progress",
        "No status data available for ": "No status data available for ",
    },
    ar: {
        "Control Panel": "لوحة التحكم",
        "Error: ": "خطأ: ",
        "Authentication token not found.": "رمز التحقق غير موجود.",
        "Failed to load control panel data. Please ensure you are logged in.": "فشل في تحميل بيانات لوحة التحكم. يرجى التأكد من تسجيل الدخول.",
        "My Account": "حسابي",
        "Edit": "تعديل",
        "Freelancer, Level ": "مستقل، المستوى ",
        "Programming, website and application development": "برمجة، تطوير مواقع الويب والتطبيقات",
        "Rate:": "المعدل:",
        "My Rate: ": "معدلي: ",
        "Steps to Complete the Account": "خطوات إكمال الحساب",
        "Add your first project": "أضف مشروعك الأول",
        "Confirm mobile number": "تأكيد رقم الهاتف المحمول",
        "Work Link for Companies": "رابط العمل للشركات",
        "A solution tailored for companies and organizations that helps them grow their business by simplifying the process of hiring freelancers through a system that allows colleagues to add company members (with members of anyone else) to assist in marketing or sales and communicate with freelancers according to specific permissions.": "حل مصمم خصيصًا للشركات والمؤسسات التي تساعدها على تنمية أعمالها من خلال تبسيط عملية توظيف المستقلين من خلال نظام يسمح للزملاء بإضافة أعضاء الشركة (مع أعضاء من أي شخص آخر) للمساعدة في التسويق أو المبيعات والتواصل مع المستقلين وفقًا لأذونات محددة.",
        "Know more": "اعرف المزيد",
        "My Balance": "رصيدي",
        "Total balance": "الرصيد الكلي",
        "Available balance": "الرصيد المتاح",
        "Withdrawable balance ": "الرصيد القابل للسحب ",
        "Pending balance ": "الرصيد المعلق ",
        "My Projects": "مشاريعي",
        "Add project": "إضافة مشروع",
        "My Services": "خدماتي",
        "Add": "إضافة",
        "My Purchase": "مشترياتي",
        "draft": "مسودة",
        "completed": "مكتمل",
        "closed": "مغلق",
        "canceled": "ملغي",
        "rejected": "مرفوض",
        "sent": "مرسل",
        "opened": "مفتوح",
        "awaiting_seller_approval": "في انتظار موافقة البائع",
        "in_progress": "قيد التقدم",
        "No status data available for ": "لا توجد بيانات حالة متاحة لـ ",
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};


const ControlPanel: React.FC = memo(() => {
    const [balanceData, setBalanceData] = useState<BalanceData | null>(null);
    const [projectStatusData, setProjectStatusData] =
        useState<StatusCounts | null>(null);
    const [serviceStatusData, setServiceStatusData] =
        useState<StatusCounts | null>(null);
    const [purchaseStatusData, setPurchaseStatusData] =
        useState<StatusCounts | null>(null);
    const [userData, setUserData] = useState<User | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [language, setLanguage] = useState<'en' | 'ar'>(
        localStorage.getItem('language') === 'ar' ? 'ar' : 'en'
    );

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage === 'ar' || storedLanguage === 'en') {
            setLanguage(storedLanguage);
        } else {
            setLanguage('en'); // Default to English if no language is set
        }
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const authToken = localStorage.getItem("token");
                if (!authToken) {
                    setError(translate("Authentication token not found.", language));
                    setLoading(false);
                    return;
                }

                console.log("Auth Token:", authToken);

                const [
                    balanceResponse,
                    projectStatusResponse,
                    serviceStatusResponse,
                    purchaseStatusResponse,
                ] = await Promise.all([
                    axios.get<BalanceResponse>(
                        `${process.env.REACT_APP_BACK_URL}/user-balances`,
                        { headers: { Authorization: `Bearer ${authToken}` } }
                    ),
                    axios.get<StatusCountsResponse>(
                        `${process.env.REACT_APP_BACK_URL}/projects/status-counts`,
                        { headers: { Authorization: `Bearer ${authToken}` } }
                    ),
                    axios.get<StatusCountsResponse>(
                        `${process.env.REACT_APP_BACK_URL}/services/status-counts`,
                        { headers: { Authorization: `Bearer ${authToken}` } }
                    ),
                    axios.get<StatusCountsResponse>(
                        `${process.env.REACT_APP_BACK_URL}/purchases/status-counts`,
                        { headers: { Authorization: `Bearer ${authToken}` } }
                    ),
                ]);

                setBalanceData(balanceResponse.data.data);
                setProjectStatusData(projectStatusResponse.data.data);
                setServiceStatusData(serviceStatusResponse.data.data);
                setPurchaseStatusData(purchaseStatusResponse.data.data);
                setUserData(projectStatusResponse.data.user);
            } catch (error) {
                setError(translate("Failed to load control panel data. Please ensure you are logged in.", language));
                console.error("Error fetching control panel data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [language]);

    if (loading) {
        return (
            <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="flex justify-center pt-10 bg-[#F8F9FA]">
                <h1 className=" text-3xl font-bold mb-8 text-gray-800 ">{translate("Control Panel", language)}</h1>
                <div className="p-6 md:p-16 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen gap-8 md:gap-32 flex flex-col md:flex-row justify-center items-start py-10">
                    <div className="w-full max-w-md">
                        <MyAccountSkeleton />
                        <div className="my-6 md:my-10"><StatusSectionSkeleton title={translate("Steps to Complete the Account", language)} /></div>
                        <StatusSectionSkeleton title={translate("Work Link for Companies", language)} />
                    </div>
                    <div className="rounded-xl shadow-lg p-6 md:p-8 w-full max-w-4xl transform transition-all duration-300 hover:shadow-2xl">
                        <div className="grid grid-cols-1 gap-6">
                            <MyBalanceSkeleton />
                            <StatusSectionSkeleton title={translate("My Projects", language)} />
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-full"><StatusSectionSkeleton title={translate("My Services", language)} /></div>
                                <div className="w-full"><StatusSectionSkeleton title={translate("My Purchase", language)} /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="flex justify-center pt-10 bg-[#F8F9FA] text-red-500">{translate("Error: ", language)} {error}</div>;
    }

    const totalBalance = balanceData?.total_balance || "0.00";
    const availableBalance = balanceData?.available_balance || "0.00";
    const withdrawalBalance = balanceData?.withdrawal_balance || "0.00";
    const pendingBalance = balanceData?.pending_balance || "0.00";

    const userName = userData?.firstName ? `${userData.firstName} ${userData.lastName}` : "User Name";
    const accountLevel = "New";
    const userRate = userData?.rate || "0";

    const renderStatusSection = (
        title: string,
        statusData: StatusCounts | null,
        addButton: React.ReactNode,
        iconSVG: JSX.Element,
        colorClassGetter: (status: string) => string
    ) => {
        if (!statusData) return <div>{translate("No status data available for ", language)} {title}</div>;

        const statusItems = Object.entries(statusData).map(([status, data]) => ({
            label: translate(status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()), language), // Translate status labels
            percentage: data.percentage,
            count: data.count,
            colorClass: colorClassGetter(status),
        }));

        const totalCount = Object.values(statusData).reduce((sum, data) => sum + data.count, 0);

        return (
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        {iconSVG}
                        <h2 className="text-lg font-semibold text-gray-700">
                            {title} <span className="text-gray-500">({totalCount})</span>
                        </h2>
                    </div>
                    {addButton}
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {statusItems.map((item, index) => (
                        <div key={index}>
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                <span>{item.label}</span>
                                <span>{item.percentage}%</span>
                            </div>
                            <div className="bg-gray-200 rounded-full h-2.5 mb-3">
                                <div
                                    className={`${item.colorClass} h-2.5 rounded-full`}
                                    style={{ width: `${item.percentage}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const getProjectColorClass = (status: string) => {
        switch (status) {
            case "draft":
                return "bg-orange-500";
            case "completed":
            case "closed":
                return "bg-green-500";
            case "canceled":
            case "rejected":
                return "bg-red-500";
            default:
                return "bg-orange-500";
        }
    };

    const getServiceColorClass = (status: string) => {
        switch (status) {
            case "sent":
                return "bg-blue-500";
            case "opened":
                return "bg-blue-500";
            case "completed":
                return "bg-green-500";
            case "canceled":
                return "bg-red-500";
            default:
                return "bg-blue-500";
        }
    };

    const getPurchaseColorClass = (status: string) => {
        switch (status) {
            case "awaiting_seller_approval":
                return "bg-yellow-500";
            case "in_progress":
                return "bg-blue-500";
            case "completed":
                return "bg-green-500";
            case "canceled":
                return "bg-red-500";
            default:
                return "bg-yellow-500";
        }
    };

    const hasAddedFirstProject = projectStatusData && Object.values(projectStatusData).reduce((sum, data) => sum + data.count, 0) > 0;
    const isAddProjectChecked = userData?.accountType === 'freelacer' || hasAddedFirstProject;
    const displayRate = userRate === null || userRate === '0' ? '0' : userRate;
    const starRating = displayRate === '0' ? 0 : 4;


    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="bg-[#F8F9FA]">
            <div className="flex justify-center pt-10 ">
                <h1 className=" text-3xl font-bold mb-8 text-gray-800 ">{translate("Control Panel", language)}</h1>
            </div>

            <div className="p-6 md:p-16 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen gap-8 md:gap-32 flex flex-col md:flex-row justify-center items-start py-10">
                <div className="w-full max-w-md ">
                    {/* My Account */}
                    {loading ? <MyAccountSkeleton /> : (
                        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    {userData?.profilePhoto ? (
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.5807 9.33333C20.5807 11.8646 18.5287 13.9167 15.9974 13.9167V15.4167C19.3571 15.4167 22.0807 12.6931 22.0807 9.33333H20.5807ZM15.9974 13.9167C13.4661 13.9167 11.4141 11.8646 11.4141 9.33333H9.91406C9.91406 12.6931 12.6377 15.4167 15.9974 15.4167V13.9167ZM11.4141 9.33333C11.4141 6.80203 13.4661 4.75 15.9974 4.75V3.25C12.6377 3.25 9.91406 5.9736 9.91406 9.33333H11.4141ZM15.9974 4.75C18.5287 4.75 20.5807 6.80203 20.5807 9.33333H22.0807C22.0807 5.9736 19.3571 3.25 15.9974 3.25V4.75ZM24.5807 23.3333C24.5807 24.1849 23.8709 25.1577 22.2616 25.9623C20.6972 26.7446 18.4835 27.25 15.9974 27.25V28.75C18.6659 28.75 21.1189 28.2108 22.9325 27.304C24.7012 26.4196 26.0807 25.0591 26.0807 23.3333H24.5807ZM15.9974 27.25C13.5113 27.25 11.2976 26.7446 9.73314 25.9623C8.12387 25.1577 7.41406 24.1849 7.41406 23.3333H5.91406C5.91406 25.0591 7.29359 26.4196 9.06232 27.304C10.8759 28.2108 13.3289 28.75 15.9974 28.75V27.25ZM7.41406 23.3333C7.41406 22.4818 8.12387 21.509 9.73314 20.7043C11.2976 19.9221 13.5113 19.4167 15.9974 19.4167V17.9167C13.3289 17.9167 10.8759 18.4559 9.06232 19.3627C7.29359 20.247 5.91406 21.6075 5.91406 23.3333H7.41406ZM15.9974 19.4167C18.4835 19.4167 20.6972 19.9221 22.2616 20.7043C23.8709 21.509 24.5807 22.4818 24.5807 23.3333H26.0807C26.0807 21.6075 24.7012 20.247 22.9325 19.3627C21.1189 18.4559 18.6659 17.9167 15.9974 17.9167V19.4167Z" fill="#151515" />
                                        </svg>

                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-blue-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    )}

                                    <h2 className="text-lg font-semibold text-gray-700">
                                        {translate("My Account", language)}
                                    </h2>
                                </div>
                                <Link to="/react/EditAccountPage" className=" hover:text-blue-500 transition-colors duration-300">
                                    <FaEdit className="h-5 w-5 text-gray-500" />
                                </Link>
                            </div>
                            <div className="flex flex-col items-center mb-4">
                                <div className="rounded-full bg-blue-50 w-20 h-20 flex items-center justify-center">
                                    {userData?.profilePhoto ? (
                                        <img
                                            src={`http://127.0.0.1:8000/storage/${userData.profilePhoto}`}
                                            alt="Profile"
                                            className="rounded-full w-20 h-20 object-cover"
                                        />
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-12 w-12 text-blue-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    )}
                                </div>
                                <p className="mt-3 font-semibold text-gray-800">{userName}</p>
                                <div className="flex items-center space-x-1 text-sm text-gray-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m0 0l-7.89 5.26a2 2 0 01-2.22 0L3 8m0 0l7.89 5.26a2 2 0 002.22 0L21 8"
                                        />
                                    </svg>
                                    <span>
                                        {translate("Freelancer, Level ", language)}<span className="font-semibold">{accountLevel}</span>
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 text-center mt-1">
                                    {translate("Programming, website and application development", language)}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-gray-700">{translate("Rate:", language)}</p>
                                <div className="flex items-center space-x-0.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-5 w-5 ${star <= starRating ? "text-yellow-400" : "text-gray-300"}`}
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.172 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.296-1.584-.537-1.65l-4.752-.382-1.831-4.401z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ))}
                                    <span className="text-sm text-gray-700 ml-1">{starRating}.0</span>
                                </div>
                            </div>
                            <p className="text-sm  text-gray-700">{translate("My Rate: ", language)}{displayRate}$</p>
                        </div>
                    )}


                    {/* Steps to complete the account */}
                    {loading ? <StatusSectionSkeleton title={translate("Steps to Complete the Account", language)} /> : (
                        <div className="bg-white my-6 md:my-10 border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                {translate("Steps to Complete the Account", language)}
                            </h2>
                            <div className="flex items-center space-x-2 mb-3">
                                <div className={`w-5 h-5 rounded-full border-2  flex items-center justify-center ${isAddProjectChecked ? 'border-green-500' : 'border-gray-300'}`}>
                                    {isAddProjectChecked && <div className="w-3 h-3 bg-green-500 rounded-full" />}
                                </div>
                                <span className="text-sm text-gray-700">
                                    {translate("Add your first project", language)}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center" />
                                <span className="text-sm text-gray-700">
                                    {translate("Confirm mobile number", language)}
                                </span>
                            </div>
                        </div>
                    )}


                    {/* Work link for Companies */}
                    {loading ? <StatusSectionSkeleton title={translate("Work Link for Companies", language)} /> : (
                        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center space-x-2 mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-purple-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14-10H3m14 0h-5v5m5 0v-5z"
                                    />
                                </svg>
                                <h2 className="text-lg font-semibold text-gray-700">
                                    {translate("Work Link for Companies", language)}
                                </h2>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                                {translate("A solution tailored for companies and organizations that helps them grow their business by simplifying the process of hiring freelancers through a system that allows colleagues to add company members (with members of anyone else) to assist in marketing or sales and communicate with freelancers according to specific permissions.", language)}
                            </p>
                            <button className="bg-transparent hover:bg-gray-100 text-purple-500 border border-purple-500 hover:border-transparent rounded-lg px-4 py-2 text-sm focus:outline-none transition-colors duration-300">
                                <Link to='/react/AboutCompaniesPage'>
                                {translate("Know more", language)}
                                </Link>
                            </button>
                        </div>
                    )}
                </div>
                <div className=" rounded-xl shadow-lg p-6 md:p-8 w-full max-w-4xl transform transition-all duration-300 hover:shadow-2xl">
                    <div className="grid grid-cols-1 gap-6">
                        {/* My Balance */}
                        {loading ? <MyBalanceSkeleton /> : (
                            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center space-x-2 mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-green-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-2m-5 8v-4m0 0H9m0 0L9 18m0-4l3 3m-3-3l-3-3"
                                        />
                                    </svg>
                                    <h2 className="text-lg font-semibold text-gray-700">
                                        {translate("My Balance", language)}
                                    </h2>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-2xl font-bold text-green-600">
                                            {totalBalance} $
                                        </p>
                                        <p className="text-sm text-gray-600">{translate("Total balance", language)}</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-green-600">
                                            {availableBalance} $
                                        </p>
                                        <p className="text-sm text-gray-600">{translate("Available balance", language)}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            {translate("Withdrawable balance ", language)}<span className="font-semibold">{withdrawalBalance} $</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            {translate("Pending balance ", language)}<span className="font-semibold">{pendingBalance} $</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}


                        {/* My Projects Section - Dynamic */}
                        {loading ? <StatusSectionSkeleton title={translate("My Projects", language)} /> : renderStatusSection(
                            translate("My Projects", language),
                            projectStatusData,
                            <Link to="/react/AddProjectForm" className=" hover:bg-orange-600 focus:outline-none transition-colors duration-300">
                                <button
                                    className={`bg-orange-500 text-white text-sm rounded-lg px-3 py-1.5  focus:outline-none transition-colors duration-300`}
                                >
                                    {translate("Add project", language)}
                                </button>
                            </Link>
                            ,
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-orange-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                />
                            </svg>,
                            getProjectColorClass
                        )}


                        <div className="flex flex-col md:flex-row gap-6">
                            {/* My Services Section - Dynamic */}
                            {loading ? <StatusSectionSkeleton title={translate("My Services", language)} /> : (
                                <div className="w-full">
                                    {renderStatusSection(
                                        translate("My Services", language),
                                        serviceStatusData,
                                        <Link to="/react/AddServiceForm" className=" hover:bg-blue-600 focus:outline-none transition-colors duration-300">
                                            <button
                                                className={`bg-blue-500 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none transition-colors duration-300`}
                                            >
                                                {translate("Add", language)}
                                            </button>
                                        </Link>,
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-blue-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                                            />
                                        </svg>,
                                        getServiceColorClass
                                    )}
                                </div>
                            )}


                            {/* My Purchase Section - Dynamic */}
                            {loading ? <StatusSectionSkeleton title={translate("My Purchase", language)} /> : (
                                <div className="w-full">
                                    {renderStatusSection(
                                        translate("My Purchase", language),
                                        purchaseStatusData,
                                        null,
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-yellow-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                        </svg>,
                                        getPurchaseColorClass
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ControlPanel;