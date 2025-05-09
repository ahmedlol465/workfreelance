import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios and AxiosError type

type Country = {
    code: string;
    name: string;
};

type BankAccount = {
    id: number;
    beneficiary_name: string;
};

type AddAccountFormData = {
    beneficiaryName: string;
    iban: string;
    bicSwift: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    governorate: string;
    zipCode: string;
    country: string;
    terms: boolean[];
};

const translations = {
    en: {
        "Bank accounts": "Bank accounts",
        "Failed to load bank accounts. Please try again.": "Failed to load bank accounts. Please try again.",
        "Add account": "Add account",
        "Add a new bank account to your account": "Add a new bank account to your account",
        "Beneficiary name": "Beneficiary name",
        "Enter your beneficiary name": "Enter your beneficiary name",
        "IBAN": "IBAN",
        "Enter your IBAN": "Enter your IBAN",
        "BIC or SWIFT code": "BIC or SWIFT code",
        "Enter your BIC or SWIFT code": "Enter your BIC or SWIFT code",
        "Personal address": "Personal address",
        "Enter your beneficiary address 1": "Enter your beneficiary address 1",
        "Enter your beneficiary address 2": "Enter your beneficiary address 2",
        "City": "City",
        "Governorate": "Governorate",
        "ZIP code": "ZIP code",
        "Country": "Country",
        "This is to ensure that the beneficiary name matches the name registered on this bank ID": "This is to ensure that the beneficiary name matches the name registered on this bank ID",
        "The account information provided was personally checked and publicly verifiable since was registered data": "The account information provided was personally checked and publicly verifiable since was registered data",
        "I know that any false reporting from our team is a seriously enforcement": "I know that any false reporting from our team is a seriously enforcement",
        "I know that banking accounts data will result in account suspension": "I know that banking accounts data will result in account suspension",
        "Add": "Add",
        "Remove": "Remove",
        "Enter your city": "Enter your city",
    },
    ar: {
        "Bank accounts": "الحسابات البنكية",
        "Failed to load bank accounts. Please try again.": "فشل تحميل الحسابات البنكية. يرجى المحاولة مرة أخرى.",
        "Add account": "إضافة حساب",
        "Add a new bank account to your account": "إضافة حساب بنكي جديد إلى حسابك",
        "Beneficiary name": "اسم المستفيد",
        "Enter your beneficiary name": "أدخل اسم المستفيد",
        "IBAN": "IBAN",
        "Enter your IBAN": "أدخل رقم IBAN الخاص بك",
        "BIC or SWIFT code": "رمز BIC أو SWIFT",
        "Enter your BIC or SWIFT code": "أدخل رمز BIC أو SWIFT الخاص بك",
        "Personal address": "العنوان الشخصي",
        "Enter your beneficiary address 1": "أدخل عنوان المستفيد 1",
        "Enter your beneficiary address 2": "أدخل عنوان المستفيد 2",
        "City": "المدينة",
        "Governorate": "المحافظة",
        "ZIP code": "الرمز البريدي",
        "Country": "الدولة",
        "This is to ensure that the beneficiary name matches the name registered on this bank ID": "هذا لضمان تطابق اسم المستفيد مع الاسم المسجل في هوية هذا البنك",
        "The account information provided was personally checked and publicly verifiable since was registered data": "تم التحقق شخصيًا من معلومات الحساب المقدمة ويمكن التحقق منها علنًا لأنها بيانات مسجلة",
        "I know that any false reporting from our team is a seriously enforcement": "أعلم أن أي تقارير كاذبة من فريقكم ستؤدي إلى تطبيق إجراءات صارمة",
        "I know that banking accounts data will result in account suspension": "أعلم أن بيانات الحسابات البنكية الخاطئة ستؤدي إلى تعليق الحساب",
        "Add": "إضافة",
        "Remove": "إزالة",
        "Enter your city": "أدخل مدينتك",
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};


const BankAccountsComponent: React.FC = () => {
    const [accounts, setAccounts] = useState<BankAccount[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [formData, setFormData] = useState<AddAccountFormData>({
        beneficiaryName: '',
        iban: '',
        bicSwift: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        governorate: '',
        zipCode: '',
        country: '',
        terms: [false, false, false, false]
    });
    const [apiError, setApiError] = useState<string | null>(null);
    const [language, setLanguage] = useState<'en' | 'ar'>(
        localStorage.getItem('language') === 'ar' ? 'ar' : 'en'
    );

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage === 'ar' || storedLanguage === 'en') {
            setLanguage(storedLanguage);
        } else {
            setLanguage('en');
        }
    }, []);


    useEffect(() => {
        fetchBankAccounts();
    }, []);

    const fetchBankAccounts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/bankAccount', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            setAccounts(response.data);
            setApiError(null);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                let errorMessage = translate("Failed to load bank accounts. Please try again.", language);
                if (error.response) {
                    console.error("Error fetching bank accounts:", error.response.data);
                    if (error.response.status >= 500) {
                        errorMessage = `Server error: ${error.response.status} - ${errorMessage}`;
                    } else {
                        errorMessage = `Request error: ${error.response.status} - ${errorMessage}`;
                    }
                } else if (error.request) {
                    console.error("Error fetching bank accounts:", error.request);
                    errorMessage = "Network error: Could not reach the server.";
                } else {
                    console.error("Error fetching bank accounts:", error.message);
                    errorMessage = `Error: ${error.message}`;
                }
                setApiError(errorMessage);
            } else {
                // Non-axios error
                console.error("An unexpected error occurred:", error);
                setApiError("An unexpected error occurred. Please check the console for details.");
            }
        }
    };

    const countries: Country[] = [
        { code: 'EG', name: 'Egypt' },
        { code: 'US', name: 'United States' },
        { code: 'GB', name: 'United Kingdom' },
        { code: 'DE', name: 'Germany' }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (index: number) => {
        const newTerms = [...formData.terms];
        newTerms[index] = !newTerms[index];
        setFormData({ ...formData, terms: newTerms });
    };

    const handleCountrySelect = (country: string) => {
        setFormData({ ...formData, country });
        setShowCountryDropdown(false);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/bankAccount',
                {
                    beneficiaryName: formData.beneficiaryName,
                    iban: formData.iban,
                    bicSwift: formData.bicSwift,
                    addressLine1: formData.addressLine1,
                    addressLine2: formData.addressLine2,
                    city: formData.city,
                    governorate: formData.governorate,
                    zipCode: formData.zipCode,
                    country: formData.country,
                    terms: formData.terms,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            console.log("Success adding account:", response.data);
            fetchBankAccounts();
            setShowAddForm(false);
            setFormData({
                beneficiaryName: '',
                iban: '',
                bicSwift: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                governorate: '',
                zipCode: '',
                country: '',
                terms: [false, false, false, false]
            });
            setApiError(null);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                let errorMessage = `Failed to add bank account. Status: ${error.response?.status || 'Unknown'}`;
                if (error.response && error.response.data && error.response.data.errors) {
                    errorMessage += "\nValidation Errors:\n";
                    for (const field in error.response.data.errors) {
                        errorMessage += `${field}: ${error.response.data.errors[field].join(", ")}\n`;
                    }
                } else if (error.response) {
                    console.error("Error adding bank account:", error.response.data);
                    errorMessage = `Server error: ${error.response.status} - Failed to add bank account.`;
                } else if (error.request) {
                    console.error("Error adding bank account:", error.request);
                    errorMessage = "Network error: Could not reach the server to add bank account.";
                } else {
                    console.error("Error adding bank account:", error.message);
                    errorMessage = `Error: ${error.message}`;
                }
                setApiError(errorMessage);
            } else {
                // Non-axios error
                console.error("An unexpected error occurred:", error);
                setApiError("An unexpected error occurred while adding bank account. Please check the console for details.");
            }
        }
    };

    const handleRemoveAccount = async (id: string) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/bankAccount/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            fetchBankAccounts();
            setApiError(null);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                let errorMessage = translate("Failed to remove bank account. Please try again.", language);
                if (error.response) {
                    console.error("Error removing bank account:", error.response.data);
                    if (error.response.status >= 500) {
                        errorMessage = `Server error: ${error.response.status} - ${errorMessage}`;
                    } else {
                        errorMessage = `Request error: ${error.response.status} - ${errorMessage}`;
                    }
                } else if (error.request) {
                    console.error("Error removing bank account:", error.request);
                    errorMessage = "Network error: Could not reach the server to remove bank account.";
                } else {
                    console.error("Error removing bank account:", error.message);
                    errorMessage = `Error: ${error.message}`;
                }
                setApiError(errorMessage);
            } else {
                // Non-axios error
                console.error("An unexpected error occurred:", error);
                setApiError("An unexpected error occurred while removing bank account. Please check the console for details.");
            }
        }
    };

    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="max-w-3xl mt-16 md:mt-32 mx-auto bg-gray-100 min-h-screen p-4 md:p-6">
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">{translate("Bank accounts", language)}</h1>

            {apiError && <div className="text-red-500 mb-4 p-2 bg-red-100 rounded">{apiError}</div>}

            {accounts.map(account => (
                <div key={account.id} className="bg-white rounded p-3 mb-2 flex justify-between items-center shadow-sm">
                    <span className="font-medium">{account.beneficiary_name}</span>
                    <button
                        onClick={() => handleRemoveAccount(account.id.toString())}
                        className="bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            ))}

            {!showAddForm ? (
                <div
                    className="bg-white rounded p-4 flex justify-between items-center cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-200"
                    onClick={() => setShowAddForm(true)}
                >
                    <div>
                        <div className="font-medium">{translate("Add account", language)}</div>
                        <div className="text-xs text-gray-500">{translate("Add a new bank account to your account", language)}</div>
                    </div>
                    <button className="bg-orange-500 rounded-full p-1 hover:bg-orange-600 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded p-4 shadow-md">
                    <h2 className="text-lg font-bold mb-4">{translate("Add account", language)}</h2>

                    <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">{translate("Beneficiary name", language)}</label>
                        <input
                            type="text"
                            name="beneficiaryName"
                            value={formData.beneficiaryName}
                            onChange={handleInputChange}
                            placeholder={translate("Enter your beneficiary name", language)}
                            className="w-full border rounded p-2 text-sm"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">{translate("IBAN", language)}</label>
                        <input
                            type="text"
                            name="iban"
                            value={formData.iban}
                            onChange={handleInputChange}
                            placeholder={translate("Enter your IBAN", language)}
                            className="w-full border rounded p-2 text-sm"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">{translate("BIC or SWIFT code", language)}</label>
                        <input
                            type="text"
                            name="bicSwift"
                            value={formData.bicSwift}
                            onChange={handleInputChange}
                            placeholder={translate("Enter your BIC or SWIFT code", language)}
                            className="w-full border rounded p-2 text-sm"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">{translate("Personal address", language)}</label>
                        <input
                            type="text"
                            name="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleInputChange}
                            placeholder={translate("Enter your beneficiary address 1", language)}
                            className="w-full border rounded p-2 text-sm mb-2"
                        />
                        <input
                            type="text"
                            name="addressLine2"
                            value={formData.addressLine2}
                            onChange={handleInputChange}
                            placeholder={translate("Enter your beneficiary address 2", language)}
                            className="w-full border rounded p-2 text-sm"
                        />
                    </div>

                    <div className="md:flex mb-3 gap-2">
                        <div className="flex-1 mb-2 md:mb-0">
                            <label className="block text-sm font-medium mb-1">{translate("City", language)}</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder={translate("Enter your city", language)}
                                className="w-full border rounded p-2 text-sm"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">{translate("Governorate", language)}</label>
                            <input
                                type="text"
                                name="governorate"
                                value={formData.governorate}
                                onChange={handleInputChange}
                                placeholder={translate("Governorate", language)}
                                className="w-full border rounded p-2 text-sm"
                            />
                        </div>
                    </div>

                    <div className="md:flex mb-5 gap-2">
                        <div className="flex-1 mb-2 md:mb-0">
                            <label className="block text-sm font-medium mb-1">{translate("ZIP code", language)}</label>
                            <input
                                type="text"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleInputChange}
                                placeholder={translate("ZIP code", language)}
                                className="w-full border rounded p-2 text-sm"
                            />
                        </div>
                        <div className="flex-1 relative">
                            <label className="block text-sm font-medium mb-1">{translate("Country", language)}</label>
                            <div
                                className="w-full border rounded p-2 text-sm flex justify-between items-center cursor-pointer"
                                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                            >
                                <span>{formData.country || translate("Country", language)}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {showCountryDropdown && (
                                <div className="absolute z-10 w-full bg-white border mt-1 rounded shadow-lg">
                                    {countries.map(country => (
                                        <div
                                            key={country.code}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleCountrySelect(country.name)}
                                        >
                                            {country.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-5">
                        <div className="flex items-start mb-2">
                            <input
                                type="checkbox"
                                checked={formData.terms[0]}
                                onChange={() => handleCheckboxChange(0)}
                                className="mt-1 mr-2"
                            />
                            <span className="text-xs">{translate("This is to ensure that the beneficiary name matches the name registered on this bank ID", language)}</span>
                        </div>

                        <div className="flex items-start mb-2">
                            <input
                                type="checkbox"
                                checked={formData.terms[1]}
                                onChange={() => handleCheckboxChange(1)}
                                className="mt-1 mr-2"
                            />
                            <span className="text-xs">{translate("The account information provided was personally checked and publicly verifiable since was registered data", language)}</span>
                        </div>

                        <div className="flex items-start mb-2">
                            <input
                                type="checkbox"
                                checked={formData.terms[2]}
                                onChange={() => handleCheckboxChange(2)}
                                className="mt-1 mr-2"
                            />
                            <span className="text-xs">{translate("I know that any false reporting from our team is a seriously enforcement", language)}</span>
                        </div>

                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                checked={formData.terms[3]}
                                onChange={() => handleCheckboxChange(3)}
                                className="mt-1 mr-2"
                            />
                            <span className="text-xs">{translate("I know that banking accounts data will result in account suspension", language)}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="bg-orange-500 hover:bg-orange-600 text-white rounded py-2.5 px-4 w-full transition-colors duration-200"
                    >
                        {translate("Add", language)}
                    </button>
                </div>
            )}
        </div>
    );
};

export default BankAccountsComponent;