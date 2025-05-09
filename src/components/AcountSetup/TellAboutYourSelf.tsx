// import  { useState } from 'react';
// import * as RadioGroup from '@radix-ui/react-radio-group';

// const HowYouKnowForm = () => {
//   const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);

//   const options = [
//     { label: 'Search engine' },
//     { label: 'Social media'  },
//     { label: 'Article on the internet' },
//     { label: 'Someone told you' },
//     { label: 'Other'},
//   ];

//   return (
//     <div className="my-10  flex justify-center items-center py-10 p-6 rounded-xl w-[1000px] min-h-screen">
//       <form className="w-full pb-32 max-w-2xl bg-white p-8 rounded-lg transform transition-all duration-300 hover:shadow-xl">
//         <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
//           How do you know WorkLink?
//         </h2>

//         <RadioGroup.Root
//           className="grid gap-4"
//           value={selectedOption}
//           onValueChange={(value) => setSelectedOption(value)}
//         >
//           {options.map((option) => (
//             <label
//               key={option.label}
//               htmlFor={`option-${option.label}`}
//               className="group flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:border-orange-300 transition-colors duration-200 cursor-pointer"
//             >
//               <RadioGroup.Item
//                 value={option.label}
//                 id={`option-${option.label}`}
//                 className="peer disabled:opacity-70 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:outline-none border border-gray-300 rounded-full h-5 w-5 transition-colors duration-200"
//               />
//               <span className="flex items-center text-lg text-gray-700 peer-disabled:opacity-70">
//                 {option.label}
//               </span>
//             </label>
//           ))}
//         </RadioGroup.Root>
//       </form>
//     </div>
//   );
// };

// export default HowYouKnowForm;




import  { useState, useEffect } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';

const translations = {
    en: {
        "How do you know WorkLink?": "How do you know WorkLink?",
        "Search engine": "Search engine",
        "Social media": "Social media",
        "Article on the internet": "Article on the internet",
        "Someone told you": "Someone told you",
        "Other": "Other",
    },
    ar: {
        "How do you know WorkLink?": "كيف عرفت عن WorkLink؟",
        "Search engine": "محرك البحث",
        "Social media": "وسائل التواصل الاجتماعي",
        "Article on the internet": "مقال على الإنترنت",
        "Someone told you": "أخبرك شخص ما",
        "Other": "أخرى",
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};

const HowYouKnowForm = () => {
    const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
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


    const options = [
        { label: translate('Search engine', language) },
        { label: translate('Social media', language) },
        { label: translate('Article on the internet', language) },
        { label: translate('Someone told you', language) },
        { label: translate('Other', language) },
    ];

    return (
        <div  dir={language === 'ar' ? 'rtl' : 'ltr'} className="my-10  mr-28  flex justify-center items-center py-10 p-4 md:p-6 rounded-xl w-full md:w-[1000px] min-h-screen bg-gray-100"> {/* Responsive padding and width */}
            <form className="w-full pb-16 md:pb-32 max-w-2xl md:max-w-2xl bg-white p-6 md:p-8 rounded-lg transform transition-all duration-300 hover:shadow-xl"> {/* Responsive padding and width, reduced pb */}
                <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8"> {/* Responsive font size and margin */}
                    {translate("How do you know WorkLink?", language)}
                </h2>

                <RadioGroup.Root
                    className="grid gap-3 md:gap-4" // Responsive gap
                    value={selectedOption}
                    onValueChange={(value) => setSelectedOption(value)}
                >
                    {options.map((option) => (
                        <label
                            key={option.label}
                            htmlFor={`option-${option.label}`}
                            className="group flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-lg border border-gray-200 hover:border-orange-300 transition-colors duration-200 cursor-pointer" // Responsive padding and spacing
                        >
                            <RadioGroup.Item
                                value={option.label}
                                id={`option-${option.label}`}
                                className="peer disabled:opacity-70 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:outline-none border border-gray-300 rounded-full h-4 w-4 md:h-5 md:w-5 transition-colors duration-200" // Responsive size
                            />
                            <span className="flex items-center text-base md:text-lg text-gray-700 peer-disabled:opacity-70"> {/* Responsive font size */}
                                {option.label}
                            </span>
                        </label>
                    ))}
                </RadioGroup.Root>
            </form>
        </div>
    );
};

export default HowYouKnowForm;