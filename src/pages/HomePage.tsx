
import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
    const heroData = [
        {
          heading: "Get in Touch and Start Your Project today ,,",
          subText: "All Your buisiness needs and freelance will be here .",
          imageSrc: ""
        }
      ];
    
    
  return (
    <>
        <div>
      {heroData.map((hero, index) => (
        <div key={index} className="relative bg-white font-sans mb-20"> {/* Added mb-20 for spacing between sections */}
          {/* Decorative Circles - Orange Big */}
          <div className="absolute top-10 left-10">
            <div className="w-4 h-4 border border-orange-500 rounded-full"></div>
          </div>
          <div className="absolute top-20 left-5">
            <div className="w-4 h-4 border border-orange-500 rounded-full"></div>
          </div>
          <div className="absolute top-32 left-12">
            <div className="w-4 h-4 border border-orange-500 rounded-full"></div>
          </div>

          {/* Decorative Circles - Grey Big */}
          <div className="absolute top-12 left-20">
            <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
          </div>
          <div className="absolute top-28 left-24">
            <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
          </div>
          <div className="absolute top-40 left-18">
            <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
          </div>

          {/* Decorative Circles - Orange Small Right */}
          <div className="absolute top-20 right-20">
            <div className="w-2 h-2 border border-orange-500 rounded-full"></div>
          </div>
           <div className="absolute top-40 right-16">
            <div className="w-2 h-2 border border-orange-500 rounded-full"></div>
          </div>
           <div className="absolute top-10 right-24">
            <div className="w-2 h-2 border border-orange-500 rounded-full"></div>
          </div>

          {/* Decorative Circles - Grey Small Right */}
          <div className="absolute top-24 right-10">
            <div className="w-2 h-2 border border-gray-400 rounded-full"></div>
          </div>
           <div className="absolute top-36 right-5">
            <div className="w-2 h-2 border border-gray-400 rounded-full"></div>
          </div>
           <div className="absolute top-48 right-12">
            <div className="w-2 h-2 border border-gray-400 rounded-full"></div>
          </div>


          <div className="container mx-auto px-6 py-24 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">

              {/* Text and Input Section */}
              <div className="relative z-10 mt-12 md:mt-24">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">{hero.heading}</h1>
                <p className="text-gray-600 text-lg mb-10">{hero.subText}</p>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter The Title Of Project You Want To Emplement"
                    className="w-full md:w-auto px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-orange-500"
                  />
                  <button className="bg-orange-500 text-white px-8 py-3 rounded-md ml-3 hover:bg-orange-600 focus:outline-none">
                    Start Now
                  </button>
                </div>
              </div>

              {/* Image Section */}
              <div className="relative md:ml-8 lg:ml-16">
                 <div className="absolute top-0 left-0 w-full h-full bg-white shadow-lg transform skew-y-3 md:skew-y-6 lg:skew-y-12 -skew-x-3 md:-skew-x-6 lg:-skew-x-12 origin-top-left"></div>
                <img
                  src={hero.imageSrc}
                  alt="Hero Image"
                  className="relative z-20 rounded-md shadow-xl object-cover h-96 w-full md:h-auto"
                  style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)'}}
                />
              </div>
            </div>
          </div>

          {/* Search on Job Button */}
          <div className="flex justify-center mb-16">
            <button className="bg-gray-700 text-white px-12 py-3 rounded-md hover:bg-gray-800 focus:outline-none">
              Search on Job
            </button>
          </div>
        </div>
      ))}
    </div>
    <div className="font-sans bg-gray-50">
      {/* Category Carousel Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Find professional freelancers in all fields</h2>
          <div className="flex justify-between items-center mb-6">
            <button className="rounded-full bg-gray-100 hover:bg-gray-200 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button className="rounded-full bg-gray-100 hover:bg-gray-200 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {/* Marketing Category */}
            <div className="rounded-md overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1556761175-b413da4ca684?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hcmtldGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="Marketing" className="w-full h-48 object-cover" />
              <div className="bg-white p-4">
                <h3 className="text-lg font-semibold text-gray-700 text-center">Marketing</h3>
              </div>
            </div>
            {/* Video Editing Category */}
            <div className="rounded-md overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1611075897006-243ca67e187b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dmlkZW8lMjBlZGl0aW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Video Editing" className="w-full h-48 object-cover" />
              <div className="bg-white p-4">
                <h3 className="text-lg font-semibold text-gray-700 text-center">Video Editing</h3>
              </div>
            </div>
            {/* Translation Category */}
            <div className="rounded-md overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1582883242659-a3a8c7672e21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYW5zbGF0aW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Translation" className="w-full h-48 object-cover" />
              <div className="bg-white p-4">
                <h3 className="text-lg font-semibold text-gray-700 text-center">Translation</h3>
              </div>
            </div>
            {/* Web Design Category */}
            <div className="rounded-md overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1583508916403-0a8ba70981d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d2ViJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Web Design" className="w-full h-48 object-cover" />
              <div className="bg-white p-4">
                <h3 className="text-lg font-semibold text-gray-700 text-center">Web Design</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">About Us</h2>
            <div className="rounded-md overflow-hidden mb-6">
              <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bWFuJTIwd29ya2luZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="About Us 1" className="w-full h-64 object-cover" />
            </div>
             <div className="rounded-md overflow-hidden">
              <img src="https://images.unsplash.com/photo-1568373983806-c2a2545f1aeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="About Us 2" className="w-full h-64 object-cover" />
            </div>
          </div>
          <div className="text-white">
            <h2 className="text-3xl font-semibold mb-4">To Sum It Up For You ,,</h2>
            <p className="text-gray-300 mb-8">We connect freelancers with top digital and tech opportunities. Our platform simplifies the job search for talented professionals and helps companies find the best talent. We also offer a curated selection of freelance positions, tools for showcasing skills, and industry insights to help you succeed. Additionally, we have a section for quick services on our site to meet your needs more swiftly and effectively.</p>
            <div className="flex space-x-4">
              <button className="flex items-center bg-transparent border border-orange-500 text-orange-500 px-6 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-300">
                Read more
                <FaArrowRight className="ml-2" />
              </button>
              <button className="flex items-center bg-orange-500 text-white px-8 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300">
                Join now
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Be a Freelancer Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Be a Freelancer with us ,,</h2>
            <p className="text-gray-600 mb-8">Create your profile on Worklink to get started. Our simple registration process ensures you're up and running quickly. Fill out your profile with detailed information about your expertise, portfolio, and experience. Highlight what makes you unique to attract the right clients.</p>
            <div className="flex space-x-4">
              <button className="flex items-center bg-transparent border border-orange-500 text-orange-500 px-6 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-300">
                Read more
                <FaArrowRight className="ml-2" />
              </button>
              <button className="flex items-center bg-orange-500 text-white px-8 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300">
                Join now
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
          <div>
            <div className="rounded-md overflow-hidden mb-6">
              <img src="https://images.unsplash.com/photo-1517048676732-d658f5d31da5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="Freelancer 1" className="w-full h-64 object-cover" />
            </div>
             <div className="rounded-md overflow-hidden">
              <img src="https://images.unsplash.com/photo-1580894913533-5452c5a89d8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Freelancer 2" className="w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </section>

       {/* How To Be a Freelancer Section */}
       <section className="py-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">How To Add a Project</h2>
            <p className="text-gray-600 mb-8">You have your complete project that you would like to obtain through an independent contractor. Enter the details of the project, budget, and contractual period with you who wish to do so and share it for free. After that, the freelancers in the projects will see a page with you and they must choose the appropriate design for you to be independent and independent of the project.</p>
            <div className="flex space-x-4">
              <button className="flex items-center bg-transparent border border-orange-500 text-orange-500 px-6 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-300">
                Read more
                <FaArrowRight className="ml-2" />
              </button>
              <button className="flex items-center bg-orange-500 text-white px-8 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300">
                Join now
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
          <div>
             <div className="rounded-md overflow-hidden mb-6 bg-orange-100">
              <div className="bg-orange-500 text-white p-8 text-center">
                <h3 className="text-3xl font-bold">How To Be a Freelancer</h3>
              </div>
              <img src="https://images.unsplash.com/photo-1517048676732-d658f5d31da5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="Freelancer 1" className="w-full h-64 object-cover opacity-50 mix-blend-overlay" style={{ mixBlendMode: 'overlay', opacity: 0.5 }} />

            </div>
             <div className="rounded-md overflow-hidden">
              <img src="https://images.unsplash.com/photo-1580894913533-5452c5a89d8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Freelancer 2" className="w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </section>

       {/* About worklink for companies Section */}
       <section className="py-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">About worklink for companies</h2>
            <p className="text-gray-600 mb-8">Empower Your Projects with Top Freelancers Worklink connects your company with skilled freelancers to meet your needs.</p>
            <ul className="list-disc list-inside mb-8 text-gray-600">
                <li>Access Top Talent: Discover professionals with the expertise you require.</li>
                <li>Flexible Hiring Options: Choose from hourly, weekly, or monthly engagements.</li>
                <li>Streamlined Collaboration: Simplify project management and communication.</li>
            </ul>

            <p className="text-gray-600 mb-8">Join Worklink and enhance your team with the best freelance talent available.</p>

            <div className="flex space-x-4">
              <button className="flex items-center bg-transparent border border-orange-500 text-orange-500 px-6 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-300">
                More Info
                <FaArrowRight className="ml-2" />
              </button>
              <button className="flex items-center bg-orange-500 text-white px-8 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300">
                Join now
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
          <div>
             <div className="rounded-md overflow-hidden">
              <img src="https://images.unsplash.com/photo-1505373516603-4296d655a7a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbXBhbmllc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="Freelancer 1" className="w-full h-96 object-cover" />
            </div>
          </div>
        </div>
      </section>

    </div>
    </>

  );
};

export default Home;