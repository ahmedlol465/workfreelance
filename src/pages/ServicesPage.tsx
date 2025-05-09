
// // ServicesPage.tsx (Dynamic Category Services Page with Filters)
// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import axios, { AxiosError } from 'axios';
// import imageUrl from '../assets/bro.png';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import { useParams, Link } from 'react-router-dom';

// // --- Interfaces (same as in ServiceListingPage) ---
// interface User {
//     id: number;
//     firstName: string;
//     lastName: string;
//     userName: string;
//     profilePhoto: string | null;
//     rate: number | null;
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
//     image: string;
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


// const ServicesPage: React.FC = () => {
//     const [allServices, setAllServices] = useState<Service[]>([]); // Store all services fetched from backend
//     const [services, setServices] = useState<Service[]>([]); // Services to be displayed after filtering/pagination
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [categoriesFilter, setCategoriesFilter] = useState<string[]>([]);
//     const [deliveryDurationFilter, setDeliveryDurationFilter] = useState('');
//     const [minBudget, setMinBudget] = useState('');
//     const [maxBudget, setMaxBudget] = useState('');
//     const [rateFilter, setRateFilter] = useState(0);
//     const [currentPage, setCurrentPage] = useState(1);
//     const servicesPerPage = 9;
//     const { categoryParam } = useParams<{ categoryParam?: string }>();
//     const [sortOption, setSortOption] = useState('Relevance'); // State for sorting option

//     useEffect(() => {
//         const fetchServices = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 let apiUrl = `${process.env.REACT_APP_BACK_URL}/services`;
//                 if (categoryParam && categoryParam !== 'another services') { // Fetch by section if categoryParam exists and is not 'another-services'
//                     apiUrl = `${process.env.REACT_APP_BACK_URL}/services?section=${categoryParam.replace(/-/g, ' ')}`;
//                 }

//                 const response = await axios.get<ApiResponse>(apiUrl);
//                 const fetchedServices = response.data.data.data;
//                 setAllServices(fetchedServices); // Store all fetched services
//                 setLoading(false);
//             } catch (e: any) {
//                 setError("Failed to load services.");
//                 if (axios.isAxiosError(e)) {
//                     const axiosError = e as AxiosError;
//                     console.error("Axios error:", axiosError.message);
//                 } else {
//                     console.error("An unexpected error occurred:", e);
//                 }
//                 setAllServices([]); // Ensure allServices is empty in case of error
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchServices();
//     }, [categoryParam]);

//     useEffect(() => {
//         setCategories([
//             { name: "Consulting", image: "https://placehold.co/600x400/2ecc71/fff?text=Consulting" },
//             { name: "Programming", image: "https://placehold.co/600x400/3498db/fff?text=Programming" },
//             { name: "Engineering and architecture", image: "https://placehold.co/600x400/95a5a6/fff?text=Engineering+%26+Architecture" },
//             { name: "Design", image: "https://placehold.co/600x400/FF5733/fff?text=Design" },
//             { name: "Marketing", image: "https://placehold.co/600x400/e74c3c/fff?text=Marketing" },
//             { name: "Video & editing", image: "https://placehold.co/600x400/f39c12/fff?text=Video+%26+editing" },
//             { name: "Translation", image: "https://placehold.co/600x400/9b59b6/fff?text=Translation" },
//             { name: "Web Design", image: "https://placehold.co/600x400/1abc9c/fff?text=Web+Design" },
//             { name: "Business & consulting", image: "https://placehold.co/600x400/f1c40f/fff?text=Business+%26+consulting" },
//             { name: "Engineering", image: "https://placehold.co/600x400/d35400/fff?text=Engineering" },
//             // { name: "Programming", image: "https://placehold.co/600x400/c0392b/fff?text=Programming" },
//             { name: "Training & education", image: "https://placehold.co/600x400/8e44ad/fff?text=Training+%26+education" },
//             { name: "Another services", image: "https://placehold.co/600x400/2c3e50/fff?text=More+Services" },
//         ]);
//     }, []);

//     const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
//         const fullStars = Math.floor(rating || 0);
//         const hasHalfStar = (rating || 0) % 1 !== 0;
//         const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

//         return (
//             <div className="flex items-center">
//                 {[...Array(fullStars)].map((_, i) => <svg key={i} className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.176-6.545L.487 7.23l6.545-.953L10 0l2.868 6.277 6.545.953-4.711 4.315 1.176 6.545z"/></svg>)}
//                 {hasHalfStar && <svg className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.176-6.545L.487 7.23l6.545-.953L10 0v15z"/></svg>}
//                 {[...Array(emptyStars)].map((_, i) => <svg key={i} className="w-3 h-3 text-gray-300 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.176-6.545L.487 7.23l6.545-.953L10 0l2.868 6.277 6.545.953-4.711 4.315 1.176 6.545z"/></svg>)}
//             </div>
//         );
//     };


//     const ServiceCard: React.FC<ServiceCardProps> = ({ title, price, user, view_count = 305, rating_avg = user?.rate }) => { // Use user?.rate for dynamic rating
//         const serviceImage = user?.profilePhoto ? `http://127.0.0.1:8000/storage/${user.profilePhoto}` : imageUrl;
// console.log(serviceImage);

//         return (
//             <div className=" bg-white rounded-md shadow-sm overflow-hidden border border-gray-200">
//                 <div className="relative">
//                     <img className="w-full h-40 object-cover" src={`${serviceImage}`} alt={title} onError={() => console.error('Error loading image')} style={{ height: '160px' }} />
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

//     const filteredServices = useMemo(() => {
//         let currentServices = [...allServices]; // Start with all services

//         // Apply Search Filter
//         if (searchQuery) {
//             currentServices = currentServices.filter(service =>
//                 service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 service.required_skills.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//         }

//         // Apply Category Filter
//         if (categoriesFilter.length > 0) {
//             currentServices = currentServices.filter(service =>
//                 categoriesFilter.includes(service.section)
//             );
//         }

//         // Apply Delivery Duration Filter
//         if (deliveryDurationFilter) {
//             currentServices = currentServices.filter(service =>
//                 service.delivery_duration === deliveryDurationFilter
//             );
//         }

//         // Apply Budget Filter
//         const min = parseFloat(minBudget) || 0;
//         const max = parseFloat(maxBudget) || Infinity;
//         currentServices = currentServices.filter(service => {
//             const price = parseFloat(service.price);
//             return price >= min && price <= max;
//         });

//         // Apply Rate Filter
//         if (rateFilter > 0) {
//             currentServices = currentServices.filter(service =>
//                 (service.user.rate || 0) >= rateFilter
//             );
//         }

//         // Apply Sorting
//         if (sortOption === 'Price (Low to High)') {
//             currentServices.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
//         } else if (sortOption === 'Price (High to Low)') {
//             currentServices.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
//         } else if (sortOption === 'Rating') {
//             currentServices.sort((a, b) => (b.user.rate || 0) - (a.user.rate || 0));
//         } else { // Relevance (default - no specific sorting, keep original order if backend provides any relevance order)
//             // No specific sorting for relevance, you can keep the order as it is or implement a more complex relevance logic if needed
//         }


//         return currentServices;
//     }, [allServices, searchQuery, categoriesFilter, deliveryDurationFilter, minBudget, maxBudget, rateFilter, sortOption]);

//     useEffect(() => {
//         const indexOfLastService = currentPage * servicesPerPage;
//         const indexOfFirstService = indexOfLastService - servicesPerPage;
//         setServices(filteredServices.slice(indexOfFirstService, indexOfLastService));
//     }, [filteredServices, currentPage, servicesPerPage]);


//     const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

//     const handlePageChange = (pageNumber: any) => {
//         setCurrentPage(pageNumber);
//     };


//     const handleClearFilters = () => {
//         setSearchQuery('');
//         setCategoriesFilter([]);
//         setDeliveryDurationFilter('');
//         setMinBudget('');
//         setMaxBudget('');
//         setRateFilter(0);
//         setCurrentPage(1);
//         setSortOption('Relevance');
//     };

//     const sectionTitle = useMemo(() => {
//         if (categoryParam) {
//             const formattedCategory = categoryParam.replace(/-/g, ' ');
//             return formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1);
//         }
//         return "Another services";
//     }, [categoryParam]);


//     const deliveryDurations = useMemo(() => {
//         const durations = new Set<string>();
//         allServices.forEach(service => { // Use allServices here
//             if (service.delivery_duration) {
//                 durations.add(service.delivery_duration);
//             }
//         });
//         return Array.from(durations);
//     }, [allServices]); // Use allServices here

//     const handleCategoryFilterChange = (name: string) => {
//         if (categoriesFilter.includes(name)) {
//             setCategoriesFilter(categoriesFilter.filter(cat => cat !== name));
//         } else {
//             setCategoriesFilter([...categoriesFilter, name]);
//         }
//         setCurrentPage(1); // Reset page to 1 after filter change
//     };

//     const handleBudgetFilterChange = (type: 'min' | 'max', value: string): void => {
//         if (type === 'min') {
//             setMinBudget(value);
//         } else {
//             setMaxBudget(value);
//         }
//         setCurrentPage(1); // Reset page to 1 after filter change
//     };

//     const handleRateFilterChange = (star: number): void => {
//         setRateFilter(star);
//         setCurrentPage(1); // Reset page to 1 after filter change
//     };

//     const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setSortOption(e.target.value);
//         setCurrentPage(1); // Reset page to 1 after sort change
//     };
// console.log(services);


//     return (
//         <div className="mt-20 container mx-auto px-4 py-8 flex font-sans">
//             {/* Filter Sidebar */}
//             <aside className="w-1/4 pr-8 mt-6">
//                 <div className="sticky top-6">
//                     <div className="mb-4">
//                         <button onClick={handleClearFilters} className="text-sm text-orange-500 hover:underline block text-left">Clear all filters</button>
//                     </div>

//                     {/* Search for a service */}
//                     <div className="mb-6">
//                         <h3 className="font-semibold mb-2">Search for a service</h3>
//                         <input
//                             type="text"
//                             placeholder="Search services..."
//                             className="border p-2 rounded w-full"
//                             value={searchQuery}
//                             onChange={handleSearchChange}
//                         />
//                     </div>

//                     {/* Categories */}
//                     <div className="mb-6">
//                         <h3 className="font-semibold mb-2">Categories</h3>
//                         <div className="space-y-2">
//                             {categories.map(category => (
//                                 <div key={category.name} className="flex items-center">
//                                     <input
//                                         type="checkbox"
//                                         id={`category-${category.name}`}
//                                         className="form-checkbox h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
//                                         checked={categoriesFilter.includes(category.name)}
//                                         onChange={() => handleCategoryFilterChange(category.name)}
//                                     />
//                                     <label htmlFor={`category-${category.name}`} className="ml-2 text-gray-700 text-sm">
//                                         {category.name}
//                                     </label>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Delivery duration */}
//                     <div className="mb-6">
//                         <h3 className="font-semibold mb-2">Delivery duration</h3>
//                         <div className="space-y-2">
//                             {deliveryDurations.map(duration => (
//                                 <div key={duration} className="flex items-center">
//                                     <input
//                                         type="radio"
//                                         id={`delivery-${duration.replace(/\s+/g, '-')}`}
//                                         name="deliveryDuration"
//                                         className="form-radio h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
//                                         value={duration}
//                                         checked={deliveryDurationFilter === duration}
//                                         onChange={(e) => setDeliveryDurationFilter(e.target.value)}
//                                     />
//                                     <label htmlFor={`delivery-${duration.replace(/\s+/g, '-')}`} className="ml-2 text-gray-700 text-sm">
//                                         {duration}
//                                     </label>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Budget */}
//                     <div className="mb-6">
//                         <h3 className="font-semibold mb-2">Budget</h3>
//                         <div className="flex space-x-2">
//                             <input
//                                 type="number"
//                                 placeholder="Minimum"
//                                 className="border p-2 rounded w-1/2 text-sm"
//                                 value={minBudget}
//                                 onChange={(e) => handleBudgetFilterChange('min', e.target.value)}
//                             />
//                             <input
//                                 type="number"
//                                 placeholder="Maximum"
//                                 className="border p-2 rounded w-1/2 text-sm"
//                                 value={maxBudget}
//                                 onChange={(e) => handleBudgetFilterChange('max', e.target.value)}
//                             />
//                         </div>
//                     </div>

//                     {/* Rate */}
//                     <div>
//                         <h3 className="font-semibold mb-2">Rate</h3>
//                         <div className="flex items-center space-x-1">
//                             {[1, 2, 3, 4, 5].map(star => (
//                                 <button
//                                     key={star}
//                                     type="button"
//                                     className={`focus:outline-none ${star <= rateFilter ? 'text-yellow-500' : 'text-gray-300'}`}
//                                     onClick={() => handleRateFilterChange(star)}
//                                 >
//                                     <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.176-6.545L.587 7.23l6.545-.953L10 0l2.868 6.277 6.545.953-4.711 4.315 1.176 6.545z"/></svg>
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </aside>

//             {/* Services Grid */}
//             <main className="w-3/4">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-2xl font-semibold capitalize">{sectionTitle}</h2>
//                     <div className="flex items-center space-x-2">
//                         <span className="text-sm text-gray-700">Sorted by</span>
//                         <select
//                             className="border p-1 rounded text-sm"
//                             value={sortOption}
//                             onChange={handleSortChange}
//                         >
//                             <option value="Relevance">Relevance</option>
//                             <option value="Price (Low to High)">Price (Low to High)</option>
//                             <option value="Price (High to Low)">Price (High to Low)</option>
//                             <option value="Rating">Rating</option>
//                         </select>
//                         <Link to="/react/AddServiceForm">
//                         <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded text-sm">+ Add service</button>
//                         </Link>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-3 gap-4">
//                     {loading ? (
//                         Array(9).fill(0).map((_, index) => <ServiceCardSkeleton key={index} />)
//                     ) : services.length > 0 ? (
//                         services.map(service => (
//                             <Link to={`/react/StaticServiceCard/${service.id}`}>
//                             <ServiceCard key={service.id} {...service} />
//                             </Link>
//                         ))
//                     ) : error ? (
//                         <div className="text-red-500 text-center col-span-3">{error}</div>
//                     ) : (
//                         <div className="text-gray-500 text-center col-span-3">No services found matching your criteria.</div>
//                     )}
//                 </div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                     <div className="flex justify-center mt-8">
//                         <nav className="inline-flex space-x-2">
//                             <button
//                                 onClick={() => handlePageChange(currentPage - 1)}
//                                 disabled={currentPage === 1}
//                                 className="py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
//                             >
//                                 <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
//                             </button>
//                             {[...Array(totalPages)].map((_, index) => (
//                                 <button
//                                     key={index + 1}
//                                     onClick={() => handlePageChange(index + 1)}
//                                     className={`py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100 ${currentPage === index + 1 ? 'bg-orange-500 text-white hover:bg-orange-600 border-orange-500' : ''}`}
//                                 >
//                                     {index + 1}
//                                 </button>
//                             ))}
//                             <button
//                                 onClick={() => handlePageChange(currentPage + 1)}
//                                 disabled={currentPage === totalPages}
//                                 className="py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
//                             >
//                                 <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
//                             </button>
//                         </nav>
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default ServicesPage;




// ServicesPage.tsx (Dynamic Category Services Page with Filters)
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import imageUrl from '../assets/bro.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useParams, Link } from 'react-router-dom';

// --- Interfaces (same as in ServiceListingPage) ---
interface User {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    profilePhoto: string | null;
    rate: number | null;
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
    image: string;
}

interface ServiceCardProps extends Service { }
interface StarRatingProps {
    rating: number | null;
}


const translations = {
    en: {
        "Clear all filters": "Clear all filters",
        "Search for a service": "Search for a service",
        "Search services...": "Search services...",
        "Categories": "Categories",
        "Delivery duration": "Delivery duration",
        "Budget": "Budget",
        "Minimum": "Minimum",
        "Maximum": "Maximum",
        "Rate": "Rate",
        "Sorted by": "Sorted by",
        "Relevance": "Relevance",
        "Price (Low to High)": "Price (Low to High)",
        "Price (High to Low)": "Price (High to Low)",
        "Rating": "Rating",
        "+ Add service": "+ Add service",
        "Failed to load services.": "Failed to load services.",
        "No services found matching your criteria.": "No services found matching your criteria.",
        "Consulting": "Consulting",
        "Programming": "Programming",
        "Engineering and architecture": "Engineering and architecture",
        "Design": "Design",
        "Marketing": "Marketing",
        "Video & editing": "Video & editing",
        "Translation": "Translation",
        "Web Design": "Web Design",
        "Business & consulting": "Business & consulting",
        "Engineering": "Engineering",
        "Training & education": "Training & education",
        "Another services": "Another services",
    },
    ar: {
        "Clear all filters": "مسح جميع الفلاتر",
        "Search for a service": "البحث عن خدمة",
        "Search services...": "ابحث عن خدمات...",
        "Categories": "الأقسام",
        "Delivery duration": "مدة التسليم",
        "Budget": "الميزانية",
        "Minimum": "الحد الأدنى",
        "Maximum": "الحد الأقصى",
        "Rate": "التقييم",
        "Sorted by": "تم الفرز بواسطة",
        "Relevance": "الأهمية",
        "Price (Low to High)": "السعر (من الأدنى إلى الأعلى)",
        "Price (High to Low)": "السعر (من الأعلى إلى الأدنى)",
        "Rating": "التقييم",
        "+ Add service": "+ إضافة خدمة",
        "Failed to load services.": "فشل في تحميل الخدمات.",
        "No services found matching your criteria.": "لم يتم العثور على خدمات تطابق معاييرك.",
        "Consulting": "استشارات",
        "Programming": "برمجة",
        "Engineering and architecture": "هندسة معمارية",
        "Design": "تصميم",
        "Marketing": "تسويق",
        "Video & editing": "فيديو ومونتاج",
        "Translation": "ترجمة",
        "Web Design": "تصميم مواقع",
        "Business & consulting": "أعمال واستشارات",
        "Engineering": "هندسة",
        "Training & education": "تدريب وتعليم",
        "Another services": "خدمات أخرى",
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


const ServicesPage: React.FC = () => {
    const [allServices, setAllServices] = useState<Service[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoriesFilter, setCategoriesFilter] = useState<string[]>([]);
    const [deliveryDurationFilter, setDeliveryDurationFilter] = useState('');
    const [minBudget, setMinBudget] = useState('');
    const [maxBudget, setMaxBudget] = useState('');
    const [rateFilter, setRateFilter] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 9;
    const { categoryParam } = useParams<{ categoryParam?: string }>();
    const [sortOption, setSortOption] = useState('Relevance');
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
        const fetchServices = async () => {
            setLoading(true);
            setError(null);
            try {
                let apiUrl = `${process.env.REACT_APP_BACK_URL}/services`;
                if (categoryParam && categoryParam !== 'another services') {
                    apiUrl = `${process.env.REACT_APP_BACK_URL}/services?section=${categoryParam.replace(/-/g, ' ')}`;
                }

                const response = await axios.get<ApiResponse>(apiUrl);
                const fetchedServices = response.data.data.data;
                setAllServices(fetchedServices);
                setLoading(false);
            } catch (e: any) {
                setError(translate("Failed to load services.", language));
                if (axios.isAxiosError(e)) {
                    const axiosError = e as AxiosError;
                    console.error("Axios error:", axiosError.message);
                } else {
                    console.error("An unexpected error occurred:", e);
                }
                setAllServices([]);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [categoryParam, language]); // Added language to dependency array

    useEffect(() => {
        setCategories([
            { name: translate("Consulting", language), image: "https://placehold.co/600x400/2ecc71/fff?text=Consulting" },
            { name: translate("Programming", language), image: "https://placehold.co/600x400/3498db/fff?text=Programming" },
            { name: translate("Engineering and architecture", language), image: "https://placehold.co/600x400/95a5a6/fff?text=Engineering+%26+Architecture" },
            { name: translate("Design", language), image: "https://placehold.co/600x400/FF5733/fff?text=Design" },
            { name: translate("Marketing", language), image: "https://placehold.co/600x400/e74c3c/fff?text=Marketing" },
            { name: translate("Video & editing", language), image: "https://placehold.co/600x400/f39c12/fff?text=Video+%26+editing" },
            { name: translate("Translation", language), image: "https://placehold.co/600x400/9b59b6/fff?text=Translation" },
            { name: translate("Web Design", language), image: "https://placehold.co/600x400/1abc9c/fff?text=Web+Design" },
            { name: translate("Business & consulting", language), image: "https://placehold.co/600x400/f1c40f/fff?text=Business+%26+consulting" },
            { name: translate("Engineering", language), image: "https://placehold.co/600x400/d35400/fff?text=Engineering" },
            { name: translate("Training & education", language), image: "https://placehold.co/600x400/8e44ad/fff?text=Training+%26+education" },
            { name: translate("Another services", language), image: "https://placehold.co/600x400/2c3e50/fff?text=More+Services" },
        ]);
    }, [language]);

    const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
        const fullStars = Math.floor(rating || 0);
        const hasHalfStar = (rating || 0) % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => <svg key={i} className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.176-6.545L.487 7.23l6.545-.953L10 0l2.868 6.277 6.545.953-4.711 4.315 1.176 6.545z"/></svg>)}
                {hasHalfStar && <svg className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.176-6.545L.487 7.23l6.545-.953L10 0v15z"/></svg>}
                {[...Array(emptyStars)].map((_, i) => <svg key={i} className="w-3 h-3 text-gray-300 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.176-6.545L.487 7.23l6.545-.953L10 0l2.868 6.277 6.545.953-4.711 4.315 1.176 6.545z"/></svg>)}
            </div>
        );
    };


    const ServiceCard: React.FC<ServiceCardProps> = ({ title, price, user, view_count = 305, rating_avg = user?.rate }) => {
        const serviceImage = user?.profilePhoto ? `http://127.0.0.1:8000/storage/${user.profilePhoto}` : imageUrl;

        return (
            <div className=" bg-white rounded-md shadow-sm overflow-hidden border border-gray-200">
                <div className="relative">
                    <img className="w-full h-40 object-cover" src={`${serviceImage}`} alt={title} onError={() => console.error('Error loading image')} style={{ height: '160px' }} />
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


useEffect(() => {
    if(localStorage.getItem('searchQuery')){
        console.log("as");
        setSearchQuery(localStorage.getItem('searchQuery') as string);
    }
}, [])

useEffect(() => {
        // localStorage.removeItem("query")
        setTimeout(() => {
            localStorage.removeItem("query");
        }, 600); // 60000ms = 1 minute
    })

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);

    const filteredServices = useMemo(() => {
        let currentServices = [...allServices];

        if (searchQuery) {
            currentServices = currentServices.filter(service =>
                service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.required_skills.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (categoriesFilter.length > 0) {
            currentServices = currentServices.filter(service =>
                categoriesFilter.includes(service.section)
            );
        }

        if (deliveryDurationFilter) {
            currentServices = currentServices.filter(service =>
                service.delivery_duration === deliveryDurationFilter
            );
        }

        const min = parseFloat(minBudget) || 0;
        const max = parseFloat(maxBudget) || Infinity;
        currentServices = currentServices.filter(service => {
            const price = parseFloat(service.price);
            return price >= min && price <= max;
        });

        if (rateFilter > 0) {
            currentServices = currentServices.filter(service =>
                (service.user.rate || 0) >= rateFilter
            );
        }

        if (sortOption === 'Price (Low to High)') {
            currentServices.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortOption === 'Price (High to Low)') {
            currentServices.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        } else if (sortOption === 'Rating') {
            currentServices.sort((a, b) => (b.user.rate || 0) - (a.user.rate || 0));
        }


        return currentServices;
    }, [allServices, searchQuery, categoriesFilter, deliveryDurationFilter, minBudget, maxBudget, rateFilter, sortOption]);

    useEffect(() => {
        const indexOfLastService = currentPage * servicesPerPage;
        const indexOfFirstService = indexOfLastService - servicesPerPage;
        setServices(filteredServices.slice(indexOfFirstService, indexOfLastService));
    }, [filteredServices, currentPage, servicesPerPage]);


    const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };


    const handleClearFilters = () => {
        setSearchQuery('');
        setCategoriesFilter([]);
        setDeliveryDurationFilter('');
        setMinBudget('');
        setMaxBudget('');
        setRateFilter(0);
        setCurrentPage(1);
        setSortOption('Relevance');
    };

    const sectionTitle = useMemo(() => {
        if (categoryParam) {
            const formattedCategory = categoryParam.replace(/-/g, ' ');
            return formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1);
        }
        return translate("Another services", language);
    }, [categoryParam, language]);


    const deliveryDurations = useMemo(() => {
        const durations = new Set<string>();
        allServices.forEach(service => {
            if (service.delivery_duration) {
                durations.add(service.delivery_duration);
            }
        });
        return Array.from(durations);
    }, [allServices]);

    const handleCategoryFilterChange = (name: string) => {
        if (categoriesFilter.includes(name)) {
            setCategoriesFilter(categoriesFilter.filter(cat => cat !== name));
        } else {
            setCategoriesFilter([...categoriesFilter, name]);
        }
        setCurrentPage(1);
    };

    const handleBudgetFilterChange = (type: 'min' | 'max', value: string): void => {
        if (type === 'min') {
            setMinBudget(value);
        } else {
            setMaxBudget(value);
        }
        setCurrentPage(1);
    };

    const handleRateFilterChange = (star: number): void => {
        setRateFilter(star);
        setCurrentPage(1);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
        setCurrentPage(1);
    };


    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="mt-20 container mx-auto px-4 py-8 flex flex-col md:flex-row font-sans">
            <div className="px-4 md:px-0 flex justify-end">
                <button onClick={toggleLanguage} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                    {language === 'en' ? 'عربي' : 'English'}
                </button>
            </div>
            {/* Filter Sidebar */}
            <aside className="w-full md:w-1/4 pr-8 mt-6 mb-8 md:mb-0"> {/* Adjusted width and margin for responsiveness */}
                <div className="sticky top-6">
                    <div className="mb-4">
                        <button onClick={handleClearFilters} className="text-sm text-orange-500 hover:underline block text-left">
                            {translate("Clear all filters", language)}
                        </button>
                    </div>

                    {/* Search for a service */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">{translate("Search for a service", language)}</h3>
                        <input
                            type="text"
                            placeholder={translate("Search services...", language)}
                            className="border p-2 rounded w-full text-sm" // Adjusted font size
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>

                    {/* Categories */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">{translate("Categories", language)}</h3>
                        <div className="space-y-2">
                            {categories.map(category => (
                                <div key={category.name} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`category-${category.name.replace(/\s+/g, '-')}`}
                                        className="form-checkbox h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                                        checked={categoriesFilter.includes(category.name)}
                                        onChange={() => handleCategoryFilterChange(category.name)}
                                    />
                                    <label htmlFor={`category-${category.name.replace(/\s+/g, '-')}`} className="ml-2 text-gray-700 text-sm"> {/* Adjusted font size */}
                                        {category.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Delivery duration */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">{translate("Delivery duration", language)}</h3>
                        <div className="space-y-2">
                            {deliveryDurations.map(duration => (
                                <div key={duration} className="flex items-center">
                                    <input
                                        type="radio"
                                        id={`delivery-${duration.replace(/\s+/g, '-')}`}
                                        name="deliveryDuration"
                                        className="form-radio h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                                        value={duration}
                                        checked={deliveryDurationFilter === duration}
                                        onChange={(e) => setDeliveryDurationFilter(e.target.value)}
                                    />
                                    <label htmlFor={`delivery-${duration.replace(/\s+/g, '-')}`} className="ml-2 text-gray-700 text-sm"> {/* Adjusted font size */}
                                        {duration}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Budget */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">{translate("Budget", language)}</h3>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                placeholder={translate("Minimum", language)}
                                className="border p-2 rounded w-1/2 text-sm" // Adjusted font size
                                value={minBudget}
                                onChange={(e) => handleBudgetFilterChange('min', e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder={translate("Maximum", language)}
                                className="border p-2 rounded w-1/2 text-sm" // Adjusted font size
                                value={maxBudget}
                                onChange={(e) => handleBudgetFilterChange('max', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Rate */}
                    <div>
                        <h3 className="font-semibold mb-2">{translate("Rate", language)}</h3>
                        <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button
                                    key={star}
                                    type="button"
                                    className={`focus:outline-none ${star <= rateFilter ? 'text-yellow-500' : 'text-gray-300'}`}
                                    onClick={() => handleRateFilterChange(star)}
                                >
                                    <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.176-6.545L.587 7.23l6.545-.953L10 0l2.868 6.277 6.545.953-4.711 4.315 1.176 6.545z"/></svg>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Services Grid */}
            <main className="w-full md:w-3/4"> {/* Adjusted width for responsiveness */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4"> {/* Adjusted alignment for responsiveness */}
                    <h2 className="text-2xl font-semibold capitalize mb-2 md:mb-0">{sectionTitle}</h2> {/* Added margin-bottom for stacked layout */}
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2"> {/* Responsive layout for sort and add button */}
                        <span className="text-sm text-gray-700 whitespace-nowrap">{translate("Sorted by", language)}</span> {/* Added whitespace-nowrap to prevent line break */}
                        <select
                            className="border p-1 rounded text-sm max-w-full md:max-w-xs" // Adjusted max-width for responsiveness
                            value={sortOption}
                            onChange={handleSortChange}
                        >
                            <option value="Relevance">{translate("Relevance", language)}</option>
                            <option value="Price (Low to High)">{translate("Price (Low to High)", language)}</option>
                            <option value="Price (High to Low)">{translate("Price (High to Low)", language)}</option>
                            <option value="Rating">{translate("Rating", language)}</option>
                        </select>
                        <Link to="/react/AddServiceForm">
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded text-sm whitespace-nowrap"> {/* Added whitespace-nowrap */}
                                {translate("+ Add service", language)}
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Responsive grid columns */}
                    {loading ? (
                        Array(9).fill(0).map((_, index) => <ServiceCardSkeleton key={index} />)
                    ) : services.length > 0 ? (
                        services.map(service => (
                            <Link key={service.id} to={`/react/StaticServiceCard/${service.id}`}>
                                <ServiceCard  {...service} />
                            </Link>
                        ))
                    ) : error ? (
                        <div className="text-red-500 text-center col-span-full">{error}</div> 
                    ) : (
                        <div className="text-gray-500 text-center col-span-full">{translate("No services found matching your criteria.", language)}</div> 
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                        <nav className="inline-flex space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 text-sm" // Adjusted font size
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100 text-sm ${currentPage === index + 1 ? 'bg-orange-500 text-white hover:bg-orange-600 border-orange-500' : ''}`} // Adjusted font size
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 text-sm" // Adjusted font size
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </nav>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ServicesPage;