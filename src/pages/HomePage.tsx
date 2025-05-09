
// import { FaArrowRight } from "react-icons/fa";
// import photo from "../assets/Rectangle 4.png";
// import { useRef, useState } from "react";
// import howToAddAProject from "../assets/Rectangle 13.png";
// import aboutWorkLink from "../assets/Rectangle 1153.png";
// import marketingImage from "../assets/marketing.png";
// import videoEditingImage from "../assets/videoEditing.png";
// import translationImage from "../assets/translate.png";
// import webDesignImage from "../assets/webDesign.png";
// import consulting from "../assets/consulting.png";
// import programing from "../assets/programing.png";
// import engineering from "../assets/engineering.png";
// import traning from "../assets/traning.png";

// import { Link } from "react-router-dom";

// interface DropdownItem {
//     labelKey: string;
//     href: string;
// }

// interface NavCategory {
//     labelKey: string;
//     dropdownItems: DropdownItem[];
// }

// const navCategories: NavCategory[] = [
//     {
//         labelKey: "Digital marketing & sales",
//         dropdownItems: [
//             { labelKey: "Create a marketing plan", href: "#" },
//             { labelKey: "Execute an advertising campaign", href: "#" },
//             { labelKey: "Manage social media accounts", href: "#" },
//             { labelKey: "Manage an online store", href: "#" },
//             { labelKey: "Search engine optimization (SEO) for a website", href: "#" },
//             { labelKey: "Marketing consultation", href: "#" },
//         ],
//     },
//     {
//         labelKey: "Consulting",
//         dropdownItems: [
//             { labelKey: "Feasibility study for a business project", href: "#" },
//             { labelKey: "Feasibility study for a website", href: "#" },
//             { labelKey: "Data analysis using SPSS statistical software", href: "#" },
//             {
//                 labelKey: "Drafting terms and conditions and usage policies",
//                 href: "#",
//             },
//             { labelKey: "Business plan", href: "#" },
//             { labelKey: "Drafting a contract or agreement", href: "#" },
//             { labelKey: "Reviewing an employment contract", href: "#" },
//             { labelKey: "Financial statements for a project", href: "#" },
//             { labelKey: "Market and competitor analysis", href: "#" },
//         ],
//     },
//     {
//         labelKey: "Programming",
//         dropdownItems: [
//             { labelKey: "Designing an Excel Program", href: "#" },
//             { labelKey: "Designing and Programming a New Mobile App", href: "#" },
//             { labelKey: "Programming a New Mobile App", href: "#" },
//             { labelKey: "Designing a New Mobile App", href: "#" },
//             { labelKey: "Adding Features to a Mobile App", href: "#" },
//             {
//                 labelKey: "Maintaining a Mobile App and Solving Software Issues",
//                 href: "#",
//             },
//             { labelKey: "Converting a Website to a Mobile App", href: "#" },
//             { labelKey: "Designing and Programming a Website", href: "#" },
//             { labelKey: "Programming a Website", href: "#" },
//             { labelKey: "Designing a Website", href: "#" },
//             { labelKey: "Developing an existing Website", href: "#" },
//             {
//                 labelKey: "Maintaining a Website and solving Software Issues",
//                 href: "#",
//             },
//         ],
//     },
//     {
//         labelKey: "Engineering",
//         dropdownItems: [
//             { labelKey: "Interior decoration design for a villa", href: "#" },
//             { labelKey: "Exterior design for a villa", href: "#" },
//             { labelKey: "Facade design for a residential building", href: "#" },
//             { labelKey: "Designing plans for a residential building", href: "#" },
//             {
//                 labelKey: "Interior decoration design for a commercial store",
//                 href: "#",
//             },
//             { labelKey: "Exterior design for a commercial project", href: "#" },
//             { labelKey: "Facade design for a commercial project", href: "#" },
//             { labelKey: "Designing plans for a commercial building", href: "#" },
//             { labelKey: "Interior decoration design for an apartment", href: "#" },
//             { labelKey: "Quantity surveying for a project", href: "#" },
//             { labelKey: "Engineering consultation", href: "#" },
//         ],
//     },
//     {
//         labelKey: "Design, Video & Audio",
//         dropdownItems: [
//             { labelKey: "Logo Design", href: "#" },
//             { labelKey: "Visual Identity Design", href: "#" },
//             { labelKey: "Redesign of Visual Identity", href: "#" },
//             { labelKey: "Voiceover", href: "#" },
//             { labelKey: "Motion Graphics Video Design", href: "#" },
//             { labelKey: "Intro/Outro Design for Videos", href: "#" },
//             { labelKey: "Marketing Image Design", href: "#" },
//             { labelKey: "Marketing Video Design", href: "#" },
//             { labelKey: "Video Editing", href: "#" },
//             { labelKey: "Resume Design", href: "#" },
//             { labelKey: "PowerPoint Design", href: "#" },
//             { labelKey: "UI/UX Design", href: "#" },
//             { labelKey: "Landing Page Design", href: "#" },
//             { labelKey: "Mobile App Design", href: "#" },
//             { labelKey: "Design Consultation", href: "#" },
//         ],
//     },

//     {
//         labelKey: "Writing & translation",
//         dropdownItems: [
//             { labelKey: "Article Writing", href: "#" },
//             { labelKey: "SEO-Optimized Article Writing", href: "#" },
//             { labelKey: "Writing Company Profiles", href: "#" },
//             { labelKey: "Content Translation", href: "#" },
//             { labelKey: "Marketing Content Writing", href: "#" },
//             { labelKey: "Script Writing", href: "#" },
//             { labelKey: "Product Description Writing", href: "#" },
//             { labelKey: "Resume Writing", href: "#" },
//             { labelKey: "Text Content Summarization", href: "#" },
//             { labelKey: "Audio Podcast Summarization", href: "#" },
//             { labelKey: "Video Lecture Summarization", href: "#" },
//             { labelKey: "Editorial Consultation", href: "#" },
//         ],
//     },
//     {
//         labelKey: "Data Entry",
//         dropdownItems: [
//             { labelKey: "Data Entry", href: "#" },
//             { labelKey: "Customer Service", href: "#" },
//             { labelKey: "Transcription of Files or Lectures", href: "#" },
//             { labelKey: "Transcription of Video Files or Podcasts", href: "#" },
//             { labelKey: "Secretarial or Virtual Assistant", href: "#" },
//             { labelKey: "Uploading Products to an Online Store", href: "#" },
//             { labelKey: "Technical Support Consultation", href: "#" },
//         ],
//     },
//     {
//         labelKey: "Training & Education",
//         dropdownItems: [
//             { labelKey: "Creating a Course or Training Package", href: "#" },
//             { labelKey: "Training on a Software Program", href: "#" },
//             { labelKey: "Explaining a Subject or Curriculum", href: "#" },
//             { labelKey: "Language Learning", href: "#" },
//             { labelKey: "Explaining a Programming Language", href: "#" },
//             { labelKey: "Educational Consultation", href: "#" },
//         ],
//     },
// ];

// const Home = () => {
//     const heroData = [
//         {
//             heading: "Get in Touch and Start Your Project today ,,",
//             subText: "All Your buisiness needs and freelance will be here .",
//             imageSrc: photo,
//         },
//     ];

//     const [openDropdownLabel, setOpenDropdownLabel] = useState<string | null>(
//         null
//     );

//     const handleMouseEnter = (labelKey: string) => {
//         setOpenDropdownLabel(labelKey);
//     };

//     const handleMouseLeave = () => {
//         setOpenDropdownLabel(null);
//     };

//     interface CategoryCardProps {
//         image: string;
//         altText: string;
//         categoryName: string;
//     }

//     const CategoryCard: React.FC<CategoryCardProps> = ({
//         image,
//         altText,
//         categoryName,
//     }) => {
//         return (
//             <div className="relative rounded-xl overflow-hidden shadow-md w-60 h-64 group flex-none">
//                 <img
//                     src={image}
//                     alt={altText}
//                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                     <span className="text-white text-xl font-semibold text-center p-4 text-shadow-md">
//                         {translate(categoryName)}
//                     </span>
//                 </div>
//             </div>
//         );
//     };

//     const carouselRef = useRef<HTMLDivElement>(null);

//     const scrollAmount = 250;

//     const scrollNext = () => {
//         if (carouselRef.current) {
//             carouselRef.current.scrollLeft += scrollAmount;
//         }
//     };

//     const scrollPrev = () => {
//         if (carouselRef.current) {
//             carouselRef.current.scrollLeft -= scrollAmount;
//         }
//     };

//     const [language, setLanguage] = useState<'en' | 'ar'>(
//         localStorage.getItem('language') === 'ar' ? 'ar' : 'en'
//     );

//     const translations = {
//         en: {
//             "Digital marketing & sales": "Digital marketing & sales",
//             "Create a marketing plan": "Create a marketing plan",
//             "Execute an advertising campaign": "Execute an advertising campaign",
//             "Manage social media accounts": "Manage social media accounts",
//             "Manage an online store": "Manage an online store",
//             "Search engine optimization (SEO) for a website":
//                 "Search engine optimization (SEO) for a website",
//             "Marketing consultation": "Marketing consultation",
//             "Consulting": "Consulting",
//             "Feasibility study for a business project":
//                 "Feasibility study for a business project",
//             "Feasibility study for a website": "Feasibility study for a website",
//             "Data analysis using SPSS statistical software":
//                 "Data analysis using SPSS statistical software",
//             "Drafting terms and conditions and usage policies":
//                 "Drafting terms and conditions and usage policies",
//             "Business plan": "Business plan",
//             "Drafting a contract or agreement": "Drafting a contract or agreement",
//             "Reviewing an employment contract": "Reviewing an employment contract",
//             "Financial statements for a project": "Financial statements for a project",
//             "Market and competitor analysis": "Market and competitor analysis",
//             "Programming": "Programming",
//             "Designing an Excel Program": "Designing an Excel Program",
//             "Designing and Programming a New Mobile App":
//                 "Designing and Programming a New Mobile App",
//             "Programming a New Mobile App": "Programming a New Mobile App",
//             "Designing a New Mobile App": "Designing a New Mobile App",
//             "Adding Features to a Mobile App": "Adding Features to a Mobile App",
//             "Maintaining a Mobile App and Solving Software Issues":
//                 "Maintaining a Mobile App and Solving Software Issues",
//             "Converting a Website to a Mobile App":
//                 "Converting a Website to a Mobile App",
//             "Designing and Programming a Website":
//                 "Designing and Programming a Website",
//             "Programming a Website": "Programming a Website",
//             "Designing a Website": "Designing a Website",
//             "Developing an existing Website": "Developing an existing Website",
//             "Maintaining a Website and solving Software Issues":
//                 "Maintaining a Website and solving Software Issues",
//             "Engineering": "Engineering",
//             "Interior decoration design for a villa":
//                 "Interior decoration design for a villa",
//             "Exterior design for a villa": "Exterior design for a villa",
//             "Facade design for a residential building":
//                 "Facade design for a residential building",
//             "Designing plans for a residential building":
//                 "Designing plans for a residential building",
//             "Interior decoration design for a commercial store":
//                 "Interior decoration design for a commercial store",
//             "Exterior design for a commercial project":
//                 "Exterior design for a commercial project",
//             "Facade design for a commercial project":
//                 "Facade design for a commercial project",
//             "Designing plans for a commercial building":
//                 "Designing plans for a commercial building",
//             "Interior decoration design for an apartment":
//                 "Interior decoration design for an apartment",
//             "Quantity surveying for a project": "Quantity surveying for a project",
//             "Engineering consultation": "Engineering consultation",
//             "Design, Video & Audio": "Design, Video & Audio",
//             "Logo Design": "Logo Design",
//             "Visual Identity Design": "Visual Identity Design",
//             "Redesign of Visual Identity": "Redesign of Visual Identity",
//             "Voiceover": "Voiceover",
//             "Motion Graphics Video Design": "Motion Graphics Video Design",
//             "Intro/Outro Design for Videos": "Intro/Outro Design for Videos",
//             "Marketing Image Design": "Marketing Image Design",
//             "Marketing Video Design": "Marketing Video Design",
//             "Video Editing": "Video Editing",
//             "Resume Design": "Resume Design",
//             "PowerPoint Design": "PowerPoint Design",
//             "UI/UX Design": "UI/UX Design",
//             "Landing Page Design": "Landing Page Design",
//             "Mobile App Design": "Mobile App Design",
//             "Design Consultation": "Design Consultation",
//             "Writing & translation": "Writing & translation",
//             "Article Writing": "Article Writing",
//             "SEO-Optimized Article Writing": "SEO-Optimized Article Writing",
//             "Writing Company Profiles": "Writing Company Profiles",
//             "Content Translation": "Content Translation",
//             "Marketing Content Writing": "Marketing Content Writing",
//             "Script Writing": "Script Writing",
//             "Product Description Writing": "Product Description Writing",
//             "Resume Writing": "Resume Writing",
//             "Text Content Summarization": "Text Content Summarization",
//             "Audio Podcast Summarization": "Audio Podcast Summarization",
//             "Video Lecture Summarization": "Video Lecture Summarization",
//             "Editorial Consultation": "Editorial Consultation",
//             "Data Entry": "Data Entry",
//             "Customer Service": "Customer Service",
//             "Transcription of Files or Lectures":
//                 "Transcription of Files or Lectures",
//             "Transcription of Video Files or Podcasts":
//                 "Transcription of Video Files or Podcasts",
//             "Secretarial or Virtual Assistant": "Secretarial or Virtual Assistant",
//             "Uploading Products to an Online Store":
//                 "Uploading Products to an Online Store",
//             "Technical Support Consultation": "Technical Support Consultation",
//             "Training & Education": "Training & Education",
//             "Creating a Course or Training Package":
//                 "Creating a Course or Training Package",
//             "Training on a Software Program": "Training on a Software Program",
//             "Explaining a Subject or Curriculum":
//                 "Explaining a Subject or Curriculum",
//             "Language Learning": "Language Learning",
//             "Explaining a Programming Language":
//                 "Explaining a Programming Language",
//             "Educational Consultation": "Educational Consultation",
//             "About Us": "About Us",
//             "To Sum It Up For You ,,": "To Sum It Up For You ,,",
//             "Read more": "Read more",
//             "Join now": "Join now",
//             "Be a Freelancer with us ,,": "Be a Freelancer with us ,,",
//             "How To Add a Project": "How To Add a Project",
//             "Too Easy Steps on Worklink,,": "Too Easy Steps on Worklink,,",
//             "About worklink for companies": "About worklink for companies",
//             "Empower Your Projects with Top Freelancers Worklink connects your company with skilled freelancers to meet your needs.":
//                 "Empower Your Projects with Top Freelancers Worklink connects your company with skilled freelancers to meet your needs.",
//             "Access Top Talent: Discover professionals with the expertise you require.":
//                 "Access Top Talent: Discover professionals with the expertise you require.",
//             "Flexible Hiring Options: Choose from hourly, weekly, or monthly engagements.":
//                 "Flexible Hiring Options: Choose from hourly, weekly, or monthly engagements.",
//             "Streamlined Collaboration: Simplify project management and communication.":
//                 "Streamlined Collaboration: Simplify project management and communication.",
//             "Join Worklink and enhance your team with the best freelance talent available.":
//                 "Join Worklink and enhance your team with the best freelance talent available.",
//             "Search on Job": "Search on Job",
//             "Find professional freelancers in all fields":
//                 "Find professional freelancers in all fields",
//             "Get in Touch and Start Your Project today ,,":
//                 "Get in Touch and Start Your Project today ,,",
//             "All Your buisiness needs and freelance will be here .":
//                 "All Your buisiness needs and freelance will be here .",
//             "Enter The Title Of Project You Want To Emplement":
//                 "Enter The Title Of Project You Want To Emplement",
//             "Start Now": "Start Now",
//             "About1": "About Us"
//         },
//         ar: {
//             "Digital marketing & sales": "التسويق الرقمي والمبيعات",
//             "Create a marketing plan": "إنشاء خطة تسويقية",
//             "Execute an advertising campaign": "تنفيذ حملة إعلانية",
//             "Manage social media accounts": "إدارة حسابات وسائل التواصل الاجتماعي",
//             "Manage an online store": "إدارة متجر إلكتروني",
//             "Search engine optimization (SEO) for a website":
//                 "تحسين محركات البحث (SEO) لموقع ويب",
//             "Marketing consultation": "استشارة تسويقية",
//             "Consulting": "استشارات",
//             "Feasibility study for a business project":
//                 "دراسة جدوى لمشروع تجاري",
//             "Feasibility study for a website": "دراسة جدوى لموقع ويب",
//             "Data analysis using SPSS statistical software":
//                 "تحليل البيانات باستخدام برنامج SPSS الإحصائي",
//             "Drafting terms and conditions and usage policies":
//                 "صياغة الشروط والأحكام وسياسات الاستخدام",
//             "Business plan": "خطة عمل",
//             "Drafting a contract or agreement": "صياغة عقد أو اتفاقية",
//             "Reviewing an employment contract": "مراجعة عقد عمل",
//             "Financial statements for a project": "بيانات مالية لمشروع",
//             "Market and competitor analysis": "تحليل السوق والمنافسين",
//             "Programming": "برمجة",
//             "Designing an Excel Program": "تصميم برنامج إكسل",
//             "Designing and Programming a New Mobile App":
//                 "تصميم وبرمجة تطبيق جوال جديد",
//             "Programming a New Mobile App": "برمجة تطبيق جوال جديد",
//             "Designing a New Mobile App": "تصميم تطبيق جوال جديد",
//             "Adding Features to a Mobile App": "إضافة ميزات إلى تطبيق جوال",
//             "Maintaining a Mobile App and Solving Software Issues":
//                 "صيانة تطبيق جوال وحل مشاكل البرمجيات",
//             "Converting a Website to a Mobile App": "تحويل موقع ويب إلى تطبيق جوال",
//             "Designing and Programming a Website": "تصميم وبرمجة موقع ويب",
//             "Programming a Website": "برمجة موقع ويب",
//             "Designing a Website": "تصميم موقع ويب",
//             "Developing an existing Website": "تطوير موقع ويب موجود",
//             "Maintaining a Website and solving Software Issues":
//                 "صيانة موقع ويب وحل مشاكل البرمجيات",
//             "Engineering": "هندسة",
//             "Interior decoration design for a villa":
//                 "تصميم ديكور داخلي لفيلا",
//             "Exterior design for a villa": "تصميم خارجي لفيلا",
//             "Facade design for a residential building":
//                 "تصميم واجهة لمبنى سكني",
//             "Designing plans for a residential building":
//                 "تصميم مخططات لمبنى سكني",
//             "Interior decoration design for a commercial store":
//                 "تصميم ديكور داخلي لمتجر تجاري",
//             "Exterior design for a commercial project":
//                 "تصميم خارجي لمشروع تجاري",
//             "Facade design for a commercial project":
//                 "تصميم واجهة لمشروع تجاري",
//             "Designing plans for a commercial building":
//                 "تصميم مخططات لمبنى تجاري",
//             "Interior decoration design for an apartment":
//                 "تصميم ديكور داخلي لشقة",
//             "Quantity surveying for a project": "حساب كميات لمشروع",
//             "Engineering consultation": "استشارة هندسية",
//             "Design, Video & Audio": "تصميم وفيديو وصوت",
//             "Logo Design": "تصميم شعار",
//             "Visual Identity Design": "تصميم هوية بصرية",
//             "Redesign of Visual Identity": "إعادة تصميم هوية بصرية",
//             "Voiceover": "تعليق صوتي",
//             "Motion Graphics Video Design": "تصميم فيديو موشن جرافيك",
//             "Intro/Outro Design for Videos": "تصميم مقدمة/خاتمة للفيديوهات",
//             "Marketing Image Design": "تصميم صورة تسويقية",
//             "Marketing Video Design": "تصميم فيديو تسويقي",
//             "Video Editing": "تحرير الفيديو",
//             "Resume Design": "تصميم سيرة ذاتية",
//             "PowerPoint Design": "تصميم بوربوينت",
//             "UI/UX Design": "تصميم واجهة المستخدم/تجربة المستخدم",
//             "Landing Page Design": "تصميم صفحة هبوط",
//             "Mobile App Design": "تصميم تطبيق جوال",
//             "Design Consultation": "استشارة تصميم",
//             "Writing & translation": "كتابة وترجمة",
//             "Article Writing": "كتابة مقالات",
//             "SEO-Optimized Article Writing": "كتابة مقالات مُحسّنة لمحركات البحث",
//             "Writing Company Profiles": "كتابة ملفات تعريف الشركات",
//             "Content Translation": "ترجمة محتوى",
//             "Marketing Content Writing": "كتابة محتوى تسويقي",
//             "Script Writing": "كتابة سيناريو",
//             "Product Description Writing": "كتابة وصف المنتج",
//             "Resume Writing": "كتابة سيرة ذاتية",
//             "Text Content Summarization": "تلخيص محتوى نصي",
//             "Audio Podcast Summarization": "تلخيص بودكاست صوتي",
//             "Video Lecture Summarization": "تلخيص محاضرة فيديو",
//             "Editorial Consultation": "استشارة تحريرية",
//             "Data Entry": "إدخال بيانات",
//             "Customer Service": "خدمة العملاء",
//             "Transcription of Files or Lectures": "نسخ ملفات أو محاضرات",
//             "Transcription of Video Files or Podcasts":
//                 "نسخ ملفات فيديو أو بودكاست",
//             "Secretarial or Virtual Assistant": "سكرتارية أو مساعد افتراضي",
//             "Uploading Products to an Online Store": "تحميل المنتجات إلى متجر إلكتروني",
//             "Technical Support Consultation": "استشارة دعم فني",
//             "Training & Education": "تدريب وتعليم",
//             "Creating a Course or Training Package":
//                 "إنشاء دورة أو حزمة تدريبية",
//             "Training on a Software Program": "التدريب على برنامج برمجي",
//             "Explaining a Subject or Curriculum": "شرح مادة أو منهج دراسي",
//             "Language Learning": "تعلم لغات",
//             "Explaining a Programming Language": "شرح لغة برمجة",
//             "Educational Consultation": "استشارة تعليمية",
//             "About Us": "معلومات عنا",
//             "To Sum It Up For You ,,": "لأختصرها لك ,,",
//             "Read more": "اقرأ المزيد",
//             "Join now": "انضم الآن",
//             "Be a Freelancer with us ,,": "كن مستقلاً معنا ,,",
//             "How To Add a Project": "كيفية إضافة مشروع",
//             "Too Easy Steps on Worklink,,": "خطوات سهلة للغاية على ورك لينك ,,",
//             "About worklink for companies": "حول ورك لينك للشركات",
//             "Empower Your Projects with Top Freelancers Worklink connects your company with skilled freelancers to meet your needs.":
//                 "قم بتمكين مشاريعك مع أفضل المستقلينيعمل Worklnk على ربط شركتك بالموظفين المستقلين المهرة لتلبية احتياجاتك.",
//             "Access Top Talent: Discover professionals with the expertise you require.":
//                 "الوصول إلى أفضل المواهب: اكتشف محترفين يتمتعون بالخبرة التي تحتاجها.",
//             "Flexible Hiring Options: Choose from hourly, weekly, or monthly engagements.":
//                 "خيارات توظيف مرنة: اختر من بين الارتباطات بالساعة أو الأسبوعية أو الشهرية.",
//             "Streamlined Collaboration: Simplify project management and communication.":
//                 "تعاون مبسط: تبسيط إدارة المشاريع والتواصل.",
//             "Join Worklink and enhance your team with the best freelance talent available.":
//                 "انضم إلى work link وعزز فريقك بأفضل المواهب المستقلة المتاحة.",
//             "Search on Job": "البحث عن وظيفة",
//             "Find professional freelancers in all fields":
//                 "ابحث عن مستقلين محترفين في جميع المجالات",
//             "Get in Touch and Start Your Project today ,,": "تواصل معنا وابدأ مشروعك اليوم ,,",
//             "All Your buisiness needs and freelance will be here .":
//                 "جميع احتياجات عملك والمستقلين ستكون هنا.",
//                 "Start Now": "ابدأ الآن",
//             "Enter The Title Of Project You Want To Emplement": "أدخل عنوان المشروع الذي تريد تنفيذه",
//             "Web Design": "تصميم الويب",
//             "Translation": "الترجمة",
//             "Marketing": "التسويق",
//             "We connect freelancers with top digital and tech opportunities. Our platform simplifies the job search for talented professionals and helps companies find the best talent. We also offer a curated selection of freelance positions, tools for showcasing skills, and industry insights to help you succeed. Additionally, we have a section for quick services on our site to meet your needs more swiftly and effectively.": "حن نربط الموظفين المستقلين بأفضل الفرص الرقمية والتقنية. تعمل منصتنا على تبسيط عملية البحث عن عمل للمهنيين الموهوبين وتساعد الشركات في العثور على أفضل المواهب، كما نقدم أيضًا مجموعة مختارة من الوظائف المستقلة، وأدوات لعرض المهارات، ورؤى الصناعة لمساعدتك على النجاح.",
//             "About1": "معلومات عنا",
//             "Create your profile on Worklink to get started. Our simple registration process ensures you're up and running quickly. Fill out your profile with detailed information about your expertise, portfolio, and experience. Highlight what makes you unique to attract the right clients.": "قم بإنشاء ملف التعريف الخاص بك على Worklink للبدء. تضمن عملية التسجيل البسيطة لدينا أن تكون جاهزًا للعمل بسرعة، املأ ملفك الشخصي بمعلومات مفصلة حول خبرتك ومحفظتك وتجربتك. سلط الضوء على ما يجعلك فريدًا لجذب العملاء المناسبين.",
//             "You have your complete project that you would like to obtain through an independent company. Enter the details of the project, budget, and contractual period with who you wish to do so and share it for free. After that, the freelancers in the projects will see a page with you and they must choose the appropriate design for you to be independent and independent of the project.": "لديك مشروعك الكامل الذي ترغب بالحصول عليه من خلال شركة مستقلة. قم بإدخال تفاصيل المشروع والميزانية ومدة التعاقد مع من ترغب في ذلك ومشاركتها مجاناً. بعد ذلك ستظهر لك صفحة المستقلين في المشاريع ويجب عليهم اختيار التصميم المناسب لك لتكون مستقلاً ومستقلاً عن المشروع.",
//           },
//     };




    

//     const translate = (key: string) => {
//         return translations[language][key] || key;
//     };

//     const toggleLanguage = () => {
//         const newLanguage = language === 'en' ? 'ar' : 'en';
//         setLanguage(newLanguage);
//         localStorage.setItem('language', newLanguage);
//     };

//     const [isArabic, setIsArabic] = [
//         localStorage.getItem('language') === 'ar',
//     ];

//     return (
//         <div
//             className="scrollbar-hide overflow-hidden"
//             style={{ overflow: "hidden", overflowY: "hidden" }}
//             dir={language === 'ar' ? 'rtl' : 'ltr'} // Set dir attribute for RTL
//         >
//             <div
//                 className="overflow-hidden"
//                 style={{
//                     overflow: "hidden",
//                     overflowY: "hidden",
//                     msOverflowStyle: "none",
//                     scrollbarWidth: "none",
//                 }}
//             >
//                 <nav className=" bg-[#404040] mt-[2px] text-white z-50">
//                     <ul className="flex">
//                         {navCategories.map((category, index) => (
//                             <li
//                                 key={index}
//                                 onMouseEnter={() => handleMouseEnter(category.labelKey)}
//                                 onMouseLeave={handleMouseLeave}
//                                 className="relative z-10"
//                             >
//                                 <a
//                                     href="#"
//                                     className="block px-5 py-4 text-white hover:bg-[#404040] z-50"
//                                 >
//                                     {translate(category.labelKey)}
//                                 </a>
//                                 {openDropdownLabel === category.labelKey && (
//                                     <ul className="absolute left-0 mt-0 w-64 bg-[#404040] shadow-md z-50">
//                                         {category.dropdownItems.map((item, itemIndex) => (
//                                             <li
//                                                 key={itemIndex}
//                                                 className="border-b border-gray-700 last:border-b-0"
//                                             >
//                                                 <a
//                                                     href={item.href}
//                                                     className="block px-5 py-3 text-white hover:bg-gray-700"
//                                                 >
//                                                     {translate(item.labelKey)}
//                                                 </a>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 )}
//                             </li>
//                         ))}
//                         <li>
//                             <button
//                                 onClick={toggleLanguage}
//                                 className="block px-5 py-4 text-white hover:bg-[#404040] z-50"
//                             >
//                                 {language === "en" ? "عربي" : "English"}
//                             </button>
//                         </li>
//                     </ul>
//                 </nav>

//                 <div className="overflow-hidden">
//                     {heroData.map((hero, index) => (
//                         <div
//                             key={index}
//                             className="relative bg-white font-sans mb-20 -z-50"
//                         >
//                             <div className="absolute top-10 inset-inline-start-10"> {/* Changed left-10 to inset-inline-start-10 */}
//                                 <div className="w-4 h-4 border border-orange-500 rounded-full"></div>
//                             </div>
//                             <div className="absolute top-20 inset-inline-start-5"> {/* Changed left-5 to inset-inline-start-5 */}
//                                 <div className="w-4 h-4 border border-orange-500 rounded-full"></div>
//                             </div>
//                             <div className="absolute top-32 inset-inline-start-12"> {/* Changed left-12 to inset-inline-start-12 */}
//                                 <div className="w-4 h-4 border border-orange-500 rounded-full"></div>
//                             </div>
//                             <div className="absolute top-12 inset-inline-start-20"> {/* Changed left-20 to inset-inline-start-20 */}
//                                 <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
//                             </div>
//                             <div className="absolute top-28 inset-inline-start-24"> {/* Changed left-24 to inset-inline-start-24 */}
//                                 <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
//                             </div>
//                             <div className="absolute top-40 inset-inline-start-18"> {/* Changed left-18 to inset-inline-start-18 */}
//                                 <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
//                             </div>
//                             <div className="container mx-auto px-6 py-24 flex justify-center">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
//                                     <div className="relative z-10 mt-12 md:mt-24">
//                                         <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
//                                             {translate(hero.heading)}
//                                         </h1>
//                                         <p className="text-gray-600 text-lg mb-10">
//                                             {translate(hero.subText)}
//                                         </p>
//                                         <div className="flex">
//                                             <input
//                                                 type="text"
//                                                 placeholder={translate(
//                                                     "Enter The Title Of Project You Want To Emplement"
//                                                 )}
//                                                 className="w-full md:w-auto px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-orange-500"
//                                             />
//                                             <button className="bg-orange-500 text-white px-8 py-3 rounded-md ms-3 hover:bg-orange-600 focus:outline-none"> {/* Changed ml-3 to ms-3 */}
//                                                 {translate("Start Now")}
//                                             </button>
//                                         </div>
//                                     </div>

//                                     <div className="relative  overflow-hidden pe-10 pt-10  top-[-100px] w-[900px]    h-[600px]"> {/* Changed pr-10 to pe-10 */}
//                                         <div className="absolute   ms-[100px] inset-0  h-full bg-black rotate-[330deg] top-[-150px] inset-inline-end-[50px] w-[700px] rounded-3xl overflow-hidden "> {/* Changed ml-[100px] to ms-[100px] and right-[50px] to inset-inline-end-[50px] */}
//                                             <img
//                                                 src={hero.imageSrc}
//                                                 alt="Hero Image"
//                                                 className="top-[100px] absolute inset-0 w-full h-full object-cover "
//                                             />
//                                         </div>

//                                         <div className="relative top-[350px] inset-inline-end-[-200px]"> {/* Changed left-[-200px] to inset-inline-end-[-200px] */}
//                                             <div className="absolute inset-inline-end-[90px] top-[60px] w-4 h-4 border border-orange-500 rounded-full"></div> {/* Changed right-[90px] to inset-inline-end-[90px] */}
//                                             <div className="absolute inset-inline-end-[-10px] top-[60px] w-4 h-4 border border-orange-500 rounded-full"></div> {/* Changed right-[-10px] to inset-inline-end-[-10px] */}
//                                             <div className="absolute inset-inline-end-[-100px] top-[60px] w-4 h-4 border border-orange-500 rounded-full"></div> {/* Changed right-[-100px] to inset-inline-end-[-100px] */}

//                                             <div className="absolute inset-inline-end-[40px] top-[80px] w-4 h-4 border border-gray-400 rounded-full"></div> {/* Changed right-[40px] to inset-inline-end-[40px] */}
//                                             <div className="absolute inset-inline-end-[-10px] top-[80px] w-4 h-4 border border-gray-400 rounded-full"></div> {/* Changed right-[-10px] to inset-inline-end-[-10px] */}
//                                             <div className="absolute inset-inline-end-[-50px] top-[80px] w-4 h-4 border border-gray-400 rounded-full"></div> {/* Changed right-[-50px] to inset-inline-end-[-50px] */}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="flex justify-center mb-16">
//                                 <button className="bg-gray-700 text-white px-12 py-3 rounded-md hover:bg-gray-800 focus:outline-none">
//                                     {translate("Search on Job")}
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="font-sans bg-gray-50">
//                     <section className="py-16">
//                         <div className="container mx-auto px-6">
//                             <h2 className="text-5xl font-bold text-gray-800 text-center mb-8">
//                                 {translate("Find professional freelancers in all fields")}
//                             </h2>
//                             <div className="flex gap-11 justify-between items-center mb-6">
//                                 <div>
//                                     <button
//                                         onClick={scrollPrev}
//                                         className="rounded-full bg-gray-100 hover:bg-gray-200 p-2"
//                                         aria-label="Previous Categories"
//                                     >
//                                         <svg
//                                             className="w-6 h-6"
//                                             fill="none"
//                                             stroke="currentColor"
//                                             viewBox="0 0 24 24"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth="2"
//                                                 d="M15 19l-7-7 7-7"
//                                             ></path>
//                                         </svg>
//                                     </button>
//                                 </div>

//                                 <div
//                                     className="category-carousel flex overflow-x-scroll scroll-smooth gap-4 pb-4 "
//                                     ref={carouselRef}
//                                 >
//                                     <CategoryCard
//                                         image={marketingImage}
//                                         altText="Marketing"
//                                         categoryName={translate("Marketing")}
//                                     />
//                                     <CategoryCard
//                                         image={videoEditingImage}
//                                         altText="Video Editing"
//                                         categoryName={translate("Video Editing")}
//                                     />
//                                     <CategoryCard
//                                         image={translationImage}
//                                         altText="Translation"
//                                         categoryName={translate("Translation")}
//                                     />
//                                     <CategoryCard
//                                         image={webDesignImage}
//                                         altText="Web Design"
//                                         categoryName={translate("Web Design")}
//                                     />
//                                     <CategoryCard
//                                         image={consulting}
//                                         altText="Consulting"
//                                         categoryName={translate("Consulting")}
//                                     />
//                                     <CategoryCard
//                                         image={programing}
//                                         altText="Programming"
//                                         categoryName={translate("Programming")}
//                                     />
//                                     <CategoryCard
//                                         image={engineering}
//                                         altText="Engineering"
//                                         categoryName={translate("Engineering")}
//                                     />
//                                     <CategoryCard
//                                         image={traning}
//                                         altText="Training & Education"
//                                         categoryName={translate("Training & Education")}
//                                     />
//                                 </div>
//                                 <div>
//                                     <button
//                                         onClick={scrollNext}
//                                         className="rounded-full bg-gray-100 hover:bg-gray-200 p-2"
//                                         aria-label="Next Categories"
//                                     >
//                                         <svg
//                                             className="w-6 h-6"
//                                             fill="none"
//                                             stroke="currentColor"
//                                             viewBox="0 0 24 24"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth="2"
//                                                 d="M9 5l7 7-7 7"
//                                             ></path>
//                                         </svg>
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>

//                     <section className=" py-20">
//                         <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//                             <div className="text-[#151515]">
//                                 <div className="flex rounded-3xl gap-2 overflow-hidden mb-6">
//                                     <button className=" bg-[#E87330] text-white w-[350px] rounded-3xl px-6 py-3 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
//                                         <div className="me-16 flex text-start rounded-3xl"> {/* Changed mr-16 to me-16 and text-left to text-start */}
//                                             <span className="text-5xl">
//                                                 {translate("About1")}
//                                                 <br />
//                                                 {/* <div className="pt-2"> {translate("Us")}</div> */}
//                                             </span>
//                                         </div>
//                                     </button>

//                                     <div className="rounded-3xl overflow-hidden">
//                                         <img
//                                             src={photo}
//                                             alt="About Us 1"
//                                             className="w-full h-64 object-cover"
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="rounded-3xl overflow-hidden">
//                                     <img
//                                         src={howToAddAProject}
//                                         alt="About Us 2"
//                                         className="w-full h-64 object-cover"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="text-[#151515]">
//                                 <h2 className="text-3xl font-semibold mb-4">
//                                     {translate("To Sum It Up For You ,,")}
//                                 </h2>
//                                 <p className="text-[#151515] mb-8">
//                                     {translate(
//                                         "We connect freelancers with top digital and tech opportunities. Our platform simplifies the job search for talented professionals and helps companies find the best talent. We also offer a curated selection of freelance positions, tools for showcasing skills, and industry insights to help you succeed. Additionally, we have a section for quick services on our site to meet your needs more swiftly and effectively."
//                                     )}
//                                 </p>
//                                 <div className="flex space-x-4 gap-5">
//                                     <Link
//                                         to="/AboutUsPage"
//                                         className="flex items-center bg-transparent border border-orange-500 text-orange-500 px-6 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-300"
//                                     >
//                                         {translate("Read more")}
//                                         {/* <FaArrowRight className="ms-2" /> Changed ml-2 to ms-2 */}
//                                         {isArabic ? 
//                                       (
//                                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M20 11L7.83 11L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13L20 13V11Z" fill="#B44E14"/>
//   </svg>
//                                       )  : (
//                                         <FaArrowRight className="ms-2" />

//                                       )
//                                       }
//                                     </Link>
//                                     <Link
//                                         to="/AboutUsPage"
//                                         className="flex items-center bg-orange-500 text-white px-8 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300"
//                                     >
//                                         {translate("Join now")}
//                                         {/* <FaArrowRight className="ms-2" /> Changed ml-2 to ms-2 */}
//                                         {isArabic ? 
//                                       (
//                                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M20 11L7.83 11L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13L20 13V11Z" fill="#B44E14"/>
//   </svg>
//                                       )  : (
//                                         <FaArrowRight className="ms-2" />

//                                       )
//                                       }
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>

//                     <section className="py-20">
//                         <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//                             <div>
//                                 <h2 className="text-4xl font-bold text-gray-800 mb-6">
//                                     {translate("Be a Freelancer with us ,,")}
//                                 </h2>
//                                 <p className="text-gray-600 mb-8">
//                                     {translate(
//                                         "Create your profile on Worklink to get started. Our simple registration process ensures you're up and running quickly. Fill out your profile with detailed information about your expertise, portfolio, and experience. Highlight what makes you unique to attract the right clients."
//                                     )}
//                                 </p>
//                                 <div className="flex space-x-4 gap-5">
//                                     <Link
//                                         to="/HowToBeFreelancerPage"
//                                         className="flex items-center bg-transparent border border-orange-500 text-orange-500 px-6 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-300"
//                                     >
//                                         {translate("Read more")}
//                                         {isArabic ? 
//                                       (
//                                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M20 11L7.83 11L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13L20 13V11Z" fill="#B44E14"/>
//   </svg>
//                                       )  : (
//                                         <FaArrowRight className="ms-2" />

//                                       )
//                                       }

                                          
//                                     </Link>
//                                     <Link
//                                         to="/HowToBeFreelancerPage"
//                                         className="flex items-center bg-orange-500 text-white px-8 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300"
//                                     >
//                                         {translate("Join now")}
//                                         {/* <FaArrowRight className="ms-2" /> Changed ml-2 to ms-2 */}
//                                         {isArabic ? 
//                                       (
//                                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M20 11L7.83 11L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13L20 13V11Z" fill="#B44E14"/>
//   </svg>
//                                       )  : (
//                                         <FaArrowRight className="ms-2" />

//                                       )
//                                       }
//                                     </Link>
//                                 </div>
//                             </div>
//                             <div>
//                             <div className="flex rounded-3xl gap-2 overflow-hidden mb-6">

//                             <div className="rounded-3xl overflow-hidden">
//                                         <img
//                                             src={photo}
//                                             alt="About Us 1"
//                                             className="w-full h-64 object-cover"
//                                         />
//                                     </div>

//                                     <button className=" bg-[#404040] text-white w-[350px] rounded-3xl px-6 py-3 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
//                                         <div className="me-16 flex text-start rounded-3xl"> {/* Changed mr-16 to me-16 and text-left to text-start */}
//                                             <span className="text-5xl">
//                                                 {translate("About1")}
//                                                 <br />
//                                                 {/* <div className="pt-2"> {translate("Us")}</div> */}
//                                             </span>
//                                         </div>
//                                     </button>

                                    
//                                 </div>
//                                 <div className="rounded-3xl overflow-hidden">
//                                     <img
//                                         src={howToAddAProject}
//                                         alt="Freelancer 2"
//                                         className="w-full h-64 object-cover"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </section>

//                     <div className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
//                         <div className="flex flex-col">
//                             {/* <div className="flex gap-5 p-2">
//                                 <div className="flex justify-start  pt-10 bg-[#262626] text-white p-6 w-[400px] rounded-3xl">
//                                     <h2 className="text-4xl font-semibold ">
//                                         {translate("How To Add a Project")}
//                                     </h2>
//                                 </div>
//                                 <img
//                                     src={photo}
//                                     alt="Project Image 1"
//                                     className="rounded-3xl"
//                                 />
//                             </div> */}
//                             <div className="flex rounded-3xl gap-2 overflow-hidden mb-6">

// <div className="rounded-3xl overflow-hidden">
//             <img
//                 src={photo}
//                 alt="About Us 1"
//                 className="w-full h-64 object-cover"
//             />
//         </div>

//         <button className=" bg-[#E87330] text-white w-[350px] rounded-3xl px-6 py-3 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
//             <div className="me-16 flex text-start rounded-3xl"> {/* Changed mr-16 to me-16 and text-left to text-start */}
//                 <span className="text-5xl">
//                     {translate("About1")}
//                     <br />
//                     {/* <div className="pt-2"> {translate("Us")}</div> */}
//                 </span>
//             </div>
//         </button>

        
//     </div>

//                             <div className="grid grid-cols-1">
//                                 <img
//                                     src={howToAddAProject}
//                                     alt="Project Image 2"
//                                     className="rounded-xl w-full h-[200px]"
//                                 />
//                             </div>
//                         </div>

//                         <div className="flex flex-col justify-center">
//                             <h2 className="text-3xl font-bold mb-4">
//                                 {translate("Too Easy Steps on Worklink,,")}
//                             </h2>
//                             <p className="text-gray-700 mb-6">
//                                 {translate(
//                                     "You have your complete project that you would like to obtain through an independent company. Enter the details of the project, budget, and contractual period with who you wish to do so and share it for free. After that, the freelancers in the projects will see a page with you and they must choose the appropriate design for you to be independent and independent of the project."
//                                 )}
//                             </p>
//                             <div className="flex space-x-4 gap-5">
//                                 <Link
//                                     to="/HowToAddProjectPage"
//                                     className="flex items-center bg-transparent border border-orange-500 text-orange-500 px-6 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-300"
//                                 >
//                                     {translate("Read more")}
//                                     {/* <FaArrowRight className="ms-2" /> Changed ml-2 to ms-2 */}
//                                     {isArabic ? 
//                                       (
//                                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M20 11L7.83 11L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13L20 13V11Z" fill="#B44E14"/>
//   </svg>
//                                       )  : (
//                                         <FaArrowRight className="ms-2" />

//                                       )
//                                       }
//                                 </Link>
//                                 <Link
//                                     to="/HowToAddProjectPage"
//                                     className="flex items-center bg-orange-500 text-white px-8 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300"
//                                 >
//                                     {translate("Join now")}
//                                     {/* <FaArrowRight className="ms-2" /> Changed ml-2 to ms-2 */}
//                                     {isArabic ? 
//                                       (
//                                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M20 11L7.83 11L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13L20 13V11Z" fill="#B44E14"/>
//   </svg>
//                                       )  : (
//                                         <FaArrowRight className="ms-2" />

//                                       )
//                                       }
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex items-center justify-center">
//                         <div className="p-2">
//                             <hr className="h-[3px] w-[300px] bg-black " />
//                         </div>
//                     </div>
//                     <div className="flex items-center justify-center">
//                         <hr className="h-[5px] w-[600px] bg-black" />
//                     </div>

//                     <div className="container mx-auto py-12">
//                         <div className="flex items-center justify-center mb-8">
//                             <h2 className="text-3xl font-bold mx-4">
//                                 {translate("About worklink for companies")}
//                             </h2>
//                         </div>

//                         <div className="grid md:grid-cols-2 gap-8">
//                             <div>
//                                 <img
//                                     src={aboutWorkLink}
//                                     alt="Company Section"
//                                     className="rounded-lg w-full"
//                                 />
//                             </div>

//                             <div className="flex flex-col justify-center">
//                                 <h3 className="text-xl font-semibold mb-4">
//                                     {translate(
//                                         "Empower Your Projects with Top Freelancers Worklink connects your company with skilled freelancers to meet your needs."
//                                     )}
//                                 </h3>
//                                 <ul className="mb-6 space-y-2">
//                                     <li className="flex items-center">
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             viewBox="0 0 20 20"
//                                             fill="currentColor"
//                                             className="w-5 h-5 text-green-500 me-2" // Changed mr-2 to me-2
//                                         >
//                                             <path
//                                                 fillRule="evenodd"
//                                                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.08.022L7.75 9.44l-2.97-2.97a.75.75 0 00-1.06 1.06l3.5 3.5a.75.75 0 001.08-.022l7.143-7.146a.75.75 0 00-.023-1.059z"
//                                                 clipRule="evenodd"
//                                             />
//                                         </svg>
//                                         <span>
//                                             {translate(
//                                                 "Access Top Talent: Discover professionals with the expertise you require."
//                                             )}
//                                         </span>
//                                     </li>
//                                     <li className="flex items-center">
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             viewBox="0 0 20 20"
//                                             fill="currentColor"
//                                             className="w-5 h-5 text-green-500 me-2" // Changed mr-2 to me-2
//                                         >
//                                             <path
//                                                 fillRule="evenodd"
//                                                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.08.022L7.75 9.44l-2.97-2.97a.75.75 0 00-1.06 1.06l3.5 3.5a.75.75 0 001.08-.022l7.143-7.146a.75.75 0 00-.023-1.059z"
//                                                 clipRule="evenodd"
//                                             />
//                                         </svg>
//                                         <span>
//                                             {translate(
//                                                 "Flexible Hiring Options: Choose from hourly, weekly, or monthly engagements."
//                                             )}
//                                         </span>
//                                     </li>
//                                     <li className="flex items-center">
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             viewBox="0 0 20 20"
//                                             fill="currentColor"
//                                             className="w-5 h-5 text-green-500 me-2" // Changed mr-2 to me-2
//                                         >
//                                             <path
//                                                 fillRule="evenodd"
//                                                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.08.022L7.75 9.44l-2.97-2.97a.75.75 0 00-1.06 1.06l3.5 3.5a.75.75 0 001.08-.022l7.143-7.146a.75.75 0 00-.023-1.059z"
//                                                 clipRule="evenodd"
//                                             />
//                                         </svg>
//                                         <span>
//                                             {translate(
//                                                 "Streamlined Collaboration: Simplify project management and communication."
//                                             )}
//                                         </span>
//                                     </li>
//                                 </ul>
//                                 <p className="text-gray-700 mb-6">
//                                     {translate(
//                                         "Join Worklink and enhance your team with the best freelance talent available."
//                                     )}
//                                 </p>
//                                 <div className="flex space-x-4 gap-5">
//                                     <Link
//                                         to="/ServicesPolicyPage"
//                                         className="flex items-center bg-transparent border border-orange-500 text-orange-500 px-6 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-300"
//                                     >
//                                         {translate("Read more")}
//                                         {/* <FaArrowRight className="ms-2 " /> Changed ml-2 to ms-2 */}
//                                         {isArabic ? 
//                                       (
//                                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M20 11L7.83 11L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13L20 13V11Z" fill="#B44E14"/>
//   </svg>
//                                       )  : (
//                                         <FaArrowRight className="ms-2" />

//                                       )
//                                       }
//                                     </Link>
//                                     <Link
//                                         to="/ServicesPolicyPage"
//                                         className="flex items-center bg-orange-500 text-white px-8 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300"
//                                     >
//                                         {translate("Join now")}
//                                         {/* <FaArrowRight className="ms-2" /> Changed ml-2 to ms-2 */}
//                                         {isArabic ? 
//                                       (
//                                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M20 11L7.83 11L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13L20 13V11Z" fill="#B44E14"/>
//   </svg>
//                                       )  : (
//                                         <FaArrowRight className="ms-2" />

//                                       )
//                                       }
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex items-center justify-center ">
//                         <div className="p-2">
//                             <hr className="h-[3px] w-[300px] bg-black " />
//                         </div>
//                     </div>
//                     <div className="flex items-center justify-center pb-10">
//                         <hr className="h-[5px] w-[600px] bg-black" />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;
























import { FaArrowRight } from "react-icons/fa";
import photo from "../assets/Rectangle 4.png";
import { useEffect, useRef, useState } from "react";
import howToAddAProject from "../assets/Rectangle 13.png";
import aboutWorkLink from "../assets/Rectangle 1153.png";
import marketingImage from "../assets/marketing.png";
import videoEditingImage from "../assets/videoEditing.png";
import translationImage from "../assets/translate.png";
import webDesignImage from "../assets/webDesign.png";
import consulting from "../assets/consulting.png";
import programing from "../assets/programing.png";
import engineering from "../assets/engineering.png";
import traning from "../assets/traning.png";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

interface DropdownItem {
    labelKey: string;
    href: string;
}

interface NavCategory {
    labelKey: string;
    dropdownItems: DropdownItem[];
}

const navCategories: NavCategory[] = [
    {
        labelKey: "Digital marketing & sales",
        dropdownItems: [
            { labelKey: "Create a marketing plan", href: "#" },
            { labelKey: "Execute an advertising campaign", href: "#" },
            { labelKey: "Manage social media accounts", href: "#" },
            { labelKey: "Manage an online store", href: "#" },
            { labelKey: "Search engine optimization (SEO) for a website", href: "#" },
            { labelKey: "Marketing consultation", href: "#" },
        ],
    },
    {
        labelKey: "Consulting",
        dropdownItems: [
            { labelKey: "Feasibility study for a business project", href: "#" },
            { labelKey: "Feasibility study for a website", href: "#" },
            { labelKey: "Data analysis using SPSS statistical software", href: "#" },
            {
                labelKey: "Drafting terms and conditions and usage policies",
                href: "#",
            },
            { labelKey: "Business plan", href: "#" },
            { labelKey: "Drafting a contract or agreement", href: "#" },
            { labelKey: "Reviewing an employment contract", href: "#" },
            { labelKey: "Financial statements for a project", href: "#" },
            { labelKey: "Market and competitor analysis", href: "#" },
        ],
    },
    {
        labelKey: "Programming",
        dropdownItems: [
            { labelKey: "Designing an Excel Program", href: "#" },
            { labelKey: "Designing and Programming a New Mobile App", href: "#" },
            { labelKey: "Programming a New Mobile App", href: "#" },
            { labelKey: "Designing a New Mobile App", href: "#" },
            { labelKey: "Adding Features to a Mobile App", href: "#" },
            {
                labelKey: "Maintaining a Mobile App and Solving Software Issues",
                href: "#",
            },
            { labelKey: "Converting a Website to a Mobile App", href: "#" },
            { labelKey: "Designing and Programming a Website", href: "#" },
            { labelKey: "Programming a Website", href: "#" },
            { labelKey: "Designing a Website", href: "#" },
            { labelKey: "Developing an existing Website", href: "#" },
            {
                labelKey: "Maintaining a Website and solving Software Issues",
                href: "#",
            },
        ],
    },
    {
        labelKey: "Engineering",
        dropdownItems: [
            { labelKey: "Interior decoration design for a villa", href: "#" },
            { labelKey: "Exterior design for a villa", href: "#" },
            { labelKey: "Facade design for a residential building", href: "#" },
            { labelKey: "Designing plans for a residential building", href: "#" },
            {
                labelKey: "Interior decoration design for a commercial store",
                href: "#",
            },
            { labelKey: "Exterior design for a commercial project", href: "#" },
            { labelKey: "Facade design for a commercial project", href: "#" },
            { labelKey: "Designing plans for a commercial building", href: "#" },
            { labelKey: "Interior decoration design for an apartment", href: "#" },
            { labelKey: "Quantity surveying for a project", href: "#" },
            { labelKey: "Engineering consultation", href: "#" },
        ],
    },
    {
        labelKey: "Design, Video & Audio",
        dropdownItems: [
            { labelKey: "Logo Design", href: "#" },
            { labelKey: "Visual Identity Design", href: "#" },
            { labelKey: "Redesign of Visual Identity", href: "#" },
            { labelKey: "Voiceover", href: "#" },
            { labelKey: "Motion Graphics Video Design", href: "#" },
            { labelKey: "Intro/Outro Design for Videos", href: "#" },
            { labelKey: "Marketing Image Design", href: "#" },
            { labelKey: "Marketing Video Design", href: "#" },
            { labelKey: "Video Editing", href: "#" },
            { labelKey: "Resume Design", href: "#" },
            { labelKey: "PowerPoint Design", href: "#" },
            { labelKey: "UI/UX Design", href: "#" },
            { labelKey: "Landing Page Design", href: "#" },
            { labelKey: "Mobile App Design", href: "#" },
            { labelKey: "Design Consultation", href: "#" },
        ],
    },

    {
        labelKey: "Writing & translation",
        dropdownItems: [
            { labelKey: "Article Writing", href: "#" },
            { labelKey: "SEO-Optimized Article Writing", href: "#" },
            { labelKey: "Writing Company Profiles", href: "#" },
            { labelKey: "Content Translation", href: "#" },
            { labelKey: "Marketing Content Writing", href: "#" },
            { labelKey: "Script Writing", href: "#" },
            { labelKey: "Product Description Writing", href: "#" },
            { labelKey: "Resume Writing", href: "#" },
            { labelKey: "Text Content Summarization", href: "#" },
            { labelKey: "Audio Podcast Summarization", href: "#" },
            { labelKey: "Video Lecture Summarization", href: "#" },
            { labelKey: "Editorial Consultation", href: "#" },
        ],
    },
    {
        labelKey: "Data Entry",
        dropdownItems: [
            { labelKey: "Data Entry", href: "#" },
            { labelKey: "Customer Service", href: "#" },
            { labelKey: "Transcription of Files or Lectures", href: "#" },
            { labelKey: "Transcription of Video Files or Podcasts", href: "#" },
            { labelKey: "Secretarial or Virtual Assistant", href: "#" },
            { labelKey: "Uploading Products to an Online Store", href: "#" },
            { labelKey: "Technical Support Consultation", href: "#" },
        ],
    },
    {
        labelKey: "Training & Education",
        dropdownItems: [
            { labelKey: "Creating a Course or Training Package", href: "#" },
            { labelKey: "Training on a Software Program", href: "#" },
            { labelKey: "Explaining a Subject or Curriculum", href: "#" },
            { labelKey: "Language Learning", href: "#" },
            { labelKey: "Explaining a Programming Language", href: "#" },
            { labelKey: "Educational Consultation", href: "#" },
        ],
    },
];

const Home = () => {

    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    
    // const [searchQuery, setSearchQuery] = useState(""); // Ensure state is defined

    const navigate = useNavigate()

    const heroData = [
        {
            heading: "Get in Touch and Start Your Project today ,,",
            subText: "All Your buisiness needs and freelance will be here .",
            imageSrc: photo,
        },
    ];

    const [openDropdownLabel, setOpenDropdownLabel] = useState<string | null>(
        null
    );

    const handleMouseEnter = (labelKey: string) => {
        setOpenDropdownLabel(labelKey);
    };

    const handleMouseLeave = () => {
        setOpenDropdownLabel(null);
    };

    interface CategoryCardProps {
        image: string;
        altText: string;
        categoryName: string;
    }

    const CategoryCard: React.FC<CategoryCardProps> = ({
        image,
        altText,
        categoryName,
    }) => {
        return (
            <div className="relative rounded-xl overflow-hidden shadow-md w-60 h-64 group flex-none sm:w-48 sm:h-52 md:w-56 md:h-60 lg:w-60 lg:h-64">
                <img
                    src={image}
                    alt={altText}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <span className="text-white text-xl font-semibold text-center p-4 text-shadow-md sm:text-lg md:text-xl">
                        {translate(categoryName)}
                    </span>
                </div>
            </div>
        );
    };

    const carouselRef = useRef<HTMLDivElement>(null);

    const scrollAmount = 250;

    const scrollNext = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft += scrollAmount;
        }
    };

    const scrollPrev = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft -= scrollAmount;
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/react/ControlPanel'); // Ensure this path matches your route configuration
        }
    }, [navigate]);

    const language = localStorage.getItem('language') === 'ar' ? 'ar' : 'en'
    

    const translations = {
        en: {
            "Digital marketing & sales": "Digital marketing & sales",
            "Create a marketing plan": "Create a marketing plan",
            "Execute an advertising campaign": "Execute an advertising campaign",
            "Manage social media accounts": "Manage social media accounts",
            "Manage an online store": "Manage an online store",
            "Search engine optimization (SEO) for a website":
                "Search engine optimization (SEO) for a website",
            "Marketing consultation": "Marketing consultation",
            "Consulting": "Consulting",
            "Feasibility study for a business project":
                "Feasibility study for a business project",
            "Feasibility study for a website": "Feasibility study for a website",
            "Data analysis using SPSS statistical software":
                "Data analysis using SPSS statistical software",
            "Drafting terms and conditions and usage policies":
                "Drafting terms and conditions and usage policies",
            "Business plan": "Business plan",
            "Drafting a contract or agreement": "Drafting a contract or agreement",
            "Reviewing an employment contract": "Reviewing an employment contract",
            "Financial statements for a project": "Financial statements for a project",
            "Market and competitor analysis": "Market and competitor analysis",
            "Programming": "Programming",
            "Designing an Excel Program": "Designing an Excel Program",
            "Designing and Programming a New Mobile App":
                "Designing and Programming a New Mobile App",
            "Programming a New Mobile App": "Programming a New Mobile App",
            "Designing a New Mobile App": "Designing a New Mobile App",
            "Adding Features to a Mobile App": "Adding Features to a Mobile App",
            "Maintaining a Mobile App and Solving Software Issues":
                "Maintaining a Mobile App and Solving Software Issues",
            "Converting a Website to a Mobile App":
                "Converting a Website to a Mobile App",
            "Designing and Programming a Website":
                "Designing and Programming a Website",
            "Programming a Website": "Programming a Website",
            "Designing a Website": "Designing a Website",
            "Developing an existing Website": "Developing an existing Website",
            "Maintaining a Website and solving Software Issues":
                "Maintaining a Website and solving Software Issues",
            "Engineering": "Engineering",
            "Interior decoration design for a villa":
                "Interior decoration design for a villa",
            "Exterior design for a villa": "Exterior design for a villa",
            "Facade design for a residential building":
                "Facade design for a residential building",
            "Designing plans for a residential building":
                "Designing plans for a residential building",
            "Interior decoration design for a commercial store":
                "Interior decoration design for a commercial store",
            "Exterior design for a commercial project":
                "Exterior design for a commercial project",
            "Facade design for a commercial project":
                "Facade design for a commercial project",
            "Designing plans for a commercial building":
                "Designing plans for a commercial building",
            "Interior decoration design for an apartment":
                "Interior decoration design for an apartment",
            "Quantity surveying for a project": "Quantity surveying for a project",
            "Engineering consultation": "Engineering consultation",
            "Design, Video & Audio": "Design, Video & Audio",
            "Logo Design": "Logo Design",
            "Visual Identity Design": "Visual Identity Design",
            "Redesign of Visual Identity": "Redesign of Visual Identity",
            "Voiceover": "Voiceover",
            "Motion Graphics Video Design": "Motion Graphics Video Design",
            "Intro/Outro Design for Videos": "Intro/Outro Design for Videos",
            "Marketing Image Design": "Marketing Image Design",
            "Marketing Video Design": "Marketing Video Design",
            "Video Editing": "Video Editing",
            "Resume Design": "Resume Design",
            "PowerPoint Design": "PowerPoint Design",
            "UI/UX Design": "UI/UX Design",
            "Landing Page Design": "Landing Page Design",
            "Mobile App Design": "Mobile App Design",
            "Design Consultation": "Design Consultation",
            "Writing & translation": "Writing & translation",
            "Article Writing": "Article Writing",
            "SEO-Optimized Article Writing": "SEO-Optimized Article Writing",
            "Writing Company Profiles": "Writing Company Profiles",
            "Content Translation": "Content Translation",
            "Marketing Content Writing": "Marketing Content Writing",
            "Script Writing": "Script Writing",
            "Product Description Writing": "Product Description Writing",
            "Resume Writing": "Resume Writing",
            "Text Content Summarization": "Text Content Summarization",
            "Audio Podcast Summarization": "Audio Podcast Summarization",
            "Video Lecture Summarization": "Video Lecture Summarization",
            "Editorial Consultation": "Editorial Consultation",
            "Data Entry": "Data Entry",
            "Customer Service": "Customer Service",
            "Transcription of Files or Lectures":
                "Transcription of Files or Lectures",
            "Transcription of Video Files or Podcasts":
                "Transcription of Video Files or Podcasts",
            "Secretarial or Virtual Assistant": "Secretarial or Virtual Assistant",
            "Uploading Products to an Online Store":
                "Uploading Products to an Online Store",
            "Technical Support Consultation": "Technical Support Consultation",
            "Training & Education": "Training & Education",
            "Creating a Course or Training Package":
                "Creating a Course or Training Package",
            "Training on a Software Program": "Training on a Software Program",
            "Explaining a Subject or Curriculum":
                "Explaining a Subject or Curriculum",
            "Language Learning": "Language Learning",
            "Explaining a Programming Language":
                "Explaining a Programming Language",
            "Educational Consultation": "Educational Consultation",
            "About Us": "About Us",
            "To Sum It Up For You ,,": "To Sum It Up For You ,,",
            "Read more": "Read more",
            "Join now": "Join now",
            "Be a Freelancer with us ,,": "Be a Freelancer with us ,,",
            "How To Add a Project": "How To Add a Project",
            "Too Easy Steps on Worklink,,": "Too Easy Steps on Worklink,,",
            "About worklink for companies": "About worklink for companies",
            "Empower Your Projects with Top Freelancers Worklink connects your company with skilled freelancers to meet your needs.":
                "Empower Your Projects with Top Freelancers Worklink connects your company with skilled freelancers to meet your needs.",
            "Access Top Talent: Discover professionals with the expertise you require.":
                "Access Top Talent: Discover professionals with the expertise you require.",
            "Flexible Hiring Options: Choose from hourly, weekly, or monthly engagements.":
                "Flexible Hiring Options: Choose from hourly, weekly, or monthly engagements.",
            "Streamlined Collaboration: Simplify project management and communication.":
                "Streamlined Collaboration: Simplify project management and communication.",
            "Join Worklink and enhance your team with the best freelance talent available.":
                "Join Worklink and enhance your team with the best freelance talent available.",
            "Search on Job": "Search on Job",
            "Find professional freelancers in all fields":
                "Find professional freelancers in all fields",
            "Get in Touch and Start Your Project today ,,":
                "Get in Touch and Start Your Project today ,,",
            "All Your buisiness needs and freelance will be here .":
                "All Your buisiness needs and freelance will be here .",
            "Enter The Title Of Project You Want To Emplement":
                "Enter The Title Of Project You Want To Emplement",
            "Start Now": "Start Now",
            "About1": "About Us"
        },
        ar: {
            "Digital marketing & sales": "التسويق الرقمي والمبيعات",
            "Create a marketing plan": "إنشاء خطة تسويقية",
            "Execute an advertising campaign": "تنفيذ حملة إعلانية",
            "Manage social media accounts": "إدارة حسابات وسائل التواصل الاجتماعي",
            "Manage an online store": "إدارة متجر إلكتروني",
            "Search engine optimization (SEO) for a website":
                "تحسين محركات البحث (SEO) لموقع ويب",
            "Marketing consultation": "استشارة تسويقية",
            "Consulting": "استشارات",
            "Feasibility study for a business project":
                "دراسة جدوى لمشروع تجاري",
            "Feasibility study for a website": "دراسة جدوى لموقع ويب",
            "Data analysis using SPSS statistical software":
                "تحليل البيانات باستخدام برنامج SPSS الإحصائي",
            "Drafting terms and conditions and usage policies":
                "صياغة الشروط والأحكام وسياسات الاستخدام",
            "Business plan": "خطة عمل",
            "Drafting a contract or agreement": "صياغة عقد أو اتفاقية",
            "Reviewing an employment contract": "مراجعة عقد عمل",
            "Financial statements for a project": "بيانات مالية لمشروع",
            "Market and competitor analysis": "تحليل السوق والمنافسين",
            "Programming": "برمجة",
            "Designing an Excel Program": "تصميم برنامج إكسل",
            "Designing and Programming a New Mobile App":
                "تصميم وبرمجة تطبيق جوال جديد",
            "Programming a New Mobile App": "برمجة تطبيق جوال جديد",
            "Designing a New Mobile App": "تصميم تطبيق جوال جديد",
            "Adding Features to a Mobile App": "إضافة ميزات إلى تطبيق جوال",
            "Maintaining a Mobile App and Solving Software Issues":
                "صيانة تطبيق جوال وحل مشاكل البرمجيات",
            "Converting a Website to a Mobile App": "تحويل موقع ويب إلى تطبيق جوال",
            "Designing and Programming a Website": "تصميم وبرمجة موقع ويب",
            "Programming a Website": "برمجة موقع ويب",
            "Designing a Website": "تصميم موقع ويب",
            "Developing an existing Website": "تطوير موقع ويب موجود",
            "Maintaining a Website and solving Software Issues":
                "صيانة موقع ويب وحل مشاكل البرمجيات",
            "Engineering": "هندسة",
            "Interior decoration design for a villa":
                "تصميم ديكور داخلي لفيلا",
            "Exterior design for a villa": "تصميم خارجي لفيلا",
            "Facade design for a residential building":
                "تصميم واجهة لمبنى سكني",
            "Designing plans for a residential building":
                "تصميم مخططات لمبنى سكني",
            "Interior decoration design for a commercial store":
                "تصميم ديكور داخلي لمتجر تجاري",
            "Exterior design for a commercial project":
                "تصميم خارجي لمشروع تجاري",
            "Facade design for a commercial project":
                "تصميم واجهة لمشروع تجاري",
            "Designing plans for a commercial building":
                "تصميم مخططات لمبنى تجاري",
            "Interior decoration design for an apartment":
                "تصميم ديكور داخلي لشقة",
            "Quantity surveying for a project": "حساب كميات لمشروع",
            "Engineering consultation": "استشارة هندسية",
            "Design, Video & Audio": "تصميم وفيديو وصوت",
            "Logo Design": "تصميم شعار",
            "Visual Identity Design": "تصميم هوية بصرية",
            "Redesign of Visual Identity": "إعادة تصميم هوية بصرية",
            "Voiceover": "تعليق صوتي",
            "Motion Graphics Video Design": "تصميم فيديو موشن جرافيك",
            "Intro/Outro Design for Videos": "تصميم مقدمة/خاتمة للفيديوهات",
            "Marketing Image Design": "تصميم صورة تسويقية",
            "Marketing Video Design": "تصميم فيديو تسويقي",
            "Video Editing": "تحرير الفيديو",
            "Resume Design": "تصميم سيرة ذاتية",
            "PowerPoint Design": "تصميم بوربوينت",
            "UI/UX Design": "تصميم واجهة المستخدم/تجربة المستخدم",
            "Landing Page Design": "تصميم صفحة هبوط",
            "Mobile App Design": "تصميم تطبيق جوال",
            "Design Consultation": "استشارة تصميم",
            "Writing & translation": "كتابة وترجمة",
            "Article Writing": "كتابة مقالات",
            "SEO-Optimized Article Writing": "كتابة مقالات مُحسّنة لمحركات البحث",
            "Writing Company Profiles": "كتابة ملفات تعريف الشركات",
            "Content Translation": "ترجمة محتوى",
            "Marketing Content Writing": "كتابة محتوى تسويقي",
            "Script Writing": "كتابة سيناريو",
            "Product Description Writing": "كتابة وصف المنتج",
            "Resume Writing": "كتابة سيرة ذاتية",
            "Text Content Summarization": "تلخيص محتوى نصي",
            "Audio Podcast Summarization": "تلخيص بودكاست صوتي",
            "Video Lecture Summarization": "تلخيص محاضرة فيديو",
            "Editorial Consultation": "استشارة تحريرية",
            "Data Entry": "إدخال بيانات",
            "Customer Service": "خدمة العملاء",
            "Transcription of Files or Lectures": "نسخ ملفات أو محاضرات",
            "Transcription of Video Files or Podcasts":
                "نسخ ملفات فيديو أو بودكاست",
            "Secretarial or Virtual Assistant": "سكرتارية أو مساعد افتراضي",
            "Uploading Products to an Online Store": "تحميل المنتجات إلى متجر إلكتروني",
            "Technical Support Consultation": "استشارة دعم فني",
            "Training & Education": "تدريب وتعليم",
            "Creating a Course or Training Package":
                "إنشاء دورة أو حزمة تدريبية",
            "Training on a Software Program": "التدريب على برنامج برمجي",
            "Explaining a Subject or Curriculum": "شرح مادة أو منهج دراسي",
            "Language Learning": "تعلم لغات",
            "Explaining a Programming Language": "شرح لغة برمجة",
            "Educational Consultation": "استشارة تعليمية",
            "About Us": "معلومات عنا",
            "To Sum It Up For You ,,": "لأختصرها لك ,,",
            "Read more": "اقرأ المزيد",
            "Join now": "انضم الآن",
            "Be a Freelancer with us ,,": "كن مستقلاً معنا ,,",
            "How To Add a Project": "كيفية إضافة مشروع",
            "Too Easy Steps on Worklink,,": "خطوات سهلة للغاية على ورك لينك ,,",
            "About worklink for companies": "حول ورك لينك للشركات",
            "Empower Your Projects with Top Freelancers Worklink connects your company with skilled freelancers to meet your needs.":
                "قم بتمكين مشاريعك مع أفضل المستقلين\nيعمل Worklnk على ربط شركتك بالموظفين المستقلين المهرة لتلبية احتياجاتك.",
            "Access Top Talent: اكتشف محترفين يتمتعون بالخبرة التي تحتاجها.":
                "الوصول إلى أفضل المواهب: اكتشف محترفين يتمتعون بالخبرة التي تحتاجها.",
            "Flexible Hiring Options: اختر من بين الارتباطات بالساعة أو الأسبوعية أو الشهرية.":
                "خيارات توظيف مرنة: اختر من بين الارتباطات بالساعة أو الأسبوعية أو الشهرية.",
            "Streamlined Collaboration: تبسيط إدارة المشاريع والتواصل.":
                "تعاون مبسط: تبسيط إدارة المشاريع والتواصل.",
            "Join Worklink and enhance your team with the best freelance talent available.":
                "انضم إلى work link وعزز فريقك بأفضل المواهب المستقلة المتاحة.",
            "Search on Job": "البحث عن وظيفة",
            "Find professional freelancers in all fields":
                "ابحث عن مستقلين محترفين في جميع المجالات",
            "Get in Touch and Start Your Project today ,,": "تواصل معنا وابدأ مشروعك اليوم ,,",
            "All Your buisiness needs and freelance will be here .":
                "جميع احتياجات عملك والمستقلين ستكون هنا.",
                "Start Now": "ابدأ الآن",
            "Enter The Title Of Project You Want To Emplement": "أدخل عنوان المشروع الذي تريد تنفيذه",
            "Web Design": "تصميم الويب",
            "Translation": "الترجمة",
            "Marketing": "التسويق",
            "We connect freelancers with top digital and tech opportunities. Our platform simplifies the job search for talented professionals and helps companies find the best talent. We also offer a curated selection of freelance positions, tools for showcasing skills, and industry insights to help you succeed. Additionally, we have a section for quick services on our site to meet your needs more swiftly and effectively.": "حن نربط الموظفين المستقلين بأفضل الفرص الرقمية والتقنية. تعمل منصتنا على تبسيط عملية البحث عن عمل للمهنيين الموهوبين وتساعد الشركات في العثور على أفضل المواهب، كما نقدم أيضًا مجموعة مختارة من الوظائف المستقلة، وأدوات لعرض المهارات، ورؤى الصناعة لمساعدتك على النجاح.",
            "About1": "معلومات عنا",
            "Create your profile on Worklink to get started. Our simple registration process ensures you're up and running quickly. Fill out your profile with detailed information about your expertise, portfolio, and experience. Highlight what makes you unique to attract the right clients.": "قم بإنشاء ملف التعريف الخاص بك على Worklink للبدء. تضمن عملية التسجيل البسيطة لدينا أن تكون جاهزًا للعمل بسرعة، املأ ملفك الشخصي بمعلومات مفصلة حول خبرتك ومحفظتك وتجربتك. سلط الضوء على ما يجعلك فريدًا لجذب العملاء المناسبين.",
            "You have your complete project that you would like to obtain through an independent company. Enter the details of the project, budget, and contractual period with who you wish to do so and share it for free. After that, the freelancers in the projects will see a page with you and they must choose the appropriate design for you to be independent and independent of the project.": "لديك مشروعك الكامل الذي ترغب بالحصول عليه من خلال شركة مستقلة. قم بإدخال تفاصيل المشروع والميزانية ومدة التعاقد مع من ترغب في ذلك ومشاركتها مجاناً. بعد ذلك ستظهر لك صفحة المستقلين في المشاريع ويجب عليهم اختيار التصميم المناسب لك لتكون مستقلاً ومستقلاً عن المشروع.",
            "Access Top Talent: Discover professionals with the expertise you require.":
                            "الوصول إلى أفضل المواهب: اكتشف محترفين يتمتعون بالخبرة التي تحتاجها.",
                        "Flexible Hiring Options: Choose from hourly, weekly, or monthly engagements.":
                            "خيارات توظيف مرنة: اختر من بين الارتباطات بالساعة أو الأسبوعية أو الشهرية.",
                        "Streamlined Collaboration: Simplify project management and communication.":
                            "تعاون مبسط: تبسيط إدارة المشاريع والتواصل.",
          },
    };
   

    const handleSearchSubmit = () => {
        console.log('handleSearchSubmit function called!'); // ADD THIS LINE
        if (searchQuery) {
          localStorage.setItem('searchQuery', searchQuery);
          navigate('/react/SearchResults');
        }
      };

    const translate = (key: any): any => {
        return (translations as any)[language]?.[key] ?? key;
    };
    
    // const toggleLanguage = () => {
    //     const newLanguage = language === 'en' ? 'ar' : 'en';
    //     setLanguage(newLanguage);
    //     localStorage.setItem('language', newLanguage);
    // };

    const isArabic = localStorage.getItem('language') === 'ar'
    

    // useEffect(() => {
    //     setIsArabic(localStorage.getItem('language'))
    // }, [])

    return (
        <div
            className="scrollbar-hide overflow-hidden "
            style={{ overflow: "hidden", overflowY: "hidden" }}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
            <div
                className="overflow-hidden"
                style={{
                    overflow: "hidden",
                    overflowY: "hidden",
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                }}
            >
                <nav className=" bg-[#404040] mt-[2px] mb-[-100px] text-white z-50">
                    <ul className="flex flex-col md:flex-row"> {/* Modified nav ul for responsiveness */}
                        {navCategories.map((category, index) => (
                            <li
                                key={index}
                                onMouseEnter={() => handleMouseEnter(category.labelKey)}
                                onMouseLeave={handleMouseLeave}
                                className="relative z-10"
                            >
                                <a
                                    href="#"
                                    className="block px-5 py-4 text-white hover:bg-[#404040] z-50"
                                >
                                    {translate(category.labelKey)}
                                </a>
                                {openDropdownLabel === category.labelKey && (
                                    <ul className="absolute left-0 mt-0 w-64 bg-[#404040] shadow-md z-50">
                                        {category.dropdownItems.map((item, itemIndex) => (
                                            <li
                                                key={itemIndex}
                                                className="border-b border-gray-700 last:border-b-0"
                                            >
                                                <a
                                                    href={item.href}
                                                    className="block px-5 py-3 text-white hover:bg-gray-700"
                                                >
                                                    {translate(item.labelKey)}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                        {/* <li>
                            <button
                                onClick={toggleLanguage}
                                className="block px-5 py-4 text-white hover:bg-[#404040] z-50"
                            >
                                {language === "en" ? "عربي" : "English"}
                            </button>
                        </li> */}
                    </ul>
                </nav>

                <div className="overflow-hidden">
                    {heroData.map((hero, index) => (
                        <div
                            key={index}
                            className="relative bg-white font-sans mb-20"
                        >
                            <div className="absolute top-10 inset-inline-start-10">
                                <div className="w-4 h-4 border border-orange-500 rounded-full"></div>
                            </div>
                            <div className="absolute top-20 inset-inline-start-5">
                                <div className="w-4 h-4 border border-orange-500 rounded-full"></div>
                            </div>
                            <div className="absolute top-32 inset-inline-start-12">
                                <div className="w-4 h-4 border border-orange-500 rounded-full"></div>
                            </div>
                            <div className="absolute top-12 inset-inline-start-20">
                                <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
                            </div>
                            <div className="absolute top-28 inset-inline-start-24">
                                <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
                            </div>
                            <div className="absolute top-40 inset-inline-start-18">
                                <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
                            </div>
                            <div className="container mx-auto px-6 py-24 flex justify-center">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                                    <div className="relative z-10 mt-12 md:mt-24">
                                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 md:text-start text-center"> {/* Added text-center on mobile */}
                                            {translate(hero.heading)}
                                        </h1>
                                        <p className="text-gray-600 text-lg mb-10 md:text-start text-center"> {/* Added text-center on mobile */}
                                            {translate(hero.subText)}
                                        </p>
                                        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start"> {/* Adjusted flex direction and alignment */}
                                            <input
                                                type="text"
                                                placeholder={translate(
                                                    "Enter The Title Of Project You Want To Emplement"
                                                )}
                                                className="w-full md:w-auto px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-orange-500 mb-4 md:mb-0" // Added mb-4 for mobile layout
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                            
                                            <button
        onClick={handleSearchSubmit}
        className="bg-orange-500 text-white px-8 py-3 rounded-md ms-3 hover:bg-orange-600 focus:outline-none">
                                                {translate("Start Now")}
                                            </button>
                                              
                                        </div>

                                              

                                    </div>


                                    <div className="relative  overflow-hidden pe-10 pt-10  top-[-100px] md:top-0  w-full md:w-[900px] h-[600px] md:h-[600px]"> {/* Adjusted width and top */}
                                        <div className="absolute   ms-[100px] inset-0  h-full bg-black rotate-[330deg] top-[-150px] inset-inline-end-[50px] w-[700px] rounded-3xl overflow-hidden md:w-[700px] md:ms-[100px]"> {/* Adjusted width and ml for responsiveness */}
                                            <img
                                                src={hero.imageSrc}
                                                alt="Hero Image"
                                                className="top-[100px] absolute inset-0 w-full h-full object-cover "
                                            />
                                        </div>

                                        <div className="relative top-[350px] inset-inline-end-[-200px] md:top-[350px] md:inset-inline-end-[-200px]"> {/* Adjusted top and left for responsiveness */}
                                            <div className="absolute inset-inline-end-[90px] top-[60px] w-4 h-4 border border-orange-500 rounded-full"></div>
                                            <div className="absolute inset-inline-end-[-10px] top-[60px] w-4 h-4 border border-orange-500 rounded-full"></div>
                                            <div className="absolute inset-inline-end-[-100px] top-[60px] w-4 h-4 border border-orange-500 rounded-full"></div>

                                            <div className="absolute inset-inline-end-[40px] top-[80px] w-4 h-4 border border-gray-400 rounded-full"></div>
                                            <div className="absolute inset-inline-end-[-10px] top-[80px] w-4 h-4 border border-gray-400 rounded-full"></div>
                                            <div className="absolute inset-inline-end-[-50px] top-[80px] w-4 h-4 border border-gray-400 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center mb-16">
                                <button className="bg-gray-700 text-white px-12 py-3 rounded-md hover:bg-gray-800 focus:outline-none">
                                    {translate("Search on Job")}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="font-sans bg-gray-50">
                
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 text-center mb-8"> {/* Adjusted text size */}
                                {translate("Find professional freelancers in all fields")}
                            </h2>
                            <div className="flex flex-col md:flex-row gap-6 md:gap-11 justify-between items-center mb-6"> {/* Modified flex direction */}
                                <div className="order-2 md:order-1"> {/* Reordered for mobile layout */}
                                    <button
                                        onClick={scrollPrev}
                                        className="rounded-full bg-gray-100 hover:bg-gray-200 p-2"
                                        aria-label="Previous Categories"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 19l-7-7 7-7"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>

                                <div
                                    className="category-carousel flex overflow-x-scroll scroll-smooth gap-4 pb-4 order-1 md:order-2" // Reordered for mobile layout
                                    ref={carouselRef}
                                >
                                    <CategoryCard
                                        image={marketingImage}
                                        altText="Marketing"
                                        categoryName={translate("Marketing")}
                                    />
                                    <CategoryCard
                                        image={videoEditingImage}
                                        altText="Video Editing"
                                        categoryName={translate("Video Editing")}
                                    />
                                    <CategoryCard
                                        image={translationImage}
                                        altText="Translation"
                                        categoryName={translate("Translation")}
                                    />
                                    <CategoryCard
                                        image={webDesignImage}
                                        altText="Web Design"
                                        categoryName={translate("Web Design")}
                                    />
                                    <CategoryCard
                                        image={consulting}
                                        altText="Consulting"
                                        categoryName={translate("Consulting")}
                                    />
                                    <CategoryCard
                                        image={programing}
                                        altText="Programming"
                                        categoryName={translate("Programming")}
                                    />
                                    <CategoryCard
                                        image={engineering}
                                        altText="Engineering"
                                        categoryName={translate("Engineering")}
                                    />
                                    <CategoryCard
                                        image={traning}
                                        altText="Training & Education"
                                        categoryName={translate("Training & Education")}
                                    />
                                </div>
                                <div className="order-3 md:order-3"> {/* Reordered for mobile layout */}
                                    <button
                                        onClick={scrollNext}
                                        className="rounded-full bg-gray-100 hover:bg-gray-200 p-2"
                                        aria-label="Next Categories"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className=" py-20">
                        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="text-[#151515] order-2 md:order-1"> {/* Reordered for mobile layout */}
                                <div className="flex flex-col md:flex-row rounded-3xl gap-2 overflow-hidden mb-6"> {/* Modified flex direction */}
                                    <button className=" bg-[#E87330] text-white w-full md:w-[350px] rounded-3xl px-6 py-3 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"> {/* Adjusted width */}
                                        <div className="me-16 flex text-start rounded-3xl">
                                            <span className="text-4xl md:text-5xl"> {/* Adjusted text size */}
                                                {translate("About1")}
                                                <br />
                                            </span>
                                        </div>
                                    </button>

                                    <div className="rounded-3xl overflow-hidden">
                                        <img
                                            src={photo}
                                            alt="About Us 1"
                                            className="w-full h-64 object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="rounded-3xl overflow-hidden">
                                    <img
                                        src={howToAddAProject}
                                        alt="About Us 2"
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                            </div>
                            <div className="text-[#151515] order-1 md:order-2"> {/* Reordered for mobile layout */}
                                <h2 className="text-2xl md:text-3xl font-semibold mb-4"> {/* Adjusted text size */}
                                    {translate("To Sum It Up For You ,,")}
                                </h2>
                                <p className="text-[#151515] mb-8">
                                    {translate(
                                        "We connect freelancers with top digital and tech opportunities. Our platform simplifies the job search for talented professionals and helps companies find the best talent. We also offer a curated selection of freelance positions, tools for showcasing skills, and industry insights to help you succeed. Additionally, we have a section for quick services on our site to meet your needs more swiftly and effectively."
                                    )}
                                </p>
                                <div className="flex flex-col md:flex-row space-x-4 gap-5"> {/* Modified flex direction */}
                                    <Link
                                        to="/AboutUsPage"
                                        className="flex items-center bg-transparent border border-orange-500 text-orange-500 px-6 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-300 mb-2 md:mb-0" // Added mb-2 for mobile layout
                                    >
                                        {translate("Read more")}
                                        {isArabic ?
                                            (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 11L7.83 11L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13L20 13V11Z" fill="#B44E14" />
                                            </svg>) : (<FaArrowRight className="ms-2" />)}
                                    </Link>
                                    <Link
                                        to="/AboutUsPage"
                                        className="flex items-center bg-orange-500 text-white px-8 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300"
                                    >
                                        {translate("Join now")}
                                        {isArabic ?
                                            (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 11L7.83 11L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13L20 13V11Z" fill="#B44E14" />
                                            </svg>) : (<FaArrowRight className="ms-2" />)}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="py-20">
                        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="order-2 md:order-1"> {/* Reordered for mobile layout */}
                                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                                    {translate("Be a Freelancer with us ,,")}
                                </h2>
                                <p className="text-gray-600 mb-8">
                                    {translate(
                                        "Create your profile on Worklink to get started. Our simple registration process ensures you're up and running quickly. Fill out your profile with detailed information about your expertise, portfolio, and experience. Highlight what makes you unique to attract the right clients."
                                    )}
                                </p>
                                <div className="flex flex-col md:flex-row space-x-4 gap-5"> {/* Modified flex direction */}
                                    <Link
                                        to="/HowToBeFreelancerPage"
                                        className="flex items-center bg-transparent border border-orange-500 text-orange-500 px-6 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-300 mb-2 md:mb-0" // Added mb-2 for mobile layout
                                    >
                                        {translate("Read more")}
                                        {isArabic ?
                                            (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 11L7.83 11L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13L20 13V11Z" fill="#B44E14" />
                                            </svg>) : (<FaArrowRight className="ms-2" />)}


                                    </Link>
                                    <Link
                                        to="/HowToBeFreelancerPage"
                                        className="flex items-center bg-orange-500 text-white px-8 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300"
                                    >
                                        {translate("Join now")}
                                        {isArabic ?
                                            (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 11L7.83 11L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13L20 13V11Z" fill="#B44E14" />
                                            </svg>) : (<FaArrowRight className="ms-2" />)}
                                    </Link>
                                </div>
                            </div>
                            <div className="order-1 md:order-2"> {/* Reordered for mobile layout */}
                                <div className="flex flex-col md:flex-row rounded-3xl gap-2 overflow-hidden mb-6"> {/* Modified flex direction */}

                                    <div className="rounded-3xl overflow-hidden">
                                        <img
                                            src={photo}
                                            alt="About Us 1"
                                            className="w-full h-64 object-cover"
                                        />
                                    </div>

                                    <button className=" bg-[#404040] text-white w-full md:w-[350px] rounded-3xl px-6 py-3 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"> {/* Adjusted width */}
                                        <div className="me-16 flex text-start rounded-3xl">
                                            <span className="text-4xl md:text-5xl"> {/* Adjusted text size */}
                                                {translate("About1")}
                                                <br />
                                            </span>
                                        </div>
                                    </button>


                                </div>
                                <div className="rounded-3xl overflow-hidden">
                                    <img
                                        src={howToAddAProject}
                                        alt="Freelancer 2"
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col order-2 md:order-1"> {/* Reordered for mobile layout */}
                            <div className="flex flex-col md:flex-row rounded-3xl gap-2 overflow-hidden mb-6"> {/* Modified flex direction */}

                                <div className="rounded-3xl overflow-hidden">
                                    <img
                                        src={photo}
                                        alt="About Us 1"
                                        className="w-full h-64 object-cover"
                                    />
                                </div>

                                <button className=" bg-[#E87330] text-white w-full md:w-[350px] rounded-3xl px-6 py-3 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"> {/* Adjusted width */}
                                    <div className="me-16 flex text-start rounded-3xl">
                                        <span className="text-4xl md:text-5xl"> {/* Adjusted text size */}
                                            {translate("About1")}
                                            <br />
                                        </span>
                                    </div>
                                </button>


                            </div>

                            <div className="grid grid-cols-1">
                                <img
                                    src={howToAddAProject}
                                    alt="Project Image 2"
                                    className="rounded-xl w-full h-auto" // Adjusted height to auto for responsiveness
                                />
                            </div>
                        </div>

                        <div className="flex flex-col justify-center order-1 md:order-2"> {/* Reordered for mobile layout */}
                            <h2 className="text-2xl md:text-3xl font-bold mb-4"> {/* Adjusted text size */}
                                {translate("Too Easy Steps on Worklink,,")}
                            </h2>
                            <p className="text-gray-700 mb-6">
                                {translate(
                                    "You have your complete project that you would like to obtain through an independent company. Enter the details of the project, budget, and contractual period with who you wish to do so and share it for free. After that, the freelancers in the projects will see a page with you and they must choose the appropriate design for you to be independent and independent of the project."
                                )}
                            </p>
                            <div className="flex flex-col md:flex-row space-x-4 gap-5"> {/* Modified flex direction */}
                                <Link
                                    to="/HowToAddProjectPage"
                                    className="flex items-center bg-transparent border border-orange-500 text-orange-500 px-6 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-300 mb-2 md:mb-0" // Added mb-2 for mobile layout
                                >
                                    {translate("Read more")}
                                    {isArabic ?
                                        (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 11L7.83 11L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13L20 13V11Z" fill="#B44E14" />
                                        </svg>) : (<FaArrowRight className="ms-2" />)}
                                </Link>
                                <Link
                                    to="/HowToAddProjectPage"
                                    className="flex items-center bg-orange-500 text-white px-8 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300"
                                >
                                    {translate("Join now")}
                                    {isArabic ?
                                        (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 11L7.83 11L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13L20 13V11Z" fill="#B44E14" />
                                        </svg>) : (<FaArrowRight className="ms-2" />)}
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="p-2">
                            <hr className="h-[3px] w-[300px] bg-black " />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <hr className="h-[5px] w-[600px] bg-black" />
                    </div>

                    <div className="container mx-auto py-12">
                        <div className="flex items-center justify-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold mx-4"> {/* Adjusted text size */}
                                {translate("About worklink for companies")}
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <img
                                    src={aboutWorkLink}
                                    alt="Company Section"
                                    className="rounded-lg w-full"
                                />
                            </div>

                            <div className="flex flex-col justify-center">
                                <h3 className="text-lg md:text-xl font-semibold mb-4"> {/* Adjusted text size */}
                                    {translate(
                                        "Empower Your Projects with Top Freelancers Worklink connects your company with skilled freelancers to meet your needs."
                                    )}
                                </h3>
                                <ul className="mb-6 space-y-2">
                                    <li className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-5 h-5 text-green-500 me-2"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.08.022L7.75 9.44l-2.97-2.97a.75.75 0 00-1.06 1.06l3.5 3.5a.75.75 0 001.08-.022l7.143-7.146a.75.75 0 00-.023-1.059z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span>
                                            {translate(
                                                "Access Top Talent: Discover professionals with the expertise you require."
                                            )}
                                        </span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-5 h-5 text-green-500 me-2"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.08.022L7.75 9.44l-2.97-2.97a.75.75 0 00-1.06 1.06l3.5 3.5a.75.75 0 001.08-.022l7.143-7.146a.75.75 0 00-.023-1.059z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span>
                                            {translate(
                                                "Flexible Hiring Options: Choose from hourly, weekly, or monthly engagements."
                                            )}
                                        </span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-5 h-5 text-green-500 me-2"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.08.022L7.75 9.44l-2.97-2.97a.75.75 0 00-1.06 1.06l3.5 3.5a.75.75 0 001.08-.022l7.143-7.146a.75.75 0 00-.023-1.059z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span>
                                            {translate(
                                                "Streamlined Collaboration: Simplify project management and communication."
                                            )}
                                        </span>
                                    </li>
                                </ul>
                                <p className="text-gray-700 mb-6">
                                    {translate(
                                        "Join Worklink and enhance your team with the best freelance talent available."
                                    )}
                                </p>
                                <div className="flex flex-col md:flex-row space-x-4 gap-5"> {/* Modified flex direction */}
                                    <Link
                                        to="/ServicesPolicyPage"
                                        className="flex items-center bg-transparent border border-orange-500 text-orange-500 px-6 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-300 mb-2 md:mb-0" // Added mb-2 for mobile layout
                                    >
                                        {translate("Read more")}
                                        {isArabic ?
                                            (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 11L7.83 11L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13L20 13V11Z" fill="#B44E14" />
                                            </svg>) : (<FaArrowRight className="ms-2 " />)}
                                    </Link>
                                    <Link
                                        to="/ServicesPolicyPage"
                                        className="flex items-center bg-orange-500 text-white px-8 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300"
                                    >
                                        {translate("Join now")}
                                        {isArabic ?
                                            (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 11L7.83 11L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13L20 13V11Z" fill="#B44E14" />
                                            </svg>) : (<FaArrowRight className="ms-2" />)}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center ">
                        <div className="p-2">
                            <hr className="h-[3px] w-[300px] bg-black " />
                        </div>
                    </div>
                    <div className="flex items-center justify-center pb-10">
                        <hr className="h-[5px] w-[600px] bg-black" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;