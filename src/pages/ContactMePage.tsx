// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import freelancerAvatarUrl from '../assets/Rectangle 4.png';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';

// interface ContactMePageProps {
//     clientName?: string;
//     clientEmail?: string;
// }

// interface UserData {
//     id: number;
//     userId: number;
//     specialist: string | null;
//     jobTitle: string | null;
//     description: string | null;
//     skillsOfWork: string | null;
//     created_at: string;
//     updated_at: string;
// }

// interface Freelancer {
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
//     rate: number | null;
//     user_data: UserData | null;
// }

// interface UserResponse {
//     message: string;
//     user: Freelancer;
// }

// // --- Skeleton Component for Freelancer Info ---
// const FreelancerInfoSkeleton: React.FC = () => (
//     <div className="bg-gray-50 p-4 rounded-md mb-6 animate-pulse">
//         <div className="flex items-center space-x-4">
//             <div className="w-10 h-10 rounded-full bg-gray-300"></div>
//             <div>
//                 <div className="h-4 bg-gray-300 rounded w-48 mb-1"></div>
//                 <div className="h-3 bg-gray-300 rounded w-32"></div>
//             </div>
//         </div>
//         <div className="mt-3">
//             <div className="h-3 bg-gray-300 rounded w-full"></div>
//             <div className="h-3 bg-gray-300 rounded w-5/6 mt-1"></div>
//         </div>
//     </div>
// );

// const ContactMePage: React.FC<ContactMePageProps> = ({
//     clientName = 'Client Name',
//     clientEmail = 'client@example.com'
// }) => {
//     const navigate = useNavigate();
//     const { freelancerId } = useParams<{ freelancerId: string }>();
//     const [freelancer, setFreelancer] = useState<Freelancer | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [imagePreviews, setImagePreviews] = useState<string[]>([]);

//     const [privateMessage, setPrivateMessage] = useState('');
//     const [projectTitle, setProjectTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [photos, setPhotos] = useState<File[]>([]);
//     const [requiredSkills, setRequiredSkills] = useState('');
//     const [section, setSection] = useState('');
//     const [subsection, setSubsection] = useState('');
//     const [expectedBudget, setExpectedBudget] = useState('');
//     const [expectedDuration, setExpectedDuration] = useState('');

//     const [validationErrors, setValidationErrors] = useState<{
//         projectTitle?: string;
//         description?: string;
//         requiredSkills?: string;
//         section?: string;
//         subsection?: string;
//         expectedBudget?: string;
//         expectedDuration?: string;
//     }>({});

//     const skillsOptions = ["", "JavaScript", "React", "Laravel", "Node.js", "Python", "Design", "Marketing", "Writing"];
//     const sectionOptions = ["", "Web Development", "Mobile App Development", "Design", "Marketing", "Writing", "Other"];
//     const subsectionOptions = ["", "Frontend", "Backend", "Full Stack", "UI/UX Design", "Graphic Design", "Content Writing", "SEO", "Social Media"];
//     const budgetOptions = ["", "Less than $500", "$500 - $1000", "$1000 - $2000", "$2000+"];
//     const durationOptions = ["", "Less than 1 week", "1-2 weeks", "2 weeks - 1 month", "1-3 months", "More than 3 months"];

//     const renderStars = (rate: number | null) => {
//         const stars = [];
//         const filledStars = Math.floor(rate || 0);

//         for (let i = 0; i < 5; i++) {
//             const isFilled = i < filledStars;
//             stars.push(
//                 <svg
//                     key={i}
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                     className={`w-4 h-4 ${isFilled ? 'fill-yellow-400 stroke-yellow-400' : 'fill-gray-300 stroke-gray-300'}`}
//                 >
//                     <path
//                         d="M12.4864 5.30575L13.9346 10.074V10.5098H14.4346H18.8846C19.3656 10.5098 19.5711 11.1253 19.1728 11.4137C19.1726 11.4139 19.1723 11.4141 19.172 11.4143L15.534 14.0129L15.24 14.2229L15.347 14.5679L16.777 19.1779L16.7773 19.1786C16.9214 19.6409 16.3831 20.0074 15.9987 19.7229L15.9975 19.722L12.3075 16.912L12.0051 16.6817L11.7024 16.9115L8.01235 19.7115L8.01049 19.7129C7.62608 20.0074 7.08777 19.6309 7.23193 19.1686L7.23215 19.1679L8.66215 14.5579L8.76918 14.2129L8.47522 14.0029L4.83522 11.4029L4.83375 11.4019C4.44423 11.1257 4.63839 10.4998 5.1246 10.4998H9.5746H9.94456L10.0527 10.146L11.5327 5.30598L11.5328 5.30598L11.5342 5.30112C11.6708 4.83765 12.3379 4.81944 12.4864 5.30575Z"
//                         fill={isFilled ? '#EEE626' : '#D1D5DB'}
//                         stroke={isFilled ? '#EEE626' : '#D1D5DB'}
//                     />
//                 </svg>
//             );
//         }
//         return stars;
//     };

//     useEffect(() => {
//         const fetchFreelancer = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await axios.get<UserResponse>(`${process.env.REACT_APP_BACK_URL}/GetUser`, {
//                     headers: {
//                         'Authorization': `Bearer ${localStorage.getItem('token')}`
//                     }
//                 });
//                 setFreelancer(response.data.user);
//             } catch (e: any) {
//                 setError('Failed to load freelancer.');
//                 if (axios.isAxiosError(e)) {
//                     console.error('Axios error fetching freelancer:', e.message);
//                 } else {
//                     console.error('Unexpected error fetching freelancer:', e);
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (freelancerId) {
//             fetchFreelancer();
//         } else {
//             setError("Freelancer ID is missing.");
//             setLoading(false);
//         }
//     }, [freelancerId]);

//     const validateForm = () => {
//         let errors: any = {};
//         let isValid = true;

//         if (!projectTitle) {
//             errors.projectTitle = 'Project title is required';
//             isValid = false;
//         }
//         if (!description) {
//             errors.description = 'Description is required';
//             isValid = false;
//         }
//         if (!requiredSkills) {
//             errors.requiredSkills = 'Skills are required';
//             isValid = false;
//         }
//         if (!section) {
//             errors.section = 'Section is required';
//             isValid = false;
//         }
//         if (!subsection) {
//             errors.subsection = 'Subsection is required';
//             isValid = false;
//         }
//         if (!expectedBudget) {
//             errors.expectedBudget = 'Budget is required';
//             isValid = false;
//         }
//         if (!expectedDuration) {
//             errors.expectedDuration = 'Duration is required';
//             isValid = false;
//         }

//         setValidationErrors(errors);
//         return isValid;
//     };

//     const handlePublish = async () => {
//         if (!validateForm()) {
//             return; // Stop submission if form is invalid
//         }

//         if (!freelancerId) {
//             toast.error('Freelancer ID is missing, cannot submit form.');
//             return;
//         }

//         setIsSubmitting(true);

//         const formData = new FormData();
//         formData.append('freelancer_id', freelancerId);
//         formData.append('client_name', clientName);
//         formData.append('client_email', clientEmail);
//         formData.append('freelancer_name', freelancer?.firstName + ' ' + freelancer?.lastName || '');
//         formData.append('private_message', privateMessage);
//         formData.append('project_title', projectTitle);
//         formData.append('description', description);
//         for (let i = 0; i < photos.length; i++) {
//             formData.append('photos[]', photos[i]);
//         }
//         formData.append('required_skills', requiredSkills);
//         formData.append('section', section);
//         formData.append('subsection', subsection);
//         formData.append('expected_budget', expectedBudget);
//         formData.append('expected_duration', expectedDuration);

//         try {
//             const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/contact-freelancer`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });

//             console.log(response);
            
//             toast.success('Message sent successfully!', {
//                 position: "top-right",
//             });
//             navigate('/react/FreelancerList');

//         } catch (error: any) {
//             console.error('Error submitting contact form:', error.response?.data || error.message);
//             toast.error(`Error sending message: ${error.response?.data.message || error.message}`, {
//                 position: "top-right",
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleCancel = () => {
//         toast.warn('Contact form cancelled', {
//             position: "top-right",
//         });
//         navigate('/react/FreelancerList');
//     };

//     const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const files = Array.from(e.target.files || []);
//         setPhotos(files);

//         const previews: string[] = [];
//         files.forEach(file => {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 previews.push(reader.result as string);
//                 if (previews.length === files.length) {
//                     setImagePreviews(previews);
//                 }
//             };
//             reader.readAsDataURL(file);
//         });
//     };

//     if (loading) {
//         return (
//             <div className="py-32 bg-gray-100 min-h-screen flex justify-center px-4 sm:px-6 lg:px-8">
//                 <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-3xl w-full">
//                     <div className="px-6 py-4">
//                         <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Contact Freelancer</h2>
//                         <FreelancerInfoSkeleton />
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return <div className="text-red-500 text-center">Error: {error}</div>;
//     }

//     const freelancerFullName = freelancer ? `${freelancer.firstName} ${freelancer.lastName}` : 'Loading Name...';
//     const freelancerAvatar = freelancer?.profilePhoto || freelancerAvatarUrl;
//     const freelancerRate = freelancer?.rate || null;
//     const freelancerSpecialization = freelancer?.user_data?.specialist || 'No Specialization';

//     return (
//         <div className="py-32 bg-gray-100 min-h-screen flex justify-center px-4 sm:px-6 lg:px-8">
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-3xl w-full">
//                 <div className="px-6 py-4">
//                     <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Contact {freelancerFullName}</h2>

//                     {/* Freelancer Info Section */}
//                     <div className="bg-gray-50 p-4 rounded-md mb-6">
//                         <div className="flex items-center space-x-4">
//                             <div className="w-10 h-10 rounded-full overflow-hidden">
//                                 <img src={`http://127.0.0.1:8000/storage/${freelancerAvatar}`} alt="Freelancer Avatar" className="w-full h-full object-cover" />
//                             </div>
//                             <div>
//                                 <h3 className="font-semibold text-gray-800">{freelancerFullName}</h3>
//                                 <div className="flex items-center space-x-1 text-sm text-yellow-400">
//                                     {renderStars(freelancerRate)}
//                                     <span>({freelancerRate !== null ? freelancerRate?.toFixed(1) : 'No Rating'})</span>
//                                 </div>
//                                 <p className="text-gray-600 text-sm">{freelancerSpecialization}</p>
//                             </div>
//                         </div>
//                         <div className="mt-3">
//                             <label htmlFor="privateMessage" className="block text-sm font-medium text-gray-700">Send private message</label>
//                             <textarea
//                                 id="privateMessage"
//                                 rows={3}
//                                 className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
//                                 placeholder="Write your message here..."
//                                 value={privateMessage}
//                                 onChange={(e) => setPrivateMessage(e.target.value)}
//                             ></textarea>
//                         </div>
//                     </div>

//                     {/* Form Fields */}
//                     <div className="space-y-4">
//                         <div>
//                             <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700">Project Title</label>
//                             <input
//                                 type="text"
//                                 id="projectTitle"
//                                 className={`mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${validationErrors.projectTitle ? 'border-red-500' : ''}`}
//                                 placeholder="e.g., Design a logo for my startup"
//                                 value={projectTitle}
//                                 onChange={(e) => setProjectTitle(e.target.value)}
//                             />
//                             {validationErrors.projectTitle && <p className="mt-1 text-red-500 text-sm">{validationErrors.projectTitle}</p>}
//                         </div>
//                         <div>
//                             <label htmlFor="description" className="block text-sm font-medium text-gray-700">Describe</label>
//                             <textarea
//                                 id="description"
//                                 rows={4}
//                                 className={`mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${validationErrors.description ? 'border-red-500' : ''}`}
//                                 placeholder="Describe your project in detail..."
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                             ></textarea>
//                             {validationErrors.description && <p className="mt-1 text-red-500 text-sm">{validationErrors.description}</p>}
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Photos</label>
//                             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                                 <div className="space-y-1 text-center">
//                                     <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
//                                         <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4V12a4 4 0 014-4h16m-16 0l20 20m-10-10l10 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                                     </svg>
//                                     <div className="flex text-sm text-gray-600">
//                                         <label htmlFor="photo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500">
//                                             <span>Upload photos from here</span>
//                                             <input id="photo-upload" type="file" className="sr-only" multiple onChange={handlePhotoChange} />
//                                         </label>
//                                         <p className="pl-1">or drag and drop</p>
//                                     </div>
//                                     <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//                                 </div>
//                             </div>
//                             {/* Image Previews */}
//                             <div className="mt-4 grid grid-cols-3 gap-4">
//                                 {imagePreviews.map((preview, index) => (
//                                     <div key={index} className="relative">
//                                         <img src={preview} alt={`Preview ${index}`} className="w-full h-auto rounded-md" />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         <div>
//                             <label htmlFor="requiredSkills" className="block text-sm font-medium text-gray-700">Required skills</label>
//                             <select
//                                 id="requiredSkills"
//                                 className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${validationErrors.requiredSkills ? 'border-red-500' : ''}`}
//                                 value={requiredSkills}
//                                 onChange={(e) => setRequiredSkills(e.target.value)}
//                             >
//                                 <option value="">Select skills</option>
//                                 {skillsOptions.map(skill => (
//                                     <option key={skill} value={skill}>{skill}</option>
//                                 ))}
//                             </select>
//                             {validationErrors.requiredSkills && <p className="mt-1 text-red-500 text-sm">{validationErrors.requiredSkills}</p>}
//                         </div>

//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label htmlFor="section" className="block text-sm font-medium text-gray-700">Section</label>
//                                 <select
//                                     id="section"
//                                     className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${validationErrors.section ? 'border-red-500' : ''}`}
//                                     value={section}
//                                     onChange={(e) => setSection(e.target.value)}
//                                 >
//                                     <option value="">Select section</option>
//                                     {sectionOptions.map(sec => (
//                                         <option key={sec} value={sec}>{sec}</option>
//                                     ))}
//                                 </select>
//                                 {validationErrors.section && <p className="mt-1 text-red-500 text-sm">{validationErrors.section}</p>}
//                             </div>
//                             <div>
//                                 <label htmlFor="subsection" className="block text-sm font-medium text-gray-700">Subsection</label>
//                                 <select
//                                     id="subsection"
//                                     className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${validationErrors.subsection ? 'border-red-500' : ''}`}
//                                     value={subsection}
//                                     onChange={(e) => setSubsection(e.target.value)}
//                                 >
//                                     <option value="">Select subsection</option>
//                                     {subsectionOptions.map(sub => (
//                                         <option key={sub} value={sub}>{sub}</option>
//                                     ))}
//                                 </select>
//                                 {validationErrors.subsection && <p className="mt-1 text-red-500 text-sm">{validationErrors.subsection}</p>}
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label htmlFor="expectedBudget" className="block text-sm font-medium text-gray-700">Expected budget</label>
//                                 <select
//                                     id="expectedBudget"
//                                     className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${validationErrors.expectedBudget ? 'border-red-500' : ''}`}
//                                     value={expectedBudget}
//                                     onChange={(e) => setExpectedBudget(e.target.value)}
//                                 >
//                                     <option value="">Select budget</option>
//                                     {budgetOptions.map(budget => (
//                                         <option key={budget} value={budget}>{budget}</option>
//                                     ))}
//                                 </select>
//                                 {validationErrors.expectedBudget && <p className="mt-1 text-red-500 text-sm">{validationErrors.expectedBudget}</p>}
//                             </div>
//                             <div>
//                                 <label htmlFor="expectedDuration" className="block text-sm font-medium text-gray-700">Expected duration of delivery</label>
//                                 <select
//                                     id="expectedDuration"
//                                     className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${validationErrors.expectedDuration ? 'border-red-500' : ''}`}
//                                     value={expectedDuration}
//                                     onChange={(e) => setExpectedDuration(e.target.value)}
//                                 >
//                                     <option value="">Select duration</option>
//                                     {durationOptions.map(duration => (
//                                         <option key={duration} value={duration}>{duration}</option>
//                                     ))}
//                                 </select>
//                                 {validationErrors.expectedDuration && <p className="mt-1 text-red-500 text-sm">{validationErrors.expectedDuration}</p>}
//                             </div>
//                         </div>

//                         <div>
//                             <div className="flex justify-between items-center cursor-pointer" >
//                                 <label className="block text-sm font-medium text-gray-700">Advanced setting</label>
//                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
//                                     <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
//                                 </svg>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-4">
//                     <button
//                         type="button"
//                         className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
//                         onClick={handleCancel}
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         type="button"
//                         className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
//                         onClick={handlePublish}
//                         disabled={isSubmitting} // Only disable based on isSubmitting
//                     >
//                         {isSubmitting ? 'Publishing...' : 'Publish'}
//                     </button>
//                 </div>
//             </div>
//             <ToastContainer /> {/* Add toast container here */}
//         </div>
//     );
// };

// export default ContactMePage;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import freelancerAvatarUrl from '../assets/Rectangle 4.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Interfaces and SkeletonComponent (no changes needed here, they are type definitions and UI)

const translations = {
    en: {
        "Contact Freelancer": "Contact Freelancer",
        "Freelancer ID is missing.": "Freelancer ID is missing.",
        "Failed to load freelancer.": "Failed to load freelancer.",
        "Send private message": "Send private message",
        "Write your message here...": "Write your message here...",
        "Project Title": "Project Title",
        "e.g., Design a logo for my startup": "e.g., Design a logo for my startup",
        "Describe": "Describe",
        "Describe your project in detail...": "Describe your project in detail...",
        "Photos": "Photos",
        "Upload photos from here": "Upload photos from here",
        "or drag and drop": "or drag and drop",
        "PNG, JPG, GIF up to 10MB": "PNG, JPG, GIF up to 10MB",
        "Required skills": "Required skills",
        "Select skills": "Select skills",
        "Section": "Section",
        "Select section": "Select section",
        "Subsection": "Subsection",
        "Select subsection": "Select subsection",
        "Expected budget": "Expected budget",
        "Select budget": "Select budget",
        "Expected duration of delivery": "Expected duration of delivery",
        "Select duration": "Select duration",
        "Advanced setting": "Advanced setting",
        "Cancel": "Cancel",
        "Publishing...": "Publishing...",
        "Publish": "Publish",
        "Project title is required": "Project title is required",
        "Description is required": "Description is required",
        "Skills are required": "Skills are required",
        "Section is required": "Section is required",
        "Subsection is required": "Subsection is required",
        "Budget is required": "Budget is required",
        "Duration is required": "Duration is required",
        "Message sent successfully!": "Message sent successfully!",
        "Contact form cancelled": "Contact form cancelled",
        "Error sending message:": "Error sending message:",
        "No Rating": "No Rating",
    },
    ar: {
        "Contact Freelancer": "تواصل مع مستقل",
        "Freelancer ID is missing.": "معرف المستقل مفقود.",
        "Failed to load freelancer.": "فشل تحميل بيانات المستقل.",
        "Send private message": "إرسال رسالة خاصة",
        "Write your message here...": "اكتب رسالتك هنا...",
        "Project Title": "عنوان المشروع",
        "e.g., Design a logo for my startup": "مثال: تصميم شعار لشركتي الناشئة",
        "Describe": "وصف",
        "Describe your project in detail...": "صف مشروعك بالتفصيل...",
        "Photos": "صور",
        "Upload photos from here": "تحميل صور من هنا",
        "or drag and drop": "أو السحب والإفلات",
        "PNG, JPG, GIF up to 10MB": "PNG ، JPG ، GIF حتى 10MB",
        "Required skills": "المهارات المطلوبة",
        "Select skills": "اختر مهارات",
        "Section": "القسم",
        "Select section": "اختر قسم",
        "Subsection": "القسم الفرعي",
        "Select subsection": "اختر قسم فرعي",
        "Expected budget": "الميزانية المتوقعة",
        "Select budget": "اختر ميزانية",
        "Expected duration of delivery": "المدة المتوقعة للتسليم",
        "Select duration": "اختر مدة",
        "Advanced setting": "إعدادات متقدمة",
        "Cancel": "إلغاء",
        "Publishing...": "جاري النشر...",
        "Publish": "نشر",
        "Project title is required": "عنوان المشروع مطلوب",
        "Description is required": "الوصف مطلوب",
        "Skills are required": "المهارات مطلوبة",
        "Section is required": "القسم مطلوب",
        "Subsection is required": "القسم الفرعي مطلوب",
        "Budget is required": "الميزانية مطلوبة",
        "Duration is required": "المدة مطلوبة",
        "Message sent successfully!": "تم إرسال الرسالة بنجاح!",
        "Contact form cancelled": "تم إلغاء نموذج الاتصال",
        "Error sending message:": "خطأ في إرسال الرسالة:",
        "No Rating": "بدون تقييم",
    },
};




interface ContactMePageProps {
    clientName?: string;
    clientEmail?: string;
}

interface UserData {
    id: number;
    userId: number;
    specialist: string | null;
    jobTitle: string | null;
    description: string | null;
    skillsOfWork: string | null;
    created_at: string;
    updated_at: string;
}

interface Freelancer {
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
    rate: number | null;
    user_data: UserData | null;
}

interface UserResponse {
    message: string;
    user: Freelancer;
}
const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};



// --- Skeleton Component for Freelancer Info ---
const FreelancerInfoSkeleton: React.FC = () => (
    <div className="bg-gray-50 p-4 rounded-md mb-6 animate-pulse">
        <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div>
                <div className="h-4 bg-gray-300 rounded w-48 mb-1"></div>
                <div className="h-3 bg-gray-300 rounded w-32"></div>
            </div>
        </div>
        <div className="mt-3">
            <div className="h-3 bg-gray-300 rounded w-full"></div>
            <div className="h-3 bg-gray-300 rounded w-5/6 mt-1"></div>
        </div>
    </div>
);

const ContactMePage: React.FC<ContactMePageProps> = ({
    clientName = 'Client Name',
    clientEmail = 'client@example.com'
}) => {
    const navigate = useNavigate();
    const { freelancerId } = useParams<{ freelancerId: string }>();
    const [freelancer, setFreelancer] = useState<Freelancer | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
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


    const [privateMessage, setPrivateMessage] = useState('');
    const [projectTitle, setProjectTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState<File[]>([]);
    const [requiredSkills, setRequiredSkills] = useState('');
    const [section, setSection] = useState('');
    const [subsection, setSubsection] = useState('');
    const [expectedBudget, setExpectedBudget] = useState('');
    const [expectedDuration, setExpectedDuration] = useState('');

    const [validationErrors, setValidationErrors] = useState<{
        projectTitle?: string;
        description?: string;
        requiredSkills?: string;
        section?: string;
        subsection?: string;
        expectedBudget?: string;
        expectedDuration?: string;
    }>({});

    const skillsOptions = ["", "JavaScript", "React", "Laravel", "Node.js", "Python", "Design", "Marketing", "Writing"];
    const sectionOptions = ["", "Web Development", "Mobile App Development", "Design", "Marketing", "Writing", "Other"];
    const subsectionOptions = ["", "Frontend", "Backend", "Full Stack", "UI/UX Design", "Graphic Design", "Content Writing", "SEO", "Social Media"];
    const budgetOptions = ["", "Less than $500", "$500 - $1000", "$1000 - $2000", "$2000+"];
    const durationOptions = ["", "Less than 1 week", "1-2 weeks", "2 weeks - 1 month", "1-3 months", "More than 3 months"];

    const renderStars = (rate: number | null) => { // No translation needed for star rendering logic
        const stars = [];
        const filledStars = Math.floor(rate || 0);

        for (let i = 0; i < 5; i++) {
            const isFilled = i < filledStars;
            stars.push(
                <svg
                    key={i}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 ${isFilled ? 'fill-yellow-400 stroke-yellow-400' : 'fill-gray-300 stroke-gray-300'}`}
                >
                    <path
                        d="M12.4864 5.30575L13.9346 10.074V10.5098H14.4346H18.8846C19.3656 10.5098 19.5711 11.1253 19.1728 11.4137C19.1726 11.4139 19.1723 11.4141 19.172 11.4143L15.534 14.0129L15.24 14.2229L15.347 14.5679L16.777 19.1779L16.7773 19.1786C16.9214 19.6409 16.3831 20.0074 15.9987 19.7229L15.9975 19.722L12.3075 16.912L12.0051 16.6817L11.7024 16.9115L8.01235 19.7115L8.01049 19.7129C7.62608 20.0074 7.08777 19.6309 7.23193 19.1686L7.23215 19.1679L8.66215 14.5579L8.76918 14.2129L8.47522 14.0029L4.83522 11.4029L4.83375 11.4019C4.44423 11.1257 4.63839 10.4998 5.1246 10.4998H9.5746H9.94456L10.0527 10.146L11.5327 5.30598L11.5328 5.30598L11.5342 5.30112C11.6708 4.83765 12.3379 4.81944 12.4864 5.30575Z"
                        fill={isFilled ? '#EEE626' : '#D1D5DB'}
                        stroke={isFilled ? '#EEE626' : '#D1D5DB'}
                    />
                </svg>
            );
        }
        return stars;
    };

    useEffect(() => { // Fetch freelancer data - translations are applied to error messages and display names
        const fetchFreelancer = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get<UserResponse>(`${process.env.REACT_APP_BACK_URL}/GetUser`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setFreelancer(response.data.user);
            } catch (e: any) {
                setError(translate('Failed to load freelancer.', language));
                if (axios.isAxiosError(e)) {
                    console.error('Axios error fetching freelancer:', e.message);
                } else {
                    console.error('Unexpected error fetching freelancer:', e);
                }
            } finally {
                setLoading(false);
            }
        };

        if (freelancerId) {
            fetchFreelancer();
        } else {
            setError(translate("Freelancer ID is missing.", language));
            setLoading(false);
        }
    }, [freelancerId]);

    const validateForm = () => { // Form validation - error messages will be translated
        let errors: any = {};
        let isValid = true;

        if (!projectTitle) {
            errors.projectTitle = translate('Project title is required', language);
            isValid = false;
        }
        if (!description) {
            errors.description = translate('Description is required', language);
            isValid = false;
        }
        if (!requiredSkills) {
            errors.requiredSkills = translate('Skills are required', language);
            isValid = false;
        }
        if (!section) {
            errors.section = translate('Section is required', language);
            isValid = false;
        }
        if (!subsection) {
            errors.subsection = translate('Subsection is required', language);
            isValid = false;
        }
        if (!expectedBudget) {
            errors.expectedBudget = translate('Budget is required', language);
            isValid = false;
        }
        if (!expectedDuration) {
            errors.expectedDuration = translate('Duration is required', language);
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    const handlePublish = async () => { // Form submission - success and error toasts are translated
        if (!validateForm()) {
            return;
        }

        if (!freelancerId) {
            toast.error(translate('Freelancer ID is missing.', language));
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('freelancer_id', freelancerId);
        formData.append('client_name', clientName);
        formData.append('client_email', clientEmail);
        formData.append('freelancer_name', freelancer?.firstName + ' ' + freelancer?.lastName || '');
        formData.append('private_message', privateMessage);
        formData.append('project_title', projectTitle);
        formData.append('description', description);
        for (let i = 0; i < photos.length; i++) {
            formData.append('photos[]', photos[i]);
        }
        formData.append('required_skills', requiredSkills);
        formData.append('section', section);
        formData.append('subsection', subsection);
        formData.append('expected_budget', expectedBudget);
        formData.append('expected_duration', expectedDuration);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/contact-freelancer`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log(response);

            toast.success(translate('Message sent successfully!', language), {
                position: "top-right",
            });
            navigate('/react/FreelancerList');

        } catch (error: any) {
            console.error('Error submitting contact form:', error.response?.data || error.message);
            toast.error(translate('Error sending message:', language) + (error.response?.data.message || error.message), {
                position: "top-right",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => { // Cancel action - toast is translated
        toast.warn(translate('Contact form cancelled', language), {
            position: "top-right",
        });
        navigate('/react/FreelancerList');
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => { // No translation needed for photo handling logic
        const files = Array.from(e.target.files || []);
        setPhotos(files);

        const previews: string[] = [];
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                previews.push(reader.result as string);
                if (previews.length === files.length) {
                    setImagePreviews(previews);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    if (loading) { // Loading state - skeleton component, no text to translate directly here
        return (
            <div className="py-32 bg-gray-100 min-h-screen flex justify-center px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-3xl w-full">
                    <div className="px-6 py-4">
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">{translate("Contact Freelancer", language)}</h2>
                        <FreelancerInfoSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    if (error) { // Error state - error message translated
        return <div className="text-red-500 text-center">Error: {translate(error, language)}</div>;
    }

    const freelancerFullName = freelancer ? `${freelancer.firstName} ${freelancer.lastName}` : translate('Loading Name...', language); // Translate "Loading Name..." if needed
    const freelancerAvatar = freelancer?.profilePhoto || freelancerAvatarUrl;
    const freelancerRate = freelancer?.rate || null;
    const freelancerSpecialization = freelancer?.user_data?.specialist || translate('No Specialization', language); // Translate "No Specialization"

    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="py-16 md:py-32 bg-gray-100 min-h-screen flex justify-center px-4 sm:px-6 lg:px-8"> {/* Responsive padding */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg overflow-hidden max-w-xl md:max-w-3xl w-full"> {/* Responsive padding and max-width */}
                <div className="px-0 md:px-6 py-0 md:py-4"> {/* Responsive padding */}
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">{translate("Contact Freelancer", language)} {freelancerFullName}</h2> {/* Translated heading */}

                    {/* Freelancer Info Section */}
                    <div className="bg-gray-50 p-4 rounded-md mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                <img src={`http://127.0.0.1:8000/storage/${freelancerAvatar}`} alt="Freelancer Avatar" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">{freelancerFullName}</h3>
                                <div className="flex items-center space-x-1 text-sm text-yellow-400">
                                    {renderStars(freelancerRate)}
                                    <span>({freelancerRate !== null ? freelancerRate?.toFixed(1) : translate('No Rating', language)})</span> {/* Translated "No Rating" */}
                                </div>
                                <p className="text-gray-600 text-sm">{freelancerSpecialization}</p>
                            </div>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="privateMessage" className="block text-sm font-medium text-gray-700">{translate("Send private message", language)}</label>
                            <textarea
                                id="privateMessage"
                                rows={3}
                                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                placeholder={translate("Write your message here...", language)}
                                value={privateMessage}
                                onChange={(e) => setPrivateMessage(e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    {/* Form Fields - Labels and Placeholders are translated */}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700">{translate("Project Title", language)}</label>
                            <input
                                type="text"
                                id="projectTitle"
                                className={`mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${validationErrors.projectTitle ? 'border-red-500' : ''}`}
                                placeholder={translate("e.g., Design a logo for my startup", language)}
                                value={projectTitle}
                                onChange={(e) => setProjectTitle(e.target.value)}
                            />
                            {validationErrors.projectTitle && <p className="mt-1 text-red-500 text-sm">{validationErrors.projectTitle}</p>}
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">{translate("Describe", language)}</label>
                            <textarea
                                id="description"
                                rows={4}
                                className={`mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${validationErrors.description ? 'border-red-500' : ''}`}
                                placeholder={translate("Describe your project in detail...", language)}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                            {validationErrors.description && <p className="mt-1 text-red-500 text-sm">{validationErrors.description}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{translate("Photos", language)}</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4V12a4 4 0 014-4h16m-16 0l20 20m-10-10l10 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label htmlFor="photo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500">
                                            <span>{translate("Upload photos from here", language)}</span>
                                            <input id="photo-upload" type="file" className="sr-only" multiple onChange={handlePhotoChange} />
                                        </label>
                                        <p className="pl-1">{translate("or drag and drop", language)}</p>
                                    </div>
                                    <p className="text-xs text-gray-500">{translate("PNG, JPG, GIF up to 10MB", language)}</p>
                                </div>
                            </div>
                            {/* Image Previews - No text to translate here */}
                            <div className="mt-4 grid grid-cols-3 gap-4">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="relative">
                                        <img src={preview} alt={`Preview ${index}`} className="w-full h-auto rounded-md" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="requiredSkills" className="block text-sm font-medium text-gray-700">{translate("Required skills", language)}</label>
                            <select
                                id="requiredSkills"
                                className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${validationErrors.requiredSkills ? 'border-red-500' : ''}`}
                                value={requiredSkills}
                                onChange={(e) => setRequiredSkills(e.target.value)}
                            >
                                <option value="">{translate("Select skills", language)}</option>
                                {skillsOptions.map(skill => (
                                    <option key={skill} value={skill}>{skill}</option>
                                ))}
                            </select>
                            {validationErrors.requiredSkills && <p className="mt-1 text-red-500 text-sm">{validationErrors.requiredSkills}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="section" className="block text-sm font-medium text-gray-700">{translate("Section", language)}</label>
                                <select
                                    id="section"
                                    className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${validationErrors.section ? 'border-red-500' : ''}`}
                                    value={section}
                                    onChange={(e) => setSection(e.target.value)}
                                >
                                    <option value="">{translate("Select section", language)}</option>
                                    {sectionOptions.map(sec => (
                                        <option key={sec} value={sec}>{sec}</option>
                                    ))}
                                </select>
                                {validationErrors.section && <p className="mt-1 text-red-500 text-sm">{validationErrors.section}</p>}
                            </div>
                            <div>
                                <label htmlFor="subsection" className="block text-sm font-medium text-gray-700">{translate("Subsection", language)}</label>
                                <select
                                    id="subsection"
                                    className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${validationErrors.subsection ? 'border-red-500' : ''}`}
                                    value={subsection}
                                    onChange={(e) => setSubsection(e.target.value)}
                                >
                                    <option value="">{translate("Select subsection", language)}</option>
                                    {subsectionOptions.map(sub => (
                                        <option key={sub} value={sub}>{sub}</option>
                                    ))}
                                </select>
                                {validationErrors.subsection && <p className="mt-1 text-red-500 text-sm">{validationErrors.subsection}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="expectedBudget" className="block text-sm font-medium text-gray-700">{translate("Expected budget", language)}</label>
                                <select
                                    id="expectedBudget"
                                    className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${validationErrors.expectedBudget ? 'border-red-500' : ''}`}
                                    value={expectedBudget}
                                    onChange={(e) => setExpectedBudget(e.target.value)}
                                >
                                    <option value="">{translate("Select budget", language)}</option>
                                    {budgetOptions.map(budget => (
                                        <option key={budget} value={budget}>{budget}</option>
                                    ))}
                                </select>
                                {validationErrors.expectedBudget && <p className="mt-1 text-red-500 text-sm">{validationErrors.expectedBudget}</p>}
                            </div>
                            <div>
                                <label htmlFor="expectedDuration" className="block text-sm font-medium text-gray-700">{translate("Expected duration of delivery", language)}</label>
                                <select
                                    id="expectedDuration"
                                    className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${validationErrors.expectedDuration ? 'border-red-500' : ''}`}
                                    value={expectedDuration}
                                    onChange={(e) => setExpectedDuration(e.target.value)}
                                >
                                    <option value="">{translate("Select duration", language)}</option>
                                    {durationOptions.map(duration => (
                                        <option key={duration} value={duration}>{duration}</option>
                                    ))}
                                </select>
                                {validationErrors.expectedDuration && <p className="mt-1 text-red-500 text-sm">{validationErrors.expectedDuration}</p>}
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center cursor-pointer" >
                                <label className="block text-sm font-medium text-gray-700">{translate("Advanced setting", language)}</label>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4 md:px-6 py-4 bg-gray-50 flex justify-end space-x-4"> {/* Responsive padding */}
                    <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        onClick={handleCancel}
                    >
                        {translate("Cancel", language)}
                    </button>
                    <button
                        type="button"
                        className="inline-flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500" // Increased vertical padding
                        onClick={handlePublish}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? translate("Publishing...", language) : translate("Publish", language)}
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ContactMePage;