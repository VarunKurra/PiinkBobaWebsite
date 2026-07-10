import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function ReviewCard({ review }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white border border-black/10 rounded-2xl p-6 flex flex-col gap-4 h-full"
      data-cursor-hover
    >
      <div className="flex gap-1 text-primary">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <p className="font-heading font-semibold text-lg text-black leading-snug">"{review.quote}"</p>
      <span className="font-mono text-xs tracking-widest uppercase text-black/40 mt-auto">{review.source}</span>
    </motion.div>
  );
}