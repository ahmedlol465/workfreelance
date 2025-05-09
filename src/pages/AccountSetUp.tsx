// import { useEffect, useState } from "react";
// import AccountData from "../components/AcountSetup/AccountData";
// import HowYouKnowForm from "../components/AcountSetup/TellAboutYourSelf";
// import SignupFormStep2 from "../components/AcountSetup/Profile";
// import AccountActivated from "../components/Succus";
// import { FaCheckCircle } from "react-icons/fa"; // Import icons
// import BusinessGallery from "../components/BussnissGallaryFreeLance";

// const AccountSetup: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState(
//     parseInt(localStorage.getItem("currentStep") || "1")
//   );
//   // const [isLoading, setIsLoading] = useState(false); // Add loading state
//   const [isFreelance, setIsFreeLancer] = useState(false);

//   useEffect(() => {
//     if (localStorage.getItem("accountType") === "freelancer") {
//       setIsFreeLancer(true);
//     }
//   }, [isFreelance]);

//   const handleNext = () => {
//     if (localStorage.getItem("accountType") === "freelancer") {
//       setIsFreeLancer(true);
//     }
//     setCurrentStep(currentStep + 1);
//     localStorage.setItem("currentStep", currentStep.toString());
//   };

//   const steps = [
//     { label: "Account Data" },
//     { label: "Profile" },
//     { label: "Tell Us About Yourself" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {" "}
//       {/* Added min-height for better layout */}
//       <div className="container mx-auto px-4 py-16">
//         {/* Progress Bar */}
//         <div className="">
//           <div className="flex items-center relative">
//             {/* Solid green line - Centered vertically */}
//             <div className="absolute left-0 ml-10 w-[1150px] h-0.5 bg-green-500 transform top-[17px] -translate-y-1/2 z-0 "></div>

//             {/* Step circles and labels */}
//             <div className="flex justify-between w-full">
//               {steps.map((step, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-col items-center relative z-10"
//                 >
//                   {/* Step circle */}
//                   <div
//                     className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-lg
//                             ${
//                               index + 1 < currentStep
//                                 ? "border-green-500 bg-green-500 text-white" // Completed: Green background, white text
//                                 : index + 1 === currentStep
//                                 ? "border-green-500 bg-white text-green-500" // Current: White background, green text
//                                 : "border-gray-300 bg-white text-gray-500" // Pending: White background, grey text
//                             }
//                           `}
//                   >
//                     {index + 1 < currentStep ? (
//                       <FaCheckCircle className="w-5 h-5 text-white" /> // Green checkmark for completed steps
//                     ) : index + 1 === currentStep ? (
//                       currentStep
//                     ) : (
//                       index + 1 // Step number for pending steps
//                     )}
//                   </div>

//                   {/* Step label */}
//                   <span
//                     className={`mt-2 text-sm text-center ${
//                       index + 1 <= currentStep
//                         ? "font-bold text-gray-800"
//                         : "text-gray-500"
//                     }`}
//                     style={{ width: "max-content" }}
//                   >
//                     {step.label}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Render the appropriate component based on currentStep */}
//         {/* {renderStepContent()} */}
//         <div className=" flex justify-center w-full">
//           <div>
//             <div>
//               {currentStep === 1 && (
//                 <AccountData setCurrentStep={setCurrentStep} />
//               )}
//               {currentStep === 2 && (
//                 <SignupFormStep2
//                   setCurrentStep={setCurrentStep}
//                   // setIsLoading={setIsLoading}
//                 />
//               )}
//               {currentStep === 3 &&
//                 (isFreelance ? <BusinessGallery /> : <HowYouKnowForm />)}{" "}
//               {currentStep > 3 && <AccountActivated />}
//             </div>
//             <div className=" flex justify-center mt-[-150px]">
//               {currentStep < 4 && currentStep > 2 && !isFreelance ? (
//                 <button
//                   onClick={handleNext}
//                   className={`mb-4 bg-orange-500 w-[50%] hover:bg-orange-600 text-white font-semibold py-3 px-12 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform hover:scale-105 active:scale-95
//                   `}
//                   type="button" // Change to "submit" if you want to submit the form
//                 >
//                   {"Next"} {/* Change text when loading */}
//                 </button>
//               ) : (
//                 <div></div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountSetup;



import { useEffect, useState } from "react";
import AccountData from "../components/AcountSetup/AccountData";
import HowYouKnowForm from "../components/AcountSetup/TellAboutYourSelf";
import SignupFormStep2 from "../components/AcountSetup/Profile";
import AccountActivated from "../components/Succus";
import { FaCheckCircle } from "react-icons/fa";
import BusinessGallery from "../components/BussnissGallaryFreeLance";

const translations = {
    en: {
        "Account Data": "Account Data",
        "Profile": "Profile",
        "Tell Us About Yourself": "Tell Us About Yourself",
        "Next": "Next",
        "Step": "Step",
    },
    ar: {
        "Account Data": "بيانات الحساب",
        "Profile": "الملف الشخصي",
        "Tell Us About Yourself": "أخبرنا عن نفسك",
        "Next": "التالي",
        "Step": "خطوة",
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};

const AccountSetup: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(
        parseInt(localStorage.getItem("currentStep") || "1")
    );
    const [isFreelance, setIsFreeLancer] = useState(false);
    const [language, setLanguage] = useState<'en' | 'ar'>(
        localStorage.getItem('language') === 'ar' ? 'ar' : 'en'
    );

    useEffect(() => {
        if (localStorage.getItem("accountType") === "freelancer") {
            setIsFreeLancer(true);
        }
    }, [isFreelance]);

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage === 'ar' || storedLanguage === 'en') {
            setLanguage(storedLanguage);
        } else {
            setLanguage('en'); // Default to English if no language is set
        }
    }, []);

    const handleNext = () => {
        if (localStorage.getItem("accountType") === "freelancer") {
            setIsFreeLancer(true);
        }
        setCurrentStep(currentStep + 1);
        localStorage.setItem("currentStep", currentStep.toString());
    };

    const steps = [
        { label: translate("Account Data", language) },
        { label: translate("Profile", language) },
        { label: translate("Tell Us About Yourself", language) },
    ];

    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-16 md:px-8 md:py-24">
                {/* Progress Bar */}
                <div className="mb-10 md:mb-16"> {/* Increased margin for larger screens */}
                    <div className="flex items-center relative">
                        {/* Solid green line - Centered vertically */}
                        <div className="absolute left-0 md:ml-10 ml-5 md:w-[1150px] w-[90%] h-0.5 bg-green-500 transform top-[17px] -translate-y-1/2 z-0 md:block hidden"></div> {/* Responsive width */}
                        <div className="absolute left-0 ml-5 md:hidden block w-full h-0.5 bg-green-500 transform top-[17px] -translate-y-1/2 z-0 "></div> {/* Mobile progress line */}


                        {/* Step circles and labels */}
                        <div className="flex justify-between w-full">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center relative z-10"
                                >
                                    {/* Step circle */}
                                    <div
                                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-lg
                                            ${
                                                index + 1 < currentStep
                                                    ? "border-green-500 bg-green-500 text-white"
                                                    : index + 1 === currentStep
                                                    ? "border-green-500 bg-white text-green-500"
                                                    : "border-gray-300 bg-white text-gray-500"
                                            }
                                        `}
                                    >
                                        {index + 1 < currentStep ? (
                                            <FaCheckCircle className="w-5 h-5 text-white" />
                                        ) : index + 1 === currentStep ? (
                                            currentStep
                                        ) : (
                                            index + 1
                                        )}
                                    </div>

                                    {/* Step label */}
                                    <span
                                        className={`mt-2 text-sm text-center ${
                                            index + 1 <= currentStep
                                                ? "font-bold text-gray-800"
                                                : "text-gray-500"
                                        }`}
                                        style={{ width: "max-content" }}
                                    >
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Render the appropriate component based on currentStep */}
                <div className=" flex justify-center w-full">
                    <div className="w-full md:w-2/3 lg:w-full"> {/* Responsive width for content area */}
                        <div>
                            {currentStep === 1 && (
                                <AccountData setCurrentStep={setCurrentStep} />
                            )}
                            {currentStep === 2 && (
                                <SignupFormStep2 setCurrentStep={setCurrentStep} />
                            )}
                            {currentStep === 3 &&
                                (isFreelance ? <BusinessGallery /> : <HowYouKnowForm />)}
                            {currentStep > 3 && <AccountActivated />}
                        </div>
                        <div className="flex justify-center mt-6 md:mt-[-150px]"> {/* Adjusted margin for mobile and desktop */}
                            {currentStep < 4 && currentStep > 2 && !isFreelance ? (
                                <button
                                    onClick={handleNext}
                                    className={`mb-4 bg-orange-500 w-full md:w-[50%] hover:bg-orange-600 text-white font-semibold py-3 px-12 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform hover:scale-105 active:scale-95`}
                                    type="button"
                                >
                                    {translate("Next", language)}
                                </button>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSetup;