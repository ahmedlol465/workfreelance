import { Link } from "react-router-dom";

const AboutUsPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto bg-white rounded-lg shadow-md p-8 font-sans text-gray-700 max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">About us</h2>
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
          <p className="mb-4">Welcome to Worklink!</p>
          <p className="mb-4">
            At Worklink, we are committed to revolutionizing the freelance
            experience. Our platform is designed to empower freelancers and
            clients by providing a seamless connection that drives collaboration
            and success. Whether you’re a freelancer seeking new opportunities
            or a client looking to hire top talent, Worklink is your go-to
            destination.
          </p>

          <h4 className="font-semibold mb-2">Our Vision</h4>
          <p className="mb-4">
            Our vision is to create a dynamic and supportive ecosystem for both
            freelancers and clients. We believe in the power of the freelance
            economy to drive innovation and creativity. Our goal is to make it
            easy for talented professionals to showcase their skills and for
            clients to find the perfect partner for their projects.
          </p>

          <h4 className="font-semibold mb-2">Worklink's Foundation</h4>
          <p className="mb-2">With Worklink, you can:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>
              Find talent: As a company, search for skilled professionals to
              fulfill your projects.
            </li>
            <li>
              Showcase your skills: As a freelancer, showcase your projects and
              attract potential clients.
            </li>
          </ul>
          <p className="mb-4">
            Through Worklink, you can search for employees as a company, sell
            your services, or display your projects, whether as a freelancer or
            as an owner of projects described in{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Terms of use
            </a>
            .
          </p>

          <p className="mb-4">
            At Worklink, we’re more than just a platform – we’re a community.
            Join us and find out how we can help you achieve your goals as a
            freelancer or find the perfect freelancer for your project.
            Together, we can change the way freelancing is done.
          </p>
          <p className="mb-4">Thank you for choosing Worklink!</p>
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

          <div className="border-t border-gray-300 mt-8 pt-6">
            <p className="mb-2">
              Worklink platform is affiliated with Mas Al-Afaq Information
              Technology Company, registered in the Kingdom of Saudi Arabia
              under number 1009046788
            </p>

            <h4 className="font-semibold mt-4 mb-2">
              About Mas Al-Afaq Information Technology Company
            </h4>
            <p className="mb-4">
              Mas Horizons Information Technology Company aims to work on
              developing the mechanism of work in the Arab world by providing
              solutions and products that help Arab youth to work and develop,
              in addition to a number of other projects in different fields, and
              it consists of a young and passionate work team from various Arab
              countries.
            </p>
            <p>
              Website: :{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Mass Horizons for Information Technology
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
