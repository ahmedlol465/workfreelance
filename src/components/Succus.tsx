// import { Link } from 'react-router-dom';
// import success from '../assets/pana.png'
// const AccountActivated = () => {
//   localStorage.removeItem("currentStep")
//   return (
//     <div className="my-32  mt-14 bg-white p-8 rounded-lg shadow-md  w-[700px]">
//       <div className="border rounded-md mb-6">
//         <img
//           src={success} // Replace with the actual path to your image
//           alt="Account Activated"
//           className="w-full h-[80vh]" // Or specify fixed dimensions if needed
//         />
//       </div>


//       <p className="text-center text-sm text-gray-700 mb-6">
//         Your account has been successfully activated! You can start working
//       </p>

//       <div className="flex items-center justify-center">
//         <Link to="/react/AddProjectForm">
//         <button
//           className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
//           type="button" 
//           >
//           Add your project
//         </button>
//           </Link>
//       </div>
//     </div>
//   );
// };

// export default AccountActivated;




import { Link } from 'react-router-dom';
import success from '../assets/pana.png';
import { useEffect, useState } from 'react';

const translations = {
    en: {
        "Account Activated!": "Account Activated!",
        "Your account has been successfully activated! You can start working": "Your account has been successfully activated! You can start working",
        "Add your project": "Add your project",
    },
    ar: {
        "Account Activated!": "تم تفعيل حسابك!",
        "Your account has been successfully activated! You can start working": "تم تفعيل حسابك بنجاح! يمكنك البدء في العمل",
        "Add your project": "أضف مشروعك",
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};

const AccountActivated = () => {
    localStorage.removeItem("currentStep");
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


    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="my-16 md:my-32 mt-10 md:mt-14 bg-gray-100 flex justify-center items-center min-h-screen"> {/* Added flex and min-h-screen for vertical centering, responsive margins */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-md md:max-w-lg"> {/* Responsive padding and max-width */}
                <h2 className="text-center text-xl md:text-2xl font-semibold text-gray-800 mb-6">{translate("Account Activated!", language)}</h2> {/* Translated heading, responsive font size and margin */}
                <div className="border rounded-md mb-6">
                    <img
                        src={success}
                        alt={translate("Account Activated!", language)}
                        className="w-full h-auto rounded-t-md" // Image made responsive, rounded top corners
                        style={{ maxHeight: '60vh', objectFit: 'contain' }} // Added max-height and object-fit
                    />
                </div>

                <p className="text-center text-sm md:text-base text-gray-700 mb-6 px-4"> {/* Responsive text size and padding */}
                    {translate("Your account has been successfully activated! You can start working", language)}
                </p>

                <div className="flex items-center justify-center">
                    <Link to="/react/AddProjectForm">
                        <button
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-6 md:px-10 rounded focus:outline-none focus:shadow-outline text-sm md:text-base" // Responsive padding and font size
                            type="button"
                        >
                            {translate("Add your project", language)}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AccountActivated;