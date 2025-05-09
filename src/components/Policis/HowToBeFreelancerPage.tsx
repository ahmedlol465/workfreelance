import { Link } from "react-router-dom";

const HowToBeFreelancerPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-32">
      <div className="container mx-auto bg-white rounded-lg shadow-md p-8 font-sans text-gray-700 max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">How to be a freelancer</h2>
          <Link to="/react"></Link>
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div>
          <p className="mb-4">
            Certainly! Here's a concise version of the guide, including
            conditions to avoid being banned:
          </p>

          <h3 className="text-lg font-semibold mb-2">
            How to Become a Freelancer on Worklink
          </h3>

          <div>
            <h4 className="font-semibold mb-1">1. Sign Up</h4>
            <ul className="list-disc ml-6 mb-3">
              <li>Register using email or social media.</li>
              <li>Verify your email to activate your account.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-1">2. Complete Your Profile</h4>
            <ul className="list-disc ml-6 mb-3">
              <li>Add personal info and a professional photo.</li>
              <li>Write a bio and showcase your portfolio.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-1">
              3. Set Up Skills and Services
            </h4>
            <ul className="list-disc ml-6 mb-3">
              <li>List your skills and outline the services you offer.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-1">4. Create Your Pricing</h4>
            <ul className="list-disc ml-6 mb-3">
              <li>Set your rates and specify your availability.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-1">5. Browse and Apply for Jobs</h4>
            <ul className="list-disc ml-6 mb-3">
              <li>Search for projects that match your skills.</li>
              <li>Submit proposals with your rate and timeline.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-1">6. Manage Your Work</h4>
            <ul className="list-disc ml-6 mb-3">
              <li>Communicate with clients using Worklink's messaging.</li>
              <li>Track tasks, meet deadlines, and submit work.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-1">7. Get Paid</h4>
            <ul className="list-disc ml-6 mb-3">
              <li>Receive payments through Worklink's secure system.</li>
              <li>Track your earnings in your account.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-1">8. Build Your Reputation</h4>
            <ul className="list-disc ml-6 mb-3">
              <li>Request reviews and deliver quality work.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-1">
              9. conditions to Avoid Being Banned
            </h4>
            <ul className="list-disc ml-6 mb-6">
              <li>
                Be Honest: Provide accurate information and avoid
                misrepresentation.
              </li>
              <li>
                Follow Policies: Adhere to Worklink's terms and guidelines.
              </li>
              <li>
                Act Professionally: Communicate respectfully and meet deadlines.
              </li>
              <li>Deliver Quality: Ensure high standards in your work.</li>
              <li>
                Communicate Promptly: Respond to client messages and updates in
                a timely manner.
              </li>
            </ul>
          </div>

          <p className="mt-8">
            For support, contact us at{" "}
            <a
              href="mailto:[Worklink@mail.com]"
              className="text-blue-500 hover:underline"
            >
              [Worklink@mail.com]
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowToBeFreelancerPage;
