// src/pages/CompanyJobsPage.jsx
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const COMPANIES = [
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    description: "Search engine giant offering internships and full-time roles worldwide.",
    applyLink: "https://careers.google.com/jobs/results/?q=internship",
  },
  {
    name: "Atlassian",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Atlassian-logo.svg",
    description: "Software company known for Jira, Confluence, and collaboration tools.",
    applyLink: "https://www.atlassian.com/company/careers/earlycareers",
  },
  {
    name: "Zoho",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Zoho_Logo.svg",
    description: "Cloud software company providing SaaS solutions for businesses.",
    applyLink: "https://www.zoho.com/careers/jobdetails/",
  },
  {
    name: "Salesforce",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Salesforce_logo.svg",
    description: "CRM leader providing cloud-based solutions for enterprises.",
    applyLink: "https://www.salesforce.com/company/careers/locations/india/",
  },
  {
    name: "Adobe",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Adobe_Corporate_Logo.png",
    description: "Creative software company offering design and multimedia solutions.",
    applyLink: "https://careers.adobe.com/us/en/",
  },
  {
    name: "Meta",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/01/Meta_Platforms_Inc._Logo.svg",
    description: "Social media and VR giant providing technology and design roles.",
    applyLink: "https://www.metacareers.com/jobs/",
  },
  {
    name: "Oracle",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
    description: "Multinational computer technology corporation providing cloud solutions.",
    applyLink: "https://www.oracle.com/corporate/careers/",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    description: "E-commerce and cloud computing leader offering diverse roles for students.",
    applyLink: "https://www.amazon.jobs/teams/internships-for-students",
  },
  {
    name: "TCS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/TCS_logo.svg",
    description: "Global IT services company offering internships and campus hiring.",
    applyLink: "https://www.tcs.com/careers/india",
  },
  {
    name: "IBM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    description: "Technology and consulting company with internship programs and full-time roles.",
    applyLink: "https://www.ibm.com/in-en/employment/",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_(2012).svg",
    description: "Global software company offering internships, graduate roles, and tech positions.",
    applyLink: "https://careers.microsoft.com/us/en/india",
  },
  {
    name: "NVIDIA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
    description: "Graphics and AI technology company providing student and research roles.",
    applyLink: "https://nvidia.wd5.myworkdayjobs.com/en-US/NVIDIAExternalCareerSite",
  },
  {
    name: "Qualcomm",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/66/Qualcomm_logo.svg",
    description: "Semiconductor and telecommunications company offering internships and jobs.",
    applyLink: "https://www.qualcomm.com/company/careers",
  },
  {
    name: "SAP Labs",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg",
    description: "Enterprise software company providing student internships and job opportunities.",
    applyLink: "https://jobs.sap.com/content/students/",
  },
  {
    name: "VMware",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/VMware_logo.svg",
    description: "Cloud computing and virtualization company offering research and internship roles.",
    applyLink: "https://www.vmware.com/resources/research/students",
  },
];

const CompanyJobsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-4 pt-20 pb-24 relative">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center mb-10 bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent drop-shadow-lg uppercase">
          Top Product-Based Internships & Jobs 🚀
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {COMPANIES.map((company) => (
            <div
              key={company.name}
              className="border rounded-xl shadow-lg p-4 hover:shadow-2xl transition duration-300 bg-white/5"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-16 mx-auto mb-4 object-contain"
              />
              <h2 className="text-xl font-semibold mb-2 text-center">{company.name}</h2>
              <p className="text-gray-300 mb-4 text-center">{company.description}</p>
              <a
                href={company.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Apply Now →
              </a>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CompanyJobsPage;
