"use client"

import React, { forwardRef, useCallback, useMemo, useRef, useState, useEffect, type JSX } from "react"
import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type PanInfo } from "framer-motion"
import { Check, Loader2, SendHorizontal, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

const DRAG_CONSTRAINTS = { left: 0, right: 155 }
const DRAG_THRESHOLD = 0.9

const BUTTON_STATES = {
    initial: { width: "12rem" },
    completed: { width: "8rem" },
}

const ANIMATION_CONFIG = {
    spring: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        mass: 0.8,
    },
}

type StatusIconProps = {
    status: string
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
    const iconMap: Record<StatusIconProps["status"], JSX.Element> = useMemo(
        () => ({
            loading: <Loader2 className="animate-spin text-black" size={20} />,
            success: <Check className="text-black" size={20} />,
            error: <X className="text-black" size={20} />,
        }),
        []
    )

    if (!iconMap[status]) return null

    return (
        <motion.div
            key={crypto.randomUUID()}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
        >
            {iconMap[status]}
        </motion.div>
    )
}

const useButtonStatus = (resolveTo: "success" | "error") => {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

    const handleSubmit = useCallback(() => {
        setStatus("loading")
        setTimeout(() => {
            setStatus(resolveTo)
        }, 2000)
    }, [resolveTo])

    return { status, handleSubmit }
}

const SlideButton = forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
    const [isDragging, setIsDragging] = useState(false)
    const [completed, setCompleted] = useState(false)
    const dragHandleRef = useRef<HTMLDivElement | null>(null)
    const { status, handleSubmit } = useButtonStatus("success")

    const dragX = useMotionValue(0)
    const springX = useSpring(dragX, ANIMATION_CONFIG.spring)
    const dragProgress = useTransform(springX, [0, DRAG_CONSTRAINTS.right], [0, 1])

    const navigate = useNavigate()

    useEffect(() => {
        if (status === "success") {
            const t = setTimeout(() => navigate("/home"), 600);
            return () => clearTimeout(t);
        }
    }, [status, navigate])

    const handleDragStart = useCallback(() => {
        if (completed) return
        setIsDragging(true)
    }, [completed])

    const handleDragEnd = () => {
        if (completed) return
        setIsDragging(false)

        const progress = dragProgress.get()
        if (progress >= DRAG_THRESHOLD) {
            setCompleted(true)
            handleSubmit()
        } else {
            dragX.set(0)
        }
    }

    const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (completed) return
        const newX = Math.max(0, Math.min(info.offset.x, DRAG_CONSTRAINTS.right))
        dragX.set(newX)
    }

    // map the springX position to a percentage width so the fill grows with the handle
    const fillWidth = useTransform(springX, [0, DRAG_CONSTRAINTS.right], [0, 100])
    const adjustedWidth = useTransform(fillWidth, (p) => `${p}%`)

    return (
        <motion.div
            animate={completed ? BUTTON_STATES.completed : BUTTON_STATES.initial}
            transition={ANIMATION_CONFIG.spring as any}
            className={cn(
                "shadow-button-inset dark:shadow-button-inset-dark relative flex h-9 items-center justify-center rounded-full bg-gray-100",
                className
            )}
        >
            {/* center label shown before fill covers it */}
            {!completed && (
                <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                    <span className="text-white text-sm font-medium">Explore Now</span>
                </div>
            )}
            {!completed && (
                <motion.div
                    style={{
                        width: adjustedWidth,
                    }}
                    className="absolute inset-y-0 left-0 z-10 rounded-full bg-white overflow-hidden"
                >
                    <div className="h-full w-full flex items-center justify-center">
                        <span className="text-black text-sm font-medium">welcome</span>
                    </div>
                </motion.div>
            )}
            <AnimatePresence key={crypto.randomUUID()}>
                {!completed && (
                    <motion.div
                        ref={dragHandleRef}
                        drag="x"
                        dragConstraints={DRAG_CONSTRAINTS}
                        dragElastic={0.05}
                        dragMomentum={false}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onDrag={handleDrag}
                        style={{ x: springX }}
                        className="absolute -left-4 z-20 flex cursor-grab items-center justify-start active:cursor-grabbing"
                    >
                        <Button
                            ref={ref}
                            disabled={status === "loading"}
                            {...props}
                            size="icon"
                            variant="ghost"
                            // force a static white background via inline style so variant hover rules can't change it
                            style={{ backgroundColor: "#fff" }}
                            className={cn(
                                // keep the icon button visually white/black and prevent variant hover from changing it
                                "shadow-button rounded-full drop-shadow-xl bg-white text-black hover:bg-white hover:text-black focus-visible:ring-1 focus-visible:ring-black",
                                isDragging && "scale-105 transition-transform"
                            )}
                        >
                            <SendHorizontal className="size-4 text-black" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence key={crypto.randomUUID()}>
                {completed && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Button
                            ref={ref}
                            disabled={status === "loading"}
                            {...props}
                            variant="ghost"
                            // force white background inline to keep it static during loading/completed
                            style={{ backgroundColor: "#fff" }}
                            className={cn(
                                // ensure completed/loading button remains white with black icon and doesn't change on hover
                                "size-full rounded-full transition-all duration-300 bg-white text-black hover:bg-white hover:text-black focus-visible:ring-1 focus-visible:ring-black",
                                className
                            )}
                        >
                            <AnimatePresence key={crypto.randomUUID()} mode="wait">
                                <StatusIcon status={status} />
                            </AnimatePresence>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* navigation handled by useEffect above */}
        </motion.div>
    )
})

SlideButton.displayName = "SlideButton"

export default SlideButton
