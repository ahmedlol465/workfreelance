// import React, { useState, useEffect } from 'react';
// import { PlusCircle, Check, CreditCard as CreditCardIcon } from 'lucide-react';
// import axios from 'axios'; // Import axios

// // Types
// type CardFormData = {
//   cardHolder: string;
//   cardNumber: string; // Use snake_case to match API response
//   expiryDate: string;
//   saveForNextOrder: boolean; // Include saveForNextOrder in formData
// };

// interface CreditCardData extends CardFormData {
//     id: number; // Assuming backend returns id
//     card_number: string; // Use snake_case to match API response here too
// }

// type CreditCardProps = {
//   onAddCard?: (cardData: CardFormData) => void;
// };

// const CreditCardComponent: React.FC<CreditCardProps> = ({ onAddCard }) => {
//   // States
//   const [step, setStep] = useState<'initial' | 'form' | 'added' | 'error' | 'loading'>('initial'); // Add 'loading' state
//   const [formData, setFormData] = useState<CardFormData>({
//     cardHolder: '',
//     cardNumber: '', // Use snake_case here
//     expiryDate: '',
//     saveForNextOrder: false, // Initialize saveForNextOrder in formData
//   });
//   const [saveForNextOrder, setSaveForNextOrder] = useState<boolean>(false);
//   const [apiError, setApiError] = useState<string | null>(null); // State for API errors
//   const [creditCards, setCreditCards] = useState<CreditCardData[]>([]); // State to store fetched credit cards
//   const [loadingCards, setLoadingCards] = useState<boolean>(false); // Loading state for fetching cards

//   // Effect to fetch credit cards on component mount
//   useEffect(() => {
//     fetchCreditCards();
//   }, []);

//   const fetchCreditCards = async () => {
//     setLoadingCards(true);
//     setApiError(null); // Clear any previous errors
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/creditCard', {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,

//         }
//       }); // Use axios.get to fetch cards
//       console.log("API Response Data:", response.data); // Debug log
//       setCreditCards(response.data); // Assuming the API returns an array of credit card objects
//       setLoadingCards(false);
//       setStep('added');
//     } catch (error: any) {
//       console.error("Error fetching credit cards:", error);
//       setApiError("Failed to load credit cards.");
//       setLoadingCards(false);
//       setStep('initial'); // Optionally, go back to 'initial' state on fetch error
//     }
//   };


//   // Handlers
//   const handleInitialClick = () => {
//     setStep('form');
//     setApiError(null); // Clear any previous errors when form is opened
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setApiError(null); // Clear error on input change
//   };

//   const handleCheckboxChange = () => {
//     setSaveForNextOrder((prev) => !prev);
//     setFormData((prevFormData) => ({ // Update formData to keep checkbox state in sync
//       ...prevFormData,
//       saveForNextOrder: !prevFormData.saveForNextOrder,
//     }));
//   };

//   const handleSubmit = async () => {
//     setApiError(null); // Clear any previous API errors before submitting
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/creditCard', formData, {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,

//         }
//       }); // Use axios.post and API endpoint

//       if (response.status === 201) {
//         if (onAddCard) {
//           onAddCard(response.data.creditCard); // Pass back the created credit card data from API
//         }
//         setStep('added');
//         fetchCreditCards(); // Refresh the list of credit cards after adding
//       } else {
//         setStep('error'); // Set to error state if response is not successful but not an exception
//         setApiError(`Failed to add credit card. Status: ${response.status}`);
//       }
//     } catch (error: any) {
//       console.error("Error adding credit card:", error);
//       setStep('error'); // Set step to 'error' in case of exception
//       let errorMessage = 'Failed to add credit card. Please try again.';
//       if (axios.isAxiosError(error) && error.response) {
//         errorMessage = `Failed to add credit card. Status: ${error.response.status}. ${error.response.data.message || ''}`;
//       }
//       setApiError(errorMessage);
//     }
//   };


//   const handleAddAnotherCard = () => {
//     setStep('form');
//     setFormData({
//       cardHolder: '',
//       cardNumber: '', // Use snake_case here
//       expiryDate: '',
//       saveForNextOrder: false, // Reset checkbox state in formData
//     });
//     setSaveForNextOrder(false); // Reset checkbox UI state
//     setApiError(null); // Clear any errors when adding another card
//   };

//   // Render different views based on step
//   const renderContent = () => {
//     switch (step) {
//       case 'initial':
//         return (
//           <div
//             className="flex items-center justify-between p-3 border rounded-md cursor-pointer bg-white"
//             onClick={handleInitialClick}
//           >
//             <span className="text-gray-500">Add credit card</span>
//             <PlusCircle className="text-orange-500" size={20} />
//           </div>
//         );

//       case 'form':
//         return (
//           <div className="bg-white p-4 border rounded-md">
//             <div className="mb-4">
//               <p className="text-center font-medium mb-4">Credit card</p>
//               {apiError && <div className="text-red-500 mb-2">{apiError}</div>} {/* Display API error message */}
//               <div className="mb-4">
//                 <label className="block text-sm text-gray-600 mb-1">Name of card holder</label>
//                 <input
//                   type="text"
//                   name="cardHolder"
//                   value={formData.cardHolder}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                   placeholder="Enter your full name as on the card"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm text-gray-600 mb-1">Card number</label>
//                 <input
//                   type="text"
//                   name="cardNumber" // Use snake_case in input name to match formData
//                   value={formData.cardNumber} // Use snake_case here
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                   placeholder="XXXX XXXX XXXX XXXX"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm text-gray-600 mb-1">Card date</label>
//                 <input
//                   type="text"
//                   name="expiryDate"
//                   value={formData.expiryDate}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                   placeholder="MM/YY/CVC"
//                 />
//               </div>
//               <div className="flex items-center mb-4">
//                 <input
//                   type="checkbox"
//                   id="saveCard"
//                   checked={saveForNextOrder}
//                   onChange={handleCheckboxChange}
//                   className="mr-2"
//                 />
//                 <label htmlFor="saveCard" className="text-sm text-gray-600">
//                   Save for next order
//                 </label>
//               </div>
//             </div>
//             <button
//               onClick={handleSubmit}
//               className="bg-orange-500 text-white py-2 px-4 rounded-md w-full md:w-auto"
//             >
//               Add
//             </button>
//           </div>
//         );

//       case 'added':
//         return (
//           <div className="space-y-2">
//             {loadingCards ? (
//                 <div>Loading cards...</div>
//             ) : (
//                 creditCards.length > 0 ? (
//                     creditCards.map((card, index) => (
                        
//                         <div key={index} className="flex items-center justify-between p-3 border rounded-md bg-white">
//                             <div>
//                                 <div className="font-medium">{card.cardHolder}</div>
//                                 <div className="text-xs text-gray-500">Card ending in {card.card_number.slice(-4)}</div> 
//                             </div>
//                             <Check className="text-gray-500" size={20} />
//                         </div>
//                     ))
//                 ) : (
//                     <div className="text-center text-gray-500 p-3 bg-white rounded-md border">No credit cards added yet.</div>
//                 )
//             )}

//             <div
//               className="flex items-center justify-between p-3 border rounded-md bg-white cursor-pointer"
//               onClick={handleAddAnotherCard}
//             >
//               <span className="text-gray-500">Credit card</span>
//               <PlusCircle className="text-orange-500" size={20} />
//             </div>
//           </div>
//         );
//       case 'error':
//         return (
//           <div className="bg-white p-4 border rounded-md">
//             <p className="text-red-500 mb-4 text-center">Error adding credit card. Please try again.</p>
//             {apiError && <p className="text-red-600 text-sm mb-4 text-center">{apiError}</p>}
//             <button
//               onClick={handleAddAnotherCard} // Re-use handleAddAnotherCard to reset form
//               className="bg-orange-500 text-white py-2 px-4 rounded-md w-full md:w-auto"
//             >
//               Try Again
//             </button>
//           </div>
//         );
//       case 'loading':
//         return <div>Loading credit cards...</div>;

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="mt-32 w-full max-w-md mx-auto bg-gray-100 p-4">
//       <h2 className="text-center font-medium mb-4"><CreditCardIcon className="inline-block mr-2 align-text-top" size={20} />Credit card</h2>
//       {renderContent()}
//     </div>
//   );
// };

// export default CreditCardComponent;



import React, { useState, useEffect } from 'react';
import { PlusCircle, Check, CreditCard as CreditCardIcon } from 'lucide-react';
import axios from 'axios';

// Types and Interfaces (no changes needed)

type CardFormData = {
    cardHolder: string;
    cardNumber: string; // Use snake_case to match API response
    expiryDate: string;
    saveForNextOrder: boolean; // Include saveForNextOrder in formData
  };
  
  interface CreditCardData extends CardFormData {
      id: number; // Assuming backend returns id
      card_number: string; // Use snake_case to match API response here too
  }
  
  type CreditCardProps = {
    onAddCard?: (cardData: CardFormData) => void;
  };
const translations = {
    en: {
        "Credit card": "Credit card",
        "Add credit card": "Add credit card",
        "Name of card holder": "Name of card holder",
        "Enter your full name as on the card": "Enter your full name as on the card",
        "Card number": "Card number",
        "XXXX XXXX XXXX XXXX": "XXXX XXXX XXXX XXXX",
        "Card date": "Card date",
        "MM/YY/CVC": "MM/YY/CVC",
        "Save for next order": "Save for next order",
        "Add": "Add",
        "Loading cards...": "Loading cards...",
        "No credit cards added yet.": "No credit cards added yet.",
        // "Credit card": "Credit card", // Repeated, but that's okay
        "Error adding credit card. Please try again.": "Error adding credit card. Please try again.",
        "Try Again": "Try Again",
        "Loading credit cards...": "Loading credit cards...", // Repeated, but that's okay
        "Failed to load credit cards.": "Failed to load credit cards.",
        "Failed to add credit card. Status:": "Failed to add credit card. Status:",
    },
    ar: {
        "Credit card": "بطاقة الائتمان",
        "Add credit card": "إضافة بطاقة ائتمان",
        "Name of card holder": "اسم حامل البطاقة",
        "Enter your full name as on the card": "أدخل اسمك الكامل كما هو مدون على البطاقة",
        "Card number": "رقم البطاقة",
        "XXXX XXXX XXXX XXXX": "XXXX XXXX XXXX XXXX",
        "Card date": "تاريخ البطاقة",
        "MM/YY/CVC": "MM/YY/CVC",
        "Save for next order": "حفظ للطلب التالي",
        "Add": "إضافة",
        "Loading cards...": "جاري تحميل البطاقات...",
        "No credit cards added yet.": "لم يتم إضافة بطاقات ائتمان حتى الآن.",
        // "Credit card": "بطاقة الائتمان",
        "Error adding credit card. Please try again.": "خطأ في إضافة بطاقة الائتمان. يرجى المحاولة مرة أخرى.",
        "Try Again": "حاول مرة أخرى",
        "Loading credit cards...": "جاري تحميل البطاقات...",
        "Failed to load credit cards.": "فشل تحميل بطاقات الائتمان.",
        "Failed to add credit card. Status:": "فشل إضافة بطاقة الائتمان. الحالة:",
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};


const CreditCardComponent: React.FC<CreditCardProps> = ({ onAddCard }) => {
    // States (no changes needed)
    const [step, setStep] = useState<'initial' | 'form' | 'added' | 'error' | 'loading'>('initial');
    const [formData, setFormData] = useState<CardFormData>({
        cardHolder: '',
        cardNumber: '',
        expiryDate: '',
        saveForNextOrder: false,
    });
    const [saveForNextOrder, setSaveForNextOrder] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [creditCards, setCreditCards] = useState<CreditCardData[]>([]);
    const [loadingCards, setLoadingCards] = useState<boolean>(false);
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


    useEffect(() => { // Fetch credit cards - error message translated
        fetchCreditCards();
    }, []);

    const fetchCreditCards = async () => {
        setLoadingCards(true);
        setApiError(null);
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/creditCard', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            console.log("API Response Data:", response.data);
            setCreditCards(response.data);
        } catch (error: any) {
            console.error("Error fetching credit cards:", error);
            setApiError(translate("Failed to load credit cards.", language));
        } finally {
            setLoadingCards(false);
            setStep('added'); 
        }
    };


    // Handlers (no changes needed in logic, translations applied in renderContent)
    const handleInitialClick = () => {
        setStep('form');
        setApiError(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
        setApiError(null);
    };

    const handleCheckboxChange = () => {
        setSaveForNextOrder((prev) => !prev);
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            saveForNextOrder: !prevFormData.saveForNextOrder,
        }));
    };

    const handleSubmit = async () => { // Handle submit - error message translated
        setApiError(null);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/creditCard', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });

            if (response.status === 201) {
                if (onAddCard) {
                    onAddCard(response.data.creditCard);
                }
                setStep('added');
                fetchCreditCards();
            } else {
                setStep('error');
                setApiError(`${translate("Failed to add credit card. Status:", language)} ${response.status}`);
            }
        } catch (error: any) {
            console.error("Error adding credit card:", error);
            setStep('error');
            let errorMessage = translate('Error adding credit card. Please try again.', language);
            if (axios.isAxiosError(error) && error.response) {
                errorMessage = `${translate("Failed to add credit card. Status:", language)} ${error.response.status}. ${error.response.data.message || ''}`;
            }
            setApiError(errorMessage);
        }
    };


    const handleAddAnotherCard = () => { // No changes needed
        setStep('form');
        setFormData({
            cardHolder: '',
            cardNumber: '',
            expiryDate: '',
            saveForNextOrder: false,
        });
        setSaveForNextOrder(false);
        setApiError(null);
    };

    // Render different views based on step - all text content is translated here
    const renderContent = () => {
        switch (step) {
            case 'initial':
                return (
                    <div
                        className="flex items-center justify-between p-3 border rounded-md cursor-pointer bg-white"
                        onClick={handleInitialClick}
                    >
                        <span className="text-gray-500">{translate("Add credit card", language)}</span>
                        <PlusCircle className="text-orange-500" size={20} />
                    </div>
                );

            case 'form':
                return (
                    <div className="bg-white p-4 border rounded-md">
                        <div className="mb-4">
                            <p className="text-center font-medium mb-4">{translate("Credit card", language)}</p>
                            {apiError && <div className="text-red-500 mb-2">{apiError}</div>}
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600 mb-1">{translate("Name of card holder", language)}</label>
                                <input
                                    type="text"
                                    name="cardHolder"
                                    value={formData.cardHolder}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                    placeholder={translate("Enter your full name as on the card", language)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600 mb-1">{translate("Card number", language)}</label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                    placeholder={translate("XXXX XXXX XXXX XXXX", language)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600 mb-1">{translate("Card date", language)}</label>
                                <input
                                    type="text"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                    placeholder={translate("MM/YY/CVC", language)}
                                />
                            </div>
                            <div className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    id="saveCard"
                                    checked={saveForNextOrder}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                <label htmlFor="saveCard" className="text-sm text-gray-600">
                                    {translate("Save for next order", language)}
                                </label>
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="bg-orange-500 text-white py-2 px-4 rounded-md w-full md:w-auto"
                        >
                            {translate("Add", language)}
                        </button>
                    </div>
                );

            case 'added':
                return (
                    <div className="space-y-2">
                        {loadingCards ? (
                            <div>{translate("Loading cards...", language)}</div>
                        ) : (
                            creditCards.length > 0 ? (
                                creditCards.map((card, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 border rounded-md bg-white">
                                        <div>
                                            <div className="font-medium">{card.cardHolder}</div>
                                            <div className="text-xs text-gray-500">Card ending in {card.card_number.slice(-4)}</div>
                                        </div>
                                        <Check className="text-gray-500" size={20} />
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-500 p-3 bg-white rounded-md border">{translate("No credit cards added yet.", language)}</div>
                            )
                        )}

                        <div
                            className="flex items-center justify-between p-3 border rounded-md bg-white cursor-pointer"
                            onClick={handleAddAnotherCard}
                        >
                            <span className="text-gray-500">{translate("Credit card", language)}</span>
                            <PlusCircle className="text-orange-500" size={20} />
                        </div>
                    </div>
                );
            case 'error':
                return (
                    <div className="bg-white p-4 border rounded-md">
                        <p className="text-red-500 mb-4 text-center">{translate("Error adding credit card. Please try again.", language)}</p>
                        {apiError && <p className="text-red-600 text-sm mb-4 text-center">{apiError}</p>}
                        <button
                            onClick={handleAddAnotherCard}
                            className="bg-orange-500 text-white py-2 px-4 rounded-md w-full md:w-auto"
                        >
                            {translate("Try Again", language)}
                        </button>
                    </div>
                );
            case 'loading':
                return <div>{translate("Loading credit cards...", language)}</div>;

            default:
                return null;
        }
    };

    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="mt-10 md:mt-32 w-full max-w-md mx-auto bg-gray-100 p-4"> {/* Responsive margin */}
            <h2 className="text-center font-medium mb-4"><CreditCardIcon className="inline-block mr-2 align-text-top" size={20} />{translate("Credit card", language)}</h2>
            {renderContent()}
        </div>
    );
};

export default CreditCardComponent;