
const GuaranteeYourRightsPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-32">
            <div className="container mx-auto bg-white rounded-lg shadow-md p-8 font-sans text-gray-700 max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Guarantee your rights</h2>
                    <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Guarantee Your Rights on Worklink</h3>
                    <p className="mb-4">At Worklink, we prioritize protecting your rights and ensuring a secure, fair experience for all users. Here’s how we guarantee your rights:</p>

                    <div>
                        <h4 className="font-semibold mb-2">For Freelancers</h4>
                        <ul className="list-disc ml-6 mb-4">
                            <li><span className="font-semibold">Fair Payment:</span> Ensure timely and secure payments for your work through our platform.</li>
                            <li><span className="font-semibold">Transparent Processes:</span> Access detailed records of all transactions and project progress.</li>
                            <li><span className="font-semibold">Dispute Resolution:</span> Receive support and fair mediation for any conflicts or issues that arise.</li>
                            <li><span className="font-semibold">Privacy Protection:</span> Your personal and financial information is safeguarded with advanced encryption.</li>
                            <li><span className="font-semibold">Quality Assurance:</span> We maintain high standards by reviewing profiles and projects to ensure quality.</li>
                            <li><span className="font-semibold">Support and Assistance:</span> Our dedicated team is available to assist with any questions or concerns.</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">For Foundation Owners</h4>
                        <ul className="list-disc ml-6 mb-4">
                            <li><span className="font-semibold">Fair Treatment:</span> Enjoy transparent and respectful management of projects and freelancer interactions.</li>
                            <li><span className="font-semibold">Secure Transactions:</span> All payments to freelancers are processed securely and according to agreed terms.</li>
                            <li><span className="font-semibold">Clear Communication:</span> Utilize effective communication channels to ensure clarity in project requirements.</li>
                            <li><span className="font-semibold">Conflict Resolution:</span> Access fair mediation and support to resolve disputes with freelancers.</li>
                            <li><span className="font-semibold">Data Security:</span> Your foundation’s sensitive information is protected with advanced security measures.</li>
                            <li><span className="font-semibold">Ongoing Support:</span> Get assistance to ensure a smooth and efficient experience on our platform.</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">How to Guarantee Your Rights</h4>
                        <ul className="list-disc ml-6 mb-4">
                            <li><span className="font-semibold">Follow Policies:</span> Adhere to Worklink’s terms and guidelines to maintain a positive status.</li>
                            <li><span className="font-semibold">Act Professionally:</span> Engage in respectful communication and meet deadlines to ensure smooth interactions.</li>
                            <li><span className="font-semibold">Deliver Quality Work:</span> Maintain high standards in your deliverables to build and protect your reputation.</li>
                            <li><span className="font-semibold">Communicate Promptly:</span> Respond quickly to messages and updates to foster effective collaboration.</li>
                        </ul>
                    </div>

                    <p className="mb-4">At Worklink, your satisfaction and security are our top priorities. We are committed to providing a reliable, transparent, and supportive environment for both freelancers and foundation owners.</p>
                    <p>For support, contact us at <a href="mailto:[Worklink@gmail.com]" className="text-blue-500 hover:underline">[Worklink@gmail.com]</a></p>
                </div>
            </div>
        </div>
    );
};

export default GuaranteeYourRightsPage;