import React, { useEffect, useRef, useState } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setVisible(true);
    document.documentElement.classList.add("custom-cursor-active");

    const move = (e) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };
    const onOver = (e) => setHovering(!!e.target.closest("[data-cursor-hover]"));

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [reduced]);

  if (!visible) return null;

  return (
    <div
      ref={dotRef}
      className={`fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border-2 transition-[width,height,background-color,border-color] duration-200 ease-out ${
        hovering ? "w-12 h-12 bg-primary/30 border-primary" : "w-5 h-5 border-black bg-transparent"
      }`}
    />
  );
}