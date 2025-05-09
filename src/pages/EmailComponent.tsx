// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import axios

// type EmailState = 'initial' | 'adding' | 'added';

// interface Email {
//     id: number; // Assuming backend returns id as number
//     address: string;
// }

// const EmailComponent: React.FC = () => {
//     const [state, setState] = useState<EmailState>('initial');
//     const [emails, setEmails] = useState<Email[]>([]);
//     const [currentEmail, setCurrentEmail] = useState<string>('');
//     const [password, setPassword] = useState<string>(''); // Password is not used in backend logic, can be removed if not needed
//     const [apiError, setApiError] = useState<string | null>(null);
//     const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

//     useEffect(() => {
//         fetchEmails();
//     }, []);

//     const fetchEmails = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/email', { // Use axios.get
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}` // If authentication is needed
//                 },
//             });
//             console.log("response",response);

//             setEmails(response.data); // Access data from axios response
//             setState('added'); // Transition to 'added' state after fetching
//             setApiError(null);
//         } catch (error: any) { // Type error as any for axios error
//             console.error("Error fetching emails:", error);
//             let errorMessage = 'Failed to load emails. Please try again.';
//             if (axios.isAxiosError(error) && error.response) {
//                 errorMessage = error.response.data.message || errorMessage;
//             }
//             setApiError(errorMessage);
//             setState('initial'); // Go back to initial state if fetch fails
//         }
//     };


//     const handleAddEmail = () => {
//         setState('adding');
//     };

//     const handleCancel = () => {
//         setCurrentEmail('');
//         setPassword('');
//         setState('initial');
//         setValidationErrors({}); // Clear validation errors
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setValidationErrors({}); // Clear previous validation errors
//         setApiError(null); // Clear previous API errors

//         if (!currentEmail.trim()) {
//             setValidationErrors({ address: ["Email address is required"] });
//             return;
//         }

//         try {
//             const response = await axios.post('http://127.0.0.1:8000/api/email', { address: currentEmail }, { // Use axios.post
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     'Content-Type': 'application/json', // Explicitly set content type
//                 },
//             });

//             if (response.status === 201) {
//                 const data = response.data;
//                 console.log("Email added successfully:", data);
//                 fetchEmails(); // Refresh email list - this will also transition to 'added' state
//                 setCurrentEmail('');
//                 setPassword('');
//                 setApiError(null);
//             } else {
//                 setApiError(`Failed to add email. Status: ${response.status}`);
//             }

//         } catch (error: any) { // Type error as any for axios error
//             console.error("Error adding email:", error);
//             if (axios.isAxiosError(error) && error.response) {
//                 if (error.response.status === 422 && error.response.data.errors) {
//                     setValidationErrors(error.response.data.errors); // Set backend validation errors
//                 } else {
//                     setApiError(error.response.data.message || `Failed to add email. Status: ${error.response.status}`);
//                 }
//             } else {
//                 setApiError('Error adding email. Please try again.'); // Generic error message for non-Axios errors
//             }
//         }
//     };


//     const handleRemoveEmail = async (emailId: number) => {
//         try {
//             await axios.delete(`http://127.0.0.1:8000/api/email/${emailId}`, { // Use axios.delete
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 }
//             });
//             fetchEmails(); // Refresh email list - this will also transition to 'added' state
//             setState('initial'); // Go back to initial state after removal - consider if 'added' is better
//             setApiError(null);
//         } catch (error: any) { // Type error as any for axios error
//             console.error("Error removing email:", error);
//             let errorMessage = "Failed to remove email. Please try again.";
//             if (axios.isAxiosError(error) && error.response) {
//                 errorMessage = error.response.data.message || errorMessage;
//             }
//             setApiError(errorMessage);
//         }
//     };

//     const renderInitialState = () => (
//         <div className="p-4 bg-white rounded-md shadow-sm">
//             <button
//                 onClick={handleAddEmail}
//                 className="flex items-center w-full p-3 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50"
//             >
//                 <span className="flex-grow text-left">Add email</span>
//                 <span className="flex items-center justify-center w-6 h-6 bg-orange-500 rounded-full text-white">+</span>
//             </button>
//         </div>
//     );

//     const renderAddingState = () => (
//         <div className="p-6 bg-white rounded-md shadow-sm">
//             <h2 className="mb-4 text-lg font-medium text-center">Email</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
//                     <input
//                         type="email"
//                         id="email"
//                         value={currentEmail}
//                         onChange={(e) => setCurrentEmail(e.target.value)}
//                         className={`w-full p-2 border rounded-md ${validationErrors.address ? 'border-red-500' : 'border-gray-300'}`}
//                         placeholder="Enter your email address"
//                         required
//                     />
//                     {validationErrors.address && (
//                         <p className="text-red-500 text-xs mt-1">{validationErrors.address.join(', ')}</p>
//                     )}
//                 </div>
//                 {/* Password field is kept in frontend component but not used in backend logic */}
//                 <div className="mb-4">
//                     <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="w-full p-2 border border-gray-300 rounded-md"
//                         required
//                     />
//                 </div>
//                 <div className="text-sm text-orange-500 mb-4">
//                     <a href="#" className="hover:underline">Forgot my password</a>
//                 </div>
//                 <div className="flex justify-between">
//                     <button
//                         type="submit"
//                         className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
//                     >
//                         Add
//                     </button>
//                     <button
//                         type="button"
//                         onClick={handleCancel}
//                         className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
//                     >
//                         Cancel
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );

//     const renderAddedState = () => (
//         <div className="space-y-4">
//             {emails.map((email, index) => (
//                 <div key={index} className="p-4 bg-white rounded-md shadow-sm">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <div className="font-medium">{email.address}</div> {/* Display email address */}
//                             <div className="text-xs text-gray-500">personal account • primary</div>
//                         </div>
//                         <button
//                             onClick={() => handleRemoveEmail(email.id)} // Pass email.id for backend deletion
//                             className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300"
//                         >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
//                                 <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//             ))}

//             <div className="p-4 bg-white rounded-md shadow-sm">
//                 <button
//                     onClick={handleAddEmail}
//                     className="flex items-center w-full p-3 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50"
//                 >
//                     <span className="flex-grow text-left">Email</span>
//                     <span className="flex items-center justify-center w-6 h-6 bg-orange-500 rounded-full text-white">+</span>
//                 </button>
//             </div>
//         </div>
//     );

//     return (
//         <div className="max-w-3xl mt-32 mx-auto py-10">
//             <h1 className="mb-4 text-xl font-bold text-center">Email</h1>

//             {apiError && <div className="text-red-500 mb-4 p-2 bg-red-100 rounded">{apiError}</div>}

//             {state === 'initial' && renderInitialState()}
//             {state === 'adding' && renderAddingState()}
//             {state === 'added' && renderAddedState()}
//         </div>
//     );
// };

// export default EmailComponent;



import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

type EmailState = 'initial' | 'adding' | 'added';

interface Email {
    id: number;
    address: string;
}


const translations = {
    en: {
        "Email": "Email",
        "Add email": "Add email",
        "personal account • primary": "personal account • primary",
        "Cancel": "Cancel",
        "Add": "Add",
        "Forgot my password": "Forgot my password",
        "Enter your email address": "Enter your email address",
        "Email address is required": "Email address is required",
        "Failed to load emails. Please try again.": "Failed to load emails. Please try again.",
        "Error fetching emails:": "Error fetching emails:",
        "Email added successfully:": "Email added successfully:",
        "Failed to add email. Status:": "Failed to add email. Status:",
        "Error adding email:": "Error adding email:",
        "Error removing email:": "Error removing email:",
        "Failed to remove email. Please try again.": "Failed to remove email. Please try again.",
    },
    ar: {
        "Email": "البريد الإلكتروني",
        "Add email": "إضافة بريد إلكتروني",
        "personal account • primary": "حساب شخصي • أساسي",
        "Cancel": "إلغاء",
        "Add": "إضافة",
        "Forgot my password": "نسيت كلمة المرور",
        "Enter your email address": "أدخل عنوان بريدك الإلكتروني",
        "Email address is required": "عنوان البريد الإلكتروني مطلوب",
        "Failed to load emails. Please try again.": "فشل تحميل رسائل البريد الإلكتروني. يرجى المحاولة مرة أخرى.",
        "Error fetching emails:": "خطأ في جلب رسائل البريد الإلكتروني:",
        "Email added successfully:": "تمت إضافة البريد الإلكتروني بنجاح:",
        "Failed to add email. Status:": "فشل إضافة البريد الإلكتروني. الحالة:",
        "Error adding email:": "خطأ في إضافة البريد الإلكتروني:",
        "Error removing email:": "خطأ في إزالة البريد الإلكتروني:",
        "Failed to remove email. Please try again.": "فشل إزالة البريد الإلكتروني. يرجى المحاولة مرة أخرى.",

    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};


const EmailComponent: React.FC = () => {
    const [state, setState] = useState<EmailState>('initial');
    const [emails, setEmails] = useState<Email[]>([]);
    const [currentEmail, setCurrentEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [apiError, setApiError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
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
        fetchEmails();
    }, [language]);

    const fetchEmails = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/email', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            console.log("response", response);

            setEmails(response.data);
            setState('added');
            setApiError(null);
        } catch (error: any) {
            console.error(translate("Error fetching emails:", language), error);
            let errorMessage = translate("Failed to load emails. Please try again.", language);
            if (axios.isAxiosError(error) && error.response) {
                errorMessage = error.response.data.message || errorMessage;
            }
            setApiError(errorMessage);
            setState('initial');
        }
    };


    const handleAddEmail = () => {
        setState('adding');
    };

    const handleCancel = () => {
        setCurrentEmail('');
        setPassword('');
        setState('initial');
        setValidationErrors({});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationErrors({});
        setApiError(null);

        if (!currentEmail.trim()) {
            setValidationErrors({ address: [translate("Email address is required", language)] });
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/email', { address: currentEmail }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                const data = response.data;
                console.log(translate("Email added successfully:", language), data);
                fetchEmails();
                setCurrentEmail('');
                setPassword('');
                setApiError(null);
            } else {
                setApiError(`${translate("Failed to add email. Status:", language)} ${response.status}`);
            }

        } catch (error: any) {
            console.error(translate("Error adding email:", language), error);
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 422 && error.response.data.errors) {
                    setValidationErrors(error.response.data.errors);
                } else {
                    setApiError(error.response.data.message || `${translate("Failed to add email. Status:", language)} ${error.response.status}`);
                }
            } else {
                setApiError(translate('Error adding email. Please try again.', language));
            }
        }
    };


    const handleRemoveEmail = async (emailId: number) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/email/${emailId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            fetchEmails();
            setState('initial');
            setApiError(null);
        } catch (error: any) {
            console.error(translate("Error removing email:", language), error);
            let errorMessage = translate("Failed to remove email. Please try again.", language);
            if (axios.isAxiosError(error) && error.response) {
                errorMessage = error.response.data.message || errorMessage;
            }
            setApiError(errorMessage);
        }
    };

    const renderInitialState = () => (
        <div className="p-4 bg-white rounded-md shadow-sm">
            <button
                onClick={handleAddEmail}
                className="flex items-center w-full p-3 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50"
            >
                <span className="flex-grow text-left">{translate("Add email", language)}</span>
                <span className="flex items-center justify-center w-6 h-6 bg-orange-500 rounded-full text-white">+</span>
            </button>
        </div>
    );

    const renderAddingState = () => (
        <div className="p-6 bg-white rounded-md shadow-sm">
            <h2 className="mb-4 text-lg font-medium text-center">{translate("Email", language)}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">{translate("Email", language)}</label>
                    <input
                        type="email"
                        id="email"
                        value={currentEmail}
                        onChange={(e) => setCurrentEmail(e.target.value)}
                        className={`w-full p-2 border rounded-md ${validationErrors.address ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder={translate("Enter your email address", language)}
                        required
                    />
                    {validationErrors.address && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.address.join(', ')}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="text-sm text-orange-500 mb-4">
                    <a href="#" className="hover:underline">{translate("Forgot my password", language)}</a>
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
                    >
                        {translate("Add", language)}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        {translate("Cancel", language)}
                    </button>
                </div>
            </form>
        </div>
    );

    const renderAddedState = () => (
        <div className="space-y-4">
            {emails.map((email, index) => (
                <div key={index} className="p-4 bg-white rounded-md shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">{email.address}</div>
                            <div className="text-xs text-gray-500">{translate("personal account • primary", language)}</div>
                        </div>
                        <button
                            onClick={() => handleRemoveEmail(email.id)}
                            className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}

            <div className="p-4 bg-white rounded-md shadow-sm">
                <button
                    onClick={handleAddEmail}
                    className="flex items-center w-full p-3 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    <span className="flex-grow text-left">{translate("Email", language)}</span>
                    <span className="flex items-center justify-center w-6 h-6 bg-orange-500 rounded-full text-white">+</span>
                </button>
            </div>
        </div>
    );

    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="max-w-3xl mt-12 md:mt-24 lg:mt-32 mx-auto py-6 md:py-10 px-4">
            <h1 className="mb-4 text-xl font-bold text-center">{translate("Email", language)}</h1>

            {apiError && <div className="text-red-500 mb-4 p-2 bg-red-100 rounded">{apiError}</div>}

            {state === 'initial' && renderInitialState()}
            {state === 'adding' && renderAddingState()}
            {state === 'added' && renderAddedState()}
        </div>
    );
};

export default EmailComponent;