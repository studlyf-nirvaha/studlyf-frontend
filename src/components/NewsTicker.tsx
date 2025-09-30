import { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

interface NewsItem {
  title: string;
  description?: string;
  url: string;
  source?: any;
  publishedAt?: string;
  urlToImage?: string; // Align with NewsAPI field name
}

const NewsTicker = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/tech-news`)
      .then(res => res.json())
      .then(data => setNewsItems(data.news))
      .catch(err => console.error("Error fetching news:", err));
  }, []);

  return (
    <div className="gradient-bg py-3 text-white overflow-hidden">
      <div className="flex whitespace-nowrap">
        {[...newsItems, ...newsItems].map((item, index) => (
          <div key={index} className="news-ticker mx-8 text-lg font-medium">
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;
