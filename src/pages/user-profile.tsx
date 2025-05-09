// import { useState, useEffect, ChangeEvent } from 'react';
// import axios, { AxiosError } from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Define TypeScript interfaces for data types
// interface UserDataDetails {
//     firstName?: string;
//     lastName?: string;
//     userName?: string;
//     email?: string;
//     Region?: string | null;
//     Phone_number?: string | null;
//     Gender?: string | null;
//     profilePhoto?: string | null;
// }

// interface User {
//     id: number;
//     firstName?: string;
//     lastName?: string;
//     email: string;
//     userName?: string;
//     role?: string;
//     accountType?: string;
//     isEmailVerified?: number;
//     created_at?: string;
//     updated_at?: string;
//     profilePhoto?: string | null;
//     Region?: string | null;
//     Phone_number?: string | null;
//     Gender?: string | null;
// }

// interface GetUserResponse {
//     message?: string;
//     user: User;
// }

// interface ProfileUpdateResponse {
//     message: string;
//     user: User;
// }

// interface ErrorResponse {
//     message: string;
// }

// interface PasswordResetResponse {
//     message: string;
// }


// interface ProfileTabContentProps {
//     formData: UserDataDetails; // Receive formData as prop
//     onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // Receive input change handler
//     onGenderChange: (gender: string) => void; // Receive gender change handler
//     onActivate: () => void;
//     onSendCode: () => void;
//     onBackToPhoneInput: () => void;
//     onProfilePhotoChange: (e: ChangeEvent<HTMLInputElement>) => void;
//     profilePhotoPreview: string | null;
//     showCodeInput: boolean;
//     isActivating: boolean;
// }


// const ProfileTabContent: React.FC<ProfileTabContentProps> = ({
//     formData,
//     onInputChange,
//     onGenderChange,
//     onActivate,
//     onSendCode,
//     onBackToPhoneInput,
//     onProfilePhotoChange,
//     profilePhotoPreview,
//     showCodeInput,
//     isActivating
// }) => {


//     return (
//         <div className="p-6">
//             {/* Avatar Section */}
//             <div className="flex flex-col items-center mb-8">
//                 <div className="relative">
//                     <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
//                         {profilePhotoPreview ? (
//                             <img src={profilePhotoPreview} alt="Profile Preview" className="w-full h-full object-cover" />
//                         ) : (
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16 text-gray-500">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0 .75.75 0 01-.011.02l-.002.002a.75.75 0 01-.716.696H6.095a.75.75 0 01-.75-.75v-.002c0-.013.018-.025.031-.036l.002-.002z" />
//                             </svg>
//                         )}
//                     </div>
//                     <label htmlFor="profilePhoto" className="absolute bottom-0 right-0 cursor-pointer bg-orange-500 text-white text-xs py-1 px-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
//                         Change photo
//                         <input type="file" id="profilePhoto" className="hidden" accept="image/*" onChange={onProfilePhotoChange} />
//                     </label>
//                 </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4 mb-4">
//                 <div>
//                     <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
//                     <input type="text" id="firstName" value={formData.firstName} onChange={onInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
//                 </div>
//                 <div>
//                     <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
//                     <input type="text" id="lastName" value={formData.lastName} onChange={onInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
//                 </div>
//             </div>

//             <div className="mb-4">
//                 <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User name</label>
//                 <input type="text" id="userName" value={formData.userName} onChange={onInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
//             </div>

//             <div className="mb-4">
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//                 <input type="email" id="email" value={formData.email} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed sm:text-sm" />
//             </div>


//             <div className="grid grid-cols-2 gap-4 mb-4">
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Gender</label>
//                     <div className="mt-2 flex items-center space-x-4">
//                         <label className="inline-flex items-center">
//                             <input type="radio" className="form-radio h-4 w-4 text-orange-600" name="Gender" id="Gender" value="Male" checked={formData.Gender === 'Male'} onChange={(e) => onGenderChange(e.target.value)} />
//                             <span className="ml-2 text-gray-700">Male</span>
//                         </label>
//                         <label className="inline-flex items-center">
//                             <input type="radio" className="form-radio h-4 w-4 text-orange-600" name="Gender" id="Gender" value="Female" checked={formData.Gender === 'Female'} onChange={(e) => onGenderChange(e.target.value)} />
//                             <span className="ml-2 text-gray-700">Female</span>
//                         </label>
//                     </div>
//                 </div>
//                 <div>
//                     <label htmlFor="Region" className="block text-sm font-medium text-gray-700">Region</label>
//                     <select id="Region" value={formData.Region ?? ""} onChange={onInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
//                         <option value="">Select Region</option>
//                         <option value="saudi-arabia">Saudi Arabia</option>
//                         <option value="egypt">Egypt</option>
//                         <option value="united-arab-emirates">United Arab Emirates</option>
//                         <option value="yemen">Yemen</option>
//                         <option value="qatar">Qatar</option>
//                         <option value="algeria">Algeria</option>
//                         <option value="morocco">Morocco</option>
//                         <option value="palestine">Palestine</option>
//                         {/* Add more regions as needed */}
//                     </select>
//                 </div>
//             </div>


//             <div className="mb-4">
//                 <label htmlFor="Phone_number" className="block text-sm font-medium text-gray-700">Phone number</label>
//                 <div className="mt-1 flex rounded-md shadow-sm">
//                     <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
//                         <select className="bg-transparent border-none focus:ring-0 text-gray-700" disabled> {/* Country code selection disabled for now */}
//                             <option value="+966">+966</option>
//                             <option value="+20">+20</option>
//                             <option value="+971">+971</option>
//                             {/* Add more country codes */}
//                         </select>
//                     </span>
//                     <input
//                         type="tel"
//                         id="Phone_number"
//                         value={formData.Phone_number ?? ""}
//                         onChange={onInputChange}
//                         className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
//                         placeholder="Enter phone number"
//                         readOnly={showCodeInput}
//                     />
//                     {!showCodeInput && (
//                         <button
//                             onClick={onActivate}
//                             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
//                             disabled={isActivating || showCodeInput}
//                         >
//                             {isActivating ? 'Activating...' : 'Activate'}
//                         </button>
//                     )}
//                 </div>
//             </div>

//             {showCodeInput && (
//                 <div className="mb-4 p-4 border border-gray-300 rounded-md bg-gray-50">
//                     <p className="text-sm text-gray-700 mb-2">
//                         To activate your mobile number, send the activation code via SMS to the mobile number that appears to you
//                     </p>
//                     <ol className="list-decimal pl-5 text-sm text-gray-700 mb-4">
//                         <li>Open your phone and create a new text message</li>
//                         <li>Enter the mobile number that appears in the recipient field</li>
//                         <li>Write the activation code in the text of the message and then send it</li>
//                         <li>After sending the message, click the “I have sent the activation code” button.</li>
//                         <li>Make sure you have enough credit and that your mobile phone supports international messages</li>
//                     </ol>
//                     <p className="text-sm text-gray-700 mb-2">Enter the code sent to you</p>
//                     <div className="flex gap-2 mb-4">
//                         {Array.from({ length: 6 }).map((_, index) => (
//                             <input
//                                 key={index}
//                                 type="text"
//                                 className="w-10 h-10 text-center rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
//                             />
//                         ))}
//                     </div>
//                     <div className="flex justify-end gap-2">
//                         <button onClick={onBackToPhoneInput} className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
//                             Back
//                         </button>
//                         <button onClick={onSendCode} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
//                             Send
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// interface PasswordTabContentProps {
//     onUpdatePasswordSuccess: () => void; // Optional: Callback for successful password update
// }


// const PasswordTabContent: React.FC<PasswordTabContentProps> = ({ onUpdatePasswordSuccess }) => {
//     const [passwordData, setPasswordData] = useState({
//         oldPassword: '',
//         newPassword: '',
//         confirmNewPassword: '',
//     });
//     const [passwordError, setPasswordError] = useState('');
//     const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);


//     const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//         setPasswordData({ ...passwordData, [e.target.id]: e.target.value });
//         setPasswordError(''); // Clear error on input change
//     };

//     const handleUpdatePassword = async () => {
//         setPasswordError(''); // Clear previous error
//         if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmNewPassword) {
//             setPasswordError('All password fields are required.');
//             return;
//         }

//         if (passwordData.newPassword !== passwordData.confirmNewPassword) {
//             setPasswordError('New passwords do not match.');
//             return;
//         }

//         if (passwordData.newPassword.length < 6) {
//             setPasswordError('New password must be at least 6 characters long.');
//             return;
//         }


//         setIsUpdatingPassword(true);
//         try {
//             const response = await axios.put<PasswordResetResponse>(`${process.env.REACT_APP_BACK_URL}/ResetPassword`, {
//                 oldPassword: passwordData.oldPassword,
//                 newPassword: passwordData.newPassword
//             }, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you need authorization
//                 },
//             });
//             console.log(response.data.message);

//             toast.success(response.data.message || 'Password updated successfully!');
//             setPasswordData({ oldPassword: '', newPassword: '', confirmNewPassword: '' }); // Reset form
//             if (onUpdatePasswordSuccess) {
//                 onUpdatePasswordSuccess(); // Call the success callback if provided
//             }

//         } catch (e: any) {
//             if (axios.isAxiosError(e)) {
//                 const axiosError = e as AxiosError<ErrorResponse>;
//                 setPasswordError(axiosError.response?.data?.message || 'Failed to update password.');
//                 toast.error(`Failed to update password: ${axiosError.response?.data?.message || axiosError.message}`);
//             } else {
//                 // setPasswordError('An unexpected error occurred.');
//                 // toast.error('Failed to update password: An unexpected error occurred');
//             }
//         } finally {
//             setIsUpdatingPassword(false);
//         }
//     };

//     return (
//         <div className="p-6">
//             <div className="mb-4">
//                 <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old password</label>
//                 <input type="password" id="oldPassword" value={passwordData.oldPassword} onChange={handlePasswordChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm" />
//             </div>
//             <div className="mb-4">
//                 <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New password</label>
//                 <input type="password" id="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm" />
//             </div>
//             <div className="mb-4">
//                 <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Confirm new password</label>
//                 <input type="password" id="confirmNewPassword" value={passwordData.confirmNewPassword} onChange={handlePasswordChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm" />
//             </div>
//             {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>}
//             <div className="bg-gray-50 p-6 border-t border-gray-200 mt-4">
//                 <button
//                     onClick={handleUpdatePassword}
//                     disabled={isUpdatingPassword}
//                     className={`w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50`}
//                 >
//                     {isUpdatingPassword ? 'Updating Password...' : 'Update Password'}
//                 </button>
//             </div>
//         </div>
//     );
// };

// const EditAccountPage: React.FC = () => {
//     const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');
//     const [userData, setUserData] = useState<User | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<Error | null>(null);
//     const [isUpdating, setIsUpdating] = useState<boolean>(false);
//     const [formData, setFormData] = useState<UserDataDetails>({ // Move formData state here
//         firstName: '',
//         lastName: '',
//         userName: '',
//         email: '',
//         Region: '',
//         Phone_number: '',
//         Gender: '',
//         profilePhoto: null,
//     });


//     const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null); // Move preview state here
//     const [showCodeInput, setShowCodeInput] = useState(false); // Move showCodeInput state here
//     const [isActivating, setIsActivating] = useState<boolean>(false); // Move isActivating state here


//     useEffect(() => {
//         const fetchUserData = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await axios.get<GetUserResponse>(`${process.env.REACT_APP_BACK_URL}/GetUser`, {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//                 });
//                 setUserData(response.data.user);
//                 setFormData(response.data.user); // Initialize formData with user data here
//                 setProfilePhotoPreview(`http://127.0.0.1:8000/storage/${response.data.user.profilePhoto}` || null); // Initialize preview from backend
//             } catch (e: any) {
//                 if (axios.isAxiosError(e)) {
//                     const axiosError = e as AxiosError<ErrorResponse>;
//                     setError(new Error(axiosError.response?.data?.message || axiosError.message));
//                     toast.error(`Failed to load user data: ${axiosError.message}`);
//                 } else {
//                     setError(new Error('An unexpected error occurred'));
//                     toast.error('Failed to load user data: An unexpected error occurred');
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUserData();
//     }, []);

//     useEffect(() => {
//         if (userData) {
//             setFormData({ // Update formData when userData changes
//                 firstName: userData.firstName || '',
//                 lastName: userData.lastName || '',
//                 userName: userData.userName || '',
//                 email: userData.email || '',
//                 Region: userData.Region || '',
//                 Phone_number: userData.Phone_number || '',
//                 Gender: userData.Gender || '',
//                 profilePhoto: userData.profilePhoto || null,
//             });
//             setProfilePhotoPreview(`http://127.0.0.1:8000/storage/${userData.profilePhoto}` || null);
//         }
//     }, [userData]);


//     const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         setFormData({ ...formData, [e.target.id]: e.target.value });
//     };

//     const handleGenderChange = (gender: string) => {
//         setFormData({ ...formData, Gender: gender });
//     };


//     const handleActivate = async () => {
//         setIsActivating(true);
//         setTimeout(() => {
//             setIsActivating(false);
//             setShowCodeInput(true);
//             toast.info('Activation code sent! Please check your phone.');
//         }, 1000);
//     };

//     const handleSendCode = async () => {
//         toast.success('Phone number activated successfully!');
//         setShowCodeInput(false);
//     };

//     const handleBackToPhoneInput = () => {
//         setShowCodeInput(false);
//     };


//     const handleProfilePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             setFormData({ ...formData, profilePhoto: file as any });
//             setProfilePhotoPreview(URL.createObjectURL(file));
//         }
//     };


//     const handleUpdateProfile = async () => {
//         setIsUpdating(true);
//         setError(null);

//         try {

//             const formDataForUpdate = new FormData();
//             formDataForUpdate.append('firstName', formData.firstName || '');
//             formDataForUpdate.append('lastName', formData.lastName || '');
//             formDataForUpdate.append('userName', formData.userName || '');
//             formDataForUpdate.append('Region', formData.Region || '');
//             formDataForUpdate.append('Phone_number', formData.Phone_number || '');
//             formDataForUpdate.append('Gender', formData.Gender || '');
//             if (formData.profilePhoto) {
//                 formDataForUpdate.append('profilePhoto', formData.profilePhoto);
//             }

//             console.log(formDataForUpdate);
            
//             const response = await axios.post<ProfileUpdateResponse>(`${process.env.REACT_APP_BACK_URL}/profileUpdate?_method=PUT`, formDataForUpdate, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             console.log("respoinsew", response);

//             setUserData(response.data.user);
//             setProfilePhotoPreview(`http://127.0.0.1:8000/storage/${response.data.user.profilePhoto}`);
//             toast.success('Profile updated successfully!');
//         } catch (e: any) {
//             setIsUpdating(false);
//             if (axios.isAxiosError(e)) {
//                 const axiosError = e as AxiosError<ErrorResponse>;
//                 setError(new Error(axiosError.response?.data?.message || axiosError.message));
//                 toast.error(`Failed to update profile: ${axiosError.response?.data?.message || axiosError.message}`);
//             } else {
//                 setError(new Error('An unexpected error occurred'));
//                 toast.error('Failed to update profile: An unexpected error occurred');
//             }
//         } finally {
//             setIsUpdating(false);
//         }
//     };


//     const handleUpdate = async () => {
//         if (activeTab === 'profile') {
//             await handleUpdateProfile(); // Now formData is in scope
//         } else if (activeTab === 'password') {
//             // No action needed here for profile update, PasswordTabContent handles its own update
//         }
//     };


//     if (loading) {
//         return <div>Loading account settings...</div>;
//     }

//     if (error) {
//         return (
//             <div>
//                 Error loading settings: {error.message}
//                 <button onClick={() => window.location.reload()}>Retry</button>
//             </div>
//         );
//     }


//     return (
//         <div className="bg-gray-100 min-h-screen py-32">
//             <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//             <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
//                 <div className="bg-gray-50 border-b border-gray-200">
//                     <div className="flex">
//                         <button
//                             onClick={() => setActiveTab('profile')}
//                             className={`py-4 px-6 text-sm font-medium ${activeTab === 'profile' ? 'bg-white border-b-2 border-orange-500 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`}
//                         >
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 inline-block align-middle mr-1">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0 .75.75 0 01-.011.02l-.002.002a.75.75 0 01-.716.696H6.095a.75.75 0 01-.75-.75v-.002c0-.013.018-.025.031-.036l.002-.002z" />
//                             </svg>
//                             Profile
//                         </button>
//                         <button
//                             onClick={() => setActiveTab('password')}
//                             className={`py-4 px-6 text-sm font-medium ${activeTab === 'password' ? 'bg-white border-b-2 border-orange-500 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`}
//                         >
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 inline-block align-middle mr-1">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a3 3 0 00-3-3H6.75a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5m-3 0h3m-3 0H6.75m0 0V6.75" />
//                             </svg>
//                             Password
//                         </button>
//                     </div>
//                 </div>

//                 {/* Tab Content */}
//                 <div>
//                     {activeTab === 'profile' && <ProfileTabContent
//                         formData={formData}
//                         onInputChange={handleInputChange}
//                         onGenderChange={handleGenderChange}
//                         onActivate={handleActivate}
//                         onSendCode={handleSendCode}
//                         onBackToPhoneInput={handleBackToPhoneInput}
//                         onProfilePhotoChange={handleProfilePhotoChange}
//                         profilePhotoPreview={profilePhotoPreview}
//                         showCodeInput={showCodeInput}
//                         isActivating={isActivating}
//                     />}
//                     {activeTab === 'password' && <PasswordTabContent onUpdatePasswordSuccess={function (): void {
//                         throw new Error('Function not implemented.');
//                     } } />}
//                 </div>

//                 {/* Update Button - conditionally render only for profile tab */}
//                 {activeTab === 'profile' && (
//                     <div className="bg-gray-50 p-6 border-t border-gray-200">
//                         <button
//                             onClick={handleUpdate}
//                             disabled={isUpdating}
//                             className={`w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50`}
//                         >
//                             {isUpdating ? 'Updating...' : 'Update'}
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default EditAccountPage;




import React, { useState, useEffect, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define TypeScript interfaces for data types
interface UserDataDetails {
    firstName?: string;
    lastName?: string;
    userName?: string;
    email?: string;
    Region?: string | null;
    Phone_number?: string | null;
    Gender?: string | null;
    profilePhoto?: string | null;
}

interface User {
    id: number;
    firstName?: string;
    lastName?: string;
    email: string;
    userName?: string;
    role?: string;
    accountType?: string;
    isEmailVerified?: number;
    created_at?: string;
    updated_at?: string;
    profilePhoto?: string | null;
    Region?: string | null;
    Phone_number?: string | null;
    Gender?: string | null;
}

interface GetUserResponse {
    message?: string;
    user: User;
}

interface ProfileUpdateResponse {
    message: string;
    user: User;
}

interface ErrorResponse {
    message: string;
}

interface PasswordResetResponse {
    message: string;
}


interface ProfileTabContentProps {
    formData: UserDataDetails;
    onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onGenderChange: (gender: string) => void;
    onActivate: () => void;
    onSendCode: () => void;
    onBackToPhoneInput: () => void;
    onProfilePhotoChange: (e: ChangeEvent<HTMLInputElement>) => void;
    profilePhotoPreview: string | null;
    showCodeInput: boolean;
    isActivating: boolean;
    language: 'en' | 'ar'; // Add language prop
}


const translations = {
    en: {
        "Change photo": "Change photo",
        "First name": "First name",
        "Last name": "Last name",
        "User name": "User name",
        "Email": "Email",
        "Gender": "Gender",
        "Male": "Male",
        "Female": "Female",
        "Region": "Region",
        "Select Region": "Select Region",
        "Saudi Arabia": "Saudi Arabia",
        "Egypt": "Egypt",
        "United Arab Emirates": "United Arab Emirates",
        "Yemen": "Yemen",
        "Qatar": "Qatar",
        "Algeria": "Algeria",
        "Morocco": "Morocco",
        "Palestine": "Palestine",
        "Phone number": "Phone number",
        "Enter phone number": "Enter phone number",
        "Activate": "Activate",
        "Activating...": "Activating...",
        "To activate your mobile number, send the activation code via SMS to the mobile number that appears to you": "To activate your mobile number, send the activation code via SMS to the mobile number that appears to you",
        "Open your phone and create a new text message": "Open your phone and create a new text message",
        "Enter the mobile number that appears in the recipient field": "Enter the mobile number that appears in the recipient field",
        "Write the activation code in the text of the message and then send it": "Write the activation code in the text of the message and then send it",
        "After sending the message, click the “I have sent the activation code” button.": "After sending the message, click the “I have sent the activation code” button.",
        "Make sure you have enough credit and that your mobile phone supports international messages": "Make sure you have enough credit and that your mobile phone supports international messages",
        "Enter the code sent to you": "Enter the code sent to you",
        "Back": "Back",
        "Send": "Send",
        "Old password": "Old password",
        "New password": "New password",
        "Confirm new password": "Confirm new password",
        "All password fields are required.": "All password fields are required.",
        "New passwords do not match.": "New passwords do not match.",
        "New password must be at least 6 characters long.": "New password must be at least 6 characters long.",
        "Password updated successfully!": "Password updated successfully!",
        "Failed to update password.": "Failed to update password.",
        "Updating Password...": "Updating Password...",
        "Profile": "Profile",
        "Password": "Password",
        "Loading account settings...": "Loading account settings...",
        "Error loading settings": "Error loading settings",
        "Retry": "Retry",
        "Failed to load user data": "Failed to load user data",
        "Profile updated successfully!": "Profile updated successfully!",
        "Failed to update profile": "Failed to update profile",
        "Updating...": "Updating...",
        "English": "English",
        "عربي": "عربي",
    },
    ar: {
        "Change photo": "تغيير الصورة",
        "First name": "الاسم الأول",
        "Last name": "اسم العائلة",
        "User name": "اسم المستخدم",
        "Email": "البريد الإلكتروني",
        "Gender": "النوع",
        "Male": "ذكر",
        "Female": "أنثى",
        "Region": "المنطقة",
        "Select Region": "اختر المنطقة",
        "Saudi Arabia": "المملكة العربية السعودية",
        "Egypt": "مصر",
        "United Arab Emirates": "الإمارات العربية المتحدة",
        "Yemen": "اليمن",
        "Qatar": "قطر",
        "Algeria": "الجزائر",
        "Morocco": "المغرب",
        "Palestine": "فلسطين",
        "Phone number": "رقم الهاتف",
        "Enter phone number": "أدخل رقم الهاتف",
        "Activate": "تفعيل",
        "Activating...": "جاري التفعيل...",
        "To activate your mobile number, send the activation code via SMS to the mobile number that appears to you": "لتفعيل رقم هاتفك المحمول، أرسل رمز التفعيل عبر الرسائل القصيرة إلى رقم الهاتف المحمول الذي يظهر لك",
        "Open your phone and create a new text message": "افتح هاتفك وأنشئ رسالة نصية جديدة",
        "Enter the mobile number that appears in the recipient field": "أدخل رقم الهاتف المحمول الذي يظهر في خانة المستلم",
        "Write the activation code in the text of the message and then send it": "اكتب رمز التفعيل في نص الرسالة ثم أرسلها",
        "After sending the message, click the “I have sent the activation code” button.": "بعد إرسال الرسالة، انقر فوق زر “لقد أرسلت رمز التفعيل”.",
        "Make sure you have enough credit and that your mobile phone supports international messages": "تأكد من أن لديك رصيدًا كافيًا وأن هاتفك المحمول يدعم الرسائل الدولية",
        "Enter the code sent to you": "أدخل الرمز المرسل إليك",
        "Back": "رجوع",
        "Send": "إرسال",
        "Old password": "كلمة المرور القديمة",
        "New password": "كلمة المرور الجديدة",
        "Confirm new password": "تأكيد كلمة المرور الجديدة",
        "All password fields are required.": "جميع حقول كلمة المرور مطلوبة.",
        "New passwords do not match.": "كلمتا المرور الجديدتان غير متطابقتين.",
        "New password must be at least 6 characters long.": "يجب أن تتكون كلمة المرور الجديدة من 6 أحرف على الأقل.",
        "Password updated successfully!": "تم تحديث كلمة المرور بنجاح!",
        "Failed to update password.": "فشل تحديث كلمة المرور.",
        "Updating Password...": "جاري تحديث كلمة المرور...",
        "Profile": "الملف الشخصي",
        "Password": "كلمة المرور",
        "Loading account settings...": "جاري تحميل إعدادات الحساب...",
        "Error loading settings": "خطأ في تحميل الإعدادات",
        "Retry": "إعادة المحاولة",
        "Failed to load user data": "فشل تحميل بيانات المستخدم",
        "Profile updated successfully!": "تم تحديث الملف الشخصي بنجاح!",
        "Failed to update profile": "فشل تحديث الملف الشخصي",
        "Updating...": "جاري التحديث...",
        "English": "الإنجليزية",
        "عربي": "العربية",
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};


const ProfileTabContent: React.FC<ProfileTabContentProps> = ({
    formData,
    onInputChange,
    onGenderChange,
    onActivate,
    onSendCode,
    onBackToPhoneInput,
    onProfilePhotoChange,
    profilePhotoPreview,
    showCodeInput,
    isActivating,
    language
}) => {


    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="p-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-8">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                        {profilePhotoPreview ? (
                            <img src={profilePhotoPreview} alt={translate("Profile Preview", language)} className="w-full h-full object-cover" />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16 text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0 .75.75 0 01-.011.02l-.002.002a.75.75 0 01-.716.696H6.095a.75.75 0 01-.75-.75v-.002c0-.013.018-.025.031-.036l.002-.002z" />
                            </svg>
                        )}
                    </div>
                    <label htmlFor="profilePhoto" className="absolute bottom-0 right-0 cursor-pointer bg-orange-500 text-white text-xs py-1 px-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
                        {translate("Change photo", language)}
                        <input type="file" id="profilePhoto" className="hidden" accept="image/*" onChange={onProfilePhotoChange} />
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">{translate("First name", language)}</label>
                    <input type="text" id="firstName" value={formData.firstName} onChange={onInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">{translate("Last name", language)}</label>
                    <input type="text" id="lastName" value={formData.lastName} onChange={onInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700">{translate("User name", language)}</label>
                <input type="text" id="userName" value={formData.userName} onChange={onInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">{translate("Email", language)}</label>
                <input type="email" id="email" value={formData.email} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed sm:text-sm" />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">{translate("Gender", language)}</label>
                    <div className="mt-2 flex items-center space-x-4">
                        <label className="inline-flex items-center">
                            <input type="radio" className="form-radio h-4 w-4 text-orange-600" name="Gender" id="Gender" value="Male" checked={formData.Gender === 'Male'} onChange={(e) => onGenderChange(e.target.value)} />
                            <span className="ml-2 text-gray-700">{translate("Male", language)}</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input type="radio" className="form-radio h-4 w-4 text-orange-600" name="Gender" id="Gender" value="Female" checked={formData.Gender === 'Female'} onChange={(e) => onGenderChange(e.target.value)} />
                            <span className="ml-2 text-gray-700">{translate("Female", language)}</span>
                        </label>
                    </div>
                </div>
                <div>
                    <label htmlFor="Region" className="block text-sm font-medium text-gray-700">{translate("Region", language)}</label>
                    <select id="Region" value={formData.Region ?? ""} onChange={onInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                        <option value="">{translate("Select Region", language)}</option>
                        <option value="saudi-arabia">{translate("Saudi Arabia", language)}</option>
                        <option value="egypt">{translate("Egypt", language)}</option>
                        <option value="united-arab-emirates">{translate("United Arab Emirates", language)}</option>
                        <option value="yemen">{translate("Yemen", language)}</option>
                        <option value="qatar">{translate("Qatar", language)}</option>
                        <option value="algeria">{translate("Algeria", language)}</option>
                        <option value="morocco">{translate("Morocco", language)}</option>
                        <option value="palestine">{translate("Palestine", language)}</option>
                        {/* Add more regions as needed */}
                    </select>
                </div>
            </div>


            <div className="mb-4">
                <label htmlFor="Phone_number" className="block text-sm font-medium text-gray-700">{translate("Phone number", language)}</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        <select className="bg-transparent border-none focus:ring-0 text-gray-700" disabled>
                            <option value="+966">+966</option>
                            <option value="+20">+20</option>
                            <option value="+971">+971</option>
                            {/* Add more country codes */}
                        </select>
                    </span>
                    <input
                        type="tel"
                        id="Phone_number"
                        value={formData.Phone_number ?? ""}
                        onChange={onInputChange}
                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        placeholder={translate("Enter phone number", language)}
                        readOnly={showCodeInput}
                    />
                    {!showCodeInput && (
                        <button
                            onClick={onActivate}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                            disabled={isActivating || showCodeInput}
                        >
                            {isActivating ? translate("Activating...", language) : translate("Activate", language)}
                        </button>
                    )}
                </div>
            </div>

            {showCodeInput && (
                <div className="mb-4 p-4 border border-gray-300 rounded-md bg-gray-50">
                    <p className="text-sm text-gray-700 mb-2">
                        {translate("To activate your mobile number, send the activation code via SMS to the mobile number that appears to you", language)}
                    </p>
                    <ol className="list-decimal pl-5 text-sm text-gray-700 mb-4">
                        <li>{translate("Open your phone and create a new text message", language)}</li>
                        <li>{translate("Enter the mobile number that appears in the recipient field", language)}</li>
                        <li>{translate("Write the activation code in the text of the message and then send it", language)}</li>
                        <li>{translate("After sending the message, click the “I have sent the activation code” button.", language)}</li>
                        <li>{translate("Make sure you have enough credit and that your mobile phone supports international messages", language)}</li>
                    </ol>
                    <p className="text-sm text-gray-700 mb-2">{translate("Enter the code sent to you", language)}</p>
                    <div className="flex gap-2 mb-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                className="w-10 h-10 text-center rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                            />
                        ))}
                    </div>
                    <div className="flex justify-end gap-2">
                        <button onClick={onBackToPhoneInput} className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
                            {translate("Back", language)}
                        </button>
                        <button onClick={onSendCode} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
                            {translate("Send", language)}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

interface PasswordTabContentProps {
    onUpdatePasswordSuccess: () => void;
    language: 'en' | 'ar'; // Add language prop
}


const PasswordTabContent: React.FC<PasswordTabContentProps> = ({ onUpdatePasswordSuccess, language }) => {
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [passwordError, setPasswordError] = useState('');
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);


    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordData({ ...passwordData, [e.target.id]: e.target.value });
        setPasswordError('');
    };

    const handleUpdatePassword = async () => {
        setPasswordError('');
        if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmNewPassword) {
            setPasswordError(translate("All password fields are required.", language));
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            setPasswordError(translate("New passwords do not match.", language));
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setPasswordError(translate("New password must be at least 6 characters long.", language));
            return;
        }


        setIsUpdatingPassword(true);
        try {
            const response = await axios.put<PasswordResetResponse>(`${process.env.REACT_APP_BACK_URL}/ResetPassword`, {
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response.data.message);

            toast.success(translate("Password updated successfully!", language));
            setPasswordData({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
            if (onUpdatePasswordSuccess) {
                onUpdatePasswordSuccess();
            }

        } catch (e: any) {
            if (axios.isAxiosError(e)) {
                const axiosError = e as AxiosError<ErrorResponse>;
                setPasswordError(axiosError.response?.data?.message || translate("Failed to update password.", language));
                toast.error(`${translate("Failed to update password.", language)}: ${axiosError.response?.data?.message || axiosError.message}`);
            } else {
                // setPasswordError('An unexpected error occurred.');
                // toast.error('Failed to update password: An unexpected error occurred');
            }
        } finally {
            setIsUpdatingPassword(false);
        }
    };

    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="p-6">
            <div className="mb-4">
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">{translate("Old password", language)}</label>
                <input type="password" id="oldPassword" value={passwordData.oldPassword} onChange={handlePasswordChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm" />
            </div>
            <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">{translate("New password", language)}</label>
                <input type="password" id="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm" />
            </div>
            <div className="mb-4">
                <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">{translate("Confirm new password", language)}</label>
                <input type="password" id="confirmNewPassword" value={passwordData.confirmNewPassword} onChange={handlePasswordChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm" />
            </div>
            {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>}
            <div className="bg-gray-50 p-6 border-t border-gray-200 mt-4">
                <button
                    onClick={handleUpdatePassword}
                    disabled={isUpdatingPassword}
                    className={`w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50`}
                >
                    {isUpdatingPassword ? translate("Updating Password...", language) : translate("Update Password", language)}
                </button>
            </div>
        </div>
    );
};

const EditAccountPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [formData, setFormData] = useState<UserDataDetails>({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        Region: '',
        Phone_number: '',
        Gender: '',
        profilePhoto: null,
    });
    const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [isActivating, setIsActivating] = useState<boolean>(false);
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
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get<GetUserResponse>(`${process.env.REACT_APP_BACK_URL}/GetUser`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setUserData(response.data.user);
                setFormData(response.data.user);
                setProfilePhotoPreview(`http://127.0.0.1:8000/storage/${response.data.user.profilePhoto}` || null);
            } catch (e: any) {
                if (axios.isAxiosError(e)) {
                    const axiosError = e as AxiosError<ErrorResponse>;
                    setError(new Error(axiosError.response?.data?.message || axiosError.message));
                    toast.error(`${translate("Failed to load user data", language)}: ${axiosError.message}`);
                } else {
                    setError(new Error('An unexpected error occurred'));
                    toast.error(`${translate("Failed to load user data", language)}: An unexpected error occurred`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [language]); // Added language dependency

    useEffect(() => {
        if (userData) {
            setFormData({
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                userName: userData.userName || '',
                email: userData.email || '',
                Region: userData.Region || '',
                Phone_number: userData.Phone_number || '',
                Gender: userData.Gender || '',
                profilePhoto: userData.profilePhoto || null,
            });
            setProfilePhotoPreview(`http://127.0.0.1:8000/storage/${userData.profilePhoto}` || null);
        }
    }, [userData]);


    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleGenderChange = (gender: string) => {
        setFormData({ ...formData, Gender: gender });
    };


    const handleActivate = async () => {
        setIsActivating(true);
        setTimeout(() => {
            setIsActivating(false);
            setShowCodeInput(true);
            toast.info(translate('Activation code sent! Please check your phone.', language));
        }, 1000);
    };

    const handleSendCode = async () => {
        toast.success(translate('Phone number activated successfully!', language));
        setShowCodeInput(false);
    };

    const handleBackToPhoneInput = () => {
        setShowCodeInput(false);
    };


    const handleProfilePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, profilePhoto: file as any });
            setProfilePhotoPreview(URL.createObjectURL(file));
        }
    };


    const handleUpdateProfile = async () => {
        setIsUpdating(true);
        setError(null);

        try {

            const formDataForUpdate = new FormData();
            formDataForUpdate.append('firstName', formData.firstName || '');
            formDataForUpdate.append('lastName', formData.lastName || '');
            formDataForUpdate.append('userName', formData.userName || '');
            formDataForUpdate.append('Region', formData.Region || '');
            formDataForUpdate.append('Phone_number', formData.Phone_number || '');
            formDataForUpdate.append('Gender', formData.Gender || '');
            if (formData.profilePhoto) {
                formDataForUpdate.append('profilePhoto', formData.profilePhoto);
            }

            console.log(formDataForUpdate);

            const response = await axios.post<ProfileUpdateResponse>(`${process.env.REACT_APP_BACK_URL}/profileUpdate?_method=PUT`, formDataForUpdate, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("respoinsew", response);

            setUserData(response.data.user);
            setProfilePhotoPreview(`http://127.0.0.1:8000/storage/${response.data.user.profilePhoto}`);
            toast.success(translate('Profile updated successfully!', language));
        } catch (e: any) {
            setIsUpdating(false);
            if (axios.isAxiosError(e)) {
                const axiosError = e as AxiosError<ErrorResponse>;
                setError(new Error(axiosError.response?.data?.message || axiosError.message));
                toast.error(`${translate("Failed to update profile", language)}: ${axiosError.response?.data?.message || axiosError.message}`);
            } else {
                setError(new Error('An unexpected error occurred'));
                toast.error(`${translate("Failed to update profile", language)}: An unexpected error occurred`);
            }
        } finally {
            setIsUpdating(false);
        }
    };


    const handleUpdate = async () => {
        if (activeTab === 'profile') {
            await handleUpdateProfile();
        } else if (activeTab === 'password') {
            // No action needed here for profile update, PasswordTabContent handles its own update
        }
    };


    if (loading) {
        return <div>{translate("Loading account settings...", language)}</div>;
    }

    if (error) {
        return (
            <div>
                {translate("Error loading settings", language)}: {error.message}
                <button onClick={() => window.location.reload()}>{translate("Retry", language)}</button>
            </div>
        );
    }


    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="bg-gray-100 min-h-screen py-16 md:py-32 font-sans">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
             <div className="px-4 md:px-0 flex justify-end">
                <button onClick={toggleLanguage} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                    {language === 'en' ? translate('عربي', language) : translate('English', language)}
                </button>
            </div>
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`py-4 px-6 text-sm md:text-base font-medium ${activeTab === 'profile' ? 'bg-white border-b-2 border-orange-500 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 inline-block align-middle mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0 .75.75 0 01-.011.02l-.002.002a.75.75 0 01-.716.696H6.095a.75.75 0 01-.75-.75v-.002c0-.013.018-.025.031-.036l.002-.002z" />
                            </svg>
                            {translate("Profile", language)}
                        </button>
                        <button
                            onClick={() => setActiveTab('password')}
                            className={`py-4 px-6 text-sm md:text-base font-medium ${activeTab === 'password' ? 'bg-white border-b-2 border-orange-500 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 inline-block align-middle mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a3 3 0 00-3-3H6.75a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5m-3 0h3m-3 0H6.75m0 0V6.75" />
                            </svg>
                            {translate("Password", language)}
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div>
                    {activeTab === 'profile' && <ProfileTabContent
                        formData={formData}
                        onInputChange={handleInputChange}
                        onGenderChange={handleGenderChange}
                        onActivate={handleActivate}
                        onSendCode={handleSendCode}
                        onBackToPhoneInput={handleBackToPhoneInput}
                        onProfilePhotoChange={handleProfilePhotoChange}
                        profilePhotoPreview={profilePhotoPreview}
                        showCodeInput={showCodeInput}
                        isActivating={isActivating}
                        language={language} // Pass language prop
                    />}
                    {activeTab === 'password' && <PasswordTabContent onUpdatePasswordSuccess={() => {}} language={language} />}  {/* Pass language prop */}
                </div>

                {/* Update Button - conditionally render only for profile tab */}
                {activeTab === 'profile' && (
                    <div className="bg-gray-50 p-6 border-t border-gray-200">
                        <button
                            onClick={handleUpdate}
                            disabled={isUpdating}
                            className={`w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50`}
                        >
                            {isUpdating ? translate("Updating...", language) : translate("Update", language)}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditAccountPage;