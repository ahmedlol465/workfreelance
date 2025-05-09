// import React, { useState } from "react";
// import axios from "axios";
// import photo from "../assets/ww.png";
// import ReCAPTCHA from "react-google-recaptcha";

// interface PasswordRecoveryResponse {
//   message: string;
//   errors?: { [key: string]: string[] }; // Optional, for validation errors
// }

// const PasswordRecoveryPage: React.FC = () => {
//   const [captchaValue, setCaptchaValue] = useState<string | null>(null);
//   const [captchaError, setCaptchaError] = useState<string | null>(null);

//   const [email, setEmail] = useState("");
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [validationErrors, setValidationErrors] = useState<{
//     [key: string]: string[];
//   } | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSuccessMessage(null);
//     setErrorMessage(null);
//     setValidationErrors(null);
//     setIsLoading(true);
//     setCaptchaError(null); // Clear any previous captcha error

//     if (!captchaValue) {
//       setCaptchaError("Please complete the CAPTCHA!");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post<PasswordRecoveryResponse>(
//         `${process.env.REACT_APP_BACK_URL}/sendRecavation`, // Using environment variable for backend URL
//         {
//           email: email,
//           recaptchaValue: captchaValue, // Send captcha value to backend (optional for v2, but good practice)
//         }
//       );
//       console.log(response);

//       if (response.status === 200) {
//         setSuccessMessage(response.data.message);
//         setEmail(""); // Clear the email field after successful request
//         setCaptchaValue(null); // Reset captcha after successful submission
//       } else {
//         setErrorMessage("An unexpected error occurred.");
//       }
//     } catch (error: any) {
//       setIsLoading(false);
//       if (error.response) {
//         if (error.response.status === 422) {
//           setValidationErrors(error.response.data.errors);
//         } else {
//           setErrorMessage(
//             error.response.data.message ||
//               `Error: ${error.response.status} - ${error.response.statusText}`
//           );
//         }
//       } else if (error.request) {
//         setErrorMessage(
//           "No response from server. Please check your network connection."
//         );
//       } else {
//         setErrorMessage("Error setting up the request.");
//         console.error("Error:", error.message);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-100 py-16 font-sans relative overflow-hidden ">
//       <div className="container mx-auto px-6">
//         <div className="bg-white gap-32 rounded-2xl shadow-xl p-10 md:p-16 flex flex-col md:flex-row items-start">
//           {/* Form Section */}
//           <div className="md:w-1/2 md:pr-10">
//             <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center md:text-left">
//               Password Recovery
//             </h2>

//             {successMessage && (
//               <div
//                 className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
//                 role="alert"
//               >
//                 <p>{successMessage}</p>
//               </div>
//             )}

//             {errorMessage && (
//               <div
//                 className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
//                 role="alert"
//               >
//                 <p>{errorMessage}</p>
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>
//               <div className="mb-6">
//                 <label
//                   htmlFor="email"
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                 >
//                   Email
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="email"
//                     id="email"
//                     placeholder="Enter your email"
//                     className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//                       validationErrors?.email ? "border-red-500" : ""
//                     }`}
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                   <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
//                     <svg
//                       className="h-5 w-5 text-gray-400"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
//                       <polyline points="22,6 12,13 2,6" />
//                     </svg>
//                   </div>
//                 </div>
//                 {validationErrors?.email && (
//                   <p className="text-red-500 text-xs italic">
//                     {validationErrors.email[0]}
//                   </p>
//                 )}
//               </div>

//               <div className="mb-6 flex justify-center">
//                 <ReCAPTCHA
//                   sitekey={
//                     process.env.RECAPTCHA_SECRET_KEY ||
//                     "YOUR_RECAPTCHA_V2_SITE_KEY_PLACEHOLDER"
//                   } // <-- Fallback added
//                   onChange={(value: any) => setCaptchaValue(value)}
//                 />
//               </div>

//               {captchaError && (
//                 <p className="text-red-500 text-sm italic text-center mb-4">
//                   {captchaError}
//                 </p>
//               )}

//               <div className="flex items-center justify-center md:justify-start">
//                 <button
//                   className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
//                   type="submit"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Sending..." : "Send"}
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Illustration Section */}
//           <div className="md:w-1/2 mt-8 md:mt-0">
//             <img
//               src={photo}
//               alt="Password Recovery Illustration"
//               className="max-w-full h-auto"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PasswordRecoveryPage;



import React, { useEffect, useState } from "react";
import axios from "axios";
import photo from "../assets/ww.png";
import ReCAPTCHA from "react-google-recaptcha";

interface PasswordRecoveryResponse {
    message: string;
    errors?: { [key: string]: string[] };
}


const translations = {
    en: {
        "Password Recovery": "Password Recovery",
        "Please complete the CAPTCHA!": "Please complete the CAPTCHA!",
        "Email": "Email",
        "Enter your email": "Enter your email",
        "Send": "Send",
        "Sending...": "Sending...",
        "No response from server. Please check your network connection.": "No response from server. Please check your network connection.",
        "Error setting up the request.": "Error setting up the request.",
        "An unexpected error occurred.": "An unexpected error occurred.",
    },
    ar: {
        "Password Recovery": "استعادة كلمة المرور",
        "Please complete the CAPTCHA!": "!يرجى إكمال اختبار التحقق البشري",
        "Email": "البريد الإلكتروني",
        "Enter your email": "أدخل بريدك الإلكتروني",
        "Send": "إرسال",
        "Sending...": "إرسال...",
        "No response from server. Please check your network connection.": "لا يوجد استجابة من الخادم. يرجى التحقق من اتصال الشبكة الخاص بك.",
        "Error setting up the request.": "خطأ في إعداد الطلب.",
        "An unexpected error occurred.": "حدث خطأ غير متوقع.",
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};


const PasswordRecoveryPage: React.FC = () => {
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const [captchaError, setCaptchaError] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string[] } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
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


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage(null);
        setErrorMessage(null);
        setValidationErrors(null);
        setIsLoading(true);
        setCaptchaError(null);

        if (!captchaValue) {
            setCaptchaError(translate("Please complete the CAPTCHA!", language));
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post<PasswordRecoveryResponse>(
                `${process.env.REACT_APP_BACK_URL}/sendRecavation`,
                {
                    email: email,
                    recaptchaValue: captchaValue,
                }
            );
            console.log(response);

            if (response.status === 200) {
                setSuccessMessage(response.data.message);
                setEmail("");
                setCaptchaValue(null);
            } else {
                setErrorMessage(translate("An unexpected error occurred.", language));
            }
        } catch (error: any) {
            setIsLoading(false);
            if (error.response) {
                if (error.response.status === 422) {
                    setValidationErrors(error.response.data.errors);
                } else {
                    setErrorMessage(
                        error.response.data.message ||
                        `${translate("Error: ", language)} ${error.response.status} - ${error.response.statusText}`
                    );
                }
            } else if (error.request) {
                setErrorMessage(translate("No response from server. Please check your network connection.", language));
            } else {
                setErrorMessage(translate("Error setting up the request.", language));
                console.error("Error:", error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="bg-gray-100 py-16 font-sans relative overflow-hidden ">
            <div className="container mx-auto px-6">
                <div className="bg-white gap-32 rounded-2xl shadow-xl p-6 md:p-10 lg:p-16 flex flex-col md:flex-row items-start">
                    {/* Form Section */}
                    <div className="md:w-1/2 md:pr-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 md:mb-8 text-center md:text-left">
                            {translate("Password Recovery", language)}
                        </h2>

                        {successMessage && (
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                                <p>{successMessage}</p>
                            </div>
                        )}

                        {errorMessage && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                                <p>{errorMessage}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 md:mb-6">
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">{translate("Email", language)}</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder={translate("Enter your email", language)}
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${validationErrors?.email ? "border-red-500" : ""}`}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    </div>
                                </div>
                                {validationErrors?.email && (
                                    <p className="text-red-500 text-xs italic">
                                        {validationErrors.email[0]}
                                    </p>
                                )}
                            </div>

                            <div className="mb-4 md:mb-6 flex justify-center">
                                <ReCAPTCHA
                                    sitekey={
                                        process.env.RECAPTCHA_SECRET_KEY ||
                                        "YOUR_RECAPTCHA_V2_SITE_KEY_PLACEHOLDER"
                                    }
                                    onChange={(value: any) => setCaptchaValue(value)}
                                />
                            </div>

                            {captchaError && (
                                <p className="text-red-500 text-sm italic text-center mb-4">
                                    {captchaError}
                                </p>
                            )}

                            <div className="flex items-center justify-center md:justify-start">
                                <button
                                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? translate("Sending...", language) : translate("Send", language)}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Illustration Section */}
                    <div className="md:w-1/2 mt-4 md:mt-0">
                        <img
                            src={photo}
                            alt="Password Recovery Illustration"
                            className="max-w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordRecoveryPage;