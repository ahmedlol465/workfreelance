import React, { useState } from 'react';
import {
    FaUser, FaBriefcase, FaMapMarkerAlt, FaStar, FaRegStar, FaDollarSign,
    FaRegClock, FaListAlt, FaRegPaperPlane, FaCalendarAlt, FaRegSmile,
    FaPaperclip, FaArrowDown, FaCheck // Added FaCheck
} from 'react-icons/fa';

// --- Types ---
interface FreelancerInfo {
    name: string;
    title: string;
    location: string;
    description: string;
    rating: number;
    avatarUrl?: string;
}

interface ProjectInfo {
    title: string;
    budget: number;
    currency: string;
    deliveryDuration: number;
    durationUnit: string;
    offersAverage: number;
    numOffers: number;
    publishDate: string;
}

interface ChatMessage {
    id: number;
    sender: 'me' | 'other'; // 'me' for orange bubble, 'other' for gray
    text: string;
    timestamp: string; // e.g., "from 2 h"
    dateSeparator?: string; // Optional date like "5/9/2024"
}

// --- Mock Data ---
const mockFreelancer: FreelancerInfo = {
    name: "Samy Mohamed",
    title: "Freelancer, level New",
    location: "Saudi arabia",
    description: "Programming, website and application development",
    rating: 4.5,
    // avatarUrl: '...' // Optional
};

const mockProjectInfo: ProjectInfo = {
    title: "Ready-made database for food items",
    budget: 305,
    currency: "$",
    deliveryDuration: 2,
    durationUnit: "days",
    offersAverage: 225,
    numOffers: 2,
    publishDate: "22/4/2024",
};

const mockChatMessages: ChatMessage[] = [
    { id: 1, dateSeparator: "5/9/2024", sender: 'me', text: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum", timestamp: "from 2 h" },
    { id: 2, sender: 'other', text: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum", timestamp: "from 2 h" },
    { id: 3, sender: 'me', text: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum", timestamp: "from 2 h" },
    { id: 4, sender: 'other', text: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum", timestamp: "from 2 h" },
    // Add more messages if needed
];
// --- End Mock Data ---


// --- Helper Components (Inline) ---

// Star Rating Component
const StarRating: React.FC<{ rating: number; maxRating?: number }> = ({ rating, maxRating = 5 }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0; // Check for decimal part
    const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center text-yellow-400">
            {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} className="w-4 h-4" />)}
            {/* Render half star if needed - FaStarHalfAlt exists in react-icons */}
            {halfStar && <FaStar key="half" className="w-4 h-4" />}
            {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)}
            <span className="ml-1.5 text-sm font-medium text-gray-600">{rating.toFixed(1)}</span>
        </div>
    );
};

// Generic Card Component
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`bg-white rounded-lg shadow-sm p-4 md:p-5 ${className}`}>
        {children}
    </div>
);

// Project Info Item Row
const InfoRow: React.FC<{ icon: React.ReactElement; label: string; value: string | number }> = ({ icon, label, value }) => (
    <div className="flex justify-between items-center text-sm">
        <div className="flex items-center text-gray-600">
            {React.cloneElement(icon, { className: 'w-4 h-4 mr-2 text-gray-400 flex-shrink-0' })}
            <span>{label}</span>
        </div>
        <span className="font-medium text-gray-800">{value}</span>
    </div>
);

// --- Main App Component ---
const Chat = () => {
    const freelancer = mockFreelancer;
    const projectInfo = mockProjectInfo;
    const chatMessages = mockChatMessages;
    const [messageInput, setMessageInput] = useState('');

    // Define brand color for reuse (ensure this matches tailwind.config.js if customized)
    const brandOrange = '#E67E22'; // Example color from image

    const handleSendMessage = () => {
        if (messageInput.trim() === '') return;
        console.log("Sending message:", messageInput);
        // TODO: Add logic to actually send message and update chatMessages state
        setMessageInput('');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
                    {projectInfo.title}
                </h1>
                <button
                    className="bg-[#E67E22] hover:bg-orange-700 text-white text-sm font-medium py-2 px-4 rounded-md flex items-center transition duration-150"
                    // style={{ backgroundColor: brandOrange }} // Alternative if color isn't in Tailwind config
                >
                    Accept offer
                    <FaCheck className="ml-1.5 w-3 h-3" />
                </button>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">

                {/* Left Sidebar (Takes up 4 cols on large screens) */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Freelancer Account Card */}
                    <Card>
                        <div className="flex items-center mb-4 text-gray-700">
                            <FaUser className="w-4 h-4 mr-2" />
                            <h3 className="font-semibold text-sm">Freelancer account</h3>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                                {!freelancer.avatarUrl && <FaUser className="w-10 h-10 text-gray-400" />}
                                {/* <img src={freelancer.avatarUrl} alt={freelancer.name} className="w-full h-full rounded-full object-cover" /> */}
                            </div>
                            <h4 className="font-semibold text-gray-800">{freelancer.name}</h4>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                                <FaBriefcase className="w-3 h-3 mr-1" />
                                <span>{freelancer.title}</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                                <FaMapMarkerAlt className="w-3 h-3 mr-1" />
                                <span>{freelancer.location}</span>
                            </div>
                            <p className="text-xs text-orange-600 mt-2 px-2">{freelancer.description}</p>
                            <div className="mt-4 flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-600">Rate:</span>
                                <StarRating rating={freelancer.rating} />
                            </div>
                        </div>
                    </Card>

                    {/* Project Info Card */}
                    <Card>
                        <div className="flex items-center mb-4 text-gray-700">
                            <FaListAlt className="w-4 h-4 mr-2" />
                            <h3 className="font-semibold text-sm">Project Info</h3>
                        </div>
                        <div className="space-y-3">
                            <InfoRow icon={<FaDollarSign />} label="Budget" value={`${projectInfo.budget}${projectInfo.currency}`} />
                            <InfoRow icon={<FaRegClock />} label="Delivery duration" value={`${projectInfo.deliveryDuration} ${projectInfo.durationUnit}`} />
                            <InfoRow icon={<FaDollarSign />} label="Offers average" value={`${projectInfo.offersAverage}${projectInfo.currency}`} />
                            <InfoRow icon={<FaRegPaperPlane />} label="Number of offers" value={projectInfo.numOffers} />
                            <InfoRow icon={<FaCalendarAlt />} label="Publish date" value={projectInfo.publishDate} />
                        </div>
                    </Card>

                </div>

                {/* Right Chat Area (Takes up 8 cols on large screens) */}
                <div className="lg:col-span-8 bg-white rounded-lg shadow-sm flex flex-col" style={{ height: '75vh' }}> {/* Added fixed height */}

                    {/* Chat Messages Area */}
                    <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4">
                        {chatMessages.map((msg) => (
                            <React.Fragment key={msg.id}>
                                {msg.dateSeparator && (
                                    <div className="text-center text-xs text-gray-400 my-4">
                                        {msg.dateSeparator}
                                    </div>
                                )}
                                <div className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs md:max-w-md lg:max-w-lg px-3 py-2 rounded-lg ${
                                        msg.sender === 'me'
                                            ? 'bg-[#E67E22] text-white rounded-br-none' // Orange bubble, sharp bottom-right
                                            : 'bg-gray-100 text-gray-800 rounded-bl-none' // Gray bubble, sharp bottom-left
                                    }`}>
                                        <p className="text-sm">{msg.text}</p>
                                        <p className={`text-xs mt-1 ${
                                            msg.sender === 'me' ? 'text-orange-200 text-right' : 'text-gray-500 text-right'
                                        }`}>
                                            {msg.timestamp}
                                        </p>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Chat Input Area */}
                    <div className="border-t border-gray-200 p-3 md:p-4 flex items-center gap-3 bg-white rounded-b-lg"> {/* Ensure bg-white if parent isn't */}
                        <button className="text-gray-500 hover:text-gray-700 p-1">
                            <FaPaperclip className="w-5 h-5" />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 p-1">
                            <FaRegSmile className="w-5 h-5" />
                        </button>
                        {/* Add other icon if needed */}
                        {/* <button className="text-gray-500 hover:text-gray-700 p-1">
                            <FaArrowDown className="w-5 h-5" />
                        </button> */}
                        <input
                            type="text"
                            placeholder="write your message here"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="flex-grow border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400"
                        />
                        {/* Optional Send Button */}
                        {/* <button
                            onClick={handleSendMessage}
                            className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-4 py-1.5 text-sm"
                            >
                            Send
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;

// Remember to configure Tailwind colors in tailwind.config.js if you use custom ones like 'brand-orange':
/*
// tailwind.config.js
module.exports = {
  // ... other config
  theme: {
    extend: {
      colors: {
        'brand-orange': '#E67E22', // Example orange from image
      },
    },
  },
  plugins: [],
};
*/