import { useRef, useState, useEffect } from "react";
import { motion, useInView, useAnimationFrame } from "framer-motion";

const stats = [
    {
        icon: "\u{1F393}",
        label: "Students Empowered",
        value: 600,
        display: "600+",
        color: "from-pink-400 to-purple-500",
    },
    {
        icon: "\u{1F4AC}",
        label: "Community Reach",
        value: 1000,
        display: "1000+",
        color: "from-purple-400 to-pink-500",
    },
    {
        icon: "\u{1F4DA}",
        label: "Sessions Conducted",
        value: 8,
        display: "8+",
        color: "from-pink-400 to-purple-500",
    },
    {
        icon: "\u{1F310}",
        label: "Online Webinars",
        value: 6,
        display: "6+",
        color: "from-purple-400 to-pink-500",
    },
    {
        icon: "\u{1F680}",
        label: "Startups Supported",
        value: 3,
        display: "3+",
        color: "from-pink-400 to-purple-500",
    },
    {
        icon: "\u{1F4BC}",
        label: "Internships Provided",
        value: 40,
        display: "40+",
        color: "from-purple-400 to-pink-500",
    },
];

function useCounter(target: number, inView: boolean, duration = 1.2) {
    const [count, setCount] = useState(0);
    const start = useRef<number | null>(null);
    useAnimationFrame((t) => {
        if (!inView) return;
        if (start.current === null) start.current = t;
        const elapsed = (t - start.current) / 1000;
        if (elapsed < duration) {
            setCount(Math.floor(target * (elapsed / duration)));
        } else {
            setCount(target);
        }
    });
    if (!inView && count !== 0) setCount(0);
    return count;
}

const StatCard = ({ stat, inView }: { stat: any; inView: boolean }) => {
    const count = useCounter(stat.value, inView);
    
    return (
        <motion.div
            className="min-w-[70vw] w-[70vw] sm:min-w-[30vw] sm:w-[30vw] md:min-w-[12.5vw] md:w-[12.5vw] max-w-none rounded-none border-0 flex flex-col items-center py-6 sm:py-8 px-3 sm:px-2 hover:scale-105 transition-all duration-300 group snap-center"
        >
            <span className={`text-3xl md:text-4xl mb-2 drop-shadow-lg bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.icon}</span>
            <span
                className={`text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent select-none`}
            >
                {inView
                    ? stat.value >= 1000
                        ? count.toLocaleString() + "+"
                        : count + "+"
                    : "0"}
            </span>
            <span className="text-white text-base md:text-lg font-medium opacity-90 text-center">
                {stat.label}
            </span>
        </motion.div>
    );
};

const StatsSection = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.3 });
    const [containerWidth, setContainerWidth] = useState(0);
    const [cardsWidth, setCardsWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
        }
        if (cardsRef.current) {
            setCardsWidth(cardsRef.current.scrollWidth / 2); // Only one set of cards
        }
    }, []);

    // Animation: move from right edge (0) to left edge (-cardsWidth)
    const DURATION = 36; // seconds for one full loop

    return (
        <section className="w-full py-0 select-none bg-black">
            {/* Top gradient border */}
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            <div className="w-full" ref={ref}>
                <div ref={containerRef} className="w-full overflow-hidden">
                    <motion.div
                        ref={cardsRef}
                        className="flex gap-2 sm:gap-4 md:gap-0"
                        animate={{ x: [0, -cardsWidth] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: DURATION }}
                        style={{ willChange: 'transform' }}
                    >
                        {/* Duplicate cards for seamless loop */}
                        {[...stats, ...stats].map((stat, i) => (
                            <StatCard key={stat.label + i} stat={stat} inView={inView} />
                        ))}
                    </motion.div>
                </div>
            </div>
            {/* Bottom gradient border */}
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </section>
    );
};

export default StatsSection;
