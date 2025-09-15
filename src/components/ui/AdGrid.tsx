import React, { useEffect, useState } from "react";

// Utility to get all images from public/adgrid/ (works in dev/build, not in static public at runtime)
function getAdImages() {
  // In Vite/CRA, you can't read the public folder at runtime, so we use a static import context for dev/build
  // For production, user must add images to /public/adgrid/ and update this list if needed
  // You can automate this with a script or use a backend for dynamic listing
  const contextImages = [
    '/Bowerschool.png'
    // Add more as needed
  ];
  return contextImages;
}

const IMAGE_INTERVAL = 5000; // 5 seconds

function useAdImageCycle(images: string[], interval = 10000) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const fadeOut = setTimeout(() => setFade(false), interval - 800);
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
      setFade(true);
    }, interval);
    return () => {
      clearTimeout(timer);
      clearTimeout(fadeOut);
    };
  }, [index, images.length, interval]);

  return { src: images[index], fade };
}

const AdGrid: React.FC = () => {
  const images = getAdImages();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, IMAGE_INTERVAL);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div style={{ width: '100vw', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#181818', color: '#fff', fontSize: 24, borderRadius: 24 }}>
        No images found in /public/adgrid/
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#121212",
        padding: 0,
        borderRadius: 24,
        width: '100vw',
        maxWidth: '100vw',
        margin: 0,
        boxShadow: "0 6px 32px 0 rgba(0,0,0,0.18)",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        flexDirection: 'column',
      }}
    >
      <div style={{ width: '100vw', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 24, overflow: 'hidden', background: '#181818' }}>
        <a href="https://bowerschool.com/lead" target="_blank" rel="noopener noreferrer">
          <img
            src={images[index]}
            alt={`Ad ${index + 1}`}
            style={{
              width: '100vw',
              height: '80vh',
              objectFit: 'contain',
              objectPosition: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
              display: 'block',
            }}
          />
        </a>
      </div>
    </div>
  );
};

export default AdGrid;