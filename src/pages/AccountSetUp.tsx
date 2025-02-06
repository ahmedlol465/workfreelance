import  { useState } from "react";
import AccountData from "../components/AcountSetup/AccountData";
import HowYouKnowForm from "../components/AcountSetup/TellAboutYourSelf";
import SignupFormStep2 from "../components/AcountSetup/Profile";
// import { FaCheckCircle } from "react-icons/fa";
import AccountActivated from "../components/Succus";
import { FaCheckCircle } from "react-icons/fa"; // Import icons

const AccountSetup: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(
    parseInt(localStorage.getItem("currentStep") || "1")
  );
  console.log(currentStep);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
    localStorage.setItem("currentStep", currentStep.toString());
  };

  //   const renderStepContent = () => {
  //     switch (currentStep) {
  //       case 1:
  //         return <AccountData onNext={handleNext} />;
  //       case 2:
  //         return <SignupFormStep2 onNext={handleNext} />;
  //       case 3:
  //         return <HowYouKnowForm onNext={handleNext} />;
  //       default:
  //         return null; // Or a "Thank you" message
  //     }
  //   };

  const steps = [
    { label: "Account Data" },
    { label: "Profile" },
    { label: "Tell Us About Yourself" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {" "}
      {/* Added min-height for better layout */}
      <div className="container mx-auto px-4 py-16">
        {/* Progress Bar */}
        <div className="">
      <div className="flex items-center relative">
        {/* Solid green line - Centered vertically */}
        <div className="absolute left-0 ml-10 w-[1150px] h-0.5 bg-green-500 transform top-[17px] -translate-y-1/2 z-0 "></div>

        {/* Step circles and labels */}
        <div className="flex justify-between w-full">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center relative z-10">
              {/* Step circle */}
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-lg
                            ${
                              index + 1 < currentStep
                                ? "border-green-500 bg-green-500 text-white" // Completed: Green background, white text
                                : index + 1 === currentStep
                                ? "border-green-500 bg-white text-green-500" // Current: White background, green text
                                : "border-gray-300 bg-white text-gray-500" // Pending: White background, grey text
                            }
                          `}
              >
                {index + 1 < currentStep ? (
                  <FaCheckCircle className="w-5 h-5 text-white" /> // Green checkmark for completed steps
                ) : index + 1 === currentStep ? (
                  currentStep
                ) : (
                  index + 1 // Step number for pending steps
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
        {/* {renderStepContent()} */}
        <div className=" flex justify-center w-full">
          <div>
            <div>
              {currentStep === 1 && (
                <AccountData setCurrentStep={setCurrentStep} />
              )}
              {currentStep === 2 && (
                <SignupFormStep2 setCurrentStep={setCurrentStep} />
              )}
              {currentStep === 3 && <HowYouKnowForm />}
              {currentStep > 3 && <AccountActivated />}
            </div>
            <div className=" flex justify-center mt-[-150px]">
              {currentStep < 4 && currentStep > 2 ? (
                <button
                  onClick={handleNext}
                  className="  bg-orange-500 w-[50%] hover:bg-orange-600 text-white font-semibold py-3 px-12 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform hover:scale-105 active:scale-95"
                  type="button" // Change to "submit" if you want to submit the form
                >
                  Next
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
