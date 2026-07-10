import React from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { REVIEW_STATS } from "@/data/reviewsData";

const STATS = [
  { value: REVIEW_STATS.rating, decimals: 1, suffix: "★", label: "Google Rating" },
  { value: REVIEW_STATS.reviewCount, suffix: "+", label: "Happy Reviews" },
  { value: 7, label: "Days Brewing / Week" },
  { value: 100, suffix: "%", label: "Real Fruit & Matcha" },
];

export default function Stats() {
  return (
    <section className="bg-black text-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <ScrollReveal key={s.label} delay={i * 0.1} className="text-center">
            <div className="font-display font-extrabold text-4xl md:text-6xl text-primary">
              <AnimatedCounter to={s.value} decimals={s.decimals || 0} suffix={s.suffix || ""} />
            </div>
            <p className="font-mono text-xs md:text-sm tracking-widest uppercase text-white/60 mt-3">{s.label}</p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}