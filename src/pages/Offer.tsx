import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  FaUser, FaMapMarkerAlt, FaDollarSign, FaRegClock, FaRegListAlt,
  FaRegPaperPlane, FaCalendarAlt, FaWrench, FaFileAlt, FaFilter, FaStar,
  FaRegStar, FaRegCommentAlt, FaFlag, FaCheck, FaSpinner // Added Spinner
} from 'react-icons/fa';
// import { API_HOST } from './App'; // Import the host URL (adjust path if needed)

// --- Types (Updated to match API response) ---

// Type for the User object from the API
interface ApiUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  role: string;
  accountType: string;
  isEmailVerified: number; // 0 or 1
  created_at: string;
  updated_at: string;
  profilePhoto: string | null;
  Region: string | null;
  Phone_number: string | null;
  Gender: string | null;
  type: string | null;
  rate: number | null;
}

// Type for the Offer object from the API
interface ApiOffer {
  id: number;
  project_id: number;
  freelancer_id: number; // We only get the ID, not full freelancer details here
  offer_text: string;
  num_replies: number;
  is_flagged: boolean; // Assuming boolean based on context, API shows false
  status: string;
  created_at: string;
  updated_at: string;
  // NOTE: API doesn't provide freelancer name/avatar/rating directly in the offer object
  // We might need another API call or adjust the backend if these are needed *per offer*.
}

// Type for the main Project data from the API
interface ApiProject {
  id: number;
  user_id: number;
  project_name: string;
  project_description: string;
  project_image: string | null;
  required_skills: string; // API returns a string, not array
  section: string;
  sub_section: string;
  project_link: string | null;
  project_question: string | null;
  status: string;
  created_at: string; // Publish date
  updated_at: string;
  duration: string; // Delivery duration
  budget: string; // Budget
  budgetTo: string | null;
  user: ApiUser; // Project Owner details
  offers: ApiOffer[]; // List of offers
}

// --- Component-Specific Types (Derived/Transformed from API Types) ---
// These types match what the UI components expect

interface ProjectOwner {
  id: number;
  name: string; // Combined from firstName/lastName or userName
  location: string | null;
  avatarUrl?: string; // Mapped from profilePhoto
}

interface ProjectInfo {
  budget: string; // Keep as string from API or parse if needed
  currency: string; // Assuming a default currency
  deliveryDuration: string; // Keep as string from API
  durationUnit: string; // Assuming 'days' based on mock
  // offersAverage: number; // Not directly available in API
  numSubmissions: number; // Calculated from offers.length
  publishDate: string; // Formatted from created_at
}

interface Offer {
  id: number;
  freelancer: {
    id: number; // Store the ID
    name: string; // Placeholder until details are fetched/available
    avatarUrl?: string; // Placeholder
  };
  // rating: number; // Not available in API offer
  timeAgo: string; // Calculated from created_at
  numReplies: number; // Mapped from num_replies
  offerText: string; // Mapped from offer_text
  isFlagged: boolean; // Mapped from is_flagged
}

interface ProjectData {
  id: number;
  title: string; // Mapped from project_name
  projectOwner: ProjectOwner;
  projectInfo: ProjectInfo;
  requiredSkills: string[]; // Split from required_skills string
  projectDetails: string; // Mapped from project_description
  offers: Offer[]; // Mapped from ApiOffer[]
  // Add other fields if needed by UI, e.g., project_image
  projectImageUrl?: string;
}

// --- Helper Functions ---

// Simple date formatter (can replace with a library like date-fns)
const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
  } catch (e) {
    return "Invalid Date";
  }
};

// Simple time ago function (can replace with a library like date-fns)
const formatTimeAgo = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;
    if (interval === 1) return `1 year ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
    if (interval === 1) return `1 month ago`;

    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    if (interval === 1) return `1 day ago`;

    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    if (interval === 1) return `1 hour ago`;

    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    if (interval === 1) return `1 minute ago`;

    return `${Math.floor(seconds)} seconds ago`;
  } catch (e) {
    return "just now";
  }
};


// Construct full image URL if the path is relative
const getFullImageUrl = (relativePath: string | null): string | undefined => {
  if (!relativePath) return undefined;
  // Assuming API_HOST includes the base domain, adjust if needed
  // Example: If API_HOST is 'http://domain.com/api' and image path is 'profiles/1.jpg'
  // we might need 'http://domain.com/storage/profiles/1.jpg'
  // This depends HEAVILY on your backend setup (Laravel storage links, etc.)
  // For now, let's assume the API_HOST gives the base domain needed.
  // *** YOU WILL LIKELY NEED TO ADJUST THIS LOGIC ***
  // const baseUrl = API_HOST.replace('/api', ''); // Attempt to get base domain
  // return `${baseUrl}/storage/${relativePath}`; // Common Laravel storage path structure
};


// --- Small Helper Components (Unchanged) ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm p-4 md:p-5 ${className}`}>
    {children}
  </div>
);

const IconText: React.FC<{ icon: React.ReactElement; text: string | number | null | undefined; className?: string }> = ({ icon, text, className = '' }) => (
  <div className={`flex items-center space-x-1.5 text-sm text-gray-600 ${className}`}>
    {React.cloneElement(icon, { className: 'w-4 h-4 text-gray-500 flex-shrink-0' })}
    <span>{text ?? 'N/A'}</span> {/* Handle null/undefined */}
  </div>
);

const StarRating: React.FC<{ rating: number; maxRating?: number }> = ({ rating, maxRating = 5 }) => {
    // Since rating is not in API offer, this might not be used or needs default data
    const fullStars = Math.floor(rating);
    const emptyStars = maxRating - fullStars;
    return (
      <div className="flex items-center text-yellow-400">
        {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} className="w-3.5 h-3.5" />)}
        {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} className="w-3.5 h-3.5 text-gray-300" />)}
      </div>
    );
  };


// --- Main Component ---
const Offers = () => {
  const { id: projectId } = useParams<{ id: string }>(); // Get project ID from URL
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // --- Fetch Project Data ---
  useEffect(() => {
    if (!projectId) {
      setError("Project ID is missing.");
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<{ message: string; data: ApiProject }>(
          `http://127.0.0.1:8000/api/projects/get-project/${projectId}`
        );

        if (response.data && response.data.data) {
          const apiData = response.data.data;

          // --- Transform API data to Component data structure ---
          const transformedData: ProjectData = {
            id: apiData.id,
            title: apiData.project_name,
            projectOwner: {
              id: apiData.user.id,
              name: `${apiData.user.firstName} ${apiData.user.lastName}`.trim() || apiData.user.userName,
              location: apiData.user.Region,
              avatarUrl: getFullImageUrl(apiData.user.profilePhoto),
            },
            projectInfo: {
              budget: apiData.budget, // Keep as string, add budgetTo if needed
              currency: "$", // Assuming $, API doesn't provide
              deliveryDuration: apiData.duration,
              durationUnit: "days", // Assuming 'days', API doesn't provide unit
              numSubmissions: apiData.offers?.length ?? 0,
              publishDate: formatDate(apiData.created_at),
            },
            requiredSkills: apiData.required_skills ? apiData.required_skills.split(/[, ]+/).filter(skill => skill) : [], // Split by comma or space
            projectDetails: apiData.project_description,
            projectImageUrl: getFullImageUrl(apiData.project_image),
            offers: apiData.offers?.map((apiOffer: ApiOffer): Offer => ({
              id: apiOffer.id,
              freelancer: {
                id: apiOffer.freelancer_id,
                // Placeholder - need to fetch details separately if required
                name: `Freelancer #${apiOffer.freelancer_id}`,
                avatarUrl: undefined, // Placeholder
              },
              // rating: 0, // Rating not available from API offer
              timeAgo: formatTimeAgo(apiOffer.created_at),
              numReplies: apiOffer.num_replies,
              offerText: apiOffer.offer_text,
              isFlagged: apiOffer.is_flagged,
            })) ?? [],
          };
          setProjectData(transformedData);
        } else {
          setError("Failed to retrieve project data structure.");
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message || "An unknown error occurred.");
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();

  }, [projectId]); // Re-fetch if projectId changes

  // --- ProgressBar Logic (Unchanged) ---
  const currentStep = 1; // Set the current step (can be dynamic based on project status later)
  const progressBarSteps = ['Receiving offers', 'Execution', 'Receipt'];
  const getStepClasses = (stepIndex: number) => {
    const isActive = stepIndex + 1 === currentStep;
    const isCompleted = stepIndex + 1 < currentStep;
    let circleClass = 'border-2 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 ';
    let textClass = 'text-xs md:text-sm mt-2 transition-colors duration-300 ';
    let lineClass = 'flex-1 h-px transition-colors duration-300 ';

    if (isActive) {
      circleClass += 'bg-brand-green border-brand-green text-white';
      textClass += 'text-brand-green font-semibold';
      lineClass += 'bg-gray-300';
    } else if (isCompleted) {
      circleClass += 'bg-brand-green border-brand-green text-white';
      textClass += 'text-gray-500';
      lineClass += 'bg-brand-green';
    } else {
      circleClass += 'bg-white border-gray-300 text-gray-400';
      textClass += 'text-gray-400';
      lineClass += 'bg-gray-300';
    }
    return { circleClass, textClass, lineClass };
  };

  // --- Truncate Logic (Unchanged) ---
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
  }

  // --- Render Loading State ---
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f4f7f6]">
        <FaSpinner className="animate-spin text-brand-green text-4xl" />
        <span className="ml-3 text-lg text-gray-600">Loading Project...</span>
      </div>
    );
  }

  // --- Render Error State ---
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 bg-[#f4f7f6] min-h-screen text-center">
        <h1 className="text-2xl text-red-600 mb-4">Error</h1>
        <p className="text-gray-700">{error}</p>
        <p className="mt-4">Could not load project details for ID: {projectId}</p>
      </div>
    );
  }

  // --- Render No Data State ---
  if (!projectData) {
    return (
        <div className="container mx-auto px-4 py-8 bg-[#f4f7f6] min-h-screen text-center">
        <h1 className="text-2xl text-gray-600">Project Not Found</h1>
        <p className="mt-4">No project data available for ID: {projectId}</p>
      </div>
    );
  }

  // --- Render Project Details ---
  return (
    <div className="container mx-auto px-4 py-8 bg-[#f4f7f6] min-h-screen">
      <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-4">
        {projectData.title}
      </h1>

      {/* ProgressBar
      <div className="w-full max-w-2xl mx-auto my-6 md:my-8 px-4">
        <div className="flex items-start">
          {progressBarSteps.map((step, index) => {
            const { circleClass, textClass, lineClass } = getStepClasses(index);
            const isLastStep = index === progressBarSteps.length - 1;
            return (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div className={circleClass}>
                    {index + 1 < currentStep ? <FaCheck /> : <span>{index + 1}</span>}
                  </div>
                  <span className={textClass + " text-center"}>{step}</span>
                </div>
                {!isLastStep && <div className={`${lineClass} mt-4`}></div>}
              </React.Fragment>
            );
          })}
        </div>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {/* --- Left Sidebar --- */}
        <div className="md:col-span-1 lg:col-span-1 space-y-6">

          {/* Project Owner Card */}
          <Card>
            <div className="flex items-center mb-4">
              <FaUser className="w-4 h-4 mr-2 text-gray-500" />
              <h3 className="font-semibold text-gray-700 text-sm">Project owner</h3>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-3 overflow-hidden"> {/* Added overflow-hidden */}
                {projectData.projectOwner.avatarUrl ? (
                   <img src={projectData.projectOwner.avatarUrl} alt={projectData.projectOwner.name} className="w-full h-full object-cover" />
                ) : (
                   <FaUser className="w-8 h-8 text-gray-500" />
                )}
              </div>
              <h4 className="font-semibold text-gray-800">{projectData.projectOwner.name}</h4>
              <IconText icon={<FaMapMarkerAlt />} text={projectData.projectOwner.location} className="mt-1" />
            </div>
          </Card>

          {/* Project Info Card */}
          <Card>
            <div className="flex items-center mb-4">
              <FaRegListAlt className="w-4 h-4 mr-2 text-gray-500" />
              <h3 className="font-semibold text-gray-700 text-sm">Project info</h3>
            </div>
            <div className="space-y-2.5">
              <IconText icon={<FaDollarSign />} text={`Budget: ${projectData.projectInfo.currency} ${projectData.projectInfo.budget}`} />
              <IconText icon={<FaRegClock />} text={`Delivery duration: ${projectData.projectInfo.deliveryDuration} ${projectData.projectInfo.durationUnit}`} />
              {/* Offers Average not available from API */}
              {/* <IconText icon={<FaDollarSign />} text={`Offers average: ${projectData.projectInfo.currency} ${projectData.projectInfo.offersAverage}`} /> */}
              <IconText icon={<FaRegPaperPlane />} text={`Number of submissions: ${projectData.projectInfo.numSubmissions}`} />
              <IconText icon={<FaCalendarAlt />} text={`Publish date: ${projectData.projectInfo.publishDate}`} />
            </div>
          </Card>

          {/* Required Skills Card */}
          <Card>
            <div className="flex items-center mb-4">
              <FaWrench className="w-4 h-4 mr-2 text-gray-500" />
              <h3 className="font-semibold text-gray-700 text-sm">Required skills</h3>
            </div>
             {projectData.requiredSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                {projectData.requiredSkills.map((skill) => (
                    <span
                    key={skill}
                    className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-yellow-300"
                    >
                    {skill}
                    </span>
                ))}
                </div>
             ) : (
                <p className="text-sm text-gray-500">No specific skills listed.</p>
             )}
          </Card>
        </div>

        {/* --- Right Content Area --- */}
        <div className="md:col-span-2 lg:col-span-3 space-y-6">

          {/* Project Details Card */}
          <Card>
            <div className="flex items-center mb-3">
              <FaFileAlt className="w-4 h-4 mr-2 text-gray-500" />
              <h3 className="font-semibold text-gray-700 text-sm">Project details</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap"> {/* Use pre-wrap to respect newlines in description */}
               {projectData.projectDetails}
               {/* Removed truncation, show full details */}
            </p>
             {/* Optionally display project image */}
             {projectData.projectImageUrl && (
                <div className="mt-4">
                    <img src={projectData.projectImageUrl} alt="Project visual" className="max-w-full h-auto rounded" />
                </div>
             )}
          </Card>

          {/* Offers List */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <FaFilter className="w-4 h-4 mr-2 text-gray-500" />
                <h3 className="font-semibold text-gray-700 text-sm">Offers ({projectData.offers.length})</h3>
              </div>
              {/* Optional: Add sorting/filtering controls here */}
            </div>
            <div className="space-y-4">
              {projectData.offers.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No offers received yet.</p>
              ) : (
                projectData.offers.map((offer) => (
                  // Offer Card Item
                  <div key={offer.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 relative">
                    {offer.isFlagged && (
                      <FaFlag className="absolute top-3 right-3 w-4 h-4 text-brand-orange" title="Flagged Offer" />
                    )}
                    <div className="flex items-start space-x-3 mb-3">
                      {/* Avatar Placeholder */}
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {offer.freelancer.avatarUrl ? (
                            <img src={offer.freelancer.avatarUrl} alt={offer.freelancer.name} className="w-full h-full object-cover" />
                        ) : (
                           <FaUser className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                      {/* Info */}
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                           {/* Display freelancer name (placeholder) or ID */}
                          <h4 className="font-semibold text-sm text-gray-800">{offer.freelancer.name}</h4>
                          {/* Flag moved to absolute positioning */}
                        </div>
                        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mt-1">
                          {/* StarRating removed as it's not in API offer */}
                          {/* <StarRating rating={offer.rating} /> */}
                          <div className="flex items-center">
                            <FaRegClock className="w-3 h-3 mr-1" />
                            <span>{offer.timeAgo}</span>
                          </div>
                          <div className="flex items-center">
                            <FaRegCommentAlt className="w-3 h-3 mr-1" />
                            <span>{offer.numReplies} {offer.numReplies === 1 ? 'reply' : 'replies'}</span>
                          </div>
                           {/* Display Freelancer ID for reference */}
                           <span className="text-gray-400">(ID: {offer.freelancer.id})</span>
                        </div>
                      </div>
                    </div>
                    {/* Offer Text */}
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 whitespace-pre-wrap"> {/* Use pre-wrap for offer text */}
                      {offer.offerText}
                      {/* Removed truncation */}
                    </p>
                    {/* Actions */}
                    <div className="flex items-center space-x-3">
                      <button className="text-sm text-brand-orange font-medium border border-orange-300 rounded-md px-4 py-1.5 hover:bg-orange-50 transition duration-150">
                        Contact freelancer {/* (Will need freelancer ID: {offer.freelancer.id}) */}
                      </button>
                      <button className="text-sm text-white font-medium bg-brand-orange rounded-md px-4 py-1.5 hover:bg-orange-600 transition duration-150">
                        Accept offer {/* (Will need offer ID: {offer.id}) */}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Offers;

// Remember to configure Tailwind colors in tailwind.config.js if you use custom ones like 'brand-orange' and 'brand-green':
/*
// tailwind.config.js
module.exports = {
  // ... other config
  theme: {
    extend: {
      colors: {
        'brand-orange': '#E67E22', // Example orange
        'brand-green': '#2ECC71', // Example green
      },
    },
  },
  plugins: [],
};
*/

// Also ensure your global CSS (e.g., src/index.css) includes Tailwind directives:
/*
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  // background-color: #f4f7f6; // Set on the main div instead
  font-family: sans-serif; // Example font
}
*/