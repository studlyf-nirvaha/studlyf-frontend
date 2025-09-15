"use client"

import React from "react"
import SlideButton from "./slide-button"

const SlideButtonDemo: React.FC = () => {
    return (
        <div className="flex justify-center p-4">
            <SlideButton className="bg-black/40 ring-1 ring-white/80" />
        </div>
    )
}

export default SlideButtonDemo
