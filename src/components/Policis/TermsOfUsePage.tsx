
const TermsOfUsePage = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-32">
            <div className="container mx-auto bg-white rounded-lg shadow-md p-8 font-sans text-gray-700 max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Terms of use</h2>
                    <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Project Owners:</h3>
                    <div>
                        <h4 className="font-semibold mb-1">Rights Restrictions:</h4>
                        <ul className="list-disc ml-6 mb-3">
                            <li>Worklink ensures all rights and obligations between both parties when the agreement includes.</li>
                            <li>The project owner’s rights are guaranteed for 15 days after their approval of project completion.</li>
                            <li>There is no sharing of any personal or banking data with users (sole responsibility of the user).</li>
                            <li>Payments made on the platform are 100% secure.</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-1">Financial Transactions:</h4>
                        <ul className="list-disc ml-6 mb-3">
                            <li>Note: When project owner (as buyer in freelancer’s offer), they must fund their account with the agreed upon amount, plus 5% commission in tax.</li>
                            <li>Payment: The project owner must pay for the project using accepted payment methods (credit cards and PayPal).</li>
                            <li>In case of refund due to project cancellation, the amount will be automatically returned to the project owner’s account and can be used for hiring other freelancers.</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-1">3.Refunds/Bank Account:</h4>
                        <ul className="list-disc ml-6 mb-3">
                            <li>The project owner must contact the help center or withdraw their balance to a bank account.</li>
                            <li>When payment was made via Paypal, the refund request must be made within 17 days, as per Paypal’s policies.</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-1">4. Request for Personal Documents:</h4>
                        <ul className="list-disc ml-6 mb-3">
                            <li>Account verification through a passport is a routine procedure to protect user rights.</li>
                            <li>Additional documents may be required to confirm ownership of Paypal or credit card accounts.</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-1">5. Account Suspension:</h4>
                        <ul className="list-disc ml-6 mb-6">
                            <li>Posting fake projects or violating the law.</li>
                            <li>Implying the marketplace outside the platform.</li>
                            <li>Abusing or insulting other users or creating harmful user names.</li>
                            <li>Using a payment method that does not belong to the user or engaging in illegal activities (e.g., fraud, hacking).</li>
                        </ul>
                    </div>

                    <div className="border-t border-gray-300 mt-8 pt-6">
                        <h3 className="text-lg font-semibold mb-2">Freelancers:</h3>

                        <div>
                            <h4 className="font-semibold mb-1">1. Rights/Support:</h4>
                            <ul className="list-disc ml-6 mb-3">
                                <li>Freelancers must resolve disputes with clients amicably. If no solution is found, the help center should be contacted.</li>
                                <li>Adhering to the DRH1 (DRH1) ensures the freelancer’s right to receive earnings from completed projects.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-1">2. Request for Personal Documents:</h4>
                            <ul className="list-disc ml-6 mb-3">
                                <li>The platform may request personal ID confirmation to ensure account security, and match mandatory information provided during on the platform.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-1">3. Commissions:</h4>
                            <ul className="list-disc ml-6 mb-3">
                                <li>The platform deducts a 5% commission from the freelancer’s earnings.</li>
                                <li>Freelancers receive their earnings after completing at least 5 projects, activating newly made service sales.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-1">4. Earnings From a Banned Account:</h4>
                            <ul className="list-disc ml-6 mb-3">
                                <li>Freelancers can withdraw earnings from a banned account 30 days after suspension. COMMISSION WITH 10% REFUND.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-1">5. Reasons for Freelancer Account Suspension:</h4>
                            <ul className="list-disc ml-6 mb-6">
                                <li>Submitting the project before full completion.</li>
                                <li>Acting as intermediary to hire others to work on project.</li>
                                <li>Applying for projects they are not skilled in, delivering low-quality work, or submitting plagiarized content.</li>
                                <li>Requesting communication or payment outside the Worklink platform.</li>
                                <li>Negotiating a higher commission or attempting to evade the platform’s commission.</li>
                                <li>Canceling project without a valid reason or causing project cancellations.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-300 mt-8 pt-6">
                        <h3 className="text-lg font-semibold mb-2">General/Public:</h3>

                        <div>
                            <h4 className="font-semibold mb-1">Compliance with Terms:</h4>
                            <ul className="list-disc ml-6 mb-3">
                                <li>By registering on the platform, the user agrees to comply with the terms of use.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-1">Registration and Accounts:</h4>
                            <ul className="list-disc ml-6 mb-6">
                                <li>Users must be at least 18 years old, and documents may be required to verify this.</li>
                                <li>Users must provide accurate information for their accounts, including (name, profile picture, bank account details, etc).</li>
                                <li>Users are allowed to create only one account, creating multiple accounts is prohibited.</li>
                                <li>The user agrees to be the sole user of the account and is fully responsible for all actions taken through their account.</li>
                                <li>Users are solely responsible for their account and the confidentiality of account information.</li>
                                <li>Worklink reserves the right to delete content or suspend accounts if users step beyond rules they do not meet the rights to.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-300 mt-8 pt-6">
                        <h3 className="text-lg font-semibold mb-2">Financial Transactions:</h3>
                        <div>
                            <ul className="list-disc ml-6 mb-6">
                                <li>For freelancers: The social platform commission is 5%, with 2% commission after completing at least five projects (including newly made service sales).</li>
                                <li>For service commission: A 5% commission is taken from freelancers.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-300 mt-8 pt-6">
                        <h3 className="text-lg font-semibold mb-2">Banned Categories:</h3>
                        <div>
                            <ul className="list-disc ml-6 mb-6">
                                <li>Worklink reserves the right to suspend accounts temporarily or permanently for the following reasons:</li>
                                <li>Selling fake projects or violating laws.</li>
                                <li>Implying marketplace outside the platform.</li>
                                <li>Mocking or insulting other users or causing harm to others.</li>
                                <li>Using a payment method that is not owned by or stolen from the account owner.</li>
                                <li>Attempting to harass Worklink or its users.</li>
                                <li>Selling fake accounts. If a user is discovered.</li>
                                <li>Allowing more than one person to use the same account.</li>
                            </ul>
                        </div>
                    </div>

                    <p className="mt-8">All the above primarily pertain to the terms and conditions for projects. As for services. <a href="#" className="text-blue-500 hover:underline">Press here</a></p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfUsePage;