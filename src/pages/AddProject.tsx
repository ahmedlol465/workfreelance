import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AddProjectFormProps {
    // You can define props here if needed
}

const translations = {
    en: {
        "Add Project": "Add Project",
        "Project Title": "Project Title",
        "Enter a concise and descriptive title for your project": "Enter a concise and descriptive title for your project",
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
        "Describe": "Describe",
         "Provide a detailed description of your project and what is required...": "Provide a detailed description of your project and what is required...",
        "Photos": "Photos",
        "Upload photo from here.": "Upload photo from here.",
        "Drag & drop files here or": "Drag & drop files here or",
        "Browse files": "Browse files",
        "Required Skills": "Required Skills",
        "List skills relevant to your project (e.g., SEO, Video Editing)": "List skills relevant to your project (e.g., SEO, Video Editing)",
        "Price": "Price",
        "Budget From": "Budget From",
        "Budget To": "Budget To",
        "Enter the budget": "Enter the budget",
        "Delivery duration": "Delivery duration",
        "Expected delivery time (e.g., 1 day, 3 days)": "Expected delivery time (e.g., 1 day, 3 days)",
        "Link (optional)": "Link (optional)",
        "Link to your project or relevant website": "Link to your project or relevant website",
        "Adding Project...": "Adding Project...",
        "Publish": "Publish",
        // Error messages (consider backend translation for dynamic messages)
         "Project Title is required": "Project Title is required",
        "Section is required": "Section is required",
        "Subsection is required": "Subsection is required",
        "Description is required": "Description is required",
        "Budget From is required": "Budget From is required",
        "Budget From must be a number": "Budget From must be a number",
        "Budget To is required": "Budget To is required",
        "Budget To must be a number": "Budget To must be a number",
        "Delivery duration is required": "Delivery duration is required",
        'Project image size should not exceed 2MB': 'Project image size should not exceed 2MB',
        'Project image must be in jpeg, png, jpg, or gif format': 'Project image must be in jpeg, png, jpg, or gif format',
        'Invalid file type. Please use jpeg, png, jpg, or gif.': 'Invalid file type. Please use jpeg, png, jpg, or gif.',
        'Failed to add project. Please check the form and try again.': 'Failed to add project. Please check the form and try again.',
        'Network error occurred. Please try again later.': 'Network error occurred. Please try again later.',
        'An unexpected error occurred.': 'An unexpected error occurred.',

    },
    ar: {
        "Add Project": "إضافة مشروع",
        "Project Title": "عنوان المشروع",
        "Enter a concise and descriptive title for your project": "أدخل عنوانًا موجزًا ووصفيًا لمشروعك",
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
        "Mobile App Development": "تطوير تطبيقات الهاتف المحمول",
        "Describe": "وصف",
        "Provide a detailed description of your project and what is required...": "قدم وصفًا تفصيليًا لمشروعك وما هو مطلوب...",
        "Photos": "صور",
        "Upload photo from here.": "تحميل صورة من هنا.",
        "Drag & drop files here or": "اسحب الملفات وأفلتها هنا أو",
        "Browse files": "تصفح الملفات",
        "Required Skills": "المهارات المطلوبة",
        "List skills relevant to your project (e.g., SEO, Video Editing)": "اذكر المهارات ذات الصلة بمشروعك (مثل SEO ، تحرير الفيديو)",
        "Price": "السعر",
        "Budget From": "الميزانية من",
        "Budget To": "الميزانية إلى",
        "Enter the budget": "أدخل الميزانية",
        "Delivery duration": "مدة التسليم",
        "Expected delivery time (e.g., 1 day, 3 days)": "الوقت المتوقع للتسليم (مثل يوم واحد ، 3 أيام)",
        "Link (optional)": "الرابط (اختياري)",
        "Link to your project or relevant website": "رابط لمشروعك أو موقع ويب ذي صلة",
        "Adding Project...": "جاري إضافة المشروع...",
        "Publish": "نشر",
        // Error messages
        "Project Title is required": "عنوان المشروع مطلوب",
        "Section is required": "القسم مطلوب",
        "Subsection is required": "القسم الفرعي مطلوب",
        "Description is required": "الوصف مطلوب",
        "Budget From is required": "الميزانية من مطلوبة",
        "Budget From must be a number": "يجب أن تكون الميزانية من رقمًا",
        "Budget To is required": "الميزانية إلى مطلوبة",
        "Budget To must be a number": "يجب أن تكون الميزانية إلى رقمًا",
        "Delivery duration is required": "مدة التسليم مطلوبة",
        'Project image size should not exceed 2MB': 'يجب ألا يتجاوز حجم صورة المشروع 2 ميجابايت',
        'Project image must be in jpeg, png, jpg, or gif format': 'يجب أن تكون صورة المشروع بتنسيق jpeg أو png أو jpg أو gif',
        'Invalid file type. Please use jpeg, png, jpg, or gif.': 'نوع الملف غير صالح. يرجى استخدام jpeg أو png أو jpg أو gif.',
        'Failed to add project. Please check the form and try again.': 'فشل في إضافة المشروع. يرجى التحقق من النموذج والمحاولة مرة أخرى.',
        'Network error occurred. Please try again later.': 'حدث خطأ في الشبكة. يرجى المحاولة مرة أخرى لاحقًا.',
        'An unexpected error occurred.': 'حدث خطأ غير متوقع.',
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};


const AddProjectForm: React.FC<AddProjectFormProps> = () => {
    // Project Form State
    const [projectName, setProjectName] = useState<string>("");
    const [section, setSection] = useState<string>("");
    const [subsection, setSubsection] = useState<string>("");
    const [projectDescription, setProjectDescription] = useState<string>("");
    const [requiredSkills, setRequiredSkills] = useState<string>("");
    const [budget, setBudget] = useState<string>("");
    const [budgetTo, setBudgetTo] = useState<string>("");
    const [duration, setDuration] = useState<string>("");
    const [projectLink, setProjectLink] = useState<string>("");
    const [projectImage, setProjectImage] = useState<File | null>(null);
    const [projectImagePreview, setProjectImagePreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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
    const mainInputRef = useRef<HTMLInputElement>(null);


    const handleProjectImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 2048000) {
                setErrors((prevErrors: any) => ({ ...prevErrors, project_image: translate('Project image size should not exceed 2MB', language) }));
                setProjectImage(null);
                setProjectImagePreview(null);
                return;
            }
            if (!['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(file.type)) {
                setErrors((prevErrors: any) => ({ ...prevErrors, project_image: translate('Project image must be in jpeg, png, jpg, or gif format', language) }));
                setProjectImage(null);
                setProjectImagePreview(null);
                return;
            }
            setErrors((prevErrors: any) => ({ ...prevErrors, project_image: null }));
            setProjectImage(file);
            setProjectImagePreview(URL.createObjectURL(file));
        }
    };


    const handleMainBrowseClick = () => {
        mainInputRef.current?.click();
    };


    const onDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
    };


    const onMainPhotoDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        if (file) {
            if (['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(file.type)) {
                setProjectImage(file);
                setProjectImagePreview(URL.createObjectURL(file));
                setErrors((prevErrors: any) => ({ ...prevErrors, project_image: null }));
                if (mainInputRef.current) {
                    mainInputRef.current.files = event.dataTransfer.files;
                }
            } else {
                setErrors((prevErrors: any) => ({ ...prevErrors, project_image: translate('Invalid file type. Please use jpeg, png, jpg, or gif.', language) }));
            }
        }
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        let validationErrors: any = {};
        if (!projectName) validationErrors.project_name = translate('Project Title is required', language);
        if (!section) validationErrors.section = translate('Section is required', language);
        if (!subsection) validationErrors.sub_section = translate('Subsection is required', language);
        if (!projectDescription) validationErrors.project_description = translate('Description is required', language);
        if (!budget) validationErrors.budget = translate('Budget From is required', language);
        if (isNaN(Number(budget))) validationErrors.budget = translate('Budget From must be a number', language);
        if (!budgetTo) validationErrors.budgetTo = translate('Budget To is required', language);
        if (isNaN(Number(budgetTo))) validationErrors.budgetTo = translate('Budget To must be a number', language);
        if (!duration) validationErrors.duration = translate('Delivery duration is required', language);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitting(false);
            return;
        }


        const formData = new FormData();
        formData.append('project_name', projectName);
        formData.append('section', section);
        formData.append('sub_section', subsection);
        formData.append('project_description', projectDescription);
        formData.append('required_skills', requiredSkills);
        formData.append('budget', budget);
        formData.append('budgetTo', budgetTo);
        formData.append('duration', duration);
        formData.append('project_link', projectLink || '');
        if (projectImage) formData.append('project_image', projectImage);
        formData.append('user_id', '1');
        formData.append('status', 'under_review'); // Changed status to 'pending' -  Likely a valid status for new projects

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/addProject', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            console.log('Project added successfully', response.data);
            setIsSubmitting(false);
            navigate('/react/ControlPanel')
        } catch (error: any) {
            setIsSubmitting(false);
            if (error.response) {
                console.error('API Error:', error.response.data);
                if (error.response.data && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    setErrors({ submission: translate('Failed to add project. Please check the form and try again.', language) });
                }
            } else if (error.request) {
                console.error('Network Error:', error.request);
                setErrors({ submission: translate('Network error occurred. Please try again later.', language) });
            } else {
                console.error('Error:', error.message);
                setErrors({ submission: translate('An unexpected error occurred.', language) });
            }
        }
    };


    const isSubmitDisabled = () => {
        return !projectName || !section || !subsection || !projectDescription || !budget || !budgetTo || !duration;
    };


    return (
      <>
        <div  dir={language === 'ar' ? 'rtl' : 'ltr'} className="py-16 md:py-32 flex justify-center items-center min-h-screen bg-gray-50"> {/* Responsive padding */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-lg md:max-w-3xl w-full mx-4 md:mx-0"> {/* Responsive padding and max-width */}
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 text-center">{translate("Add Project", language)}</h2> {/* Responsive font size and margin */}
                <form onSubmit={handleSubmit}>

                    <section>
                        <div className="mb-4 md:mb-6"> {/* Responsive margin */}
                            <label htmlFor="projectName" className="block text-gray-700 text-sm font-bold mb-2">
                                {translate("Project Title", language)}
                            </label>
                            <input
                                type="text"
                                id="projectName"
                                className={`shadow-sm appearance-none border rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.project_name ? 'border-red-500' : ''}`} // Responsive padding
                                placeholder={translate("Enter a concise and descriptive title for your project", language)}
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                            />
                            {errors.project_name && <p className="text-red-500 text-xs italic">{errors.project_name && errors.project_name[0]}</p>}
                        </div>

                        <div className="mb-4 md:mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"> {/* Responsive grid and margin */}
                            <div>
                                <label htmlFor="section" className="block text-gray-700 text-sm font-bold mb-2">
                                    {translate("Section", language)}
                                </label>
                                <div className="relative">
                                    <select
                                        id="section"
                                        className={`block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 md:py-3 pr-8 rounded shadow-sm leading-tight focus:outline-none focus:shadow-outline ${errors.section ? 'border-red-500' : ''}`} // Responsive padding
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
                                    {errors.section && <p className="text-red-500 text-xs italic">{errors.section && errors.section[0]}</p>}
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                             </div>
                             <div>
                                <label htmlFor="subsection" className="block text-gray-700 text-sm font-bold mb-2">
                                    {translate("Subsection", language)}
                                </label>
                                <div className="relative">
                                    <select
                                        id="subsection"
                                        className={`block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 md:py-3 pr-8 rounded shadow-sm leading-tight focus:outline-none focus:shadow-outline ${errors.sub_section ? 'border-red-500' : ''}`} // Responsive padding
                                        value={subsection}
                                        onChange={(e) => setSubsection(e.target.value)}
                                    >
                                        <option value="">{translate("Choose a subsection", language)}</option>
                                        <option>{translate("Frontend Development", language)}</option>
                                        <option>{translate("Backend Development", language)}</option>
                                        <option>{translate("Mobile App Development", language)}</option>
                                    </select>
                                    {errors.sub_section && <p className="text-red-500 text-xs italic">{errors.sub_section && errors.sub_section[0]}</p>}
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4 md:mb-6"> {/* Responsive margin */}
                            <label htmlFor="projectDescription" className="block text-gray-700 text-sm font-bold mb-2">
                                {translate("Describe", language)}
                            </label>
                            <textarea
                                id="projectDescription"
                                className={`shadow-sm appearance-none border rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 md:h-48 ${errors.project_description ? 'border-red-500' : ''}`} // Responsive padding and height
                                placeholder={translate("Provide a detailed description of your project and what is required...", language)}
                                value={projectDescription}
                                onChange={(e) => setProjectDescription(e.target.value)}
                            />
                            {errors.project_description && <p className="text-red-500 text-xs italic">{errors.project_description && errors.project_description[0]}</p>}
                        </div>

                        <div className="mb-4 md:mb-6"> {/* Responsive margin */}
                            <label htmlFor="projectImage" className="block text-gray-700 text-sm font-bold mb-2">
                                {translate("Photos", language)}
                             </label>
                            <p className="text-orange-500 text-sm mb-3">{translate("Upload photo from here.", language)}</p>
                            <label
                                htmlFor="mainPhotoInput"
                                onDragOver={onDragOver}
                                onDrop={onMainPhotoDrop}
                                className={`border-dashed border-2 border-gray-400 rounded-xl p-6 md:p-8 text-center cursor-pointer hover:border-blue-500 transition-colors duration-300 block ${errors.project_image ? 'border-red-500' : ''}`} // Responsive padding
                            >
                                <input
                                    type="file"
                                    id="mainPhotoInput"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleProjectImageChange}
                                    ref={mainInputRef}
                                />
                                {projectImagePreview ? (
                                    <img src={projectImagePreview} alt="Main Preview" className="max-h-64 mx-auto rounded-xl" />
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
                            {errors.project_image && <p className="text-red-500 text-xs italic">{errors.project_image && errors.project_image[0]}</p>}
                        </div>


                        <div className="mb-4 md:mb-6"> {/* Responsive margin */}
                            <label htmlFor="requiredSkills" className="block text-gray-700 text-sm font-bold mb-2">
                                {translate("Required Skills", language)}
                            </label>
                            <input
                                type="text"
                                id="requiredSkills"
                                className={`shadow-sm appearance-none border rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.required_skills ? 'border-red-500' : ''}`} // Responsive padding
                                placeholder={translate("List skills relevant to your project (e.g., SEO, Video Editing)", language)}
                                value={requiredSkills}
                                onChange={(e) => setRequiredSkills(e.target.value)}
                            />
                            {errors.required_skills && <p className="text-red-500 text-xs italic">{errors.required_skills && errors.required_skills[0]}</p>}
                        </div>

                        <div className="mb-4 md:mb-6"> {/* Responsive margin */}
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                {translate("Price", language)}
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div>
                                    <label htmlFor="budget" className="block text-gray-700 text-xs font-bold mb-1">{translate("Budget From", language)}</label>
                                    <input
                                        type="number"
                                        id="budget"
                                        className={`shadow-sm appearance-none border rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.budget ? 'border-red-500' : ''}`} // Responsive padding
                                        placeholder={translate("Enter the budget", language)}
                                        value={budget}
                                        onChange={(e) => setBudget(e.target.value)}
                                    />
                                    {errors.budget && <p className="text-red-500 text-xs italic">{errors.budget && errors.budget[0]}</p>}
                                </div>
                                <div>
                                    <label htmlFor="budgetTo" className="block text-gray-700 text-xs font-bold mb-1">{translate("Budget To", language)}</label>
                                    <input
                                        type="number"
                                        id="budgetTo"
                                        className={`shadow-sm appearance-none border rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.budgetTo ? 'border-red-500' : ''}`} // Responsive padding
                                        value={budgetTo}
                                        onChange={(e) => setBudgetTo(e.target.value)}
                                    />
                                    {errors.budgetTo && <p className="text-red-500 text-xs italic">{errors.budgetTo && errors.budgetTo[0]}</p>}
                                </div>
                            </div>
                        </div>


                        <div className="mb-4 md:mb-6"> {/* Responsive margin */}
                            <label htmlFor="duration" className="block text-gray-700 text-sm font-bold mb-2">
                                {translate("Delivery duration", language)}
                            </label>
                            <input
                                type="text"
                                id="duration"
                                className={`shadow-sm appearance-none border rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.duration ? 'border-red-500' : ''}`} // Responsive padding
                                placeholder={translate("Expected delivery time (e.g., 1 day, 3 days)", language)}
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            />
                            {errors.duration && <p className="text-red-500 text-xs italic">{errors.duration && errors.duration[0]}</p>}
                        </div>


                        <div className="mb-4 md:mb-6"> {/* Responsive margin */}
                            <label htmlFor="projectLink" className="block text-gray-700 text-sm font-bold mb-2">
                                {translate("Link (optional)", language)}
                            </label>
                            <input
                                type="text"
                                id="projectLink"
                                className={`shadow-sm appearance-none border rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.project_link ? 'border-red-500' : ''}`} // Responsive padding
                                placeholder={translate("Link to your project or relevant website", language)}
                                value={projectLink}
                                onChange={(e) => setProjectLink(e.target.value)}
                            />
                            {errors.project_link && <p className="text-red-500 text-xs italic">{errors.project_link && errors.project_link[0]}</p>}
                        </div>
                    </section>


                    <section className="mt-6 md:mt-8"> {/* Responsive margin */}
                        {errors.submission && <p className="text-red-500 text-center mb-3">{errors.submission && (errors.submission[0] || translate(errors.submission, language))}</p>}
                        <div className="flex justify-center mt-6 md:mt-8"> {/* Responsive margin */}
                            <button
                                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2.5 md:py-3 px-6 md:px-8 rounded-xl focus:outline-none focus:shadow-outline transition-colors duration-300 text-sm md:text-base" // Responsive padding and font size
                                type="submit"
                                disabled={isSubmitting || isSubmitDisabled()}
                            >
                                {isSubmitting ? translate("Adding Project...", language) : translate("Publish", language)}
                            </button>
                        </div>
                    </section>

                </form>

            </div>
        </div>

    </>
    );

};

export default AddProjectForm;