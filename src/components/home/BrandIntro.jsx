import React from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function BrandIntro() {
  return (
    <section className="py-24 md:py-40 px-6 md:px-16 max-w-7xl mx-auto">
      <ScrollReveal>
        <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">The Studio</span>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2 className="font-display font-extrabold text-4xl md:text-6xl leading-tight mt-4 max-w-4xl">
          Not your average cafe. Just bold boba, bright flavor, and a little extra pink.
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <p className="mt-8 text-lg text-black/60 max-w-2xl font-body leading-relaxed">
          Hand-whisked matcha. Real fruit purée. Fresh boba. No shortcuts, no sleepy flavors. Just drinks that feel like the moment.
        </p>
      </ScrollReveal>
    </section>
  );
}