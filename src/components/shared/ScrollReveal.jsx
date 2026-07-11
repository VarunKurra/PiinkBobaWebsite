import React, { useEffect, useRef, useState } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function ScrollReveal({ children, delay = 0, className = "", y = 40 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay, reduced]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : `translateY(${y}px)`,
        transition: "opacity 500ms ease, transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay * 1000}ms`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}