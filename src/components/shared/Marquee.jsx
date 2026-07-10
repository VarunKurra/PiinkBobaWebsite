import React from "react";

export default function Marquee({ children, speed = 30, direction = "left", className = "" }) {
  return (
    <div className={`overflow-hidden whitespace-nowrap group ${className}`}>
      <div
        className="inline-flex group-hover:[animation-play-state:paused] items-center"
        style={{ animation: `marquee-${direction} ${speed}s linear infinite` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}