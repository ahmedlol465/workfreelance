// // import { useState } from "react";
// // import { useForm, SubmitHandler } from "react-hook-form";
// // import { AxiosError } from "axios";
// // import { FcGoogle } from "react-icons/fc";
// // import { FaLinkedin } from "react-icons/fa";
// // import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
// // import joinUs from "../assets/joinUs.png";
// // import { useNavigate } from "react-router-dom";
// // import { useGoogleLogin } from "@react-oauth/google";
// // import { useLinkedIn } from "react-linkedin-login-oauth2";
// // import axios from "axios"; // Make sure axios is imported if not already

// // // Define the form data type
// // type FormData = {
// //   firstName: string;
// //   lastName: string;
// //   email: string;
// //   password: string;
// // };

// // const JoinUsPage = () => {
// //   const navigate = useNavigate();
// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //     setError,
// //   } = useForm<FormData>();

// //   const [serverError, setServerError] = useState<string | null>(null);

// //   // Google Login Integration
// //   const googleLogin = useGoogleLogin({
// //     onSuccess: async (tokenResponse) => {
// //       try {
// //         const userInfoResponse = await fetch(
// //           "https://www.googleapis.com/oauth2/v3/userinfo",
// //           {
// //             headers: {
// //               Authorization: `Bearer ${tokenResponse.access_token}`,
// //             },
// //           }
// //         );

// //         if (userInfoResponse.ok) {
// //           const userInfo = await userInfoResponse.json();
// //           handleSocialLogin("google", userInfo); // Call social login handler
// //         } else {
// //           console.error(
// //             "Failed to fetch user info from Google Userinfo API:",
// //             userInfoResponse.status,
// //             userInfoResponse.statusText
// //           );
// //           setServerError(
// //             "Google Login failed: Could not fetch user information."
// //           );
// //         }
// //       } catch (error) {
// //         console.error("Error fetching user info from Google:", error);
// //         setServerError("Google Login failed: Error fetching user information.");
// //       }
// //     },
// //     onError: (error) => {
// //       console.error("Google Login failed:", error);
// //       setServerError("Google Login failed.");
// //     },
// //   });

// //   // LinkedIn Login Integration
// //   const { linkedInLogin } = useLinkedIn({
// //     clientId: process.env.REACT_APP_LINKEDIN_CLIENT_ID!,
// //     redirectUri: window.location.origin, // Use current origin for redirect URI
// //     onSuccess: async (codeResponse: any) => {
// //       try {
// //         // LinkedIn requires exchanging code for token on backend for security
// //         const response = await axios.post("/api/linkedin-login", {
// //           // Backend endpoint to handle LinkedIn login
// //           code: codeResponse.code,
// //         });
// //         handleSocialLogin("linkedin", response.data.user); // Assuming backend returns user info
// //       } catch (error: any) {
// //         console.error("LinkedIn Login Error:", error);
// //         setServerError("LinkedIn Login failed.");
// //       }
// //     },
// //     onError: (error) => {
// //       console.error("LinkedIn Login Error:", error);
// //       setServerError("LinkedIn Login failed.");
// //     },
// //   });

// //   // Generic Social Login Handler
// //   const handleSocialLogin = async (
// //     provider: "google" | "linkedin",
// //     userInfo: any
// //   ) => {
// //     try {
// //       const response = await axios.post("/api/social-login", {
// //         // Backend endpoint to check/create user
// //         provider: provider,
// //         userInfo: userInfo,
// //       });

// //       localStorage.setItem("token", response.data.token); // Assuming backend returns token on successful login/register
// //       navigate("/react/Dashboard"); // Redirect to dashboard
// //     } catch (error: any) {
// //       if (error.response && error.response.status === 404) {
// //         // User not found, redirect to account setup with basic info
// //         localStorage.setItem(
// //           "basicUserInfo",
// //           JSON.stringify({
// //             email: userInfo.email, // Or appropriate email field from userInfo
// //             firstName: userInfo.given_name || userInfo.firstName, // Adjust based on provider response
// //             lastName: userInfo.family_name || userInfo.lastName,
// //             socialProvider: provider,
// //           })
// //         );
// //         navigate("/react/accountSetup");
// //       } else {
// //         console.error("Social Login Error:", error);
// //         setServerError("Social login failed. Please try again.");
// //       }
// //     }
// //   };

// //   const onSubmit: SubmitHandler<FormData> = async (data) => {
// //     try {
// //       // Save the basic user info to localStorage for manual registration
// //       localStorage.setItem(
// //         "basicUserInfo",
// //         JSON.stringify({
// //           ...data,
// //           socialProvider: "email", // Indicate manual registration
// //         })
// //       );

// //       // Redirect to the AccountData component
// //       navigate("/react/accountSetup");
// //     } catch (error) {
// //       const axiosError = error as AxiosError<{
// //         message: string;
// //         errors?: Record<string, string[]>;
// //       }>;
// //       if (axiosError.response) {
// //         if (axiosError.response.data.errors) {
// //           Object.entries(axiosError.response.data.errors).forEach(
// //             ([field, messages]) => {
// //               setError(field as keyof FormData, {
// //                 type: "server",
// //                 message: messages.join(", "),
// //               });
// //             }
// //           );
// //         } else {
// //           setServerError(axiosError.response.data.message);
// //         }
// //       } else {
// //         setServerError("An error occurred. Please try again later.");
// //       }
// //     }
// //   };

// //   return (
// //     <div className="bg-gray-50 py-16 md:py-20">
// //       <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6 text-gray-800">
// //         Join Us
// //       </h2>

// //       <div className="container mx-auto bg-white rounded-lg shadow-xl overflow-hidden md:flex md:space-x-8">
// //         {/* Left Section */}
// //         <div className="md:w-1/2 px-8 py-8 md:py-16">
// //           {/* Social Media Sign-In Buttons */}
// //           <div className="gap-10 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
// //             <button
// //               type="button" // Important to prevent form submission
// //               onClick={() => googleLogin()}
// //               className=" flex items-center justify-center bg-red-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md"
// //             >
// //               <FcGoogle className="m-3 mr-2 text-2xl" />
// //               Join by Google
// //             </button>
// //             <button
// //               type="button" // Important to prevent form submission
// //               onClick={() => linkedInLogin()}
// //               className=" flex items-center justify-center bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
// //             >
// //               <FaLinkedin className="mr-2 text-xl" />
// //               Join by Linkedin
// //             </button>
// //           </div>

// //           {/* OR Divider */}
// //           <div className="flex items-center justify-center my-4">
// //             <div className="border-t border-gray-300 flex-grow"></div>
// //             <span className="mx-4 text-gray-500 font-semibold">OR</span>
// //             <div className="border-t border-gray-300 flex-grow"></div>
// //           </div>

// //           {/* Form */}
// //           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
// //             {/* ... (rest of your existing form for manual registration - First Name, Last Name, Email, Password) ... */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div>
// //                 <label
// //                   htmlFor="firstName"
// //                   className="block text-gray-700 text-sm font-semibold mb-1"
// //                 >
// //                   First Name
// //                 </label>
// //                 <input
// //                   type="text"
// //                   id="firstName"
// //                   placeholder="Enter your first name"
// //                   className={`w-full px-4 py-3 border ${
// //                     errors.firstName ? "border-red-500" : "border-gray-300"
// //                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
// //                   {...register("firstName", {
// //                     required: "First name is required",
// //                   })}
// //                 />
// //                 {errors.firstName && (
// //                   <p className="text-red-500 text-sm mt-1">
// //                     {errors.firstName.message}
// //                   </p>
// //                 )}
// //               </div>
// //               <div>
// //                 <label
// //                   htmlFor="lastName"
// //                   className="block text-gray-700 text-sm font-semibold mb-1"
// //                 >
// //                   Last Name
// //                 </label>
// //                 <input
// //                   type="text"
// //                   id="lastName"
// //                   placeholder="Enter your last name"
// //                   className={`w-full px-4 py-3 border ${
// //                     errors.lastName ? "border-red-500" : "border-gray-300"
// //                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
// //                   {...register("lastName", {
// //                     required: "Last name is required",
// //                   })}
// //                 />
// //                 {errors.lastName && (
// //                   <p className="text-red-500 text-sm mt-1">
// //                     {errors.lastName.message}
// //                   </p>
// //                 )}
// //               </div>
// //             </div>

// //             <div>
// //               <label
// //                 htmlFor="email"
// //                 className="block text-gray-700 text-sm font-semibold mb-1"
// //               >
// //                 Email
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   type="email"
// //                   id="email"
// //                   placeholder="Enter your email"
// //                   className={`w-full px-4 py-3 border ${
// //                     errors.email ? "border-red-500" : "border-gray-300"
// //                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
// //                   {...register("email", {
// //                     required: "Email is required",
// //                     pattern: {
// //                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
// //                       message: "Invalid email address",
// //                     },
// //                   })}
// //                 />
// //                 <span className="absolute inset-y-0 right-3 flex items-center">
// //                   <HiOutlineMail className="h-5 w-5 text-gray-400" />
// //                 </span>
// //               </div>
// //               {errors.email && (
// //                 <p className="text-red-500 text-sm mt-1">
// //                   {errors.email.message}
// //                 </p>
// //               )}
// //             </div>

// //             <div>
// //               <label
// //                 htmlFor="password"
// //                 className="block text-gray-700 text-sm font-semibold mb-1"
// //               >
// //                 Password
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   type="password"
// //                   id="password"
// //                   placeholder="Enter your password"
// //                   className={`w-full px-4 py-3 border ${
// //                     errors.password ? "border-red-500" : "border-gray-300"
// //                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
// //                   {...register("password", {
// //                     required: "Password is required",
// //                   })}
// //                 />
// //                 <span className="absolute inset-y-0 right-3 flex items-center">
// //                   <HiOutlineLockClosed className="h-5 w-5 text-gray-400" />
// //                 </span>
// //               </div>
// //               {errors.password && (
// //                 <p className="text-red-500 text-sm mt-1">
// //                   {errors.password.message}
// //                 </p>
// //               )}
// //             </div>

// //             {/* Submit Button */}
// //             <button
// //               type="submit"
// //               className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300"
// //             >
// //               Next
// //             </button>

// //             {/* Display server errors */}
// //             {serverError && (
// //               <p className="text-red-500 text-sm mt-2 text-center">
// //                 {serverError}
// //               </p>
// //             )}
// //           </form>
// //         </div>

// //         {/* Right Section - Image */}
// //         <div className="hidden md:block md:w-1/2">
// //           <img
// //             src={joinUs}
// //             alt="Join Us illustration"
// //             className="w-full h-full object-cover rounded-tl-lg rounded-bl-lg"
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default JoinUsPage;




// import { useState, useEffect } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { AxiosError } from "axios";
// import { FcGoogle } from "react-icons/fc";
// import { FaLinkedin } from "react-icons/fa";
// import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
// import joinUs from "../assets/joinUs.png";
// import { useNavigate } from "react-router-dom";
// import { useGoogleLogin } from "@react-oauth/google";
// import { useLinkedIn } from "react-linkedin-login-oauth2";
// import axios from "axios";

// type FormData = {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
// };


// const translations = {
//     en: {
//         "Join Us": "Join Us",
//         "Join by Google": "Join by Google",
//         "Join by Linkedin": "Join by LinkedIn",
//         "OR": "OR",
//         "First Name": "First Name",
//         "Enter your first name": "Enter your first name",
//         "First name is required": "First name is required",
//         "Last Name": "Last Name",
//         "Enter your last name": "Enter your last name",
//         "Last name is required": "Last name is required",
//         "Email": "Email",
//         "Enter your email": "Enter your email",
//         "Email is required": "Email is required",
//         "Invalid email address": "Invalid email address",
//         "Password": "Password",
//         "Enter your password": "Enter your password",
//         "Password is required": "Password is required",
//         "Next": "Next",
//         "Google Login failed: Could not fetch user information.": "Google Login failed: Could not fetch user information.",
//         "Google Login failed: Error fetching user information.": "Google Login failed: Error fetching user information.",
//         "Google Login failed.": "Google Login failed.",
//         "LinkedIn Login failed.": "LinkedIn Login failed.",
//         "Social login failed. Please try again.": "Social login failed. Please try again.",
//         "An error occurred. Please try again later.": "An error occurred. Please try again later.",

//     },
//     ar: {
//         "Join Us": "انضم إلينا",
//         "Join by Google": "انضم عبر جوجل",
//         "Join by Linkedin": "انضم عبر لينكدإن",
//         "OR": "أو",
//         "First Name": "الاسم الأول",
//         "Enter your first name": "أدخل اسمك الأول",
//         "First name is required": "الاسم الأول مطلوب",
//         "Last Name": "اسم العائلة",
//         "Enter your last name": "أدخل اسم عائلتك",
//         "Last name is required": "اسم العائلة مطلوب",
//         "Email": "البريد الإلكتروني",
//         "Enter your email": "أدخل بريدك الإلكتروني",
//         "Email is required": "البريد الإلكتروني مطلوب",
//         "Invalid email address": "عنوان بريد إلكتروني غير صالح",
//         "Password": "كلمة المرور",
//         "Enter your password": "أدخل كلمة مرورك",
//         "Password is required": "كلمة المرور مطلوبة",
//         "Next": "التالي",
//         "Google Login failed: Could not fetch user information.": "فشل تسجيل الدخول عبر جوجل: تعذر جلب معلومات المستخدم.",
//         "Google Login failed: Error fetching user information.": "فشل تسجيل الدخول عبر جوجل: خطأ في جلب معلومات المستخدم.",
//         "Google Login failed.": "فشل تسجيل الدخول عبر جوجل.",
//         "LinkedIn Login failed.": "فشل تسجيل الدخول عبر لينكدإن.",
//         "Social login failed. Please try again.": "فشل تسجيل الدخول الاجتماعي. يرجى المحاولة مرة أخرى.",
//         "An error occurred. Please try again later.": "حدث خطأ. يرجى المحاولة مرة أخرى لاحقًا.",
//     },
// };

// const translate = (key: string, language: 'en' | 'ar') => {
//     return (translations as any)[language]?.[key] ?? key;
// };


// const JoinUsPage = () => {
//     const navigate = useNavigate();
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         setError,
//     } = useForm<FormData>();

//     const [serverError, setServerError] = useState<string | null>(null);
//     const [language, setLanguage] = useState<'en' | 'ar'>(
//         localStorage.getItem('language') === 'ar' ? 'ar' : 'en'
//     );

//     useEffect(() => {
//         const storedLanguage = localStorage.getItem('language');
//         if (storedLanguage === 'ar' || storedLanguage === 'en') {
//             setLanguage(storedLanguage);
//         } else {
//             setLanguage('en'); // Default to English if no language is set
//         }
//     }, []);


//     const googleLogin = useGoogleLogin({
//         onSuccess: async (tokenResponse) => {
//             try {
//                 const userInfoResponse = await fetch(
//                     "https://www.googleapis.com/oauth2/v3/userinfo",
//                     {
//                         headers: {
//                             Authorization: `Bearer ${tokenResponse.access_token}`,
//                         },
//                     }
//                 );

//                 if (userInfoResponse.ok) {
//                     const userInfo = await userInfoResponse.json();
//                     handleSocialLogin("google", userInfo);
//                 } else {
//                     console.error(
//                         "Failed to fetch user info from Google Userinfo API:",
//                         userInfoResponse.status,
//                         userInfoResponse.statusText
//                     );
//                     setServerError(translate("Google Login failed: Could not fetch user information.", language));
//                 }
//             } catch (error) {
//                 console.error("Error fetching user info from Google:", error);
//                 setServerError(translate("Google Login failed: Error fetching user information.", language));
//             }
//         },
//         onError: (error) => {
//             console.error("Google Login failed:", error);
//             setServerError(translate("Google Login failed.", language));
//         },
//     });

//     const { linkedInLogin } = useLinkedIn({
//         clientId: process.env.REACT_APP_LINKEDIN_CLIENT_ID!,
//         redirectUri: window.location.origin,
//         onSuccess: async (codeResponse: any) => {
//             try {
//                 const response = await axios.post("/api/linkedin-login", {
//                     code: codeResponse.code,
//                 });
//                 handleSocialLogin("linkedin", response.data.user);
//             } catch (error: any) {
//                 console.error("LinkedIn Login Error:", error);
//                 setServerError(translate("LinkedIn Login failed.", language));
//             }
//         },
//         onError: (error) => {
//             console.error("LinkedIn Login Error:", error);
//             setServerError(translate("LinkedIn Login failed.", language));
//         },
//     });

//     const handleSocialLogin = async (
//         provider: "google" | "linkedin",
//         userInfo: any
//     ) => {
//         try {
//             const response = await axios.post("/api/social-login", {
//                 provider: provider,
//                 userInfo: userInfo,
//             });

//             localStorage.setItem("token", response.data.token);
//             navigate("/react/Dashboard");
//         } catch (error: any) {
//             if (error.response && error.response.status === 404) {
//                 localStorage.setItem(
//                     "basicUserInfo",
//                     JSON.stringify({
//                         email: userInfo.email,
//                         firstName: userInfo.given_name || userInfo.firstName,
//                         lastName: userInfo.family_name || userInfo.lastName,
//                         socialProvider: provider,
//                     })
//                 );
//                 navigate("/react/accountSetup");
//             } else {
//                 console.error("Social Login Error:", error);
//                 setServerError(translate("Social login failed. Please try again.", language));
//             }
//         }
//     };

//     const onSubmit: SubmitHandler<FormData> = async (data) => {
//         try {
//             localStorage.setItem(
//                 "basicUserInfo",
//                 JSON.stringify({
//                     ...data,
//                     socialProvider: "email",
//                 })
//             );

//             navigate("/react/accountSetup");
//         } catch (error) {
//             const axiosError = error as AxiosError<{
//                 message: string;
//                 errors?: Record<string, string[]>;
//             }>;
//             if (axiosError.response) {
//                 if (axiosError.response.data.errors) {
//                     Object.entries(axiosError.response.data.errors).forEach(
//                         ([field, messages]) => {
//                             setError(field as keyof FormData, {
//                                 type: "server",
//                                 message: messages.join(", "),
//                             });
//                         }
//                     );
//                 } else {
//                     setServerError(axiosError.response.data.message);
//                 }
//             } else {
//                 setServerError(translate("An error occurred. Please try again later.", language));
//             }
//         }
//     };

//     return (
//         <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="bg-gray-50 py-16 md:py-20">
//             <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6 text-gray-800">
//                 {translate("Join Us", language)}
//             </h2>

//             <div className="container mx-auto bg-white rounded-lg shadow-xl overflow-hidden md:flex md:space-x-8 max-w-5xl">
//                 {/* Left Section */}
//                 <div className="md:w-1/2 px-8 py-8 md:py-16">
//                     <div className="gap-4 md:gap-10 flex flex-col  md:space-y-0  mb-6">
//                         <button
//                             type="button"
//                             onClick={() => googleLogin()}
//                             className=" flex items-center justify-center bg-red-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md"
//                         >
//                             <FcGoogle className="m-3 mr-2 text-2xl" />
//                             {translate("Join by Google", language)}
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => linkedInLogin()}
//                             className=" flex items-center justify-center bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
//                         >
//                             <FaLinkedin className="mr-2 text-xl" />
//                             {translate("Join by Linkedin", language)}
//                         </button>
//                     </div>

//                     <div className="flex items-center justify-center my-4">
//                         <div className="border-t border-gray-300 flex-grow"></div>
//                         <span className="mx-4 text-gray-500 font-semibold">{translate("OR", language)}</span>
//                         <div className="border-t border-gray-300 flex-grow"></div>
//                     </div>

//                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label
//                                     htmlFor="firstName"
//                                     className="block text-gray-700 text-sm font-semibold mb-1"
//                                 >
//                                     {translate("First Name", language)}
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="firstName"
//                                     placeholder={translate("Enter your first name", language)}
//                                     className={`w-full px-4 py-3 border ${errors.firstName ? "border-red-500" : "border-gray-300"
//                                         } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
//                                     {...register("firstName", {
//                                         required: translate("First name is required", language),
//                                     })}
//                                 />
//                                 {errors.firstName && (
//                                     <p className="text-red-500 text-sm mt-1">
//                                         {errors.firstName.message}
//                                     </p>
//                                 )}
//                             </div>
//                             <div>
//                                 <label
//                                     htmlFor="lastName"
//                                     className="block text-gray-700 text-sm font-semibold mb-1"
//                                 >
//                                     {translate("Last Name", language)}
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="lastName"
//                                     placeholder={translate("Enter your last name", language)}
//                                     className={`w-full px-4 py-3 border ${errors.lastName ? "border-red-500" : "border-gray-300"
//                                         } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
//                                     {...register("lastName", {
//                                         required: translate("Last name is required", language),
//                                     })}
//                                 />
//                                 {errors.lastName && (
//                                     <p className="text-red-500 text-sm mt-1">
//                                         {errors.lastName.message}
//                                     </p>
//                                 )}
//                             </div>
//                         </div>

//                         <div>
//                             <label
//                                 htmlFor="email"
//                                 className="block text-gray-700 text-sm font-semibold mb-1"
//                             >
//                                 {translate("Email", language)}
//                             </label>
//                             <div className="relative">
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     placeholder={translate("Enter your email", language)}
//                                     className={`w-full px-4 py-3 border ${errors.email ? "border-red-500" : "border-gray-300"
//                                         } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
//                                     {...register("email", {
//                                         required: translate("Email is required", language),
//                                         pattern: {
//                                             value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                                             message: translate("Invalid email address", language),
//                                         },
//                                     })}
//                                 />
//                                 <span className="absolute inset-y-0 right-3 flex items-center">
//                                     <HiOutlineMail className="h-5 w-5 text-gray-400" />
//                                 </span>
//                             </div>
//                             {errors.email && (
//                                 <p className="text-red-500 text-sm mt-1">
//                                     {errors.email.message}
//                                 </p>
//                             )}
//                         </div>

//                         <div>
//                             <label
//                                 htmlFor="password"
//                                 className="block text-gray-700 text-sm font-semibold mb-1"
//                             >
//                                 {translate("Password", language)}
//                             </label>
//                             <div className="relative">
//                                 <input
//                                     type="password"
//                                     id="password"
//                                     placeholder={translate("Enter your password", language)}
//                                     className={`w-full px-4 py-3 border ${errors.password ? "border-red-500" : "border-gray-300"
//                                         } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
//                                     {...register("password", {
//                                         required: translate("Password is required", language),
//                                     })}
//                                 />
//                                 <span className="absolute inset-y-0 right-3 flex items-center">
//                                     <HiOutlineLockClosed className="h-5 w-5 text-gray-400" />
//                                 </span>
//                             </div>
//                             {errors.password && (
//                                 <p className="text-red-500 text-sm mt-1">
//                                     {errors.password.message}
//                                 </p>
//                             )}
//                         </div>

//                         <button
//                             type="submit"
//                             className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300"
//                         >
//                             {translate("Next", language)}
//                         </button>

//                         {serverError && (
//                             <p className="text-red-500 text-sm mt-2 text-center">
//                                 {serverError}
//                             </p>
//                         )}
//                     </form>
//                 </div>

//                 {/* Right Section - Image */}
//                 <div className="hidden md:block md:w-1/2">
//                     <img
//                         src={joinUs}
//                         alt="Join Us illustration"
//                         className="w-full h-full object-cover rounded-e-lg"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default JoinUsPage;


import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AxiosError } from "axios";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import joinUs from "../assets/joinUs.png";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import axios from "axios";
// import ReCAPTCHA from 'react-google-recaptcha'; // Uncomment if you are using a real reCAPTCHA library

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    terms: boolean; // Added terms field
    captcha: string; // Added captcha field - for placeholder, can be string
};


const translations = {
    en: {
        "Join Us": "Join Us",
        "Join by Google": "Join by Google",
        "Join by Linkedin": "Join by LinkedIn",
        "OR": "OR",
        "First Name": "First Name",
        "Enter your first name": "Enter your first name",
        "First name is required": "First name is required",
        "Last Name": "Last Name",
        "Enter your last name": "Enter your last name",
        "Last name is required": "Last name is required",
        "Email": "Email",
        "Enter your email": "Enter your email",
        "Email is required": "Email is required",
        "Invalid email address": "Invalid email address",
        "Password": "Password",
        "Enter your password": "Enter your password",
        "Password is required": "Password is required",
        "Next": "Next",
        "Google Login failed: Could not fetch user information.": "Google Login failed: Could not fetch user information.",
        "Google Login failed: Error fetching user information.": "Google Login failed: Error fetching user information.",
        "Google Login failed.": "Google Login failed.",
        "LinkedIn Login failed.": "LinkedIn Login failed.",
        "Social login failed. Please try again.": "Social login failed. Please try again.",
        "An error occurred. Please try again later.": "An error occurred. Please try again later.",
        "I have read and agree to terms of use and Privacy Statement": "I have read and agree to",
        " terms of use": " terms of use",
        " Privacy Statement": " Privacy Statement",
        "You must agree to the terms and conditions": "You must agree to the terms and conditions",
        // "Verify you are not a robot": "Verify you are not a robot",
        "Captcha verification failed": "Captcha verification failed",
    },
    ar: {
        "Join Us": "انضم إلينا",
        "Join by Google": "انضم عبر جوجل",
        "Join by Linkedin": "انضم عبر لينكدإن",
        "OR": "أو",
        "First Name": "الاسم الأول",
        "Enter your first name": "أدخل اسمك الأول",
        "First name is required": "الاسم الأول مطلوب",
        "Last Name": "اسم العائلة",
        "Enter your last name": "أدخل اسم عائلتك",
        "Last name is required": "اسم العائلة مطلوب",
        "Email": "البريد الإلكتروني",
        "Enter your email": "أدخل بريدك الإلكتروني",
        "Email is required": "البريد الإلكتروني مطلوب",
        "Invalid email address": "عنوان بريد إلكتروني غير صالح",
        "Password": "كلمة المرور",
        "Enter your password": "أدخل كلمة مرورك",
        "Password is required": "كلمة المرور مطلوبة",
        "Next": "التالي",
        "Google Login failed: Could not fetch user information.": "فشل تسجيل الدخول عبر جوجل: تعذر جلب معلومات المستخدم.",
        "Google Login failed: Error fetching user information.": "فشل تسجيل الدخول عبر جوجل: خطأ في جلب معلومات المستخدم.",
        "Google Login failed.": "فشل تسجيل الدخول عبر جوجل.",
        "LinkedIn Login failed.": "فشل تسجيل الدخول عبر لينكدإن.",
        "Social login failed. Please try again.": "فشل تسجيل الدخول الاجتماعي. يرجى المحاولة مرة أخرى.",
        "An error occurred. Please try again later.": "حدث خطأ. يرجى المحاولة مرة أخرى لاحقًا.",
        "I have read and agree to terms of use and Privacy Statement": "لقد قرأت وأوافق على شروط الاستخدام وبيان الخصوصية",
        "You must agree to the terms and conditions": "يجب الموافقة على الشروط والأحكام",
        // "Verify you are not a robot": "تحقق من أنك لست روبوتًا",
        "Captcha verification failed": "فشل التحقق من Captcha",
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};


const JoinUsPage = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setError,
        watch,
        // setValue,
    } = useForm<FormData>({
        mode: "onBlur" // or "onSubmit"
    });

    const [serverError, setServerError] = useState<string | null>(null);
    const [language, setLanguage] = useState<'en' | 'ar'>(
        localStorage.getItem('language') === 'ar' ? 'ar' : 'en'
    );
    // const [captchaVerified, setCaptchaVerified] = useState(false); // Captcha verification state
    const termsAgreed = watch("terms"); // Watch terms checkbox

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage === 'ar' || storedLanguage === 'en') {
            setLanguage(storedLanguage);
        } else {
            setLanguage('en'); // Default to English if no language is set
        }
    }, []);


    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const userInfoResponse = await fetch(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.access_token}`,
                        },
                    }
                );

                if (userInfoResponse.ok) {
                    const userInfo = await userInfoResponse.json();
                    handleSocialLogin("google", userInfo);
                } else {
                    console.error(
                        "Failed to fetch user info from Google Userinfo API:",
                        userInfoResponse.status,
                        userInfoResponse.statusText
                    );
                    setServerError(translate("Google Login failed: Could not fetch user information.", language));
                }
            } catch (error) {
                console.error("Error fetching user info from Google:", error);
                setServerError(translate("Google Login failed: Error fetching user information.", language));
            }
        },
        onError: (error) => {
            console.error("Google Login failed:", error);
            setServerError(translate("Google Login failed.", language));
        },
    });

    const { linkedInLogin } = useLinkedIn({
        clientId: process.env.REACT_APP_LINKEDIN_CLIENT_ID!,
        redirectUri: window.location.origin,
        onSuccess: async (codeResponse: any) => {
            try {
                const response = await axios.post("/api/linkedin-login", {
                    code: codeResponse.code,
                });
                handleSocialLogin("linkedin", response.data.user);
            } catch (error: any) {
                console.error("LinkedIn Login Error:", error);
                setServerError(translate("LinkedIn Login failed.", language));
            }
        },
        onError: (error) => {
            console.error("LinkedIn Login Error:", error);
            setServerError(translate("LinkedIn Login failed.", language));
        },
    });

    const handleSocialLogin = async (
        provider: "google" | "linkedin",
        userInfo: any
    ) => {
        try {
            const response = await axios.post("/api/social-login", {
                provider: provider,
                userInfo: userInfo,
            });

            localStorage.setItem("token", response.data.token);
            navigate("/react/Dashboard");
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                localStorage.setItem(
                    "basicUserInfo",
                    JSON.stringify({
                        email: userInfo.email,
                        firstName: userInfo.given_name || userInfo.firstName,
                        lastName: userInfo.family_name || userInfo.lastName,
                        socialProvider: provider,
                    })
                );
                navigate("/react/accountSetup");
            } else {
                console.error("Social Login Error:", error);
                setServerError(translate("Social login failed. Please try again.", language));
            }
        }
    };

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        // if (!captchaVerified) {
        //     setServerError(translate("Captcha verification failed", language));
        //     return;
        // }
        try {
            localStorage.setItem(
                "basicUserInfo",
                JSON.stringify({
                    ...data,
                    socialProvider: "email",
                })
            );

            navigate("/react/accountSetup");
        } catch (error) {
            const axiosError = error as AxiosError<{
                message: string;
                errors?: Record<string, string[]>;
            }>;
            if (axiosError.response) {
                if (axiosError.response.data.errors) {
                    Object.entries(axiosError.response.data.errors).forEach(
                        ([field, messages]) => {
                            setError(field as keyof FormData, {
                                type: "server",
                                message: messages.join(", "),
                            });
                        }
                    );
                } else {
                    setServerError(axiosError.response.data.message);
                }
            } else {
                setServerError(translate("An error occurred. Please try again later.", language));
            }
        }
    };

    // Placeholder for captcha verification function



    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="bg-gray-50 py-16 md:py-20">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6 text-gray-800">
                {translate("Join Us", language)}
            </h2>

            <div className="container mx-auto bg-white rounded-lg shadow-xl overflow-hidden md:flex md:space-x-8 max-w-5xl">
                {/* Left Section */}
                <div className="md:w-1/2 px-8 py-8 md:py-16">
                    <div className="gap-4 md:gap-10 flex flex-col  md:space-y-0  mb-6">
                        <button
                            type="button"
                            onClick={() => googleLogin()}
                            className=" flex items-center justify-center bg-red-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md"
                        >
                            <FcGoogle className="m-3 mr-2 text-2xl" />
                            {translate("Join by Google", language)}
                        </button>
                        <button
                            type="button"
                            onClick={() => linkedInLogin()}
                            className=" flex items-center justify-center bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
                        >
                            <FaLinkedin className="mr-2 text-xl" />
                            {translate("Join by Linkedin", language)}
                        </button>
                    </div>

                    <div className="flex items-center justify-center my-4">
                        <div className="border-t border-gray-300 flex-grow"></div>
                        <span className="mx-4 text-gray-500 font-semibold">{translate("OR", language)}</span>
                        <div className="border-t border-gray-300 flex-grow"></div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="block text-gray-700 text-sm font-semibold mb-1"
                                >
                                    {translate("First Name", language)}
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    placeholder={translate("Enter your first name", language)}
                                    className={`w-full px-4 py-3 border ${errors.firstName ? "border-red-500" : "border-gray-300"
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                                    {...register("firstName", {
                                        required: translate("First name is required", language),
                                    })}
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="block text-gray-700 text-sm font-semibold mb-1"
                                >
                                    {translate("Last Name", language)}
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    placeholder={translate("Enter your last name", language)}
                                    className={`w-full px-4 py-3 border ${errors.lastName ? "border-red-500" : "border-gray-300"
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                                    {...register("lastName", {
                                        required: translate("Last name is required", language),
                                    })}
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-semibold mb-1"
                            >
                                {translate("Email", language)}
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder={translate("Enter your email", language)}
                                    className={`w-full px-4 py-3 border ${errors.email ? "border-red-500" : "border-gray-300"
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                                    {...register("email", {
                                        required: translate("Email is required", language),
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: translate("Invalid email address", language),
                                        },
                                    })}
                                />
                                <span className="absolute inset-y-0 right-3 flex items-center">
                                    <HiOutlineMail className="h-5 w-5 text-gray-400" />
                                </span>
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-gray-700 text-sm font-semibold mb-1"
                            >
                                {translate("Password", language)}
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    placeholder={translate("Enter your password", language)}
                                    className={`w-full px-4 py-3 border ${errors.password ? "border-red-500" : "border-gray-300"
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                                    {...register("password", {
                                        required: translate("Password is required", language),
                                    })}
                                />
                                <span className="absolute inset-y-0 right-3 flex items-center">
                                    <HiOutlineLockClosed className="h-5 w-5 text-gray-400" />
                                </span>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="flex items-start mb-4">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    aria-describedby="terms-description"
                                    type="checkbox"
                                    className={`w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-orange-300 ${errors.terms ? "ring-red-500 border-red-500" : ""}`}
                                    {...register("terms", {
                                        required: translate("You must agree to the terms and conditions", language),
                                    })}
                                />
                            </div>
                            <div className="ml-2 text-sm">
                                <label htmlFor="terms" className="font-medium text-gray-700">
                                    {translate("I have read and agree to terms of use and Privacy Statement", language)}
                                    <Link to='/react/TermsOfUsePage'>
                                    <span className="text-[#B44E14]">

                                    {translate(" terms of use", language)}
                                    </span>
                                    </Link>
                                    {` and `}
                                    <Link to='/react/PrivacyStatementPage'>
                                    <span className="text-[#B44E14]">

                                    {translate(" Privacy Statement", language)}
                                    </span>
                                    </Link>

                                </label>
                                {errors.terms && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.terms.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Captcha Placeholder - Replace with actual ReCAPTCHA component */}
                        


                        <button
                            type="submit"
                            disabled={!isValid || !termsAgreed
                                //  || !captchaVerified
                                } // Disable button if form is invalid, terms not agreed or captcha not verified
                            className={`w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300 ${(!isValid || !termsAgreed
                                //  || !captchaVerified
                                ) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {translate("Next", language)}
                        </button>

                        {serverError && (
                            <p className="text-red-500 text-sm mt-2 text-center">
                                {serverError}
                            </p>
                        )}
                    </form>
                </div>

                {/* Right Section - Image */}
                <div className="hidden md:block md:w-1/2">
                    <img
                        src={joinUs}
                        alt="Join Us illustration"
                        className="w-full h-full object-cover rounded-e-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default JoinUsPage;