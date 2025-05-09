// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// interface AccountDataProps {
//   setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
// }

// interface FormState {
//   username: string;
//   accountType: "freelancer" | "project_owner" | "company";
//   termsAgreed: boolean;
// }

// const AccountData: React.FC<AccountDataProps> = ({ setCurrentStep }) => {
//   const [form, setForm] = useState<FormState>({
//     username: "",
//     accountType: "freelancer",
//     termsAgreed: false,
//   });

//   const navigate = useNavigate();

//   const [errors, setErrors] = useState<Partial<FormState>>({});
//   const [error, setError] = useState<string | null>(null); // Error can be string or null
//   const [isLoading, setIsLoading] = useState(false);
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prevForm) => ({
//       ...prevForm,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined })); // Clear error on input change
//     setError(null); // Clear global error on input change
//   };

//   const validateForm = (): boolean => {
//     const newErrors: Partial<FormState> = {};

//     if (!form.username.trim()) {
//       newErrors.username = "Username is required";
//     } else if (form.username.length < 3) {
//       newErrors.username = "Username must be at least 3 characters";
//     }

//     if (!form.termsAgreed) {
//       newErrors.termsAgreed = true;
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (validateForm()) {
//       setIsLoading(true); // Start loading only after validation passes
//       setError(null); // Clear any previous global error before submitting
//       try {
//         const basicUserInfoString = localStorage.getItem("basicUserInfo");
//         const basicUserInfo = basicUserInfoString
//           ? JSON.parse(basicUserInfoString)
//           : {}; // Handle potential null

//         const { username: userName, accountType } = form;
//         const fullData = { ...basicUserInfo, userName, accountType };

//         const response = await axios.post(
//           `${process.env.REACT_APP_BACK_URL}/register`,
//           fullData
//         );

//         // console.log("sadasd", response.data.firstName);
//         // const userNameErrors = response["errors validation inputs"];

//         localStorage.setItem("currentStep", "2");
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("accountType", form.accountType);
//         localStorage.removeItem("basicUserInfo");
//         setCurrentStep(2);
//       } catch (err: any) {
//         const data = err.response.data;

//         if (data["errors validation inputs"]?.firstName) {
//           localStorage.removeItem("basicUserInfo");
//           localStorage.removeItem("currentStep");
//           navigate("/react/joinUs");
//         } else {
//           console.log("First Name:", err.data.firstName);
//         }

//         setIsLoading(false); // Ensure loading is off even on error
//         if (err.response) {
//           setError(err.response.data.message);
//           console.error("Registration failed:", err.response.data);
//         } else if (err.request) {
//           console.error(
//             "Registration failed: No response received",
//             err.request
//           );
//           setError("No response received from the server.");
//         } else {
//           console.error("Registration failed:", err.message);
//           setError("An error occurred. Please try again later.");
//         }
//       } finally {
//         setIsLoading(false); // Ensure loading is off after request completes
//       }
//     }
//   };

//   const nameString = localStorage.getItem("basicUserInfo");
//   const name = nameString
//     ? JSON.parse(nameString)
//     : { firstName: "", lastName: "" }; // Handle potential null

//   return (
//     <div className="py-20 mb-40  flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-20 rounded shadow-md w-full max-w-4xl">
//         <h1 className="text-center py-2 text-2xl font-semibold text-gray-800 mb-4">
//           {name.firstName} {name.lastName}
//         </h1>

//         {/* Username */}
//         <div className="mb-4">
//           <label
//             htmlFor="username"
//             className="block text-gray-700 text-sm font-bold mb-2"
//           >
//             Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={form.username}
//             onChange={handleChange}
//             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//               errors.username ? "border-red-500" : ""
//             }`}
//           />
//           <h6 className="text-sm">
//             It must be unique and composed of English letters and numbers only,
//             with underscores (_) allowed between them. It cannot be changed
//             later.
//           </h6>
//           {errors.username && (
//             <p className="text-red-500 text-xs italic">{errors.username}</p>
//           )}
//         </div>

//         {/* Account Type */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Account Type
//           </label>
//           <div className="space-y-2">
//             {["freelancer", "project_owner", "company"].map((type) => (
//               <div
//                 key={type}
//                 className={`flex flex-col border-2 rounded-md p-4 ${
//                   form.accountType === type
//                     ? "border-blue-400 text-blue-500"
//                     : "border-gray-300"
//                 }`}
//                 onClick={() => {
//                   if (type !== "company") {
//                     document.getElementById(type)?.click(); // Use optional chaining here as well
//                   }
//                 }}
//                 style={{
//                   cursor: type === "company" ? "not-allowed" : "pointer",
//                 }}
//               >
//                 <div className="flex items-center">
//                   <input
//                     type="radio"
//                     id={type}
//                     name="accountType"
//                     value={type}
//                     checked={form.accountType === type}
//                     onChange={handleChange}
//                     disabled={type === "company"}
//                     className="mr-2 cursor-pointer disabled:cursor-not-allowed"
//                   />
//                   <label
//                     htmlFor={type}
//                     className={`font-medium ${
//                       form.accountType === type
//                         ? "text-blue-500"
//                         : "text-gray-700"
//                     } ${type === "company" ? "text-[#959595] " : ""}`}
//                   >
//                     {type.replace("_", " ")}
//                   </label>
//                 </div>
//                 <p
//                   className={`text-sm ${
//                     form.accountType === type
//                       ? "text-blue-500"
//                       : "text-gray-500"
//                   }`}
//                 >
//                   {type === "freelancer"
//                     ? "(Services seller / Project implementer)"
//                     : type === "project_owner"
//                     ? "(Project owner / Services buyer)"
//                     : "(Remote Hiring of Freelancers)"}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Terms Agreement */}
//         <div className="mb-4">
//           <label className="flex items-center">
//             <input
//               type="checkbox"
//               name="termsAgreed"
//               checked={form.termsAgreed}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <span className="text-gray-700">
//               I agree to the{" "}
//               <a href="#" className="text-blue-500">
//                 terms of use
//               </a>{" "}
//               and{" "}
//               <a href="#" className="text-blue-500">
//                 privacy policy
//               </a>
//             </span>
//           </label>
//           {errors.termsAgreed && (
//             <p className="text-red-500 text-xs italic">
//               You must agree to the terms
//             </p>
//           )}
//         </div>

//         {error && <div className="text-red-500">{error}</div>}
//         <button
//           type="submit"
//           onClick={handleSubmit}
//           className={`w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition-colors duration-300
//               ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
//             `}
//           disabled={isLoading}
//         >
//           {isLoading ? "Loading..." : "Complete Registration"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AccountData;




import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AccountDataProps {
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

interface FormState {
    username: string;
    accountType: "freelancer" | "project_owner" | "company";
    termsAgreed: boolean;
}

const translations = {
    en: {
        "Account Data": "Account Data", // Might not be used directly in this component, but good to keep
        "Username": "Username",
        "It must be unique and composed of English letters and numbers only, with underscores (_) allowed between them. It cannot be changed later.": "It must be unique and composed of English letters and numbers only, with underscores (_) allowed between them. It cannot be changed later.",
        "Account Type": "Account Type",
        "freelancer": "freelancer",
        "project_owner": "project_owner",
        "company": "company",
        "(Services seller / Project implementer)": "(Services seller / Project implementer)",
        "(Project owner / Services buyer)": "(Project owner / Services buyer)",
        "(Remote Hiring of Freelancers)": "(Remote Hiring of Freelancers)",
        "I agree to the ": "I agree to the ",
        "terms of use": "terms of use",
        "and": "and",
        "privacy policy": "privacy policy",
        "You must agree to the terms": "You must agree to the terms",
        "Loading...": "Loading...",
        "Complete Registration": "Complete Registration",
        "Register Account": "Register Account", // Added title
    },
    ar: {
        "Account Data": "بيانات الحساب",
        "Username": "اسم المستخدم",
        "It must be unique and composed of English letters and numbers only, with underscores (_) allowed between them. It cannot be changed later.": "يجب أن يكون فريدًا ومكونًا من حروف وأرقام إنجليزية فقط، مع السماح بالشرطات السفلية (_) بينها. لا يمكن تغييره لاحقًا.",
        "Account Type": "نوع الحساب",
        "freelancer": "مستقل",
        "project_owner": "صاحب مشروع",
        "company": "شركة",
        "(Services seller / Project implementer)": "(بائع خدمات / منفذ مشروع)",
        "(Project owner / Services buyer)": "(صاحب مشروع / مشتري خدمات)",
        "(Remote Hiring of Freelancers)": "(توظيف المستقلين عن بعد)",
        "I agree to the ": "أوافق على ",
        "terms of use": "شروط الاستخدام",
        "and": "و",
        "privacy policy": "سياسة الخصوصية",
        "You must agree to the terms": "يجب الموافقة على الشروط",
        "Loading...": "جاري التحميل...",
        "Complete Registration": "إكمال التسجيل",
        "Register Account": "تسجيل حساب", // Added title
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};

const AccountData: React.FC<AccountDataProps> = ({ setCurrentStep }) => {
    const [form, setForm] = useState<FormState>({
        username: "",
        accountType: "freelancer",
        termsAgreed: false,
    });
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


    const navigate = useNavigate();

    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === "checkbox" ? checked : value,
        }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
        setError(null);
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<FormState> = {};

        if (!form.username.trim()) {
            newErrors.username = translate("Username is required", language); // Example: Translate error message - but actually error messages are better not translated and handled by backend
        } else if (form.username.length < 3) {
            newErrors.username = translate("Username must be at least 3 characters", language); // Example: Translate error message - but actually error messages are better not translated and handled by backend
        }

        if (!form.termsAgreed) {
            newErrors.termsAgreed = true;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            setIsLoading(true);
            setError(null);
            try {
                const basicUserInfoString = localStorage.getItem("basicUserInfo");
                const basicUserInfo = basicUserInfoString
                    ? JSON.parse(basicUserInfoString)
                    : {};

                const { username: userName, accountType } = form;
                const fullData = { ...basicUserInfo, userName, accountType };

                const response = await axios.post(
                    `${process.env.REACT_APP_BACK_URL}/register`,
                    fullData
                );


                localStorage.setItem("currentStep", "2");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("accountType", form.accountType);
                localStorage.removeItem("basicUserInfo");
                setCurrentStep(2);
            } catch (err: any) {
                const data = err.response.data;

                if (data["errors validation inputs"]?.firstName) {
                    localStorage.removeItem("basicUserInfo");
                    localStorage.removeItem("currentStep");
                    navigate("/react/joinUs");
                } else {
                    console.log("First Name:", err.data.firstName);
                }

                setIsLoading(false);
                if (err.response) {
                    setError(err.response.data.message);
                    console.error("Registration failed:", err.response.data);
                } else if (err.request) {
                    console.error(
                        "Registration failed: No response received",
                        err.request
                    );
                    setError("No response received from the server."); //  Not translated as these are technical errors
                } else {
                    console.error("Registration failed:", err.message);
                    setError("An error occurred. Please try again later."); // Not translated as these are technical errors
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    const nameString = localStorage.getItem("basicUserInfo");
    const name = nameString
        ? JSON.parse(nameString)
        : { firstName: "", lastName: "" };

    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="py-10 md:py-20 mb-10 md:mb-40  flex justify-center items-center min-h-screen bg-gray-100"> {/* Responsive padding & margin */}
            <div className="bg-white p-6 md:p-12 lg:p-20 rounded shadow-md w-full max-w-lg md:max-w-3xl lg:max-w-4xl"> {/* Responsive padding & width */}
                <h1 className="text-center py-2 text-xl md:text-2xl font-semibold text-gray-800 mb-4"> {/* Responsive font size */}
                    {name.firstName} {name.lastName}
                </h1>
                <h2 className="text-center py-2 text-lg md:text-xl font-semibold text-gray-800 mb-6">{translate("Register Account", language)}</h2> {/* Added title & Translation */}


                {/* Username */}
                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        {translate("Username", language)}
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? "border-red-500" : ""
                            }`}
                    />
                    <h6 className="text-sm text-gray-500"> {/* Adjusted color for less emphasis */}
                        {translate("It must be unique and composed of English letters and numbers only, with underscores (_) allowed between them. It cannot be changed later.", language)}
                    </h6>
                    {errors.username && (
                        <p className="text-red-500 text-xs italic">{errors.username}</p>
                    )}
                </div>

                {/* Account Type */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        {translate("Account Type", language)}
                    </label>
                    <div className="space-y-2">
                        {["freelancer", "project_owner", "company"].map((type) => (
                            <div
                                key={type}
                                className={`flex flex-col border-2 rounded-md p-4 hover:border-blue-400 transition-colors duration-200 ${form.accountType === type
                                    ? "border-blue-400 text-blue-500"
                                    : "border-gray-300"
                                    }`}
                                onClick={() => {
                                    if (type !== "company") {
                                        document.getElementById(type)?.click();
                                    }
                                }}
                                style={{
                                    cursor: type === "company" ? "not-allowed" : "pointer",
                                }}
                            >
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id={type}
                                        name="accountType"
                                        value={type}
                                        checked={form.accountType === type}
                                        onChange={handleChange}
                                        disabled={type === "company"}
                                        className="mr-2 cursor-pointer disabled:cursor-not-allowed"
                                    />
                                    <label
                                        htmlFor={type}
                                        className={`font-medium ${form.accountType === type
                                            ? "text-blue-500"
                                            : "text-gray-700"
                                            } ${type === "company" ? "text-[#959595] " : ""}`}
                                    >
                                        {translate(type, language).replace("_", " ")}
                                    </label>
                                </div>
                                <p
                                    className={`text-sm text-gray-500 ${form.accountType === type
                                        ? "text-blue-500"
                                        : "text-gray-500"
                                        }`}
                                >
                                    {translate(`(${
                                        type === "freelancer"
                                            ? "Services seller / Project implementer"
                                            : type === "project_owner"
                                                ? "Project owner / Services buyer"
                                                : "Remote Hiring of Freelancers"
                                    })`, language)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Terms Agreement */}
                <div className="mb-6 md:mb-8"> {/* Increased margin bottom for terms */}
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="termsAgreed"
                            checked={form.termsAgreed}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <span className="text-gray-700 text-sm"> {/* Reduced text size for terms */}
                            {translate("I agree to the ", language)}
                            <a href="#" className="text-blue-500 hover:underline">
                                {translate("terms of use", language)}
                            </a>{" "}
                            {translate("and", language)} {" "}
                            <a href="#" className="text-blue-500 hover:underline">
                                {translate("privacy policy", language)}
                            </a>
                        </span>
                    </label>
                    {errors.termsAgreed && (
                        <p className="text-red-500 text-xs italic">
                            {translate("You must agree to the terms", language)}
                        </p>
                    )}
                </div>

                {error && <div className="text-red-500 mb-4">{error}</div>} {/* Added margin bottom for error */}
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className={`w-full bg-orange-500 text-white font-semibold py-2.5 md:py-3 px-4 rounded hover:bg-orange-600 transition-colors duration-300 text-sm md:text-base
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}
                    disabled={isLoading}
                >
                    {isLoading ? translate("Loading...", language) : translate("Complete Registration", language)}
                </button>
            </div>
        </div>
    );
};

export default AccountData;