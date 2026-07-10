import React, { useState } from "react";
import useSEO from "@/hooks/useSEO";
import ScrollReveal from "@/components/shared/ScrollReveal";
import Lightbox from "@/components/gallery/Lightbox";
import { GALLERY_IMAGES } from "@/data/business";

export default function Gallery() {
  useSEO(
    "Gallery | Piink Tea Studio",
    "Take a look inside Piink Tea Studio — photos of our boba, matcha, and pink-themed shop in Weldon Spring, MO."
  );
  const [index, setIndex] = useState(null);

  const nav = (dir) => {
    setIndex((prev) => (prev + dir + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-28">
      <ScrollReveal>
        <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">Gallery</span>
        <h1 className="font-display font-extrabold text-4xl md:text-6xl mt-4">Look Pink. Taste Bold.</h1>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
        {GALLERY_IMAGES.map((img, i) => (
          <ScrollReveal key={img.src} delay={(i % 6) * 0.06} className="rounded-2xl overflow-hidden aspect-square">
            <button onClick={() => setIndex(i)} className="w-full h-full" data-cursor-hover>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </button>
          </ScrollReveal>
        ))}
      </div>

      <Lightbox images={GALLERY_IMAGES} index={index} onClose={() => setIndex(null)} onNav={nav} />
    </div>
  );
}