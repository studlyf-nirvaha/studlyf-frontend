import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { SparklesIcon } from "lucide-react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Badge } from "@/components/ui/badge";
import Lenis from 'lenis';
import { useEffect, useRef } from 'react';

interface CarouselImage {
  src: string;
  alt: string;
  card?: {
    title: string;
    summary: string;
    image: string;
    link: string;
  };
}

interface CarouselProps {
  images: CarouselImage[];
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
}

export const CardCarousel: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 1500,
  showPagination = true, // keep prop for API compatibility, but force false below
  showNavigation = true,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      gestureOrientation: 'vertical',
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);
  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    transition: transform 0.4s cubic-bezier(.4,2,.3,1), box-shadow 0.3s;
    box-shadow: 0 4px 24px 0 rgba(0,0,0,0.12), 0 1.5px 6px 0 rgba(80,0,120,0.08);
    border-radius: 1.5rem;
    overflow: hidden;
  }
  .swiper-slide-active {
    transform: scale(1.08) rotate(-1deg);
    box-shadow: 0 8px 32px 0 rgba(80,0,120,0.18), 0 2px 8px 0 rgba(80,0,120,0.10);
    z-index: 2;
  }
  .swiper-slide img {
    display: block;
    width: 100%;
    border-radius: 1.25rem;
    filter: brightness(0.95) saturate(1.1);
    transition: filter 0.3s;
  }
  .swiper-slide-active img {
    filter: brightness(1) saturate(1.2) drop-shadow(0 2px 16px #a855f7cc);
  }
  /* Removed .swiper-pagination-bullet styles */
  .swiper-button-next, .swiper-button-prev {
    color: #fff;
    background: linear-gradient(90deg, #a855f7, #f472b6);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    box-shadow: 0 2px 8px #a855f7cc;
    opacity: 0.85;
    transition: opacity 0.2s, box-shadow 0.2s;
    top: 50%;
    transform: translateY(-50%);
  }
  .swiper-button-next:hover, .swiper-button-prev:hover {
    opacity: 1;
    box-shadow: 0 4px 16px #f472b6cc;
  }
  .swiper-button-next:after, .swiper-button-prev:after {
    font-size: 1.5rem;
    font-weight: bold;
  }
  `;
  const FALLBACK_IMAGE = '/placeholder.svg';
  return (
    <div ref={carouselRef}>
      <style>{css}</style>
      <Swiper
        spaceBetween={10}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={5}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 3 },
          900: { slidesPerView: 3 },
          1200: { slidesPerView: 5 },
          1536: { slidesPerView: 7 },
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={false} // disables pagination bullets
        navigation={
          showNavigation
            ? {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }
            : undefined
        }
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            {image.card ? (
              <div className="size-full rounded-3xl relative group overflow-hidden bg-[#18181b] border border-[#a259ff44] flex flex-col justify-between shadow-lg p-6">
                <img
                  src={image.card.image}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                  alt={image.card.title}
                  loading="lazy"
                  onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMAGE; }}
                />
                <div className="flex flex-col h-full justify-between p-4">
                  <h3 className="text-lg font-semibold mb-2">{image.card.title}</h3>
                  <p className="text-gray-300 mb-4">{image.card.summary}</p>
                  <a
                    href={image.card.link}
                    className="text-purple-400 font-semibold hover:underline mt-auto"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ) : (
              <div className="size-full rounded-3xl relative group overflow-hidden">
                <img
                  src={image.src}
                  width={500}
                  height={500}
                  className="size-full rounded-xl transition-transform duration-300 group-hover:scale-105"
                  alt={image.alt}
                  loading="lazy"
                  onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMAGE; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-80" />
              </div>
            )}
          </SwiperSlide>
        ))}
        {/* Navigation Arrows removed as requested */}
      </Swiper>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {images.map((card, idx) => (
          <div key={idx} className="bg-white/10 rounded-xl shadow-lg overflow-hidden flex flex-col p-4">
            <img
              src={card.src}
              alt={card.alt}
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold mb-2 text-white">{card.card?.title}</h3>
            <p className="text-gray-300 mb-4">{card.card?.summary}</p>
            <a
              href={card.card?.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 font-semibold hover:underline mt-auto"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};