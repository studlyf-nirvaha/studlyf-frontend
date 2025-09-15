import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SplitText } from "@/components/ui/split-text";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <SplitText
          text="404"
          className="text-4xl font-bold mb-4"
          delay={50}
          animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
          easing="easeOutCubic"
          threshold={0.3}
          rootMargin="-100px"
        />
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/home" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
