import React from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { IMAGES } from "@/data/business";

const DRINKS = [
  { name: "Toasted Brown Sugar", desc: "Brûléed sugar, boba, milk tea", image: IMAGES.brownSugar, big: true },
  { name: "Strawberry Matcha", desc: "Grade A matcha, real strawberry", image: IMAGES.strawberryMatcha },
  { name: "Ube Latte", desc: "Purple yam, creamy & smooth", image: IMAGES.ubeLatte },
  { name: "Signature Boba", desc: "Our house classic, always chewy", image: IMAGES.heroCup },
];

export default function SignatureDrinks() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl">Signature Pours</h2>
          <Link to="/menu" data-cursor-hover className="font-semibold text-primary hover:underline underline-offset-4">
            Full Menu →
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[220px] md:auto-rows-[280px]">
        {DRINKS.map((d, i) => (
          <ScrollReveal
            key={d.name}
            delay={i * 0.1}
            className={`relative rounded-3xl overflow-hidden group ${d.big ? "col-span-2 row-span-2" : ""}`}
          >
            <img
              src={d.image}
              alt={d.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <h3 className="font-display font-bold text-white text-xl md:text-2xl">{d.name}</h3>
              <p className="text-white/80 text-sm font-body">{d.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}