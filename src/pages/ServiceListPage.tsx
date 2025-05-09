// // ServiceListingPage.tsx (Main Services Listing Page)
// import React, { useState, useEffect, useCallback } from 'react';
// import axios, { AxiosError } from 'axios';
// import imageUrl from '../assets/bro.png'; // Placeholder image - keep for now
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import { Link } from 'react-router-dom';
// import marketing from '../assets/marketing.png'
// import videoEditingImage from "../assets/videoEditing.png";
// import translationImage from "../assets/translate.png";
// import webDesignImage from "../assets/webDesign.png";
// import bussiness from '../assets/New folder/bussiness.png'
// import programming from '../assets/New folder/programming.png'
// import enginnering from '../assets/New folder/engineering.png'
// import traning from '../assets/New folder/traningandeducation.png'

// // --- Interfaces ---
// interface User {
//     id: number;
//     firstName: string;
//     lastName: string;
//     userName: string;
//     profilePhoto: string | null;
// }

// interface Service {
//     id: number;
//     user_id: number;
//     title: string;
//     section: string;
//     subsection: string;
//     description: string;
//     thumbnail_photo: string | null;
//     main_photo: string | null;
//     required_skills: string;
//     price: string;
//     delivery_duration: string;
//     from_date: string;
//     to_date: string;
//     link: string;
//     status: string;
//     created_at: string;
//     updated_at: string;
//     user: User;
//     view_count?: number;
//     cart_count?: number;
//     rating_avg?: number;
// }

// interface ApiResponse {
//     message: string;
//     data: {
//         current_page: number;
//         data: Service[];
//         last_page: number;
//     };
// }

// interface Category {
//     name: string;
//     image: string | React.ReactNode; // Allow image to be string or ReactNode (for SVG)
// }

// interface ServiceCardProps extends Service { }
// interface StarRatingProps {
//     rating: number | null;
// }

// const ServiceCardSkeleton = () => (
//     <div className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-200">
//         <div style={{ height: '160px', width: '100%' }}>
//             <Skeleton height="100%" width="100%" />
//         </div>
//         <div className="p-3">
//             <Skeleton height={20} width="80%" />
//             <div className="mt-2 flex justify-between">
//                 <Skeleton height={16} width="30%" />
//                 <Skeleton height={16} width="40%" />
//             </div>
//             <div className="mt-2 flex justify-between">
//                 <Skeleton height={16} width="20%" />
//                 <Skeleton height={16} width="50%" />
//             </div>
//         </div>
//     </div>
// );

// const ServiceListingPage: React.FC = () => {
//     const [servicesByCategory, setServicesByCategory] = useState<{ [category: string]: Service[] }>({});
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [searchQuery, setSearchQuery] = useState('');

//     useEffect(() => {
//         const fetchServices = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await axios.get<ApiResponse>(`${process.env.REACT_APP_BACK_URL}/services`);
//                 const fetchedServices = response.data.data.data;

//                 const groupedServices: Record<string, Service[]> = fetchedServices.reduce((groups, service) => {
//                   const section = service.section || 'Another services';
//                   if (!groups[section]) {
//                       groups[section] = [];
//                   }
//                   groups[section].push(service);
//                   return groups;
//               }, {} as Record<string, Service[]>); // Explicitly type the initial value of reduce
//                 setServicesByCategory(groupedServices);

//                 setLoading(false);
//             } catch (e: any) {
//                 setError("Failed to load services.");
//                 if (axios.isAxiosError(e)) {
//                     const axiosError = e as AxiosError;
//                     console.error("Axios error:", axiosError.message);
//                 } else {
//                     console.error("An unexpected error occurred:", e);
//                 }
//                 setLoading(false);
//             }
//         };

//         fetchServices();
//     }, []);

//     useEffect(() => {
//         setCategories([
//             { name: "Marketing", image: `${marketing}` },
//             { name: "Video & audio", image:  `${videoEditingImage}` },
//             { name: "Translation", image:  `${translationImage}` },
//             { name: "Web Design", image:  `${webDesignImage}` },
//             { name: "Business & consulting", image:  `${bussiness}` },
//             { name: "Engineering", image:  `${enginnering}` },
//             { name: "Programming", image:  `${programming}` },
//             { name: "Training & education", image:  `${traning}` },
//             { name: "Another services", image: (
//                 <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <circle cx="32.0026" cy="31.9997" r="26.6667" fill="#B44E14" stroke="white" strokeWidth="1.5"/>
//                     <path d="M23 42.667L30.1 33.2003C30.6333 32.4892 30.6333 31.5114 30.1 30.8003L23 21.3337" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M36.3359 42.667L43.4359 33.2003C43.9693 32.4892 43.9693 31.5114 43.4359 30.8003L36.3359 21.3337" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//             ) },
//         ]);
//     }, []);

//     const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
//         const fullStars = Math.floor(rating || 0);
//         const hasHalfStar = (rating || 0) % 1 !== 0;
//         const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

//         return (
//             <div className="flex items-center">
//                 {[...Array(fullStars)].map((_, i) => <svg key={i} className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>)}
//                 {hasHalfStar && <svg className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0v15z"/></svg>}
//                 {[...Array(emptyStars)].map((_, i) => <svg key={i} className="w-3 h-3 text-gray-300 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>)}
//             </div>
//         );
//     };

//     const ServiceCard: React.FC<ServiceCardProps> = ({ title, price, user, view_count = 305, rating_avg = 4.5 }) => {
//         const serviceImage = user?.profilePhoto ? `${process.env.REACT_APP_BACK_URL}/storage/${user.profilePhoto}` : imageUrl;

        
//         return (
//             // <Link to=""></Link>
//             <div className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-200">
//                 <div className="relative">
//                     <img className="w-full h-40 object-cover" src={serviceImage} alt={title} onError={() => console.error('Error loading image')} style={{ height: '160px' }} />
//                     <div className="absolute top-2 right-2 flex space-x-2">
//                         <button className="bg-white rounded-full p-1 shadow-sm hover:bg-gray-100">
//                             <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 006.364 6.364L12 20.364l3.636-3.636a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//                         </button>
//                         <button className="bg-white rounded-full p-1 shadow-sm hover:bg-gray-100">
//                             <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63-.63-.184-1.707.707-1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
//                         </button>
//                     </div>
//                 </div>
//                 <div className="p-3">
//                     <h3 className="text-sm font-semibold text-gray-800 truncate">{title}</h3>
//                     <div className="flex items-center justify-between mt-2 text-gray-600 text-xs">
//                         <div className="flex items-center">
//                             <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
//                             <span>{view_count}</span>
//                         </div>
//                         <div className="flex items-center">
//                             <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//                             <span>24 hours</span>
//                         </div>
//                     </div>
//                     <div className="flex justify-between items-center mt-2">
//                         <div className="text-sm font-bold text-orange-500">${price}</div>
//                         <div className="flex items-center text-sm text-gray-700">
//                             <StarRating rating={rating_avg} />
//                             <span className="ml-1">({rating_avg?.toFixed(1)})</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchQuery(e.target.value);
//     }, []);

//     // const filteredCategories = useMemo(() => {
//     //     if (!searchQuery) {
//     //         return categories;
//     //     }
//     //     return categories.filter(category =>
//     //         category.name.toLowerCase().includes(searchQuery.toLowerCase())
//     //     );
//     // }, [categories, searchQuery]);


//     if (loading) {
//         return <div className="text-center">Loading services...</div>;
//     }

//     if (error) {
//         return <div className="text-red-500 text-center">Error: {error}</div>;
//     }


//     return (
//         <div className="pt-32 bg-gray-100 py-10">
//             <div className="container mx-auto px-4">
//                 {/* Top Section - Title and Search */}
//                 <div className="text-center mb-10">
//                     <h2 className="text-2xl font-semibold text-gray-800">Services that help you grow your projects</h2>
//                 </div>

//                 <div className="flex justify-center mb-8">
//                     <div className="flex rounded-xl overflow-hidden border border-gray-300 shadow-sm bg-white">
//                         <input
//                             type="text"
//                             placeholder="Search about services..."
//                             className="px-4 py-3 w-64 focus:outline-none text-sm bg-white"
//                             value={searchQuery}
//                             onChange={handleSearchChange}
//                         />
//                         <button className="bg-orange-500 text-white px-5 py-3 text-sm font-semibold hover:bg-orange-600 focus:outline-none">
//                             Search
//                         </button>
//                     </div>
//                 </div>

//                 {/* Category Carousel Section - Static Categories with Links */}
//                 <section className="py-16">
//                     <div className="container mx-auto px-6">
//                         <div className="flex flex-col gap-8">
//                             <div className="flex gap-4 overflow-x-auto">
//                                 {categories.slice(0, 5).map((category, index) => (
//                                     <Link key={index} to={`/ServicesPage/${category.name.replace(/&/g, 'and').replace(/\s+/g, '%20').toLowerCase()}`} className="relative rounded-xl overflow-hidden shadow-md w-60 h-64 group block">
//                                         {typeof category.image === 'string' ? (
//                                             <img
//                                                 src={category.image}
//                                                 alt={category.name}
//                                                 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                                             />
//                                         ) : (
//                                             <div className="w-full h-full flex items-center justify-center">
//                                                 {category.image}
//                                             </div>
//                                         )}
//                                         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                                             <span className="text-white text-xl font-semibold text-center p-4 text-shadow-md">
//                                                 {category.name}
//                                             </span>
//                                         </div>
//                                     </Link>
//                                 ))}
//                             </div>
//                             <div className="flex gap-4 overflow-x-auto">
//                                 {categories.slice(5).map((category, index) => (
//                                     <Link key={index} to={`/react/ServicesPage/${category.name.replace(/&/g, 'and').replace(/\s+/g, '%20').toLowerCase()}`} className="relative rounded-xl overflow-hidden shadow-md w-60 h-64 group block">
//                                         {typeof category.image === 'string' ? (
//                                             <img
//                                                 src={category.image}
//                                                 alt={category.name}
//                                                 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                                             />
//                                         ) : (
//                                             <div className="w-full h-full flex items-center justify-center">
//                                                 {category.image}
//                                             </div>
//                                         )}
//                                         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                                             <span className="text-white text-xl font-semibold text-center p-4 text-shadow-md">
//                                                 {category.name}
//                                             </span>
//                                         </div>
//                                     </Link>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Service Listings by Category */}
//                 {["Marketing", "Video & editing", "Translation", "Another services"].map((categoryName, index) => (
//                     <div key={index} className="mb-10">
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="text-xl font-semibold text-gray-800 capitalize">{categoryName}</h3>
//                             <Link to={`/react/ServicesPage/${categoryName.replace(/&/g, 'and').replace(/\s+/g, '-').toLowerCase()}`} className="text-sm font-semibold text-orange-500 hover:text-orange-700 focus:outline-none">Watch more</Link>
//                         </div>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                             {loading ? (
//                                 Array(4).fill(0).map((_, skeletonIndex) => (
//                                     <ServiceCardSkeleton key={skeletonIndex} />
//                                 ))
//                             ) : (servicesByCategory[categoryName] && servicesByCategory[categoryName].length > 0) ? (
//                                 servicesByCategory[categoryName].slice(0, 4).map((service, serviceIndex) => (
//                                     <ServiceCard key={serviceIndex} {...service} />
//                                 ))
//                             ) : (
//                                 Array(4).fill(0).map((_, skeletonIndex) => (
//                                     <ServiceCardSkeleton key={skeletonIndex} />
//                                 ))
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ServiceListingPage;





// ServiceListingPage.tsx (Main Services Listing Page)
import React, { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import imageUrl from '../assets/bro.png'; // Placeholder image - keep for now
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';
import marketing from '../assets/marketing.png'
import videoEditingImage from "../assets/videoEditing.png";
import translationImage from "../assets/translate.png";
import webDesignImage from "../assets/webDesign.png";
import bussiness from '../assets/New folder/bussiness.png'
import programming from '../assets/New folder/programming.png'
import enginnering from '../assets/New folder/engineering.png'
import traning from '../assets/New folder/traningandeducation.png'

// --- Interfaces ---
interface User {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    profilePhoto: string | null;
}

interface Service {
    id: number;
    user_id: number;
    title: string;
    section: string;
    subsection: string;
    description: string;
    thumbnail_photo: string | null;
    main_photo: string | null;
    required_skills: string;
    price: string;
    delivery_duration: string;
    from_date: string;
    to_date: string;
    link: string;
    status: string;
    created_at: string;
    updated_at: string;
    user: User;
    view_count?: number;
    cart_count?: number;
    rating_avg?: number;
}

interface ApiResponse {
    message: string;
    data: {
        current_page: number;
        data: Service[];
        last_page: number;
    };
}

interface Category {
    name: string;
    image: string | React.ReactNode; // Allow image to be string or ReactNode (for SVG)
}

interface ServiceCardProps extends Service { }
interface StarRatingProps {
    rating: number | null;
}

const translations = {
    en: {
        "Services that help you grow your projects": "Services that help you grow your projects",
        "Search about services...": "Search about services...",
        "Search": "Search",
        "Marketing": "Marketing",
        "Video & audio": "Video & audio",
        "Translation": "Translation",
        "Web Design": "Web Design",
        "Business & consulting": "Business & consulting",
        "Engineering": "Engineering",
        "Programming": "Programming",
        "Training & education": "Training & education",
        "Another services": "Another services",
        "Watch more": "Watch more",
        "Loading services...": "Loading services...",
        "Error: Failed to load services.": "Error: Failed to load services.",
    },
    ar: {
        "Services that help you grow your projects": "خدمات تساعدك على تطوير مشاريعك",
        "Search about services...": "البحث عن خدمات...",
        "Search": "بحث",
        "Marketing": "تسويق",
        "Video & audio": "فيديو وصوت",
        "Translation": "ترجمة",
        "Web Design": "تصميم مواقع",
        "Business & consulting": "أعمال واستشارات",
        "Engineering": "هندسة",
        "Programming": "برمجة",
        "Training & education": "تدريب وتعليم",
        "Another services": "خدمات أخرى",
        "Watch more": "شاهد المزيد",
        "Loading services...": "جاري تحميل الخدمات...",
        "Error: Failed to load services.": "خطأ: فشل في تحميل الخدمات.",
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};


const ServiceCardSkeleton = () => (
    <div className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-200">
        <div style={{ height: '160px', width: '100%' }}>
            <Skeleton height="100%" width="100%" />
        </div>
        <div className="p-3">
            <Skeleton height={20} width="80%" />
            <div className="mt-2 flex justify-between">
                <Skeleton height={16} width="30%" />
                <Skeleton height={16} width="40%" />
            </div>
            <div className="mt-2 flex justify-between">
                <Skeleton height={16} width="20%" />
                <Skeleton height={16} width="50%" />
            </div>
        </div>
    </div>
);

const ServiceListingPage: React.FC = () => {
    const [servicesByCategory, setServicesByCategory] = useState<{ [category: string]: Service[] }>({});
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [language, setLanguage] = useState<'en' | 'ar'>(
        (localStorage.getItem('language') as 'ar' | 'en') || 'en'
    );

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage === 'ar' || storedLanguage === 'en') {
            setLanguage(storedLanguage as 'ar' | 'en');
            console.log(error);
            
        } else {
            setLanguage('en');
        }
    }, []);

    // const toggleLanguage = () => {
    //     const newLanguage = language === 'en' ? 'ar' : 'en';
    //     setLanguage(newLanguage);
    //     localStorage.setItem('language', newLanguage);
    // };


    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get<ApiResponse>(`${process.env.REACT_APP_BACK_URL}/services`);
                const fetchedServices = response.data.data.data;

                const groupedServices: Record<string, Service[]> = fetchedServices.reduce((groups, service) => {
                    const section = service.section || 'Another services';
                    if (!groups[section]) {
                        groups[section] = [];
                    }
                    groups[section].push(service);
                    return groups;
                }, {} as Record<string, Service[]>);
                setServicesByCategory(groupedServices);

                setLoading(false);
            } catch (e: any) {
                setError(translate("Error: Failed to load services.", language));
                if (axios.isAxiosError(e)) {
                    const axiosError = e as AxiosError;
                    console.error("Axios error:", axiosError.message);
                } else {
                    console.error("An unexpected error occurred:", e);
                }
                setLoading(false);
            }
        };

        fetchServices();
    }, [language]); // Added language to dependency array

    useEffect(() => {
        setCategories([
            { name: translate("Marketing", language), image: `${marketing}` },
            { name: translate("Video & audio", language), image: `${videoEditingImage}` },
            { name: translate("Translation", language), image: `${translationImage}` },
            { name: translate("Web Design", language), image: `${webDesignImage}` },
            { name: translate("Business & consulting", language), image: `${bussiness}` },
            { name: translate("Engineering", language), image: `${enginnering}` },
            { name: translate("Programming", language), image: `${programming}` },
            { name: translate("Training & education", language), image: `${traning}` },
            { name: translate("Another services", language), image: (
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32.0026" cy="31.9997" r="26.6667" fill="#B44E14" stroke="white" strokeWidth="1.5"/>
                    <path d="M23 42.667L30.1 33.2003C30.6333 32.4892 30.6333 31.5114 30.1 30.8003L23 21.3337" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M36.3359 42.667L43.4359 33.2003C43.9693 32.4892 43.9693 31.5114 43.4359 30.8003L36.3359 21.3337" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ) },
        ]);
    }, [language]); // Added language dependency

    const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
        const fullStars = Math.floor(rating || 0);
        const hasHalfStar = (rating || 0) % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => <svg key={i} className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>)}
                {hasHalfStar && <svg className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0v15z"/></svg>}
                {[...Array(emptyStars)].map((_, i) => <svg key={i} className="w-3 h-3 text-gray-300 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>)}
            </div>
        );
    };

    const ServiceCard: React.FC<ServiceCardProps> = ({ title, price, user, view_count = 305, rating_avg = 4.5 }) => {
        const serviceImage = user?.profilePhoto ? `${process.env.REACT_APP_BACK_URL}/storage/${user.profilePhoto}` : imageUrl;


        return (
            <div className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-200">
                <div className="relative">
                    <img className="w-full h-40 object-cover" src={serviceImage} alt={title} onError={() => console.error('Error loading image')} style={{ height: '160px' }} />
                    <div className="absolute top-2 right-2 flex space-x-2">
                        <button className="bg-white rounded-full p-1 shadow-sm hover:bg-gray-100">
                            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 006.364 6.364L12 20.364l3.636-3.636a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </button>
                        <button className="bg-white rounded-full p-1 shadow-sm hover:bg-gray-100">
                            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63-.63-.184-1.707.707-1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </button>
                    </div>
                </div>
                <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">{title}</h3>
                    <div className="flex items-center justify-between mt-2 text-gray-600 text-xs">
                        <div className="flex items-center">
                            <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            <span>{view_count}</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>24 hours</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <div className="text-sm font-bold text-orange-500">${price}</div>
                        <div className="flex items-center text-sm text-gray-700">
                            <StarRating rating={rating_avg} />
                            <span className="ml-1">({rating_avg?.toFixed(1)})</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);


    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="pt-32 bg-gray-100 py-10">
         
            <div className="container mx-auto px-4">
                {/* Top Section - Title and Search */}
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800">{translate("Services that help you grow your projects", language)}</h2>
                </div>

                <div className="flex justify-center mb-8">
                    <div className="flex rounded-xl overflow-hidden border border-gray-300 shadow-sm bg-white">
                        <input
                            type="text"
                            placeholder={translate("Search about services...", language)}
                            className="px-4 py-3 w-64 md:w-96 focus:outline-none text-sm bg-white" // Adjusted width for responsiveness
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button className="bg-orange-500 text-white px-5 py-3 text-sm font-semibold hover:bg-orange-600 focus:outline-none">
                            {translate("Search", language)}
                        </button>
                    </div>
                </div>

                {/* Category Carousel Section - Static Categories with Links */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col gap-8">
                            <div className="flex gap-4 overflow-x-auto">
                                {categories.slice(0, 5).map((category, index) => (
                                    <Link key={index} to={`/react/ServicesPage/${category.name.replace(/&/g, 'and').replace(/\s+/g, '%20').toLowerCase()}`} className="relative rounded-xl overflow-hidden shadow-md w-60 h-64 group block flex-shrink-0"> {/* Added flex-shrink-0 */}
                                        {typeof category.image === 'string' ? (
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                {category.image}
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                            <span className="text-white text-xl font-semibold text-center p-4 text-shadow-md">
                                                {category.name}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="flex gap-4 overflow-x-auto">
                                {categories.slice(5).map((category, index) => (
                                    <Link key={index} to={`/react/ServicesPage/${category.name.replace(/&/g, 'and').replace(/\s+/g, '%20').toLowerCase()}`} className="relative rounded-xl overflow-hidden shadow-md w-60 h-64 group block flex-shrink-0"> {/* Added flex-shrink-0 */}
                                        {typeof category.image === 'string' ? (
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                {category.image}
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                            <span className="text-white text-xl font-semibold text-center p-4 text-shadow-md">
                                                {category.name}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Service Listings by Category */}
                {["Marketing", "Video & editing", "Translation", "Another services"].map((categoryName, index) => (
                    <div key={index} className="mb-10">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 capitalize">{translate(categoryName, language)}</h3>
                            <Link to={`/react/ServicesPage/${categoryName.replace(/&/g, 'and').replace(/\s+/g, '%20').toLowerCase()}`} className="text-sm font-semibold text-orange-500 hover:text-orange-700 focus:outline-none">
                                {translate("Watch more", language)}
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {loading ? (
                                Array(4).fill(0).map((_, skeletonIndex) => (
                                    <ServiceCardSkeleton key={skeletonIndex} />
                                ))
                            ) : (servicesByCategory[categoryName] && servicesByCategory[categoryName].length > 0) ? (
                                servicesByCategory[categoryName].slice(0, 4).map((service, serviceIndex) => (
                                    <Link key={serviceIndex} to={`/react/StaticServiceCard/${service.id}`}>
                                    <ServiceCard  {...service} />
                                    </Link>
                                ))
                            ) : (
                                Array(4).fill(0).map((_, skeletonIndex) => (
                                    <ServiceCardSkeleton key={skeletonIndex} />
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceListingPage;