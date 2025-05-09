// import React, { useState, useEffect } from 'react';
// import { Mail, CreditCard, Building, Check, Menu } from 'lucide-react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// // Define types for API responses
// interface APIUserData {
//     id: number;
//     firstName: string;
//     lastName: string;
//     email: string;
//     userName: string;
//     role: string;
//     accountType: string;
//     isEmailVerified: number;
//     created_at: string;
//     updated_at: string;
//     profilePhoto: string | null;
//     Region: string | null;
//     Phone_number: string | null;
//     Gender: string | null;
//     type: string | null;
//     rate: string | null;
//     user_data: {
//         id: number;
//         userId: number;
//         specialist: string | null;
//         jobTitle: string | null;
//         description: string | null;
//         skillsOfWork: any;
//         created_at: string;
//         updated_at: string;
//     } | null;
//     user_works: any | null;
//     user_statistics: any | null;
//     user_services: any | null;
//     user_projects: any | null;
//     specialization?: string | null;
//     jobTitle?: string | null;
//     biography?: string | null;
//     skills?: string[] | null;
//     hideProfilePicture?: boolean;
// }

// interface GetUserResponse {
//     message: string;
//     user: APIUserData;
// }

// interface UpdateUserResponse {
//     message: string;
//     user: APIUserData;
// }

// interface ErrorResponse {
//     message: string;
// }

// type SettingTab = 'personal-profile' | 'privacy' | 'more';

// interface SettingsProps {
//     userId?: number;
//     initialTab?: SettingTab;
// }

// const UserAccount: React.FC<SettingsProps> = ({  initialTab = 'personal-profile' }) => {
//     const [activeTab, setActiveTab] = useState<SettingTab>(initialTab);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [isUpdating, setIsUpdating] = useState<boolean>(false);
//     const [userData, setUserData] = useState<APIUserData | null>(null);

//     const [accountType, setAccountType] = useState<string>('freelancer');
//     const [specialization, setSpecialization] = useState('');
//     const [jobTitle, setJobTitle] = useState('');
//     const [biography, setBiography] = useState('');
//     const [skills, setSkills] = useState<string[]>([]);
//     const [newSkill, setNewSkill] = useState('');
//     const [hideProfilePicture, setHideProfilePicture] = useState(false);
//     const [skillsUpdated, setSkillsUpdated] = useState(false);
//     const [lastAction, setLastAction] = useState<{type: string, skill: string} | null>(null);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const response = await axios.get<GetUserResponse>(`${process.env.REACT_APP_BACK_URL}/GetUser`, {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//                 });

//                 if (response.data.user) {
//                     const user = response.data.user;
//                     setUserData(user);
//                     setAccountType(user.accountType || 'freelancer');
//                     setSpecialization(user.user_data?.specialist || '');
//                     setJobTitle(user.user_data?.jobTitle || '');
//                     setBiography(user.user_data?.description || '');

//                     // Handle skillsOfWork parsing
//                     const skillsOfWorkAPI = user.user_data?.skillsOfWork;
//                     let parsedSkills: string[] = [];

//                     if (Array.isArray(skillsOfWorkAPI)) {
//                         parsedSkills = skillsOfWorkAPI.map(skill => String(skill));
//                     } else if (typeof skillsOfWorkAPI === 'string') {
//                         // Handle case where API returns JSON string
//                         try {
//                             const parsed = JSON.parse(skillsOfWorkAPI);
//                             if (Array.isArray(parsed)) {
//                                 parsedSkills = parsed.map(skill => String(skill));
//                             }
//                         } catch (e) {
//                             // If it's not valid JSON but a comma-separated string
//                             parsedSkills = skillsOfWorkAPI.split(',').map(s => s.trim()).filter(Boolean);
//                         }
//                     } else if (skillsOfWorkAPI && typeof skillsOfWorkAPI === 'object') {
//                         // Handle case where API returns an object
//                         parsedSkills = Object.values(skillsOfWorkAPI).map(skill => String(skill));
//                     }

//                     setSkills(parsedSkills);
//                     setHideProfilePicture(user.hideProfilePicture || false);
//                 } else {
//                     setError(response.data.message || 'Failed to load user data');
//                 }
//             } catch (err: any) {
//                 console.error('Error fetching user data:', err);
//                 let errorMessage = 'Error loading user data. Please try again later.';
//                 if (axios.isAxiosError<ErrorResponse>(err)) {
//                     errorMessage = err.response?.data?.message || errorMessage;
//                     setError(errorMessage);
//                 } else {
//                     setError(errorMessage);
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUserData();
//     }, []);

//     // Use functional updates with prevState
//     const handleAddSkill = () => {
//         if (newSkill.trim()) {
//             // Using prevState pattern for safer state updates
//             setSkills(prevSkills => {
//                 // Avoid adding duplicate skills
//                 if (!prevSkills.includes(newSkill.trim())) {
//                     // Show notification about the action
//                     setLastAction({type: 'added', skill: newSkill.trim()});
//                     setSkillsUpdated(true);
                    
//                     // Clear the notification after 3 seconds
//                     setTimeout(() => {
//                         setLastAction(null);
//                     }, 3000);
                    
//                     return [...prevSkills, newSkill.trim()];
//                 }
//                 return prevSkills;
//             });
            
//             setNewSkill('');
//         }
//     };

//     // Use functional updates with prevState
//     const handleRemoveSkill = (skillToRemove: string) => {
//         setSkills(prevSkills => {
//             const newSkills = prevSkills.filter(skill => skill !== skillToRemove);
            
//             // Show notification about the action
//             setLastAction({type: 'removed', skill: skillToRemove});
//             setSkillsUpdated(true);
            
//             // Clear the notification after 3 seconds
//             setTimeout(() => {
//                 setLastAction(null);
//             }, 3000);
            
//             return newSkills;
//         });
//     };

//     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === 'Enter') {
//             e.preventDefault();
//             handleAddSkill();
//         }
//     };

//     const handleSave = async () => {
//         if (loading || isUpdating) return;

//         setIsUpdating(true);
//         setError(null);

//         try {
//             const payload = {
//                 accountType,
//                 Region: userData?.Region || 'united-arab-emirates',
//                 Phone_number: userData?.Phone_number || '',
//                 Gender: userData?.Gender || 'mail',
//                 specialist: specialization,
//                 jobTitle,
//                 description: biography,
//                 hideProfilePicture,
//                 skillsOfWork: skills, // Send skills as an array
//             };

//             console.log("Update Payload:", payload);

//             const response = await axios.put<UpdateUserResponse>(
//                 `${process.env.REACT_APP_BACK_URL}/profileUpdate`,
//                 payload,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );

//             if (response.data.message === 'Profile updated successfully') {
//                 alert('Profile updated successfully!');
//                 setUserData(response.data.user);
//                 setSkillsUpdated(false); // Reset the skills updated flag
//             } else {
//                 setError(response.data.message || 'Failed to save settings.');
//             }
//         } catch (error: any) {
//             console.error('Error saving settings:', error);
//             let errorMessage = 'Error saving settings. Please try again later.';
//             if (axios.isAxiosError<ErrorResponse>(error)) {
//                 errorMessage = error.response?.data?.message || errorMessage;
//                 setError(errorMessage);
//                 console.error("Detailed Error Response:", error.response?.data);
//             } else {
//                 setError(errorMessage);
//             }
//             alert(errorMessage);
//         } finally {
//             setIsUpdating(false);
//         }
//     };

//     const renderContent = () => {
//         if (loading) return <div className="bg-white rounded-lg p-6 flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div></div>;
//         if (error) return <div className="bg-white rounded-lg p-6"><div className="text-red-500">{error}</div><button className="mt-4 bg-orange-600 text-white px-4 py-2 rounded" onClick={() => window.location.reload()}>Try Again</button></div>;

//         if (activeTab === 'personal-profile') {
//             return (
//                 <div className="bg-white rounded-lg p-6">
//                     <h2 className="text-lg font-medium mb-4">Personal Profile</h2>
//                     {/* Account Type */}
//                     <h3 className="text-md font-semibold mb-2">Account type</h3>
//                     <div className="flex gap-4 mb-4">
//                         <label className="flex items-center gap-2">
//                             <input 
//                                 type="radio" 
//                                 checked={accountType === 'freelacer'} 
//                                 onChange={() => setAccountType('freelacer')} 
//                                 className="accent-orange-500" 
//                             />
//                             <span>Freelancer</span>
//                         </label>
//                         <label className="flex items-center gap-2">
//                             <input 
//                                 type="radio" 
//                                 checked={accountType === 'projectOwner'} 
//                                 onChange={() => setAccountType('projectOwner')} 
//                                 className="accent-orange-500" 
//                             />
//                             <span>Project owner</span>
//                         </label>
//                     </div>
//                     {/* Specialization and Job Title */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                         <div>
//                             <label className="block text-sm font-medium mb-2">Specialization</label>
//                             <select 
//                                 className="w-full border border-gray-300 rounded p-2" 
//                                 value={specialization} 
//                                 onChange={(e) => setSpecialization(e.target.value)}
//                             >
//                                 <option value="">Select specialization</option>
//                                 <option value="web-design">Web Design</option>
//                                 <option value="ui-ux">UI/UX Design</option>
//                                 <option value="graphic-design">Graphic Design</option>
//                                 <option value="frontend-development">Frontend Development</option>
//                                 <option value="backend-development">Backend Development</option>
//                                 <option value="fullstack-development">Fullstack Development</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium mb-2">Job title</label>
//                             <input 
//                                 type="text" 
//                                 className="w-full border border-gray-300 rounded p-2" 
//                                 value={jobTitle} 
//                                 onChange={(e) => setJobTitle(e.target.value)} 
//                                 placeholder="Enter job title" 
//                             />
//                         </div>
//                     </div>
//                     {/* Biography */}
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium mb-2">Biography</label>
//                         <textarea 
//                             className="w-full border border-gray-300 rounded p-2 h-48" 
//                             value={biography} 
//                             onChange={(e) => setBiography(e.target.value)} 
//                             placeholder="Tell us about yourself and your professional experience..."
//                         />
//                     </div>
//                     {/* Skills - Improved implementation with notifications */}
//                     <div className="mb-4">
//                         <div className="flex justify-between items-center mb-2">
//                             <label className="block text-sm font-medium">Skills</label>
//                             {skillsUpdated && (
//                                 <span className="text-sm text-orange-600 font-medium">
//                                     * Skills updated (not saved yet)
//                                 </span>
//                             )}
//                         </div>
                        
//                         {/* Skills input with add button */}
//                         <div className="mb-2 flex items-center">
//                             <input 
//                                 type="text" 
//                                 className="flex-1 border border-gray-300 rounded-l p-2" 
//                                 placeholder="Add a skill" 
//                                 value={newSkill}
//                                 onChange={(e) => setNewSkill(e.target.value)}
//                                 onKeyDown={handleKeyDown}
//                             />
//                             <button 
//                                 className="bg-orange-600 text-white px-4 py-2 rounded-r hover:bg-orange-700 transition-colors"
//                                 onClick={handleAddSkill}
//                                 type="button"
//                             >
//                                 Add
//                             </button>
//                         </div>
                        
//                         {/* Action notification */}
//                         {lastAction && (
//                             <div className={`mb-2 px-3 py-2 rounded text-sm ${
//                                 lastAction.type === 'added' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                             }`}>
//                                 Skill "{lastAction.skill}" {lastAction.type === 'added' ? 'added' : 'removed'}
//                             </div>
//                         )}
                        
//                         {/* Skills list */}
//                         <div className="flex flex-wrap gap-2 mt-2">
//                             {skills.length > 0 ? (
//                                 skills.map((skill, index) => (
//                                     <div key={index} className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-1 group hover:bg-gray-200 transition-colors">
//                                         <span>{skill}</span>
//                                         <button 
//                                             type="button"
//                                             className="text-gray-400 group-hover:text-red-500 ml-1 font-bold transition-colors"
//                                             onClick={() => handleRemoveSkill(skill)}
//                                             aria-label={`Remove ${skill}`}
//                                         >
//                                             ×
//                                         </button>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p className="text-gray-500 text-sm">No skills added yet. Add skills that showcase your expertise.</p>
//                             )}
//                         </div>
//                     </div>
//                     {/* Save Button */}
//                     <button 
//                         className={`text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors disabled:opacity-50 ${
//                             skillsUpdated ? 'bg-orange-500 animate-pulse' : 'bg-orange-600'
//                         }`}
//                         onClick={handleSave} 
//                         disabled={loading || isUpdating}
//                     >
//                         {isUpdating ? 'Saving...' : skillsUpdated ? 'Save Changes' : 'Save'}
//                     </button>
//                 </div>
//             );
//         } else if (activeTab === 'privacy') {
//             return (
//                 <div className="bg-white rounded-lg p-6">
//                     <h2 className="text-lg font-medium mb-4">Privacy Settings</h2>
//                     <div className="flex flex-col gap-3 mb-6">
//                         <label className="flex items-center gap-2">
//                             <input 
//                                 type="checkbox" 
//                                 checked={hideProfilePicture} 
//                                 onChange={() => setHideProfilePicture(!hideProfilePicture)} 
//                                 className="accent-orange-500" 
//                             />
//                             <span>Hide profile picture</span>
//                         </label>
//                         <label className="flex items-center gap-2">
//                             <input type="checkbox" className="accent-orange-500" />
//                             <span>Hide profile</span>
//                         </label>
//                     </div>
//                     <button 
//                         className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors disabled:opacity-50" 
//                         onClick={handleSave} 
//                         disabled={loading || isUpdating}
//                     >
//                         {isUpdating ? 'Saving...' : 'Save'}
//                     </button>
//                 </div>
//             );
//         } else if (activeTab === 'more') {
//             return (
//                 <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
//                     <Link to="/react/CreditCard">
//                     <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
//                         <CreditCard size={24} />
//                         <span>Credit card</span>
//                     </button>
//                     </Link>

//                     <Link to='/react/Email'>
//                     <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
//                         <Mail size={24} />
//                         <span>Email</span>
//                     </button>
//                     </Link>
//                     <Link to='/react/BankAccounts'>
//                     <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
//                         <Building size={24} />
//                         <span>Bank accounts</span>
//                     </button>
//                     </Link>
//                     <Link to='/react/IdentityVerification'>
//                     <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
//                         <Check size={24} />
//                         <span>Identity verification</span>
//                     </button>
//                     </Link>
//                 </div>
//             );
//         }
//         return null;
//     };

//     return (
//         <div className="m-32 max-w-6xl mx-auto py-10">
//             <h1 className="text-xl font-bold mb-6 text-center">Setting</h1>
//             <div className="flex flex-col md:flex-row gap-6">
//                 <div className="w-full md:w-64">
//                     <div className="bg-white rounded-lg overflow-hidden">
//                         <div className="p-3 bg-gray-100">
//                             <span className="font-medium">Setting</span>
//                         </div>
//                         <div className="p-2">
//                             <ul className="space-y-1">
//                                 <li>
//                                     <button 
//                                         className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition-colors ${activeTab === 'personal-profile' ? 'bg-orange-600 text-white' : 'hover:bg-gray-100'}`} 
//                                         onClick={() => setActiveTab('personal-profile')}
//                                     >
//                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//                                             <circle cx="12" cy="7" r="4" />
//                                         </svg>
//                                         Personal profile
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button 
//                                         className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition-colors ${activeTab === 'privacy' ? 'bg-orange-600 text-white' : 'hover:bg-gray-100'}`} 
//                                         onClick={() => setActiveTab('privacy')}
//                                     >
//                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                             <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
//                                             <path d="M7 11V7a5 5 0 0 1 10 0v4" />
//                                         </svg>
//                                         Privacy
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button 
//                                         className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition-colors ${activeTab === 'more' ? 'bg-orange-600 text-white' : 'hover:bg-gray-100'}`} 
//                                         onClick={() => setActiveTab('more')}
//                                     >
//                                         <Menu className="h-5 w-5" />
//                                         More
//                                     </button>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="flex-1">{renderContent()}</div>
//             </div>
//         </div>
//     );
// };

// export default UserAccount;



import React, { useState, useEffect } from 'react';
import { Mail, CreditCard, Building, Check, Menu } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Define types for API responses
interface APIUserData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    role: string;
    accountType: string;
    isEmailVerified: number;
    created_at: string;
    updated_at: string;
    profilePhoto: string | null;
    Region: string | null;
    Phone_number: string | null;
    Gender: string | null;
    type: string | null;
    rate: string | null;
    user_data: {
        id: number;
        userId: number;
        specialist: string | null;
        jobTitle: string | null;
        description: string | null;
        skillsOfWork: any;
        created_at: string;
        updated_at: string;
    } | null;
    user_works: any | null;
    user_statistics: any | null;
    user_services: any | null;
    user_projects: any | null;
    specialization?: string | null;
    jobTitle?: string | null;
    biography?: string | null;
    skills?: string[] | null;
    hideProfilePicture?: boolean;
}

interface GetUserResponse {
    message: string;
    user: APIUserData;
}

interface UpdateUserResponse {
    message: string;
    user: APIUserData;
}

interface ErrorResponse {
    message: string;
}

type SettingTab = 'personal-profile' | 'privacy' | 'more';

interface SettingsProps {
    userId?: number;
    initialTab?: SettingTab;
}


const translations = {
    en: {
        "Setting": "Setting",
        // "Setting": "Setting",
        "Personal profile": "Personal profile",
        "Privacy": "Privacy",
        "More": "More",
        "Loading account settings...": "Loading account settings...",
        "Error loading settings": "Error loading settings",
        "Try Again": "Try Again",
        "Personal Profile": "Personal Profile",
        "Account type": "Account type",
        "Freelancer": "Freelancer",
        "Project owner": "Project owner",
        "Specialization": "Specialization",
        "Select specialization": "Select specialization",
        "Web Design": "Web Design",
        "UI/UX Design": "UI/UX Design",
        "Graphic Design": "Graphic Design",
        "Frontend Development": "Frontend Development",
        "Backend Development": "Backend Development",
        "Fullstack Development": "Fullstack Development",
        "Job title": "Job title",
        "Enter job title": "Enter job title",
        "Biography": "Biography",
        "Tell us about yourself and your professional experience...": "Tell us about yourself and your professional experience...",
        "Skills": "Skills",
        "* Skills updated (not saved yet)": "* Skills updated (not saved yet)",
        "Add a skill": "Add a skill",
        "Add": "Add",
        'Skill "': 'Skill "',
        '" added': '" added',
        '" removed': '" removed',
        "No skills added yet. Add skills that showcase your expertise.": "No skills added yet. Add skills that showcase your expertise.",
        "Saving...": "Saving...",
        "Save Changes": "Save Changes",
        "Save": "Save",
        "Privacy Settings": "Privacy Settings",
        "Hide profile picture": "Hide profile picture",
        "Hide profile": "Hide profile",
        "Credit card": "Credit card",
        "Email": "Email",
        "Bank accounts": "Bank accounts",
        "Identity verification": "Identity verification",

    },
    ar: {
        "Setting": "إعدادات",
        // "Setting": "إعدادات",
        "Personal profile": "الملف الشخصي",
        "Privacy": "الخصوصية",
        "More": "المزيد",
        "Loading account settings...": "جاري تحميل إعدادات الحساب...",
        "Error loading settings": "خطأ في تحميل الإعدادات",
        "Try Again": "حاول مرة أخرى",
        "Personal Profile": "الملف الشخصي",
        "Account type": "نوع الحساب",
        "Freelancer": "مستقل",
        "Project owner": "صاحب مشروع",
        "Specialization": "التخصص",
        "Select specialization": "اختر تخصص",
        "Web Design": "تصميم ويب",
        "UI/UX Design": "تصميم واجهة المستخدم وتجربة المستخدم",
        "Graphic Design": "تصميم جرافيك",
        "Frontend Development": "تطوير الواجهة الأمامية",
        "Backend Development": "تطوير الواجهة الخلفية",
        "Fullstack Development": "تطوير الويب الشامل",
        "Job title": "المسمى الوظيفي",
        "Enter job title": "أدخل المسمى الوظيفي",
        "Biography": "السيرة الذاتية",
        "Tell us about yourself and your professional experience...": "أخبرنا عن نفسك وخبراتك المهنية...",
        "Skills": "مهارات",
        "* Skills updated (not saved yet)": "* تم تحديث المهارات (لم يتم الحفظ بعد)",
        "Add a skill": "أضف مهارة",
        "Add": "أضف",
        'Skill "': 'مهارة "',
        '" added': '" تمت إضافتها',
        '" removed': '" تمت إزالتها',
        "No skills added yet. Add skills that showcase your expertise.": "لم يتم إضافة مهارات بعد. أضف مهارات تبرز خبرتك.",
        "Saving...": "جاري الحفظ...",
        "Save Changes": "حفظ التغييرات",
        "Save": "حفظ",
        "Privacy Settings": "إعدادات الخصوصية",
        "Hide profile picture": "إخفاء صورة الملف الشخصي",
        "Hide profile": "إخفاء الملف الشخصي",
        "Credit card": "بطاقة الائتمان",
        "Email": "البريد الإلكتروني",
        "Bank accounts": "حسابات بنكية",
        "Identity verification": "التحقق من الهوية",
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};


const UserAccount: React.FC<SettingsProps> = ({ initialTab = 'personal-profile' }) => {
    const [activeTab, setActiveTab] = useState<SettingTab>(initialTab);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [userData, setUserData] = useState<APIUserData | null>(null);

    const [accountType, setAccountType] = useState<string>('freelancer');
    const [specialization, setSpecialization] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [biography, setBiography] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [newSkill, setNewSkill] = useState('');
    const [hideProfilePicture, setHideProfilePicture] = useState(false);
    const [skillsUpdated, setSkillsUpdated] = useState(false);
    const [lastAction, setLastAction] = useState<{type: string, skill: string} | null>(null);
    const [language, setLanguage] = useState<'en' | 'ar'>(
        (localStorage.getItem('language') as 'ar' | 'en') || 'en'
    );

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage === 'ar' || storedLanguage === 'en') {
            setLanguage(storedLanguage as 'ar' | 'en');
        } else {
            setLanguage('en');
        }
    }, []);

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'ar' : 'en';
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get<GetUserResponse>(`${process.env.REACT_APP_BACK_URL}/GetUser`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });

                if (response.data.user) {
                    const user = response.data.user;
                    setUserData(user);
                    setAccountType(user.accountType || 'freelancer');
                    setSpecialization(user.user_data?.specialist || '');
                    setJobTitle(user.user_data?.jobTitle || '');
                    setBiography(user.user_data?.description || '');

                    const skillsOfWorkAPI = user.user_data?.skillsOfWork;
                    let parsedSkills: string[] = [];

                    if (Array.isArray(skillsOfWorkAPI)) {
                        parsedSkills = skillsOfWorkAPI.map(skill => String(skill));
                    } else if (typeof skillsOfWorkAPI === 'string') {
                        try {
                            const parsed = JSON.parse(skillsOfWorkAPI);
                            if (Array.isArray(parsed)) {
                                parsedSkills = parsed.map(skill => String(skill));
                            }
                        } catch (e) {
                            parsedSkills = skillsOfWorkAPI.split(',').map(s => s.trim()).filter(Boolean);
                        }
                    } else if (skillsOfWorkAPI && typeof skillsOfWorkAPI === 'object') {
                        parsedSkills = Object.values(skillsOfWorkAPI).map(skill => String(skill));
                    }

                    setSkills(parsedSkills);
                    setHideProfilePicture(user.hideProfilePicture || false);
                } else {
                    setError(response.data.message || translate('Failed to load user data', language));
                }
            } catch (err: any) {
                console.error('Error fetching user data:', err);
                let errorMessage = translate('Error loading user data. Please try again later.', language);
                if (axios.isAxiosError<ErrorResponse>(err)) {
                    errorMessage = err.response?.data?.message || errorMessage;
                    setError(errorMessage);
                } else {
                    setError(errorMessage);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [language]); // Added language dependency

    // Use functional updates with prevState
    const handleAddSkill = () => {
        if (newSkill.trim()) {
            setSkills(prevSkills => {
                if (!prevSkills.includes(newSkill.trim())) {
                    setLastAction({type: 'added', skill: newSkill.trim()});
                    setSkillsUpdated(true);
                    
                    setTimeout(() => {
                        setLastAction(null);
                    }, 3000);
                    
                    return [...prevSkills, newSkill.trim()];
                }
                return prevSkills;
            });
            
            setNewSkill('');
        }
    };

    // Use functional updates with prevState
    const handleRemoveSkill = (skillToRemove: string) => {
        setSkills(prevSkills => {
            const newSkills = prevSkills.filter(skill => skill !== skillToRemove);
            
            setLastAction({type: 'removed', skill: skillToRemove});
            setSkillsUpdated(true);
            
            setTimeout(() => {
                setLastAction(null);
            }, 3000);
            
            return newSkills;
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddSkill();
        }
    };

    const handleSave = async () => {
        if (loading || isUpdating) return;

        setIsUpdating(true);
        setError(null);

        try {
            const payload = {
                accountType,
                Region: userData?.Region || 'united-arab-emirates',
                Phone_number: userData?.Phone_number || '',
                Gender: userData?.Gender || 'mail',
                specialist: specialization,
                jobTitle,
                description: biography,
                hideProfilePicture,
                skillsOfWork: skills,
            };

            console.log("Update Payload:", payload);

            const response = await axios.put<UpdateUserResponse>(
                `${process.env.REACT_APP_BACK_URL}/profileUpdate`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.message === 'Profile updated successfully') {
                alert(translate('Profile updated successfully!', language));
                setUserData(response.data.user);
                setSkillsUpdated(false);
            } else {
                setError(response.data.message || translate('Failed to save settings.', language));
            }
        } catch (error: any) {
            console.error('Error saving settings:', error);
            let errorMessage = translate('Error saving settings. Please try again later.', language);
            if (axios.isAxiosError<ErrorResponse>(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
                setError(errorMessage);
                console.error("Detailed Error Response:", error.response?.data);
            } else {
                setError(errorMessage);
            }
            alert(errorMessage);
        } finally {
            setIsUpdating(false);
        }
    };

    const renderContent = () => {
        if (loading) return <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="bg-white rounded-lg p-6 flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div></div>;
        if (error) return <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="bg-white rounded-lg p-6"><div className="text-red-500">{error}</div><button className="mt-4 bg-orange-600 text-white px-4 py-2 rounded" onClick={() => window.location.reload()}>{translate("Try Again", language)}</button></div>;

        if (activeTab === 'personal-profile') {
            return (
                <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="bg-white rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">{translate("Personal Profile", language)}</h2>
                    <h3 className="text-md font-semibold mb-2">{translate("Account type", language)}</h3>
                    <div className="flex gap-4 mb-4">
                        <label className="flex items-center gap-2">
                            <input 
                                type="radio" 
                                checked={accountType === 'freelacer'} 
                                onChange={() => setAccountType('freelacer')} 
                                className="accent-orange-500" 
                            />
                            <span>{translate("Freelancer", language)}</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input 
                                type="radio" 
                                checked={accountType === 'projectOwner'} 
                                onChange={() => setAccountType('projectOwner')} 
                                className="accent-orange-500" 
                            />
                            <span>{translate("Project owner", language)}</span>
                        </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">{translate("Specialization", language)}</label>
                            <select 
                                className="w-full border border-gray-300 rounded p-2" 
                                value={specialization} 
                                onChange={(e) => setSpecialization(e.target.value)}
                            >
                                <option value="">{translate("Select specialization", language)}</option>
                                <option value="web-design">{translate("Web Design", language)}</option>
                                <option value="ui-ux">{translate("UI/UX Design", language)}</option>
                                <option value="graphic-design">{translate("Graphic Design", language)}</option>
                                <option value="frontend-development">{translate("Frontend Development", language)}</option>
                                <option value="backend-development">{translate("Backend Development", language)}</option>
                                <option value="fullstack-development">{translate("Fullstack Development", language)}</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">{translate("Job title", language)}</label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded p-2" 
                                value={jobTitle} 
                                onChange={(e) => setJobTitle(e.target.value)} 
                                placeholder={translate("Enter job title", language)}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">{translate("Biography", language)}</label>
                        <textarea 
                            className="w-full border border-gray-300 rounded p-2 h-48" 
                            value={biography} 
                            onChange={(e) => setBiography(e.target.value)} 
                            placeholder={translate("Tell us about yourself and your professional experience...", language)}
                        />
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium">{translate("Skills", language)}</label>
                            {skillsUpdated && (
                                <span className="text-sm text-orange-600 font-medium">
                                    {translate("* Skills updated (not saved yet)", language)}
                                </span>
                            )}
                        </div>
                        <div className="mb-2 flex items-center">
                            <input 
                                type="text" 
                                className="flex-1 border border-gray-300 rounded-l p-2" 
                                placeholder={translate("Add a skill", language)}
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button 
                                className="bg-orange-600 text-white px-4 py-2 rounded-r hover:bg-orange-700 transition-colors"
                                onClick={handleAddSkill}
                                type="button"
                            >
                                {translate("Add", language)}
                            </button>
                        </div>
                        {lastAction && (
                            <div className={`mb-2 px-3 py-2 rounded text-sm ${
                                lastAction.type === 'added' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {translate('Skill "', language)}"{lastAction.skill}" {translate(lastAction.type === 'added' ? '" added' : '" removed', language)}
                            </div>
                        )}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {skills.length > 0 ? (
                                skills.map((skill, index) => (
                                    <div key={index} className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-1 group hover:bg-gray-200 transition-colors">
                                        <span>{skill}</span>
                                        <button 
                                            type="button"
                                            className="text-gray-400 group-hover:text-red-500 ml-1 font-bold transition-colors"
                                            onClick={() => handleRemoveSkill(skill)}
                                            aria-label={`Remove ${skill}`}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">{translate("No skills added yet. Add skills that showcase your expertise.", language)}</p>
                            )}
                        </div>
                    </div>
                    <button 
                        className={`text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors disabled:opacity-50 ${
                            skillsUpdated ? 'bg-orange-500 animate-pulse' : 'bg-orange-600'
                        }`}
                        onClick={handleSave} 
                        disabled={loading || isUpdating}
                    >
                        {isUpdating ? translate("Saving...", language) : skillsUpdated ? translate("Save Changes", language) : translate("Save", language)}
                    </button>
                </div>
            );
        } else if (activeTab === 'privacy') {
            return (
                <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="bg-white rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">{translate("Privacy Settings", language)}</h2>
                    <div className="flex flex-col gap-3 mb-6">
                        <label className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                checked={hideProfilePicture} 
                                onChange={() => setHideProfilePicture(!hideProfilePicture)} 
                                className="accent-orange-500" 
                            />
                            <span>{translate("Hide profile picture", language)}</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="accent-orange-500" />
                            <span>{translate("Hide profile", language)}</span>
                        </label>
                    </div>
                    <button 
                        className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors disabled:opacity-50" 
                        onClick={handleSave} 
                        disabled={loading || isUpdating}
                    >
                        {isUpdating ? translate("Saving...", language) : translate("Save", language)}
                    </button>
                </div>
            );
        } else if (activeTab === 'more') {
            return (
                <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3">
                    <Link to="/react/CreditCard">
                    <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
                        <CreditCard size={24} />
                        <span>{translate("Credit card", language)}</span>
                    </button>
                    </Link>

                    <Link to='/react/Email'>
                    <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
                        <Mail size={24} />
                        <span>{translate("Email", language)}</span>
                    </button>
                    </Link>
                    <Link to='/react/BankAccounts'>
                    <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
                        <Building size={24} />
                        <span>{translate("Bank accounts", language)}</span>
                    </button>
                    </Link>
                    <Link to='/react/IdentityVerification'>
                    <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow">
                        <Check size={24} />
                        <span>{translate("Identity verification", language)}</span>
                    </button>
                    </Link>
                </div>
            );
        }
        return null;
    };

    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="m-4 md:m-32 max-w-6xl mx-auto py-10 font-sans"> {/* Responsive margins */}
             <div className="px-4 md:px-0 flex justify-end">
                <button onClick={toggleLanguage} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                    {language === 'en' ? translate('عربي', language) : translate('English', language)}
                </button>
            </div>
            <h1 className="text-xl font-bold mb-6 text-center">{translate("Setting", language)}</h1>
            <div className="flex flex-col md:flex-row gap-6"> {/* Responsive layout */}
                <div className="w-full md:w-64">
                    <div className="bg-white rounded-lg overflow-hidden">
                        <div className="p-3 bg-gray-100">
                            <span className="font-medium">{translate("Setting", language)}</span>
                        </div>
                        <div className="p-2">
                            <ul className="space-y-1">
                                <li>
                                    <button 
                                        className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition-colors ${activeTab === 'personal-profile' ? 'bg-orange-600 text-white' : 'hover:bg-gray-100'}`} 
                                        onClick={() => setActiveTab('personal-profile')}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                        {translate("Personal profile", language)}
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition-colors ${activeTab === 'privacy' ? 'bg-orange-600 text-white' : 'hover:bg-gray-100'}`} 
                                        onClick={() => setActiveTab('privacy')}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                        {translate("Privacy", language)}
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition-colors ${activeTab === 'more' ? 'bg-orange-600 text-white' : 'hover:bg-gray-100'}`} 
                                        onClick={() => setActiveTab('more')}
                                    >
                                        <Menu className="h-5 w-5" />
                                        {translate("More", language)}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex-1">{renderContent()}</div>
            </div>
        </div>
    );
};

export default UserAccount;