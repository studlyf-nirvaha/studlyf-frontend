import { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

interface Blog {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  urlToImage: string; // <-- Change this
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/blogs`)
      .then(res => res.json())
      .then(data => setBlogs(data.blogs))
      .catch(err => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-white">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((b, index) => (
          <a key={index} href={b.url} target="_blank" rel="noopener noreferrer">
            <div className="bg-gray-800 rounded-lg p-4 hover:shadow-lg transition">
              <img src={b.urlToImage || "/placeholder.jpg"} alt={b.title} className="w-full h-40 object-cover rounded-md mb-4"/>
              <h2 className="text-xl font-semibold text-white">{b.title}</h2>
              <p className="text-gray-300">{b.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Blogs;