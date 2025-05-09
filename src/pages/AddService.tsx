// import React, { useState, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// interface AddServiceFormProps {
//   // You can define props here if needed
// }

// interface AdditionalService {
//   service_name: string;
//   price: string;
//   delivery_duration: string;
// }

// const AddServiceForm: React.FC<AddServiceFormProps> = () => {
//   // Main Service Form State
//   const [title, setTitle] = useState<string>("");
//   const [section, setSection] = useState<string>("");
//   const [subsection, setSubsection] = useState<string>("");
//   const [description, setDescription] = useState<string>("");
//   const [requiredSkills, setRequiredSkills] = useState<string>("");
//   const [priceAmount, setPriceAmount] = useState<string>("");
//   const [deliveryDuration, setDeliveryDuration] = useState<string>("");
//   const [fromDate, setFromDate] = useState<string>("");
//   const [toDate, setToDate] = useState<string>("");
//   const [link, setLink] = useState<string>("");
//   const [thumbnailPhoto, setThumbnailPhoto] = useState<File | null>(null);
//   const [mainPhoto, setMainPhoto] = useState<File | null>(null);
//   const [thumbnailPhotoPreview, setThumbnailPhotoPreview] = useState<string | null>(null);
//   const [mainPhotoPreview, setMainPhotoPreview] = useState<string | null>(null);
//   const [errors, setErrors] = useState<any>({});
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const navigate = useNavigate();
//   const thumbnailInputRef = useRef<HTMLInputElement>(null);
//   const mainInputRef = useRef<HTMLInputElement>(null);
//   const [mainServiceId, setMainServiceId] = useState<number | null>(null); // To store main service ID after successful creation

//   // Sub-service Form State - Renamed to Additional Service and made it array to handle multiple services
//   const [additionalServices, setAdditionalServices] = useState<AdditionalService[]>([
//     { service_name: "", price: "", delivery_duration: "" }, // Initialize with one empty service
//   ]);
//   const [additionalServicesErrors, setAdditionalServicesErrors] = useState<any[]>([]); // Array to hold errors for each additional service

//   const handleThumbnailPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       if (file.size > 2048000) {
//         setErrors((prevErrors: any) => ({ ...prevErrors, thumbnailPhoto: 'Thumbnail photo size should not exceed 2MB' }));
//         setThumbnailPhoto(null);
//         setThumbnailPhotoPreview(null);
//         return;
//       }
//       if (!['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(file.type)) {
//         setErrors((prevErrors: any) => ({ ...prevErrors, thumbnailPhoto: 'Thumbnail photo must be in jpeg, png, jpg, or gif format' }));
//         setThumbnailPhoto(null);
//         setThumbnailPhotoPreview(null);
//         return;
//       }
//       setErrors((prevErrors: any) => ({ ...prevErrors, thumbnailPhoto: null }));
//       setThumbnailPhoto(file);
//       setThumbnailPhotoPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleMainPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       if (file.size > 2048000) {
//         setErrors((prevErrors: any) => ({ ...prevErrors, mainPhoto: 'Main photo size should not exceed 2MB' }));
//         setMainPhoto(null);
//         setMainPhotoPreview(null);
//         return;
//       }
//       if (!['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(file.type)) {
//         setErrors((prevErrors: any) => ({ ...prevErrors, mainPhoto: 'Main photo must be in jpeg, png, jpg, or gif format' }));
//         setMainPhoto(null);
//         setMainPhotoPreview(null);
//         return;
//       }
//       setErrors((prevErrors: any) => ({ ...prevErrors, mainPhoto: null }));
//       setMainPhoto(file);
//       setMainPhotoPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleThumbnailBrowseClick = () => {
//     thumbnailInputRef.current?.click();
//   };

//   const handleMainBrowseClick = () => {
//     mainInputRef.current?.click();
//   };

//   const onDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
//     event.preventDefault();
//   };

//   const onThumbnailDrop = (event: React.DragEvent<HTMLLabelElement>) => {
//     event.preventDefault();
//     const file = event.dataTransfer.files?.[0];
//     if (file) {
//       if (['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(file.type)) {
//         setThumbnailPhoto(file);
//         setThumbnailPhotoPreview(URL.createObjectURL(file));
//         setErrors((prevErrors: any) => ({ ...prevErrors, thumbnailPhoto: null }));
//         if (thumbnailInputRef.current) {
//           thumbnailInputRef.current.files = event.dataTransfer.files;
//         }
//       } else {
//         setErrors((prevErrors: any) => ({ ...prevErrors, thumbnailPhoto: 'Invalid file type. Please use jpeg, png, jpg, or gif.' }));
//       }
//     }
//   };

//   const onMainPhotoDrop = (event: React.DragEvent<HTMLLabelElement>) => {
//     event.preventDefault();
//     const file = event.dataTransfer.files?.[0];
//     if (file) {
//       if (['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(file.type)) {
//         setMainPhoto(file);
//         setMainPhotoPreview(URL.createObjectURL(file));
//         setErrors((prevErrors: any) => ({ ...prevErrors, mainPhoto: null }));
//         if (mainInputRef.current) {
//           mainInputRef.current.files = event.dataTransfer.files;
//         }
//       } else {
//         setErrors((prevErrors: any) => ({ ...prevErrors, mainPhoto: 'Invalid file type. Please use jpeg, png, jpg, or gif.' }));
//       }
//     }
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setIsSubmitting(true);
//     setErrors({});
//     setAdditionalServicesErrors(additionalServices.map(() => ({}))); // Clear all additional service errors

//     let validationErrors: any = {};
//     if (!title) validationErrors.title = 'Service Title is required';
//     if (!section) validationErrors.section = 'Section is required';
//     if (!subsection) validationErrors.subsection = 'Subsection is required';
//     if (!description) validationErrors.description = 'Description is required';
//     if (!priceAmount) validationErrors.priceAmount = 'Price is required';
//     if (isNaN(Number(priceAmount))) validationErrors.priceAmount = 'Price must be a number';
//     if (!deliveryDuration) validationErrors.deliveryDuration = 'Delivery Duration is required';
//     if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) validationErrors.toDate = 'To Date must be after From Date';
//     if (!thumbnailPhoto) validationErrors.thumbnailPhoto = 'Thumbnail Photo is required';
//     if (!mainPhoto) validationErrors.mainPhoto = 'Main Photo is required';

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       setIsSubmitting(false);
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('section', section);
//     formData.append('subsection', subsection);
//     formData.append('description', description);
//     formData.append('required_skills', requiredSkills);
//     formData.append('price', priceAmount);
//     formData.append('delivery_duration', deliveryDuration);
//     formData.append('from_date', fromDate || '');
//     formData.append('to_date', toDate || '');
//     formData.append('link', link || '');
//     if (mainPhoto) formData.append('main_photo', mainPhoto);
//     if (thumbnailPhoto) formData.append('thumbnail_photo', thumbnailPhoto);
//     formData.append('user_id', '1');
//     formData.append('status', 'sent');

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/addService`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//       });
//       console.log('Service added successfully', response.data);
//       setMainServiceId(response.data.service.id); // Store the main service ID

//       // Add Additional Services
//       let hasAdditionalServiceErrors = false;
//       const currentAdditionalServicesErrors = additionalServices.map(() => ({})); // Initialize error array

//       for (let i = 0; i < additionalServices.length; i++) {
//         const additionalService = additionalServices[i];
//         let additionalServiceValidationErrors: any = {};
//         if (!additionalService.service_name) additionalServiceValidationErrors.service_name = 'Service Name is required';
//         if (!additionalService.price) additionalServiceValidationErrors.price = 'Price is required';
//         if (isNaN(Number(additionalService.price))) additionalServiceValidationErrors.price = 'Price must be a number';
//         if (!additionalService.delivery_duration) additionalServiceValidationErrors.delivery_duration = 'Delivery Duration is required';

//         if (Object.keys(additionalServiceValidationErrors).length > 0) {
//           currentAdditionalServicesErrors[i] = additionalServiceValidationErrors;
//           hasAdditionalServiceErrors = true;
//         } else if (mainServiceId !== null && (additionalService.service_name || additionalService.price || additionalService.delivery_duration)) {
//           const additionalServiceData = {
//             service_name: additionalService.service_name,
//             price: additionalService.price,
//             delivery_duration: additionalService.delivery_duration,
//             service_id: mainServiceId.toString(), // Use the ID from the main service response
//           };

//           try {
//             const additionalServiceResponse = await axios.post(`${process.env.REACT_APP_BACK_URL}/sub_service`, additionalServiceData, {
//               headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//               },
//             });
//             console.log(`Additional service ${i+1} added successfully`, additionalServiceResponse.data);
//           } catch (additionalServiceError: any) {
//             console.error(`Additional service ${i+1} API Error:`, additionalServiceError.response ? additionalServiceError.response.data : additionalServiceError);
//             if (additionalServiceError.response && additionalServiceError.response.data && additionalServiceError.response.data.errors) {
//               currentAdditionalServicesErrors[i] = additionalServiceError.response.data.errors;
//             } else {
//               currentAdditionalServicesErrors[i] = { submission: additionalServiceError.response?.data?.message || 'Failed to add additional service.' };
//             }
//             hasAdditionalServiceErrors = true;
//           }
//         }
//       }

//       if (hasAdditionalServiceErrors) {
//         setAdditionalServicesErrors(currentAdditionalServicesErrors);
//         setIsSubmitting(false);
//         return; // Stop further processing and show additional service errors
//       }

//       setIsSubmitting(false);
//       navigate('/react/ControlPanel');
//       console.log("dasd");
      

//     } catch (error: any) {
//       setIsSubmitting(false);
//       if (error.response) {
//         console.error('API Error:', error.response.data);
//         if (error.response.data && error.response.data.errors) {
//           setErrors(error.response.data.errors);
//         } else {
//           setErrors({ submission: error.response.data.message || 'Failed to add service. Please check the form and try again.' });
//         }
//       } else if (error.request) {
//         console.error('Network Error:', error.request);
//         setErrors({ submission: 'Network error occurred. Please try again later.' });
//       } else {
//         console.error('Error:', error.message);
//         setErrors({ submission: 'An unexpected error occurred.' });
//       }
//     }
//   };

//   const isSubmitDisabled = () => {
//     return !title || !section || !subsection || !description || !priceAmount || !deliveryDuration || !thumbnailPhoto || !mainPhoto;
//   };

//   const handleAdditionalServiceChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     const updatedAdditionalServices = [...additionalServices];
//     updatedAdditionalServices[index] = { ...updatedAdditionalServices[index], [name]: value };
//     setAdditionalServices(updatedAdditionalServices);
//   };

//   const handleAddAdditionalService = () => {
//     setAdditionalServices([...additionalServices, { service_name: "", price: "", delivery_duration: "" }]);
//     setAdditionalServicesErrors([...additionalServicesErrors, {}]); // Add empty error object for new service
//   };

//   const handleRemoveAdditionalService = (index: number) => {
//     if (additionalServices.length > 1) { // Ensure at least one additional service remains
//       const updatedAdditionalServices = additionalServices.filter((_, i) => i !== index);
//       const updatedErrors = additionalServicesErrors.filter((_, i) => i !== index);
//       setAdditionalServices(updatedAdditionalServices);
//       setAdditionalServicesErrors(updatedErrors);
//     } else {
//       // Optionally handle case when only one additional service is left and remove is clicked (e.g., clear fields)
//       const clearedAdditionalServices = [{ service_name: "", price: "", delivery_duration: "" }];
//       const clearedErrors = [{}];
//       setAdditionalServices(clearedAdditionalServices);
//       setAdditionalServicesErrors(clearedErrors);
//     }
//   };

//   return (
//     <>
//       <div className="py-32 flex justify-center items-center min-h-screen bg-gray-50">
//         <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl w-full mx-4 md:mx-0">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Add a New Service</h2>
//           <form onSubmit={handleSubmit}>
//             {/* Section 1: Main Service Details */}
//             <section>
//               <div className="mb-6">
//                 <label htmlFor="serviceTitle" className="block text-gray-700 text-sm font-bold mb-2">
//                   Service Title
//                 </label>
//                 <input
//                   type="text"
//                   id="serviceTitle"
//                   className={`shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`}
//                   placeholder="Enter a concise and descriptive title for your service"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                 />
//                 {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
//               </div>

//               <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="section" className="block text-gray-700 text-sm font-bold mb-2">
//                     Section
//                   </label>
//                   <div className="relative">
//                     <select
//                       id="section"
//                       className={`block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow-sm leading-tight focus:outline-none focus:shadow-outline ${errors.section ? 'border-red-500' : ''}`}
//                       value={section}
//                       onChange={(e) => setSection(e.target.value)}
//                     >
//                       <option value="">Choose a section</option>
//                       <option>Digital Marketing & Sales</option>
//                       <option>Consulting</option>
//                       <option>Programming</option>
//                       <option>Design, Video & Audio</option>
//                       <option>Writing & Translation</option>
//                       <option>Data Entry</option>
//                       <option>Training & Education</option>
//                     </select>
//                     {errors.section && <p className="text-red-500 text-xs italic">{errors.section}</p>}
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                       <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <label htmlFor="subsection" className="block text-gray-700 text-sm font-bold mb-2">
//                     Subsection
//                   </label>
//                   <div className="relative">
//                     <select
//                       id="subsection"
//                       className={`block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow-sm leading-tight focus:outline-none focus:shadow-outline ${errors.subsection ? 'border-red-500' : ''}`}
//                       value={subsection}
//                       onChange={(e) => setSubsection(e.target.value)}
//                     >
//                       <option value="">Choose a subsection</option>
//                       <option>Frontend Development</option>
//                       <option>Backend Development</option>
//                       <option>Mobile App Development</option>
//                     </select>
//                     {errors.subsection && <p className="text-red-500 text-xs italic">{errors.subsection}</p>}
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                       <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
//                   Service Description
//                 </label>
//                 <textarea
//                   id="description"
//                   className={`shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-48 ${errors.description ? 'border-red-500' : ''}`}
//                   placeholder="Provide a detailed description of your service and what you offer..."
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//                 {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
//               </div>

//               <div className="mb-6">
//                 <label htmlFor="thumbnailPhoto" className="block text-gray-700 text-sm font-bold mb-2">
//                   Thumbnail Photo
//                 </label>
//                 <p className="text-orange-500 text-sm mb-3">Upload a visually appealing thumbnail for your service.</p>
//                 <label
//                   htmlFor="thumbnailPhotoInput"
//                   onDragOver={onDragOver}
//                   onDrop={onThumbnailDrop}
//                   className={`border-dashed border-2 border-gray-400 rounded-xl p-8 text-center cursor-pointer hover:border-orange-500 transition-colors duration-300 block ${errors.thumbnailPhoto ? 'border-red-500' : ''}`}
//                 >
//                   <input
//                     type="file"
//                     id="thumbnailPhotoInput"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleThumbnailPhotoChange}
//                     ref={thumbnailInputRef}
//                   />
//                   {thumbnailPhotoPreview ? (
//                     <img src={thumbnailPhotoPreview} alt="Thumbnail Preview" className="max-h-32 mx-auto rounded-xl" />
//                   ) : (
//                     <>
//                       <span className="text-gray-500">Drag & drop files here or</span>
//                       <button
//                         type="button"
//                         onClick={handleThumbnailBrowseClick}
//                         className="ml-2 text-orange-500 hover:text-orange-700 font-semibold focus:outline-none"
//                       >
//                         Browse files
//                       </button>
//                     </>
//                   )}
//                 </label>
//                 {errors.thumbnailPhoto && <p className="text-red-500 text-xs italic">{errors.thumbnailPhoto}</p>}
//               </div>

//               <div className="mb-6">
//                 <label htmlFor="mainPhoto" className="block text-gray-700 text-sm font-bold mb-2">
//                   Main Photo
//                 </label>
//                 <p className="text-orange-500 text-sm mb-3">Showcase your service with a compelling main image.</p>
//                 <label
//                   htmlFor="mainPhotoInput"
//                   onDragOver={onDragOver}
//                   onDrop={onMainPhotoDrop}
//                   className={`border-dashed border-2 border-gray-400 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors duration-300 block ${errors.mainPhoto ? 'border-red-500' : ''}`}
//                 >
//                   <input
//                     type="file"
//                     id="mainPhotoInput"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleMainPhotoChange}
//                     ref={mainInputRef}
//                   />
//                   {mainPhotoPreview ? (
//                     <img src={mainPhotoPreview} alt="Main Preview" className="max-h-64 mx-auto rounded-xl" />
//                   ) : (
//                     <>
//                       <span className="text-gray-500">Drag & drop files here or</span>
//                       <button
//                         type="button"
//                         onClick={handleMainBrowseClick}
//                         className="ml-2 text-orange-500 hover:text-orange-700 font-semibold focus:outline-none"
//                       >
//                         Browse files
//                       </button>
//                     </>
//                   )}
//                 </label>
//                 {errors.mainPhoto && <p className="text-red-500 text-xs italic">{errors.mainPhoto}</p>}
//               </div>

//               <div className="mb-6">
//                 <label htmlFor="requiredSkills" className="block text-gray-700 text-sm font-bold mb-2">
//                   Required Skills
//                 </label>
//                 <input
//                   type="text"
//                   id="requiredSkills"
//                   className={`shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.required_skills ? 'border-red-500' : ''}`}
//                   placeholder="List skills relevant to your service (e.g., SEO, Video Editing)"
//                   value={requiredSkills}
//                   onChange={(e) => setRequiredSkills(e.target.value)}
//                 />
//                 {errors.required_skills && <p className="text-red-500 text-xs italic">{errors.required_skills}</p>}
//               </div>

//               <div className="mb-6">
//                 <label htmlFor="priceAmount" className="block text-gray-700 text-sm font-bold mb-2">
//                   Price
//                 </label>
//                 <input
//                   type="number"
//                   id="priceAmount"
//                   className={`shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.priceAmount ? 'border-red-500' : ''}`}
//                   placeholder="Enter the price"
//                   value={priceAmount}
//                   onChange={(e) => setPriceAmount(e.target.value)}
//                 />
//                 {errors.priceAmount && <p className="text-red-500 text-xs italic">{errors.priceAmount}</p>}
//               </div>

//               <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="deliveryDuration" className="block text-gray-700 text-sm font-bold mb-2">
//                     Delivery Duration
//                   </label>
//                   <input
//                     type="text"
//                     id="deliveryDuration"
//                     className={`shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.deliveryDuration ? 'border-red-500' : ''}`}
//                     placeholder="Expected delivery time (e.g., 1 day, 3 days)"
//                     value={deliveryDuration}
//                     onChange={(e) => setDeliveryDuration(e.target.value)}
//                   />
//                   {errors.deliveryDuration && <p className="text-red-500 text-xs italic">{errors.deliveryDuration}</p>}
//                 </div>
//                 <div>
//                   <label htmlFor="toDate" className="block text-gray-700 text-sm font-bold mb-2">
//                     Availability To
//                   </label>
//                   <input
//                     type="date"
//                     id="toDate"
//                     className={`shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.toDate ? 'border-red-500' : ''}`}
//                     value={toDate}
//                     onChange={(e) => setToDate(e.target.value)}
//                   />
//                   {errors.toDate && <p className="text-red-500 text-xs italic">{errors.toDate}</p>}
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <label htmlFor="fromDate" className="block text-gray-700 text-sm font-bold mb-2">
//                   Availability From
//                 </label>
//                 <input
//                   type="date"
//                   id="fromDate"
//                   className={`shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.fromDate ? 'border-red-500' : ''}`}
//                   value={fromDate}
//                   onChange={(e) => setFromDate(e.target.value)}
//                 />
//                 {errors.fromDate && <p className="text-red-500 text-xs italic">{errors.fromDate}</p>}
//               </div>

//               <div className="mb-6">
//                 <label htmlFor="link" className="block text-gray-700 text-sm font-bold mb-2">
//                   External Link
//                 </label>
//                 <input
//                   type="text"
//                   id="link"
//                   className={`shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.link ? 'border-red-500' : ''}`}
//                   placeholder="Link to your portfolio or relevant website"
//                   value={link}
//                   onChange={(e) => setLink(e.target.value)}
//                 />
//                 {errors.link && <p className="text-red-500 text-xs italic">{errors.link}</p>}
//               </div>
//             </section>

//             {/* Section 2: Add Additional Service Fields - Now Multiple */}
//             <section className="mt-8">
//               <div className="font-sans">
//                 <div>
//                   <h3 className="text-lg font-bold mb-4">Additional Services</h3>
//                 </div>

//                 {additionalServices.map((additionalService, index) => (
//                   <div key={index} className="mb-6 p-4 border rounded">
//                     <h4 className="font-semibold mb-3">Additional Service {index + 1}</h4>
//                     <div className="mb-4">
//                       <label htmlFor={`additionalServiceName-${index}`} className="font-bold block mb-2 text-sm">
//                         Service Name
//                       </label>
//                       <input
//                         type="text"
//                         id={`additionalServiceName-${index}`}
//                         name="service_name"
//                         className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-300 ${additionalServicesErrors[index]?.service_name ? 'border-red-500' : ''}`}
//                         value={additionalService.service_name}
//                         onChange={(e) => handleAdditionalServiceChange(index, e)}
//                       />
//                       {additionalServicesErrors[index]?.service_name && <p className="text-red-500 text-xs italic">{additionalServicesErrors[index]?.service_name}</p>}
//                     </div>

//                     <div className="flex gap-5 mb-4">
//                       <div className="flex-1">
//                         <label htmlFor={`additionalServicePrice-${index}`} className="font-bold block mb-2 text-sm">
//                           Price
//                         </label>
//                         <input
//                           type="text"
//                           id={`additionalServicePrice-${index}`}
//                           name="price"
//                           className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-300 ${additionalServicesErrors[index]?.price ? 'border-red-500' : ''}`}
//                           value={additionalService.price}
//                           onChange={(e) => handleAdditionalServiceChange(index, e)}
//                         />
//                         {additionalServicesErrors[index]?.price && <p className="text-red-500 text-xs italic">{additionalServicesErrors[index]?.price}</p>}
//                       </div>
//                       <div className="flex-1">
//                         <label htmlFor={`additionalServiceDeliveryDuration-${index}`} className="font-bold block mb-2 text-sm">
//                           Delivery duration
//                         </label>
//                         <input
//                           type="text"
//                           id={`additionalServiceDeliveryDuration-${index}`}
//                           name="delivery_duration"
//                           className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-300 ${additionalServicesErrors[index]?.delivery_duration ? 'border-red-500' : ''}`}
//                           value={additionalService.delivery_duration}
//                           onChange={(e) => handleAdditionalServiceChange(index, e)}
//                         />
//                         {additionalServicesErrors[index]?.delivery_duration && <p className="text-red-500 text-xs italic">{additionalServicesErrors[index]?.delivery_duration}</p>}
//                       </div>
//                     </div>
//                     {additionalServicesErrors[index]?.submission && <p className="text-red-500 text-xs italic">{additionalServicesErrors[index]?.submission}</p>}

//                     {additionalServices.length > 1 && (
//                       <button
//                         type="button"
//                         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 text-sm"
//                         onClick={() => handleRemoveAdditionalService(index)}
//                       >
//                         Remove Service
//                       </button>
//                     )}
//                   </div>
//                 ))}

//                 <button
//                   type="button"
//                   className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
//                   onClick={handleAddAdditionalService}
//                 >
//                   <span className="flex">Add More Additional Service <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8V24M24 16L8 16" stroke="#151515" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
 
//                 </button>
//               </div>
//             </section>

//             {/* Section 4: Submit Main Service Button */}
//             <section className="mt-8">
//               {errors.submission && <p className="text-red-500 text-center mb-3">{errors.submission}</p>}
//               <div className="flex justify-center mt-8">
//                 <button
//                   className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-xl focus:outline-none focus:shadow-outline transition-colors duration-300 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400' : ''}`}
//                   type="submit"
//                   disabled={isSubmitting || isSubmitDisabled()}
//                 >
//                   {isSubmitting ? 'Adding Service...' : 'Add Service'}
//                 </button>
//               </div>
//             </section>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddServiceForm;



import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from 'react-icons/fa';

interface AddServiceFormProps {
    // You can define props here if needed
}

interface AdditionalService {
    service_name: string;
    price: string;
    delivery_duration: string;
}

const translations = {
    en: {
        "Add a New Service": "Add a New Service",
        "Service Title": "Service Title",
        "Enter a concise and descriptive title for your service": "Enter a concise and descriptive title for your service",
        "Section": "Section",
        "Choose a section": "Choose a section",
        "Digital Marketing & Sales": "Digital Marketing & Sales",
        "Consulting": "Consulting",
        "Programming": "Programming",
        "Design, Video & Audio": "Design, Video & Audio",
        "Writing & Translation": "Writing & Translation",
        "Data Entry": "Data Entry",
        "Training & Education": "Training & Education",
        "Subsection": "Subsection",
        "Choose a subsection": "Choose a subsection",
        "Frontend Development": "Frontend Development",
        "Backend Development": "Backend Development",
        "Mobile App Development": "Mobile App Development",
        "Service Description": "Service Description",
        "Provide a detailed description of your service and what you offer...": "Provide a detailed description of your service and what you offer...",
        "Thumbnail Photo": "Thumbnail Photo",
        "Upload a visually appealing thumbnail for your service.": "Upload a visually appealing thumbnail for your service.",
        "Drag & drop files here or": "Drag & drop files here or",
        "Browse files": "Browse files",
        "Main Photo": "Main Photo",
        "Showcase your service with a compelling main image.": "Showcase your service with a compelling main image.",
        "Required Skills": "Required Skills",
        "List skills relevant to your service (e.g., SEO, Video Editing)": "List skills relevant to your service (e.g., SEO, Video Editing)",
        "Price": "Price",
        "Enter the price": "Enter the price",
        "Delivery Duration": "Delivery Duration",
        "Expected delivery time (e.g., 1 day, 3 days)": "Expected delivery time (e.g., 1 day, 3 days)",
        "Availability To": "Availability To",
        "Availability From": "Availability From",
        "External Link": "External Link",
        "Link to your portfolio or relevant website": "Link to your portfolio or relevant website",
        "Additional Services": "Additional Services",
        "Additional Service": "Additional Service",
        "Service Name": "Service Name",
        "Delivery duration": "Delivery duration",
        "Remove Service": "Remove Service",
        "Add More Additional Service": "Add More Additional Service",
        "Adding Service...": "Adding Service...",
        "Add Service": "Add Service",
    },
    ar: {
        "Add a New Service": "إضافة خدمة جديدة",
        "Service Title": "عنوان الخدمة",
        "Enter a concise and descriptive title for your service": "أدخل عنوانًا موجزًا ووصفيًا لخدمتك",
        "Section": "القسم",
        "Choose a section": "اختر قسمًا",
        "Digital Marketing & Sales": "التسويق الرقمي والمبيعات",
        "Consulting": "استشارات",
        "Programming": "برمجة",
        "Design, Video & Audio": "تصميم وفيديو وصوت",
        "Writing & Translation": "كتابة وترجمة",
        "Data Entry": "إدخال بيانات",
        "Training & Education": "تدريب وتعليم",
        "Subsection": "القسم الفرعي",
        "Choose a subsection": "اختر قسمًا فرعيًا",
        "Frontend Development": "تطوير الواجهة الأمامية",
        "Backend Development": "تطوير الواجهة الخلفية",
        "Mobile App Development": "تطوير تطبيقات الجوال",
        "Service Description": "وصف الخدمة",
        "Provide a detailed description of your service and what you offer...": "قدم وصفًا تفصيليًا لخدمتك وما تقدمه...",
        "Thumbnail Photo": "صورة مصغرة",
        "Upload a visually appealing thumbnail for your service.": "قم بتحميل صورة مصغرة جذابة بصريًا لخدمتك.",
        "Drag & drop files here or": "اسحب الملفات وأفلتها هنا أو",
        "Browse files": "تصفح الملفات",
        "Main Photo": "الصورة الرئيسية",
        "Showcase your service with a compelling main image.": "اعرض خدمتك بصورة رئيسية جذابة.",
        "Required Skills": "المهارات المطلوبة",
        "List skills relevant to your service (e.g., SEO, Video Editing)": "اذكر المهارات ذات الصلة بخدمتك (مثل SEO ، تحرير الفيديو)",
        "Price": "السعر",
        "Enter the price": "أدخل السعر",
        "Delivery Duration": "مدة التسليم",
        "Expected delivery time (e.g., 1 day, 3 days)": "الوقت المتوقع للتسليم (مثل يوم واحد ، 3 أيام)",
        "Availability To": "التوفر حتى",
        "Availability From": "التوفر من",
        "External Link": "رابط خارجي",
        "Link to your portfolio or relevant website": "رابط إلى ملف أعمالك أو موقع الويب ذي الصلة",
        "Additional Services": "خدمات إضافية",
        "Additional Service": "خدمة إضافية",
        "Service Name": "اسم الخدمة",
        "Delivery duration": "مدة التسليم",
        "Remove Service": "إزالة الخدمة",
        "Add More Additional Service": "إضافة المزيد من الخدمات الإضافية",
        "Adding Service...": "جاري إضافة الخدمة...",
        "Add Service": "أضف الخدمة",
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};


const AddServiceForm: React.FC<AddServiceFormProps> = () => {
    // Main Service Form State
    const [title, setTitle] = useState<string>("");
    const [section, setSection] = useState<string>("");
    const [subsection, setSubsection] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [requiredSkills, setRequiredSkills] = useState<string>("");
    const [priceAmount, setPriceAmount] = useState<string>("");
    const [deliveryDuration, setDeliveryDuration] = useState<string>("");
    const [fromDate, setFromDate] = useState<string>("");
    const [toDate, setToDate] = useState<string>("");
    const [link, setLink] = useState<string>("");
    const [thumbnailPhoto, setThumbnailPhoto] = useState<File | null>(null);
    const [mainPhoto, setMainPhoto] = useState<File | null>(null);
    const [thumbnailPhotoPreview, setThumbnailPhotoPreview] = useState<string | null>(null);
    const [mainPhotoPreview, setMainPhotoPreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const navigate = useNavigate();
    const thumbnailInputRef = useRef<HTMLInputElement>(null);
    const mainInputRef = useRef<HTMLInputElement>(null);
    const [mainServiceId, setMainServiceId] = useState<number | null>(null); // To store main service ID after successful creation
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


    // Sub-service Form State - Renamed to Additional Service and made it array to handle multiple services
    const [additionalServices, setAdditionalServices] = useState<AdditionalService[]>([
        { service_name: "", price: "", delivery_duration: "" }, // Initialize with one empty service
    ]);
    const [additionalServicesErrors, setAdditionalServicesErrors] = useState<any[]>([]); // Array to hold errors for each additional service

    const handleThumbnailPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 2048000) {
                setErrors((prevErrors: any) => ({ ...prevErrors, thumbnailPhoto: 'Thumbnail photo size should not exceed 2MB' }));
                setThumbnailPhoto(null);
                setThumbnailPhotoPreview(null);
                return;
            }
            if (!['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(file.type)) {
                setErrors((prevErrors: any) => ({ ...prevErrors, thumbnailPhoto: 'Thumbnail photo must be in jpeg, png, jpg, or gif format' }));
                setThumbnailPhoto(null);
                setThumbnailPhotoPreview(null);
                return;
            }
            setErrors((prevErrors: any) => ({ ...prevErrors, thumbnailPhoto: null }));
            setThumbnailPhoto(file);
            setThumbnailPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleMainPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 2048000) {
                setErrors((prevErrors: any) => ({ ...prevErrors, mainPhoto: 'Main photo size should not exceed 2MB' }));
                setMainPhoto(null);
                setMainPhotoPreview(null);
                return;
            }
            if (!['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(file.type)) {
                setErrors((prevErrors: any) => ({ ...prevErrors, mainPhoto: 'Main photo must be in jpeg, png, jpg, or gif format' }));
                setMainPhoto(null);
                setMainPhotoPreview(null);
                return;
            }
            setErrors((prevErrors: any) => ({ ...prevErrors, mainPhoto: null }));
            setMainPhoto(file);
            setMainPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleThumbnailBrowseClick = () => {
        thumbnailInputRef.current?.click();
    };

    const handleMainBrowseClick = () => {
        mainInputRef.current?.click();
    };

    const onDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
    };

    const onThumbnailDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        if (file) {
            if (['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(file.type)) {
                setThumbnailPhoto(file);
                setThumbnailPhotoPreview(URL.createObjectURL(file));
                setErrors((prevErrors: any) => ({ ...prevErrors, thumbnailPhoto: null }));
                if (thumbnailInputRef.current) {
                    thumbnailInputRef.current.files = event.dataTransfer.files;
                }
            } else {
                setErrors((prevErrors: any) => ({ ...prevErrors, thumbnailPhoto: 'Invalid file type. Please use jpeg, png, jpg, or gif.' }));
            }
        }
    };

    const onMainPhotoDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        if (file) {
            if (['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(file.type)) {
                setMainPhoto(file);
                setMainPhotoPreview(URL.createObjectURL(file));
                setErrors((prevErrors: any) => ({ ...prevErrors, mainPhoto: null }));
                if (mainInputRef.current) {
                    mainInputRef.current.files = event.dataTransfer.files;
                }
            } else {
                setErrors((prevErrors: any) => ({ ...prevErrors, mainPhoto: 'Invalid file type. Please use jpeg, png, jpg, or gif.' }));
            }
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        setAdditionalServicesErrors(additionalServices.map(() => ({}))); // Clear all additional service errors

        let validationErrors: any = {};
        if (!title) validationErrors.title = 'Service Title is required';
        if (!section) validationErrors.section = 'Section is required';
        if (!subsection) validationErrors.subsection = 'Subsection is required';
        if (!description) validationErrors.description = 'Description is required';
        if (!priceAmount) validationErrors.priceAmount = 'Price is required';
        if (isNaN(Number(priceAmount))) validationErrors.priceAmount = 'Price must be a number';
        if (!deliveryDuration) validationErrors.deliveryDuration = 'Delivery Duration is required';
        if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) validationErrors.toDate = 'To Date must be after From Date';
        if (!thumbnailPhoto) validationErrors.thumbnailPhoto = 'Thumbnail Photo is required';
        if (!mainPhoto) validationErrors.mainPhoto = 'Main Photo is required';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('section', section);
        formData.append('subsection', subsection);
        formData.append('description', description);
        formData.append('required_skills', requiredSkills);
        formData.append('price', priceAmount);
        formData.append('delivery_duration', deliveryDuration);
        formData.append('from_date', fromDate || '');
        formData.append('to_date', toDate || '');
        formData.append('link', link || '');
        if (mainPhoto) formData.append('main_photo', mainPhoto);
        if (thumbnailPhoto) formData.append('thumbnail_photo', thumbnailPhoto);
        formData.append('user_id', '1');
        formData.append('status', 'sent');

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/addService`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            console.log('Service added successfully', response.data);
            setMainServiceId(response.data.service.id); // Store the main service ID

            // Add Additional Services
            let hasAdditionalServiceErrors = false;
            const currentAdditionalServicesErrors = additionalServices.map(() => ({})); // Initialize error array

            for (let i = 0; i < additionalServices.length; i++) {
                const additionalService = additionalServices[i];
                let additionalServiceValidationErrors: any = {};
                if (!additionalService.service_name) additionalServiceValidationErrors.service_name = 'Service Name is required';
                if (!additionalService.price) additionalServiceValidationErrors.price = 'Price is required';
                if (isNaN(Number(additionalService.price))) additionalServiceValidationErrors.price = 'Price must be a number';
                if (!additionalService.delivery_duration) additionalServiceValidationErrors.delivery_duration = 'Delivery Duration is required';

                if (Object.keys(additionalServiceValidationErrors).length > 0) {
                    currentAdditionalServicesErrors[i] = additionalServiceValidationErrors;
                    hasAdditionalServiceErrors = true;
                } else if (mainServiceId !== null && (additionalService.service_name || additionalService.price || additionalService.delivery_duration)) {
                    const additionalServiceData = {
                        service_name: additionalService.service_name,
                        price: additionalService.price,
                        delivery_duration: additionalService.delivery_duration,
                        service_id: mainServiceId.toString(), // Use the ID from the main service response
                    };

                    try {
                        const additionalServiceResponse = await axios.post(`${process.env.REACT_APP_BACK_URL}/sub_service`, additionalServiceData, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                        });
                        console.log(`Additional service ${i + 1} added successfully`, additionalServiceResponse.data);
                    } catch (additionalServiceError: any) {
                        console.error(`Additional service ${i + 1} API Error:`, additionalServiceError.response ? additionalServiceError.response.data : additionalServiceError);
                        if (additionalServiceError.response && additionalServiceError.response.data && additionalServiceError.response.data.errors) {
                            currentAdditionalServicesErrors[i] = additionalServiceError.response.data.errors;
                        } else {
                            currentAdditionalServicesErrors[i] = { submission: additionalServiceError.response?.data?.message || 'Failed to add additional service.' };
                        }
                        hasAdditionalServiceErrors = true;
                    }
                }
            }

            if (hasAdditionalServiceErrors) {
                setAdditionalServicesErrors(currentAdditionalServicesErrors);
                setIsSubmitting(false);
                return; // Stop further processing and show additional service errors
            }

            setIsSubmitting(false);
            navigate('/react/ControlPanel');


        } catch (error: any) {
            setIsSubmitting(false);
            if (error.response) {
                console.error('API Error:', error.response.data);
                if (error.response.data && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    setErrors({ submission: error.response.data.message || 'Failed to add service. Please check the form and try again.' });
                }
            } else if (error.request) {
                console.error('Network Error:', error.request);
                setErrors({ submission: 'Network error occurred. Please try again later.' });
            } else {
                console.error('Error:', error.message);
                setErrors({ submission: 'An unexpected error occurred.' });
            }
        }
    };

    const isSubmitDisabled = () => {
        return !title || !section || !subsection || !description || !priceAmount || !deliveryDuration || !thumbnailPhoto || !mainPhoto;
    };

    const handleAdditionalServiceChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const updatedAdditionalServices = [...additionalServices];
        updatedAdditionalServices[index] = { ...updatedAdditionalServices[index], [name]: value };
        setAdditionalServices(updatedAdditionalServices);
    };

    const handleAddAdditionalService = () => {
        setAdditionalServices([...additionalServices, { service_name: "", price: "", delivery_duration: "" }]);
        setAdditionalServicesErrors([...additionalServicesErrors, {}]); // Add empty error object for new service
    };

    const handleRemoveAdditionalService = (index: number) => {
        if (additionalServices.length > 1) { // Ensure at least one additional service remains
            const updatedAdditionalServices = additionalServices.filter((_, i) => i !== index);
            const updatedErrors = additionalServicesErrors.filter((_, i) => i !== index);
            setAdditionalServices(updatedAdditionalServices);
            setAdditionalServicesErrors(updatedErrors);
        } else {
            // Optionally handle case when only one additional service is left and remove is clicked (e.g., clear fields)
            const clearedAdditionalServices = [{ service_name: "", price: "", delivery_duration: "" }];
            const clearedErrors = [{}];
            setAdditionalServices(clearedAdditionalServices);
            setAdditionalServicesErrors(clearedErrors);
        }
    };

    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="py-16 mt-10 flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-3xl w-full mx-4 md:mx-0">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 text-center">{translate("Add a New Service", language)}</h2>
                <form onSubmit={handleSubmit} className="font-sans">
                    {/* Section 1: Main Service Details */}
                    <section>
                        <div className="mb-4 md:mb-6">
                            <label htmlFor="serviceTitle" className="block text-gray-700 text-sm font-bold mb-2">{translate("Service Title", language)}</label>
                            <input
                                type="text"
                                id="serviceTitle"
                                className={`shadow-sm appearance-none border rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`}
                                placeholder={translate("Enter a concise and descriptive title for your service", language)}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
                        </div>

                        <div className="mb-4 md:mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div>
                                <label htmlFor="section" className="block text-gray-700 text-sm font-bold mb-2">{translate("Section", language)}</label>
                                <div className="relative">
                                    <select
                                        id="section"
                                        className={`block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-3 md:px-4 py-2 md:py-3 pr-8 rounded shadow-sm leading-tight focus:outline-none focus:shadow-outline ${errors.section ? 'border-red-500' : ''}`}
                                        value={section}
                                        onChange={(e) => setSection(e.target.value)}
                                    >
                                        <option value="">{translate("Choose a section", language)}</option>
                                        <option>{translate("Digital Marketing & Sales", language)}</option>
                                        <option>{translate("Consulting", language)}</option>
                                        <option>{translate("Programming", language)}</option>
                                        <option>{translate("Design, Video & Audio", language)}</option>
                                        <option>{translate("Writing & Translation", language)}</option>
                                        <option>{translate("Data Entry", language)}</option>
                                        <option>{translate("Training & Education", language)}</option>
                                    </select>
                                    {errors.section && <p className="text-red-500 text-xs italic">{errors.section}</p>}
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="subsection" className="block text-gray-700 text-sm font-bold mb-2">{translate("Subsection", language)}</label>
                                <div className="relative">
                                    <select
                                        id="subsection"
                                        className={`block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-3 md:px-4 py-2 md:py-3 pr-8 rounded shadow-sm leading-tight focus:outline-none focus:shadow-outline ${errors.subsection ? 'border-red-500' : ''}`}
                                        value={subsection}
                                        onChange={(e) => setSubsection(e.target.value)}
                                    >
                                        <option value="">{translate("Choose a subsection", language)}</option>
                                        <option>{translate("Frontend Development", language)}</option>
                                        <option>{translate("Backend Development", language)}</option>
                                        <option>{translate("Mobile App Development", language)}</option>
                                    </select>
                                    {errors.subsection && <p className="text-red-500 text-xs italic">{errors.subsection}</p>}
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4 md:mb-6">
                            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">{translate("Service Description", language)}</label>
                            <textarea
                                id="description"
                                className={`shadow-sm appearance-none border rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 md:h-48 ${errors.description ? 'border-red-500' : ''}`}
                                placeholder={translate("Provide a detailed description of your service and what you offer...", language)}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
                        </div>

                        <div className="mb-4 md:mb-6">
                            <label htmlFor="thumbnailPhoto" className="block text-gray-700 text-sm font-bold mb-2">{translate("Thumbnail Photo", language)}</label>
                            <p className="text-orange-500 text-sm mb-2 md:mb-3">{translate("Upload a visually appealing thumbnail for your service.", language)}</p>
                            <label
                                htmlFor="thumbnailPhotoInput"
                                onDragOver={onDragOver}
                                onDrop={onThumbnailDrop}
                                className={`border-dashed border-2 border-gray-400 rounded-xl p-4 md:p-8 text-center cursor-pointer hover:border-orange-500 transition-colors duration-300 block ${errors.thumbnailPhoto ? 'border-red-500' : ''}`}
                            >
                                <input
                                    type="file"
                                    id="thumbnailPhotoInput"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleThumbnailPhotoChange}
                                    ref={thumbnailInputRef}
                                />
                                {thumbnailPhotoPreview ? (
                                    <img src={thumbnailPhotoPreview} alt="Thumbnail Preview" className="max-h-32 mx-auto rounded-xl" />
                                ) : (
                                    <>
                                        <span className="text-gray-500">{translate("Drag & drop files here or", language)}</span>
                                        <button
                                            type="button"
                                            onClick={handleThumbnailBrowseClick}
                                            className="ml-2 text-orange-500 hover:text-orange-700 font-semibold focus:outline-none"
                                        >
                                            {translate("Browse files", language)}
                                        </button>
                                    </>
                                )}
                            </label>
                            {errors.thumbnailPhoto && <p className="text-red-500 text-xs italic">{errors.thumbnailPhoto}</p>}
                        </div>

                        <div className="mb-4 md:mb-6">
                            <label htmlFor="mainPhoto" className="block text-gray-700 text-sm font-bold mb-2">{translate("Main Photo", language)}</label>
                            <p className="text-orange-500 text-sm mb-2 md:mb-3">{translate("Showcase your service with a compelling main image.", language)}</p>
                            <label
                                htmlFor="mainPhotoInput"
                                onDragOver={onDragOver}
                                onDrop={onMainPhotoDrop}
                                className={`border-dashed border-2 border-gray-400 rounded-xl p-4 md:p-8 text-center cursor-pointer hover:border-blue-500 transition-colors duration-300 block ${errors.mainPhoto ? 'border-red-500' : ''}`}
                            >
                                <input
                                    type="file"
                                    id="mainPhotoInput"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleMainPhotoChange}
                                    ref={mainInputRef}
                                />
                                {mainPhotoPreview ? (
                                    <img src={mainPhotoPreview} alt="Main Preview" className="max-h-64 mx-auto rounded-xl" />
                                ) : (
                                    <>
                                        <span className="text-gray-500">{translate("Drag & drop files here or", language)}</span>
                                        <button
                                            type="button"
                                            onClick={handleMainBrowseClick}
                                            className="ml-2 text-orange-500 hover:text-orange-700 font-semibold focus:outline-none"
                                        >
                                            {translate("Browse files", language)}
                                        </button>
                                    </>
                                )}
                            </label>
                            {errors.mainPhoto && <p className="text-red-500 text-xs italic">{errors.mainPhoto}</p>}
                        </div>

                        <div className="mb-4 md:mb-6">
                            <label htmlFor="requiredSkills" className="block text-gray-700 text-sm font-bold mb-2">{translate("Required Skills", language)}</label>
                            <input
                                type="text"
                                id="requiredSkills"
                                className={`shadow-sm appearance-none border rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.required_skills ? 'border-red-500' : ''}`}
                                placeholder={translate("List skills relevant to your service (e.g., SEO, Video Editing)", language)}
                                value={requiredSkills}
                                onChange={(e) => setRequiredSkills(e.target.value)}
                            />
                            {errors.required_skills && <p className="text-red-500 text-xs italic">{errors.required_skills}</p>}
                        </div>

                        <div className="mb-4 md:mb-6">
                            <label htmlFor="priceAmount" className="block text-gray-700 text-sm font-bold mb-2">{translate("Price", language)}</label>
                            <input
                                type="number"
                                id="priceAmount"
                                className={`shadow-sm appearance-none border rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.priceAmount ? 'border-red-500' : ''}`}
                                placeholder={translate("Enter the price", language)}
                                value={priceAmount}
                                onChange={(e) => setPriceAmount(e.target.value)}
                            />
                            {errors.priceAmount && <p className="text-red-500 text-xs italic">{errors.priceAmount}</p>}
                        </div>

                        <div className="mb-4 md:mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div>
                                <label htmlFor="deliveryDuration" className="block text-gray-700 text-sm font-bold mb-2">{translate("Delivery Duration", language)}</label>
                                <input
                                    type="text"
                                    id="deliveryDuration"
                                    className={`shadow-sm appearance-none border rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.deliveryDuration ? 'border-red-500' : ''}`}
                                    placeholder={translate("Expected delivery time (e.g., 1 day, 3 days)", language)}
                                    value={deliveryDuration}
                                    onChange={(e) => setDeliveryDuration(e.target.value)}
                                />
                                {errors.deliveryDuration && <p className="text-red-500 text-xs italic">{errors.deliveryDuration}</p>}
                            </div>
                            <div>
                                <label htmlFor="toDate" className="block text-gray-700 text-sm font-bold mb-2">{translate("Availability To", language)}</label>
                                <input
                                    type="date"
                                    id="toDate"
                                    className={`shadow-sm appearance-none border rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.toDate ? 'border-red-500' : ''}`}
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                />
                                {errors.toDate && <p className="text-red-500 text-xs italic">{errors.toDate}</p>}
                            </div>
                        </div>

                        <div className="mb-4 md:mb-6">
                            <label htmlFor="fromDate" className="block text-gray-700 text-sm font-bold mb-2">{translate("Availability From", language)}</label>
                            <input
                                type="date"
                                id="fromDate"
                                className={`shadow-sm appearance-none border rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.fromDate ? 'border-red-500' : ''}`}
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                            />
                            {errors.fromDate && <p className="text-red-500 text-xs italic">{errors.fromDate}</p>}
                        </div>

                        <div className="mb-4 md:mb-6">
                            <label htmlFor="link" className="block text-gray-700 text-sm font-bold mb-2">{translate("External Link", language)}</label>
                            <input
                                type="text"
                                id="link"
                                className={`shadow-sm appearance-none border rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.link ? 'border-red-500' : ''}`}
                                placeholder={translate("Link to your portfolio or relevant website", language)}
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                            {errors.link && <p className="text-red-500 text-xs italic">{errors.link}</p>}
                        </div>
                    </section>

                    {/* Section 2: Add Additional Service Fields - Now Multiple */}
                    <section className="mt-6 md:mt-8">
                        <div className="font-sans">
                            <div>
                                <h3 className="text-lg font-bold mb-3 md:mb-4">{translate("Additional Services", language)}</h3>
                            </div>

                            {additionalServices.map((additionalService, index) => (
                                <div key={index} className="mb-4 md:mb-6 p-3 md:p-4 border rounded">
                                    <div className="flex justify-between items-start mb-2 md:mb-3">
                                        <h4 className="font-semibold">{translate("Additional Service", language)} {index + 1}</h4>
                                        {additionalServices.length > 1 && (
                                            <button
                                                type="button"
                                                className="text-red-500 hover:text-red-700 focus:outline-none"
                                                onClick={() => handleRemoveAdditionalService(index)}
                                            >
                                                <FaMinus />
                                            </button>
                                        )}
                                    </div>
                                    <div className="mb-3 md:mb-4">
                                        <label htmlFor={`additionalServiceName-${index}`} className="font-bold block mb-2 text-sm">{translate("Service Name", language)}</label>
                                        <input
                                            type="text"
                                            id={`additionalServiceName-${index}`}
                                            name="service_name"
                                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-300 ${additionalServicesErrors[index]?.service_name ? 'border-red-500' : ''}`}
                                            value={additionalService.service_name}
                                            onChange={(e) => handleAdditionalServiceChange(index, e)}
                                        />
                                        {additionalServicesErrors[index]?.service_name && <p className="text-red-500 text-xs italic">{additionalServicesErrors[index]?.service_name}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 mb-3 md:mb-4">
                                        <div className="flex-1">
                                            <label htmlFor={`additionalServicePrice-${index}`} className="font-bold block mb-2 text-sm">{translate("Price", language)}</label>
                                            <input
                                                type="text"
                                                id={`additionalServicePrice-${index}`}
                                                name="price"
                                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-300 ${additionalServicesErrors[index]?.price ? 'border-red-500' : ''}`}
                                                value={additionalService.price}
                                                onChange={(e) => handleAdditionalServiceChange(index, e)}
                                            />
                                            {additionalServicesErrors[index]?.price && <p className="text-red-500 text-xs italic">{additionalServicesErrors[index]?.price}</p>}
                                        </div>
                                        <div className="flex-1">
                                            <label htmlFor={`additionalServiceDeliveryDuration-${index}`} className="font-bold block mb-2 text-sm">{translate("Delivery duration", language)}</label>
                                            <input
                                                type="text"
                                                id={`additionalServiceDeliveryDuration-${index}`}
                                                name="delivery_duration"
                                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-300 ${additionalServicesErrors[index]?.delivery_duration ? 'border-red-500' : ''}`}
                                                value={additionalService.delivery_duration}
                                                onChange={(e) => handleAdditionalServiceChange(index, e)}
                                            />
                                            {additionalServicesErrors[index]?.delivery_duration && <p className="text-red-500 text-xs italic">{additionalServicesErrors[index]?.delivery_duration}</p>}
                                        </div>
                                    </div>
                                    {additionalServicesErrors[index]?.submission && <p className="text-red-500 text-xs italic">{additionalServicesErrors[index]?.submission}</p>}
                                </div>
                            ))}

                            <button
                                type="button"
                                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 flex items-center space-x-2"
                                onClick={handleAddAdditionalService}
                            >
                                <span>{translate("Add More Additional Service", language)}</span> <FaPlus />
                            </button>
                        </div>
                    </section>

                    {/* Section 4: Submit Main Service Button */}
                    <section className="mt-6 md:mt-8">
                        {errors.submission && <p className="text-red-500 text-center mb-3">{errors.submission}</p>}
                        <div className="flex justify-center mt-4 md:mt-6">
                            <button
                                className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2.5 md:py-3 px-6 md:px-8 rounded-xl focus:outline-none focus:shadow-outline transition-colors duration-300 w-full md:w-auto ${isSubmitting ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400' : ''}`}
                                type="submit"
                                disabled={isSubmitting || isSubmitDisabled()}
                            >
                                {isSubmitting ? translate("Adding Service...", language) : translate("Add Service", language)}
                            </button>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    );
};

export default AddServiceForm;