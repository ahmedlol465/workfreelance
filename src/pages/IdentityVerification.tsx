// import React, { useState } from 'react';
// // import { PlusCircle, Check } from 'lucide-react';
// import axios from 'axios'; // Import axios

// interface VerificationStep {
//     id: number;
//     title: string;
// }

// const IdentityVerification: React.FC = () => {
//     // const [activeStep, setActiveStep] = useState<number>(1);
//     const [images, setImages] = useState<{ [key: number]: File | null }>({ // Store File objects instead of data URLs
//         1: null,
//         2: null,
//         3: null,
//     });
//     const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//     const [isCompleted, setIsCompleted] = useState<boolean>(false);
//     const [apiError, setApiError] = useState<string | null>(null); // State for API errors

//     const steps: VerificationStep[] = [
//         { id: 1, title: 'Please attach a photo of the front side of your national ID' },
//         { id: 2, title: 'Please attach a photo of the back side of your national ID' },
//         { id: 3, title: 'Please attach a photo of you holding your national ID' },
//     ];

//     const handleImageUpload = (stepId: number, e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             const file = e.target.files[0];
//             setImages(prevImages => ({ // Store File object directly
//                 ...prevImages,
//                 [stepId]: file,
//             }));
//         }
//     };

//     const handleSubmit = async () => {
//         // Validate that all images are uploaded
//         if (!images[1] || !images[2] || !images[3]) {
//             setApiError('Please upload all required photos');
//             return;
//         }
//         setApiError(null); // Clear previous errors
//         setIsSubmitting(true);

//         const formData = new FormData();
//         formData.append('step1_image', images[1] as File); // Cast to File as we validated it's not null
//         formData.append('step2_image', images[2] as File);
//         formData.append('step3_image', images[3] as File);

//         try {
//             const response = await axios.post('http://127.0.0.1:8000/api/VrificationController', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data', // Important for file uploads
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });

//             if (response.status === 201) {
//                 setIsSubmitting(false);
//                 setIsCompleted(true);
//             } else {
//                 setIsSubmitting(false);
//                 setApiError(`Submission failed. Status: ${response.status}`);
//             }
//         } catch (error: any) {
//             setIsSubmitting(false);
//             let errorMessage = 'Error submitting identity verification. Please try again.';
//             if (axios.isAxiosError(error) && error.response) {
//                 errorMessage = `Submission failed. Status: ${error.response.status}. ${error.response.data.message || ''}`;
//             }
//             setApiError(errorMessage);
//             console.error("API Error:", error);
//         }
//     };


//     if (isCompleted) {
//         return (
//             <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
//                 <h2 className="text-xl font-semibold text-center mb-6">Identity verification</h2>
//                 <div className="flex flex-col items-center justify-center p-8">
//                     <div className="relative w-64 h-64">
//                         <img src="/api/placeholder/256/256" alt="Verification Complete" className="w-full h-full object-contain" />
//                         <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2">
//                             <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                         </div>
//                     </div>
//                     <p className="mt-6 text-center text-gray-600">
//                         By submitting an identity verification request, you agree to the terms of use and privacy policy.
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-4xl mt-32 mx-auto p-6 bg-white rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold text-center mb-6">Identity verification</h2>
//             {apiError && <div className="text-red-500 mb-4">{apiError}</div>} {/* Display API Error */}

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {steps.map((step) => (
//                     <div key={step.id} className="border rounded-lg p-4 relative">
//                         <button
//                             className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
//                             onClick={() => {
//                                 setImages(prevImages => ({ ...prevImages, [step.id]: null })); // Clear File object
//                             }}
//                         >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                         </button>

//                         <div className="flex flex-col items-center justify-center">
//                             {images[step.id] ? (
//                                 <div className="w-full h-32 mb-4 flex items-center justify-center">
//                                     {/* Display preview if you want to (optional - can be removed for File objects) */}
//                                     {/* <img
//                                         src={URL.createObjectURL(images[step.id] as Blob) }
//                                         alt={`Step ${step.id}`}
//                                         className="max-h-full max-w-full object-contain"
//                                     /> */}
//                                     <span className="text-green-500">Image Uploaded</span> {/* Indicate image uploaded */}
//                                 </div>
//                             ) : (
//                                 <div className="w-full h-32 mb-4 border-2 border-dashed border-gray-300 flex items-center justify-center">
//                                     <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                     </svg>
//                                 </div>
//                             )}

//                             <p className="text-xs text-center mb-2">{step.title}</p>

//                             <label className="block">
//                                 <span className="text-xs text-orange-500 cursor-pointer hover:underline">
//                                     Upload photo from here
//                                 </span>
//                                 <input
//                                     type="file"
//                                     className="hidden"
//                                     accept="image/*"
//                                     onChange={(e) => handleImageUpload(step.id, e)}
//                                 />
//                             </label>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <div className="mt-6 flex justify-center">
//                 <button
//                     onClick={handleSubmit}
//                     disabled={isSubmitting}
//                     className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                     {isSubmitting ? 'Processing...' : 'Send'}
//                 </button>
//             </div>

//             <p className="mt-6 text-xs text-center text-gray-600">
//                 By submitting an identity verification request, you agree to the terms of use and privacy policy.
//             </p>
//         </div>
//     );
// };

// export default IdentityVerification;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface VerificationStep {
    id: number;
    title: string;
}


const translations = {
    en: {
        "Identity verification": "Identity verification",
        "Please upload all required photos": "Please upload all required photos",
        "Verification Complete": "Verification Complete",
        "By submitting an identity verification request, you agree to the terms of use and privacy policy.": "By submitting an identity verification request, you agree to the terms of use and privacy policy.",
        "Please attach a photo of the front side of your national ID": "Please attach a photo of the front side of your national ID",
        "Please attach a photo of the back side of your national ID": "Please attach a photo of the back side of your national ID",
        "Please attach a photo of you holding your national ID": "Please attach a photo of you holding your national ID",
        "Image Uploaded": "Image Uploaded",
        "Upload photo from here": "Upload photo from here",
        "Processing...": "Processing...",
        "Send": "Send",
        "Submission failed. Status:": "Submission failed. Status:",
        "Error submitting identity verification. Please try again.": "Error submitting identity verification. Please try again.",
        "API Error:": "API Error:",
    },
    ar: {
        "Identity verification": "التحقق من الهوية",
        "Please upload all required photos": "يرجى تحميل جميع الصور المطلوبة",
        "Verification Complete": "تم التحقق بنجاح",
        "By submitting an identity verification request, you agree to the terms of use and privacy policy.": "بتقديم طلب التحقق من الهوية، فإنك توافق على شروط الاستخدام وسياسة الخصوصية.",
        "Please attach a photo of the front side of your national ID": "يرجى إرفاق صورة للجهة الأمامية من هويتك الوطنية",
        "Please attach a photo of the back side of your national ID": "يرجى إرفاق صورة للجهة الخلفية من هويتك الوطنية",
        "Please attach a photo of you holding your national ID": "يرجى إرفاق صورة لك وأنت تحمل هويتك الوطنية",
        "Image Uploaded": "تم تحميل الصورة",
        "Upload photo from here": "تحميل صورة من هنا",
        "Processing...": "جاري المعالجة...",
        "Send": "إرسال",
        "Submission failed. Status:": "فشل الإرسال. الحالة:",
        "Error submitting identity verification. Please try again.": "خطأ في إرسال التحقق من الهوية. يرجى المحاولة مرة أخرى.",
        "API Error:": "خطأ في API:",

    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};


const IdentityVerification: React.FC = () => {
    const [images, setImages] = useState<{ [key: number]: File | null }>({
        1: null,
        2: null,
        3: null,
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string | null>(null);
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


    const steps: VerificationStep[] = [
        { id: 1, title: translate('Please attach a photo of the front side of your national ID', language) },
        { id: 2, title: translate('Please attach a photo of the back side of your national ID', language) },
        { id: 3, title: translate('Please attach a photo of you holding your national ID', language) },
    ];

    const handleImageUpload = (stepId: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImages(prevImages => ({
                ...prevImages,
                [stepId]: file,
            }));
        }
    };

    const handleSubmit = async () => {
        if (!images[1] || !images[2] || !images[3]) {
            setApiError(translate('Please upload all required photos', language));
            return;
        }
        setApiError(null);
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('step1_image', images[1] as File);
        formData.append('step2_image', images[2] as File);
        formData.append('step3_image', images[3] as File);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/VrificationController', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.status === 201) {
                setIsSubmitting(false);
                setIsCompleted(true);
            } else {
                setIsSubmitting(false);
                setApiError(`${translate('Submission failed. Status:', language)} ${response.status}`);
            }
        } catch (error: any) {
            setIsSubmitting(false);
            let errorMessage = translate('Error submitting identity verification. Please try again.', language);
            if (axios.isAxiosError(error) && error.response) {
                errorMessage = `${translate('Submission failed. Status:', language)} ${error.response.status}. ${error.response.data.message || ''}`;
            }
            setApiError(errorMessage);
            console.error(translate("API Error:", language), error);
        }
    };


    if (isCompleted) {
        return (
            <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-center mb-6">{translate('Identity verification', language)}</h2>
                <div className="flex flex-col items-center justify-center p-8">
                    <div className="relative w-64 h-64">
                        <img src="/api/placeholder/256/256" alt={translate('Verification Complete', language)} className="w-full h-full object-contain" />
                        <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <p className="mt-6 text-center text-gray-600">
                        {translate('By submitting an identity verification request, you agree to the terms of use and privacy policy.', language)}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="max-w-4xl mt-12 md:mt-24 lg:mt-32 mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-center mb-6">{translate('Identity verification', language)}</h2>
            {apiError && <div className="text-red-500 mb-4">{apiError}</div>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {steps.map((step) => (
                    <div key={step.id} className="border rounded-lg p-4 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                            onClick={() => {
                                setImages(prevImages => ({ ...prevImages, [step.id]: null }));
                            }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex flex-col items-center justify-center">
                            {images[step.id] ? (
                                <div className="w-full h-32 mb-4 flex items-center justify-center">
                                    <span className="text-green-500">{translate('Image Uploaded', language)}</span>
                                </div>
                            ) : (
                                <div className="w-full h-32 mb-4 border-2 border-dashed border-gray-300 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}

                            <p className="text-xs text-center mb-2">{step.title}</p>

                            <label className="block">
                                <span className="text-xs text-orange-500 cursor-pointer hover:underline">
                                    {translate('Upload photo from here', language)}
                                </span>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(step.id, e)}
                                />
                            </label>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-center">
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? translate('Processing...', language) : translate('Send', language)}
                </button>
            </div>

            <p className="mt-6 text-xs text-center text-gray-600">
                {translate('By submitting an identity verification request, you agree to the terms of use and privacy policy.', language)}
            </p>
        </div>
    );
};

export default IdentityVerification;