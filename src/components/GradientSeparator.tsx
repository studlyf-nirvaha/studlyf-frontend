import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientSeparatorProps {
    className?: string;
    variant?: "horizontal" | "vertical";
    animated?: boolean;
    thickness?: "thin" | "medium" | "thick";
    opacity?: "low" | "medium" | "high";
}

const GradientSeparator = ({
    className,
    variant = "horizontal",
    animated = true,
    thickness = "thin",
    opacity = "medium"
}: GradientSeparatorProps) => {
    const thicknessMap = {
        thin: variant === "horizontal" ? "h-px" : "w-px",
        medium: variant === "horizontal" ? "h-0.5" : "w-0.5",
        thick: variant === "horizontal" ? "h-1" : "w-1"
    };

    const opacityMap = {
        low: "opacity-20",
        medium: "opacity-40",
        high: "opacity-60"
    };

    const baseClasses = cn(
        thicknessMap[thickness],
        opacityMap[opacity],
        variant === "horizontal" ? "w-full" : "h-full",
        "bg-gradient-to-r from-transparent via-purple-400 to-transparent",
        className
    );

    if (!animated) {
        return <div className={baseClasses} />;
    }

    return (
        <motion.div
            className={baseClasses}
            animate={{
                background: [
                    "linear-gradient(90deg, transparent, rgba(209, 58, 255, 0.4), transparent)",
                    "linear-gradient(90deg, transparent, rgba(255, 77, 160, 0.5), transparent)",
                    "linear-gradient(90deg, transparent, rgba(209, 58, 255, 0.4), transparent)",
                ]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
};

export default GradientSeparator;