import React from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { GALLERY_IMAGES } from "@/data/business";

export default function GalleryTeaser() {
  const images = GALLERY_IMAGES.slice(0, 5);
  return (
    <section className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl">Inside The Studio</h2>
          <Link to="/gallery" data-cursor-hover className="font-semibold text-primary hover:underline underline-offset-4">
            Full Gallery →
          </Link>
        </div>
      </ScrollReveal>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {images.map((img, i) => (
          <ScrollReveal
            key={img.src}
            delay={i * 0.08}
            className={`rounded-2xl overflow-hidden aspect-square ${i === 0 ? "col-span-2 row-span-2 aspect-auto" : ""}`}
          >
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}