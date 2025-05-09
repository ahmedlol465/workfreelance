// import  { useState, useEffect } from "react";
// import axios from "axios";

// interface BalanceData {
//   id: number;
//   user_id: number;
//   total_balance: string;
//   pending_balance: string;
//   available_balance: string;
//   withdrawal_balance: string;
//   created_at: string;
//   updated_at: string;
//   user: any; // You can define a more specific User interface if needed
// }

// interface BalanceResponse {
//   success: boolean;
//   data: BalanceData;
// }

// const FinancialTransactions: React.FC = () => {
//   const [openinVoice, setOpenInvoice] = useState(false);
//   const [balanceData, setBalanceData] = useState<BalanceData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchBalance = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const authToken = localStorage.getItem('token');
//         if (!authToken) {
//           setError("Authentication token not found.");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get<BalanceResponse>(`${process.env.REACT_APP_BACK_URL}/user-balances`, {
//           headers: { Authorization: `Bearer ${authToken}` },
//         });
//         setBalanceData(response.data.data);
//         setLoading(false);
//       } catch (e: any) {
//         setError("Failed to load balance data.");
//         console.error("Error fetching balance:", e);
//         setLoading(false);
//       }
//     };

//     fetchBalance();
//   }, []);


//   const handleClickInvoicer = () => {
//     setOpenInvoice(true);
//   };
//   const handleClickfininctial = () => {
//     setOpenInvoice(false);
//   };

//   if (loading) {
//     return <div className="bg-gray-100 min-h-screen p-8">Loading Account Balance...</div>; // Or a loading spinner
//   }

//   if (error) {
//     return <div className="bg-gray-100 min-h-screen p-8 text-red-500">Error: {error}</div>;
//   }

//   const totalBalance = balanceData?.total_balance || "0.00";
//   const pendingBalance = balanceData?.pending_balance || "0.00";
//   const availableBalance = balanceData?.available_balance || "0.00";
//   const withdrawalBalance = balanceData?.withdrawal_balance || "0.00";


//   return (
//     <>
//       <div className="bg-gray-100 min-h-screen p-8">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Account balance
//             </h2>
//             <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//               Recharge balance
//             </button>
//           </div>

//           {/* Balance Overview */}
//           <div className="grid grid-cols-4 gap-4 mb-6">
//             <div>
//               <h4 className="text-sm text-gray-600">Total balance</h4>
//               <p className="text-lg font-semibold">{totalBalance} $</p>
//             </div>
//             <div>
//               <h4 className="text-sm text-gray-600">Pending balance</h4>
//               <p className="text-lg font-semibold">{pendingBalance} $</p>
//             </div>
//             <div>
//               <h4 className="text-sm text-gray-600">Available balance</h4>
//               <p className="text-lg font-semibold">{availableBalance} $</p>
//             </div>
//             <div>
//               <h4 className="text-sm text-gray-600">Withdrawal balance</h4>
//               <p className="text-lg font-semibold">{withdrawalBalance} $</p>
//             </div>
//           </div>

//           {/* Navigation */}
//           <div className="border-b mb-4">
//             <nav className="-mb-px flex space-x-8">
//               <button
//                 onClick={handleClickfininctial}
//                 className={`border-b-2 ${
//                   openinVoice
//                     ? " text-gray-500 border-b-2 border-transparent"
//                     : "border-orange-500 text-orange-600"
//                 } py-4 px-1 text-sm font-medium`}
//               >
//                 Financial transactions
//               </button>
//               <button
//                 onClick={handleClickInvoicer}
//                 className={` border-b-2 ${
//                   openinVoice
//                     ? " border-orange-500 text-orange-600"
//                     : " text-gray-500 border-b-2 border-transparent"
//                 }`}
//               >
//                 Invoices
//               </button>
//             </nav>
//           </div>
//           {openinVoice ? (
//             <div className="bg-gray-100 min-h-screen p-8">
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 {/* Filters */}
//                 <div className="mb-6">
//                   <h5 className="font-semibold text-gray-700 mb-2">
//                     The condition
//                   </h5>
//                   <div className="space-y-1">
//                     <div>
//                       <label className="inline-flex items-center">
//                         <input
//                           type="checkbox"
//                           className="form-checkbox h-4 w-4 text-orange-600"
//                           checked
//                         />
//                         <span className="ml-2 text-sm text-gray-700">Paid</span>
//                       </label>
//                     </div>
//                     <div>
//                       <label className="inline-flex items-center">
//                         <input
//                           type="checkbox"
//                           className="form-checkbox h-4 w-4 text-orange-600"
//                         />
//                         <span className="ml-2 text-sm text-gray-700">
//                           Waiting for payment
//                         </span>
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Invoice List */}
//                 <div className="border rounded-lg p-4 text-center text-gray-500">
//                   No search results
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 ">
//               {/* Filters */}
//               <div className="grid grid-cols-1 gap-4 mb-6">
//                 <div>
//                   <h5 className="font-semibold text-gray-700 mb-2">Period</h5>
//                   <div className="flex space-x-2">
//                     <input
//                       type="text"
//                       placeholder="From"
//                       className="border rounded py-2 px-3 text-sm"
//                     />
//                     <input
//                       type="text"
//                       placeholder="To"
//                       className="border rounded py-2 px-3 text-sm"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <h5 className="font-semibold text-gray-700 mb-2">
//                     Transaction type
//                   </h5>
//                   <div className="space-y-1">
//                     <div>
//                       <label className="inline-flex items-center">
//                         <input
//                           type="checkbox"
//                           className="form-checkbox h-4 w-4 text-orange-600"
//                           checked
//                         />
//                         <span className="ml-2 text-sm text-gray-700">
//                           Addition
//                         </span>
//                       </label>
//                     </div>
//                     <div>
//                       <label className="inline-flex items-center">
//                         <input
//                           type="checkbox"
//                           className="form-checkbox h-4 w-4 text-orange-600"
//                         />
//                         <span className="ml-2 text-sm text-gray-700">
//                           VIP fees
//                         </span>
//                       </label>
//                     </div>
//                     <div>
//                       <label className="inline-flex items-center">
//                         <input
//                           type="checkbox"
//                           className="form-checkbox h-4 w-4 text-orange-600"
//                         />
//                         <span className="ml-2 text-sm text-gray-700">
//                           Profits withdrawal fees
//                         </span>
//                       </label>
//                     </div>
//                     <div>
//                       <label className="inline-flex items-center">
//                         <input
//                           type="checkbox"
//                           className="form-checkbox h-4 w-4 text-orange-600"
//                         />
//                         <span className="ml-2 text-sm text-gray-700">
//                           Finish a project
//                         </span>
//                       </label>
//                     </div>
//                     <div>
//                       <label className="inline-flex items-center">
//                         <input
//                           type="checkbox"
//                           className="form-checkbox h-4 w-4 text-orange-600"
//                         />
//                         <span className="ml-2 text-sm text-gray-700">
//                           Correct a deal
//                         </span>
//                       </label>
//                     </div>
//                     <div>
//                       <label className="inline-flex items-center">
//                         <input
//                           type="checkbox"
//                           className="form-checkbox h-4 w-4 text-orange-600"
//                         />
//                         <span className="ml-2 text-sm text-gray-700">
//                           Cancel a deal
//                         </span>
//                       </label>
//                     </div>
//                     <div>
//                       <label className="inline-flex items-center">
//                         <input
//                           type="checkbox"
//                           className="form-checkbox h-4 w-4 text-orange-600"
//                         />
//                         <span className="ml-2 text-sm text-gray-700">
//                           Invoice
//                         </span>
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Transaction List */}
//               <div className="space-y-4 ml-[-150px]">
//                 <div className="border rounded-lg p-4">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="text-red-500 font-semibold">-30.00$</p>
//                       <p className="text-sm text-gray-700">
//                         Refund using credit card #0000
//                       </p>
//                     </div>
//                     <p className="text-xs text-gray-500">18/08/2024</p>
//                   </div>
//                 </div>
//                 <div className="border rounded-lg p-4">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="text-green-500 font-semibold">+30.00$</p>
//                       <p className="text-sm text-gray-700">
//                         Refund using credit card #0000
//                       </p>
//                     </div>
//                     <p className="text-xs text-gray-500">18/08/2024</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default FinancialTransactions;



import  { useState, useEffect } from "react";
import axios from "axios";

interface BalanceData {
  id: number;
  user_id: number;
  total_balance: string;
  pending_balance: string;
  available_balance: string;
  withdrawal_balance: string;
  created_at: string;
  updated_at: string;
  user: any; // You can define a more specific User interface if needed
}

interface BalanceResponse {
  success: boolean;
  data: BalanceData;
}

const translations = {
    en: {
        "Account balance": "Account balance",
        "Recharge balance": "Recharge balance",
        "Total balance": "Total balance",
        "Pending balance": "Pending balance",
        "Available balance": "Available balance",
        "Withdrawal balance": "Withdrawal balance",
        "Financial transactions": "Financial transactions",
        "Invoices": "Invoices",
        "The condition": "The condition",
        "Paid": "Paid",
        "Waiting for payment": "Waiting for payment",
        "No search results": "No search results",
        "Period": "Period",
        "From": "From",
        "To": "To",
        "Transaction type": "Transaction type",
        "Addition": "Addition",
        "VIP fees": "VIP fees",
        "Profits withdrawal fees": "Profits withdrawal fees",
        "Finish a project": "Finish a project",
        "Correct a deal": "Correct a deal",
        "Cancel a deal": "Cancel a deal",
        "Invoice": "Invoice",
        "Refund using credit card #0000": "Refund using credit card #0000",
    },
    ar: {
        "Account balance": "رصيد الحساب",
        "Recharge balance": "إعادة شحن الرصيد",
        "Total balance": "الرصيد الكلي",
        "Pending balance": "الرصيد المعلق",
        "Available balance": "الرصيد المتاح",
        "Withdrawal balance": "رصيد السحب",
        "Financial transactions": "المعاملات المالية",
        "Invoices": "الفواتير",
        "The condition": "الحالة",
        "Paid": "مدفوعة",
        "Waiting for payment": "في انتظار الدفع",
        "No search results": "لا توجد نتائج بحث",
        "Period": "الفترة",
        "From": "من",
        "To": "إلى",
        "Transaction type": "نوع المعاملة",
        "Addition": "إضافة",
        "VIP fees": "رسوم VIP",
        "Profits withdrawal fees": "رسوم سحب الأرباح",
        "Finish a project": "إنهاء مشروع",
        "Correct a deal": "تصحيح صفقة",
        "Cancel a deal": "إلغاء صفقة",
        "Invoice": "فاتورة",
        "Refund using credit card #0000": "استرداد باستخدام بطاقة الائتمان #0000",
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};

const FinancialTransactions: React.FC = () => {
  const [openinVoice, setOpenInvoice] = useState(false);
  const [balanceData, setBalanceData] = useState<BalanceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const language = localStorage.getItem('language') === 'ar' ? 'ar' : 'en'


  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true);
      setError(null);
      try {
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          setError("Authentication token not found.");
          setLoading(false);
          return;
        }

        const response = await axios.get<BalanceResponse>(`${process.env.REACT_APP_BACK_URL}/user-balances`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setBalanceData(response.data.data);
        setLoading(false);
      } catch (e: any) {
        setError("Failed to load balance data.");
        console.error("Error fetching balance:", e);
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);


  const handleClickInvoicer = () => {
    setOpenInvoice(true);
  };
  const handleClickfininctial = () => {
    setOpenInvoice(false);
  };

  if (loading) {
    return <div className="bg-gray-100 min-h-screen p-8">{translate("Loading Account Balance...", language)}</div>; // Or a loading spinner
  }

  if (error) {
    return <div className="bg-gray-100 min-h-screen p-8 text-red-500">Error: {error}</div>;
  }

  const totalBalance = balanceData?.total_balance || "0.00";
  const pendingBalance = balanceData?.pending_balance || "0.00";
  const availableBalance = balanceData?.available_balance || "0.00";
  const withdrawalBalance = balanceData?.withdrawal_balance || "0.00";


  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="bg-gray-100 min-h-screen p-4 md:p-8"> {/* Responsive padding */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6"> {/* Responsive padding */}
          {/* Header */}
          <div className="flex justify-between items-center mb-4 md:mb-6"> {/* Responsive margin */}
            <h2 className="text-lg md:text-xl font-semibold text-gray-800"> {/* Responsive text size */}
              {translate("Account balance", language)}
            </h2>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm md:text-base"> {/* Responsive text size */}
              {translate("Recharge balance", language)}
            </button>
          </div>

          {/* Balance Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6"> {/* Responsive grid and margin */}
            <div>
              <h4 className="text-sm text-gray-600">{translate("Total balance", language)}</h4>
              <p className="text-base md:text-lg font-semibold">{totalBalance} $</p> {/* Responsive text size */}
            </div>
            <div>
              <h4 className="text-sm text-gray-600">{translate("Pending balance", language)}</h4>
              <p className="text-base md:text-lg font-semibold">{pendingBalance} $</p> {/* Responsive text size */}
            </div>
            <div>
              <h4 className="text-sm text-gray-600">{translate("Available balance", language)}</h4>
              <p className="text-base md:text-lg font-semibold">{availableBalance} $</p> {/* Responsive text size */}
            </div>
            <div>
              <h4 className="text-sm text-gray-600">{translate("Withdrawal balance", language)}</h4>
              <p className="text-base md:text-lg font-semibold">{withdrawalBalance} $</p> {/* Responsive text size */}
            </div>
          </div>

          {/* Navigation */}
          <div className="border-b mb-4 md:mb-4"> {/* Responsive margin */}
            <nav className="-mb-px flex  md:space-x-8 space-x-4"> {/* Responsive spacing */}
              <button
                onClick={handleClickfininctial}
                className={`border-b-2 whitespace-nowrap ${ /* Prevent text wrapping on smaller screens */
                  openinVoice
                    ? " text-gray-500 border-b-2 border-transparent"
                    : "border-orange-500 text-orange-600"
                } py-4 px-1 text-sm font-medium`}
              >
                {translate("Financial transactions", language)}
              </button>
              <button
                onClick={handleClickInvoicer}
                className={` border-b-2 whitespace-nowrap ${ /* Prevent text wrapping on smaller screens */
                  openinVoice
                    ? " border-orange-500 text-orange-600"
                    : " text-gray-500 border-b-2 border-transparent"
                } py-4 px-1 text-sm font-medium`}
              >
                {translate("Invoices", language)}
              </button>
            </nav>
          </div>
          {openinVoice ? (
            <div className="bg-gray-100 min-h-screen p-4 md:p-8"> {/* Responsive padding */}
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6"> {/* Responsive padding */}
                {/* Filters */}
                <div className="mb-4 md:mb-6"> {/* Responsive margin */}
                  <h5 className="font-semibold text-gray-700 mb-2">{translate("The condition", language)}</h5>
                  <div className="space-y-1">
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-orange-600"
                          defaultChecked // Changed checked to defaultChecked for uncontrolled component
                        />
                        <span className="ms-2 text-sm text-gray-700">{translate("Paid", language)}</span> {/* Changed ml-2 to ms-2 */}
                      </label>
                    </div>
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-orange-600"
                        />
                        <span className="ms-2 text-sm text-gray-700"> {/* Changed ml-2 to ms-2 */}
                          {translate("Waiting for payment", language)}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Invoice List */}
                <div className="border rounded-lg p-4 text-center text-gray-500">
                  {translate("No search results", language)}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 "> {/* Responsive grid */}
              {/* Filters */}
              <div className="grid grid-cols-1 gap-4 mb-4 md:mb-6"> {/* Responsive grid and margin */}
                <div>
                  <h5 className="font-semibold text-gray-700 mb-2">{translate("Period", language)}</h5>
                  <div className="flex  md:space-x-2 flex-col md:flex-row space-y-2 md:space-y-0"> {/* Responsive flex and spacing */}
                    <input
                      type="text"
                      placeholder={translate("From", language)}
                      className="border rounded py-2 px-3 text-sm"
                    />
                    <input
                      type="text"
                      placeholder={translate("To", language)}
                      className="border rounded py-2 px-3 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-700 mb-2">{translate("Transaction type", language)}</h5>
                  <div className="space-y-1">
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-orange-600"
                          defaultChecked // Changed checked to defaultChecked for uncontrolled component
                        />
                        <span className="ms-2 text-sm text-gray-700"> {/* Changed ml-2 to ms-2 */}
                          {translate("Addition", language)}
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-orange-600"
                        />
                        <span className="ms-2 text-sm text-gray-700"> {/* Changed ml-2 to ms-2 */}
                          {translate("VIP fees", language)}
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-orange-600"
                        />
                        <span className="ms-2 text-sm text-gray-700"> {/* Changed ml-2 to ms-2 */}
                          {translate("Profits withdrawal fees", language)}
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-orange-600"
                        />
                        <span className="ms-2 text-sm text-gray-700"> {/* Changed ml-2 to ms-2 */}
                          {translate("Finish a project", language)}
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-orange-600"
                        />
                        <span className="ms-2 text-sm text-gray-700"> {/* Changed ml-2 to ms-2 */}
                          {translate("Correct a deal", language)}
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-orange-600"
                        />
                        <span className="ms-2 text-sm text-gray-700"> {/* Changed ml-2 to ms-2 */}
                          {translate("Cancel a deal", language)}
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-orange-600"
                        />
                        <span className="ms-2 text-sm text-gray-700"> {/* Changed ml-2 to ms-2 */}
                          {translate("Invoice", language)}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction List */}
              <div className="space-y-4 md:ms-[-50px] "> {/* Responsive margin */}
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-red-500 font-semibold">-30.00$</p>
                      <p className="text-sm text-gray-700">
                        {translate("Refund using credit card #0000", language)}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">18/08/2024</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-green-500 font-semibold">+30.00$</p>
                      <p className="text-sm text-gray-700">
                        {translate("Refund using credit card #0000", language)}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">18/08/2024</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialTransactions;
