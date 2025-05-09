


// import React, { useState, useRef, useEffect } from "react";
// import { BsGlobe } from "react-icons/bs";
// import logo from "../assets/worklink_logo_1-removebg-preview 1.png";
// import axios from "axios";
// import {
//   HiOutlineUserCircle,
//   HiBell,
//   HiOutlineMail,
//   HiOutlineSearch,
//   HiMenu,
//   HiX,
// } from "react-icons/hi";
// import three from "../assets/Screenshot 2025-02-10 153936.png";
// import {
//   AiOutlineQuestionCircle,
//   AiOutlineSetting,
//   AiOutlineLogout,
//   AiOutlineEdit,
//   AiOutlineHeart,
// } from "react-icons/ai";
// import { CgProfile } from "react-icons/cg";
// import { Link } from "react-router-dom";
// import {
//   AiOutlinePlus,
//   AiOutlineShoppingCart,
//   AiOutlineProject,
//   AiOutlineCaretDown,
//   AiOutlineLink,
//   AiOutlineLock,
// } from "react-icons/ai";
// import { FaUsers } from "react-icons/fa";

// // Fixed Sidebar Component


// const Sidebar = ({
//   isOpen,
//   toggleSidebar,
//   isProjectsDropdownOpen,
//   toggleProjectsDropdown,
//   isWorkLinkDropdownOpen,
//   toggleWorkLinkDropdown,
//   isFollowUsDropdownOpen,
//   toggleFollowUsDropdown,
// }: {
//   isOpen: boolean;
//   toggleSidebar: () => void;
//   isProjectsDropdownOpen: boolean;
//   toggleProjectsDropdown: () => void;
//   isWorkLinkDropdownOpen: boolean;
//   toggleWorkLinkDropdown: () => void;
//   isFollowUsDropdownOpen: boolean;
//   toggleFollowUsDropdown: () => void;
// }) => (
//   <>
//     <div
//       className={` fixed top-0 left-0 w-64 h-[calc(100vh)] bg-[#404040] scrollbar-hide text-white shadow-lg p-4 transform ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       } transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}
//     >
//       <button
//         onClick={toggleSidebar}
//         className="absolute top-4 right-4 text-white hover:text-orange-500"
//       >
//         {/* <HiX className="h-6 w-6" /> */}
//       </button>

//       <div className="relative mb-4 mt-2 px-2">
//         <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//           <HiOutlineSearch className="text-gray-500 h-5 w-5" />
//         </div>
//         <input
//           type="text"
//           className="block w-full p-2 pl-10 text-sm text-white border border-gray-600 rounded-lg bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
//           placeholder="Search..."
//         />
//       </div>

//       <nav className="space-y-2 px-2">
//         <Link
//           to="/react/AddProjectForm"
//           className="flex items-center text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//         >
//           <AiOutlinePlus className="mr-2 h-5 w-5" />
//           Add a project
//         </Link>
//         <Link
//           to="/react/ServiceListingPage"
//           className="flex items-center text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//         >
//           <AiOutlineShoppingCart className="mr-2 h-5 w-5" />
//           Services
//         </Link>
//         <Link
//           to="/react/FreelancerList"
//           className="flex items-center text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//         >
//           <FaUsers className="mr-2 h-5 w-5" />
//           Freelancers
//         </Link>

//         {/* Projects Dropdown */}
//         <div className="relative">
//           <button
//             onClick={toggleProjectsDropdown}
//             className="flex items-center justify-between w-full text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//           >
//             <span className="flex items-center">
//               <AiOutlineProject className="mr-2 h-5 w-5" />
//               Projects
//             </span>
//             <AiOutlineCaretDown
//               className={`transform transition-transform ${
//                 isProjectsDropdownOpen ? "rotate-180" : ""
//               }`}
//             />
//           </button>
//           {isProjectsDropdownOpen && (
//             <div className="ml-4 mt-1 space-y-1">
//               <Link
//                 to="/business"
//                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//               >
//                 Business
//               </Link>
//               <Link
//                 to="/programming"
//                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//               >
//                 Programming
//               </Link>
//               <Link
//                 to="/engineering"
//                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//               >
//                 Engineering & Architecture
//               </Link>
//               <Link
//                 to="/design"
//                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//               >
//                 Design
//               </Link>
//               <Link
//                 to="/marketing"
//                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//               >
//                 Marketing
//               </Link>
//               <Link
//                 to="/writing"
//                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//               >
//                 Writing & Translation
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Work Link Dropdown */}
//         <div className="relative">
//           <button
//             onClick={toggleWorkLinkDropdown}
//             className="flex items-center justify-between w-full text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//           >
//             <span className="flex items-center">
//               <AiOutlineLink className="mr-2 h-5 w-5" />
//               Work Link
//             </span>
//             <AiOutlineCaretDown
//               className={`transform transition-transform ${
//                 isWorkLinkDropdownOpen ? "rotate-180" : ""
//               }`}
//             />
//           </button>
//           {isWorkLinkDropdownOpen && (
//             <div className="ml-4 mt-1 space-y-1">
//               <Link
//                 to="/faq"
//                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//               >
//                 FAQ
//               </Link>
//               <Link
//                 to="/guarantee"
//                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//               >
//                 Guarantee Your Rights
//               </Link>
//               <Link
//                 to="/terms"
//                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//               >
//                 Terms of Use
//               </Link>
//               <Link
//                 to="/privacy"
//                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//               >
//                 Privacy Statement
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Follow Us Dropdown */}
//         <div className="relative">
//           <button
//             onClick={toggleFollowUsDropdown}
//             className="flex items-center justify-between w-full text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//           >
//             <span className="flex items-center">
//               <AiOutlineLock className="mr-2 h-5 w-5" />
//               Follow Us
//             </span>
//             <AiOutlineCaretDown
//               className={`transform transition-transform ${
//                 isFollowUsDropdownOpen ? "rotate-180" : ""
//               }`}
//             />
//           </button>
//           {isFollowUsDropdownOpen && (
//             <div className="ml-4 mt-1 space-y-1">
//               <a
//                 href="#"
//                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//               >
//                 Facebook
//               </a>
//               <a
//                 href="#"
//                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//               >
//                 Twitter
//               </a>
//             </div>
//           )}
//         </div>
//       </nav>
//     </div>

//     {/* Overlay with proper z-index */}
//     {isOpen && (
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50 z-40"
//         onClick={toggleSidebar}
//       />
//     )}
//   </>
// );



// // Reusable Dropdown Item Component
// const DropdownItem = ({ to, Icon, text, onClick }: any) => (
//   <Link
//     to={to}
//     onClick={onClick}
//     className="block px-4 py-3 text-gray-300 hover:bg-gray-600 hover:text-white flex items-center"
//   >
//     <Icon className="inline-block mr-2 align-middle h-5 w-5" />
//     {text}
//   </Link>
// );

// // Notifications and Messages Panel Component
// interface PanelDropdownProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   Icon: React.ComponentType<any>;
//   children: React.ReactNode;
// }

// const PanelDropdown: React.FC<PanelDropdownProps> = ({
//   isOpen,
//   onClose,
//   title,
//   Icon,
//   children,
// }) => {
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         isOpen &&
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         onClose();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen, onClose]);

//   return (
//     isOpen && (
//       <div
//         ref={dropdownRef}
//         className="absolute right-0 mt-2 w-full md:w-96 bg-[#404040] rounded-md shadow-lg z-50"
//       >
//         <div className="flex items-center border-b border-gray-600 pb-2 mb-2 p-4">
//           <Icon className="text-gray-300 h-5 w-5 mr-2" />
//           <h3 className="text-lg font-semibold text-white">{title}</h3>
//         </div>
//         <div className="p-6">{children}</div>
//       </div>
//     )
//   );
// };

// const Header = () => {
//   const [isAuth, setIsAuth] = useState<boolean | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const authToken = localStorage.getItem("token");

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [isSearchOpened, setIsSearchOpened] = useState(false);
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
//   const [isMessagesOpen, setIsMessagesOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [name, setName] = useState("");

//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loadingNotifications, setLoadingNotifications] = useState(true);

//   const profileDropdownRef = useRef<HTMLDivElement>(null);
//   const searchBarRef = useRef<HTMLDivElement>(null);

//   const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
//   const [isWorkLinkDropdownOpen, setIsWorkLinkDropdownOpen] = useState(false);
//   const [isFollowUsDropdownOpen, setIsFollowUsDropdownOpen] = useState(false);

//   const toggleProjectsDropdown = () =>
//     setIsProjectsDropdownOpen(!isProjectsDropdownOpen);
//   const toggleWorkLinkDropdown = () =>
//     setIsWorkLinkDropdownOpen(!isWorkLinkDropdownOpen);
//   const toggleFollowUsDropdown = () =>
//     setIsFollowUsDropdownOpen(!isFollowUsDropdownOpen);
//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   // Fetch Notifications and Messages
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACK_URL}/notification`,
//           {
//             headers: {
//               Authorization: `Bearer ${authToken}`,
//             },
//           }
//         );

//         const data = response.data.data;
//         const notifications = data.filter((item: any) => item.type === "notification");
//         const messages = data.filter((item: any) => item.type === "mail");

//         setNotifications(notifications);
//         setMessages(messages);
//       } catch (error) {
//         console.error("Failed to fetch notifications:", error);
//       } finally {
//         setLoadingNotifications(false);
//       }
//     };

//     if (authToken) {
//       fetchNotifications();
//     }
//   }, [authToken]);

//   // Verify Authentication
//   useEffect(() => {
//     const verifyAuth = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.post(
//           `${process.env.REACT_APP_BACK_URL}/verifyAuth`,
//           {},
//           {
//             headers: {
//               "Content-Type": "application/json",
//               'Authorization': `Bearer ${authToken}`,
//             },
//           }
//         );
//         console.log(response);
        

//         setIsAuth(!!response.data);
//         setName(response.data.user.userName);
//       } catch (error) {
//         console.error("Auth verification failed:", error);
//         setIsAuth(false);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (authToken) {
//       verifyAuth();
//     } else {
//       setIsAuth(false);
//       setIsLoading(false);
//     }
//   }, [authToken]);

//   // Remove token from localStorage if isAuth becomes false
//   useEffect(() => {
//     if (isAuth === false) {
//       localStorage.removeItem("token");
//     }
//   }, [isAuth]);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         profileDropdownRef.current &&
//         !profileDropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsProfileDropdownOpen(false);
//       }

//       if (
//         searchBarRef.current &&
//         !searchBarRef.current.contains(event.target as Node)
//       ) {
//         setIsSearchOpened(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [profileDropdownRef, searchBarRef]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <div className="bg-[#E8F2FF]">
//         {isAuth === true ? (
//           <>
//             {/* Notifications Dropdown */}
//             <div className="relative top-[70px] right-[860px]">
//               <PanelDropdown
//                 isOpen={isNotificationsOpen}
//                 onClose={() => setIsNotificationsOpen(false)}
//                 title="Notifications"
//                 Icon={HiBell}
//               >
//                 {loadingNotifications ? (
//                   <p className="text-gray-400 text-center">Loading...</p>
//                 ) : (
//                   <div className="space-y-3">
//                     {notifications.map((notification, index) => (
//                       <div key={index} className="flex space-x-2">
//                         <img
//                           src={three}
//                           alt="User Avatar"
//                           className="w-8 h-8 rounded-full"
//                         />
//                         <div className="flex-1">
//                           <p className="text-white text-sm">
//                             {notification.title}
//                           </p>
//                           <p className="text-gray-400 text-xs">
//                             {notification.description}
//                           </p>
//                           <p className="text-gray-400 text-xs">
//                             {new Date(notification.created_at).toLocaleString()}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                     {notifications.length === 0 && (
//                       <p className="text-gray-400 text-center">
//                         No new notifications
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </PanelDropdown>
//             </div>

//             {/* Messages Dropdown */}
//             <div className="relative top-[70px] right-[860px]">
//               <PanelDropdown
//                 isOpen={isMessagesOpen}
//                 onClose={() => setIsMessagesOpen(false)}
//                 title="Messages"
//                 Icon={HiOutlineMail}
//               >
//                 {loadingNotifications ? (
//                   <p className="text-gray-400 text-center">Loading...</p>
//                 ) : (
//                   <div className="space-y-3">
//                     {messages.map((message, index) => (
//                       <div key={index} className="flex space-x-2">
//                         <img
//                           src={three}
//                           alt="User Avatar"
//                           className="w-8 h-8 rounded-full"
//                         />
//                         <div className="flex-1">
//                           <p className="text-white text-sm">
//                             {message.title}
//                           </p>
//                           <p className="text-gray-400 text-xs">
//                             {message.description}
//                           </p>
//                           <p className="text-gray-400 text-xs">
//                             {new Date(message.created_at).toLocaleString()}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                     {messages.length === 0 && (
//                       <p className="text-gray-400 text-center">
//                         No new messages Yet!
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </PanelDropdown>
//             </div>

//             <Sidebar
//               isOpen={isSidebarOpen}
//               toggleSidebar={toggleSidebar}
//               isProjectsDropdownOpen={isProjectsDropdownOpen}
//               toggleProjectsDropdown={toggleProjectsDropdown}
//               isWorkLinkDropdownOpen={isWorkLinkDropdownOpen}
//               toggleWorkLinkDropdown={toggleWorkLinkDropdown}
//               isFollowUsDropdownOpen={isFollowUsDropdownOpen}
//               toggleFollowUsDropdown={toggleFollowUsDropdown}
//             />

//             {/* Header */}
//             <header className="bg-[#404040] text-white py-4 w-full z-20 fixed top-0">
//               <div className="container mx-auto flex justify-between items-center px-4">
//                 {/* Left Icons */}
//                 <div className="flex items-center space-x-4 md:space-x-6 z-20 text-white py-4">
//                   <div className="relative" ref={profileDropdownRef}>
//                     <button
//                       onClick={() =>
//                         setIsProfileDropdownOpen(!isProfileDropdownOpen)
//                       }
//                       className="focus:outline-none"
//                       aria-label="Toggle profile dropdown"
//                     >
//                       <HiOutlineUserCircle
//                         className={`absolute bottom-[-3px] right-[3px] h-7 w-7 ${
//                           isProfileDropdownOpen ? "text-orange-500" : ""
//                         }`}
//                       />
//                     </button>

//                     {isProfileDropdownOpen && (
//                       <div className="absolute left-0 mt-2 w-48 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-50">
//                         <div className="py-1">
//                           <DropdownItem
//                             to="/profile"
//                             Icon={CgProfile}
//                             text={name}
//                             onClick={() => setIsProfileDropdownOpen(false)}
//                           />
//                           <DropdownItem
//                             to="/dashboard"
//                             Icon={AiOutlineHeart}
//                             text="My favourites"
//                             onClick={() => setIsProfileDropdownOpen(false)}
//                           />
//                           <Link
//                             to="/react/FinancialTransactions"
//                             className=" px-4 py-3 text-gray-300 hover:bg-gray-600 hover:text-white flex items-center"
//                           >
//                             <svg
//                               width="24"
//                               height="24"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <circle
//                                 cx="12"
//                                 cy="12"
//                                 r="10"
//                                 stroke="white"
//                                 stroke-width="1.5"
//                               />
//                               <path
//                                 d="M14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12"
//                                 stroke="white"
//                                 stroke-width="1.5"
//                                 stroke-linecap="round"
//                               />
//                               <path
//                                 d="M12 12C13.1046 12 14 12.8954 14 14C14 15.1046 13.1046 16 12 16C10.8954 16 10 15.1046 10 14"
//                                 stroke="white"
//                                 stroke-width="1.5"
//                                 stroke-linecap="round"
//                               />
//                               <path
//                                 d="M12 6.5V8"
//                                 stroke="white"
//                                 stroke-width="1.5"
//                                 stroke-linecap="round"
//                                 stroke-linejoin="round"
//                               />
//                               <path
//                                 d="M12 16V17.5"
//                                 stroke="white"
//                                 stroke-width="1.5"
//                                 stroke-linecap="round"
//                                 stroke-linejoin="round"
//                               />
//                             </svg>
//                             <span className="pl-2">Balance</span>
//                           </Link>
//                           <Link
//                             to="/react/SettingPage"
//                             className=" px-4 py-3 text-gray-300 hover:bg-gray-600 hover:text-white flex items-center"
//                           >
//                             <AiOutlineSetting className="inline-block mr-2 align-middle h-5 w-5" />
//                             Setting
//                           </Link>

//                           <div className="border-t border-gray-600 my-1"></div>
//                           <Link
//                             to="/react/EditAccountPage"
//                             className="block px-4 py-3 text-gray-300 hover:bg-gray-600 hover:text-white flex items-center"
//                           >
//                             <AiOutlineEdit className="inline-block mr-2 align-middle h-5 w-5" />
//                             Edit account
//                           </Link>
//                           <Link
//                             to="react/help"
//                             className="block px-4 py-3 text-gray-300 hover:bg-gray-600 hover:text-white flex items-center"
//                           >
//                             <AiOutlineQuestionCircle className="inline-block mr-2 align-middle h-5 w-5" />
//                             Help
//                           </Link>
//                           <Link
//                             to="/react"
//                             className="block px-4 py-3 text-gray-300 hover:bg-gray-600 hover:text-white flex items-center"
//                             onClick={() => {
//                               localStorage.removeItem("token");
//                               window.location.reload();
//                             }}
//                           >
//                             <AiOutlineLogout className="inline-block mr-2 align-middle h-5 w-5" />
//                             Sign out
//                           </Link>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Notifications and Messages Icons */}
//                   <button
//                     onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
//                     className="relative text-gray-300 hover:text-white focus:outline-none"
//                   >
//                     <HiBell
//                       className={`h-7 w-7 ${
//                         isNotificationsOpen ? "text-orange-500" : ""
//                       }`}
//                     />
//                     {notifications.length > 0 && (
//                       <span className="absolute top-[-3px] right-[-3px] bg-red-500 text-white text-xs rounded-full px-1 py-[2px]">
//                         {notifications.length}
//                       </span>
//                     )}
//                   </button>

//                   <button
//                     onClick={() => setIsMessagesOpen(!isMessagesOpen)}
//                     className="text-gray-300 hover:text-white focus:outline-none"
//                   >
//                     <HiOutlineMail
//                       className={`h-7 w-7 ${
//                         isMessagesOpen ? "text-orange-500" : ""
//                       }`}
//                     />
//                     {messages.length > 0 && (
//                       <span className="absolute top-[-3px] right-[-3px] bg-red-500 text-white text-xs rounded-full px-1 py-[2px]">
//                         {messages.length}
//                       </span>
//                     )}
//                   </button>

//                   {/* Search Bar */}
//                   <div className="relative" ref={searchBarRef}>
//                     <button
//                       onClick={() => setIsSearchOpened(!isSearchOpened)}
//                       className="focus:outline-none"
//                       aria-label="Toggle search dropdown"
//                     >
//                       <HiOutlineSearch
//                         className={`h-7 w-7 ${
//                           isSearchOpened ? "text-orange-500" : ""
//                         }`}
//                       />
//                     </button>

//                     {isSearchOpened && (
//                       <div className="absolute left-[-185px] mt-8 overflow-hidden w-[1400px] bg-gray-700 border border-gray-600 rounded-md shadow-lg z-50">
//                         <div className="relative">
//                           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                             <HiOutlineSearch className="text-gray-500 h-5 w-5" />
//                           </div>
//                           <input
//                             type="text"
//                             id="search-bar"
//                             className="block w-full p-2 pl-10 text-sm text-white border border-gray-600 rounded-md bg-gray-700 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
//                             placeholder="Search about ..."
//                           />
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Right Logo and Mobile Menu */}
//                 <div className="flex items-center space-x-4">
//                   <nav className="hidden md:flex space-x-8 items-center">
//                     <button className="flex items-center text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200">
//                       <BsGlobe className="h-4 w-4 mr-1" />
//                       العربية
//                     </button>
//                     <Link
//                       to="/react/FreelancerList"
//                       className="text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200"
//                     >
//                       Freelancers
//                     </Link>
//                     <Link
//                       to="/react/OpenProjects"
//                       className="text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200"
//                     >
//                       Projects
//                     </Link>
//                     <Link
//                       to="/react/ServiceListingPage"
//                       className="text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200"
//                     >
//                       Services
//                     </Link>
//                   </nav>
//                   <div className="flex items-center">
//                     <Link to="/react/ControlPanel">
//                       <img src={logo} alt="Logo" className="h-8 w-auto" />
//                     </Link>
//                   </div>
//                   <div>
//                     <div>
//                       <button
//                         onClick={toggleSidebar}
//                         className="p-2 mt-3 hover:text-orange-500 transition-colors"
//                       >
//                         <svg
//                           width="30"
//                           height="24"
//                           viewBox="0 0 24 16"
//                           fill="white"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path d="M0 16V13.3333H24V16H0ZM0 9.33333V6.66667H24V9.33333H0ZM0 2.66667V0H24V2.66667H0Z" />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </header>

//             {/* Mobile Menu */}
//             {isMobileMenuOpen && (
//               <div className="md:hidden bg-gray-700 py-4 fixed top-0 left-0 w-full h-full z-50">
//                 <button
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="absolute top-4 right-4 text-gray-300 hover:text-white"
//                   aria-label="Close mobile menu"
//                 >
//                   <HiX className="h-6 w-6" />
//                 </button>
//                 <div className="container mx-auto flex flex-col space-y-2 mt-16 px-4">
//                   <button className="flex items-center text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200">
//                     <BsGlobe className="h-4 w-4 mr-1" />
//                     العربية
//                   </button>
//                   <Link
//                     to="/react/FreelancerList"
//                     className="block text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200"
//                   >
//                     Freelancers
//                   </Link>
//                   <Link
//                     to="/react/OpenProjects"
//                     className="block text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200"
//                   >
//                     Projects
//                   </Link>
//                   <Link
//                     to="/react/ServiceListingPage"
//                     className="block text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200"
//                   >
//                     Services
//                   </Link>
//                   {!isAuth && (
//                     <>
//                       <Link to="/react/signin">
//                         <button className="bg-transparent border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition-colors duration-200 block w-full text-center py-3 rounded-md hover:bg-gray-600 transition-colors duration-200">
//                           Sign in
//                         </button>
//                       </Link>
//                       <Link to="/react/joinUs">
//                         <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-200 block w-full text-center py-3 rounded-md hover:bg-gray-600 transition-colors duration-200">
//                           Join
//                         </button>
//                       </Link>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}
//           </>
//         ) : (
//           <>
//             {/* Unauthenticated Header */}
//             <header className="bg-[#404040] z-20 text-white py-4">
//               <div className="container mx-auto flex justify-between items-center">
//                 <div className="flex items-center">
//                   <Link to="/react">
//                     <img src={logo} alt="Logo" className="h-8 w-auto mr-2" />
//                   </Link>
//                 </div>

//                 <nav className="hidden md:flex space-x-8 items-center">
//                   <button className="flex items-center text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200">
//                     <BsGlobe className="h-4 w-4 mr-1" />
//                     العربية
//                   </button>
//                   <Link
//                     to="/react/FreelancerList"
//                     className="text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200"
//                   >
//                     Freelancers
//                   </Link>
//                   <Link
//                     to="/react/OpenProjects"
//                     className="text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200"
//                   >
//                     Projects
//                   </Link>
//                   <Link
//                     to="/react/ServiceListingPage"
//                     className="text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200"
//                   >
//                     Services
//                   </Link>

//                   <Link to="/react/signin">
//                     <button className="bg-transparent border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition-colors duration-200">
//                       Sign in
//                     </button>
//                   </Link>
//                   <Link to="/react/joinUs">
//                     <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-200">
//                       Join
//                     </button>
//                   </Link>
//                 </nav>

//                 <button
//                   className="md:hidden text-gray-300 hover:text-white focus:outline-none focus:text-white"
//                   aria-label="Toggle navigation"
//                   onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 >
//                   <HiMenu className="h-6 w-6" />
//                 </button>
//               </div>

//               {/* Mobile Menu */}
//               {isMobileMenuOpen && (
//                 <div className="md:hidden bg-gray-700 py-4">
//                   <div className="container mx-auto flex flex-col space-y-2">
//                     <button className="flex items-center text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200">
//                       <BsGlobe className="h-4 w-4 mr-1" />
//                       العربية
//                     </button>
//                     <Link
//                       to="/FreelancerList"
//                       className="block text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200"
//                     >
//                       Freelancers
//                     </Link>
//                     <Link
//                       to="/OpenProjects"
//                       className="block text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200"
//                     >
//                       Projects
//                     </Link>
//                     <Link
//                       to="/ServiceListingPage"
//                       className="block text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200"
//                     >
//                       Services
//                     </Link>
//                     <Link to="/react/signin">
//                       <button className="bg-transparent border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition-colors duration-200">
//                         Sign in
//                       </button>
//                     </Link>
//                     <Link to="/react/joinUs">
//                       <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-200">
//                         Join
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//               )}
//             </header>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default Header;








// import React, { useState, useRef, useEffect } from "react";
// import { BsGlobe } from "react-icons/bs";
// import logo from "../assets/worklink_logo_1-removebg-preview 1.png";
// import axios from "axios";
// import {
//   HiOutlineUserCircle,
//   HiBell,
//   HiOutlineMail,
//   HiOutlineSearch,
//   HiMenu,
//   HiX,
// } from "react-icons/hi";
// import three from "../assets/Screenshot 2025-02-10 153936.png";
// import {
//   AiOutlineQuestionCircle,
//   AiOutlineSetting,
//   AiOutlineLogout,
//   AiOutlineEdit,
//   AiOutlineHeart,
// } from "react-icons/ai";
// import { CgProfile } from "react-icons/cg";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   AiOutlinePlus,
//   AiOutlineShoppingCart,
//   AiOutlineProject,
//   AiOutlineCaretDown,
//   AiOutlineLink,
//   AiOutlineLock,
// } from "react-icons/ai";
// import { FaUsers } from "react-icons/fa";

// // Fixed Sidebar Component

// interface SidebarProps {
//   isOpen: boolean;
//   toggleSidebar: () => void;
//   isProjectsDropdownOpen: boolean;
//   toggleProjectsDropdown: () => void;
//   isWorkLinkDropdownOpen: boolean;
//   toggleWorkLinkDropdown: () => void;
//   isFollowUsDropdownOpen: boolean;
//   toggleFollowUsDropdown: () => void;
// }

// // const Sidebar = ({
// //   isOpen,
// //   toggleSidebar,
// //   isProjectsDropdownOpen,
// //   toggleProjectsDropdown,
// //   isWorkLinkDropdownOpen,
// //   toggleWorkLinkDropdown,
// //   isFollowUsDropdownOpen,
// //   toggleFollowUsDropdown,
// // }: {
// //   isOpen: boolean;
// //   toggleSidebar: () => void;
// //   isProjectsDropdownOpen: boolean;
// //   toggleProjectsDropdown: () => void;
// //   isWorkLinkDropdownOpen: boolean;
// //   toggleWorkLinkDropdown: () => void;
// //   isFollowUsDropdownOpen: boolean;
// //   toggleFollowUsDropdown: () => void;
// // }) => (
// //   <>
// //     <div
// //       className={` fixed top-0 left-0 w-64 h-[calc(100vh)] bg-[#404040] scrollbar-hide text-white shadow-lg p-4 transform ${
// //         isOpen ? "translate-x-0" : "-translate-x-full"
// //       } transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}
// //     >
// //       <button
// //         onClick={toggleSidebar}
// //         className="absolute top-4 right-4 text-white hover:text-orange-500"
// //       >
// //         {/* <HiX className="h-6 w-6" /> */}
// //       </button>

// //       <div className="relative mb-4 mt-2 px-2">
// //         <div className="absolute inset-y-0 left-0 flex items-center pl-3">
// //           <HiOutlineSearch className="text-gray-500 h-5 w-5" />
// //         </div>
// //         <input
// //           type="text"
// //           className="block w-full p-2 pl-10 text-sm text-white border border-gray-600 rounded-lg bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
// //           placeholder="Search..."
// //         />
// //       </div>

// //       <nav className="space-y-2 px-2">
// //         <Link
// //           to="/react/AddProjectForm"
// //           className="flex items-center text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
// //         >
// //           <AiOutlinePlus className="mr-2 h-5 w-5" />
// //           Add a project
// //         </Link>
// //         <Link
// //           to="/react/ServiceListingPage"
// //           className="flex items-center text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
// //         >
// //           <AiOutlineShoppingCart className="mr-2 h-5 w-5" />
// //           Services
// //         </Link>
// //         <Link
// //           to="/react/FreelancerList"
// //           className="flex items-center text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
// //         >
// //           <FaUsers className="mr-2 h-5 w-5" />
// //           Freelancers
// //         </Link>

// //         {/* Projects Dropdown */}
// //         <div className="relative">
// //           <button
// //             onClick={toggleProjectsDropdown}
// //             className="flex items-center justify-between w-full text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
// //           >
// //             <span className="flex items-center">
// //               <AiOutlineProject className="mr-2 h-5 w-5" />
// //               Projects
// //             </span>
// //             <AiOutlineCaretDown
// //               className={`transform transition-transform ${
// //                 isProjectsDropdownOpen ? "rotate-180" : ""
// //               }`}
// //             />
// //           </button>
// //           {isProjectsDropdownOpen && (
// //             <div className="ml-4 mt-1 space-y-1">
// //               <Link
// //                 to="/business"
// //                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
// //               >
// //                 Business
// //               </Link>
// //               <Link
// //                 to="/programming"
// //                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
// //               >
// //                 Programming
// //               </Link>
// //               <Link
// //                 to="/engineering"
// //                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
// //               >
// //                 Engineering & Architecture
// //               </Link>
// //               <Link
// //                 to="/design"
// //                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
// //               >
// //                 Design
// //               </Link>
// //               <Link
// //                 to="/marketing"
// //                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
// //               >
// //                 Marketing
// //               </Link>
// //               <Link
// //                 to="/writing"
// //                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
// //               >
// //                 Writing & Translation
// //               </Link>
// //             </div>
// //           )}
// //         </div>

// //         {/* Work Link Dropdown */}
// //         <div className="relative">
// //           <button
// //             onClick={toggleWorkLinkDropdown}
// //             className="flex items-center justify-between w-full text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
// //           >
// //             <span className="flex items-center">
// //               <AiOutlineLink className="mr-2 h-5 w-5" />
// //               Work Link
// //             </span>
// //             <AiOutlineCaretDown
// //               className={`transform transition-transform ${
// //                 isWorkLinkDropdownOpen ? "rotate-180" : ""
// //               }`}
// //             />
// //           </button>
// //           {isWorkLinkDropdownOpen && (
// //             <div className="ml-4 mt-1 space-y-1">
// //               <Link
// //                 to="/faq"
// //                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
// //               >
// //                 FAQ
// //               </Link>
// //               <Link
// //                 to="/guarantee"
// //                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
// //               >
// //                 Guarantee Your Rights
// //               </Link>
// //               <Link
// //                 to="/terms"
// //                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
// //               >
// //                 Terms of Use
// //               </Link>
// //               <Link
// //                 to="/privacy"
// //                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
// //               >
// //                 Privacy Statement
// //               </Link>
// //             </div>
// //           )}
// //         </div>

// //         {/* Follow Us Dropdown */}
// //         <div className="relative">
// //           <button
// //             onClick={toggleFollowUsDropdown}
// //             className="flex items-center justify-between w-full text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
// //           >
// //             <span className="flex items-center">
// //               <AiOutlineLock className="mr-2 h-5 w-5" />
// //               Follow Us
// //             </span>
// //             <AiOutlineCaretDown
// //               className={`transform transition-transform ${
// //                 isFollowUsDropdownOpen ? "rotate-180" : ""
// //               }`}
// //             />
// //           </button>
// //           {isFollowUsDropdownOpen && (
// //             <div className="ml-4 mt-1 space-y-1">
// //               <a
// //                 href="#"
// //                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
// //               >
// //                 Facebook
// //               </a>
// //               <a
// //                 href="#"
// //                 className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
// //               >
// //                 Twitter
// //               </a>
// //             </div>
// //           )}
// //         </div>
// //       </nav>
// //     </div>

// //     {/* Overlay with proper z-index */}
// //     {isOpen && (
// //       <div
// //         className="fixed inset-0 bg-black bg-opacity-50 z-40"
// //         onClick={toggleSidebar}
// //       />
// //     )}
// //   </>
// // );



// const Sidebar: React.FC<SidebarProps> = ({
//   isOpen,
//   toggleSidebar,
//   isProjectsDropdownOpen,
//   toggleProjectsDropdown,
//   isWorkLinkDropdownOpen,
//   toggleWorkLinkDropdown,
//   isFollowUsDropdownOpen,
//   toggleFollowUsDropdown,
// }) => {
//   const navigate = useNavigate();

//   const handleNavLinkClick = () => {
//     toggleSidebar(); // Close sidebar when a link is clicked
//   };

//   const handleProjectCategoryClick = (category: string) => {
//     localStorage.setItem('query', category);
//     navigate(`/react/OpenProjects`);
//     window.location.reload();
//     handleNavLinkClick(); // Close sidebar after navigation
//   };

//   return (
//     <>
//       <div
//         className={` fixed top-0 left-0 w-64 h-[calc(100vh)] bg-[#404040] scrollbar-hide text-white shadow-lg p-4 transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}
//       >
//         <button
//           onClick={toggleSidebar}
//           className="absolute top-4 right-4 text-white hover:text-orange-500"
//         >
//           {/* <HiX className="h-6 w-6" /> */}
//         </button>

//         <div className="relative mb-4 mt-2 px-2">
//           <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//             <HiOutlineSearch className="text-gray-500 h-5 w-5" />
//           </div>
//           <input
//             type="text"
//             className="block w-full p-2 pl-10 text-sm text-white border border-gray-600 rounded-lg bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Search..."
//           />
//         </div>

//         <nav className="space-y-2 px-2">
//           <Link
//             to="/react/AddProjectForm"
//             className="flex items-center text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//             onClick={handleNavLinkClick}
//           >
//             <AiOutlinePlus className="mr-2 h-5 w-5" />
//             Add a project
//           </Link>
//           <Link
//             to="/react/ServiceListingPage"
//             className="flex items-center text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//             onClick={handleNavLinkClick}
//           >
//             <AiOutlineShoppingCart className="mr-2 h-5 w-5" />
//             Services
//           </Link>
//           <Link
//             to="/react/FreelancerList"
//             className="flex items-center text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//             onClick={handleNavLinkClick}
//           >
//             <FaUsers className="mr-2 h-5 w-5" />
//             Freelancers
//           </Link>

//           {/* Projects Dropdown */}
//           <div className="relative">
//             <button
//               onClick={toggleProjectsDropdown}
//               className="flex items-center justify-between w-full text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//             >
//               <span className="flex items-center">
//                 <AiOutlineProject className="mr-2 h-5 w-5" />
//                 Projects
//               </span>
//               <AiOutlineCaretDown
//                 className={`transform transition-transform ${
//                   isProjectsDropdownOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </button>
//             {isProjectsDropdownOpen && (
//               <div className="ml-4 mt-1 space-y-1">
//                 <button
//                   onClick={() => handleProjectCategoryClick('Business')}
//                   className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200 w-full text-left"
//                 >
//                   Business
//                 </button>
//                 <button
//                   onClick={() => handleProjectCategoryClick('Programming')}
//                   className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200 w-full text-left"
//                 >
//                   Programming
//                 </button>
//                 <button
//                   onClick={() => handleProjectCategoryClick('Engineering & Architecture')}
//                   className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200 w-full text-left"
//                 >
//                   Engineering & Architecture
//                 </button>
//                 <button
//                   onClick={() => handleProjectCategoryClick('Design')}
//                   className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200 w-full text-left"
//                 >
//                   Design
//                 </button>
//                 <button
//                   onClick={() => handleProjectCategoryClick('Marketing')}
//                   className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200 w-full text-left"
//                 >
//                   Marketing
//                 </button>
//                 <button
//                   onClick={() => handleProjectCategoryClick('Writing & Translation')}
//                   className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200 w-full text-left"
//                 >
//                   Writing & Translation
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Work Link Dropdown */}
//           <div className="relative">
//             <button
//               onClick={toggleWorkLinkDropdown}
//               className="flex items-center justify-between w-full text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//             >
//               <span className="flex items-center">
//                 <AiOutlineLink className="mr-2 h-5 w-5" />
//                 Work Link
//               </span>
//               <AiOutlineCaretDown
//                 className={`transform transition-transform ${
//                   isWorkLinkDropdownOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </button>
//             {isWorkLinkDropdownOpen && (
//               <div className="ml-4 mt-1 space-y-1">
//                 <Link
//                   to="/react/FrequentlyAskedQuestionsPage"
//                   className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//                   onClick={handleNavLinkClick}
//                 >
//                   FAQ
//                 </Link>
//                 <Link
//                   to="/react/GuaranteeYourRightsPage"
//                   className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//                   onClick={handleNavLinkClick}
//                 >
//                   Guarantee Your Rights
//                 </Link>
//                 <Link
//                   to="/react/TermsOfUsePage"
//                   className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//                   onClick={handleNavLinkClick}
//                 >
//                   Terms of Use
//                 </Link>
//                 <Link
//                   to="/react/PrivacyStatementPage"
//                   className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//                   onClick={handleNavLinkClick}
//                 >
//                   Privacy Statement
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Follow Us Dropdown */}
//           <div className="relative">
//             <button
//               onClick={toggleFollowUsDropdown}
//               className="flex items-center justify-between w-full text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//             >
//               <span className="flex items-center">
//                 <AiOutlineLock className="mr-2 h-5 w-5" />
//                 Follow Us
//               </span>
//               <AiOutlineCaretDown
//                 className={`transform transition-transform ${
//                   isFollowUsDropdownOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </button>
//             {isFollowUsDropdownOpen && (
//               <div className="ml-4 mt-1 space-y-1">
//                 <a
//                   href="#"
//                   className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//                   onClick={handleNavLinkClick}
//                 >
//                   Facebook
//                 </a>
//                 <a
//                   href="#"
//                   className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
//                   onClick={handleNavLinkClick}
//                 >
//                   Twitter
//                 </a>
//               </div>
//             )}
//           </div>
//         </nav>
//       </div>

//       {/* Overlay with proper z-index */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={toggleSidebar}
//         />
//       )}
//       </>
//   )
// }



// // Reusable Dropdown Item Component
// const DropdownItem = ({ to, Icon, text, onClick }: any) => (
//   <Link
//     to={to}
//     onClick={onClick}
//     className="block px-4 py-3 text-gray-300 hover:bg-gray-600 hover:text-white flex items-center"
//   >
//     <Icon className="inline-block mr-2 align-middle h-5 w-5" />
//     {text}
//   </Link>
// );

// // Notifications and Messages Panel Component
// interface PanelDropdownProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   Icon: React.ComponentType<any>;
//   children: React.ReactNode;
// }

// const PanelDropdown: React.FC<PanelDropdownProps> = ({
//   isOpen,
//   onClose,
//   title,
//   Icon,
//   children,
// }) => {
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         isOpen &&
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         onClose();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen, onClose]);

//   return (
//     isOpen && (
//       <div
//         ref={dropdownRef}
//         className="absolute right-0 mt-2 w-full md:w-96 bg-[#404040] rounded-md shadow-lg z-50"
//       >
//         <div className="flex items-center border-b border-gray-600 pb-2 mb-2 p-4">
//           <Icon className="text-gray-300 h-5 w-5 mr-2" />
//           <h3 className="text-lg font-semibold text-white">{title}</h3>
//         </div>
//         <div className="p-6">{children}</div>
//       </div>
//     )
//   );
// };

// const Header = () => {
//   const [isAuth, setIsAuth] = useState<boolean | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const authToken = localStorage.getItem("token");

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [isSearchOpened, setIsSearchOpened] = useState(false);
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
//   const [isMessagesOpen, setIsMessagesOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [name, setName] = useState("");

//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loadingNotifications, setLoadingNotifications] = useState(true);

//   const profileDropdownRef = useRef<HTMLDivElement>(null);
//   const searchBarRef = useRef<HTMLDivElement>(null);

//   const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
//   const [isWorkLinkDropdownOpen, setIsWorkLinkDropdownOpen] = useState(false);
//   const [isFollowUsDropdownOpen, setIsFollowUsDropdownOpen] = useState(false);
//   const [language, setLanguage] = useState<'en' | 'ar'>(
//     localStorage.getItem('language') === 'ar' ? 'ar' : 'en'
// );

//   const toggleProjectsDropdown = () =>
//     setIsProjectsDropdownOpen(!isProjectsDropdownOpen);
//   const toggleWorkLinkDropdown = () =>
//     setIsWorkLinkDropdownOpen(!isWorkLinkDropdownOpen);
//   const toggleFollowUsDropdown = () =>
//     setIsFollowUsDropdownOpen(!isFollowUsDropdownOpen);
//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   // Fetch Notifications and Messages
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACK_URL}/notification`,
//           {
//             headers: {
//               Authorization: `Bearer ${authToken}`,
//             },
//           }
//         );

//         const data = response.data.data;
//         const notifications = data.filter((item: any) => item.type === "notification");
//         const messages = data.filter((item: any) => item.type === "mail");

//         setNotifications(notifications);
//         setMessages(messages);
//       } catch (error) {
//         console.error("Failed to fetch notifications:", error);
//       } finally {
//         setLoadingNotifications(false);
//       }
//     };

//     if (authToken) {
//       fetchNotifications();
//     }
//   }, [authToken]);

//   // Verify Authentication
//   useEffect(() => {
//     const verifyAuth = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.post(
//           `${process.env.REACT_APP_BACK_URL}/verifyAuth`,
//           {},
//           {
//             headers: {
//               "Content-Type": "application/json",
//               'Authorization': `Bearer ${authToken}`,
//             },
//           }
//         );
//         console.log(response);
        

//         setIsAuth(!!response.data);
//         setName(response.data.user.userName);
//       } catch (error) {
//         console.error("Auth verification failed:", error);
//         setIsAuth(false);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (authToken) {
//       verifyAuth();
//     } else {
//       setIsAuth(false);
//       setIsLoading(false);
//     }
//   }, [authToken]);

//   // Remove token from localStorage if isAuth becomes false
//   useEffect(() => {
//     if (isAuth === false) {
//       localStorage.removeItem("token");
//     }
//   }, [isAuth]);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         profileDropdownRef.current &&
//         !profileDropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsProfileDropdownOpen(false);
//       }

//       if (
//         searchBarRef.current &&
//         !searchBarRef.current.contains(event.target as Node)
//       ) {
        
//         setIsSearchOpened(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [profileDropdownRef, searchBarRef]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
  

//   const toggleLanguage = () => {
//     const newLanguage = language === 'en' ? 'ar' : 'en';
//     setLanguage(newLanguage);
//     localStorage.setItem('language', newLanguage);
//     window.location.reload();
// };


//   return (
//     <>
//       <div className="bg-[#404040] ">
//         {isAuth === true ? (
//           <>
//             {/* Notifications Dropdown */}
//             <div className="relative top-[70px] right-[860px]">
//               <PanelDropdown
//                 isOpen={isNotificationsOpen}
//                 onClose={() => setIsNotificationsOpen(false)}
//                 title="Notifications"
//                 Icon={HiBell}
//               >
//                 {loadingNotifications ? (
//                   <p className="text-gray-400 text-center">Loading...</p>
//                 ) : (
//                   <div className="space-y-3">
//                     {notifications.map((notification, index) => (
//                       <div key={index} className="flex space-x-2">
//                         <img
//                           src={three}
//                           alt="User Avatar"
//                           className="w-8 h-8 rounded-full"
//                         />
//                         <div className="flex-1">
//                           <p className="text-white text-sm">
//                             {notification.title}
//                           </p>
//                           <p className="text-gray-400 text-xs">
//                             {notification.description}
//                           </p>
//                           <p className="text-gray-400 text-xs">
//                             {new Date(notification.created_at).toLocaleString()}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                     {notifications.length === 0 && (
//                       <p className="text-gray-400 text-center">
//                         No new notifications
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </PanelDropdown>
//             </div>

//             {/* Messages Dropdown */}
//             <div className="relative top-[70px] right-[860px]">
//               <PanelDropdown
//                 isOpen={isMessagesOpen}
//                 onClose={() => setIsMessagesOpen(false)}
//                 title="Messages"
//                 Icon={HiOutlineMail}
//               >
//                 {loadingNotifications ? (
//                   <p className="text-gray-400 text-center">Loading...</p>
//                 ) : (
//                   <div className="space-y-3">
//                     {messages.map((message, index) => (
//                       <div key={index} className="flex space-x-2">
//                         <img
//                           src={three}
//                           alt="User Avatar"
//                           className="w-8 h-8 rounded-full"
//                         />
//                         <div className="flex-1">
//                           <p className="text-white text-sm">
//                             {message.title}
//                           </p>
//                           <p className="text-gray-400 text-xs">
//                             {message.description}
//                           </p>
//                           <p className="text-gray-400 text-xs">
//                             {new Date(message.created_at).toLocaleString()}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                     {messages.length === 0 && (
//                       <p className="text-gray-400 text-center">
//                         No new messages Yet!
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </PanelDropdown>
//             </div>

//             <Sidebar
//               isOpen={isSidebarOpen}
//               toggleSidebar={toggleSidebar}
//               isProjectsDropdownOpen={isProjectsDropdownOpen}
//               toggleProjectsDropdown={toggleProjectsDropdown}
//               isWorkLinkDropdownOpen={isWorkLinkDropdownOpen}
//               toggleWorkLinkDropdown={toggleWorkLinkDropdown}
//               isFollowUsDropdownOpen={isFollowUsDropdownOpen}
//               toggleFollowUsDropdown={toggleFollowUsDropdown}
//             />

//             {/* Header */}
//             <header className="bg-[#404040] text-white py-4 w-full z-20 fixed top-0">
//               <div className="container mx-auto flex justify-between items-center px-4">
//                 {/* Left Icons */}
//                 <div className="flex items-center space-x-4 md:space-x-6 z-20 text-white py-4">
//                   <div className="relative" ref={profileDropdownRef}>
//                     <button
//                       onClick={() =>
//                         setIsProfileDropdownOpen(!isProfileDropdownOpen)
//                       }
//                       className="focus:outline-none"
//                       aria-label="Toggle profile dropdown"
//                     >
//                       <HiOutlineUserCircle
//                         className={`absolute bottom-[-3px] right-[3px] h-7 w-7 ${
//                           isProfileDropdownOpen ? "text-orange-500" : ""
//                         }`}
//                       />
//                     </button>

//                     {isProfileDropdownOpen && (
//                       <div className="absolute left-0 mt-2 w-48 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-50">
//                         <div className="py-1">
//                           <DropdownItem
//                             to="/react/UserAccount"
//                             Icon={CgProfile}
//                             text={name}
//                             onClick={() => setIsProfileDropdownOpen(false)}
//                           />
//                           <DropdownItem
//                             to="/react/MyFavourites"
//                             Icon={AiOutlineHeart}
//                             text="My favourites"
//                             onClick={() => setIsProfileDropdownOpen(false)}
//                           />
//                           <Link
//                             to="/react/FinancialTransactions"
//                             className=" px-4 py-3 text-gray-300 hover:bg-gray-600 hover:text-white flex items-center"
//                           >
//                             <svg
//                               width="24"
//                               height="24"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <circle
//                                 cx="12"
//                                 cy="12"
//                                 r="10"
//                                 stroke="white"
//                                 stroke-width="1.5"
//                               />
//                               <path
//                                 d="M14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12"
//                                 stroke="white"
//                                 stroke-width="1.5"
//                                 stroke-linecap="round"
//                               />
//                               <path
//                                 d="M12 12C13.1046 12 14 12.8954 14 14C14 15.1046 13.1046 16 12 16C10.8954 16 10 15.1046 10 14"
//                                 stroke="white"
//                                 stroke-width="1.5"
//                                 stroke-linecap="round"
//                               />
//                               <path
//                                 d="M12 6.5V8"
//                                 stroke="white"
//                                 stroke-width="1.5"
//                                 stroke-linecap="round"
//                                 stroke-linejoin="round"
//                               />
//                               <path
//                                 d="M12 16V17.5"
//                                 stroke="white"
//                                 stroke-width="1.5"
//                                 stroke-linecap="round"
//                                 stroke-linejoin="round"
//                               />
//                             </svg>
//                             <span className="pl-2">Balance</span>
//                           </Link>
//                           <Link
//                             to="/react/SettingPage"
//                             className=" px-4 py-3 text-gray-300 hover:bg-gray-600 hover:text-white flex items-center"
//                           >
//                             <AiOutlineSetting className="inline-block mr-2 align-middle h-5 w-5" />
//                             Setting
//                           </Link>

//                           <div className="border-t border-gray-600 my-1"></div>
//                           <Link
//                             to="/react/EditAccountPage"
//                             className="block px-4 py-3 text-gray-300 hover:bg-gray-600 hover:text-white flex items-center"
//                           >
//                             <AiOutlineEdit className="inline-block mr-2 align-middle h-5 w-5" />
//                             Edit account
//                           </Link>
//                           <Link
//                             to="react/help"
//                             className="block px-4 py-3 text-gray-300 hover:bg-gray-600 hover:text-white flex items-center"
//                           >
//                             <AiOutlineQuestionCircle className="inline-block mr-2 align-middle h-5 w-5" />
//                             Help
//                           </Link>
//                           <Link
//                             to="/react"
//                             className="block px-4 py-3 text-gray-300 hover:bg-gray-600 hover:text-white flex items-center"
//                             onClick={() => {
//                               localStorage.removeItem("token");
//                               window.location.reload();
//                             }}
//                           >
//                             <AiOutlineLogout className="inline-block mr-2 align-middle h-5 w-5" />
//                             Sign out
//                           </Link>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Notifications and Messages Icons */}
//                   <button
//                     onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
//                     className="relative text-gray-300 hover:text-white focus:outline-none"
//                   >
//                     <HiBell
//                       className={`h-7 w-7 ${
//                         isNotificationsOpen ? "text-orange-500" : ""
//                       }`}
//                     />
//                     {notifications.length > 0 && (
//                       <span className="absolute top-[-3px] right-[-3px] bg-red-500 text-white text-xs rounded-full px-1 py-[2px]">
//                         {notifications.length}
//                       </span>
//                     )}
//                   </button>

//                   <button
//                     onClick={() => setIsMessagesOpen(!isMessagesOpen)}
//                     className="text-gray-300 hover:text-white focus:outline-none"
//                   >
//                     <HiOutlineMail
//                       className={`h-7 w-7 ${
//                         isMessagesOpen ? "text-orange-500" : ""
//                       }`}
//                     />
//                     {messages.length > 0 && (
//                       <span className="absolute top-[-3px] right-[-3px] bg-red-500 text-white text-xs rounded-full px-1 py-[2px]">
//                         {messages.length}
//                       </span>
//                     )}
//                   </button>

//                   {/* Search Bar */}
//                   <div className="relative" ref={searchBarRef}>
//                     <button
//                       onClick={() => setIsSearchOpened(!isSearchOpened)}
//                       className="focus:outline-none"
//                       aria-label="Toggle search dropdown"
//                     >
//                       <HiOutlineSearch
//                         className={`h-7 w-7 ${
//                           isSearchOpened ? "text-orange-500" : ""
//                         }`}
//                       />
//                     </button>

//                     {isSearchOpened && (
//                       <div className="absolute left-[-185px] mt-8 overflow-hidden w-[1400px] bg-gray-700 border border-gray-600 rounded-md shadow-lg z-50">
//                         <div className="relative">
//                           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                             <HiOutlineSearch className="text-gray-500 h-5 w-5" />
//                           </div>
//                           <input
//                             type="text"
//                             id="search-bar"
//                             className="block w-full p-2 pl-10 text-sm text-white border border-gray-600 rounded-md bg-gray-700 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
//                             placeholder="Search about ..."
//                           />
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Right Logo and Mobile Menu */}
//                 <div className="flex items-center space-x-4">
//                   <nav className="hidden md:flex space-x-8 items-center">
//                   <button onClick={toggleLanguage} className="flex items-center text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200">
//                     <BsGlobe className="h-4 w-4 mr-1" />
//                     {language === "en" ? "العربية" : "English"}
//                   </button>
//                     <Link
//                       to="/react/FreelancerList"
//                       className="text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200"
//                     >
//                       Freelancers
//                     </Link>
//                     <Link
//                       to="/react/OpenProjects"
//                       className="text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200"
//                     >
//                       Projects
//                     </Link>
//                     <Link
//                       to="/react/ServiceListingPage"
//                       className="text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200"
//                     >
//                       Services
//                     </Link>
//                   </nav>
//                   <div className="flex items-center">
//                     <Link to="/react/ControlPanel">
//                       <img src={logo} alt="Logo" className="h-8 w-auto" />
//                     </Link>
//                   </div>
//                   <div>
//                     <div>
//                       <button
//                         onClick={toggleSidebar}
//                         className="p-2 mt-3 hover:text-orange-500 transition-colors"
//                       >
//                         <svg
//                           width="30"
//                           height="24"
//                           viewBox="0 0 24 16"
//                           fill="white"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path d="M0 16V13.3333H24V16H0ZM0 9.33333V6.66667H24V9.33333H0ZM0 2.66667V0H24V2.66667H0Z" />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </header>

//             {/* Mobile Menu */}
//             {isMobileMenuOpen && (
//               <div className="md:hidden bg-gray-700 py-4 fixed top-0 left-0 w-full h-full z-50">
//                 <button
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="absolute top-4 right-4 text-gray-300 hover:text-white"
//                   aria-label="Close mobile menu"
//                 >
//                   <HiX className="h-6 w-6" />
//                 </button>
//                 <div className="container mx-auto flex flex-col space-y-2 mt-16 px-4">
//                   <button className="flex items-center text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200">
//                     <BsGlobe className="h-4 w-4 mr-1" />
//                     العربية
//                   </button>
//                   <Link
//                     to="/react/FreelancerList"
//                     className="block text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200"
//                   >
//                     Freelancers
//                   </Link>
//                   <Link
//                     to="/react/OpenProjects"
//                     className="block text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200"
//                   >
//                     Projects
//                   </Link>
//                   <Link
//                     to="/react/ServiceListingPage"
//                     className="block text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200"
//                   >
//                     Services
//                   </Link>
//                   {!isAuth && (
//                     <>
//                       <Link to="/react/signin">
//                         <button className="bg-transparent border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition-colors duration-200 block w-full text-center py-3 rounded-md hover:bg-gray-600 transition-colors duration-200">
//                           Sign in
//                         </button>
//                       </Link>
//                       <Link to="/react/joinUs">
//                         <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-200 block w-full text-center py-3 rounded-md hover:bg-gray-600 transition-colors duration-200">
//                           Join
//                         </button>
//                       </Link>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}
//           </>
//         ) : (
//                     <>
//                       {/* Unauthenticated Header */}
//                       <header className="bg-[#404040]  z-20 text-white py-4">
//                         <div className="container mx-auto flex justify-between items-center">
//                           <div className="flex items-center">
//                             <Link to="/react">
//                               <img src={logo} alt="Logo" className="h-8 w-auto mr-2" />
//                             </Link>
//                           </div>
          
//                           <nav className="hidden md:flex space-x-8 items-center">
//                           <button onClick={toggleLanguage} className="flex items-center text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200">
//                     <BsGlobe className="h-4 w-4 mr-1" />
//                     {language === "en" ? "العربية" : "English"}
//                   </button>
//                             <Link
//                               to="/react/FreelancerList"
//                               className="text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200"
//                             >
//                               Freelancers
//                             </Link>
//                             <Link
//                               to="/react/OpenProjects"
//                               className="text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200"
//                             >
//                               Projects
//                             </Link>
//                             <Link
//                               to="/react/ServiceListingPage"
//                               className="text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200"
//                             >
//                               Services
//                             </Link>
          
//                             <Link to="/react/signin">
//                               <button className="bg-transparent border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition-colors duration-200">
//                                 Sign in
//                               </button>
//                             </Link>
//                             <Link to="/react/joinUs">
//                               <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-200">
//                                 Join
//                               </button>
//                             </Link>
//                           </nav>
          
//                           <button
//                             className="md:hidden text-gray-300 hover:text-white focus:outline-none focus:text-white"
//                             aria-label="Toggle navigation"
//                             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                           >
//                             <HiMenu className="h-6 w-6" />
//                           </button>
//                         </div>
          
//                         {/* Mobile Menu */}
//                         {isMobileMenuOpen && (
//                           <div className="md:hidden bg-gray-700 py-4">
//                             <div className="container mx-auto flex flex-col space-y-2">
//                               <button className="flex items-center text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200">
//                                 <BsGlobe className="h-4 w-4 mr-1" />
//                                 العربية
//                               </button>
//                               <Link
//                                 to="/FreelancerList"
//                                 className="block text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200"
//                               >
//                                 Freelancers
//                               </Link>
//                               <Link
//                                 to="/OpenProjects"
//                                 className="block text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200"
//                               >
//                                 Projects
//                               </Link>
//                               <Link
//                                 to="/ServiceListingPage"
//                                 className="block text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200"
//                               >
//                                 Services
//                               </Link>
//                               <Link to="/react/signin">
//                                 <button className="bg-transparent border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition-colors duration-200">
//                                   Sign in
//                                 </button>
//                               </Link>
//                               <Link to="/react/joinUs">
//                                 <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-200">
//                                   Join
//                                 </button>
//                               </Link>
//                             </div>
//                           </div>
//                         )}
//                       </header>
//                     </>
//                   )}
//       </div>
//     </>
//   );
// };

// export default Header;


import React, { useState, useRef, useEffect } from "react";
import { BsGlobe } from "react-icons/bs";
import logo from "../assets/worklink_logo_1-removebg-preview 1.png";
import axios from "axios";
import {
  HiOutlineUserCircle,
  HiBell,
  HiOutlineMail,
  HiOutlineSearch,
  HiMenu,
  HiX,
} from "react-icons/hi";
import three from "../assets/Screenshot 2025-02-10 153936.png";
import {
  AiOutlineQuestionCircle,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineEdit,
  AiOutlineHeart,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlinePlus,
  AiOutlineShoppingCart,
  AiOutlineProject,
  AiOutlineCaretDown,
  AiOutlineLink,
  AiOutlineLock,
} from "react-icons/ai";
import { FaUsers } from "react-icons/fa";

// Fixed Sidebar Component

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  isProjectsDropdownOpen: boolean;
  toggleProjectsDropdown: () => void;
  isWorkLinkDropdownOpen: boolean;
  toggleWorkLinkDropdown: () => void;
  isFollowUsDropdownOpen: boolean;
  toggleFollowUsDropdown: () => void;
}


const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  isProjectsDropdownOpen,
  toggleProjectsDropdown,
  isWorkLinkDropdownOpen,
  toggleWorkLinkDropdown,
  isFollowUsDropdownOpen,
  toggleFollowUsDropdown,
}) => {
  const navigate = useNavigate();
  const [sidebarSearchQuery, setSidebarSearchQuery] = useState(''); // State for sidebar search query

  const handleNavLinkClick = () => {
    toggleSidebar(); // Close sidebar when a link is clicked
  };

  const handleProjectCategoryClick = (category: string) => {
    localStorage.setItem('query', category);
    navigate(`/react/OpenProjects`);
    window.location.reload();
    handleNavLinkClick(); // Close sidebar after navigation
  };

  const handleSidebarSearchSubmit = () => {
    if (sidebarSearchQuery) {
      localStorage.setItem('searchQuery', sidebarSearchQuery);
      navigate('/react/SearchResults');
      handleNavLinkClick(); // Close sidebar after navigation
    }
  };


  return (
    <>
      <div
        className={` fixed top-0 left-0 w-64 h-[calc(100vh)] bg-[#404040] scrollbar-hide text-white shadow-lg p-4 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-white hover:text-orange-500"
        >
          {/* <HiX className="h-6 w-6" /> */}
        </button>

        <div className="relative mb-4 mt-2 px-2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <HiOutlineSearch className="text-gray-500 h-5 w-5" />
          </div>
          <input
            type="text"
            className="block w-full p-2 pl-10 text-sm text-white border border-gray-600 rounded-lg bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search..."
            value={sidebarSearchQuery} // Controlled input for sidebar search
            onChange={(e) => setSidebarSearchQuery(e.target.value)} // Update sidebar search query state
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSidebarSearchSubmit(); // Handle sidebar search on Enter
              }
            }}
          />
        </div>

        <nav className="space-y-2 px-2">
          <Link
            to="/react/AddProjectForm"
            className="flex items-center text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
            onClick={handleNavLinkClick}
          >
            <AiOutlinePlus className="mr-2 h-5 w-5" />
            Add a project
          </Link>
          <Link
            to="/react/ServiceListingPage"
            className="flex items-center text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
            onClick={handleNavLinkClick}
          >
            <AiOutlineShoppingCart className="mr-2 h-5 w-5" />
            Services
          </Link>
          <Link
            to="/react/FreelancerList"
            className="flex items-center text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
            onClick={handleNavLinkClick}
          >
            <FaUsers className="mr-2 h-5 w-5" />
            Freelancers
          </Link>

          {/* Projects Dropdown */}
          <div className="relative">
            <button
              onClick={toggleProjectsDropdown}
              className="flex items-center justify-between w-full text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
            >
              <span className="flex items-center">
                <AiOutlineProject className="mr-2 h-5 w-5" />
                Projects
              </span>
              <AiOutlineCaretDown
                className={`transform transition-transform ${
                  isProjectsDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isProjectsDropdownOpen && (
              <div className="ml-4 mt-1 space-y-1">
                <button
                  onClick={() => handleProjectCategoryClick('Business')}
                  className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200 w-full text-left"
                >
                  Business
                </button>
                <button
                  onClick={() => handleProjectCategoryClick('Programming')}
                  className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200 w-full text-left"
                >
                  Programming
                </button>
                <button
                  onClick={() => handleProjectCategoryClick('Engineering & Architecture')}
                  className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200 w-full text-left"
                >
                  Engineering & Architecture
                </button>
                <button
                  onClick={() => handleProjectCategoryClick('Design')}
                  className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200 w-full text-left"
                >
                  Design
                </button>
                <button
                  onClick={() => handleProjectCategoryClick('Marketing')}
                  className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200 w-full text-left"
                >
                  Marketing
                </button>
                <button
                  onClick={() => handleProjectCategoryClick('Writing & Translation')}
                  className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200 w-full text-left"
                >
                  Writing & Translation
                </button>
              </div>
            )}
          </div>

          {/* Work Link Dropdown */}
          <div className="relative">
            <button
              onClick={toggleWorkLinkDropdown}
              className="flex items-center justify-between w-full text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
            >
              <span className="flex items-center">
                <AiOutlineLink className="mr-2 h-5 w-5" />
                Work Link
              </span>
              <AiOutlineCaretDown
                className={`transform transition-transform ${
                  isWorkLinkDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isWorkLinkDropdownOpen && (
              <div className="ml-4 mt-1 space-y-1">
                <Link
                  to="/react/FrequentlyAskedQuestionsPage"
                  className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
                  onClick={handleNavLinkClick}
                >
                  FAQ
                </Link>
                <Link
                  to="/react/GuaranteeYourRightsPage"
                  className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
                  onClick={handleNavLinkClick}
                >
                  Guarantee Your Rights
                </Link>
                <Link
                  to="/react/TermsOfUsePage"
                  className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
                  onClick={handleNavLinkClick}
                >
                  Terms of Use
                </Link>
                <Link
                  to="/react/PrivacyStatementPage"
                  className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
                  onClick={handleNavLinkClick}
                >
                  Privacy Statement
                </Link>
              </div>
            )}
          </div>

          {/* Follow Us Dropdown */}
          <div className="relative">
            <button
              onClick={toggleFollowUsDropdown}
              className="flex items-center justify-between w-full text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
            >
              <span className="flex items-center">
                <AiOutlineLock className="mr-2 h-5 w-5" />
                Follow Us
              </span>
              <AiOutlineCaretDown
                className={`transform transition-transform ${
                  isFollowUsDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isFollowUsDropdownOpen && (
              <div className="ml-4 mt-1 space-y-1">
                <a
                  href="#"
                  className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
                  onClick={handleNavLinkClick}
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-400 hover:text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
                  onClick={handleNavLinkClick}
                >
                  Twitter
                </a>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Overlay with proper z-index */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
      </>
  )
}



// Reusable Dropdown Item Component
const DropdownItem = ({ to, Icon, text, onClick }: any) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-4 py-3 text-gray-300 hover:bg-gray-600 hover:text-white flex items-center"
  >
    <Icon className="inline-block mr-2 align-middle h-5 w-5" />
    {text}
  </Link>
);

// Notifications and Messages Panel Component
interface PanelDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  Icon: React.ComponentType<any>;
  children: React.ReactNode;
}

const PanelDropdown: React.FC<PanelDropdownProps> = ({
  isOpen,
  onClose,
  title,
  Icon,
  children,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    isOpen && (
      <div
        ref={dropdownRef}
        className="absolute right-0 mt-2 w-full md:w-96 bg-[#404040] rounded-md shadow-lg z-50"
      >
        <div className="flex items-center border-b border-gray-600 pb-2 mb-2 p-4">
          <Icon className="text-gray-300 h-5 w-5 mr-2" />
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <div className="p-6">{children}</div>
      </div>
    )
  );
};

const Header = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const authToken = localStorage.getItem("token");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSearchOpened, setIsSearchOpened] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [searchQuery, setSearchQuery] = useState(''); // State for header search query
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);

  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [isWorkLinkDropdownOpen, setIsWorkLinkDropdownOpen] = useState(false);
  const [isFollowUsDropdownOpen, setIsFollowUsDropdownOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>(
    localStorage.getItem('language') === 'ar' ? 'ar' : 'en'
);

  const toggleProjectsDropdown = () =>
    setIsProjectsDropdownOpen(!isProjectsDropdownOpen);
  const toggleWorkLinkDropdown = () =>
    setIsWorkLinkDropdownOpen(!isWorkLinkDropdownOpen);
  const toggleFollowUsDropdown = () =>
    setIsFollowUsDropdownOpen(!isFollowUsDropdownOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Fetch Notifications and Messages
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/notification`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const data = response.data.data;
        const notifications = data.filter((item: any) => item.type === "notification");
        const messages = data.filter((item: any) => item.type === "mail");

        setNotifications(notifications);
        setMessages(messages);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoadingNotifications(false);
      }
    };

    if (authToken) {
      fetchNotifications();
    }
  }, [authToken]);

  // Verify Authentication
  useEffect(() => {
    const verifyAuth = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACK_URL}/verifyAuth`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${authToken}`,
            },
          }
        );
        console.log(response);


        setIsAuth(!!response.data);
        setName(response.data.user.userName);
      } catch (error) {
        console.error("Auth verification failed:", error);
        setIsAuth(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (authToken) {
      verifyAuth();
    } else {
      setIsAuth(false);
      setIsLoading(false);
    }
  }, [authToken]);

  // Remove token from localStorage if isAuth becomes false
  useEffect(() => {
    if (isAuth === false) {
      localStorage.removeItem("token");
    }
  }, [isAuth]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }

      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {

        setIsSearchOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileDropdownRef, searchBarRef]);

  if (isLoading) {
    return <div>Loading...</div>;
  }


  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    window.location.reload();
};

  const handleHeaderSearchSubmit = () => {
    if (searchQuery) {
      localStorage.setItem('searchQuery', searchQuery);
      setIsSearchOpened(false);
      navigate('/react/SearchResults');
    }
  };


  return (
    <>
      <div className="bg-[#404040] ">
        {isAuth === true ? (
          <>
            {/* Notifications Dropdown */}
            <div className="relative top-[70px] right-[860px]">
              <PanelDropdown
                isOpen={isNotificationsOpen}
                onClose={() => setIsNotificationsOpen(false)}
                title="Notifications"
                Icon={HiBell}
              >
                {loadingNotifications ? (
                  <p className="text-gray-400 text-center">Loading...</p>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((notification, index) => (
                      <div key={index} className="flex space-x-2">
                        <img
                          src={three}
                          alt="User Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <p className="text-white text-sm">
                            {notification.title}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {notification.description}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {new Date(notification.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {notifications.length === 0 && (
                      <p className="text-gray-400 text-center">
                        No new notifications
                      </p>
                    )}
                  </div>
                )}
              </PanelDropdown>
            </div>

            {/* Messages Dropdown */}
            <div className="relative top-[70px] right-[860px]">
              <PanelDropdown
                isOpen={isMessagesOpen}
                onClose={() => setIsMessagesOpen(false)}
                title="Messages"
                Icon={HiOutlineMail}
              >
                {loadingNotifications ? (
                  <p className="text-gray-400 text-center">Loading...</p>
                ) : (
                  <div className="space-y-3">
                    {messages.map((message, index) => (
                      <div key={index} className="flex space-x-2">
                        <img
                          src={three}
                          alt="User Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <p className="text-white text-sm">
                            {message.title}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {message.description}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {new Date(message.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {messages.length === 0 && (
                      <p className="text-gray-400 text-center">
                        No new messages Yet!
                      </p>
                    )}
                  </div>
                )}
              </PanelDropdown>
            </div>

            <Sidebar
              isOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              isProjectsDropdownOpen={isProjectsDropdownOpen}
              toggleProjectsDropdown={toggleProjectsDropdown}
              isWorkLinkDropdownOpen={isWorkLinkDropdownOpen}
              toggleWorkLinkDropdown={toggleWorkLinkDropdown}
              isFollowUsDropdownOpen={isFollowUsDropdownOpen}
              toggleFollowUsDropdown={toggleFollowUsDropdown}
            />

            {/* Header */}
            <header className="bg-[#404040] text-white py-4 w-full z-20 fixed top-0">
              <div className="container mx-auto flex justify-between items-center px-4">
                {/* Left Icons */}
                <div className="flex items-center space-x-4 md:space-x-6 z-20 text-white py-4">
                  <div className="relative" ref={profileDropdownRef}>
                    <button
                      onClick={() =>
                        setIsProfileDropdownOpen(!isProfileDropdownOpen)
                      }
                      className="focus:outline-none"
                      aria-label="Toggle profile dropdown"
                    >
                      <HiOutlineUserCircle
                        className={`absolute bottom-[-3px] right-[3px] h-7 w-7 ${
                          isProfileDropdownOpen ? "text-orange-500" : ""
                        }`}
                      />
                    </button>

                    {isProfileDropdownOpen && (
                      <div className="absolute left-0 mt-2 w-48 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-50">
                        <div className="py-1">
                          <DropdownItem
                            to="/react/UserAccount"
                            Icon={CgProfile}
                            text={name}
                            onClick={() => setIsProfileDropdownOpen(false)}
                          />
                          <DropdownItem
                            to="/react/MyFavourites"
                            Icon={AiOutlineHeart}
                            text="My favourites"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          />
                          <Link
                            to="/react/FinancialTransactions"
                            className=" px-4 py-3 text-gray-300 hover:bg-gray-600 hover:text-white flex items-center"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="white"
                                stroke-width="1.5"
                              />
                              <path
                                d="M14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              />
                              <path
                                d="M12 12C13.1046 12 14 12.8954 14 14C14 15.1046 13.1046 16 12 16C10.8954 16 10 15.1046 10 14"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              />
                              <path
                                d="M12 6.5V8"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M12 16V17.5"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            <span className="pl-2">Balance</span>
                          </Link>
                          <Link
                            to="/react/SettingPage"
                            className=" px-4 py-3 text-gray-300 hover:bg-gray-600 hover:text-white flex items-center"
                          >
                            <AiOutlineSetting className="inline-block mr-2 align-middle h-5 w-5" />
                            Setting
                          </Link>

                          <div className="border-t border-gray-600 my-1"></div>
                          <Link
                            to="/react/EditAccountPage"
                            className="block px-4 py-3 text-gray-300 hover:bg-gray-600 hover:text-white flex items-center"
                          >
                            <AiOutlineEdit className="inline-block mr-2 align-middle h-5 w-5" />
                            Edit account
                          </Link>
                          <Link
                            to="react/help"
                            className="block px-4 py-3 text-gray-300 hover:bg-gray-600 hover:text-white flex items-center"
                          >
                            <AiOutlineQuestionCircle className="inline-block mr-2 align-middle h-5 w-5" />
                            Help
                          </Link>
                          <Link
                            to="/react"
                            className="block px-4 py-3 text-gray-300 hover:bg-gray-600 hover:text-white flex items-center"
                            onClick={() => {
                              localStorage.removeItem("token");
                              window.location.reload();
                            }}
                          >
                            <AiOutlineLogout className="inline-block mr-2 align-middle h-5 w-5" />
                            Sign out
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Notifications and Messages Icons */}
                  <button
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="relative text-gray-300 hover:text-white focus:outline-none"
                  >
                    <HiBell
                      className={`h-7 w-7 ${
                        isNotificationsOpen ? "text-orange-500" : ""
                      }`}
                    />
                    {notifications.length > 0 && (
                      <span className="absolute top-[-3px] right-[-3px] bg-red-500 text-white text-xs rounded-full px-1 py-[2px]">
                        {notifications.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setIsMessagesOpen(!isMessagesOpen)}
                    className="text-gray-300 hover:text-white focus:outline-none"
                  >
                    <HiOutlineMail
                      className={`h-7 w-7 ${
                        isMessagesOpen ? "text-orange-500" : ""
                      }`}
                    />
                    {messages.length > 0 && (
                      <span className="absolute top-[-3px] right-[-3px] bg-red-500 text-white text-xs rounded-full px-1 py-[2px]">
                        {messages.length}
                      </span>
                    )}
                  </button>

                  {/* Search Bar */}
                  <div className="relative" ref={searchBarRef}>
                    <button
                      onClick={() => setIsSearchOpened(!isSearchOpened)}
                      className="focus:outline-none"
                      aria-label="Toggle search dropdown"
                    >
                      <HiOutlineSearch
                        className={`h-7 w-7 ${
                          isSearchOpened ? "text-orange-500" : ""
                        }`}
                      />
                    </button>

                    {isSearchOpened && (
                      <div className="absolute left-[-185px] mt-8 overflow-hidden w-[1400px] bg-gray-700 border border-gray-600 rounded-md shadow-lg z-50">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <HiOutlineSearch className="text-gray-500 h-5 w-5" />
                          </div>
                          <input
                            type="text"
                            id="search-bar"
                            className="block w-full p-2 pl-10 text-sm text-white border border-gray-600 rounded-md bg-gray-700 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                            placeholder="Search about ..."
                            value={searchQuery} // Controlled input
                            onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
                            onKeyDown={(e) => { // Handle Enter key press
                              if (e.key === 'Enter') {
                                handleHeaderSearchSubmit();
                              }
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Logo and Mobile Menu */}
                <div className="flex items-center space-x-4">
                  <nav className="hidden md:flex space-x-8 items-center">
                  <button onClick={toggleLanguage} className="flex items-center text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200">
                    <BsGlobe className="h-4 w-4 mr-1" />
                    {language === "en" ? "العربية" : "English"}
                  </button>
                    <Link
                      to="/react/FreelancerList"
                      className="text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200"
                    >
                      Freelancers
                    </Link>
                    <Link
                      to="/react/OpenProjects"
                      className="text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200"
                    >
                      Projects
                    </Link>
                    <Link
                      to="/react/ServiceListingPage"
                      className="text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200"
                    >
                      Services
                    </Link>
                  </nav>
                  <div className="flex items-center">
                    <Link to="/react/ControlPanel">
                      <img src={logo} alt="Logo" className="h-8 w-auto" />
                    </Link>
                  </div>
                  <div>
                    <div>
                      <button
                        onClick={toggleSidebar}
                        className="p-2 mt-3 hover:text-orange-500 transition-colors"
                      >
                        <svg
                          width="30"
                          height="24"
                          viewBox="0 0 24 16"
                          fill="white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 16V13.3333H24V16H0ZM0 9.33333V6.66667H24V9.33333H0ZM0 2.66667V0H24V2.66667H0Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden bg-gray-700 py-4 fixed top-0 left-0 w-full h-full z-50">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-4 right-4 text-gray-300 hover:text-white"
                  aria-label="Close mobile menu"
                >
                  <HiX className="h-6 w-6" />
                </button>
                <div className="container mx-auto flex flex-col space-y-2 mt-16 px-4">
                  <button className="flex items-center text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200">
                    <BsGlobe className="h-4 w-4 mr-1" />
                    العربية
                  </button>
                  <Link
                    to="/react/FreelancerList"
                    className="block text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200"
                  >
                    Freelancers
                  </Link>
                  <Link
                    to="/react/OpenProjects"
                    className="block text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200"
                  >
                    Projects
                  </Link>
                  <Link
                    to="/react/ServiceListingPage"
                    className="block text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200"
                  >
                    Services
                  </Link>
                  {!isAuth && (
                    <>
                      <Link to="/react/signin">
                        <button className="bg-transparent border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition-colors duration-200 block w-full text-center py-3 rounded-md hover:bg-gray-600 transition-colors duration-200">
                          Sign in
                        </button>
                      </Link>
                      <Link to="/react/joinUs">
                        <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-200 block w-full text-center py-3 rounded-md hover:bg-gray-600 transition-colors duration-200">
                          Join
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
                    <>
                      {/* Unauthenticated Header */}
                      <header className="bg-[#404040]  z-20 text-white py-4">
                        <div className="container mx-auto flex justify-between items-center">
                          <div className="flex items-center">
                            <Link to="/react">
                              <img src={logo} alt="Logo" className="h-8 w-auto mr-2" />
                            </Link>
                          </div>

                          <nav className="hidden md:flex space-x-8 items-center">
                          <button onClick={toggleLanguage} className="flex items-center text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200">
                    <BsGlobe className="h-4 w-4 mr-1" />
                    {language === "en" ? "العربية" : "English"}
                  </button>
                            <Link
                              to="/react/FreelancerList"
                              className="text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200"
                            >
                              Freelancers
                            </Link>
                            <Link
                              to="/react/OpenProjects"
                              className="text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200"
                            >
                              Projects
                            </Link>
                            <Link
                              to="/react/ServiceListingPage"
                              className="text-gray-300 hover:text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200"
                            >
                              Services
                            </Link>

                            <Link to="/react/signin">
                              <button className="bg-transparent border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition-colors duration-200">
                                Sign in
                              </button>
                            </Link>
                            <Link to="/react/joinUs">
                              <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-200">
                                Join
                              </button>
                            </Link>
                          </nav>

                          <button
                            className="md:hidden text-gray-300 hover:text-white focus:outline-none focus:text-white"
                            aria-label="Toggle navigation"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                          >
                            <HiMenu className="h-6 w-6" />
                          </button>
                        </div>

                        {/* Mobile Menu */}
                        {isMobileMenuOpen && (
                          <div className="md:hidden bg-gray-700 py-4">
                            <div className="container mx-auto flex flex-col space-y-2">
                              <button className="flex items-center text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200">
                                <BsGlobe className="h-4 w-4 mr-1" />
                                العربية
                              </button>
                              <Link
                                to="/FreelancerList"
                                className="block text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200"
                              >
                                Freelancers
                              </Link>
                              <Link
                                to="/OpenProjects"
                                className="block text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200"
                              >
                                Projects
                              </Link>
                              <Link
                                to="/ServiceListingPage"
                                className="block text-gray-300 hover:text-white px-4 py-3 rounded-md hover:bg-gray-600 transition-colors duration-200"
                              >
                                Services
                              </Link>
                              <Link to="/react/signin">
                                <button className="bg-transparent border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition-colors duration-200">
                                  Sign in
                                </button>
                              </Link>
                              <Link to="/react/joinUs">
                                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-200">
                                  Join
                                </button>
                              </Link>
                            </div>
                          </div>
                        )}
                      </header>
                    </>
                  )}
      </div>
    </>
  );
};

export default Header;