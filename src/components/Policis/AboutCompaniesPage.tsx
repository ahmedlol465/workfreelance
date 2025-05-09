import { Link } from "react-router-dom";

const AboutCompaniesPage = () => {
  return (
    <div className="py-32 bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto bg-white rounded-lg shadow-md p-8 font-sans text-gray-700 max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">About Companies</h2>
          <Link to="/react">
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
          </Link>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Why WorkLink?</h3>
          <div className="mb-4">
            <h4 className="font-semibold">1. Diverse Talent Pool</h4>
            <ul className="list-disc ml-6 mb-3">
              <li>
                Discover skilled freelancers with verified profiles and
                portfolios.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">2. Simplified Hiring</h4>
            <ul className="list-disc ml-6 mb-3">
              <li>
                Review proposals and communicate directly through the platform.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">3. Flexible Solutions</h4>
            <ul className="list-disc ml-6 mb-3">
              <li>Hire freelancers to meet short-term or long-term needs.</li>
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">4. Quality Assurance</h4>
            <ul className="list-disc ml-6 mb-3">
              <li>Benefit from vetted freelancers with client reviews.</li>
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">5. Efficient Management</h4>
            <ul className="list-disc ml-6 mb-6">
              <li>
                Track progress, provide feedback, and handle payments securely.
              </li>
            </ul>
          </div>

          <h3 className="text-lg font-semibold mb-2">How It Works</h3>
          <div className="mb-4">
            <h4 className="font-semibold">1. Sign Up</h4>
            <ul className="list-disc ml-6 mb-3">
              <li>Create a company account.</li>
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">2. Connect and Hire</h4>
            <ul className="list-disc ml-6 mb-3">
              <li>Review proposals and choose the best fit.</li>
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">3. Manage and Review</h4>
            <ul className="list-disc ml-6 mb-6">
              <li>Monitor progress and provide feedback.</li>
            </ul>
          </div>

          <p className="mb-4">
            Start today and transform your hiring process with Worklink.
          </p>

          <p className="mb-4">
            For support, contact us at{" "}
            <a
              href="mailto:[Worklink@mail.com]"
              className="text-blue-500 hover:underline"
            >
              [Worklink@mail.com]
            </a>
            .
          </p>

          <p className="text-center italic text-gray-500">
            (The section will be launched soon)
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutCompaniesPage;
