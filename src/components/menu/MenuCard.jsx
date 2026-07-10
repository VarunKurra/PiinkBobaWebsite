import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MenuCard({ item }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setSpot({ x: px * 100, y: py * 100 });
    setTransform(
      `perspective(800px) rotateX(${(0.5 - py) * 10}deg) rotateY(${(px - 0.5) * 10}deg) scale3d(1.02,1.02,1.02)`
    );
  };
  const reset = () => setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ transform, transition: "transform 0.2s ease-out" }}
      className="relative overflow-hidden rounded-2xl border border-black/10 bg-white group"
      data-cursor-hover
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ background: `radial-gradient(280px circle at ${spot.x}% ${spot.y}%, rgba(255,105,180,0.28), transparent 70%)` }}
      />
      {item.image && (
        <div className="h-40 w-full overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
      )}
      <div className="relative z-20 p-5 flex justify-between items-start gap-3">
        <div>
          <h3 className="font-heading font-bold text-lg text-black">{item.name}</h3>
          <p className="text-sm text-black/60 mt-1 font-body">{item.description}</p>
        </div>
        <span className="font-mono text-primary font-bold whitespace-nowrap">${item.price.toFixed(2)}</span>
      </div>
    </motion.div>
  );
}