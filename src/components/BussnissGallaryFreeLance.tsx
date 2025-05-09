// import React, { useState } from "react";
// import axios, { AxiosError } from "axios";
// import { MdClose } from "react-icons/md";

// type Work = {
//   title: string;
//   description: string;
//   thumbnail: File | null;
//   thumbnailPreviewUrl: string | null;
//   heroImage: File | null;
//   heroImagePreviewUrl: string | null;
//   completionDate: string;
//   link: string;
//   skills: string[];
//   submissionStatus: "idle" | "submitting" | "success" | "error";
//   submissionError: string | null;
//   isExpanded: boolean;
// };

// interface Skill {
//   name: string;
// }

// const availableSkills: Skill[] = [
//   { name: "Translate" },
//   { name: "Web design" },
//   { name: "Web development" },
//   { name: "Illustrator" },
//   { name: "Photo shop" },
//   { name: "Write articles" },
//   { name: "Graphic design" },
//   { name: "Logo design" },
// ];

// const BusinessGallery: React.FC = () => {
//   const initialWorksState: Work[] = [
//     {
//       title: "",
//       description: "",
//       thumbnail: null,
//       thumbnailPreviewUrl: null,
//       heroImage: null,
//       heroImagePreviewUrl: null,
//       completionDate: "",
//       link: "",
//       skills: [],
//       submissionStatus: "idle",
//       submissionError: null,
//       isExpanded: true,
//     },
//     {
//       title: "",
//       description: "",
//       thumbnail: null,
//       thumbnailPreviewUrl: null,
//       heroImage: null,
//       heroImagePreviewUrl: null,
//       completionDate: "",
//       link: "",
//       skills: [],
//       submissionStatus: "idle",
//       submissionError: null,
//       isExpanded: false,
//     },
//   ];
//   const [works, setWorks] = useState<Work[]>(initialWorksState);
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [agreeToSecondTerm, setAgreeToSecondTerm] = useState(false); // New state for second term
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [isSkillsOpen, setIsSkillsOpen] = useState(false);
//   const [skillSearchTerm, setSkillSearchTerm] = useState("");
//   const [isSubmittingAll, setIsSubmittingAll] = useState(false);

//   const allWorksValid = works.every(
//     (work) => work.title.trim() && work.description.trim()
//   );

//   const handleWorkToggle = (index: number) => {
//     const updatedWorks = works.map((work, i) => ({
//       ...work,
//       isExpanded: i === index ? !work.isExpanded : false,
//     }));
//     setWorks(updatedWorks);
//   };

//   const handleWorkChange = (index: number, field: string, value: any) => {
//     const updatedWorks = [...works];
//     const currentWork = updatedWorks[index];

//     if (field === "thumbnail") {
//       const file = value as File;
//       currentWork.thumbnail = file;
//       currentWork.thumbnailPreviewUrl = file ? URL.createObjectURL(file) : null;
//     } else if (field === "heroImage") {
//       const file = value as File;
//       currentWork.heroImage = file;
//       currentWork.heroImagePreviewUrl = file ? URL.createObjectURL(file) : null;
//     } else {
//       (currentWork as any)[field] = value;
//     }
//     updatedWorks[index].submissionError = null; // Clear error when input changes
//     setWorks(updatedWorks);
//   };

//   const handleRemoveImage = (
//     index: number,
//     imageType: "thumbnail" | "heroImage"
//   ) => {
//     const updatedWorks = [...works];
//     const currentWork = updatedWorks[index];
//     if (imageType === "thumbnail") {
//       currentWork.thumbnail = null;
//       currentWork.thumbnailPreviewUrl = null;
//     } else if (imageType === "heroImage") {
//       currentWork.heroImage = null;
//       currentWork.heroImagePreviewUrl = null;
//     }
//     setWorks(updatedWorks);
//   };

//   const handleSkillSelect = (index: number, skill: Skill) => {
//     const updatedWorks = [...works];
//     if (!updatedWorks[index].skills.includes(skill.name)) {
//       updatedWorks[index].skills.push(skill.name);
//     }
//     setWorks(updatedWorks);
//     setSkillSearchTerm("");
//     setIsSkillsOpen(false);
//   };

//   const removeSkill = (index: number, skillName: string) => {
//     const updatedWorks = [...works];
//     updatedWorks[index].skills = updatedWorks[index].skills.filter(
//       (s) => s !== skillName
//     );
//     setWorks(updatedWorks);
//   };

//   const filteredSkills = availableSkills.filter((skill) =>
//     skill.name.toLowerCase().includes(skillSearchTerm.toLowerCase())
//   );

//   const submitWork = async (index: number) => {
//     const work = works[index];
//     if (!work.title || !work.description) {
//       setError(`Please fill in title and description for Work ${index + 1}.`);
//       return false;
//     }

//     const formData = new FormData();
//     const userId = "1"; // Replace with actual user ID
//     formData.append("userId", userId);
//     formData.append("workTitle", work.title);
//     formData.append("workDescription", work.description);
//     if (work.thumbnail) formData.append("thumbnail", work.thumbnail);
//     if (work.heroImage) formData.append("workPhoto", work.heroImage);
//     formData.append("completeDate", work.completionDate);
//     formData.append("workLink", work.link);
//     formData.append("skillsOfWork", work.skills.join(","));

//     const updatedWorks = [...works];
//     updatedWorks[index].submissionStatus = "submitting";
//     updatedWorks[index].submissionError = null;
//     setWorks(updatedWorks);

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BACK_URL}/UserWork`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       console.log(`Work ${index + 1} submitted successfully:`, response.data);
//       updatedWorks[index].submissionStatus = "success";
//       setWorks(updatedWorks);
//       return true;
//     } catch (error: any) {
//       console.error(
//         `Error submitting Work ${index + 1}:`,
//         error.response?.data
//       );
//       const axiosError = error as AxiosError<{ message: string }>;
//       updatedWorks[index].submissionStatus = "error";
//       updatedWorks[index].submissionError =
//         axiosError.response?.data.message || "An error occurred.";
//       setWorks(updatedWorks);
//       return false;
//     }
//   };

//   const handleSubmit = async () => {
//     if (!agreeToTerms || !agreeToSecondTerm) {
//       // Check both terms
//       setError("You must agree to both terms.");
//       return;
//     }

//     let allValid = true;
//     const validatedWorks = works.map((work) => {
//       const isValid = work.title.trim() && work.description.trim();
//       if (!isValid) allValid = false;
//       return {
//         ...work,
//         submissionError: isValid ? null : "Please fill required fields",
//         submissionStatus: isValid ? work.submissionStatus : "error",
//       };
//     });

//     if (!allValid) {
//       setWorks(validatedWorks);
//       setError("Please fix errors in work entries");
//       return;
//     }

//     setError(null);
//     setIsSubmittingAll(true);

//     let allSuccessful = true;
//     for (let i = 0; i < works.length; i++) {
//       const success = await submitWork(i);
//       if (!success) allSuccessful = false;
//     }

//     setIsSubmittingAll(false);
//     setSuccessMessage(allSuccessful ? "All works submitted!" : null);
//     localStorage.setItem("currentStep", "4");
//     window.location.reload();
//   };

//   return (
//     <>
//       <div className="bg-gray-100 py-20">
//         <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
//           <h2 className="text-2xl font-semibold mb-4">Build your gallery</h2>
//           <p className="text-gray-600 text-sm leading-relaxed mb-6">
//             To add the best format media and your design device if your field or
//             niche is available because each niche will undergo the appropriate
//             niche according the application. <br />
//             1- Adhere to the font-done protocol (all text copied in
//             hexadecimal).
//             <br />
//             2- Make sure that the words are distinctive and strong quality.
//             <br />
//             3- Write a clear title position description that explains the
//             features of the brochure. <br />
//             4- Do not submit empty or duplicate works. <br />
//           </p>
//         </div>
//       </div>

//       <div className="min-h-screen bg-gray-100">
//         <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
//           {works.map((work, index) => (
//             <div key={index} className="mb-8 border rounded">
//               <div
//                 className="flex justify-between p-4 cursor-pointer bg-gray-100 rounded-t"
//                 onClick={() => handleWorkToggle(index)}
//               >
//                 <h3 className="text-lg font-semibold">
//                   Work {index + 1} {!work.title && "(Not configured)"}
//                 </h3>
//                 <span>{work.isExpanded ? "-" : "+"}</span>
//               </div>

//               {work.isExpanded && (
//                 <div className="p-4">
//                   {work.submissionStatus === "error" && (
//                     <div className="text-red-500 mb-2">
//                       {work.submissionError}
//                     </div>
//                   )}
//                   {work.submissionStatus === "submitting" && (
//                     <div className="text-blue-500 mb-2">Submitting...</div>
//                   )}

//                   <div className="mb-4">
//                     <input
//                       type="text"
//                       className={`w-full p-2 border rounded ${
//                         work.submissionError
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                       placeholder="Work Title *"
//                       value={work.title}
//                       onChange={(e) =>
//                         handleWorkChange(index, "title", e.target.value)
//                       }
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <textarea
//                       className={`w-full p-2 border rounded h-32 ${
//                         work.submissionError
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                       placeholder="Description *"
//                       value={work.description}
//                       onChange={(e) =>
//                         handleWorkChange(index, "description", e.target.value)
//                       }
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div className="border-dashed border-2 p-4 rounded">
//                       <label className="block mb-2">
//                         Thumbnail *
//                         <input
//                           type="file"
//                           className="mt-1"
//                           onChange={(e) =>
//                             handleWorkChange(
//                               index,
//                               "thumbnail",
//                               e.target.files?.[0]
//                             )
//                           }
//                         />
//                       </label>
//                       {work.thumbnailPreviewUrl && (
//                         <ImagePreview
//                           url={work.thumbnailPreviewUrl}
//                           onRemove={() => handleRemoveImage(index, "thumbnail")}
//                         />
//                       )}
//                     </div>

//                     <div className="border-dashed border-2 p-4 rounded">
//                       <label className="block mb-2">
//                         Hero Image
//                         <input
//                           type="file"
//                           className="mt-1"
//                           onChange={(e) =>
//                             handleWorkChange(
//                               index,
//                               "heroImage",
//                               e.target.files?.[0]
//                             )
//                           }
//                         />
//                       </label>
//                       {work.heroImagePreviewUrl && (
//                         <ImagePreview
//                           url={work.heroImagePreviewUrl}
//                           onRemove={() => handleRemoveImage(index, "heroImage")}
//                         />
//                       )}
//                     </div>
//                   </div>

//                   <div className="mb-4">
//                     <label
//                       htmlFor={`completionDate-${index}`}
//                       className="block text-gray-700 font-bold mb-2"
//                     >
//                       Completion date:
//                     </label>
//                     <input
//                       type="date"
//                       id={`completionDate-${index}`}
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       value={work.completionDate}
//                       onChange={(e) =>
//                         handleWorkChange(
//                           index,
//                           "completionDate",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <label
//                       htmlFor={`workLink-${index}`}
//                       className="block text-gray-700 font-bold mb-2"
//                     >
//                       Link:
//                     </label>
//                     <input
//                       type="text"
//                       id={`workLink-${index}`}
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       placeholder="Link"
//                       value={work.link}
//                       onChange={(e) =>
//                         handleWorkChange(index, "link", e.target.value)
//                       }
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <label
//                       htmlFor={`workSkills-${index}`}
//                       className="block text-gray-700 font-bold mb-2"
//                     >
//                       Skills:
//                     </label>
//                     <div className="border border-gray-300 rounded-md p-2">
//                       <div className="flex flex-wrap">
//                         {work.skills.map((skill, skillIndex) => (
//                           <div
//                             key={skillIndex}
//                             className="inline-flex items-center py-1 px-2 mr-2 mt-2 rounded bg-gray-200 text-sm font-medium text-gray-700"
//                           >
//                             <span>{skill}</span>
//                             <button
//                               type="button"
//                               onClick={() => removeSkill(index, skill)}
//                               className="ml-2 focus:outline-none hover:text-red-500"
//                             >
//                               <MdClose className="h-4 w-4" />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                       <div className="relative mt-2">
//                         <input
//                           type="text"
//                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                           placeholder="Search and add skills"
//                           value={skillSearchTerm}
//                           onChange={(e) => setSkillSearchTerm(e.target.value)}
//                           onClick={() => setIsSkillsOpen(true)}
//                         />
//                         <ul
//                           className={`absolute w-full bg-white border border-gray-200 rounded shadow-lg mt-1 overflow-hidden z-10 ${
//                             isSkillsOpen ? "block" : "hidden"
//                           }`}
//                         >
//                           {filteredSkills.map((skill) => (
//                             <li
//                               key={skill.name}
//                               className="hover:bg-orange-100 text-gray-700 block px-4 py-2 text-sm cursor-pointer"
//                               onClick={() => handleSkillSelect(index, skill)}
//                             >
//                               {skill.name}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Locations terms moved to the top */}
//       <div className="py-10 bg-gray-100" style={{ zIndex: 10 }}>
//         <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
//           <div className="mb-4 border-b border-gray-200 pb-4">
//             {" "}
//             {/* Changed border-t to border-b and pt-4 to pb-4 */}
//             <label className="block text-gray-700 font-bold mb-2">
//               Locations terms
//             </label>
//             <div className="ml-4">
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   className="form-checkbox"
//                   checked={agreeToTerms}
//                   onChange={(e) => setAgreeToTerms(e.target.checked)}
//                 />
//                 <span className="ml-2 text-sm text-gray-600">
//                   I accord my location by the post those in the authority my
//                   position is
//                 </span>
//               </label>
//             </div>
//             <div className="ml-4">
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   className="form-checkbox"
//                   checked={agreeToSecondTerm} // Added checked state
//                   onChange={(e) => setAgreeToSecondTerm(e.target.checked)} // Added onChange handler
//                 />
//                 <span className="ml-2 text-sm text-gray-600">
//                   I ensure that my post doesn't willed supersede if I see
//                   position that could violate the rights of others
//                 </span>
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="py-10  mb-32 bg-gray-100">
//         <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
//           <button
//             onClick={handleSubmit}
//             disabled={
//               !agreeToTerms ||
//               !agreeToSecondTerm ||
//               !allWorksValid ||
//               isSubmittingAll
//             } // Updated disabled condition
//             className={`w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
//               !agreeToTerms ||
//               !agreeToSecondTerm ||
//               !allWorksValid ||
//               isSubmittingAll // Updated opacity condition
//                 ? "opacity-50 cursor-not-allowed"
//                 : ""
//             }`}
//           >
//             {isSubmittingAll ? "Submitting..." : "Submit All Works"}
//           </button>

//           {error && <div className="text-red-500 mt-2">{error}</div>}
//           {successMessage && (
//             <div className="text-green-500 mt-2">{successMessage}</div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// const ImagePreview: React.FC<{
//   url: string;
//   onRemove: () => void;
// }> = ({ url, onRemove }) => (
//   <div className="relative mt-2">
//     <img src={url} alt="Preview" className="max-h-32 rounded" />
//     <button
//       type="button"
//       onClick={onRemove}
//       className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//     >
//       <MdClose className="h-4 w-4" />
//     </button>
//   </div>
// );

// export default BusinessGallery;







import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { MdClose } from "react-icons/md";

type Work = {
    title: string;
    description: string;
    thumbnail: File | null;
    thumbnailPreviewUrl: string | null;
    heroImage: File | null;
    heroImagePreviewUrl: string | null;
    completionDate: string;
    link: string;
    skills: string[];
    submissionStatus: "idle" | "submitting" | "success" | "error";
    submissionError: string | null;
    isExpanded: boolean;
};

interface Skill {
    name: string;
}

const availableSkills: Skill[] = [
    { name: "Translate" },
    { name: "Web design" },
    { name: "Web development" },
    { name: "Illustrator" },
    { name: "Photo shop" },
    { name: "Write articles" },
    { name: "Graphic design" },
    { name: "Logo design" },
];

const translations = {
    en: {
        "Build your gallery": "Build your gallery",
        "To add the best format media and your design device if your field or niche is available because each niche will undergo the appropriate niche according the application.": "To add the best format media and your design device if your field or niche is available because each niche will undergo the appropriate niche according the application.",
        "1- Adhere to the font-done protocol (all text copied in hexadecimal).": "1- Adhere to the font-done protocol (all text copied in hexadecimal).",
        "2- Make sure that the words are distinctive and strong quality.": "2- Make sure that the words are distinctive and strong quality.",
        "3- Write a clear title position description that explains the features of the brochure.": "3- Write a clear title position description that explains the features of the brochure.",
        "4- Do not submit empty or duplicate works.": "4- Do not submit empty or duplicate works.",
        "Work": "Work",
        "Not configured": "Not configured",
        "Please fill required fields": "Please fill required fields",
        "Submitting...": "Submitting...",
        "Work Title *": "Work Title *",
        "Description *": "Description *",
        "Thumbnail *": "Thumbnail *",
        "Hero Image": "Hero Image",
        "Completion date:": "Completion date:",
        "Link:": "Link:",
        "Skills:": "Skills:",
        "Search and add skills": "Search and add skills",
        "Locations terms": "Locations terms",
        "I accord my location by the post those in the authority my position is": "I accord my location by the post those in the authority my position is",
        "I ensure that my post doesn't willed supersede if I see position that could violate the rights of others": "I ensure that my post doesn't willed supersede if I see position that could violate the rights of others",
        "Submit All Works": "Submit All Works",
        // "Submitting..": "Submitting...", // Repeated key, but that's okay for now.
        "You must agree to both terms.": "You must agree to both terms.",
        "Please fix errors in work entries": "Please fix errors in work entries",
        "All works submitted!": "All works submitted!",
        "Translate": "Translate",
        "Web design": "Web design",
        "Web development": "Web development",
        "Illustrator": "Illustrator",
        "Photo shop": "Photo shop",
        "Write articles": "Write articles",
        "Graphic design": "Graphic design",
        "Logo design": "Logo design",
    },
    ar: {
        "Build your gallery": "ابني معرض أعمالك",
        "To add the best format media and your design device if your field or niche is available because each niche will undergo the appropriate niche according the application.": "لإضافة أفضل تنسيق للوسائط وجهاز التصميم الخاص بك إذا كان مجالك أو تخصصك متاحًا لأن كل تخصص سيخضع للتخصص المناسب وفقًا للتطبيق.",
        "1- Adhere to the font-done protocol (all text copied in hexadecimal).": "1- الالتزام ببروتوكول font-done (جميع النصوص المنسوخة بنظام الستة عشر).",
        "2- Make sure that the words are distinctive and strong quality.": "2- تأكد من أن الكلمات مميزة وذات جودة عالية.",
        "3- Write a clear title position description that explains the features of the brochure.": "3- اكتب وصفًا واضحًا للمسمى الوظيفي يشرح ميزات الكتيب.",
        "4- Do not submit empty or duplicate works.": "4- لا تقم بإرسال أعمال فارغة أو مكررة.",
        "Work": "عمل",
        "Not configured": "غير مُعد",
        "Please fill required fields": "يرجى ملء الحقول المطلوبة",
        "Submitting...": "جاري الإرسال...",
        "Work Title *": "عنوان العمل *",
        "Description *": "الوصف *",
        "Thumbnail *": "الصورة المصغرة *",
        "Hero Image": "الصورة الرئيسية",
        "Completion date:": "تاريخ الإنجاز:",
        "Link:": "الرابط:",
        "Skills:": "المهارات:",
        "Search and add skills": "البحث وإضافة المهارات",
        "Locations terms": "شروط المواقع",
        "I accord my location by the post those in the authority my position is": "أوافق على تحديد موقعي من خلال المنشورات الموجودة في السلطة التي يمثلها منصبي",
        "I ensure that my post doesn't willed supersede if I see position that could violate the rights of others": "أؤكد أن منصبي لن يحل محل أي منصب آخر إذا رأيت منصبًا قد ينتهك حقوق الآخرين",
        "Submit All Works": "إرسال جميع الأعمال",
        // "Submitting...": "جاري الإرسال...",
        "You must agree to both terms.": "يجب الموافقة على كلا الشرطين.",
        "Please fix errors in work entries": "يرجى تصحيح الأخطاء في إدخالات العمل",
        "All works submitted!": "تم إرسال جميع الأعمال!",
        "Translate": "ترجمة",
        "Web design": "تصميم ويب",
        "Web development": "تطوير ويب",
        "Illustrator": "اليستريتور",
        "Photo shop": "فوتوشوب",
        "Write articles": "كتابة مقالات",
        "Graphic design": "تصميم جرافيك",
        "Logo design": "تصميم شعار",
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};

const BusinessGallery: React.FC = () => {
    const initialWorksState: Work[] = [
        {
            title: "",
            description: "",
            thumbnail: null,
            thumbnailPreviewUrl: null,
            heroImage: null,
            heroImagePreviewUrl: null,
            completionDate: "",
            link: "",
            skills: [],
            submissionStatus: "idle",
            submissionError: null,
            isExpanded: true,
        },
        {
            title: "",
            description: "",
            thumbnail: null,
            thumbnailPreviewUrl: null,
            heroImage: null,
            heroImagePreviewUrl: null,
            completionDate: "",
            link: "",
            skills: [],
            submissionStatus: "idle",
            submissionError: null,
            isExpanded: false,
        },
    ];
    const [works, setWorks] = useState<Work[]>(initialWorksState);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [agreeToSecondTerm, setAgreeToSecondTerm] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isSkillsOpen, setIsSkillsOpen] = useState(false);
    const [skillSearchTerm, setSkillSearchTerm] = useState("");
    const [isSubmittingAll, setIsSubmittingAll] = useState(false);
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


    const allWorksValid = works.every(
        (work) => work.title.trim() && work.description.trim()
    );

    const handleWorkToggle = (index: number) => {
        const updatedWorks = works.map((work, i) => ({
            ...work,
            isExpanded: i === index ? !work.isExpanded : false,
        }));
        setWorks(updatedWorks);
    };

    const handleWorkChange = (index: number, field: string, value: any) => {
        const updatedWorks = [...works];
        const currentWork = updatedWorks[index];

        if (field === "thumbnail") {
            const file = value as File;
            currentWork.thumbnail = file;
            currentWork.thumbnailPreviewUrl = file ? URL.createObjectURL(file) : null;
        } else if (field === "heroImage") {
            const file = value as File;
            currentWork.heroImage = file;
            currentWork.heroImagePreviewUrl = file ? URL.createObjectURL(file) : null;
        } else {
            (currentWork as any)[field] = value;
        }
        updatedWorks[index].submissionError = null;
        setWorks(updatedWorks);
    };

    const handleRemoveImage = (
        index: number,
        imageType: "thumbnail" | "heroImage"
    ) => {
        const updatedWorks = [...works];
        const currentWork = updatedWorks[index];
        if (imageType === "thumbnail") {
            currentWork.thumbnail = null;
            currentWork.thumbnailPreviewUrl = null;
        } else if (imageType === "heroImage") {
            currentWork.heroImage = null;
            currentWork.heroImagePreviewUrl = null;
        }
        setWorks(updatedWorks);
    };

    const handleSkillSelect = (index: number, skill: Skill) => {
        const updatedWorks = [...works];
        if (!updatedWorks[index].skills.includes(skill.name)) {
            updatedWorks[index].skills.push(skill.name);
        }
        setWorks(updatedWorks);
        setSkillSearchTerm("");
        setIsSkillsOpen(false);
    };

    const removeSkill = (index: number, skillName: string) => {
        const updatedWorks = [...works];
        updatedWorks[index].skills = updatedWorks[index].skills.filter(
            (s) => s !== skillName
        );
        setWorks(updatedWorks);
    };

    const filteredSkills = availableSkills.filter((skill) =>
        skill.name.toLowerCase().includes(skillSearchTerm.toLowerCase())
    );

    const submitWork = async (index: number) => {
        const work = works[index];
        if (!work.title || !work.description) {
            setError(translate(`Please fill in title and description for Work ${index + 1}.`, language));
            return false;
        }

        const formData = new FormData();
        const userId = "1"; // Replace with actual user ID
        formData.append("userId", userId);
        formData.append("workTitle", work.title);
        formData.append("workDescription", work.description);
        if (work.thumbnail) formData.append("thumbnail", work.thumbnail);
        if (work.heroImage) formData.append("workPhoto", work.heroImage);
        formData.append("completeDate", work.completionDate);
        formData.append("workLink", work.link);
        formData.append("skillsOfWork", work.skills.join(","));

        const updatedWorks = [...works];
        updatedWorks[index].submissionStatus = "submitting";
        updatedWorks[index].submissionError = null;
        setWorks(updatedWorks);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACK_URL}/UserWork`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            console.log(`Work ${index + 1} submitted successfully:`, response.data);
            updatedWorks[index].submissionStatus = "success";
            setWorks(updatedWorks);
            return true;
        } catch (error: any) {
            console.error(
                `Error submitting Work ${index + 1}:`,
                error.response?.data
            );
            const axiosError = error as AxiosError<{ message: string }>;
            updatedWorks[index].submissionStatus = "error";
            updatedWorks[index].submissionError =
                axiosError.response?.data.message || translate("An error occurred.", language); // Keep technical part untranslated for error clarity
            setWorks(updatedWorks);
            return false;
        }
    };

    const handleSubmit = async () => {
        if (!agreeToTerms || !agreeToSecondTerm) {
            setError(translate("You must agree to both terms.", language));
            return;
        }

        let allValid = true;
        const validatedWorks = works.map((work) => {
            const isValid = work.title.trim() && work.description.trim();
            if (!isValid) allValid = false;
            return {
                ...work,
                submissionError: isValid ? null : translate("Please fill required fields", language),
                submissionStatus: isValid ? work.submissionStatus : "error",
            };
        });

        if (!allValid) {
            setWorks(validatedWorks);
            setError(translate("Please fix errors in work entries", language));
            return;
        }

        setError(null);
        setIsSubmittingAll(true);

        let allSuccessful = true;
        for (let i = 0; i < works.length; i++) {
            const success = await submitWork(i);
            if (!success) allSuccessful = false;
        }

        setIsSubmittingAll(false);
        setSuccessMessage(allSuccessful ? translate("All works submitted!", language) : null);
        localStorage.setItem("currentStep", "4");
        window.location.reload();
    };

    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="bg-gray-100 py-10 md:py-20"> {/* Responsive padding */}
                <div className="max-w-2xl md:max-w-3xl mx-auto p-4 md:p-6 bg-white rounded shadow"> {/* Responsive max-width and padding */}
                    <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4"> {/* Responsive font size and margin */}
                        {translate("Build your gallery", language)}
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 md:mb-6"> {/* Responsive text size and margin */}
                        {translate("To add the best format media and your design device if your field or niche is available because each niche will undergo the appropriate niche according the application.", language)} <br />
                        {translate("1- Adhere to the font-done protocol (all text copied in hexadecimal).", language)}
                        <br />
                        {translate("2- Make sure that the words are distinctive and strong quality.", language)}
                        <br />
                        {translate("3- Write a clear title position description that explains the features of the brochure.", language)} <br />
                        {translate("4- Do not submit empty or duplicate works.", language)} <br />
                    </p>
                </div>
            </div>

            <div className="min-h-screen bg-gray-100">
                <div className="max-w-2xl md:max-w-3xl mx-auto p-4 md:p-6 bg-white rounded shadow"> {/* Responsive max-width and padding */}
                    {works.map((work, index) => (
                        <div key={index} className="mb-6 md:mb-8 border rounded"> {/* Responsive margin */}
                            <div
                                className="flex justify-between p-3 md:p-4 cursor-pointer bg-gray-100 rounded-t" // Responsive padding
                                onClick={() => handleWorkToggle(index)}
                            >
                                <h3 className="text-lg font-semibold">
                                    {translate("Work", language)} {index + 1} {!work.title && `(${translate("Not configured", language)})`}
                                </h3>
                                <span>{work.isExpanded ? "-" : "+"}</span>
                            </div>

                            {work.isExpanded && (
                                <div className="p-3 md:p-4"> {/* Responsive padding */}
                                    {work.submissionStatus === "error" && (
                                        <div className="text-red-500 mb-2">
                                            {work.submissionError}
                                        </div>
                                    )}
                                    {work.submissionStatus === "submitting" && (
                                        <div className="text-blue-500 mb-2">{translate("Submitting...", language)}</div>
                                    )}

                                    <div className="mb-3 md:mb-4"> {/* Responsive margin */}
                                        <input
                                            type="text"
                                            className={`w-full p-2 border rounded ${work.submissionError ? "border-red-500" : "border-gray-300"}`}
                                            placeholder={translate("Work Title *", language)}
                                            value={work.title}
                                            onChange={(e) => handleWorkChange(index, "title", e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3 md:mb-4"> {/* Responsive margin */}
                                        <textarea
                                            className={`w-full p-2 border rounded h-24 md:h-32 ${work.submissionError ? "border-red-500" : "border-gray-300"}`} // Responsive height
                                            placeholder={translate("Description *", language)}
                                            value={work.description}
                                            onChange={(e) => handleWorkChange(index, "description", e.target.value)}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4"> {/* Responsive grid and margin */}
                                        <div className="border-dashed border-2 p-3 md:p-4 rounded"> {/* Responsive padding */}
                                            <label className="block mb-2">
                                                {translate("Thumbnail *", language)}
                                                <input
                                                    type="file"
                                                    className="mt-1"
                                                    onChange={(e) => handleWorkChange(index, "thumbnail", e.target.files?.[0])}
                                                />
                                            </label>
                                            {work.thumbnailPreviewUrl && (
                                                <ImagePreview
                                                    url={work.thumbnailPreviewUrl}
                                                    onRemove={() => handleRemoveImage(index, "thumbnail")}
                                                />
                                            )}
                                        </div>

                                        <div className="border-dashed border-2 p-3 md:p-4 rounded"> {/* Responsive padding */}
                                            <label className="block mb-2">
                                                {translate("Hero Image", language)}
                                                <input
                                                    type="file"
                                                    className="mt-1"
                                                    onChange={(e) => handleWorkChange(index, "heroImage", e.target.files?.[0])}
                                                />
                                            </label>
                                            {work.heroImagePreviewUrl && (
                                                <ImagePreview
                                                    url={work.heroImagePreviewUrl}
                                                    onRemove={() => handleRemoveImage(index, "heroImage")}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-3 md:mb-4"> {/* Responsive margin */}
                                        <label
                                            htmlFor={`completionDate-${index}`}
                                            className="block text-gray-700 font-bold mb-2"
                                        >
                                            {translate("Completion date:", language)}
                                        </label>
                                        <input
                                            type="date"
                                            id={`completionDate-${index}`}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            value={work.completionDate}
                                            onChange={(e) => handleWorkChange(index, "completionDate", e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3 md:mb-4"> {/* Responsive margin */}
                                        <label
                                            htmlFor={`workLink-${index}`}
                                            className="block text-gray-700 font-bold mb-2"
                                        >
                                            {translate("Link:", language)}
                                        </label>
                                        <input
                                            type="text"
                                            id={`workLink-${index}`}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder={translate("Link", language)}
                                            value={work.link}
                                            onChange={(e) => handleWorkChange(index, "link", e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3 md:mb-4"> {/* Responsive margin */}
                                        <label
                                            htmlFor={`workSkills-${index}`}
                                            className="block text-gray-700 font-bold mb-2"
                                        >
                                            {translate("Skills:", language)}
                                        </label>
                                        <div className="border border-gray-300 rounded-md p-2">
                                            <div className="flex flex-wrap">
                                                {work.skills.map((skill, skillIndex) => (
                                                    <div
                                                        key={skillIndex}
                                                        className="inline-flex items-center py-1 px-2 mr-2 mt-2 rounded bg-gray-200 text-sm font-medium text-gray-700"
                                                    >
                                                        <span>{translate(skill, language)}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeSkill(index, skill)}
                                                            className="ml-2 focus:outline-none hover:text-red-500"
                                                        >
                                                            <MdClose className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="relative mt-2">
                                                <input
                                                    type="text"
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    placeholder={translate("Search and add skills", language)}
                                                    value={skillSearchTerm}
                                                    onChange={(e) => setSkillSearchTerm(e.target.value)}
                                                    onClick={() => setIsSkillsOpen(true)}
                                                />
                                                <ul
                                                    className={`absolute w-full bg-white border border-gray-200 rounded shadow-lg mt-1 overflow-hidden z-10 ${isSkillsOpen ? "block" : "hidden"}`}
                                                >
                                                    {filteredSkills.map((skill) => (
                                                        <li
                                                            key={skill.name}
                                                            className="hover:bg-orange-100 text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                                                            onClick={() => handleSkillSelect(index, skill)}
                                                        >
                                                            {translate(skill.name, language)}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="py-8 md:py-10 bg-gray-100" > {/* Responsive padding */}
                <div className="max-w-2xl md:max-w-3xl mx-auto p-4 md:p-6 bg-white rounded shadow"> {/* Responsive max-width and padding */}
                    <div className="mb-4 md:mb-6 border-b border-gray-200 pb-3 md:pb-4"> {/* Responsive margin and padding */}
                        <label className="block text-gray-700 font-bold mb-2">
                            {translate("Locations terms", language)}
                        </label>
                        <div className="ml-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    {translate("I accord my location by the post those in the authority my position is", language)}
                                </span>
                            </label>
                        </div>
                        <div className="ml-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={agreeToSecondTerm}
                                    onChange={(e) => setAgreeToSecondTerm(e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    {translate("I ensure that my post doesn't willed supersede if I see position that could violate the rights of others", language)}
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-8 md:py-10 mb-24 md:mb-32 bg-gray-100"> {/* Responsive padding and margin */}
                <div className="max-w-2xl md:max-w-3xl mx-auto p-4 md:p-6 bg-white rounded shadow"> {/* Responsive max-width and padding */}
                    <button
                        onClick={handleSubmit}
                        disabled={!agreeToTerms || !agreeToSecondTerm || !allWorksValid || isSubmittingAll}
                        className={`w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2.5 md:py-3 px-4 rounded focus:outline-none focus:shadow-outline ${(!agreeToTerms || !agreeToSecondTerm || !allWorksValid || isSubmittingAll) ? "opacity-50 cursor-not-allowed" : ""}`} // Responsive padding
                    >
                        {isSubmittingAll ? translate("Submitting...", language) : translate("Submit All Works", language)}
                    </button>

                    {error && <div className="text-red-500 mt-2">{error}</div>}
                    {successMessage && <div className="text-green-500 mt-2">{successMessage}</div>}
                </div>
            </div>
        </div>
    );
};

const ImagePreview: React.FC<{
    url: string;
    onRemove: () => void;
}> = ({ url, onRemove }) => (
    <div className="relative mt-2">
        <img src={url} alt="Preview" className="max-h-32 rounded" />
        <button
            type="button"
            onClick={onRemove}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
        >
            <MdClose className="h-4 w-4" />
        </button>
    </div>
);

export default BusinessGallery;