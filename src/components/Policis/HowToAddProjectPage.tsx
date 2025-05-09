import { Link } from "react-router-dom";

const HowToAddProjectPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-32">
      <div className="container mx-auto bg-white rounded-lg shadow-md p-8 font-sans text-gray-700 max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">how to add a project</h2>
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
          <h3 className="text-lg font-semibold mb-2">
            How to Add a Project on WorkLink
          </h3>

          <div>
            <h4 className="font-semibold mb-1">1. Log In</h4>
            <ul className="list-disc ml-6 mb-3">
              <li>Sign in to your WorkLink account.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-1">2. Start a New Project</h4>
            <ul className="list-disc ml-6 mb-3">
              <li>Go to “Post a Project” in your dashboard.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-1">3. Enter Project Details</h4>
            <ul className="list-disc ml-6 mb-3">
              <li>
                <span className="font-semibold">Title:</span> Add a descriptive
                title.
              </li>
              <li>
                <span className="font-semibold">Description:</span> Detail
                project goals and requirements.
              </li>
              <li>
                <span className="font-semibold">Category:</span> Choose the
                relevant category.
              </li>
              <li>
                <span className="font-semibold">Skills Required:</span> List
                necessary skills.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-1">4. Set Budget and Timeline</h4>
            <ul className="list-disc ml-6 mb-3">
              <li>
                <span className="font-semibold">Budget:</span> Define your
                budget (fixed or hourly).
              </li>
              <li>
                <span className="font-semibold">Timeline:</span> Specify start
                and end dates.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-1">5. Add Attachments</h4>
            <ul className="list-disc ml-6 mb-3">
              <li>Upload any relevant files or documents.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-1">6. Review and Publish</h4>
            <ul className="list-disc ml-6 mb-3">
              <li>Check details and click “Post” to make your project live.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-1">7. Manage Applications</h4>
            <ul className="list-disc ml-6 mb-6">
              <li>
                Review freelancer proposals and communicate via Worklink’s
                messaging system.
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
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowToAddProjectPage;
