import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/certifications")
      .then(res => res.json())
      .then(data => setCertifications(data.certificates || []))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-green-400">
            Free Certifications
          </h1>
          <p className="text-lg text-white/80 mb-10 text-center">
            Explore top free certification courses from trusted platforms. Click on any course to learn more and enroll for free.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {certifications.length === 0 ? (
              <p>Loading certifications...</p>
            ) : (
              certifications.map((cert, idx) => (
                <a
                  key={idx}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                  style={{ textDecoration: 'none' }}
                >
                  <Card className="bg-black border-2 border-white/80 hover:border-fuchsia-500 transition-all duration-300 rounded-2xl shadow-xl flex flex-col h-full cursor-pointer" style={{boxShadow: '0 4px 32px 0 rgba(236, 72, 153, 0.15), 0 1.5px 8px 0 rgba(168, 85, 247, 0.10)'}}>
                    <div className="flex-1 flex flex-col p-6 gap-4 min-h-[320px]">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
                            {cert.name || cert.title}
                          </span>
                        </div>
                        <div className="text-pink-400 font-medium mb-2">{cert.provider}</div>
                        <div className="text-white/90 text-base line-clamp-5 min-h-[100px]">
                          {cert.description}
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
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Certifications;