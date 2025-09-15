import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const certifications = [
    {
        title: "Google IT Support Professional Certificate",
        provider: "Coursera",
        url: "https://www.coursera.org/professional-certificates/google-it-support",
        description: "Start your career in IT with this beginner-friendly, free-to-audit certification from Google. This program covers troubleshooting, customer service, networking, operating systems, system administration, and security. No prior experience required—perfect for students and career switchers. Gain hands-on skills and a valuable credential recognized by top employers."
    },
    {
        title: "CS50: Introduction to Computer Science",
        provider: "edX (Harvard)",
        url: "https://www.edx.org/course/cs50s-introduction-to-computer-science",
        description: "Harvard's legendary CS50 course is one of the most popular introductions to computer science. Learn programming, algorithms, data structures, web development, and more. Free to audit, with a paid certificate option. Highly recommended for beginners and those looking to strengthen their fundamentals."
    },
    {
        title: "Google Data Analytics Professional Certificate",
        provider: "Coursera",
        url: "https://www.coursera.org/professional-certificates/google-data-analytics",
        description: "Learn data analytics from Google. This certificate covers data cleaning, analysis, visualization, and tools like spreadsheets, SQL, and Tableau. Free to audit, with hands-on projects and a credential recognized by employers."
    },
    {
        title: "Meta Front-End Developer Professional Certificate",
        provider: "Coursera",
        url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
        description: "Meta's free-to-audit front-end developer certification. Learn HTML, CSS, JavaScript, React, and UI/UX best practices. Includes real-world projects and portfolio development."
    },
    {
        title: "AWS Cloud Practitioner Essentials",
        provider: "AWS Training",
        url: "https://www.aws.training/Details/Curriculum?id=20685",
        description: "Free foundational cloud certification from Amazon Web Services. Learn the basics of AWS Cloud, global infrastructure, security, pricing, and support. Prepares you for the AWS Certified Cloud Practitioner exam."
    },
    {
        title: "IBM Data Science Professional Certificate",
        provider: "Coursera",
        url: "https://www.coursera.org/professional-certificates/ibm-data-science",
        description: "IBM's data science certification, free to audit. Covers Python, SQL, data analysis, visualization, machine learning, and more. Includes hands-on labs and projects."
    },
    {
        title: "Microsoft Azure Fundamentals (AZ-900)",
        provider: "Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/paths/azure-fundamentals/",
        description: "Get started with cloud computing and Microsoft Azure. This learning path covers cloud concepts, core Azure services, security, privacy, and pricing. Free learning modules and a recognized certification exam."
    },
    {
        title: "Introduction to Cyber Security",
        provider: "FutureLearn (Open University)",
        url: "https://www.futurelearn.com/courses/introduction-to-cyber-security",
        description: "A free course from The Open University on FutureLearn. Learn about cyber security basics, threats, cryptography, network security, and how to protect yourself online. Free to join, with a paid certificate option."
    },
    {
        title: "Google Project Management: Professional Certificate",
        provider: "Coursera",
        url: "https://www.coursera.org/professional-certificates/google-project-management",
        description: "Learn project management fundamentals, agile, Scrum, and leadership skills. Free to audit, with hands-on projects and a Google credential."
    },
    {
        title: "Elements of AI",
        provider: "University of Helsinki",
        url: "https://www.elementsofai.com/",
        description: "A free online course by the University of Helsinki and Reaktor. Learn the basics of artificial intelligence, its applications, and societal impact. No programming required. Free certificate upon completion."
    },
    {
        title: "Responsive Web Design Certification",
        provider: "freeCodeCamp",
        url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
        description: "A comprehensive, free certification covering HTML, CSS, and responsive web design. Includes hands-on projects and a free certificate from freeCodeCamp."
    },
    {
        title: "Python for Everybody Specialization",
        provider: "Coursera (University of Michigan)",
        url: "https://www.coursera.org/specializations/python",
        description: "Learn Python programming from scratch. Covers data structures, web access, databases, and more. Free to audit, with a paid certificate option."
    },
    {
        title: "Introduction to Data Science",
        provider: "IBM (Cognitive Class)",
        url: "https://cognitiveclass.ai/courses/data-science-hands-open-source-tools-2",
        description: "A free course by IBM on Cognitive Class. Learn data science basics, open source tools, and hands-on labs. Free certificate upon completion."
    },
    {
        title: "Digital Marketing Certification",
        provider: "Google Digital Garage",
        url: "https://learndigital.withgoogle.com/digitalgarage/course/digital-marketing",
        description: "A free, in-depth digital marketing course from Google. Covers SEO, SEM, analytics, social media, and more. Free certificate upon completion."
    },
    {
        title: "Machine Learning",
        provider: "Coursera (Stanford University)",
        url: "https://www.coursera.org/learn/machine-learning",
        description: "Andrew Ng's world-famous machine learning course. Learn supervised and unsupervised learning, best practices, and real-world applications. Free to audit, with a paid certificate option."
    },
    {
        title: "Introduction to Artificial Intelligence (AI)",
        provider: "Coursera (IBM)",
        url: "https://www.coursera.org/learn/introduction-to-artificial-intelligence",
        description: "Learn the basics of AI, its applications, and ethical considerations. Free to audit, with a paid certificate option."
    },
    {
        title: "Khan Academy Computer Programming",
        provider: "Khan Academy",
        url: "https://www.khanacademy.org/computing/computer-programming",
        description: "Free interactive courses on JavaScript, HTML/CSS, SQL, and more. Includes hands-on coding challenges and projects."
    },
    {
        title: "Introduction to Linux",
        provider: "edX (Linux Foundation)",
        url: "https://www.edx.org/course/introduction-to-linux",
        description: "A free course from the Linux Foundation on edX. Learn Linux basics, command line, file systems, and more. Free to audit, with a paid certificate option."
    },
];

const Certifications = () => (
    <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-green-400">Free Certifications</h1>
                <p className="text-lg text-white/80 mb-10 text-center">Explore top free certification courses from trusted platforms. Click on any course to learn more and enroll for free.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {certifications.map((cert, idx) => (
                        <a
                            key={idx}
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block h-full"
                            style={{ textDecoration: 'none' }}
                        >
                            <Card
                                className="bg-black border-2 border-white/80 hover:border-fuchsia-500 transition-all duration-300 rounded-2xl shadow-xl flex flex-col h-full cursor-pointer"
                                style={{ boxShadow: '0 4px 32px 0 rgba(236, 72, 153, 0.15), 0 1.5px 8px 0 rgba(168, 85, 247, 0.10)' }}
                            >
                                <div className="flex-1 flex flex-col p-6 gap-4 min-h-[320px]">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
                                                {cert.title}
                                            </span>
                                        </div>
                                        <div className="text-pink-400 font-medium mb-2">{cert.provider}</div>
                                        <div className="text-white/90 text-base line-clamp-5 min-h-[100px]">
                                            {cert.title === "Google IT Support Professional Certificate"
                                                ? (
                                                    <>
                                                        Start your career in IT with this beginner-friendly, free-to-audit certification from Google. <br />
                                                        <span className="block mt-2 text-white/70">
                                                            This program covers troubleshooting, customer service, networking, operating systems, system administration, and security. No prior experience required—perfect for students and career switchers. Gain hands-on skills and a valuable credential recognized by top employers.
                                                        </span>
                                                    </>
                                                )
                                                : cert.description
                                            }
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center mt-4">
                                        <Button className="bg-gradient-to-r from-fuchsia-500 via-pink-400 to-purple-500 hover:opacity-90 text-white font-semibold shadow-lg px-8 py-2.5 rounded-full border border-white/30">
                                            Go to Course
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </a>
                    ))}
                </div>
            </div>
        </div>
        <Footer />
    </div>
);

export default Certifications;
