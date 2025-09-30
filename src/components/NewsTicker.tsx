import { useEffect, useState } from 'react';

const NewsTicker = () => {
  const [newsItems] = useState([
    "🚨 New Tech Scholarship open for applications until June 30th",
    "📱 Latest AI research breakthrough by MIT student team",
    "💸 Student-founded startup raises $2M in seed funding",
    "🎓 Registration for Summer Coding Bootcamp now open",
    "🏆 Winners announced for National Student Innovation Challenge",
    "📝 Tips for managing student loan debt effectively",
    "🌟 Interview with successful student entrepreneurs",
  ]);

  return (
    <div className="gradient-bg py-3 text-white overflow-hidden">
      <div className="flex whitespace-nowrap">
        {/* Duplicate the items to create a seamless loop */}
        {[...newsItems, ...newsItems].map((item, index) => (
          <div key={index} className="news-ticker mx-8 text-lg font-medium">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;
