import { useEffect, useState } from "react";

const navCategories = [
    {
      label: "Digital marketing & sales",
      dropdownItems: [
        { label: "Create a marketing plan", href: "#" },
        { label: "Execute an advertising campaign", href: "#" },
        { label: "Manage social media accounts", href: "#" },
        { label: "Manage an online store", href: "#" },
        { label: "Search engine optimization (SEO) for a website", href: "#" },
        { label: "Marketing consultation", href: "#" },
      ],
    },
    {
      label: "Consulting",
      dropdownItems: [
        { label: "Feasibility study for a business project", href: "#" },
        { label: "Feasibility study for a website", href: "#" },
        { label: "Data analysis using SPSS statistical software", href: "#" },
        {
          label: "Drafting terms and conditions and usage policies",
          href: "#",
        },
        { label: "Business plan", href: "#" },
        { label: "Drafting a contract or agreement", href: "#" },
        { label: "Reviewing an employment contract", href: "#" },
        { label: "Financial statements for a project", href: "#" },
        { label: "Market and competitor analysis", href: "#" },
      ],
    },
    {
      label: "Programming",
      dropdownItems: [
        { label: "Designing an Excel Program", href: "#" },
        { label: "Designing and Programming a New Mobile App", href: "#" },
        { label: "Programming a New Mobile App", href: "#" },
        { label: "Designing a New Mobile App", href: "#" },
        { label: "Adding Features to a Mobile App", href: "#" },
        {
          label: "Maintaining a Mobile App and Solving Software Issues",
          href: "#",
        },
        { label: "Converting a Website to a Mobile App", href: "#" },
        { label: "Designing and Programming a Website", href: "#" },
        { label: "Programming a Website", href: "#" },
        { label: "Designing a Website", href: "#" },
        { label: "Developing an existing Website", href: "#" },
        {
          label: "Maintaining a Website and solving Software Issues",
          href: "#",
        },
      ],
    },
    {
      label: "Engineering",
      dropdownItems: [
        { label: "Interior decoration design for a villa", href: "#" },
        { label: "Exterior design for a villa", href: "#" },
        { label: "Facade design for a residential building", href: "#" },
        { label: "Designing plans for a residential building", href: "#" },
        {
          label: "Interior decoration design for a commercial store",
          href: "#",
        },
        { label: "Exterior design for a commercial project", href: "#" },
        { label: "Facade design for a commercial project", href: "#" },
        { label: "Designing plans for a commercial building", href: "#" },
        { label: "Interior decoration design for an apartment", href: "#" },
        { label: "Quantity surveying for a project", href: "#" },
        { label: "Engineering consultation", href: "#" },
      ],
    },
    {
      label: "Design, Video & Audio",
      dropdownItems: [
        { label: "Logo Design", href: "#" },
        { label: "Visual Identity Design", href: "#" },
        { label: "Redesign of Visual Identity", href: "#" },
        { label: "Voiceover", href: "#" },
        { label: "Motion Graphics Video Design", href: "#" },
        { label: "Intro/Outro Design for Videos", href: "#" },
        { label: "Marketing Image Design", href: "#" },
        { label: "Marketing Video Design", href: "#" },
        { label: "Video Editing", href: "#" },
        { label: "Resume Design", href: "#" },
        { label: "PowerPoint Design", href: "#" },
        { label: "UI/UX Design", href: "#" },
        { label: "Landing Page Design", href: "#" },
        { label: "Mobile App Design", href: "#" },
        { label: "Design Consultation", href: "#" },
      ],
    },
    {
      label: "Writing & translation",
      dropdownItems: [
        { label: "Article Writing", href: "#" },
        { label: "SEO-Optimized Article Writing", href: "#" },
        { label: "Writing Company Profiles", href: "#" },
        { label: "Content Translation", href: "#" },
        { label: "Marketing Content Writing", href: "#" },
        { label: "Script Writing", href: "#" },
        { label: "Product Description Writing", href: "#" },
        { label: "Resume Writing", href: "#" },
        { label: "Text Content Summarization", href: "#" },
        { label: "Audio Podcast Summarization", href: "#" },
        { label: "Video Lecture Summarization", href: "#" },
        { label: "Editorial Consultation", href: "#" },
      ],
    },
    {
      label: "Data Entry",
      dropdownItems: [
        { label: "Data Entry", href: "#" },
        { label: "Customer Service", href: "#" },
        { label: "Transcription of Files or Lectures", href: "#" },
        { label: "Transcription of Video Files or Podcasts", href: "#" },
        { label: "Secretarial or Virtual Assistant", href: "#" },
        { label: "Uploading Products to an Online Store", href: "#" },
        { label: "Technical Support Consultation", href: "#" },
      ],
    },
    {
      label: "Training & Education",
      dropdownItems: [
        { label: "Creating a Course or Training Package", href: "#" },
        { label: "Training on a Software Program", href: "#" },
        { label: "Explaining a Subject or Curriculum", href: "#" },
        { label: "Language Learning", href: "#" },
        { label: "Explaining a Programming Language", href: "#" },
        { label: "Educational Consultation", href: "#" },
      ],
    },
  ];

  const [dropdownStates, setDropdownStates] = useState(
    navCategories.map(() => false)
  );

  const handleMouseEnter = (index: number) => {
    const newDropdownStates = [...dropdownStates];
    newDropdownStates[index] = true;
    setDropdownStates(newDropdownStates);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setDropdownStates(navCategories.map(() => false));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleMouseLeave = (index: number) => {
    const newDropdownStates = [...dropdownStates];
    newDropdownStates[index] = false;
    setDropdownStates(newDropdownStates);
  };




const Nav = () => {
    <nav className="bg-[#404040] mt-[2px] text-white ">
    <ul className="flex">
      {navCategories.map((category, index) => (
        <li
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
          className="relative z-10"
        >
          <a
            href="#"
            className="block px-5 py-4 text-white hover:bg-[#404040]"
          >
            {category.label}
          </a>
          {dropdownStates[index] && category.dropdownItems && (
            <ul className="absolute left-0 mt-0 w-64 bg-[#404040] shadow-md z-10">
              {category.dropdownItems.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="border-b border-gray-700 last:border-b-0"
                >
                  <a
                    href={item.href} // Keep '#' for dropdown items if they are not routes
                    className="block px-5 py-3 text-white hover:bg-gray-700"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  </nav>
}


export default Nav;