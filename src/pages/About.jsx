import React from "react";
import useSEO from "@/hooks/useSEO";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { IMAGES } from "@/data/business";

const VALUES = [
  { title: "Real Ingredients", desc: "Hand-whisked grade A matcha, real fruit purée, no shortcuts." },
  { title: "Made Fresh Daily", desc: "Boba cooked in-house every morning, brûléed sugar torched to order." },
  { title: "Design-Forward", desc: "A space built to be as photogenic as the drinks in your hand." },
  { title: "Community First", desc: "Weldon Spring's new favorite hangout, seven days a week." },
];

export default function About() {
  useSEO(
    "About | Piink Tea Studio",
    "The story behind Piink Tea Studio — a pink-themed boba tea shop in Weldon Spring, MO built on real ingredients and bold design."
  );

  return (
    <div>
      <section className="max-w-7xl mx-auto px-6 md:px-16 pt-20 md:pt-28 pb-16 grid md:grid-cols-2 gap-12 items-center">
        <ScrollReveal>
          <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">Our Story</span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl mt-4 leading-tight">
            Boba, but make it a whole vibe.
          </h1>
          <p className="mt-6 text-lg text-black/60 font-body max-w-lg">
            Piink Tea Studio opened in Weldon Spring, MO with one goal: build the boba shop we always
            wanted to walk into — loud pink energy, spotless black-and-white design, and drinks that
            taste as good as they look. Every cup starts with grade-A matcha, real fruit purée, and
            boba we cook fresh in-house every single day.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.15} className="rounded-3xl overflow-hidden">
          <img src={IMAGES.interior1} alt="Piink Tea Studio interior" className="w-full h-full object-cover" />
        </ScrollReveal>
      </section>

      <section className="bg-black text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.1} className="border border-white/15 rounded-2xl p-6 hover:border-primary transition-colors">
              <h3 className="font-display font-bold text-xl text-primary mb-2">{v.title}</h3>
              <p className="text-white/70 text-sm font-body">{v.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-28 grid md:grid-cols-2 gap-6">
        <ScrollReveal className="rounded-3xl overflow-hidden">
          <img src={IMAGES.ingredients} alt="Fresh matcha and boba ingredients" className="w-full h-full object-cover" />
        </ScrollReveal>
        <ScrollReveal delay={0.1} className="flex flex-col justify-center">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl mb-4">What makes our boba different?</h2>
          <p className="text-black/60 font-body text-lg">
            No powdered mixes, no artificial creamer. We cook our tapioca pearls fresh every morning,
            whisk our matcha by hand, and blend real fruit — never syrup concentrate. It's more work.
            It's worth it.
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
}