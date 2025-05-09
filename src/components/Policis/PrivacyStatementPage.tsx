
const PrivacyStatementPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-32">
            <div className="container mx-auto bg-white rounded-lg shadow-md p-8 font-sans text-gray-700 max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Privacy statment</h2>
                    <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Privacy Policy Statement:</h3>
                    <ul className="list-disc ml-6 mb-4">
                        <li>The platform administration is committed, within the legal boundaries, to not disclose any personal information about users, such as address, phone number, email address, and others. Furthermore, none of this information will be exchanged, shared, or sold to any third party as long as it is within the platform’s technical capabilities. Access to this information will only be granted to qualified and professional personnel who manage the Worklink website.</li>
                    </ul>

                    <h3 className="text-lg font-semibold mb-2">Disclaimer of Legal Liability:</h3>
                    <ul className="list-disc ml-6 mb-4">
                        <li>The user acknowledges that they are solely responsible for the nature of their use of the Worklink website. The platform administration disclaims, to the fullest extent permitted by law, any liability for any losses, damages, expenses, or costs incurred by the user or any other party as a result of using or being unable to use the Worklink website.</li>
                    </ul>

                    <h3 className="text-lg font-semibold mb-2">User Account, Password, and Information Security:</h3>
                    <ul className="list-disc ml-6 mb-4">
                        <li>The user selects a password for their account and provides a personal email for correspondence.</li>
                        <li>The user is responsible for securing both the email and password and must not share or publish them. If any transactions are made using the user’s account, the user assumes full responsibility for the consequences, with no liability on the part of Worklink.</li>
                        <li>The user is fully responsible for all the content they publish on the platform.</li>
                        <li>The user agrees not to engage with the client or freelancer outside of the Worklink platform. Failure to comply with this may result in the suspension of the user’s account.</li>
                        <li>The user must adhere to the terms of use and refrain from posting any content that violates Islamic law or using the platform for illegal purposes. This includes, but is not limited to: hacking, distributing pirated software or materials, fraud, deception, forgery, threats, harassment of any person, company, or group, sharing pornographic or sexual content, spreading viruses or spyware, or linking to websites completing such violations.</li>
                        <li>The use of the platform for political purposes is strictly prohibited, and it is forbidden to target or offend any Arab or Islamic country in any form.</li>
                        <li>Violating intellectual property rights, defaming individuals, institutions, or companies, or intentionally sharing information that may harm a person, company, country, or group is strictly prohibited. The user is fully responsible for all content they share through their account on the platform.</li>
                    </ul>

                    <h3 className="text-lg font-semibold mb-2">Registration:</h3>
                    <ul className="list-disc ml-6 mb-4">
                        <li>Some sections of the site are only accessible to registered members after providing certain personal information.</li>
                        <li>By registering on the site, the user agrees that the information they provide is complete and accurate.</li>
                        <li>The user commits to not registering on the site or attempting to log in using another user’s name and will not use a name that the administration deems inappropriate. This includes, but is not limited to: phone numbers, names impersonating celebrities, website links, unintelligible names, and similar.</li>
                        <li>The user also agrees not to create more than one account on the Worklink platform. If the same individual is found using multiple accounts, all of their accounts may be permanently suspended without the possibility of reinstatement.</li>
                    </ul>

                    <h3 className="text-lg font-semibold mb-2">Content Moderation:</h3>
                    <ul className="list-disc ml-6 mb-4">
                        <li>The administration of the Worklink platform reserves the right to monitor any content submitted by users, although it is not obligated to do so, as it cannot oversee all user submissions. Therefore, it retains the right (without obligation) to delete, remove, or edit any materials that violate the platform’s terms and conditions without prior notice to the user.</li>
                        <li>Local, national, and international copyright laws and treaties protect all content on this site. By subscribing to the platform, the user implicitly and explicitly agrees to comply with the copyright notices displayed on its pages.</li>
                    </ul>

                    <p className="mt-6">This policy is subject to constant change and development. We encourage users to review it periodically and to contact us through the help center for any inquiries regarding its terms.</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyStatementPage;