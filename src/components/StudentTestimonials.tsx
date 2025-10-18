import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

// Reviews data (unchanged)
const studentReviews = [
  {
    text: "Attending ConnectX at T-Hub, organized by StudLyF, was a turning point for me. I found an internship with Gen AI Lake through it—an opportunity I might have missed otherwise. ConnectX truly bridges students with real industry experiences. Grateful to StudLyF for creating such an impactful platform!",
    name: "Hemasree",
    college: "BVRIT 2nd Year",
  },
  {
    text: "Being part of this community helped me grow through learning, mentorship, and events like ConnectX. The sessions on profile building, SIH, and hackathons boosted my clarity and confidence to explore innovation and startups.",
    name: "Sathvika",
    college: "Nxtwave",
  },
  {
    text: "STUDLYF has been a game-changer for me! It made finding the right internship simple and effective. Thanks to their platform, I landed an internship at S-Hatch, perfectly aligning with my goals. Grateful for the guidance and opportunities STUDLYF offers students like me!",
    name: "Keerthana",
    college: "Malla Reddy University",
  },
  {
    text: "You guys are missing out! Just attend a session - you’ll see the value. Even as a first-year, I’ve learned so much. Big thanks to STUDLYF—my whole vibe’s on another level now!",
    name: "Vengala Srivashish",
    college: "Sreenidhi Institute of Technology",
  },
  {
    text: "The sessions held by STUDLYF ARE super helpful and made web building feel easy! They made it fun, interactive, and packed with AI tools and insights. Thanks for an amazing session!",
    name: "Bhuvana, 1st year",
    college: "Sreyas Institute of Technology",
  },
  {
    text: "STUDLYF helped me to learn LinkedIn tips, portfolio building, and discover new AI tools I’d never heard of.",
    name: "Charan, 3rd year",
    college: "Saveetha Engineering College, Chennai",
  },
  {
    text: "Events hosted here helped me to network with amazing like-minded people—a reminder of how much we can achieve when curious minds come together!",
    name: "Vamshi, 3rd year",
    college: "Matrusri Engineering College",
  },
  {
    text: "This platform helped me connect with the right mentor to validate my idea. I never knew its true potential before, but thanks to this platform, I’m pursuing it today!",
    name: "Akhil, 2nd year",
    college: "CVR College of Engineering",
  },
  {
    text: "STUDLYF events helped me explore the world beyond classrooms. I was once confined to four walls, but after joining, I’ve attended many events and hackathons that broadened my horizons.",
    name: "Sai, 2nd year",
    college: "Gokaraju Rangaraju",
  },
  {
    text: "This space connected me with like-minded peers, and together we’re now building an exciting sports tech venture.",
    name: "Vishnu, 1st year",
    college: "CMR Institute of Technology",
  },
  {
    text: "The STUDLYF team helped me build the prototype of my idea and guided me through pitch decks, validation, and many other critical aspects of my startup journey.",
    name: "Harshitha, 1st year",
    college: "KMEC",
  },
  {
    text: "Here, I explored numerous opportunities as a student—startup internships, scholarships, and a platform to network with peers. I found the experience extremely valuable and insightful.",
    name: "Jeevan",
    college: "Vasavi College of Engineering",
  },
  {
    text: "What I loved most is that the team focuses on addressing every student’s needs, making it feel like the platform is truly run by the entire student community.",
    name: "Gayathri, 4th year",
    college: "Lakireddy College, Andhra Pradesh",
  },
];

const CARDS_VISIBLE = 4;
const CARD_GAP = 32;
const HORIZONTAL_PADDING = 64;

export default function StudentTestimonials() {
  // Double the reviews for seamless carousel
  const reviewsLoop = [...studentReviews, ...studentReviews];
  const totalCards = studentReviews.length;
  const carouselRef = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const controls = useAnimation();

  // Responsive card sizing and container width
  useEffect(() => {
    function handleResize() {
      if (carouselRef.current) {
        const width = carouselRef.current.offsetWidth - HORIZONTAL_PADDING * 2;
        setCarouselWidth(width);
        setCardWidth((width - CARD_GAP * (CARDS_VISIBLE - 1)) / CARDS_VISIBLE);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation: start at x=0 (first 4 cards), scroll left to last 4, then reset
  useEffect(() => {
    if (!carouselWidth || !cardWidth) return;
    const cardsSetWidth = totalCards * (cardWidth + CARD_GAP);
    const startX = 0;
    const endX = -(cardsSetWidth - (cardWidth + CARD_GAP) * CARDS_VISIBLE);
    async function animate() {
      while (true) {
        await controls.start({
          x: [startX, endX],
          transition: {
            duration: 32,
            ease: "linear",
          },
        });
        controls.set({ x: startX });
      }
    }
    animate();
    // eslint-disable-next-line
  }, [carouselWidth, cardWidth, controls, totalCards]);

  return (
    <section className="relative w-full py-16" style={{ background: "#000" }}>
      {/* Full width container */}
      <div style={{ width: "100vw", maxWidth: "100vw", margin: 0, padding: 0 }}>
        {/* Section Title + Banner */}
        <div className="relative flex flex-col items-center mb-10">
          <span
            className="absolute -top-6 left-1/2 -translate-x-1/2 bg-orange-400 text-white font-bold px-6 py-2 rounded-lg shadow-lg rotate-[-8deg] text-base z-10"
            style={{
              boxShadow: "0 2px 16px 0 rgba(255,140,0,0.10)",
              border: "2px solid #fff1c2",
            }}
          >
            What users say about us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-2 z-0">
            Where Students Shine
          </h2>
        </div>
        {/* Carousel */}
        <div
          ref={carouselRef}
          style={{
            overflow: "hidden",
            width: "100vw",
            maxWidth: "100vw",
            background: "rgba(26,23,38,0.7)",
            borderRadius: "1rem",
            padding: `2rem 0`,
            minHeight: "340px",
            margin: "0", // Ensure no default margin
          }}
        >
          <div style={{ padding: `0 ${HORIZONTAL_PADDING}px` }}>
            <motion.div
              style={{
                display: "flex",
                gap: `${CARD_GAP}px`,
                width: cardWidth
                  ? `${(cardWidth + CARD_GAP) * reviewsLoop.length}px`
                  : "auto",
                willChange: "transform",
              }}
              animate={controls}
              initial={{ x: 0 }}
            >
              {reviewsLoop.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-[#1a1726] rounded-xl shadow-lg p-8 flex flex-col border border-white/10"
                  style={{
                    boxShadow: "0 2px 32px 0 rgba(160,90,255,0.13)",
                    flex: `0 0 ${cardWidth}px`,
                    minWidth: `${cardWidth}px`,
                    maxWidth: `${cardWidth}px`,
                    transition: "width 0.2s",
                  }}
                >
                  <p className="text-white/90 text-base mb-4 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="mt-auto flex flex-col">
                    <span className="font-semibold text-purple-300 text-sm">
                      {review.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {review.college}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}