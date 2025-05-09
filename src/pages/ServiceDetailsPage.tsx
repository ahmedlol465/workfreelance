

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { StarIcon } from '@heroicons/react/20/solid';
// import { UserIcon, MapPinIcon, ClockIcon, TruckIcon, CheckCircleIcon, UserGroupIcon, ChartBarIcon, LinkIcon } from '@heroicons/react/24/outline';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faInstagram, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
// import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

// interface User {
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
//     rate: number | null;
// }

// interface SubService {
//     id: number;
//     service_name: string;
//     price: string;
//     delivery_duration: string;
//     service_id: number;
//     created_at: string;
//     updated_at: string;
// }

// interface Service {
//     id: number;
//     user_id: number;
//     title: string;
//     section: string;
//     subsection: string | null;
//     description: string;
//     thumbnail_photo: string | null;
//     main_photo: string | null;
//     required_skills: string | null;
//     price: string;
//     delivery_duration: string;
//     from_date: string | null;
//     to_date: string | null;
//     link: string | null;
//     status: string;
//     created_at: string;
//     updated_at: string;
//     user: User;
//     sub_services: SubService[];
// }

// const StaticServiceCard: React.FC = () => {
//     const [service, setService] = useState<Service | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [quantity, setQuantity] = useState<number>(1);
//     const [addOns, setAddOns] = useState<{ [key: number]: boolean }>({}); // State to track selected add-ons

//     const { id } = useParams<{ id: string }>();

//     useEffect(() => {
//         const fetchService = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await axios.get<{ data: Service }>(`${process.env.REACT_APP_BACK_URL}/services/${id}`);
//                 setService(response.data.data);
//                 setLoading(false);
//             } catch (err: any) {
//                 setError(err.message || 'Failed to fetch service');
//                 setLoading(false);
//             }
//         };

//         fetchService();
//     }, []);

//     const calculateTotalPrice = () => {
//         let totalPrice = parseFloat(service?.price || '0') * quantity;

//         if (addOns[1]) { // Assuming "Edit on same design" addon has ID 1 -  **Dynamic IDs needed for real implementation**
//             totalPrice += 5; // Static price for "Edit on same design" -  **Dynamic prices needed for real implementation**
//         }
//         if (addOns[2]) { // Assuming "Redesign old cover" addon has ID 2 -  **Dynamic IDs needed for real implementation**
//             totalPrice += 30; // Static price for "Redesign old cover" -  **Dynamic prices needed for real implementation**
//         }

//         if (service?.sub_services) {
//             service.sub_services.forEach(subService => {
//                 if (addOns[subService.id]) {
//                     totalPrice += parseFloat(subService.price);
//                 }
//             });
//         }

//         return totalPrice;
//     };

//     const totalPrice = calculateTotalPrice();

//     const handleAddOnChange = (subServiceId: number, isChecked: boolean) => {
//         setAddOns(prevAddOns => ({
//             ...prevAddOns,
//             [subServiceId]: isChecked
//         }));
//     };


//     if (loading) {
//         return <div>Loading service details...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (!service) {
//         return <div>Service not found.</div>;
//     }

//     const user = service.user;

//     // console.log(service.main_photo);
    
//     return (
//         <div className="pt-32 bg-gray-100 p-8 flex gap-8 font-sans">
//             {/* Left side - Image and Description */}
//             <div className="w-3/4">
//                 <div className="rounded-lg overflow-hidden shadow-md">
//                     <img
//                         src={service.main_photo ? `http://127.0.0.1:8000/storage/${service.main_photo}` : "https://via.placeholder.com/400x300?text=No+Image"}
//                         alt={service.title}
//                         className="w-full h-auto object-cover"
//                         style={{ maxHeight: '400px' }}
//                         onError={(e) => {
//                             const target = e.target as HTMLImageElement;
//                             target.onerror = null;
//                             target.src = "https://via.placeholder.com/400x300?text=Image+not+available";
//                         }}
//                     />
//                 </div>
//                 <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
//                     <p className="text-gray-700 text-sm">{service.description}</p>
//                 </div>

//                 {/* Service add-ons (Sub-services) */}
//                 <div className="mt-10 bg-white rounded-lg shadow-md p-4">
//                     <h4 className="font-semibold text-gray-800 mb-3">Service add-ons</h4>
//                     {service.sub_services.map(subService => (
//                         <div key={subService.id} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
//                             <label className="flex items-center gap-2 text-gray-700">
//                                 <input
//                                     type="checkbox"
//                                     className="rounded border-gray-300 focus:ring-orange-500"
//                                     checked={addOns[subService.id] || false}
//                                     onChange={(e) => handleAddOnChange(subService.id, e.target.checked)}
//                                 />
//                                 {subService.service_name}
//                             </label>
//                             <div className="font-medium">{subService.price}$ <span className="text-gray-500">{subService.delivery_duration}</span></div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Purchase service */}
//                 <div className="mt-10 bg-white rounded-lg shadow-md p-4">
//                     <div className="flex items-center justify-between mb-4">
//                         <h4 className="font-semibold text-gray-800">Purchase service</h4>
//                     </div>
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
//                             <button
//                                 className="px-3 py-2 text-gray-600 hover:bg-gray-200 focus:outline-none"
//                                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                             >
//                                 -
//                             </button>
//                             <input
//                                 type="number"
//                                 className="w-12 text-center border-l border-r border-gray-300 focus:outline-none"
//                                 value={quantity}
//                                 min="1"
//                                 onChange={(e) => {
//                                     const value = parseInt(e.target.value);
//                                     setQuantity(value > 0 ? value : 1);
//                                 }}
//                             />
//                             <button
//                                 className="px-3 py-2 text-gray-600 hover:bg-gray-200 focus:outline-none"
//                                 onClick={() => setQuantity(quantity + 1)}
//                             >
//                                 +
//                             </button>
//                         </div>
//                         <div className="font-medium text-gray-800">Total amount: <span className="font-bold">{totalPrice}$</span></div>
//                         <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-6 py-2 text-sm font-semibold">
//                             Purchase
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Right side - Service Details */}
//             <div className="w-1/4 flex flex-col gap-4">
//                 {/* Seller Account */}
//                 <div className="bg-white rounded-lg shadow-md p-4">
//                     <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center gap-2">
//                             <UserIcon className="h-5 w-5 text-gray-700" />
//                             <h4 className="font-semibold text-gray-800">Seller account</h4>
//                         </div>
//                         <Link to={`/react/ContactMePage/${user.id}`}>
//                         <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-3 py-1 text-sm">
//                             Contact me
//                         </button>
//                             </Link>
//                     </div>
//                     <div className="flex flex-col items-center">
//                         <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mb-2">
//                             {user.profilePhoto ? (
//                                 <img
//                                     src={`http://127.0.0.1:8000/storage/${user.profilePhoto}`}
//                                     alt="Seller Avatar"
//                                     className="w-full h-full object-cover object-center"
//                                     onError={(e) => {
//                                         const target = e.target as HTMLImageElement;
//                                         target.onerror = null;
//                                         target.src = "https://via.placeholder.com/200x200?text=No+Avatar";
//                                     }}
//                                 />
//                             ) : (
//                                 <UserIcon className="w-full h-full text-gray-500 p-4" />
//                             )}
//                         </div>
//                         <h5 className="font-semibold text-gray-800">{user.firstName} {user.lastName}</h5>
//                         <p className="text-gray-600 text-sm flex items-center gap-1">
//                             <span className="font-normal">Freelancer, level</span> <span className="font-medium">New</span>
//                         </p>
//                         <p className="text-gray-600 text-sm flex items-center gap-1">
//                             <MapPinIcon className="h-4 w-4 text-gray-500" />
//                             <span>{user.Region || 'Saudi Arabia'}</span>
//                         </p>
//                         <p className="text-gray-700 text-sm text-center mt-2">
//                             Programming, website and application development
//                         </p>
//                         <div className="flex items-center mt-3">
//                             <span className="text-gray-700 text-sm mr-1">Rate:</span>
//                             {[...Array(user.rate || 0)].map((_, i) => (
//                                 <StarIcon key={i} className="h-4 w-4 text-yellow-500 fill-current" />
//                             ))}
//                             {[...Array(5 - (user.rate || 0))].map((_, i) => (
//                                 <StarIcon key={i} className="h-4 w-4 text-gray-300 fill-current" />
//                             ))}
//                             <span className="text-gray-700 text-sm ml-1">{user.rate}</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Info Section */}
//                 <div className="bg-white rounded-lg shadow-md p-4">
//                     <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                         <FontAwesomeIcon icon={faDollarSign} className="h-4 w-4 text-gray-700" />
//                         Info
//                     </h4>
//                     <div className="flex justify-between py-2 border-b border-gray-200">
//                         <div className="flex items-center gap-2 text-gray-700"><FontAwesomeIcon icon={faDollarSign} className="h-4 w-4" />Price</div>
//                         <div className="font-medium">{service.price}$</div>
//                     </div>
//                     <div className="flex justify-between py-2 border-b border-gray-200">
//                         <div className="flex items-center gap-2 text-gray-700"><ClockIcon className="h-4 w-4" />Delivery duration</div>
//                         <div className="font-medium">{service.delivery_duration}</div>
//                     </div>
//                     <div className="flex justify-between py-2 border-b border-gray-200">
//                         <div className="flex items-center gap-2 text-gray-700"><TruckIcon className="h-4 w-4" />In progress orders</div>
//                         <div className="font-medium">0</div>
//                     </div>
//                     <div className="flex justify-between py-2 border-b border-gray-200">
//                         <div className="flex items-center gap-2 text-gray-700"><CheckCircleIcon className="h-4 w-4" />Complete orders</div>
//                         <div className="font-medium">2</div>
//                     </div>
//                     <div className="flex justify-between py-2 border-b border-gray-200">
//                         <div className="flex items-center gap-2 text-gray-700"><UserGroupIcon className="h-4 w-4" />Customers</div>
//                         <div className="font-medium">2</div>
//                     </div>
//                     <div className="flex justify-between py-2">
//                         <div className="flex items-center gap-2 text-gray-700"><ChartBarIcon className="h-4 w-4" />Sales</div>
//                         <div className="font-medium">300$</div>
//                     </div>
//                 </div>

//                 {/* Share the work */}
//                 <div className="bg-white rounded-lg shadow-md p-4">
//                     <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                         <LinkIcon className="h-5 w-5 text-gray-700" />
//                         Share the work
//                     </h4>
//                     <div className="bg-gray-50 rounded-md p-2 text-sm text-gray-700 break-all">
//                         {service.link || "https://weblink.com/portfolio/239825"}
//                     </div>
//                     <div className="flex justify-around mt-3">
//                         <a href="#" className="text-gray-500 hover:text-gray-700"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
//                         <a href="#" className="text-gray-500 hover:text-gray-700"><FontAwesomeIcon icon={faLinkedinIn} size="lg" /></a>
//                         <a href="#" className="text-gray-500 hover:text-gray-700"><FontAwesomeIcon icon={faFacebookF} size="lg" /></a>
//                     </div>
//                 </div>

//                 {/* Skills used */}
//                 <div className="bg-white rounded-lg shadow-md p-4">
//                     <h4 className="font-semibold text-gray-800 mb-3">Skills used</h4>
//                     <div className="flex gap-2 flex-wrap">
//                         {service.required_skills?.split(',').map((skill, index) => (
//                             <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-gray-700 text-sm font-medium">
//                                 {skill.trim()}
//                             </span>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StaticServiceCard;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StarIcon } from '@heroicons/react/20/solid';
import { UserIcon, MapPinIcon, ClockIcon, TruckIcon, CheckCircleIcon, UserGroupIcon, ChartBarIcon, LinkIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';

interface User {
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
    rate: number | null;
}

interface SubService {
    id: number;
    service_name: string;
    price: string;
    delivery_duration: string;
    service_id: number;
    created_at: string;
    updated_at: string;
}

interface Service {
    id: number;
    user_id: number;
    title: string;
    section: string;
    subsection: string | null;
    description: string;
    thumbnail_photo: string | null;
    main_photo: string | null;
    required_skills: string | null;
    price: string;
    delivery_duration: string;
    from_date: string | null;
    to_date: string | null;
    link: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    user: User;
    sub_services: SubService[];
}


const translations = {
    en: {
        "Description": "Description",
        "Service add-ons": "Service add-ons",
        "Purchase service": "Purchase service",
        "Total amount": "Total amount",
        "Purchase": "Purchase",
        "Seller account": "Seller account",
        "Contact me": "Contact me",
        "Freelancer, level": "Freelancer, level",
        "New": "New",
        "Saudi Arabia": "Saudi Arabia",
        "Programming, website and application development": "Programming, website and application development",
        "Rate": "Rate",
        "Info": "Info",
        "Price": "Price",
        "Delivery duration": "Delivery duration",
        "In progress orders": "In progress orders",
        "Complete orders": "Complete orders",
        "Customers": "Customers",
        "Sales": "Sales",
        "Share the work": "Share the work",
        "Skills used": "Skills used",
        "Loading service details...": "Loading service details...",
        "Error": "Error",
        "Failed to fetch service": "Failed to fetch service",
        "Service not found.": "Service not found.",
    },
    ar: {
        "Description": "الوصف",
        "Service add-ons": "إضافات الخدمة",
        "Purchase service": "شراء الخدمة",
        "Total amount": "المبلغ الإجمالي",
        "Purchase": "شراء",
        "Seller account": "حساب البائع",
        "Contact me": "تواصل معي",
        "Freelancer, level": "مستقل، المستوى",
        "New": "جديد",
        "Saudi Arabia": "المملكة العربية السعودية",
        "Programming, website and application development": "برمجة وتطوير المواقع والتطبيقات",
        "Rate": "التقييم",
        "Info": "معلومات",
        "Price": "السعر",
        "Delivery duration": "مدة التسليم",
        "In progress orders": "الطلبات قيد التنفيذ",
        "Complete orders": "الطلبات المكتملة",
        "Customers": "العملاء",
        "Sales": "المبيعات",
        "Share the work": "شارك العمل",
        "Skills used": "المهارات المستخدمة",
        "Loading service details...": "جاري تحميل تفاصيل الخدمة...",
        "Error": "خطأ",
        "Failed to fetch service": "فشل في جلب الخدمة",
        "Service not found.": "الخدمة غير موجودة.",
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};


const StaticServiceCard: React.FC = () => {
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [addOns, setAddOns] = useState<{ [key: number]: boolean }>({});
    const [language, setLanguage] = useState<'en' | 'ar'>(
        (localStorage.getItem('language') as 'ar' | 'en') || 'en'
    );

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage === 'ar' || storedLanguage === 'en') {
            setLanguage(storedLanguage as 'ar' | 'en');
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
        const fetchService = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get<{ data: Service }>(`${process.env.REACT_APP_BACK_URL}/services/${id}`);
                setService(response.data.data);
                setLoading(false);
            } catch (err: any) {
                setError(translate("Failed to fetch service", language));
                setLoading(false);
            }
        };

        fetchService();
    }, [id, language]); // Added language to dependency array for re-fetching on language change


    const calculateTotalPrice = () => {
        let totalPrice = parseFloat(service?.price || '0') * quantity;

        if (addOns[1]) {
            totalPrice += 5;
        }
        if (addOns[2]) {
            totalPrice += 30;
        }

        if (service?.sub_services) {
            service.sub_services.forEach(subService => {
                if (addOns[subService.id]) {
                    totalPrice += parseFloat(subService.price);
                }
            });
        }

        return totalPrice;
    };

    const totalPrice = calculateTotalPrice();

    const handleAddOnChange = (subServiceId: number, isChecked: boolean) => {
        setAddOns(prevAddOns => ({
            ...prevAddOns,
            [subServiceId]: isChecked
        }));
    };


    if (loading) {
        return <div>{translate("Loading service details...", language)}</div>;
    }

    if (error) {
        return <div>{translate("Error", language)}: {error}</div>;
    }

    if (!service) {
        return <div>{translate("Service not found.", language)}</div>;
    }

    const user = service.user;


    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="mt-24 bg-gray-100 p-6 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                {/* Left side - Image and Description */}
                <div className="md:w-3/4">
                    <div className="rounded-lg overflow-hidden shadow-md">
                        <img
                            src={service.main_photo ? `http://127.0.0.1:8000/storage/${service.main_photo}` : "https://via.placeholder.com/400x300?text=No+Image"}
                            alt={service.title}
                            className="w-full h-auto object-cover"
                            style={{ maxHeight: '400px' }}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = "https://via.placeholder.com/400x300?text=Image+not+available";
                            }}
                        />
                    </div>
                    <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{translate("Description", language)}</h3>
                        <p className="text-gray-700 text-sm">{service.description}</p>
                    </div>

                    {/* Service add-ons (Sub-services) */}
                    <div className="mt-6 bg-white rounded-lg shadow-md p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">{translate("Service add-ons", language)}</h4>
                        {service.sub_services.map(subService => (
                            <div key={subService.id} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                                <label className="flex items-center gap-2 text-gray-700">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 focus:ring-orange-500"
                                        checked={addOns[subService.id] || false}
                                        onChange={(e) => handleAddOnChange(subService.id, e.target.checked)}
                                    />
                                    {subService.service_name}
                                </label>
                                <div className="font-medium">{subService.price}$ <span className="text-gray-500">{subService.delivery_duration}</span></div>
                            </div>
                        ))}
                    </div>

                    {/* Purchase service */}
                    <div className="mt-6 bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-gray-800">{translate("Purchase service", language)}</h4>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                <button
                                    className="px-3 py-2 text-gray-600 hover:bg-gray-200 focus:outline-none"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    className="w-12 text-center border-l border-r border-gray-300 focus:outline-none"
                                    value={quantity}
                                    min="1"
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setQuantity(value > 0 ? value : 1);
                                    }}
                                />
                                <button
                                    className="px-3 py-2 text-gray-600 hover:bg-gray-200 focus:outline-none"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <div className="font-medium text-gray-800">{translate("Total amount", language)}: <span className="font-bold">{totalPrice}$</span></div>
                            <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-6 py-2 text-sm font-semibold">
                                {translate("Purchase", language)}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right side - Service Details */}
                <div className="md:w-1/4 flex flex-col gap-4">
                    {/* Seller Account */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <UserIcon className="h-5 w-5 text-gray-700" />
                                <h4 className="font-semibold text-gray-800">{translate("Seller account", language)}</h4>
                            </div>
                            <Link to={`/react/ContactMePage/${user.id}`}>
                                <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-3 py-1 text-sm">
                                    {translate("Contact me", language)}
                                </button>
                            </Link>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mb-2">
                                {user.profilePhoto ? (
                                    <img
                                        src={`http://127.0.0.1:8000/storage/${user.profilePhoto}`}
                                        alt="Seller Avatar"
                                        className="w-full h-full object-cover object-center"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null;
                                            target.src = "https://via.placeholder.com/200x200?text=No+Avatar";
                                        }}
                                    />
                                ) : (
                                    <UserIcon className="w-full h-full text-gray-500 p-4" />
                                )}
                            </div>
                            <h5 className="font-semibold text-gray-800">{user.firstName} {user.lastName}</h5>
                            <p className="text-gray-600 text-sm flex items-center gap-1 justify-center">
                                <span className="font-normal">{translate("Freelancer, level", language)}</span> <span className="font-medium">{translate("New", language)}</span>
                            </p>
                            <p className="text-gray-600 text-sm flex items-center gap-1 justify-center">
                                <MapPinIcon className="h-4 w-4 text-gray-500" />
                                <span>{user.Region || translate("Saudi Arabia", language)}</span>
                            </p>
                            <p className="text-gray-700 text-sm text-center mt-2">
                                {translate("Programming, website and application development", language)}
                            </p>
                            <div className="flex items-center mt-3">
                                <span className="text-gray-700 text-sm mr-1">{translate("Rate", language)}:</span>
                                {[...Array(user.rate || 0)].map((_, i) => (
                                    <StarIcon key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                                ))}
                                {[...Array(5 - (user.rate || 0))].map((_, i) => (
                                    <StarIcon key={i} className="h-4 w-4 text-gray-300 fill-current" />
                                ))}
                                <span className="text-gray-700 text-sm ml-1">{user.rate}</span>
                            </div>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <FontAwesomeIcon icon={faDollarSign} className="h-4 w-4 text-gray-700" />
                            {translate("Info", language)}
                        </h4>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                            <div className="flex items-center gap-2 text-gray-700"><FontAwesomeIcon icon={faDollarSign} className="h-4 w-4" />{translate("Price", language)}</div>
                            <div className="font-medium">{service.price}$</div>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                            <div className="flex items-center gap-2 text-gray-700"><ClockIcon className="h-4 w-4" />{translate("Delivery duration", language)}</div>
                            <div className="font-medium">{service.delivery_duration}</div>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                            <div className="flex items-center gap-2 text-gray-700"><TruckIcon className="h-4 w-4" />{translate("In progress orders", language)}</div>
                            <div className="font-medium">0</div>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                            <div className="flex items-center gap-2 text-gray-700"><CheckCircleIcon className="h-4 w-4" />{translate("Complete orders", language)}</div>
                            <div className="font-medium">2</div>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                            <div className="flex items-center gap-2 text-gray-700"><UserGroupIcon className="h-4 w-4" />{translate("Customers", language)}</div>
                            <div className="font-medium">2</div>
                        </div>
                        <div className="flex justify-between py-2">
                            <div className="flex items-center gap-2 text-gray-700"><ChartBarIcon className="h-4 w-4" />{translate("Sales", language)}</div>
                            <div className="font-medium">300$</div>
                        </div>
                    </div>

                    {/* Share the work */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <LinkIcon className="h-5 w-5 text-gray-700" />
                            {translate("Share the work", language)}
                        </h4>
                        <div className="bg-gray-50 rounded-md p-2 text-sm text-gray-700 break-all">
                            {service.link || "https://weblink.com/portfolio/239825"}
                        </div>
                        <div className="flex justify-around mt-3">
                            <a href="#" className="text-gray-500 hover:text-gray-700"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
                            <a href="#" className="text-gray-500 hover:text-gray-700"><FontAwesomeIcon icon={faLinkedinIn} size="lg" /></a>
                            <a href="#" className="text-gray-500 hover:text-gray-700"><FontAwesomeIcon icon={faFacebookF} size="lg" /></a>
                        </div>
                    </div>

                    {/* Skills used */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">{translate("Skills used", language)}</h4>
                        <div className="flex gap-2 flex-wrap">
                            {service.required_skills?.split(',').map((skill, index) => (
                                <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-gray-700 text-sm font-medium">
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaticServiceCard;