import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ✅ Helper — removes repeated first letters/words and broken duplicates
const fixText = (text: string = "") => {
  if (!text) return "";

  // 1️⃣ Fix repeated first letters at start (e.g., "GGoogle" → "Google")
  text = text.replace(/^([A-Za-z])\1+/g, "$1");

  // 2️⃣ Fix repeated first word even if first letter was repeated
  //    (e.g., "Google Google Data Analytics" → "Google Data Analytics")
  text = text.replace(/^(\b\w+\b)(\s+\1\b)+/i, "$1");

  return text.trim();
};

// ✅ TypeScript type for certifications
interface Certification {
  name?: string;
  title?: string;
  provider?: string;
  description?: string;
  url: string;
}

const Certifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5001/certifications")
      .then((res) => res.json())
      .then((data) => setCertifications(data.certificates || []))
      .catch(console.error)
      .finally(() => setLoading(false));
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
            Explore top free certification courses from trusted platforms. Click
            on any course to learn more and enroll for free.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <span className="animate-pulse text-white/60">
                  Loading certifications...
                </span>
              </div>
            ) : (
              certifications.map((cert, idx) => (
                <Card
                  key={idx}
                  className="bg-black border-2 border-white/80 hover:border-fuchsia-500 transition-all duration-300 rounded-2xl shadow-xl flex flex-col h-full cursor-pointer"
                  style={{
                    boxShadow:
                      "0 4px 32px 0 rgba(236, 72, 153, 0.15), 0 1.5px 8px 0 rgba(168, 85, 247, 0.10)",
                  }}
                  onClick={() => window.open(cert.url, "_blank")}
                >
                  <div className="flex-1 flex flex-col p-6 gap-4 min-h-[320px]">
                    <div>
                      {/* ✅ Heading */}
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
                          {fixText(cert.name || cert.title)}
                        </span>
                      </div>

                      {/* ✅ Provider */}
                      <div className="text-pink-400 font-medium mb-2">
                        {fixText(cert.provider)}
                      </div>

                      {/* ✅ Description */}
                      <div className="text-white/90 text-base line-clamp-5 min-h-[100px] overflow-hidden">
                        {fixText(cert.description)}
                      </div>
                    </div>

                    <div className="flex items-center justify-center mt-4">
                      <Button className="bg-gradient-to-r from-fuchsia-500 via-pink-400 to-purple-500 hover:opacity-90 text-white font-semibold shadow-lg px-8 py-2.5 rounded-full border border-white/30">
                        Go to Course
                      </Button>
                    </div>
                  </div>
                </Card>
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
