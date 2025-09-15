import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative min-h-10 min-w-36 px-6 py-2 cursor-pointer overflow-hidden rounded-full border bg-background text-center font-semibold flex items-center justify-center gap-2",
        className,
      )}
      {...props}
    >
      <span className="relative z-10 transition-colors duration-300 group-hover:text-black flex items-center gap-2">
        {text}
        {props.children}
      </span>
      <div
        className="absolute left-0 top-0 h-full w-full rounded-full transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 scale-0 opacity-0"
        style={{
          zIndex: 1,
          background: 'linear-gradient(90deg, #a259ff 0%, #7f5fff 50%, #e100ff 100%)',
          boxShadow: '0 0 32px 16px #a259ff88, 0 0 64px 32px #e100ff44',
        }}
      />
      {/* Thicker and slower beam border */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-[1200ms] delay-[600ms]" style={{ zIndex: 2, boxShadow: '0 0 0 18px rgba(255,255,255,0.95), 0 0 48px 24px rgba(255,255,255,0.5)' }} />
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton }; 